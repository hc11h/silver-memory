// Each module with its actions
export const MODULES: Record<string, string[]> = {
  users: ['create', 'read', 'update', 'delete'],
  roles: ['create', 'read', 'update', 'delete'],
  ads: ['create', 'read', 'update', 'delete', 'publish'],
  assessments: ['create', 'read', 'update', 'delete', 'approve', 'deny'],
  jobs: ['create', 'read', 'update', 'delete'],
  indexing: ['create', 'read', 'update', 'delete'],
};
