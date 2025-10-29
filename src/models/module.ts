import { Schema, model, Document } from 'mongoose';

export interface IModule extends Document {
  key: string; // e.g., "users"
  name: string; // Human name, e.g., "User Management"
  description?: string;
  isActive: boolean; // feature toggle
}

const moduleSchema = new Schema<IModule>(
  {
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Module = model<IModule>('Module', moduleSchema);
