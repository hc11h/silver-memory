import { EntityType } from '@/modules/entity';

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  email: string;
  password: string;
  name: string;
  roleKey?: string;
  entityType?: EntityType;
  metadata?: Record<string, any>;
}

interface ResetPasswordInput {
  token: string;
  newPassword: string;
}

interface VerifyEmailInput {
  token: string;
}

interface ForgotPasswordInput {
  email: string;
}

interface ResendVerificationInput {
  email: string;
}

export {
  LoginInput,
  SignupInput,
  ResetPasswordInput,
  VerifyEmailInput,
  ForgotPasswordInput,
  ResendVerificationInput,
};
