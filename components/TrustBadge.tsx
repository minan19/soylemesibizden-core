'use client';

import { useState } from 'react';
import { Shield, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import type { TrustAnalysis } from '@/lib/trustEngine';
import { TRUST_LEVEL_CONFIG, BADGE_CONFIG } from '@/lib/trustEngine';

interface Props {
  trust: TrustAnalysis;
  compact?: boolean;
}

export default function TrustBadge({ trust, compact = false }: Props) {
  const [expanded, setExpanded] = useState(false);
  const lvl = TRUST_LEVEL_CONFIG[trust.level];
  const badge = BADGE_CONFIG[trust.badge];

  // ── Compact (listing kartı) ───────────────────────────────────────────────
  if (compact) {
    return (
      <div
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase"
        style={{ backgroundColor: lvl.bg, color: lvl.color }}
      >
        <Shield size={9} />
        {lvl.label}
      </div>
    );
  }

  // ── Full widget (listing detay) ───────────────────────────────────────────
  return (
    <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="px-8 py-5 flex items-center justify-between"
        style={{ backgroundColor: lvl.bg, borderBottom: `1px solid ${lvl.color}20` }}
      >
        <div className="flex items-center gap-4">
          {/* Score Circle */}
          <div
            className="w-14 h-14 rounded-[18px] flex flex-col items-center justify-center shrink-0"
            style={{ backgroundColor: 'white', border: `2px solid ${lvl.color}40` }}
          >
            <span className="text-xl font-black" style={{ color: lvl.color }}>{trust.score}</span>
            <span className="text-[8px] font-black text-gray-400 tracking-widest">/100</span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={14} style={{ color: lvl.color }} />
              <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: lvl.color }}>
                TRUST ENGINE
              </span>
            </div>
            <p className="text-lg font-black text-[#0F172A] tracking-tight">{lvl.label}</p>
          </div>
        </div>

        {/* Badge */}
        {trust.badge !== 'NONE' && (
          <div
            className="px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase"
            style={{ backgroundColor: badge.bg, color: badge.color }}
          >
            {badge.label}
          </div>
        )}
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Summary */}
        <p className="text-[12px] text-gray-500 leading-relaxed">{trust.summary}</p>

        {/* Flags */}
        {trust.flags.length > 0 && (
          <div className="space-y-2">
            {trust.flags.map((flag, i) => (
              <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
                <AlertTriangle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] font-semibold text-amber-700">{flag}</p>
              </div>
            ))}
          </div>
        )}

        {/* Checks toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] hover:bg-gray-100 rounded-2xl transition-colors"
        >
          <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">
            Detaylı Kontroller ({trust.checks.filter((c) => c.passed).length}/{trust.checks.length} geçti)
          </span>
          {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>

        {expanded && (
          <div className="space-y-3">
            {trust.checks.map((check, i) => (
              <div key={i} className="flex items-start gap-3">
                {check.passed
                  ? <CheckCircle size={15} className="text-[#00C49F] shrink-0 mt-0.5" />
                  : <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-[11px] font-black text-[#0F172A]">{check.name}</p>
                    <span className="text-[9px] font-bold text-gray-400">{check.weight} puan</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{check.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-[9px] text-gray-300 font-semibold text-center">
          Sovereign Trust Engine • {new Date(trust.analyzedAt).toLocaleDateString('tr-TR')}
        </p>
      </div>
    </div>
  );
}
