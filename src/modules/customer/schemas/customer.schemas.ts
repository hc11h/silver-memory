import { z } from 'zod';
import { trimAfter } from '@/middleware';

export const createSchema = z.object({
  name: trimAfter(z.string().min(2)),
  email: trimAfter(z.string().email()),
  password: trimAfter(z.string().min(6)),
});

export const updateSchema = z.object({
  name: trimAfter(z.string().min(2)).optional(),
  email: trimAfter(z.string().email()).optional(),
  role: z.enum(['user', 'admin']).optional(),
});
