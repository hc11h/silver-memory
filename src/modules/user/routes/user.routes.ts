import { Router } from 'express';
import { resendEmail, verifyCode } from '../controllers/user.controller';
import { authenticate } from '@/middleware';

const router = Router();

// Optional: use `authenticate` middleware

router.get('/resend-email', authenticate, resendEmail);
router.post('/verify-code', authenticate, verifyCode);

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
