import bcrypt from 'bcryptjs';

/**
 * Hashes a plain password using bcrypt.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

/**
 * Compares raw password with hashed.
 */
export const comparePassword = async (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

export const sendVerificationEmail = (email: string, token: string) => {
  // Email logic here (Nodemailer, Resend, etc.)
};

export const sendResetEmail = (email: string, token: string) => {
  // Send password reset link
};
