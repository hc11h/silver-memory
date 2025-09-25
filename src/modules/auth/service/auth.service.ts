import { IUser, User } from '@/modules/user/model/user.model';
import {
  ConflictError,
  generateToken,
  NotFoundError,
  UnauthorizedError,
  verifyToken,
} from '@/utils';
import env from '@/config/env';
import { sendEmail } from '@/utils';
import { renderVerifyEmailTemplate } from '@/emails/templates/verifyEmail';
import { AUTH_MESSAGES } from '@/constants/messages';
import { comparePassword, hashPassword } from '../utils/authUtils';
import { renderResetPasswordTemplate } from '@/emails/templates/resetPassword';
import * as db from '@/utils/dbUtils';

export const registerService = async ({ name, email, password }: SignupInput) => {
  const existing = await db.findOne<IUser>(User, { email }, 'email');
  if (existing) throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_IN_USE);

  const hashedPassword = await hashPassword(password);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken({ id: user._id }, env.jwt.verifyEmailExpirationMinutes);
  const verifyLink = `/auth/verify-email/${token}`;
  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: renderVerifyEmailTemplate(verifyLink),
  });

  return { id: user._id, email: user.email };
};

export const loginService = async ({ email, password }: LoginInput) => {
  const user = await db.findOne<IUser>(User, { email });
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
  const user = await db.findOne<IUser>(User, { email });
  if (!user) throw new NotFoundError(AUTH_MESSAGES.ERROR.EMAIL_NOT_FOUND);

  const token = generateToken({ id: user._id }, env.jwt.resetPasswordExpirationMinutes);
  const resetLink = `/auth/reset-password/${token}`;
  await sendEmail({
    to: email,
    subject: 'Reset your password',
    html: renderResetPasswordTemplate(resetLink),
  });
};

export const resetPasswordService = async ({ token, newPassword }: ResetPasswordInput) => {
  const payload = verifyToken(token);
  const hashed = await hashPassword(newPassword);
  await db.updateOne<IUser>(User, payload.id, { password: hashed });
};

export const verifyEmailService = async ({ token }: VerifyEmailInput) => {
  const payload = verifyToken(token);
  await db.updateOne<IUser>(User, payload.id, { isEmailVerified: true });
};

export const resendVerificationService = async ({ email }: ResendVerificationInput) => {
  const user = await db.findOne<IUser>(User, { email });

  if (!user) throw new NotFoundError(AUTH_MESSAGES.ERROR.EMAIL_NOT_FOUND);
  if (user.isEmailVerified) return;

  const token = generateToken({ id: user._id }, env.jwt.verifyEmailExpirationMinutes);
  const verifyLink = `/auth/verify-email/${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: renderVerifyEmailTemplate(verifyLink),
  });
};
