import { VALIDATION_MESSAGES } from '@/constants';
import { trimAfter } from '@/middleware';
import { z } from 'zod';

export const loginSchema = z.object({
  email: trimAfter(z.string().email(VALIDATION_MESSAGES.INVALID_EMAIL)),
  password: trimAfter(z.string().min(6, VALIDATION_MESSAGES.PASSWORD_MIN)),
});

export const registerSchema = z.object({
  name: trimAfter(z.string().min(2, VALIDATION_MESSAGES.NAME_MIN)),
  email: trimAfter(z.string().email(VALIDATION_MESSAGES.INVALID_EMAIL)),
  password: trimAfter(z.string().min(6, VALIDATION_MESSAGES.PASSWORD_MIN)),
});

export const forgotPasswordSchema = z.object({
  email: trimAfter(z.string().email(VALIDATION_MESSAGES.INVALID_EMAIL)),
});

export const resetPasswordSchema = z.object({
  password: trimAfter(z.string().min(6, VALIDATION_MESSAGES.PASSWORD_MIN)),
});

export const verifyEmailSchema = z.object({
  token: trimAfter(z.string().min(1, VALIDATION_MESSAGES.REQUIRED)),
});
