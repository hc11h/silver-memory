import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '@/utils';
import { AUTH_MESSAGES, HTTP_STATUS, RESPONSE_TAGS } from '@/constants';
import * as AuthService from '../service/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await AuthService.registerService(req.body);
    sendSuccess(
      res,
      AUTH_MESSAGES.SUCCESS.REGISTER,
      user,
      HTTP_STATUS.CREATED,
      RESPONSE_TAGS.CREATED
    );
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tokens = await AuthService.loginService(req.body);
    sendSuccess(res, AUTH_MESSAGES.SUCCESS.LOGIN, tokens, HTTP_STATUS.OK, RESPONSE_TAGS.FETCHED);
  } catch (error) {
    next(error);
  }
};
export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await AuthService.forgotPasswordService(req.body.email);
    sendSuccess(
      res,
      AUTH_MESSAGES.SUCCESS.PASSWORD_RESET_SENT,
      {},
      HTTP_STATUS.OK,
      RESPONSE_TAGS.FETCHED
    );
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
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
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await AuthService.verifyEmailService({ token: req.params.token });
    sendSuccess(
      res,
      AUTH_MESSAGES.SUCCESS.EMAIL_VERIFIED,
      {},
      HTTP_STATUS.OK,
      RESPONSE_TAGS.UPDATED
    );
  } catch (err) {
    next(err);
  }
};
