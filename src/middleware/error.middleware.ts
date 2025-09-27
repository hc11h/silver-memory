import { HTTP_STATUS } from '@/constants';
import { HttpError, sendError } from '@/utils';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof HttpError ? err.statusCode : HTTP_STATUS.INTERNAL_ERROR;
  const message = err.message || 'Internal Server Error';
  const errors = err instanceof HttpError ? err.errors : {};

  console.error(`[ERROR ${statusCode}] ${message}`, {
    method: req.method,
    path: req.originalUrl,
    stack: err.stack,
  });

  return sendError(res, statusCode, message, errors);
};

export default errorMiddleware;
