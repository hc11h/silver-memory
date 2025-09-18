export const ROLES = [
  {
    name: 'Super Admin',
    category: 'admin',
    permissions: ['*'], // All permissions
  },
  {
    name: 'Funder Admin',
    category: 'funder',
    permissions: ['users_create', 'users_read', 'users_update', 'users_delete', 'ads_publish'],
  },
  {
    name: 'Funder Manager',
    category: 'funder',
    permissions: ['users_read', 'ads_create', 'ads_update'],
  },
  {
    name: 'Funder Viewer',
    category: 'funder',
    permissions: ['users_read', 'ads_read'],
  },
  {
    name: 'Grantee',
    category: 'grantee',
    permissions: ['assessments_read', 'jobs_read'],
  },
];
