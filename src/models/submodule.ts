import { Schema, model, Document, Types } from 'mongoose';

export interface ISubmodule extends Document {
  moduleId: Types.ObjectId;
  name: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const submoduleSchema = new Schema<ISubmodule>(
  {
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    name: { type: String, required: true },
    description: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

submoduleSchema.index({ moduleId: 1, name: 1 }, { unique: true });

export const Submodule = model<ISubmodule>('Submodule', submoduleSchema);
