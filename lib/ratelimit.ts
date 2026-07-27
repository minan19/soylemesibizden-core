import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

type Window = `${number} ${'s' | 'm' | 'h' | 'd'}`;

const cache = new Map<string, Ratelimit>();

function getLimiter(limit: number, window: Window): Ratelimit | null {
  if (!isConfigured) return null;
  const key = limit + ':' + window;
  let l = cache.get(key);
  if (!l) {
    l = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.fixedWindow(limit, window),
      analytics: true,
    });
    cache.set(key, l);
  }
  return l;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  reason?: 'not-configured' | 'error';
}

export async function checkRateLimit(
  identifier: string,
  opts: { limit?: number; window?: Window } = {}
): Promise<RateLimitResult> {
  const { limit = 10, window = '1 m' } = opts;
  const allowOnFailure = process.env.NODE_ENV !== 'production';

  const limiter = getLimiter(limit, window);
  if (!limiter) {
    if (!allowOnFailure) {
      console.error('[ratelimit] Upstash yapilandirilmamis - istek reddedildi.');
    }
    return {
      success: allowOnFailure,
      limit,
      remaining: allowOnFailure ? limit : 0,
      reset: Date.now(),
      reason: 'not-configured',
    };
  }

  try {
    const res = await limiter.limit(identifier);
    return {
      success: res.success,
      limit: res.limit,
      remaining: res.remaining,
      reset: res.reset,
    };
  } catch (error) {
    console.error('[ratelimit] hata:', error);
    return {
      success: allowOnFailure,
      limit,
      remaining: allowOnFailure ? limit : 0,
      reset: Date.now(),
      reason: 'error',
    };
  }
}
