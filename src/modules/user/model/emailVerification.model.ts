import mongoose, { Schema, Document } from 'mongoose';

export interface IEmailVerification extends Document {
  userId: mongoose.Types.ObjectId;
  email: string;
  code: string;
  type: VerificationType; // added this to match schema
  expiresAt: Date;
  attempts: number;
  resendCount: number;
  createdAt: Date; // ✅ added
  updatedAt: Date; // ✅ added
}

export type VerificationType = 'email-verification' | 'password-reset' | 'forgot-password';

const EmailVerificationSchema = new Schema<IEmailVerification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    type: {
      type: String,
      enum: ['email-verification', 'password-reset', 'forgot-password'],
      required: true,
    },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    resendCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-delete after expiration using TTL index
EmailVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const EmailVerification = mongoose.model<IEmailVerification>(
  'EmailVerification',
  EmailVerificationSchema
);
