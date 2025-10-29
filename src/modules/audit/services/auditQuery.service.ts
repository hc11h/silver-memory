// import { FilterQuery, Types } from 'mongoose';
// import { IAuditLog } from '../../../models/auditLog';
// import { AuditService } from './audit.service';
// import { PaginationOptions } from '../../../types/pagination.types';
// import { PaginationUtils } from '../../../utils/pagination';

// export interface AuditQueryOptions {
//   page?: number | string;
//   limit?: number | string;
//   sortBy?: string;
//   sortOrder?: 'asc' | 'desc';
//   startDate?: string | Date;
//   endDate?: string | Date;
//   actions?: string | string[];
//   entityTypes?: string | string[];
//   userIds?: string | string[];
//   searchTerm?: string;
// }

// export class AuditQueryService {
//   static async queryLogs(
//     options: AuditQueryOptions
//   ): Promise<{ logs: IAuditLog[]; total: number }> {
//     const filter: FilterQuery<IAuditLog> = {};

//     try {
//       // Date range filter
//       if (options.startDate || options.endDate) {
//         filter.createdAt = {};
//         if (options.startDate) {
//           filter.createdAt.$gte = new Date(options.startDate);
//         }
//         if (options.endDate) {
//           filter.createdAt.$lte = new Date(options.endDate);
//         }
//       }

//       // Actions filter
//       if (options.actions) {
//         const actionsList = Array.isArray(options.actions)
//           ? options.actions
//           : options.actions.split(',');
//         if (actionsList.length > 0) {
//           filter.action = { $in: actionsList };
//         }
//       }

//       // Entity types filter
//       if (options.entityTypes) {
//         const typesList = Array.isArray(options.entityTypes)
//           ? options.entityTypes
//           : options.entityTypes.split(',');
//         if (typesList.length > 0) {
//           filter.entityType = { $in: typesList };
//         }
//       }

//       // Users filter
//       if (options.userIds) {
//         const usersList = Array.isArray(options.userIds)
//           ? options.userIds
//           : options.userIds.split(',');
//         if (usersList.length > 0) {
//           filter.userId = {
//             $in: usersList.map((id) => new Types.ObjectId(id)),
//           };
//         }
//       }

//       // Search term (searches in changes and metadata)
//       if (options.searchTerm) {
//         const searchRegex = new RegExp(options.searchTerm.trim(), 'i');
//         filter.$or = [
//           { action: searchRegex },
//           { entityType: searchRegex },
//           { 'changes.old': searchRegex },
//           { 'changes.new': searchRegex },
//           { 'metadata.description': searchRegex },
//         ];
//       }

//       const paginationOptions = PaginationUtils.parseQueryParams(options);
//       return await AuditService.getLogs(filter, paginationOptions);
//     } catch (error) {
//       console.error('Error in queryLogs:', error);
//       throw error;
//     }
//   }

//   static async getAuditSummary(startDate: Date, endDate: Date) {
//     const filter: FilterQuery<IAuditLog> = {
//       createdAt: {
//         $gte: startDate,
//         $lte: endDate,
//       },
//     };

//     const [totalLogs, actionCounts, entityTypeCounts, userActivityCounts] = await Promise.all([
//       AuditService.getLogs(filter, {
//         page: 1,
//         limit: 1,
//         sortBy: 'createdAt',
//         sortOrder: 'desc',
//       }).then((result) => result.total),
//       this.getActionCounts(filter),
//       this.getEntityTypeCounts(filter),
//       this.getUserActivityCounts(filter),
//     ]);

//     return {
//       totalLogs,
//       actionCounts,
//       entityTypeCounts,
//       userActivityCounts,
//       timeRange: {
//         start: startDate,
//         end: endDate,
//       },
//     };
//   }

//   private static async getActionCounts(baseFilter: FilterQuery<IAuditLog>) {
//     const pipeline = [
//       { $match: baseFilter },
//       { $group: { _id: '$action', count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ];

//     return await this.executeAggregation(pipeline);
//   }

//   private static async getEntityTypeCounts(baseFilter: FilterQuery<IAuditLog>) {
//     const pipeline = [
//       { $match: baseFilter },
//       { $group: { _id: '$entityType', count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//     ];

//     return await this.executeAggregation(pipeline);
//   }

//   private static async getUserActivityCounts(baseFilter: FilterQuery<IAuditLog>) {
//     const pipeline = [
//       { $match: baseFilter },
//       { $group: { _id: '$userId', count: { $sum: 1 } } },
//       { $sort: { count: -1 } },
//       { $limit: 10 }, // Top 10 most active users
//       {
//         $lookup: {
//           from: 'users',
//           localField: '_id',
//           foreignField: '_id',
//           as: 'user',
//         },
//       },
//       {
//         $project: {
//           _id: 1,
//           count: 1,
//           user: { $arrayElemAt: ['$user', 0] },
//         },
//       },
//     ];

//     return await this.executeAggregation(pipeline);
//   }

//   private static async executeAggregation(pipeline: mongoose.PipelineStage[]) {
//     try {
//       return await AuditLog.aggregate(pipeline).exec();
//     } catch (error) {
//       console.error('Error executing aggregation:', error);
//       throw error;
//     }
//   }
// }
