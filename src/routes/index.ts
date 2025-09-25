import { Router } from 'express';
import authRoutes from '@/modules/auth/routes/auth.routes';
import userRoutes from '@/modules/user/routes/user.routes';
import entityRoutes from '@/modules/entity/routes/entity.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/user', userRoutes);
apiRouter.use('/entity', entityRoutes);

export default apiRouter;
