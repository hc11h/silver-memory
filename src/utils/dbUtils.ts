import { Model, FilterQuery, UpdateQuery, Document, QueryOptions, Types } from 'mongoose';

/**
 * Utility: Proper return type based on whether `lean` is enabled or not.
 */
type LeanResult<T, L extends boolean | undefined> = L extends true ? Omit<T, keyof Document> : T;

/**
 * Find document by ID
 */
export async function findById<T extends Document, L extends boolean | undefined = false>(
  model: Model<T>,
  id: string | Types.ObjectId,
  select: string = '',
  options?: { lean?: L }
): Promise<LeanResult<T, L> | null> {
  const query = model.findById(id).select(select);
  return options?.lean ? (query.lean() as any) : query;
}

/**
 * Find one document
 */
export async function findOne<T extends Document, L extends boolean | undefined = false>(
  model: Model<T>,
  filter: FilterQuery<T>,
  select: string = '',
  options?: { lean?: L }
): Promise<LeanResult<T, L> | null> {
  const query = model.findOne(filter).select(select);
  return options?.lean ? (query.lean() as any) : query;
}

/**
 * Find multiple documents
 */
export async function findAll<T extends Document, L extends boolean | undefined = false>(
  model: Model<T>,
  filter: FilterQuery<T> = {},
  select: string = '',
  options?: { lean?: L }
): Promise<LeanResult<T, L>[]> {
  const query = model.find(filter).select(select);
  return options?.lean ? (query.lean() as any) : query;
}

/**
 * Create a single document
 */
export async function createOne<T extends Document>(model: Model<T>, data: Partial<T>): Promise<T> {
  const doc = new model(data);
  return doc.save();
}

/**
 * Update one document by ID
 */
export async function updateOne<T extends Document>(
  model: Model<T>,
  id: string | Types.ObjectId,
  updates: UpdateQuery<T>,
  options: QueryOptions = { new: true }
): Promise<T | null> {
  return model.findByIdAndUpdate(id, updates, options);
}

/**
 * Delete one document by ID
 */
export async function deleteOne<T extends Document>(
  model: Model<T>,
  id: string | Types.ObjectId
): Promise<T | null> {
  return model.findByIdAndDelete(id);
}
