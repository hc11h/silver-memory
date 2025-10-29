import { PERMISSIONS } from './permissions.config';

export interface Role {
  name: string;
  category: 'super-admin' | 'funder' | 'grantee' | 'intermediary';
  type?: 'admin' | 'collaborator';
  permissions: string[];
}

export const ROLES: Role[] = [
  {
    name: 'Super Admin',
    category: 'super-admin',
    permissions: Object.values(PERMISSIONS).flatMap((module) => Object.values(module)), // full access
  },
  {
    name: 'Funder Admin',
    category: 'funder',
    type: 'admin',
    permissions: [
      PERMISSIONS.users.create,
      PERMISSIONS.users.read,
      PERMISSIONS.users.update,
      PERMISSIONS.users.delete,
      PERMISSIONS.verify.read,
      PERMISSIONS.verify.update,
      PERMISSIONS.verify.create,
      PERMISSIONS.verify.delete,
    ],
  },
  {
    name: 'Grantee',
    category: 'grantee',
    type: 'admin',
    permissions: [PERMISSIONS.verify.read],
  },
];
