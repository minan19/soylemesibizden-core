'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Brain,
  Loader2,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND' | 'INDUSTRIAL';
type MarketTrend = 'RISING' | 'STABLE' | 'DECLINING';

interface ValuationResult {
  estimatedValue: number;
  minValue: number;
  maxValue: number;
  pricePerM2: number;
  confidence: number;
  marketTrend: MarketTrend;
  comparables: Array<{
    description: string;
    pricePerM2: number;
    location: string;
  }>;
  factors: {
    positive: string[];
    negative: string[];
  };
  methodology: string;
  disclaimer: string;
  demo?: boolean;
}

const TREND_CONFIG: Record<
  MarketTrend,
  { icon: React.ReactNode; label: string; color: string }
> = {
  RISING: {
    icon: <TrendingUp size={14} />,
    label: 'Yükselen Piyasa',
    color: 'text-emerald-500',
  },
  STABLE: {
    icon: <Minus size={14} />,
    label: 'Stabil Piyasa',
    color: 'text-blue-500',
  },
  DECLINING: {
    icon: <TrendingDown size={14} />,
    label: 'Düşen Piyasa',
    color: 'text-red-400',
  },
};

const TYPE_LABELS: Record<PropertyType, string> = {
  RESIDENTIAL: 'Konut',
  COMMERCIAL: 'Ticari',
  LAND: 'Arsa',
  INDUSTRIAL: 'Endüstriyel',
};

interface FormState {
  propertyType: PropertyType;
  area: string;
  location: string;
  description: string;
  floor: string;
  age: string;
  features: string[];
}

const FEATURE_OPTIONS = [
  'Asansör', 'Otopark', 'Balkon', 'Teras', 'Havuz', 'Bahçe',
  'Güvenlik', 'Isıtma Sistemi', 'Klima', 'Kapalı Mutfak',
];

