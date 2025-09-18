interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  email: string;
  password: string;
  name: string;
  roleKey?: string;
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
