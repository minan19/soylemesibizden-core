'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Brain, Loader2, AlertTriangle, MapPin, BarChart3 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const CITIES = ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Bursa', 'Adana', 'Konya', 'Gaziantep'];
const TYPES = [
  { value: 'RESIDENTIAL', label: 'Konut' },
  { value: 'COMMERCIAL', label: 'Ticari' },
  { value: 'LAND', label: 'Arsa' },
];

interface ForecastMonth {
  month: number;
  priceM2: number;
  changePercent: number;
}

interface Forecast {
  currentAvgM2: number;
  forecastMonths: ForecastMonth[];
  summary6Month: string;
  summary12Month: string;
  keyFactors: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence: number;
  demo?: boolean;
}

const RISK_CONFIG = {
  LOW:    { label: 'Düşük Risk',  color: '#00C49F', bg: '#F0FDF8' },
  MEDIUM: { label: 'Orta Risk',   color: '#F59E0B', bg: '#FFFBEB' },
  HIGH:   { label: 'Yüksek Risk', color: '#EF4444', bg: '#FEF2F2' },
};

export default function MarketRadarPage() {
  const [city, setCity] = useState('İstanbul');
  const [propertyType, setPropertyType] = useState('RESIDENTIAL');
  const [months, setMonths] = useState(12);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/intelligence/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, propertyType, months }),
      });
      const data = await res.json() as { forecast?: Forecast; error?: string };
      if (!res.ok || data.error) { setError(data.error ?? 'Hata'); return; }
      if (data.forecast) setForecast(data.forecast);
    } catch {
      setError('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  const maxPrice = forecast ? Math.max(...forecast.forecastMonths.map((m) => m.priceM2)) : 0;
  const chartHeight = 200;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="mb-10">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN ORACLE</p>
          <h1 className="text-4xl font-black tracking-tighter">Piyasa Radar</h1>
          <p className="text-gray-400 text-sm mt-2">6-24 aylık gayrimenkul fiyat projeksiyonu — AI destekli tahmin.</p>
        </div>

        {/* Config */}
        <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm p-8 mb-8">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-3">Şehir</label>
              <div className="grid grid-cols-4 gap-2">
                {CITIES.map((c) => (
                  <button key={c} onClick={() => setCity(c)}
                    className={`px-2 py-2 rounded-xl text-[10px] font-black transition-all border ${city === c ? 'bg-[#00C49F] border-[#00C49F] text-white' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-[#00C49F]/30'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-3">Mülk Tipi</label>
              <div className="space-y-2">
                {TYPES.map((t) => (
                  <button key={t.value} onClick={() => setPropertyType(t.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-[11px] font-black border transition-all text-left ${propertyType === t.value ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-3">Tahmin Dönemi</label>
              <div className="space-y-2">
                {[6, 12, 18, 24].map((m) => (
                  <button key={m} onClick={() => setMonths(m)}
                    className={`w-full px-4 py-2.5 rounded-xl text-[11px] font-black border transition-all text-left ${months === m ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                    {m} Ay
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4">
              <AlertTriangle size={14} className="text-red-400" />
              <p className="text-[12px] font-semibold text-red-500">{error}</p>
            </div>
          )}

          <button onClick={() => void generate()} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl transition-all disabled:opacity-50">
            {loading ? <><Loader2 size={16} className="animate-spin" />Tahmin Üretiliyor...</> : <><Brain size={16} className="text-[#00C49F]" />Piyasa Tahmini Oluştur</>}
          </button>
        </div>

        {/* Forecast Result */}
        {forecast && (
          <div className="space-y-6">
            {forecast.demo && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
                <AlertTriangle size={13} className="text-amber-400" />
                <p className="text-[11px] font-semibold text-amber-600">Demo mod — ANTHROPIC_API_KEY eklendiğinde gerçek AI tahmin aktif olur.</p>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#0F172A] rounded-[24px] p-6 text-white">
                <p className="text-[9px] font-black tracking-widest uppercase text-slate-500 mb-2">MEVCUT m² FİYATI</p>
                <p className="text-3xl font-black tracking-tighter">{forecast.currentAvgM2.toLocaleString('tr-TR')} ₺</p>
                <p className="text-[10px] text-slate-500 mt-1">{city} ortalama</p>
              </div>
              <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-2">{months} AY SONRA</p>
                <p className="text-3xl font-black tracking-tighter text-[#00C49F]">
                  {(forecast.forecastMonths[months - 1]?.priceM2 ?? 0).toLocaleString('tr-TR')} ₺
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  +%{forecast.forecastMonths[months - 1]?.changePercent.toFixed(1)}
                </p>
              </div>
              <div className="rounded-[24px] p-6" style={{ backgroundColor: RISK_CONFIG[forecast.riskLevel].bg }}>
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-2">RİSK SEVİYESİ</p>
                <p className="text-2xl font-black" style={{ color: RISK_CONFIG[forecast.riskLevel].color }}>
                  {RISK_CONFIG[forecast.riskLevel].label}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">Güven: %{forecast.confidence}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-[28px] border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={18} className="text-[#00C49F]" />
                <h3 className="text-sm font-black">m² Fiyat Projeksiyonu</h3>
              </div>

              {/* SVG Chart */}
              <div className="relative overflow-x-auto">
                <svg
                  width={Math.max(600, forecast.forecastMonths.length * 40)}
                  height={chartHeight + 40}
                  className="overflow-visible"
                >
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
                    <line key={pct}
                      x1="40" y1={chartHeight * (1 - pct)} x2={Math.max(600, forecast.forecastMonths.length * 40)} y2={chartHeight * (1 - pct)}
                      stroke="#F1F5F9" strokeWidth="1"
                    />
                  ))}

                  {/* Line path */}
                  <polyline
                    fill="none"
                    stroke="#00C49F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={forecast.forecastMonths.map((m, i) => {
                      const x = 40 + i * ((Math.max(600, forecast.forecastMonths.length * 40) - 60) / (forecast.forecastMonths.length - 1));
                      const y = chartHeight - (m.priceM2 / maxPrice) * (chartHeight - 20) - 10;
                      return `${x},${y}`;
                    }).join(' ')}
                  />

                  {/* Area fill */}
                  <polygon
                    fill="#00C49F" fillOpacity="0.08"
                    points={[
                      ...forecast.forecastMonths.map((m, i) => {
                        const x = 40 + i * ((Math.max(600, forecast.forecastMonths.length * 40) - 60) / (forecast.forecastMonths.length - 1));
                        const y = chartHeight - (m.priceM2 / maxPrice) * (chartHeight - 20) - 10;
                        return `${x},${y}`;
                      }),
                      `${Math.max(600, forecast.forecastMonths.length * 40) - 20},${chartHeight}`,
                      `40,${chartHeight}`,
                    ].join(' ')}
                  />

                  {/* Dots every 3 months */}
                  {forecast.forecastMonths.filter((_, i) => i % 3 === 2 || i === 0).map((m, i, arr) => {
                    const origIdx = i === 0 ? 0 : (i * 3) + 2;
                    const x = 40 + origIdx * ((Math.max(600, forecast.forecastMonths.length * 40) - 60) / (forecast.forecastMonths.length - 1));
                    const y = chartHeight - (m.priceM2 / maxPrice) * (chartHeight - 20) - 10;
                    return (
                      <g key={m.month}>
                        <circle cx={x} cy={y} r={4} fill="#00C49F" />
                        <text x={x} y={y - 10} textAnchor="middle" fontSize="9" fill="#64748B" fontFamily="monospace">
                          {(m.priceM2 / 1000).toFixed(0)}K
                        </text>
                        <text x={x} y={chartHeight + 20} textAnchor="middle" fontSize="9" fill="#94A3B8">
                          {m.month}A
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Summaries */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
                <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F] mb-3">6 AYLIK ÖZET</p>
                <p className="text-[12px] text-gray-600 leading-relaxed">{forecast.summary6Month}</p>
              </div>
              <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
                <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F] mb-3">12 AYLIK ÖZET</p>
                <p className="text-[12px] text-gray-600 leading-relaxed">{forecast.summary12Month}</p>
              </div>
            </div>

            {/* Key Factors */}
            <div className="bg-[#F8FAFC] rounded-[24px] border border-gray-100 p-6">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-4">TEMEL FAKTÖRLER</p>
              <div className="grid grid-cols-2 gap-2">
                {forecast.keyFactors.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TrendingUp size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-600">{f}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Re-generate */}
            <button onClick={() => setForecast(null)}
              className="w-full px-6 py-3 border border-gray-200 text-[11px] font-black tracking-widest uppercase text-gray-500 rounded-2xl hover:bg-gray-50 transition-all">
              Yeni Tahmin
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
