'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Zap, Building2, Crown, ArrowLeft, Loader2 } from 'lucide-react';
import { PLANS } from '@/lib/stripe';

const PLAN_ICONS = { STANDART: Zap, KURUMSAL: Building2, SOVEREIGN: Crown };
const PLAN_COLORS = {
  STANDART:  { accent: '#3B82F6', bg: 'bg-blue-50',   badge: 'bg-blue-100 text-blue-700' },
  KURUMSAL:  { accent: '#00C49F', bg: 'bg-[#F0FDF8]', badge: 'bg-[#F0FDF8] text-[#00C49F]' },
  SOVEREIGN: { accent: '#D4AF37', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' },
};

type PlanKey = keyof typeof PLANS;

export default function PricingPage() {
  const [loading, setLoading] = useState<PlanKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (plan: PlanKey) => {
    setError(null);
    setLoading(plan);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json() as { url?: string; error?: string; demo?: boolean };

      if (data.demo) {
        setError('Stripe henüz yapılandırılmamış. STRIPE_SECRET_KEY ekleyin.');
        return;
      }
      if (!res.ok || data.error) {
        setError(data.error ?? 'Bir hata oluştu.');
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-3">
            SOVEREIGN INTELLIGENCE
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-[#0F172A] mb-4">
            Sadelik değil, güç seçin.
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto leading-relaxed">
            Türkiye'nin en gelişmiş gayrimenkul platformuna erişin.
            Her plan anında aktif, iptal her zaman mümkün.
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 rounded-2xl px-6 py-4 text-center">
            <p className="text-sm font-semibold text-red-500">{error}</p>
          </div>
        )}

        {/* Plan Cards */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {(Object.keys(PLANS) as PlanKey[]).map((key, idx) => {
            const plan = PLANS[key];
            const Icon = PLAN_ICONS[key];
            const colors = PLAN_COLORS[key];
            const isPopular = key === 'KURUMSAL';

            return (
              <div
                key={key}
                className={`relative bg-white rounded-[32px] border-2 p-8 shadow-sm flex flex-col transition-all hover:shadow-lg ${
                  isPopular ? 'border-[#00C49F] shadow-[#00C49F]/10 shadow-lg' : 'border-gray-100'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00C49F] text-white text-[9px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                    EN POPÜLER
                  </div>
                )}

                {/* Plan Header */}
                <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center mb-5`}>
                  <Icon size={22} style={{ color: colors.accent }} />
                </div>

                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">
                  Plan {idx + 1}
                </p>
                <h2 className="text-2xl font-black tracking-tight mb-1" style={{ color: colors.accent }}>
                  {plan.name}
                </h2>

                <div className="flex items-baseline gap-1 mt-3 mb-6">
                  <span className="text-4xl font-black tracking-tighter text-[#0F172A]">
                    ₺{plan.price.toLocaleString('tr-TR')}
                  </span>
                  <span className="text-sm text-gray-400 font-semibold">/ay</span>
                </div>

                {/* Features */}
                <div className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: colors.accent }} />
                      <span className="text-[13px] font-semibold text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleCheckout(key)}
                  disabled={loading !== null}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                    isPopular
                      ? 'bg-[#00C49F] text-white hover:bg-[#00A887] shadow-lg shadow-[#00C49F]/20'
                      : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                  }`}
                >
                  {loading === key ? (
                    <><Loader2 size={14} className="animate-spin" /> İşleniyor...</>
                  ) : (
                    `${plan.name} Planı Başlat`
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 border-b border-gray-50">
            <h2 className="text-lg font-black tracking-tight text-[#0F172A]">Detaylı Karşılaştırma</h2>
          </div>
          {[
            { label: 'Aktif İlan Limiti', values: ['10', 'Sınırsız', 'Sınırsız'] },
            { label: 'AI Rapor/Ay', values: ['5', '50', 'Sınırsız'] },
            { label: 'AI Değerleme', values: ['—', '✓', '✓'] },
            { label: 'AI Müzakere Asistanı', values: ['—', '✓', '✓'] },
            { label: 'Wealth Dashboard', values: ['—', '✓', '✓'] },
            { label: 'Deal Room', values: ['—', '✓', '✓'] },
            { label: 'Dark Pool Erişimi', values: ['—', '—', '✓'] },
            { label: 'AI Property Copilot', values: ['—', '—', '✓'] },
            { label: 'Investor Network', values: ['—', '—', '✓'] },
            { label: 'API Erişimi', values: ['—', '—', '✓'] },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
            >
              <div className="px-10 py-4 text-[12px] font-bold text-gray-500 border-r border-gray-100">
                {row.label}
              </div>
              {row.values.map((val, vi) => (
                <div
                  key={vi}
                  className={`px-6 py-4 text-center text-[12px] font-bold border-r border-gray-100 last:border-0 ${
                    val === '✓' ? 'text-[#00C49F]' : val === '—' ? 'text-gray-300' : 'text-[#0F172A]'
                  }`}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* FAQ / Guarantee */}
        <div className="mt-10 grid grid-cols-3 gap-6 text-center">
          {[
            { title: 'Anında Aktif', desc: 'Ödeme onaylandıktan saniyeler içinde tüm özellikler açılır.' },
            { title: 'Her Zaman İptal', desc: 'Hiçbir bağlayıcı sözleşme yok. İstediğiniz an iptal edin.' },
            { title: 'Güvenli Ödeme', desc: 'Stripe altyapısı — kart bilgileri platformumuzda saklanmaz.' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white rounded-[24px] border border-gray-100 p-6">
              <p className="text-sm font-black text-[#0F172A] mb-2">{title}</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
