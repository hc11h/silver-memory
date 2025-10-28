import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname, '../../', envFile) });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),

  MONGODB_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRATION_MINUTES: z.coerce.string().default('1d'),
  JWT_REFRESH_EXPIRATION_DAYS: z.coerce.string().default('30d'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: z.coerce.string().default('10m'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: z.coerce.string().default('10m'),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_SECURE: z.coerce.boolean().default(false),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  EMAIL_FROM: z.string().email(),
});

// Perform validation
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

const env = parsedEnv.data;

export default {
  env: env.NODE_ENV,
  port: env.PORT,
  mongoose: {
    url: env.MONGODB_URL + (env.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: env.JWT_SECRET,
    accessExpirationMinutes: env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    auth: {
      user: process.env.EMAIL_USER!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: process.env.REFRESH_TOKEN!,
      redirectUri: process.env.REDIRECT_URI!,
    },
  },
};
