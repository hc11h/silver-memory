import { Schema, model, Document } from 'mongoose';

interface Icustomer extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const customerSchema = new Schema<Icustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const customer = model<Icustomer>('customer', customerSchema);
