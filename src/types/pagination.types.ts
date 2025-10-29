export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder: SortOrder;
}

export interface MongoosePaginationQuery {
  skip: number;
  limit: number;
  sort: Record<string, 1 | -1>;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  sortBy?: string;
  sortOrder: SortOrder;
}