export default function AutoValuation() {
  const [form, setForm] = useState<FormState>({
    propertyType: 'RESIDENTIAL',
    area: '',
    location: '',
    description: '',
    floor: '',
    age: '',
    features: [],
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const toggleFeature = (f: string) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.includes(f)
        ? prev.features.filter((x) => x !== f)
        : [...prev.features, f],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.area || !form.location) {
      setError('Alan ve konum zorunludur.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/intelligence/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyType: form.propertyType,
          area: Number(form.area),
          location: form.location,
          description: form.description || undefined,
          floor: form.floor ? Number(form.floor) : undefined,
          age: form.age ? Number(form.age) : undefined,
          features: form.features,
        }),
      });

      const data = (await res.json()) as {
        valuation?: ValuationResult;
        error?: string;
      };

      if (!res.ok || data.error) {
        setError(data.error ?? 'Değerleme sırasında hata oluştu.');
        return;
      }

      if (data.valuation) setResult(data.valuation);
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-8 py-6 flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#00C49F]/20 flex items-center justify-center">
          <Brain size={20} className="text-[#00C49F]" />
        </div>
        <div>
          <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F]">
            AI Değerleme
          </p>
          <h3 className="text-lg font-black text-white tracking-tight">
            Otomatik Piyasa Değeri Tahmini
          </h3>
        </div>
      </div>

      <div className="p-8">
        {/* Form */}
        {!result && (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Property Type */}
            <div>
              <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3">
                Mülk Tipi
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(TYPE_LABELS) as PropertyType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, propertyType: type }))}
                    className={`px-3 py-2.5 rounded-2xl text-[10px] font-black tracking-wider uppercase border transition-all ${
                      form.propertyType === type
                        ? 'bg-[#00C49F] border-[#00C49F] text-white'
                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-[#00C49F]/30'
                    }`}
                  >
                    {TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Area + Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Alan (m²)
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.area}
                  onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
                  placeholder="örn. 120"
                  required
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Konum
                </label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="örn. İstanbul, Kadıköy"
                  required
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all"
                />
              </div>
            </div>

            {/* Floor + Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Kat (opsiyonel)
                </label>
                <input
                  type="number"
                  value={form.floor}
                  onChange={(e) => setForm((f) => ({ ...f, floor: e.target.value }))}
                  placeholder="örn. 5"
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Yapı Yaşı (opsiyonel)
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.age}
                  onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                  placeholder="örn. 10"
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2">
                Ek Bilgiler (opsiyonel)
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Özel notlar, renovasyon, görünüm vb."
                className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all resize-none"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3">
                Özellikler
              </label>
              <div className="flex flex-wrap gap-2">
                {FEATURE_OPTIONS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => toggleFeature(f)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wide border transition-all ${
                      form.features.includes(f)
                        ? 'bg-[#00C49F]/10 border-[#00C49F] text-[#00C49F]'
                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3">
                <AlertTriangle size={14} className="text-red-400 shrink-0" />
                <p className="text-xs font-semibold text-red-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-[#1E293B] text-white font-black text-[11px] tracking-widest uppercase px-6 py-4 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  AI Değerleme Yapıyor...
                </>
              ) : (
                <>
                  <Brain size={16} className="text-[#00C49F]" />
                  Değerleme Başlat
                </>
              )}
            </button>
          </form>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-6">
            {result.demo && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                <p className="text-[11px] font-semibold text-amber-600">
                  Demo mod — gerçek AI değerleme için ANTHROPIC_API_KEY ekleyin.
                </p>
              </div>
            )}

            {/* Main Value */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[24px] p-8 text-center">
              <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F] mb-3">
                TAHMİNİ DEĞER
              </p>
              <p className="text-5xl font-black text-white tracking-tighter mb-2">
                {formatCurrency(result.estimatedValue)}
              </p>
              <p className="text-[11px] text-gray-400 mb-5">
                {formatCurrency(result.minValue)} — {formatCurrency(result.maxValue)} aralığı
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">m² Fiyat</p>
                  <p className="text-lg font-black text-white">
                    {result.pricePerM2.toLocaleString('tr-TR')} ₺
                  </p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Güven</p>
                  <p className="text-lg font-black text-[#00C49F]">{result.confidence}%</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className={`text-center flex flex-col items-center gap-1 ${TREND_CONFIG[result.marketTrend].color}`}>
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0">Trend</p>
                  <div className="flex items-center gap-1">
                    {TREND_CONFIG[result.marketTrend].icon}
                    <p className="text-sm font-black">
                      {TREND_CONFIG[result.marketTrend].label}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">
                  Güven Skoru
                </p>
                <p className="text-[10px] font-black text-[#0F172A]">{result.confidence}/100</p>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00C49F] to-[#059669] transition-all duration-1000"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Factors */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F0FDF8] rounded-[20px] p-5">
                <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F] mb-3">
                  Değeri Artıran
                </p>
                <div className="space-y-2">
                  {result.factors.positive.map((p, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[11px] font-semibold text-gray-600">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 rounded-[20px] p-5">
                <p className="text-[9px] font-black tracking-widest uppercase text-red-400 mb-3">
                  Risk Faktörleri
                </p>
                <div className="space-y-2">
                  {result.factors.negative.map((n, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] font-semibold text-gray-600">{n}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comparables Toggle */}
            <button
              onClick={() => setShowDetails((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">
                Emsal Değerler ve Metodoloji
              </span>
              {showDetails ? (
                <ChevronUp size={14} className="text-gray-400" />
              ) : (
                <ChevronDown size={14} className="text-gray-400" />
              )}
            </button>

            {showDetails && (
              <div className="space-y-4">
                {/* Comparables */}
                {result.comparables.length > 0 && (
                  <div className="bg-[#F8FAFC] rounded-[20px] p-5">
                    <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-4">
                      Emsal Karşılaştırma
                    </p>
                    <div className="space-y-3">
                      {result.comparables.map((c, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#0F172A]">{c.description}</p>
                            <p className="text-[10px] text-gray-400">{c.location}</p>
                          </div>
                          <p className="text-sm font-black text-[#0F172A]">
                            {c.pricePerM2.toLocaleString('tr-TR')} ₺/m²
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Methodology */}
                <div className="bg-blue-50 rounded-[20px] p-5">
                  <p className="text-[9px] font-black tracking-widest uppercase text-blue-400 mb-2">
                    Metodoloji
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{result.methodology}</p>
                </div>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-400 leading-relaxed px-1">
                  ⚠️ {result.disclaimer}
                </p>
              </div>
            )}

            {/* Reset */}
            <button
              onClick={() => { setResult(null); setError(null); }}
              className="w-full px-6 py-3 border border-gray-200 text-[11px] font-black tracking-widest uppercase text-gray-500 rounded-2xl hover:bg-gray-50 transition-all"
            >
              Yeni Değerleme
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
