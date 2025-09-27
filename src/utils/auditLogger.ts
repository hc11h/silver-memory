// import { Request } from 'express';
// import { AuditService } from '../modules/audit/services/audit.service';
// import { IAuditLog } from '../models/auditLog';
// import { Types } from 'mongoose';

// export interface AuditLogData {
//   action: string;
//   entityType: string;
//   entityId: string | Types.ObjectId;
//   previousState?: Record<string, any> | null;
//   newState?: Record<string, any> | null;
//   metadata?: Record<string, any>;
// }

// export class AuditLogger {
//   static async log(req: Request, data: AuditLogData): Promise<IAuditLog> {
//     try {
//       if (!req.user?._id) {
//         throw new Error('User ID is required for audit logging');
//       }

//       const changes = this.computeChanges(data.previousState || {}, data.newState || {});

//       const entityId =
//         typeof data.entityId === 'string' ? new Types.ObjectId(data.entityId) : data.entityId;

//       const logData: Partial<IAuditLog> = {
//         userId: new Types.ObjectId(req.user._id),
//         action: data.action,
//         entityType: data.entityType,
//         entityId,
//         previousState: data.previousState || null,
//         newState: data.newState || null,
//         changes,
//         metadata: data.metadata || {},
//         ipAddress: this.getClientIp(req),
//         userAgent: req.get('user-agent') || 'Unknown',
//       };

//       return await AuditService.createLog(logData);
//     } catch (error) {
//       console.error('Error in audit logging:', error);
//       throw error;
//     }
//   }

//   private static computeChanges(
//     previousState: Record<string, any>,
//     newState: Record<string, any>
//   ): Record<string, { old: any; new: any }> {
//     try {
//       const changes: Record<string, { old: any; new: any }> = {};
//       const allKeys = new Set([...Object.keys(previousState), ...Object.keys(newState)]);

//       allKeys.forEach((key) => {
//         const oldValue = previousState[key];
//         const newValue = newState[key];

//         // Handle undefined values
//         const normalizedOldValue = oldValue === undefined ? null : oldValue;
//         const normalizedNewValue = newValue === undefined ? null : newValue;

//         // Compare stringified values to handle objects and arrays
//         if (JSON.stringify(normalizedOldValue) !== JSON.stringify(normalizedNewValue)) {
//           changes[key] = {
//             old: normalizedOldValue,
//             new: normalizedNewValue,
//           };
//         }
//       });

//       return changes;
//     } catch (error) {
//       console.error('Error computing changes:', error);
//       return {};
//     }
//   }

//   private static getClientIp(req: Request): string {
//     try {
//       const forwardedFor = req.headers['x-forwarded-for'];
//       if (forwardedFor) {
//         const ip = Array.isArray(forwardedFor)
//           ? forwardedFor[0]
//           : forwardedFor.split(',')[0].trim();
//         return ip || 'Unknown';
//       }

//       // Try different sources for IP address
//       const directIp =
//         req.ip || req.socket?.remoteAddress || (req.headers['x-real-ip'] as string) || 'Unknown';

//       return directIp.replace(/^::ffff:/, ''); // Remove IPv6 prefix if present
//     } catch (error) {
//       console.error('Error getting client IP:', error);
//       return 'Unknown';
//     }
//   }
// }
