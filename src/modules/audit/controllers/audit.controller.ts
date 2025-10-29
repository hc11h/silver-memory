// import { Request, Response } from 'express';
// import { AuditService } from '../services/audit.service';
// import { AuditQueryService, AuditQueryOptions } from '../services/auditQuery.service';
// import { catchAsync } from '../../../utils/catchAsync';
// import { PaginationUtils } from '../../../utils/pagination';
// import { PaginationParams } from '../../../types/pagination.types';

// export class AuditController {
//   static getLogs = catchAsync(async (req: Request, res: Response) => {
//     const { entityType, entityId, userId, action, ...paginationParams } = req.query;

//     const filter: any = {};
//     if (entityType) filter.entityType = entityType;
//     if (entityId) filter.entityId = entityId;
//     if (userId) filter.userId = userId;
//     if (action) filter.action = action;

//     const paginationOptions = PaginationUtils.parseQueryParams(
//       paginationParams as PaginationParams
//     );
//     const { logs, total } = await AuditService.getLogs(filter, paginationOptions);
//     const paginationMeta = PaginationUtils.createPaginationMeta(total, paginationOptions);

//     res.json({
//       success: true,
//       data: {
//         logs,
//         pagination: paginationMeta,
//       },
//     });
//   });

//   static getLogById = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const log = await AuditService.getLogById(id);

//     if (!log) {
//       return res.status(404).json({
//         success: false,
//         message: 'Audit log not found',
//       });
//     }

//     res.json({
//       success: true,
//       data: log,
//     });
//   });

//   static getLogsByEntity = catchAsync(async (req: Request, res: Response) => {
//     const { entityType, entityId } = req.params;
//     const paginationOptions = PaginationUtils.parseQueryParams(req.query);

//     const { logs, total } = await AuditService.getLogsByEntity(
//       entityType,
//       entityId,
//       paginationOptions
//     );

//     const paginationMeta = PaginationUtils.createPaginationMeta(total, paginationOptions);

//     res.json({
//       success: true,
//       data: {
//         logs,
//         pagination: paginationMeta,
//       },
//     });
//   });

//   static getLogsByUser = catchAsync(async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     const paginationOptions = PaginationUtils.parseQueryParams(req.query);

//     const { logs, total } = await AuditService.getLogsByUser(userId, paginationOptions);
//     const paginationMeta = PaginationUtils.createPaginationMeta(total, paginationOptions);

//     res.json({
//       success: true,
//       data: {
//         logs,
//         pagination: paginationMeta,
//       },
//     });
//   });

//   static queryLogs = catchAsync(async (req: Request, res: Response) => {
//     const { startDate, endDate, actions, entityTypes, userIds, searchTerm, ...paginationParams } =
//       req.query;

//     const queryOptions: AuditQueryOptions = {
//       ...PaginationUtils.parseQueryParams(paginationParams),
//       startDate: startDate ? new Date(startDate as string) : undefined,
//       endDate: endDate ? new Date(endDate as string) : undefined,
//       actions: actions as string | string[],
//       entityTypes: entityTypes as string | string[],
//       userIds: userIds as string | string[],
//       searchTerm: searchTerm as string,
//     };

//     const { logs, total } = await AuditQueryService.queryLogs(queryOptions);
//     const paginationMeta = PaginationUtils.createPaginationMeta(total, queryOptions);

//     res.json({
//       success: true,
//       data: {
//         logs,
//         pagination: paginationMeta,
//       },
//     });
//   });

//   static getAuditSummary = catchAsync(async (req: Request, res: Response) => {
//     const { startDate, endDate } = req.query;

//     if (!startDate || !endDate) {
//       return res.status(400).json({
//         success: false,
//         message: 'Start date and end date are required',
//       });
//     }

//     try {
//       const start = new Date(startDate as string);
//       const end = new Date(endDate as string);

//       if (isNaN(start.getTime()) || isNaN(end.getTime())) {
//         return res.status(400).json({
//           success: false,
//           message: 'Invalid date format',
//         });
//       }

//       if (start > end) {
//         return res.status(400).json({
//           success: false,
//           message: 'Start date must be before end date',
//         });
//       }

//       const summary = await AuditQueryService.getAuditSummary(start, end);

//       res.json({
//         success: true,
//         data: summary,
//       });
//     } catch (error) {
//       console.error('Error in getAuditSummary:', error);
//       res.status(400).json({
//         success: false,
//         message: 'Invalid date format or range',
//       });
//     }
//   });
// }
