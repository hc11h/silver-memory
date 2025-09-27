import mongoose, { Schema, Document } from 'mongoose';

export interface IBlacklistedToken extends Document {
  token: string;
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  reason?: string;
  createdAt: Date;
}

const blacklistedTokenSchema = new Schema<IBlacklistedToken>({
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true,
  },
  reason: {
    type: String,
    enum: ['logout', 'password_change', 'security_breach', 'other'],
    default: 'logout',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 0, // Managed by TTL index
  },
});

// Create TTL index to automatically remove expired tokens
blacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create compound index for faster queries
blacklistedTokenSchema.index({ token: 1, userId: 1 });

export const BlacklistedToken = mongoose.model<IBlacklistedToken>(
  'BlacklistedToken',
  blacklistedTokenSchema
);
