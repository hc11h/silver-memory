import app from '@/app';
import { connectDB } from '@/config/db';
import { Request, Response } from 'express';

let isConnected = false;

export default async function handler(req: Request, res: Response) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
}
