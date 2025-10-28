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
import {
  SignupInput,
  LoginInput,
  ResetPasswordInput,
  VerifyEmailInput,
  ForgotPasswordInput,
  ResendVerificationInput,
} from '../interface/auth.types';
import { BlacklistedToken } from '@/models/blacklistedToken';
import mongoose from 'mongoose';

export const registerService = async ({
  name,
  lastname,
  entityName,
  jobTitle,
  telephone,
  email,
  password,
  entityType,
}: SignupInput) => {
  const existing = await db.findOne<IUser>(User, { email }, 'email');
  if (existing) throw new ConflictError(AUTH_MESSAGES.ERROR.EMAIL_IN_USE);

  if (entityType === 'government' && !/\.gov$/i.test(email)) {
    throw new ConflictError('Government emails must end with .gov');
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    lastname,
    entityName,
    jobTitle,
    telephone,
    email,
    password: hashedPassword,
    entityType,
  });

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
    { id: user._id, role: user.entityType },
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

export const logoutService = async (token: string, userId: string) => {
  try {
    // Verify the token to get expiration time
    const payload = verifyToken(token);

    // Calculate token expiration time
    const expiresAt = new Date(payload.exp * 1000);

    // Add token to blacklist
    await BlacklistedToken.create({
      token,
      userId: new mongoose.Types.ObjectId(userId),
      expiresAt,
      reason: 'logout',
    });

    return { success: true, message: 'Token successfully invalidated' };
  } catch (error) {
    // Even if token verification fails, we can still blacklist it
    // with a conservative expiration time (e.g., 1 hour from now)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await BlacklistedToken.create({
      token,
      userId: new mongoose.Types.ObjectId(userId),
      expiresAt,
      reason: 'invalid_token',
    });

    return { success: true, message: 'Token invalidated (fallback)' };
  }
};
