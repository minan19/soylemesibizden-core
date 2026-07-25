'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';

interface Props {
  defaultPrice: number;
}

export default function MortgageCalculator({ defaultPrice }: Props) {
  const [principal, setPrincipal] = useState(Math.round(defaultPrice * 0.7));
  const [rate, setRate] = useState(2.5);
  const [months, setMonths] = useState(120);

  const r = rate / 100;
  const n = months;
  const P = principal;

  let monthlyPayment = 0;
  if (r > 0 && n > 0 && P > 0) {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - P;

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
    </div>
  );
}
