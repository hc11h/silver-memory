import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  keyGenerator: (req) => {
    const ip = req.ip;
    const userId = (req as any).user?.id || 'guest';
    return `${ip}_${userId}`;
  },
});
