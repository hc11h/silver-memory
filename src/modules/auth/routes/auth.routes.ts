import { Router } from 'express';
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
} from '../controllers/auth.controller';
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
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

/**
 * Resend email verification
 * @auth public
 */
router.post('/resend-verification', validateSchema(resendVerificationSchema), resendVerification);

export default router;
