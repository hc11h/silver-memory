import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { AppServer } from './config/startServer'; // updated import
import env from '@/config/env';
import app from './app';
import { startCronJobs } from './cron';

dotenv.config();

(async () => {
  try {
    await connectDB();

    const server = new AppServer(app, env.port);
    server.start();

    // startCronJobs();
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();
