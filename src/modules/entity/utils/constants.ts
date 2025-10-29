export const ENTITY_TYPES = [
  'academia',
  'business',
  'government',
  'grantmaker',
  'funder',
  'intermediary',
  'nonprofit',
] as const;

export const ENTITY_GROUPS = ['A', 'B'] as const;

export const CLAIM_STATUSES = ['pending', 'approved', 'rejected'] as const;
export const DOCUMENT_STATUSES = ['pending', 'verified', 'rejected'] as const;

export const ENTITY_GROUP_BY_TYPE: Record<
  (typeof ENTITY_TYPES)[number],
  (typeof ENTITY_GROUPS)[number]
> = {
  academia: 'A',
  business: 'A',
  government: 'A',
  grantmaker: 'B',
  funder: 'B',
  intermediary: 'B',
  nonprofit: 'B',
};
