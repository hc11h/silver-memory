import { IUser, User } from '../model/user.model';
import * as db from '@/utils/dbUtils';




import { sendEmail } from '@/utils';

import { ConflictError, NotFoundError, UnauthorizedError } from '@/utils';
import { AUTH_MESSAGES } from '@/constants/messages';
import env from '@/config/env';
import { EmailVerification } from '../model/emailVerification.model';
import { generateNumericCode } from '@/utils/generateNumericCode';
import { renderVerifyEmailCodeTemplate } from '@/emails/templates/verifyEmail';

export const sendVerificationCodeService = async (user: IUser) => {
  const existing = await EmailVerification.findOne({ userId: user._id });

  if (existing && existing.resendCount >= 2) {
    throw new ConflictError('Daily resend limit reached');
  }

  const code = generateNumericCode(6);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

  await EmailVerification.findOneAndUpdate(
    { userId: user._id },
    { code, expiresAt, email: user.email, resendCount: (existing?.resendCount ?? 0) + 1 },
    { upsert: true }
  );

  await sendEmail({
    to: user.email,
    subject: 'Your verification code',
    html: renderVerifyEmailCodeTemplate(code),
  });

  return { message: 'Verification code sent to your email' };
};

export const verifyCodeService = async (email: string, code: string) => {
  const record = await EmailVerification.findOne({ email });
  if (!record) throw new NotFoundError('No verification record found');

  if (record.attempts >= 3) {
    throw new ConflictError('Too many attempts, please request a new code');
  }

  if (record.code !== code) {
    record.attempts += 1;
    await record.save();
    throw new UnauthorizedError('Invalid code');
  }

  if (record.expiresAt < new Date()) {
    throw new UnauthorizedError('Code expired');
  }

  // Success → mark user verified
  await User.updateOne({ email }, { isEmailVerified: true });
  await EmailVerification.deleteOne({ _id: record._id });

  return { message: 'Email verified successfully' };
};


// export const getUserById = (id: string) => {
//   return db.findById<IUser>(User, id, '-password');
// };

// export const getAllUsers = () => {
//   return db.findAll<IUser>(User, {}, '-password');
// };

// export const createUser = (data: any) => {
//   return db.createOne<IUser>(User, data);
// };

// export const updateUser = (id: string, data: any) => {
//   return db.updateOne<IUser>(User, id, data);
// };

// export const deleteUser = (id: string) => {
//   return db.deleteOne<IUser>(User, id);
// };
