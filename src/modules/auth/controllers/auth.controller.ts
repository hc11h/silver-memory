import { Request, Response } from 'express';
import { sendSuccess, catchAsync } from '@/utils';
import { AUTH_MESSAGES, HTTP_STATUS, RESPONSE_TAGS } from '@/constants';
import * as AuthService from '../service/auth.service';

export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const user = await AuthService.registerService(req.body);
  sendSuccess(
    res,
    AUTH_MESSAGES.SUCCESS.REGISTER,
    user,
    HTTP_STATUS.CREATED,
    RESPONSE_TAGS.CREATED
  );
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const tokens = await AuthService.loginService(req.body);
  sendSuccess(res, AUTH_MESSAGES.SUCCESS.LOGIN, tokens, HTTP_STATUS.OK, RESPONSE_TAGS.FETCHED);
});

export const forgotPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await AuthService.forgotPasswordService(req.body);
  sendSuccess(
    res,
    AUTH_MESSAGES.SUCCESS.PASSWORD_RESET_SENT,
    {},
    HTTP_STATUS.OK,
    RESPONSE_TAGS.FETCHED
  );
});

export const resetPassword = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await AuthService.resetPasswordService({
    token: req.params.token,
    newPassword: req.body.password,
  });
  sendSuccess(
    res,
    AUTH_MESSAGES.SUCCESS.PASSWORD_RESET_SUCCESS,
    {},
    HTTP_STATUS.OK,
    RESPONSE_TAGS.UPDATED
  );
});

export const verifyEmail = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await AuthService.verifyEmailService({ token: req.params.token });
  sendSuccess(res, AUTH_MESSAGES.SUCCESS.EMAIL_VERIFIED, {}, HTTP_STATUS.OK, RESPONSE_TAGS.UPDATED);
});

export const resendVerification = catchAsync(async (req: Request, res: Response): Promise<void> => {
  await AuthService.resendVerificationService({ email: req.body.email });
  sendSuccess(res, AUTH_MESSAGES.INFO.VERIFY_EMAIL, {}, HTTP_STATUS.OK, RESPONSE_TAGS.FETCHED);
});
