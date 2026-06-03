'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Props {
  propertyType: string;
  location: string;
  priceAmount: number;
  area: number;
}

// Bölge kira çarpanları (yıllık brüt getiri oranı)
const RENTAL_YIELD: Record<string, number> = {
  'beşiktaş': 0.038, 'şişli': 0.040, 'kadıköy': 0.042, 'üsküdar': 0.043,
  'ataşehir': 0.044, 'maltepe': 0.047, 'bağcılar': 0.052, 'esenyurt': 0.055,
  'istanbul': 0.045,
  'çankaya': 0.050, 'ankara': 0.055,
  'bornova': 0.052, 'izmir': 0.048,
  'konyaaltı': 0.050, 'antalya': 0.051,
  'bursa': 0.058,
  'default': 0.055,
};

const TYPE_YIELD_MULT: Record<string, number> = {
  RESIDENTIAL: 1.0,
  COMMERCIAL: 1.35,
  INDUSTRIAL: 1.25,
  LAND: 0.0,
};

function getYield(location: string): number {
  const loc = location.toLowerCase();
  for (const [key, val] of Object.entries(RENTAL_YIELD)) {
    if (key !== 'default' && loc.includes(key)) return val;
  }
  return RENTAL_YIELD.default;
}

interface RentAnalysis {
  estimatedMonthly: number;
  estimatedYearly: number;
  grossYield: number;
  netYieldApprox: number;    // ~%20 gider düşüldükten sonra
  currentMarketMin: number;
  currentMarketMax: number;
  recommendation: 'INCREASE' | 'OPTIMAL' | 'DECREASE';
  recommendedRent: number;
  paybackYears: number;
  tips: string[];
}

function analyzeRent(props: Props): RentAnalysis | null {
  if (props.propertyType === 'LAND') return null;

  const baseYield = getYield(props.location);
  const typeMult = TYPE_YIELD_MULT[props.propertyType] ?? 1.0;
  const grossYield = baseYield * typeMult;

  const estimatedYearly = props.priceAmount * grossYield;
  const estimatedMonthly = estimatedYearly / 12;
  const netYieldApprox = grossYield * 0.8; // ~%20 gider (aidat, bakım, vergi)
  const paybackYears = grossYield > 0 ? Math.round(1 / grossYield) : 0;

  // Piyasa aralığı (%15 band)
  const currentMarketMin = estimatedMonthly * 0.88;
  const currentMarketMax = estimatedMonthly * 1.12;

  // Öneri (şimdilik piyasa ortalamasını öneriyoruz)
  const recommendedRent = Math.round(estimatedMonthly);

  const recommendation: RentAnalysis['recommendation'] = 'OPTIMAL';

  const tips: string[] = [];
  if (props.propertyType === 'RESIDENTIAL') {
    tips.push('Mobilyalı kiralama için %15-25 prim uygulayabilirsiniz.');
    tips.push('Yıllık artış TÜFE + %5 ile yapılandırılabilir.');
  }
  if (props.propertyType === 'COMMERCIAL') {
    tips.push('Uzun vadeli kira sözleşmesi (3-5 yıl) daha stabil getiri sağlar.');
    tips.push('Dövize endeksli kira opsiyonunu değerlendirin.');
  }
  if (grossYield < 0.04) {
    tips.push('Getiri oranı düşük — satış stratejisi alternatif olabilir.');
  }
  if (props.area > 200) {
    tips.push('Büyük metraj — kurumsal kiracı hedeflemek getiriyi artırabilir.');
  }

  return {
    estimatedMonthly,
    estimatedYearly,
    grossYield,
    netYieldApprox,
    currentMarketMin,
    currentMarketMax,
    recommendation,
    recommendedRent,
    paybackYears,
    tips,
  };
}

export default function RentOptimizer({ propertyType, location, priceAmount, area }: Props) {
  const analysis = useMemo(
    () => analyzeRent({ propertyType, location, priceAmount, area }),
    [propertyType, location, priceAmount, area]
  );

  if (!analysis) return null;

  const recConfig = {
    INCREASE: { label: 'Artış Önerilir', color: '#00C49F', icon: TrendingUp },
    OPTIMAL:  { label: 'Piyasa Değeri',  color: '#3B82F6', icon: Minus },
    DECREASE: { label: 'İndirim Önerilir', color: '#F59E0B', icon: TrendingDown },
  }[analysis.recommendation];

  const RecIcon = recConfig.icon;

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-8 py-5 flex items-center gap-4">
        <div className="w-9 h-9 rounded-2xl bg-[#00C49F]/20 flex items-center justify-center">
          <TrendingUp size={18} className="text-[#00C49F]" />
        </div>
        <div>
          <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F]">KİRA OPTİMİZASYON</p>
          <p className="text-sm font-black text-white tracking-tight">Kira Değer Analizi</p>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Main Rent Value */}
        <div className="bg-[#F8FAFC] rounded-[20px] p-6 text-center border border-gray-100">
          <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-2">TAHMİNİ PAZAR KİRASI</p>
          <p className="text-4xl font-black tracking-tighter text-[#0F172A]">
            {formatCurrency(analysis.estimatedMonthly)}
            <span className="text-lg font-semibold text-gray-400">/ay</span>
          </p>
          <p className="text-[11px] text-gray-400 mt-1">
            {formatCurrency(analysis.currentMarketMin)} — {formatCurrency(analysis.currentMarketMax)} aralığı
          </p>
        </div>

        {/* Yield Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Brüt Getiri', value: `%${(analysis.grossYield * 100).toFixed(1)}`, sub: 'yıllık', color: '#00C49F' },
            { label: 'Net Getiri*', value: `%${(analysis.netYieldApprox * 100).toFixed(1)}`, sub: '~%20 gider', color: '#3B82F6' },
            { label: 'Geri Ödeme', value: `${analysis.paybackYears}`, sub: 'yıl', color: '#D4AF37' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="text-center bg-[#F8FAFC] rounded-2xl p-4 border border-gray-100">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">{label}</p>
              <p className="text-xl font-black" style={{ color }}>{value}</p>
              <p className="text-[10px] text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* Recommendation Badge */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border" style={{ borderColor: recConfig.color + '30', backgroundColor: recConfig.color + '08' }}>
          <RecIcon size={16} style={{ color: recConfig.color }} />
          <div>
            <p className="text-[11px] font-black" style={{ color: recConfig.color }}>{recConfig.label}</p>
            <p className="text-[10px] text-gray-400">Önerilen: {formatCurrency(analysis.recommendedRent)}/ay</p>
          </div>
        </div>

        {/* Tips */}
        {analysis.tips.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Optimizasyon İpuçları</p>
            {analysis.tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-[11px] text-gray-600">{tip}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-[9px] text-gray-300 text-center">
          * Net getiri tahmini — vergi ve giderler kişisel duruma göre değişir.
        </p>
      </div>
    </div>
  );
}
