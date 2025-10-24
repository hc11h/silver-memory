import { verify } from "crypto";

export const MODULES = {
  users: ['create', 'read', 'update', 'delete'],
  roles: ['create', 'read', 'update', 'delete'],
  verify: ['create', 'read', 'update', 'delete'],
} as const;

// Build permissions object
export const PERMISSIONS = Object.fromEntries(
  Object.entries(MODULES).map(([module, actions]) => [
    module,
    Object.fromEntries(actions.map(action => [action, `${module}_${action}`]))
  ])
) as {
  [M in keyof typeof MODULES]: {
    [A in (typeof MODULES)[M][number]]: `${M}_${A}`;
  };
};

// Example usage: PERMISSIONS.users.create → "users_create"
