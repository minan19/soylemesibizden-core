'use client';

import { useState, useMemo } from 'react';
import { Calculator, Download, ChevronDown, ChevronUp } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

function fmtPct(n: number) {
  return n.toFixed(2) + '%';
}

interface Row {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remaining: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

function buildSchedule(principal: number, annualRate: number, months: number): Row[] {
  const r = annualRate / 100 / 12;
  if (r === 0) {
    const payment = principal / months;
    const rows: Row[] = [];
    let rem = principal;
    let cumInt = 0;
    let cumPri = 0;
    for (let m = 1; m <= months; m++) {
      rem -= payment;
      cumPri += payment;
      rows.push({ month: m, payment, principal: payment, interest: 0, remaining: Math.max(rem, 0), cumulativeInterest: cumInt, cumulativePrincipal: cumPri });
    }
    return rows;
  }
  const payment = (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const rows: Row[] = [];
  let rem = principal;
  let cumInt = 0;
  let cumPri = 0;
  for (let m = 1; m <= months; m++) {
    const interest = rem * r;
    const prin = payment - interest;
    rem -= prin;
    cumInt += interest;
    cumPri += prin;
    rows.push({
      month: m,
      payment,
      principal: prin,
      interest,
      remaining: Math.max(rem, 0),
      cumulativeInterest: cumInt,
      cumulativePrincipal: cumPri,
    });
  }
  return rows;
}

const QUICK_AMOUNTS = [500_000, 1_000_000, 2_000_000, 3_000_000, 5_000_000];
const QUICK_RATES = [2.99, 3.39, 3.49, 3.59];
const QUICK_TENORS = [60, 84, 120, 180, 240];

export default function OdemePlaniClient() {
  const [principal, setPrincipal] = useState(2_000_000);
  const [rate, setRate] = useState(3.49);
  const [months, setMonths] = useState(120);
  const [showYearly, setShowYearly] = useState(false);
  const [displayCount, setDisplayCount] = useState(24);

  const schedule = useMemo(() => buildSchedule(principal, rate, months), [principal, rate, months]);

  const totals = useMemo(() => {
    if (schedule.length === 0) return { totalPaid: 0, totalInterest: 0, totalPrincipal: 0 };
    const last = schedule[schedule.length - 1];
    return {
      totalPaid: schedule[0].payment * months,
      totalInterest: last.cumulativeInterest,
      totalPrincipal: last.cumulativePrincipal,
    };
  }, [schedule, months]);

  // Yearly summary: sum per year
  const yearlyRows = useMemo(() => {
    const years: { year: number; paid: number; principal: number; interest: number; remaining: number }[] = [];
    for (let y = 1; y <= Math.ceil(months / 12); y++) {
      const start = (y - 1) * 12;
      const end = Math.min(y * 12, months);
      const slice = schedule.slice(start, end);
      const paid = slice.reduce((s, r) => s + r.payment, 0);
      const prin = slice.reduce((s, r) => s + r.principal, 0);
      const int = slice.reduce((s, r) => s + r.interest, 0);
      const remaining = slice[slice.length - 1]?.remaining ?? 0;
      years.push({ year: y, paid, principal: prin, interest: int, remaining });
    }
    return years;
  }, [schedule, months]);

  const monthlyPayment = schedule[0]?.payment ?? 0;
  const visibleRows = showYearly ? yearlyRows.map(() => null) : schedule.slice(0, displayCount);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
          <Calculator size={15} className="text-[#00C49F]" /> Kredi Bilgileri
        </h2>

        {/* Principal */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-gray-700 mb-1">Kredi Tutarı (₺)</label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(Math.max(50000, Number(e.target.value)))}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 mb-2"
          />
          <div className="flex flex-wrap gap-1.5">
            {QUICK_AMOUNTS.map(a => (
              <button
                key={a}
                onClick={() => setPrincipal(a)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${principal === a ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {(a / 1_000_000).toFixed(a % 1_000_000 === 0 ? 0 : 1)}M
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Rate */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Faiz Oranı (%)</label>
            <input
              type="number"
              value={rate}
              onChange={e => setRate(Math.max(0.1, Math.min(10, Number(e.target.value))))}
              step={0.01}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {QUICK_RATES.map(r => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${rate === r ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  %{r}
                </button>
              ))}
            </div>
          </div>

          {/* Tenor */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Vade (Ay)</label>
            <input
              type="number"
              value={months}
              onChange={e => setMonths(Math.max(12, Math.min(360, Number(e.target.value))))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 mb-2"
            />
            <div className="flex flex-wrap gap-1.5">
              {QUICK_TENORS.map(t => (
                <button
                  key={t}
                  onClick={() => setMonths(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${months === t ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                >
                  {t / 12} yıl
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Aylık Taksit', value: fmt(monthlyPayment), color: 'text-[#00C49F]' },
          { label: 'Toplam Ödeme', value: fmt(totals.totalPaid), color: 'text-gray-900' },
          { label: 'Toplam Faiz', value: fmt(totals.totalInterest), color: 'text-rose-600' },
          { label: 'Faiz / Anapara', value: fmtPct((totals.totalInterest / totals.totalPaid) * 100), color: 'text-amber-600' },
        ].map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <p className="text-[10px] text-gray-400 mb-1">{kpi.label}</p>
            <p className={`text-lg font-black ${kpi.color}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Anapara/Faiz bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-bold text-gray-700 mb-3">Ödeme Dağılımı</p>
        <div className="flex h-4 rounded-full overflow-hidden">
          <div
            className="bg-[#00C49F] transition-all"
            style={{ width: `${(totals.totalPrincipal / totals.totalPaid) * 100}%` }}
          />
          <div className="bg-rose-400 flex-1" />
        </div>
        <div className="flex gap-4 mt-2 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#00C49F] inline-block" /> Anapara {fmtPct((totals.totalPrincipal / totals.totalPaid) * 100)}</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Faiz {fmtPct((totals.totalInterest / totals.totalPaid) * 100)}</span>
        </div>
      </div>

      {/* Table toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <h3 className="text-sm font-black text-gray-900">Ödeme Planı Tablosu</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowYearly(p => !p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${showYearly ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              Yıllık özet
            </button>
            <button
              onClick={() => setShowYearly(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${!showYearly ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              Aylık detay
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-2.5 px-4 text-gray-400 font-semibold">{showYearly ? 'Yıl' : 'Ay'}</th>
                <th className="text-right py-2.5 px-4 text-gray-400 font-semibold">Taksit</th>
                <th className="text-right py-2.5 px-4 text-gray-400 font-semibold">Anapara</th>
                <th className="text-right py-2.5 px-4 text-gray-400 font-semibold">Faiz</th>
                <th className="text-right py-2.5 px-4 text-gray-400 font-semibold">Kalan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {showYearly
                ? yearlyRows.map(row => (
                    <tr key={row.year} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-gray-800">{row.year}. Yıl</td>
                      <td className="py-2.5 px-4 text-right font-bold text-gray-800">{fmt(row.paid)}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-[#00C49F]">{fmt(row.principal)}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-rose-500">{fmt(row.interest)}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-gray-700">{fmt(row.remaining)}</td>
                    </tr>
                  ))
                : schedule.slice(0, displayCount).map(row => (
                    <tr key={row.month} className={`hover:bg-gray-50/60 transition-colors ${row.month % 12 === 0 ? 'bg-[#F0FDF8]/40' : ''}`}>
                      <td className="py-2 px-4 text-gray-600 font-medium">{row.month}</td>
                      <td className="py-2 px-4 text-right font-bold text-gray-800">{fmt(row.payment)}</td>
                      <td className="py-2 px-4 text-right text-[#00C49F] font-semibold">{fmt(row.principal)}</td>
                      <td className="py-2 px-4 text-right text-rose-500 font-semibold">{fmt(row.interest)}</td>
                      <td className="py-2 px-4 text-right text-gray-700 font-semibold">{fmt(row.remaining)}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {/* Load more */}
        {!showYearly && displayCount < months && (
          <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] text-gray-400">{displayCount} / {months} ay gösteriliyor</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDisplayCount(p => Math.min(p + 24, months))}
                className="flex items-center gap-1 text-xs text-[#00C49F] font-bold hover:underline"
              >
                <ChevronDown size={13} /> Daha fazla
              </button>
              {displayCount > 24 && (
                <button
                  onClick={() => setDisplayCount(24)}
                  className="flex items-center gap-1 text-xs text-gray-400 font-semibold hover:underline"
                >
                  <ChevronUp size={13} /> Daralt
                </button>
              )}
            </div>
          </div>
        )}
        {!showYearly && displayCount >= months && (
          <div className="px-5 py-3 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400">Tüm {months} ay gösteriliyor</p>
          </div>
        )}
      </div>
    </div>
  );
}
