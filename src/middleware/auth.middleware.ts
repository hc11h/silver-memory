import env from '@/config/env';
import { HTTP_STATUS } from '@/constants';
import { sendError } from '@/utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Access Denied');

  try {
    const decoded = jwt.verify(token as string, env.jwt.secret);
    (req as any).user = decoded;
    next();
  } catch (err) {
    sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid Token');
  }
};
