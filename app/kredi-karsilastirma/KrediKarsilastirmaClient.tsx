'use client';

import { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface Scenario {
  id: number;
  label: string;
  principal: number;
  rate: number;
  months: number;
  color: string;
}

const COLORS = [
  'bg-[#00C49F] border-[#00C49F]',
  'bg-blue-500 border-blue-500',
  'bg-amber-500 border-amber-500',
  'bg-violet-500 border-violet-500',
];

const LABEL_COLORS = [
  'text-[#00C49F] bg-[#F0FDF8] border-[#00C49F]/30',
  'text-blue-600 bg-blue-50 border-blue-200',
  'text-amber-600 bg-amber-50 border-amber-200',
  'text-violet-600 bg-violet-50 border-violet-200',
];

const BAR_COLORS = ['#00C49F', '#3B82F6', '#F59E0B', '#7C3AED'];

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

const DEFAULT_SCENARIOS: Scenario[] = [
  { id: 1, label: 'Senaryo A', principal: 2_000_000, rate: 3.39, months: 120, color: COLORS[0] },
  { id: 2, label: 'Senaryo B', principal: 2_000_000, rate: 3.59, months: 120, color: COLORS[1] },
];

let nextId = 3;

export default function KrediKarsilastirmaClient() {
  const [scenarios, setScenarios] = useState<Scenario[]>(DEFAULT_SCENARIOS);

  function addScenario() {
    if (scenarios.length >= 4) return;
    const last = scenarios[scenarios.length - 1];
    setScenarios(prev => [...prev, {
      id: nextId++,
      label: `Senaryo ${String.fromCharCode(64 + prev.length + 1)}`,
      principal: last?.principal ?? 2_000_000,
      rate: last?.rate ?? 3.49,
      months: last?.months ?? 120,
      color: COLORS[prev.length % COLORS.length],
    }]);
  }

  function removeScenario(id: number) {
    setScenarios(prev => prev.filter(s => s.id !== id));
  }

  function updateScenario(id: number, field: keyof Scenario, value: string | number) {
    setScenarios(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  }

  const results = useMemo(() => scenarios.map(s => {
    const monthly = monthlyPayment(s.principal, s.rate, s.months);
    const total = monthly * s.months;
    const totalInterest = total - s.principal;
    return { ...s, monthly, total, totalInterest };
  }), [scenarios]);

  const maxMonthly = Math.max(...results.map(r => r.monthly), 1);
  const maxTotal = Math.max(...results.map(r => r.total), 1);
  const maxInterest = Math.max(...results.map(r => r.totalInterest), 1);

  return (
    <div className="space-y-6">
      {/* Scenario inputs */}
      <div className="space-y-4">
        {scenarios.map((s, idx) => (
          <div key={s.id} className={`bg-white rounded-2xl border-l-4 ${COLORS[idx % COLORS.length].split(' ')[1]} border-t border-r border-b border-gray-100 p-5`}>
            <div className="flex items-center justify-between mb-4">
              <input
                value={s.label}
                onChange={e => updateScenario(s.id, 'label', e.target.value)}
                className="text-sm font-black text-gray-900 bg-transparent border-none outline-none w-32"
              />
              {scenarios.length > 1 && (
                <button onClick={() => removeScenario(s.id)} className="text-gray-300 hover:text-rose-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-1">Kredi Tutarı (₺)</label>
                <input
                  type="number"
                  value={s.principal}
                  onChange={e => updateScenario(s.id, 'principal', Math.max(50000, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-1">Aylık Faiz (%)</label>
                <input
                  type="number"
                  value={s.rate}
                  step={0.01}
                  onChange={e => updateScenario(s.id, 'rate', Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 mb-1">Vade (Ay)</label>
                <input
                  type="number"
                  value={s.months}
                  onChange={e => updateScenario(s.id, 'months', Math.max(12, Math.min(360, Number(e.target.value))))}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                />
              </div>
            </div>
          </div>
        ))}

        {scenarios.length < 4 && (
          <button
            onClick={addScenario}
            className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-xs text-gray-400 hover:border-[#00C49F] hover:text-[#00C49F] font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={14} /> Senaryo Ekle (maks. 4)
          </button>
        )}
      </div>

      {/* Comparison cards */}
      <div className={`grid gap-4 grid-cols-${results.length} min-w-0`} style={{ gridTemplateColumns: `repeat(${results.length}, 1fr)` }}>
        {results.map((r, idx) => (
          <div key={r.id} className={`rounded-2xl border p-4 ${LABEL_COLORS[idx % LABEL_COLORS.length]}`}>
            <p className="text-[11px] font-black mb-3">{r.label}</p>
            <div className="space-y-2">
              <div>
                <p className="text-[9px] font-semibold opacity-60 mb-0.5">Aylık Taksit</p>
                <p className="text-base font-black leading-tight">{fmt(r.monthly)}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold opacity-60 mb-0.5">Toplam Ödeme</p>
                <p className="text-sm font-bold">{fmt(r.total)}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold opacity-60 mb-0.5">Toplam Faiz</p>
                <p className="text-sm font-bold">{fmt(r.totalInterest)}</p>
              </div>
              <div>
                <p className="text-[9px] font-semibold opacity-60 mb-0.5">Vade</p>
                <p className="text-sm font-bold">{r.months / 12} yıl</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual comparison */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
          <Calculator size={14} className="text-[#00C49F]" /> Görsel Karşılaştırma
        </h3>

        {/* Monthly payment bars */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 mb-3">Aylık Taksit</p>
          <div className="space-y-3">
            {results.map((r, idx) => (
              <div key={r.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600 w-20 shrink-0">{r.label}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(r.monthly / maxMonthly) * 100}%`, backgroundColor: BAR_COLORS[idx % BAR_COLORS.length] }}
                  />
                </div>
                <span className="text-xs font-black text-gray-800 w-24 text-right shrink-0">{fmt(r.monthly)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total interest bars */}
        <div className="mb-6">
          <p className="text-xs font-bold text-gray-500 mb-3">Toplam Faiz</p>
          <div className="space-y-3">
            {results.map((r, idx) => (
              <div key={r.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600 w-20 shrink-0">{r.label}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-rose-400"
                    style={{ width: `${(r.totalInterest / maxInterest) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-black text-rose-600 w-24 text-right shrink-0">{fmt(r.totalInterest)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total paid bars */}
        <div>
          <p className="text-xs font-bold text-gray-500 mb-3">Toplam Ödeme</p>
          <div className="space-y-3">
            {results.map((r, idx) => (
              <div key={r.id} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600 w-20 shrink-0">{r.label}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(r.total / maxTotal) * 100}%`, backgroundColor: BAR_COLORS[idx % BAR_COLORS.length], opacity: 0.6 }}
                  />
                </div>
                <span className="text-xs font-black text-gray-800 w-24 text-right shrink-0">{fmt(r.total)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-black text-gray-900">Karşılaştırma Tablosu</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-gray-400 font-semibold">Metrik</th>
                {results.map((r, idx) => (
                  <th key={r.id} className="text-right py-2.5 px-4 font-bold" style={{ color: BAR_COLORS[idx % BAR_COLORS.length] }}>
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { label: 'Kredi Tutarı', key: 'principal' as const, fmtFn: fmt },
                { label: 'Aylık Faiz', key: 'rate' as const, fmtFn: (v: number) => `%${v}` },
                { label: 'Vade', key: 'months' as const, fmtFn: (v: number) => `${v} ay (${v/12} yıl)` },
                { label: 'Aylık Taksit', key: 'monthly' as const, fmtFn: fmt },
                { label: 'Toplam Ödeme', key: 'total' as const, fmtFn: fmt },
                { label: 'Toplam Faiz', key: 'totalInterest' as const, fmtFn: fmt },
                { label: 'Faiz/Anapara Oranı', key: 'totalInterest' as const, fmtFn: (v: number, r: typeof results[0]) => `${((v / r.principal) * 100).toFixed(0)}%` },
              ].map(row => (
                <tr key={row.label} className="hover:bg-gray-50/60">
                  <td className="py-2.5 px-4 font-semibold text-gray-600">{row.label}</td>
                  {results.map(r => (
                    <td key={r.id} className="py-2.5 px-4 text-right font-bold text-gray-800">
                      {row.fmtFn(r[row.key] as number, r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
