import mongoose, { FilterQuery, Types } from 'mongoose';
import AuditLog, { IAuditLog } from '../../../models/auditLog';
import { PaginationUtils } from '../../../utils/pagination';
import { PaginationOptions } from '../../../types/pagination.types';

export class AuditService {
  static async createLog(logData: Partial<IAuditLog>): Promise<IAuditLog> {
    const auditLog = new AuditLog(logData);
    return await auditLog.save();
  }

  static async getLogs(
    filter: FilterQuery<IAuditLog> = {},
    options: PaginationOptions = {}
  ): Promise<{ logs: IAuditLog[]; total: number }> {
    try {
      const queryOptions = PaginationUtils.createMongooseQuery(options);
      const [logs, total] = await Promise.all([
        AuditLog.find(filter)
          .sort(queryOptions.sort as { [key: string]: mongoose.SortOrder })
          .skip(queryOptions.skip)
          .limit(queryOptions.limit)
          .populate('userId', 'name email')
          .exec(),
        AuditLog.countDocuments(filter),
      ]);

      return { logs, total };
    } catch (error) {
      console.error('Error in getLogs:', error);
      throw error;
    }
  }

  static async getLogById(id: string): Promise<IAuditLog | null> {
    try {
      const objectId = new Types.ObjectId(id);
      return await AuditLog.findById(objectId).populate('userId', 'name email');
    } catch (error) {
      console.error('Error in getLogById:', error);
      throw error;
    }
  }

  static async getLogsByEntity(
    entityType: string,
    entityId: string,
    options: PaginationOptions
  ): Promise<{ logs: IAuditLog[]; total: number }> {
    try {
      const filter = {
        entityType,
        entityId: new Types.ObjectId(entityId),
      };
      return await this.getLogs(filter, options);
    } catch (error) {
      console.error('Error in getLogsByEntity:', error);
      throw error;
    }
  }

  static async getLogsByUser(
    userId: string,
    options: PaginationOptions
  ): Promise<{ logs: IAuditLog[]; total: number }> {
    try {
      const filter = { userId: new Types.ObjectId(userId) };
      return await this.getLogs(filter, options);
    } catch (error) {
      console.error('Error in getLogsByUser:', error);
      throw error;
    }
  }

  static async getLogsByAction(
    action: string,
    options: PaginationOptions
  ): Promise<{ logs: IAuditLog[]; total: number }> {
    const filter = { action };
    return await this.getLogs(filter, options);
  }
}
