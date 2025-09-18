import { Schema, model, Document } from 'mongoose';

export interface IPermission extends Document {
  module: string; // e.g., "users"
  action: string; // e.g., "create"
  key: string; // e.g., "users_create"
  description?: string;
}

const permissionSchema = new Schema<IPermission>(
  {
    module: { type: String, required: true, index: true },
    action: { type: String, required: true },
    key: { type: String, required: true, unique: true }, // module+action
    description: { type: String },
  },
  { timestamps: true }
);

export const Permission = model<IPermission>('Permission', permissionSchema);
