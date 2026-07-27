const CRITICAL = ['DATABASE_URL', 'NEXTAUTH_SECRET'] as const;

export const FEATURES = {
  payments: Boolean(process.env.STRIPE_SECRET_KEY),
  rateLimit: Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ),
  ai: Boolean(process.env.ANTHROPIC_API_KEY),
} as const;

export function assertEnv(): void {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  const isProd = process.env.NODE_ENV === 'production';

  const missing = CRITICAL.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    const msg = '[env] Kritik ortam degiskenleri eksik: ' + missing.join(', ');
    if (isProd && !isBuildPhase) throw new Error(msg);
    console.warn(msg + ' - build/gelistirme asamasinda devam ediliyor.');
  }

  const off = Object.entries(FEATURES).filter(([, on]) => !on).map(([k]) => k);
  if (off.length > 0) console.warn('[env] Devre disi ozellikler: ' + off.join(', '));
}
