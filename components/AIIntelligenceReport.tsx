'use client';

import { useState } from 'react';
import { Brain, Loader2, TrendingUp, Shield, AlertTriangle, CheckCircle, XCircle, BarChart3, Zap } from 'lucide-react';

interface IntelligenceReport {
  trustScore: number;
  investmentGrade: string;
  roi12Month: number;
  roi24Month: number;
  riskLevel: string;
  priceAssessment: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
  summary: string;
}

interface AIReportResponse {
  report: IntelligenceReport;
  generatedAt: string;
  demo?: boolean;
  error?: string;
}

const GRADE_CONFIG: Record<string, { color: string; bg: string }> = {
  A: { color: '#00C49F', bg: '#F0FDF8' },
  B: { color: '#3B82F6', bg: '#EFF6FF' },
  C: { color: '#F59E0B', bg: '#FFFBEB' },
  D: { color: '#EF4444', bg: '#FEF2F2' },
  F: { color: '#6B7280', bg: '#F9FAFB' },
};

const REC_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  BUY: { label: 'SATIN AL', color: '#00C49F', bg: '#F0FDF8', Icon: CheckCircle },
  HOLD: { label: 'BEKLE', color: '#F59E0B', bg: '#FFFBEB', Icon: Shield },
  AVOID: { label: 'KAÇIN', color: '#EF4444', bg: '#FEF2F2', Icon: XCircle },
};

const RISK_CONFIG: Record<string, { label: string; color: string }> = {
  LOW: { label: 'Düşük Risk', color: '#00C49F' },
  MEDIUM: { label: 'Orta Risk', color: '#F59E0B' },
  HIGH: { label: 'Yüksek Risk', color: '#EF4444' },
};

const PRICE_CONFIG: Record<string, { label: string; color: string }> = {
  UNDERVALUED: { label: 'Düşük Değerlenmiş ↗', color: '#00C49F' },
  FAIR: { label: 'Adil Değer', color: '#3B82F6' },
  OVERVALUED: { label: 'Yüksek Değerlenmiş ↘', color: '#F59E0B' },
};

interface Props {
  listingId: string;
}

export default function AIIntelligenceReport({ listingId }: Props) {
  const [report, setReport] = useState<IntelligenceReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDemo, setIsDemo] = useState(false);
  const [generatedAt, setGeneratedAt] = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/intelligence/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      const data = await res.json() as AIReportResponse;
      if (data.error) { setError(data.error); return; }
      setReport(data.report);
      setIsDemo(data.demo ?? false);
      setGeneratedAt(new Date(data.generatedAt).toLocaleTimeString('tr-TR'));
    } catch {
      setError('AI bağlantısı kurulamadı.');
    } finally {
      setLoading(false);
    }
  };

  if (!report) {
    return (
      <div className="bg-[#0F172A] rounded-[40px] p-10 text-white">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <Brain size={20} className="text-[#00C49F]" />
          </div>
          <div>
            <h3 className="font-black tracking-tight">Sovereign AI Raporu</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">Intelligence Engine v2</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Claude AI ile desteklenen analiz motoru bu varlık için kişisel bir yatırım raporu üretir: güven skoru, ROI projeksiyonu, risk değerlendirmesi ve alım tavsiyesi.
        </p>
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-[12px] font-semibold mb-4 bg-red-900/20 rounded-xl px-4 py-3">
            <AlertTriangle size={14} /> {error}
          </div>
        )}
        <button
          onClick={generate}
          disabled={loading}
          className="w-full py-4 bg-[#00C49F] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#00A887] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> ANALİZ EDİLİYOR...</>
          ) : (
            <><Zap size={14} /> AI RAPORU OLUŞTUR</>
          )}
        </button>
      </div>
    );
  }

  const gradeCfg = GRADE_CONFIG[report.investmentGrade] ?? GRADE_CONFIG.C;
  const recCfg = REC_CONFIG[report.recommendation] ?? REC_CONFIG.HOLD;
  const riskCfg = RISK_CONFIG[report.riskLevel] ?? RISK_CONFIG.MEDIUM;
  const priceCfg = PRICE_CONFIG[report.priceAssessment] ?? PRICE_CONFIG.FAIR;

  return (
    <div className="bg-[#0F172A] rounded-[40px] p-10 text-white space-y-7">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#00C49F]/20 flex items-center justify-center">
            <Brain size={20} className="text-[#00C49F]" />
          </div>
          <div>
            <h3 className="font-black tracking-tight">Sovereign AI Raporu</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest">
              {isDemo ? 'DEMO MODE' : `Üretildi: ${generatedAt}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Trust Score</p>
          <p className="text-3xl font-black text-[#00C49F]">{report.trustScore}</p>
        </div>
      </div>

      {/* GRADE + RECOMMENDATION */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-2xl p-5">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Yatırım Notu</p>
          <span className="text-4xl font-black" style={{ color: gradeCfg.color }}>
            {report.investmentGrade}
          </span>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-5">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Öneri</p>
          <span className="flex items-center gap-2 text-lg font-black" style={{ color: recCfg.color }}>
            <recCfg.Icon size={18} /> {recCfg.label}
          </span>
        </div>
      </div>

      {/* ROI */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-2xl p-5">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">12 Ay ROI</p>
          <p className="text-2xl font-black text-amber-400">%{report.roi12Month.toFixed(1)}</p>
        </div>
        <div className="bg-slate-800/50 rounded-2xl p-5">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">24 Ay ROI</p>
          <p className="text-2xl font-black text-amber-400">%{report.roi24Month.toFixed(1)}</p>
        </div>
      </div>

      {/* RISK + PRICE */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-bold" style={{ color: riskCfg.color }}>{riskCfg.label}</span>
        <span className="font-bold" style={{ color: priceCfg.color }}>{priceCfg.label}</span>
      </div>

      {/* STRENGTHS */}
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Güçlü Yönler</p>
        <ul className="space-y-2">
          {report.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle size={14} className="text-[#00C49F] mt-0.5 shrink-0" /> {s}
            </li>
          ))}
        </ul>
      </div>

      {/* WEAKNESSES */}
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3">Dikkat Edilmesi Gerekenler</p>
        <ul className="space-y-2">
          {report.weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" /> {w}
            </li>
          ))}
        </ul>
      </div>

      {/* SUMMARY */}
      <div className="border-t border-slate-800 pt-6">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">AI Özeti</p>
        <p className="text-sm text-slate-300 leading-relaxed">{report.summary}</p>
      </div>

      <button
        onClick={() => setReport(null)}
        className="w-full py-3 border border-slate-700 text-slate-500 text-[11px] font-bold rounded-2xl hover:border-[#00C49F]/30 hover:text-[#00C49F] transition-all"
      >
        Yeniden Üret
      </button>
    </div>
  );
}
