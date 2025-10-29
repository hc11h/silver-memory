export const RESPONSE_TAGS = {
  CREATED: 'created',
  FETCHED: 'fetched',
  UPDATED: 'updated',
  DELETED: 'deleted',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type ResponseTag = (typeof RESPONSE_TAGS)[keyof typeof RESPONSE_TAGS];
