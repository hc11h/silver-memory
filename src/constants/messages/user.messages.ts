import { ModuleMessages } from './message.types';

export const USER_MESSAGES: ModuleMessages = {
  SUCCESS: {
    CREATED: 'User created successfully.',
    UPDATED: 'User updated successfully.',
    DELETED: 'User deleted successfully.',
  },
  ERROR: {
    NOT_FOUND: 'User not found.',
    EMAIL_IN_USE: 'This email is already in use.',
  },
  INFO: {
    PROFILE_INCOMPLETE: 'Please complete your profile.',
  },
  WARNING: {},
};
