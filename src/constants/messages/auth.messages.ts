import { ModuleMessages } from './message.types';

export const AUTH_MESSAGES: ModuleMessages = {
  SUCCESS: {
    REGISTER: 'User registered successfully.',
    LOGIN: 'Login successful.',
    LOGOUT: 'Logout successful. Token invalidated.',
    PASSWORD_RESET_SENT: 'Password reset link sent.',
    PASSWORD_RESET_SUCCESS: 'Password reset successful.',
    EMAIL_VERIFIED: 'Email verified successfully.',
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password.',
    TOKEN_EXPIRED: 'Session expired. Please login again.',
    ACCESS_DENIED: 'You do not have permission.',
    EMAIL_NOT_FOUND: 'Email not found.',
    EMAIL_IN_USE: 'Email is already in use.',
    EMAIL_ALREADY_REGISTERED: 'Email is already registered.',
  },
  WARNING: {
    PASSWORD_WEAK: 'Your password is too weak.',
  },
  INFO: {
    VERIFY_EMAIL: 'Verification email sent if the account exists and is unverified.',
  },
};
