'use client';

import { useState, useEffect, useCallback } from 'react';
import { Brain, Loader2, TrendingUp, Shield, Zap, BarChart2, Star, Lock } from 'lucide-react';
import type { SovereignScore } from '@/lib/investmentScore';
import { GRADE_CONFIG, RECOMMENDATION_CONFIG } from '@/lib/investmentScore';

interface Props {
  listingId: string;
  compact?: boolean;           // Küçük kart modu (ilan listesi için)
  initialScore?: SovereignScore | null;  // SSR'den geçilebilir
}

const DIMENSIONS = [
  { key: 'investment',   label: 'Yatırım',    icon: TrendingUp },
  { key: 'risk',         label: 'Düşük Risk',  icon: Shield },
  { key: 'rentalYield',  label: 'Kira Getirisi', icon: Zap },
  { key: 'liquidity',    label: 'Likidite',    icon: BarChart2 },
  { key: 'growth',       label: 'Büyüme',      icon: Star },
  { key: 'trust',        label: 'Güven',       icon: Lock },
] as const;

type DimKey = typeof DIMENSIONS[number]['key'];

function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex-1">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function SovereignScoreCard({ listingId, compact = false, initialScore = null }: Props) {
  const [score, setScore] = useState<SovereignScore | null>(initialScore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/intelligence/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json() as { score?: SovereignScore; error?: string };
      if (!res.ok || data.error) { setError(data.error ?? 'Hata'); return; }
      if (data.score) setScore(data.score);
    } catch {
      setError('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  }, [listingId]);

  // initialScore yoksa otomatik hesapla
  useEffect(() => {
    if (!initialScore) void fetchScore();
  }, [initialScore, fetchScore]);

  // ── COMPACT MOD (ilan listesi kartı) ─────────────────────────────────────────
  if (compact) {
    if (loading) return (
      <div className="flex items-center gap-1.5 text-gray-300">
        <Loader2 size={11} className="animate-spin" />
        <span className="text-[10px] font-bold">Analiz...</span>
      </div>
    );
    if (!score) return null;
    const gc = GRADE_CONFIG[score.grade];
    const rc = RECOMMENDATION_CONFIG[score.recommendation];
    return (
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black"
          style={{ backgroundColor: gc.bg, color: gc.color }}
        >
          {score.grade}
        </div>
        <div>
          <p className="text-[10px] font-black" style={{ color: gc.color }}>{score.overall}/100</p>
          <p className="text-[9px] font-bold" style={{ color: rc.color }}>{rc.icon} {rc.label}</p>
        </div>
      </div>
    );
  }

  // ── FULL MOD (ilan detay sayfası) ─────────────────────────────────────────────
  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#00C49F]/20 flex items-center justify-center">
            <Brain size={18} className="text-[#00C49F]" />
          </div>
          <div>
            <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F]">
              SOVEREIGN IQ
            </p>
            <p className="text-sm font-black text-white tracking-tight">Yatırım Skoru</p>
          </div>
        </div>
        {!loading && !score && (
          <button
            onClick={fetchScore}
            className="px-4 py-2 bg-[#00C49F] text-white text-[10px] font-black tracking-widest uppercase rounded-xl hover:bg-[#00A887] transition-all"
          >
            Hesapla
          </button>
        )}
      </div>

      <div className="p-8">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <Loader2 size={28} className="animate-spin text-[#00C49F]" />
            <p className="text-[12px] font-semibold text-gray-400">Sovereign AI analiz ediyor...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center py-6">
            <p className="text-sm text-red-400 font-semibold mb-3">{error}</p>
            <button onClick={fetchScore} className="text-[11px] font-bold text-[#00C49F] hover:underline">
              Tekrar dene
            </button>
          </div>
        )}

        {/* Score Display */}
        {score && !loading && (
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="flex items-center gap-6">
              {/* Grade Circle */}
              <div
                className="w-20 h-20 rounded-[24px] flex flex-col items-center justify-center shrink-0"
                style={{ backgroundColor: GRADE_CONFIG[score.grade].bg }}
              >
                <span className="text-3xl font-black" style={{ color: GRADE_CONFIG[score.grade].color }}>
                  {score.grade}
                </span>
                <span className="text-[9px] font-black tracking-widest" style={{ color: GRADE_CONFIG[score.grade].color }}>
                  {GRADE_CONFIG[score.grade].label}
                </span>
              </div>

              {/* Score + Recommendation */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black tracking-tighter text-[#0F172A]">
                    {score.overall}
                  </span>
                  <span className="text-lg text-gray-300 font-bold">/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase"
                    style={{
                      backgroundColor: RECOMMENDATION_CONFIG[score.recommendation].color + '20',
                      color: RECOMMENDATION_CONFIG[score.recommendation].color,
                    }}
                  >
                    {RECOMMENDATION_CONFIG[score.recommendation].icon}{' '}
                    {RECOMMENDATION_CONFIG[score.recommendation].label}
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Dimension Bars */}
            <div className="space-y-3">
              {DIMENSIONS.map(({ key, label, icon: Icon }) => {
                const val = score[key as DimKey] as number;
                const color = val >= 70 ? '#00C49F' : val >= 45 ? '#F59E0B' : '#EF4444';
                return (
                  <div key={key} className="flex items-center gap-3">
                    <Icon size={13} className="shrink-0 text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-500 w-24 shrink-0">{label}</span>
                    <ScoreBar value={val} color={color} />
                    <span className="text-[11px] font-black w-8 text-right" style={{ color }}>
                      {val}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="bg-[#F8FAFC] rounded-[20px] p-5 border border-gray-100">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-2">
                AI Özet
              </p>
              <p className="text-[12px] text-gray-600 leading-relaxed">{score.summary}</p>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchScore}
              className="w-full text-[10px] font-bold text-gray-400 hover:text-[#00C49F] transition-colors tracking-widest uppercase"
            >
              Yeniden Hesapla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
