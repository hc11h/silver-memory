// import { Router } from 'express';
// import { AuditController } from '../controllers/audit.controller';
// import { requirePermission } from '../../../middleware/requirePermission';
// import { authenticate } from '@/middleware';

// const router = Router();

// // Apply authentication middleware to all routes
// router.use(authenticate);

// // Get all audit logs (requires view permission)
// router.get('/', requirePermission('audit.view'), AuditController.getLogs);

// // Get specific audit log by ID
// router.get('/:id', requirePermission('audit.view'), AuditController.getLogById);

// // Get audit logs for a specific entity
// router.get(
//   '/entity/:entityType/:entityId',
//   requirePermission('audit.view'),
//   AuditController.getLogsByEntity
// );

// // Get audit logs for a specific user
// router.get('/user/:userId', requirePermission('audit.view'), AuditController.getLogsByUser);

// // Advanced query endpoint
// router.get('/query', requirePermission('audit.view'), AuditController.queryLogs);

// // Get audit summary
// router.get('/summary', requirePermission('audit.view'), AuditController.getAuditSummary);

// export default router;
