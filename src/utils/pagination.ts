import {
  PaginationParams,
  PaginationOptions,
  PaginationMeta,
  SortOrder,
  MongoosePaginationQuery,
} from '../types/pagination.types';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const DEFAULT_SORT_ORDER: SortOrder = 'desc';
const DEFAULT_SORT_FIELD = 'createdAt';

export class PaginationUtils {
  static parseQueryParams(params: PaginationParams): PaginationOptions {
    try {
      const page = Math.max(Number(params.page || DEFAULT_PAGE), 1);
      if (isNaN(page)) {
        throw new Error('Invalid page number');
      }

      const rawLimit = Number(params.limit || DEFAULT_LIMIT);
      if (isNaN(rawLimit)) {
        throw new Error('Invalid limit number');
      }
      const limit = Math.min(Math.max(rawLimit, 1), MAX_LIMIT);

      const sortOrder = this.validateSortOrder(params.sortOrder);
      const sortBy = params.sortBy?.trim() || DEFAULT_SORT_FIELD;

      return {
        page,
        limit,
        sortBy,
        sortOrder,
      };
    } catch (error) {
      console.error('Error parsing pagination params:', error);
      return {
        page: DEFAULT_PAGE,
        limit: DEFAULT_LIMIT,
        sortBy: DEFAULT_SORT_FIELD,
        sortOrder: DEFAULT_SORT_ORDER,
      };
    }
  }

  static validateSortOrder(sortOrder?: string): SortOrder {
    if (!sortOrder) return DEFAULT_SORT_ORDER;
    const normalizedOrder = sortOrder.toLowerCase().trim();
    return normalizedOrder === 'asc' ? 'asc' : 'desc';
  }

  static createPaginationMeta(total: number, options: PaginationOptions): PaginationMeta {
    const pages = Math.ceil(total / options.limit);

    return {
      total,
      page: options.page,
      limit: options.limit,
      pages,
      hasNextPage: options.page < pages,
      hasPrevPage: options.page > 1,
      sortBy: options.sortBy,
      sortOrder: options.sortOrder,
    };
  }

  static createMongooseQuery(options: PaginationOptions): MongoosePaginationQuery {
    const skip = (options.page - 1) * options.limit;
    // const sort = options.sortBy
    //   ? { [options.sortBy]: options.sortOrder === 'asc' ? 1 : -1 }
    //   : { [DEFAULT_SORT_FIELD]: -1 };

    return {
      skip,
      limit: options.limit,
      sort: options.sortBy
        ? { [options.sortBy]: options.sortOrder === 'asc' ? 1 : (-1 as 1 | -1) }
        : { [DEFAULT_SORT_FIELD]: -1 as 1 | -1 },
    };
  }
}

// Example usage:
/*
  // In your controller:
  const paginationOptions = PaginationUtils.parseQueryParams(req.query);
  const mongooseQuery = PaginationUtils.createMongooseQuery(paginationOptions);
  
  const [items, total] = await Promise.all([
    Model.find(filter)
      .skip(mongooseQuery.skip)
      .limit(mongooseQuery.limit)
      .sort(mongooseQuery.sort),
    Model.countDocuments(filter),
  ]);

  const meta = PaginationUtils.createPaginationMeta(total, paginationOptions);

  res.json({
    success: true,
    data: {
      items,
      pagination: meta,
    },
  });
*/
