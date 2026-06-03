import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Upstash Redis bağlantısı.
 * UPSTASH_REDIS_REST_URL ve UPSTASH_REDIS_REST_TOKEN env var'larından alır.
 * Bu değişkenler yoksa rate limiting devre dışı kalır (graceful fallback).
 */
function createRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

const redis = createRedis();

/**
 * AI endpoint'ler için rate limiter.
 * Kullanıcı başına: dakikada 10 istek (sliding window).
 * UPSTASH yoksa limit uygulanmaz — development ortamı için güvenli.
 */
export const aiRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '1 m'),
      analytics: true,
      prefix: 'sovereign:ai',
    })
  : null;

/**
 * Genel API endpoint'ler için rate limiter.
 * IP başına: dakikada 60 istek.
 */
export const apiRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, '1 m'),
      analytics: true,
      prefix: 'sovereign:api',
    })
  : null;

/**
 * Auth endpoint'ler için rate limiter.
 * IP başına: dakikada 5 istek (brute-force koruması).
 */
export const authRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '1 m'),
      analytics: true,
      prefix: 'sovereign:auth',
    })
  : null;

/**
 * Rate limit kontrolü yapar.
 * @param limiter - Kullanılacak Ratelimit instance
 * @param identifier - Kullanıcı ID veya IP adresi
 * @returns { success, remaining, reset } veya null (limiter yoksa)
 */
export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string
): Promise<{ success: boolean; remaining: number; reset: number } | null> {
  if (!limiter) return null;

  const { success, remaining, reset } = await limiter.limit(identifier);
  return { success, remaining, reset };
}
