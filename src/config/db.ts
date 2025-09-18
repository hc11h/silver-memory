import mongoose from 'mongoose';
import env from '@/config/env';
import { seedRBAC } from '@/seeders/modularPermissionsSeeder';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoose.url || '');
    console.log('✅ MongoDB Connected');

    await seedRBAC();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('🧪 MongoDB connection closed');
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:', err);
  }
};
