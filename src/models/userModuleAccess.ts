import { Schema, model, Document, Types } from 'mongoose';

export interface IUserModuleAccess extends Document {
  userId: Types.ObjectId;
  moduleId: Types.ObjectId;
  fullAccess: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userModuleAccessSchema = new Schema<IUserModuleAccess>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    fullAccess: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userModuleAccessSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export const UserModuleAccess = model<IUserModuleAccess>(
  'UserModuleAccess',
  userModuleAccessSchema
);
