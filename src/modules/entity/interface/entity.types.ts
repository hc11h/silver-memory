export type CreateEntityInput = {
  name: string;
  slug: string;
  entityType:
    | 'academia'
    | 'business'
    | 'government'
    | 'grantmaker'
    | 'funder'
    | 'intermediary'
    | 'nonprofit';
  description?: string;
  website?: string;
  contactEmail?: string;
  country?: string;
  region?: string;
  city?: string;
};

export type UpdateEntityInput = Partial<CreateEntityInput>;

export type ClaimEntityInput = {
  entityId: string;
  message?: string;
};
