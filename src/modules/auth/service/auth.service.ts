import { User } from '@/modules/user/model/user.model';
import {
  ConflictError,
  generateToken,
  NotFoundError,
  UnauthorizedError,
  verifyToken,
} from '@/utils';
import env from '@/config/env';
import { AUTH_MESSAGES } from '@/constants/messages';
import { comparePassword, hashPassword } from '../utils/authUtils';

export const registerService = async ({ name, email, password }: SignupInput) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_IN_USE);

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  // Optional: send verification email
  const token = generateToken({ id: user._id }, env.jwt.verifyEmailExpirationMinutes);
  // await sendEmail(
  //   email,
  //   "Verify your email",
  //   `Click here: /auth/verify-email/${token}`
  // );

  return { id: user._id, email: user.email };
};

export const loginService = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email });
  if (!user) throw new UnauthorizedError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new UnauthorizedError(AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS);

  const accessToken = generateToken(
    { id: user._id, role: user.roleKey },
    env.jwt.accessExpirationMinutes
  );
  const refreshToken = generateToken({ id: user._id }, env.jwt.refreshExpirationDays);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  };
};

export const forgotPasswordService = async ({ email }: ForgotPasswordInput) => {
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError(AUTH_MESSAGES.ERROR.EMAIL_NOT_FOUND);

  const token = generateToken({ id: user._id }, env.jwt.resetPasswordExpirationMinutes);
  // await sendEmail(
  //   email,
  //   "Reset Password",
  //   `Reset here: /auth/reset-password/${token}`
  // );
};

export const resetPasswordService = async ({ token, newPassword }: ResetPasswordInput) => {
  const payload = verifyToken(token);
  const hashed = await hashPassword(newPassword);
  await User.findByIdAndUpdate(payload.id, { password: hashed });
};

export const verifyEmailService = async ({ token }: VerifyEmailInput) => {
  const payload = verifyToken(token);
  await User.findByIdAndUpdate(payload.id, { isEmailVerified: true });
};
