import express from 'express';
import cors from 'cors';
import apiRouter from './routes';

import { apiLimiter } from '@/middleware';
import errorMiddleware from '@/middleware/error.middleware';
import { HttpError } from '@/utils/apis';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api', apiLimiter);

// Serve static Swagger YAML and mount Swagger UI
const docsDir = path.join(__dirname, 'docs');
app.use('/docs', express.static(docsDir));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: { url: '/docs/swagger.yaml' },
  })
);

// Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use(
  (
    err: Error | HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorMiddleware(err, req, res, next);
  }
);
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

export default app;
