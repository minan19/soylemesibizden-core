'use client';

import { useState } from 'react';
import { Calculator, Home, TrendingUp, PiggyBank, DollarSign } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

/* ── Mortgage Calculator ─────────────────────────────────────── */
function MortgageCalc() {
  const [price, setPrice] = useState('');
  const [down, setDown] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const principal = (parseFloat(price) || 0) - (parseFloat(down) || 0);
  const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;
  const n = (parseInt(years) || 0) * 12;
  const monthly = monthlyRate > 0 && n > 0
    ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : 0;
  const total = monthly * n;
  const totalInterest = total - principal;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Mülk Fiyatı (₺)', value: price, set: setPrice, placeholder: '5.000.000' },
          { label: 'Peşinat (₺)', value: down, set: setDown, placeholder: '1.000.000' },
          { label: 'Yıllık Faiz (%)', value: rate, set: setRate, placeholder: '32' },
          { label: 'Vade (Yıl)', value: years, set: setYears, placeholder: '10' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={e => f.set(e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
          </div>
        ))}
      </div>
      {monthly > 0 && (
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-medium">Aylık Taksit</span>
            <span className="text-xl font-bold text-[#00C49F]">{fmt(monthly)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Toplam Ödeme</span>
            <span className="font-semibold">{fmt(total)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Toplam Faiz</span>
            <span className="font-semibold text-red-500">{fmt(totalInterest)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Kredi Tutarı</span>
            <span className="font-semibold">{fmt(principal)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Kira vs Satın Al ─────────────────────────────────────────── */
function RentVsBuyCalc() {
  const [rentMonthly, setRentMonthly] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [downPercent, setDownPercent] = useState('20');
  const [appreciation, setAppreciation] = useState('10');
  const [horizonYears, setHorizonYears] = useState('5');

  const price = parseFloat(buyPrice) || 0;
  const downAmt = price * ((parseFloat(downPercent) || 20) / 100);
  const loanAmt = price - downAmt;
  const loanRate = 0.32;
  const n = (parseInt(horizonYears) || 5) * 12;
  const mr = loanRate / 12;
  const monthlyMortgage = mr > 0 && n > 0
    ? (loanAmt * mr * Math.pow(1 + mr, n)) / (Math.pow(1 + mr, n) - 1)
    : 0;

  const totalRent = (parseFloat(rentMonthly) || 0) * (parseInt(horizonYears) || 5) * 12;
  const totalMortgage = monthlyMortgage * n + downAmt;
  const futureValue = price * Math.pow(1 + (parseFloat(appreciation) || 10) / 100, parseInt(horizonYears) || 5);
  const buyNetCost = totalMortgage - (futureValue - price);

  const cheaper = buyNetCost < totalRent ? 'SATIN ALMAK' : 'KİRALAMAK';
  const diff = Math.abs(totalRent - buyNetCost);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Aylık Kira (₺)', value: rentMonthly, set: setRentMonthly, placeholder: '15.000' },
          { label: 'Alım Fiyatı (₺)', value: buyPrice, set: setBuyPrice, placeholder: '3.000.000' },
          { label: 'Peşinat (%)', value: downPercent, set: setDownPercent, placeholder: '20' },
          { label: 'Yıllık Değer Artışı (%)', value: appreciation, set: setAppreciation, placeholder: '10' },
          { label: 'Yatırım Süresi (Yıl)', value: horizonYears, set: setHorizonYears, placeholder: '5' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={e => f.set(e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
          </div>
        ))}
      </div>
      {price > 0 && parseFloat(rentMonthly) > 0 && (
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5 space-y-3">
          <div className={`text-center py-3 rounded-xl font-bold text-sm ${buyNetCost < totalRent ? 'bg-[#00C49F] text-white' : 'bg-amber-100 text-amber-800'}`}>
            {horizonYears} yılda <span className="text-lg">{cheaper}</span> daha avantajlı
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between"><span>Toplam Kira ({horizonYears} yıl)</span><span className="font-bold">{fmt(totalRent)}</span></div>
            <div className="flex justify-between"><span>Satın Alma Net Maliyeti</span><span className="font-bold">{fmt(buyNetCost)}</span></div>
            <div className="flex justify-between"><span>Tahmini Gelecek Değer</span><span className="font-bold text-[#00C49F]">{fmt(futureValue)}</span></div>
            <div className="flex justify-between border-t pt-2"><span>Fark</span><span className="font-bold">{fmt(diff)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Kira Getirisi Hesaplayıcı ───────────────────────────────── */
function RentalYieldCalc() {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [expenses, setExpenses] = useState('');

  const price = parseFloat(propertyPrice) || 0;
  const rent = parseFloat(monthlyRent) || 0;
  const exp = parseFloat(expenses) || 0;
  const annualRent = rent * 12;
  const netAnnualRent = annualRent - exp * 12;
  const grossYield = price > 0 ? (annualRent / price) * 100 : 0;
  const netYield = price > 0 ? (netAnnualRent / price) * 100 : 0;
  const paybackYears = annualRent > 0 ? price / annualRent : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Mülk Fiyatı (₺)', value: propertyPrice, set: setPropertyPrice, placeholder: '3.000.000' },
          { label: 'Aylık Kira (₺)', value: monthlyRent, set: setMonthlyRent, placeholder: '18.000' },
          { label: 'Aylık Giderler (₺)', value: expenses, set: setExpenses, placeholder: '2.000' },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
            <input
              type="number"
              value={f.value}
              onChange={e => f.set(e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
          </div>
        ))}
      </div>
      {price > 0 && rent > 0 && (
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-xl p-3">
              <p className="text-xl font-bold text-[#00C49F]">%{grossYield.toFixed(2)}</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">BRÜT GETİRİ</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-xl font-bold text-blue-600">%{netYield.toFixed(2)}</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">NET GETİRİ</p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <p className="text-xl font-bold text-amber-600">{paybackYears.toFixed(1)}</p>
              <p className="text-[10px] text-gray-400 font-semibold mt-0.5">GERİ ÖDEME (YIL)</p>
            </div>
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between"><span>Yıllık Brüt Kira</span><span className="font-bold">{fmt(annualRent)}</span></div>
            <div className="flex justify-between"><span>Yıllık Net Kira</span><span className="font-bold">{fmt(netAnnualRent)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: 'mortgage', label: 'Konut Kredisi', icon: Home, component: MortgageCalc },
  { id: 'rentvsbuy', label: 'Kira vs Satın Al', icon: Calculator, component: RentVsBuyCalc },
  { id: 'yield', label: 'Kira Getirisi', icon: TrendingUp, component: RentalYieldCalc },
];

export default function CalculatorsClient() {
  const [activeTab, setActiveTab] = useState('mortgage');
  const Active = TABS.find(t => t.id === activeTab)!;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-100">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'text-[#00C49F] border-[#00C49F]'
                : 'text-gray-400 border-transparent hover:text-gray-700'
            }`}
          >
            <tab.icon size={15} />
            <span className="hidden sm:block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calculator content */}
      <div className="p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">{Active.label}</h2>
        <Active.component />
      </div>
    </div>
  );
}
