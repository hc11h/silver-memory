import { IUser, User } from '../model/user.model';
import { ConflictError, NotFoundError, UnauthorizedError } from '@/utils';
import { EmailVerification } from '../model/emailVerification.model';
import { resendEmail } from '@/emails/service/sendEmail';
import { Types } from 'mongoose';
import { Request } from 'express';

export const verifyEmailCode = async (userId: string, code: string) => {
  const verification = await EmailVerification.findOne({
    userId,
    code,
    type: 'email-verification',
  });

  if (!verification) {
    return { success: false, message: 'Invalid or expired verification code' };
  }

  await Promise.all([
    User.updateOne({ _id: userId }, { isEmailVerified: true }),
    EmailVerification.deleteOne({ _id: verification._id }),
  ]);

  return { success: true, message: 'Code verified successfully' };
};


