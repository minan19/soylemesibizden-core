'use client';

import { useState, useMemo } from 'react';
import { Calculator, TrendingDown, DollarSign } from 'lucide-react';

interface Props {
  propertyPrice: number;
}

function formatCurrency(val: number): string {
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + ' K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

export default function MortgageCalculator({ propertyPrice }: Props) {
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [termYears, setTermYears] = useState(15);
  const [annualRate, setAnnualRate] = useState(3.5); // Aylık faiz %

  const calc = useMemo(() => {
    const downPayment = propertyPrice * (downPaymentPct / 100);
    const loanAmount = propertyPrice - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = termYears * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - loanAmount;

    return { downPayment, loanAmount, monthlyPayment, totalPaid, totalInterest };
  }, [propertyPrice, downPaymentPct, termYears, annualRate]);

  return (
    <div className="bg-white rounded-[28px] border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
          <Calculator size={20} className="text-blue-500" />
        </div>
        <div>
          <h3 className="font-black text-[#0F172A]">Mortgage Hesaplayıcı</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">İpotek & Finansman</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* DOWN PAYMENT */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Peşinat</label>
            <span className="text-[11px] font-black text-blue-500">%{downPaymentPct} — {formatCurrency(calc.downPayment)}</span>
          </div>
          <input type="range" min="10" max="80" value={downPaymentPct} onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-blue-500" />
        </div>

        {/* TERM */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Vade</label>
            <span className="text-[11px] font-black text-blue-500">{termYears} Yıl</span>
          </div>
          <input type="range" min="5" max="30" step="5" value={termYears} onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full accent-blue-500" />
          <div className="flex justify-between text-[9px] text-gray-300 mt-1 font-semibold">
            <span>5Y</span><span>10Y</span><span>15Y</span><span>20Y</span><span>25Y</span><span>30Y</span>
          </div>
        </div>

        {/* INTEREST RATE */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Aylık Faiz</label>
            <span className="text-[11px] font-black text-blue-500">%{annualRate.toFixed(1)}</span>
          </div>
          <input type="range" min="1" max="8" step="0.1" value={annualRate} onChange={(e) => setAnnualRate(Number(e.target.value))}
            className="w-full accent-blue-500" />
        </div>

        {/* RESULTS */}
        <div className="bg-[#F8FAFC] rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-gray-500">Kredi Tutarı</span>
            <span className="font-black text-[#0F172A]">{formatCurrency(calc.loanAmount)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <span className="text-[12px] font-black text-gray-700">Aylık Taksit</span>
            <span className="text-xl font-black text-blue-500">{formatCurrency(calc.monthlyPayment)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
              <TrendingDown size={11} /> Toplam Faiz
            </span>
            <span className="font-bold text-amber-500">{formatCurrency(calc.totalInterest)}</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <span className="text-[11px] font-bold text-gray-500 flex items-center gap-1">
              <DollarSign size={11} /> Toplam Ödeme
            </span>
            <span className="font-black text-gray-700">{formatCurrency(calc.totalPaid)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
