import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { startServer } from './config/startServer';
import env from '@/config/env';
import app from './app';

dotenv.config();

(async () => {
  await connectDB(); // Connect to MongoDB
  startServer(app, env.port); // Start Express server
})();
