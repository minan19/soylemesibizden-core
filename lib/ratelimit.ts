import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize rate limiter
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, '1 m'), // 10 requests per minute
  analytics: true,
});

/**
 * Check rate limit for user
 * Returns { success, pending, reset, remaining, limit }
 */
export async function checkRateLimit(userId: string) {
  const identifier = `decision:${userId}`;
  return await ratelimit.limit(identifier);
}
