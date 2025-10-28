import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { validateSchema } from '@/middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';
import { authenticate } from '@/middleware/auth.middleware';

const router = Router();

// Optional: use `authenticate` middleware

/**
 * @route GET /api/user
 */
// router.get('/', authenticate, UserController.getAll);

// /**
//  * @route GET /api/user/:id
//  */
// router.get('/:id', UserController.getById);

// /**
//  * @route POST /api/user
//  */
// router.post('/', validateSchema(createUserSchema), UserController.create);

// /**
//  * @route PATCH /api/user/:id
//  */
// router.patch('/:id', validateSchema(updateUserSchema), UserController.update);

// /**
//  * @route DELETE /api/user/:id
//  */
// router.delete('/:id', UserController.remove);

export default router;
