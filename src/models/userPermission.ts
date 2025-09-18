import { Schema, model, Document, Types } from 'mongoose';

export interface IUserPermission extends Document {
  userId: Types.ObjectId;
  permissionId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userPermissionSchema = new Schema<IUserPermission>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permissionId: { type: Schema.Types.ObjectId, ref: 'Permission', required: true },
  },
  { timestamps: true }
);

userPermissionSchema.index({ userId: 1, permissionId: 1 }, { unique: true });

export const UserPermission = model<IUserPermission>('UserPermission', userPermissionSchema);
