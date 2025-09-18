import { Router } from 'express';
import { validateSchema } from '@/middleware';
import { authenticate } from '@/middleware/auth.middleware';
import { createSchema, updateSchema } from '../schemas/customer.schemas';
import * as Controller from '../controller/customer.controller';

const router = Router();

router.get('/', authenticate, Controller.getAll);
router.get('/:id', Controller.getById);
router.post('/', validateSchema(createSchema), Controller.create);
router.patch('/:id', validateSchema(updateSchema), Controller.update);
router.delete('/:id', Controller.remove);

export default router;
