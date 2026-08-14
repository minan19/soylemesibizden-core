'use client';

import { useState } from 'react';
import { Calculator, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  defaultPrice: number;
}

export default function MortgageCalculator({ defaultPrice }: Props) {
  const [principal, setPrincipal] = useState(Math.round(defaultPrice * 0.7));
  const [rate, setRate] = useState(2.5);
  const [months, setMonths] = useState(120);
  const [showSchedule, setShowSchedule] = useState(false);

  const r = rate / 100;
  const n = months;
  const P = principal;

  let monthlyPayment = 0;
  if (r > 0 && n > 0 && P > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - P;

  // Amortization schedule (first 24 months max for display)
  const scheduleRows: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
  if (monthlyPayment > 0 && P > 0) {
    let balance = P;
    const displayMonths = Math.min(months, 24);
    for (let i = 1; i <= displayMonths; i++) {
      const interestPart = balance * r;
      const principalPart = monthlyPayment - interestPart;
      balance = Math.max(0, balance - principalPart);
      scheduleRows.push({ month: i, payment: monthlyPayment, principal: principalPart, interest: interestPart, balance });
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#00C49F]/10 flex items-center justify-center">
          <Calculator size={16} className="text-[#00C49F]" />
        </div>
        <h2 className="text-base font-bold text-gray-900">Mortgage Hesaplayıcı</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
            Kredi Tutarı (₺)
          </label>
          <input
            type="number"
            value={principal}
            min={0}
            onChange={e => setPrincipal(Number(e.target.value))}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C49F]/25 focus:border-[#00C49F] transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
              Faiz Oranı (% Aylık)
            </label>
            <input
              type="number"
              value={rate}
              step={0.1}
              min={0.01}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C49F]/25 focus:border-[#00C49F] transition"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
              Vade (Ay)
            </label>
            <input
              type="number"
              value={months}
              min={1}
              max={360}
              onChange={e => setMonths(Number(e.target.value))}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-mono text-gray-900 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C49F]/25 focus:border-[#00C49F] transition"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 p-5 bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20">
        <p className="text-[11px] font-bold tracking-widest text-[#00C49F] uppercase mb-2">Aylık Taksit</p>
        <p className="text-3xl font-bold font-mono text-gray-900 mb-3">
          {monthlyPayment > 0
            ? `₺ ${monthlyPayment.toLocaleString('tr-TR', { maximumFractionDigits: 2 })}`
            : '—'}
        </p>
        {monthlyPayment > 0 && (
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#00C49F]/20">
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Toplam Ödeme</p>
              <p className="text-sm font-bold font-mono text-gray-700">
                ₺ {totalPayment.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">Toplam Faiz</p>
              <p className="text-sm font-bold font-mono text-gray-700">
                ₺ {totalInterest.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Amortization schedule */}
      {scheduleRows.length > 0 && (
        <div className="mt-4">
          <button
            onClick={() => setShowSchedule(v => !v)}
            className="flex items-center gap-2 text-xs font-semibold text-[#00C49F] hover:text-[#00a882] transition-colors"
          >
            {showSchedule ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Ödeme Planı {months > 24 ? '(İlk 24 Ay)' : `(${months} Ay)`}
          </button>
          {showSchedule && (
            <div className="mt-3 rounded-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    {['Ay', 'Taksit', 'Ana Para', 'Faiz', 'Kalan'].map(h => (
                      <th key={h} className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {scheduleRows.map(row => (
                    <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2 font-semibold text-gray-500">{row.month}</td>
                      <td className="px-3 py-2 font-mono text-gray-800">{Math.round(row.payment).toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-2 font-mono text-[#00C49F]">{Math.round(row.principal).toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-2 font-mono text-amber-600">{Math.round(row.interest).toLocaleString('tr-TR')}</td>
                      <td className="px-3 py-2 font-mono text-gray-600">{Math.round(row.balance).toLocaleString('tr-TR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {months > 24 && (
                <p className="px-3 py-2 text-[10px] text-gray-400 border-t border-gray-50">
                  Yalnızca ilk 24 ay gösteriliyor. Toplam {months} ay.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
