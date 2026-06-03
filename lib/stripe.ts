import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('[Stripe] STRIPE_SECRET_KEY tanımlı değil. Ödeme sistemi demo modda çalışacak.');
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    })
  : null;

// ── Plan Tanımları ──────────────────────────────────────────────────────────

export const PLANS = {
  STANDART: {
    name: 'Standart',
    priceId: process.env.STRIPE_PRICE_STANDART ?? '',
    price: 990,
    currency: 'try',
    interval: 'month' as const,
    features: [
      '10 aktif ilan',
      '5 AI rapor/ay',
      'Mortgage hesaplayıcı',
      'Temel istatistikler',
      'Email desteği',
    ],
    limits: { listings: 10, aiReports: 5, darkPool: false },
  },
  KURUMSAL: {
    name: 'Kurumsal',
    priceId: process.env.STRIPE_PRICE_KURUMSAL ?? '',
    price: 2990,
    currency: 'try',
    interval: 'month' as const,
    features: [
      'Sınırsız ilan',
      '50 AI rapor/ay',
      'AI Değerleme motoru',
      'Deal Room & Müzakere',
      'Wealth Dashboard',
      'Portföy analitik',
      'Öncelikli destek',
    ],
    limits: { listings: -1, aiReports: 50, darkPool: false },
  },
  SOVEREIGN: {
    name: 'Sovereign',
    priceId: process.env.STRIPE_PRICE_SOVEREIGN ?? '',
    price: 9990,
    currency: 'try',
    interval: 'month' as const,
    features: [
      'Tüm Kurumsal özellikler',
      'Sınırsız AI rapor',
      'Dark Pool erişimi',
      'AI Property Copilot',
      'Investor Network',
      'API erişimi',
      'White-label seçeneği',
      'Dedicated destek',
    ],
    limits: { listings: -1, aiReports: -1, darkPool: true },
  },
} as const;

export type PlanKey = keyof typeof PLANS;

// ── Helpers ─────────────────────────────────────────────────────────────────

export function getPlanByPriceId(priceId: string): PlanKey | null {
  for (const [key, plan] of Object.entries(PLANS)) {
    if (plan.priceId === priceId) return key as PlanKey;
  }
  return null;
}

export function isStripConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
