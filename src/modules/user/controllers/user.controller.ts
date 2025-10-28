import { Request, Response } from 'express';

import { HTTP_STATUS } from '@/constants';
import { sendSuccess, sendError, findOne } from '@/utils';
import { verifyEmailCode } from '../service/user.service';
import { resendEmailAgain } from '@/emails/service/sendEmail';
import { User } from '../model/user.model';

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'User not authenticated');
    }


    const { code } = req.body;
    const result = await verifyEmailCode(userId, code);

    if (!result.success) {
      return sendError(res, HTTP_STATUS.BAD_REQUEST, result.message);
    }

    return sendSuccess(res, result.message, { verified: true }, HTTP_STATUS.OK);
  } catch (err: any) {
    console.error('Resend Email Error:', err);
    return sendError(res, HTTP_STATUS.INTERNAL_ERROR, 'Something went wrong');
  }
};

export const resendEmail = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return sendError(res, HTTP_STATUS.UNAUTHORIZED, 'User not authenticated');
    }
    const user = await User.findById(userId);

    if(user?.isEmailVerified){
        return sendError(res, HTTP_STATUS.FORBIDDEN, 'User is already verfired');
    }

    if (!user || !user.email) {
      return sendError(res, HTTP_STATUS.NOT_FOUND, 'User not found or email missing');
    }

    const code = await resendEmailAgain(userId, user.email);

    return sendSuccess(res, 'Verification email sent successfully', { code }, HTTP_STATUS.OK);
  } catch (err: any) {
    console.error('Resend Email Error:', err);
    return sendError(res, HTTP_STATUS.INTERNAL_ERROR, 'Something went wrong');
  }
};
