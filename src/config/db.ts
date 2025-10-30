import mongoose from 'mongoose';
import env from '../config/env';
import { seedRBAC } from '@/seeders/modularPermissionsSeeder';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoose.url || '');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};
