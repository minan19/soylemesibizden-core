'use client';

import { useCompare } from '@/hooks/useCompare';
import Link from 'next/link';
import { X, GitCompare, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare, count } = useCompare();
  const [collapsed, setCollapsed] = useState(false);

  if (count === 0) return null;

  const compareUrl = `/compare?ids=${compareIds.join(',')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 pointer-events-none">
      <div className="pointer-events-auto bg-[#0F172A] rounded-[24px] shadow-2xl border border-white/10 overflow-hidden max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <GitCompare size={14} className="text-[#00C49F]" />
            <span className="text-[11px] font-black tracking-widest uppercase text-white">
              Karşılaştır
            </span>
            <span className="ml-1 bg-[#00C49F] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {count}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="text-[10px] font-bold text-gray-400 hover:text-red-400 transition-colors tracking-widest uppercase"
            >
              Temizle
            </button>
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {collapsed ? (
                <ChevronUp size={12} className="text-gray-300" />
              ) : (
                <ChevronDown size={12} className="text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Items */}
        {!collapsed && (
          <div className="px-6 py-4 flex items-center gap-4">
            {compareIds.map((id, idx) => (
              <div
                key={id}
                className="flex-1 bg-white/8 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between gap-3 min-w-0"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#00C49F]/20 text-[#00C49F] text-[9px] font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-200 truncate">
                    İlan #{id.slice(-6)}
                  </span>
                </div>
                <button
                  onClick={() => removeFromCompare(id)}
                  className="shrink-0 w-5 h-5 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                >
                  <X size={10} className="text-gray-400 hover:text-red-400" />
                </button>
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: 3 - count }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="flex-1 border border-dashed border-white/10 rounded-2xl px-4 py-3 flex items-center justify-center"
              >
                <span className="text-[10px] font-semibold text-gray-600">+ İlan Ekle</span>
              </div>
            ))}

            {/* CTA */}
            {count >= 2 ? (
              <Link
                href={compareUrl}
                className="shrink-0 px-6 py-3 bg-[#00C49F] hover:bg-[#00A887] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl transition-all whitespace-nowrap"
              >
                Karşılaştır →
              </Link>
            ) : (
              <div className="shrink-0 px-6 py-3 bg-white/5 text-gray-600 text-[11px] font-black tracking-widest uppercase rounded-2xl whitespace-nowrap cursor-not-allowed">
                Min 2 İlan
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
