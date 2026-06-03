import { createHash, randomBytes } from 'crypto';

/**
 * Güvenli rastgele API key üret.
 * Format: svk_live_<32 hex karakter>
 */
export function generateApiKey(): string {
  const random = randomBytes(24).toString('hex');
  return `svk_live_${random}`;
}

/**
 * API key hash'ini hesapla (DB'de hash sakla, plain text değil).
 */
export function hashApiKey(key: string): string {
  return createHash('sha256').update(key).digest('hex');
}

/**
 * Plan başına günlük limit
 */
export const PLAN_LIMITS: Record<string, number> = {
  STARTER:    1_000,
  GROWTH:     10_000,
  ENTERPRISE: -1,       // sınırsız
};

export function isWithinLimit(plan: string, callsToday: number): boolean {
  const limit = PLAN_LIMITS[plan] ?? 1_000;
  return limit === -1 || callsToday < limit;
}
