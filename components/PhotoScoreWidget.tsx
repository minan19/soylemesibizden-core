'use client';

import { useState, useCallback } from 'react';
import { Camera, Loader2, Star, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface PhotoScore {
  overall: number;
  lighting: number;
  composition: number;
  clarity: number;
  staging: number;
  angle: number;
  issues: string[];
  improvements: string[];
  summary: string;
  demo?: boolean;
}

interface Props {
  imageUrls: string[];
}

const DIMENSIONS = [
  { key: 'lighting',     label: 'Işık' },
  { key: 'composition',  label: 'Kompozisyon' },
  { key: 'clarity',      label: 'Netlik' },
  { key: 'staging',      label: 'Düzenleme' },
  { key: 'angle',        label: 'Açı' },
] as const;

function ScoreCircle({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) {
  const color = score >= 75 ? '#00C49F' : score >= 50 ? '#F59E0B' : '#EF4444';
  const dim = size === 'lg' ? 80 : size === 'md' ? 56 : 40;
  const fontSize = size === 'lg' ? 22 : size === 'md' ? 15 : 11;
  const stroke = size === 'lg' ? 6 : 4;
  const r = (dim - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <svg width={dim} height={dim} className="-rotate-90">
      <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={stroke} />
      <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        fontSize={fontSize} fontWeight="900" fill={color} className="rotate-90 origin-center">
        {score}
      </text>
    </svg>
  );
}

export default function PhotoScoreWidget({ imageUrls }: Props) {
  const [scores, setScores] = useState<Record<string, PhotoScore>>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const analyzeImage = useCallback(async (url: string) => {
    if (scores[url] || loading) return;
    setLoading(url);
    try {
      const res = await fetch('/api/intelligence/image-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: url }),
      });
      const data = await res.json() as { score?: PhotoScore };
      if (data.score) {
        setScores((prev) => ({ ...prev, [url]: data.score! }));
        setSelected(url);
      }
    } finally {
      setLoading(null);
    }
  }, [scores, loading]);

  if (imageUrls.length === 0) return null;

  const avgScore = Object.values(scores).length > 0
    ? Math.round(Object.values(scores).reduce((s, sc) => s + sc.overall, 0) / Object.values(scores).length)
    : null;

  const selectedScore = selected ? scores[selected] : null;

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-8 py-5 bg-gradient-to-r from-[#0F172A] to-[#1E293B]"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-2xl bg-[#00C49F]/20 flex items-center justify-center">
            <Camera size={18} className="text-[#00C49F]" />
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F]">AI GÖRSEL ANALİZ</p>
            <p className="text-sm font-black text-white tracking-tight">Fotoğraf Kalite Skoru</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {avgScore !== null && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-xl">
              <Star size={12} className="text-[#D4AF37]" />
              <span className="text-[11px] font-black text-white">Ort. {avgScore}</span>
            </div>
          )}
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      {expanded && (
        <div className="p-8 space-y-6">
          {/* Image Grid */}
          <div className="grid grid-cols-4 gap-3">
            {imageUrls.slice(0, 8).map((url, idx) => {
              const score = scores[url];
              const isLoading = loading === url;
              const scoreColor = score
                ? score.overall >= 75 ? '#00C49F' : score.overall >= 50 ? '#F59E0B' : '#EF4444'
                : '#94A3B8';

              return (
                <button
                  key={url}
                  onClick={() => {
                    if (score) { setSelected(url); }
                    else { void analyzeImage(url); }
                  }}
                  className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                    selected === url ? 'border-[#00C49F]' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`Fotoğraf ${idx + 1}`}
                    className="w-full h-full object-cover" />

                  {/* Score overlay */}
                  {score && (
                    <div className="absolute bottom-1.5 right-1.5 w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white"
                      style={{ backgroundColor: scoreColor + 'DD' }}>
                      {score.overall}
                    </div>
                  )}

                  {/* Loading overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 size={18} className="animate-spin text-white" />
                    </div>
                  )}

                  {/* Analyze prompt */}
                  {!score && !isLoading && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-[10px] font-black text-white tracking-widest uppercase">Analiz Et</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Batch Analyze */}
          {Object.keys(scores).length < imageUrls.length && (
            <button
              onClick={() => imageUrls.forEach((url) => void analyzeImage(url))}
              disabled={loading !== null}
              className="w-full py-3 bg-[#F8FAFC] border border-gray-100 text-[11px] font-black tracking-widest uppercase text-gray-500 rounded-2xl hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              {loading ? 'Analiz Ediliyor...' : 'Tüm Fotoğrafları Analiz Et'}
            </button>
          )}

          {/* Selected score detail */}
          {selectedScore && (
            <div className="space-y-4">
              <div className="bg-[#F8FAFC] rounded-[20px] p-5 border border-gray-100">
                {selectedScore.demo && (
                  <p className="text-[10px] text-amber-500 font-bold mb-3">⚠️ Demo mod</p>
                )}

                {/* Overall */}
                <div className="flex items-center gap-5 mb-5">
                  <ScoreCircle score={selectedScore.overall} size="lg" />
                  <div>
                    <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-1">GENEL SKOR</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedScore.summary}</p>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-5 gap-3">
                  {DIMENSIONS.map(({ key, label }) => (
                    <div key={key} className="text-center">
                      <ScoreCircle score={selectedScore[key]} size="sm" />
                      <p className="text-[9px] font-bold text-gray-400 mt-1.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues */}
              {selectedScore.issues.length > 0 && (
                <div className="bg-red-50 rounded-[20px] p-5 border border-red-100">
                  <p className="text-[9px] font-black tracking-widest uppercase text-red-400 mb-3">Sorunlar</p>
                  <div className="space-y-2">
                    {selectedScore.issues.map((issue, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertTriangle size={12} className="text-red-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-600">{issue}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Improvements */}
              {selectedScore.improvements.length > 0 && (
                <div className="bg-[#F0FDF8] rounded-[20px] p-5 border border-[#00C49F]/20">
                  <p className="text-[9px] font-black tracking-widest uppercase text-[#00C49F] mb-3">İyileştirme Önerileri</p>
                  <div className="space-y-2">
                    {selectedScore.improvements.map((imp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                        <p className="text-[11px] text-gray-600">{imp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
