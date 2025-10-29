// import { Request, Response, NextFunction } from 'express';
// import { AuditLogger, AuditLogData } from '../utils/auditLogger';

// export interface AuditLogOptions {
//   action: string;
//   entityType: string;
//   getEntityId: (req: Request) => string;
//   getPreviousState?: (req: Request) => Promise<Record<string, any> | null>;
//   getNewState?: (req: Request) => Promise<Record<string, any> | null>;
//   getMetadata?: (req: Request) => Record<string, any>;
// }

// export const auditLog = (options: AuditLogOptions) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     // Store the original send function
//     const originalSend = res.send;

//     // Override the send function
//     res.send = function (body: any): Response {
//       // Restore the original send
//       res.send = originalSend;

//       // Only log for successful operations
//       if (res.statusCode >= 200 && res.statusCode < 300) {
//         const logData: AuditLogData = {
//           action: options.action,
//           entityType: options.entityType,
//           entityId: options.getEntityId(req),
//           metadata: options.getMetadata ? options.getMetadata(req) : undefined,
//         };

//         // Log the audit asynchronously
//         Promise.all([
//           options.getPreviousState ? options.getPreviousState(req) : Promise.resolve(null),
//           options.getNewState ? options.getNewState(req) : Promise.resolve(null),
//         ])
//           .then(([previousState, newState]) => {
//             logData.previousState = previousState || undefined;
//             logData.newState = newState || undefined;
//             return AuditLogger.log(req, logData);
//           })
//           .catch((error) => {
//             console.error('Error creating audit log:', error);
//           });
//       }

//       // Call the original send
//       return originalSend.call(this, body);
//     };

//     next();
//   };
// };

// // Example usage:
// /*
// router.put(
//   '/users/:id',
//   auditLog({
//     action: 'UPDATE_USER',
//     entityType: 'User',
//     getEntityId: (req) => req.params.id,
//     getPreviousState: async (req) => {
//       const user = await User.findById(req.params.id);
//       return user?.toObject();
//     },
//     getNewState: (req) => req.body,
//     getMetadata: (req) => ({
//       updatedFields: Object.keys(req.body),
//       requestId: req.headers['x-request-id'],
//     }),
//   }),
//   userController.updateUser
// );
// */
