import { Schema, model, Document } from 'mongoose';

export interface IRole extends Document {
  name: string; // Human-readable name e.g., "Funder Admin"
  key: string; // Auto key e.g., "funder_admin"
  category: string; // e.g., "funder", "admin"
  permissions: string[]; // List of permission keys
  description?: string;
}

const roleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    key: { type: String, required: true },
    category: { type: String, required: true },
    permissions: { type: [String], default: [] }, // e.g., ["users_create", "users_read"]
    description: { type: String },
  },
  { timestamps: true }
);

roleSchema.index({ key: 1 }, { unique: true });
roleSchema.index({ category: 1 });

export const Role = model<IRole>('Role', roleSchema);
