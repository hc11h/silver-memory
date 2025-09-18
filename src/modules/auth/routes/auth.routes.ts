import { Router } from 'express';
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
} from '../controllers/auth.controller';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../schemas/auth.schemas';
import { validateSchema } from '@/middleware';

const router = Router();

/**
 * Login user
 * @auth public
 */
router.post('/login', validateSchema(loginSchema), login);

/**
 * Register user
 * @auth public
 */
router.post('/register', validateSchema(registerSchema), register);

/**
 * Send password reset link
 * @auth public
 */
router.post('/forgot-password', validateSchema(forgotPasswordSchema), forgotPassword);

/**
 * Reset password
 * @auth public
 */
router.post('/reset-password/:token', validateSchema(resetPasswordSchema), resetPassword);

/**
 * Verify email
 * @auth public
 */
router.get('/verify-email/:token', verifyEmail);

export default router;
