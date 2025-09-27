// import mongoose, { Schema, Document, Types } from 'mongoose';

// export interface IAuditLog extends Document {
//   userId: Types.ObjectId;
//   action: string;
//   entityType: string;
//   entityId: Types.ObjectId;
//   previousState?: any;
//   newState?: any;
//   changes: any;
//   metadata: any;
//   ipAddress: string;
//   userAgent: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const auditLogSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//       index: true,
//     },
//     action: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     entityType: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     entityId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       index: true,
//     },
//     previousState: {
//       type: Schema.Types.Mixed,
//       default: null,
//     },
//     newState: {
//       type: Schema.Types.Mixed,
//       default: null,
//     },
//     changes: {
//       type: Schema.Types.Mixed,
//       default: {},
//     },
//     metadata: {
//       type: Schema.Types.Mixed,
//       default: {},
//     },
//     ipAddress: {
//       type: String,
//       required: true,
//     },
//     userAgent: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// // Indexes for better query performance
// auditLogSchema.index({ createdAt: -1 });
// auditLogSchema.index({ action: 1, entityType: 1 });
// auditLogSchema.index({ userId: 1, createdAt: -1 });

// const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);

// export default AuditLog;
