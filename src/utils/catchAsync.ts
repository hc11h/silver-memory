import { Request, Response, NextFunction } from 'express';

/**
 * Wrap async Express handlers to forward rejected promises to error middleware.
 *
 * Best practice: use in controllers and route handlers. Services should throw errors
 * and remain framework-agnostic; controllers wrap with catchAsync.
 */
export const catchAsync =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

/*
How to use
----------

// In a controller (controllers/example.controller.ts)
import { Request, Response } from 'express';
import { catchAsync } from '@/utils/catchAsync';

export const getExample = catchAsync(async (req: Request, res: Response) => {
  const data = await exampleService.doWork();
  res.json({ success: true, data });
});

// In routes (routes/example.routes.ts)
import { Router } from 'express';
import { getExample } from '../controllers/example.controller';

const router = Router();
router.get('/example', getExample);
export default router;
*/
