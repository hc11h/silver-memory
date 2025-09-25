import express from 'express';
import cors from 'cors';
import apiRouter from './routes';

import { apiLimiter } from '@/middleware';
import errorMiddleware from '@/middleware/error.middleware';
import { HttpError } from '@/utils/apis';
import helmet from 'helmet';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api', apiLimiter);

// Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: Error | HttpError, req: express.Request, res: express.Response) => {
  errorMiddleware(err, req, res);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

export default app;
