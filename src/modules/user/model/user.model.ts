import { Schema, model, Document, Types } from 'mongoose';
import { MODEL_NAMES } from '@/constants/models';

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface ISocialInfo {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface IPersonalInfo {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roleKey: string;
  isSuperAdmin: boolean;
  isEmailVerified?: boolean;
  status?: 'active' | 'inactive';
  metadata?: Record<string, any>;
  personalInfo?: IPersonalInfo;
  socialInfo?: ISocialInfo;
  addressInfo?: IAddress;
  entityId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const addressSchema = new Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  { _id: false }
);

const socialInfoSchema = new Schema(
  {
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  { _id: false }
);

const personalInfoSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, trim: true },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    roleKey: { type: String, required: true, default: 'grantee' },
    isSuperAdmin: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    metadata: { type: Schema.Types.Mixed, default: {} } as any,
    personalInfo: { type: personalInfoSchema, default: {} },
    socialInfo: { type: socialInfoSchema, default: {} },
    addressInfo: { type: addressSchema, default: {} },
    entityId: { type: Schema.Types.ObjectId, ref: MODEL_NAMES.ENTITY, default: null },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
