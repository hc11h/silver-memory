import { BlacklistedToken } from '@/models/blacklistedToken';
import { logger } from '@/utils/logger';

// Cleanup expired blacklisted tokens cron job
export async function cleanupExpiredBlacklistedTokens(): Promise<void> {
  try {
    const now = new Date();
    const result = await BlacklistedToken.deleteMany({
      expiresAt: { $lt: now },
    });

    if (result.deletedCount > 0) {
      logger.info(`Cron: Cleaned up ${result.deletedCount} expired blacklisted tokens`);
    }
  } catch (err) {
    logger.error('Cron: Failed to cleanup expired blacklisted tokens');
  }
}
