import express from 'express';
import cors from 'cors';
import apiRouter from './routes';
import { apiLimiter } from '@/middleware';
import errorMiddleware, { errorHandler } from '@/middleware/error.middleware';
import { HttpError } from '@/utils/apis';
import helmet from 'helmet';

const app = express();

app.use(
  cors({
    origin: 'https://filantro-frontend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(helmet());

app.use('/api', apiLimiter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/v1', apiRouter);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(errorHandler);

export default app;
