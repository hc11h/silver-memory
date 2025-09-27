import env from '@/config/env';
import { HTTP_STATUS } from '@/constants';
import { sendError } from '@/utils';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BlacklistedToken } from '@/models/blacklistedToken';

export const authenticate = (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return new Promise(async (resolve) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Access Denied');
      resolve();
      return;
    }

    try {
      // Check if token is blacklisted
      const blacklisted = await BlacklistedToken.findOne({ token });
      if (blacklisted) {
        sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Token has been invalidated. Please login again.');
        resolve();
        return;
      }

      const decoded = jwt.verify(token as string, env.jwt.secret);
      (req as any).user = decoded;
      next();
      resolve();
    } catch (err) {
      sendError(res, HTTP_STATUS.UNAUTHORIZED, 'Invalid Token');
      resolve();
    }
  });
};
