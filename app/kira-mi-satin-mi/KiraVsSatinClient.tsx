'use client';

import { useState, useMemo } from 'react';
import { Home, Key, TrendingUp, Info } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function KiraVsSatinClient() {
  // Buying params
  const [homePrice, setHomePrice] = useState(3_000_000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(3.49);
  const [loanYears, setLoanYears] = useState(10);
  const [annualAppreciation, setAnnualAppreciation] = useState(15);
  const [maintenancePct, setMaintenancePct] = useState(1.0);

  // Renting params
  const [monthlyRent, setMonthlyRent] = useState(15_000);
  const [annualRentIncrease, setAnnualRentIncrease] = useState(25);
  const [investmentReturn, setInvestmentReturn] = useState(35);

  // Horizon
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const tapuCost = homePrice * 0.04; // ~4% tapu harci
    const totalBuyingCost = downPayment + tapuCost;

    const principal = homePrice - downPayment;
    const monthlyMortgage = monthlyPayment(principal, mortgageRate, loanYears * 12);
    const maintenanceMonthly = (homePrice * maintenancePct / 100) / 12;
    const totalMonthlyBuying = monthlyMortgage + maintenanceMonthly;

    // Buying cost over years
    const loanMonths = Math.min(years * 12, loanYears * 12);
    let buyerRemainingLoan = principal;
    let totalMortgagePaid = 0;
    const r = mortgageRate / 100 / 12;
    for (let m = 0; m < loanMonths; m++) {
      const interest = buyerRemainingLoan * r;
      const prin = monthlyMortgage - interest;
      buyerRemainingLoan -= prin;
      totalMortgagePaid += monthlyMortgage;
    }
    if (years * 12 > loanYears * 12) {
      buyerRemainingLoan = 0;
    }

    const maintenanceTotal = maintenanceMonthly * years * 12;
    const futureHomeValue = homePrice * Math.pow(1 + annualAppreciation / 100, years);
    const buyerEquity = futureHomeValue - Math.max(buyerRemainingLoan, 0);
    const totalBuyerCost = totalBuyingCost + totalMortgagePaid + maintenanceTotal;
    const buyerNetPosition = buyerEquity - totalBuyerCost; // net wealth change

    // Renting costs
    let totalRentPaid = 0;
    let monthlyRentNow = monthlyRent;
    for (let y = 0; y < years; y++) {
      totalRentPaid += monthlyRentNow * 12;
      monthlyRentNow *= 1 + annualRentIncrease / 100;
    }

    // Investment of down payment (opportunity cost)
    const investmentGrowth = totalBuyingCost * (Math.pow(1 + investmentReturn / 100, years) - 1);
    const renterNetPosition = investmentGrowth - totalRentPaid;

    const breakeven = buyerNetPosition > renterNetPosition;

    // Year-by-year comparison
    const yearlyData: { year: number; buyerWealth: number; renterWealth: number; homeValue: number }[] = [];
    let cumulativeRent = 0;
    let investedPot = totalBuyingCost;
    let currentRent = monthlyRent;
    let currentLoan = principal;
    let cumulativeMortgage = 0;

    for (let y = 1; y <= Math.min(years, 30); y++) {
      // Buyer
      for (let m = 0; m < 12; m++) {
        if (currentLoan > 0) {
          const int = currentLoan * r;
          const pri = Math.min(monthlyMortgage - int, currentLoan);
          currentLoan = Math.max(currentLoan - pri, 0);
          cumulativeMortgage += monthlyMortgage;
        }
      }
      const homeVal = homePrice * Math.pow(1 + annualAppreciation / 100, y);
      const buyerW = homeVal - currentLoan - totalBuyingCost - cumulativeMortgage - (maintenanceMonthly * 12 * y);

      // Renter
      cumulativeRent += currentRent * 12;
      currentRent *= 1 + annualRentIncrease / 100;
      investedPot *= 1 + investmentReturn / 100;
      const renterW = investedPot - totalBuyingCost - cumulativeRent;

      yearlyData.push({ year: y, buyerWealth: buyerW, renterWealth: renterW, homeValue: homeVal });
    }

    const crossoverYear = yearlyData.findIndex((d, i) => i > 0 && d.buyerWealth > d.renterWealth && yearlyData[i - 1].buyerWealth <= yearlyData[i - 1].renterWealth);

    return {
      downPayment,
      tapuCost,
      totalBuyingCost,
      totalMortgagePaid,
      maintenanceTotal,
      futureHomeValue,
      buyerEquity,
      totalBuyerCost,
      buyerNetPosition,
      totalRentPaid,
      investmentGrowth,
      renterNetPosition,
      breakeven,
      monthlyMortgage,
      totalMonthlyBuying,
      yearlyData,
      crossoverYear: crossoverYear === -1 ? null : yearlyData[crossoverYear]?.year ?? null,
    };
  }, [homePrice, downPaymentPct, mortgageRate, loanYears, annualAppreciation, maintenancePct, monthlyRent, annualRentIncrease, investmentReturn, years]);

  const maxAbsWealth = Math.max(
    ...result.yearlyData.map(d => Math.max(Math.abs(d.buyerWealth), Math.abs(d.renterWealth))),
    1
  );

  return (
    <div className="space-y-6">
      {/* Inputs grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Buying side */}
        <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-5">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Home size={15} className="text-[#00C49F]" /> Satın Alma
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Ev Fiyatı (₺)', value: homePrice, set: setHomePrice, min: 500_000 },
              { label: `Peşinat (%${downPaymentPct})`, value: downPaymentPct, set: setDownPaymentPct, min: 10, max: 80, step: 5, suffix: '%' },
              { label: 'Aylık Faiz (%)', value: mortgageRate, set: setMortgageRate, step: 0.01, min: 0.5 },
              { label: 'Kredi Vadesi (Yıl)', value: loanYears, set: setLoanYears, min: 5, max: 30 },
              { label: 'Yıllık Değer Artışı (%)', value: annualAppreciation, set: setAnnualAppreciation, min: 0, max: 50, step: 0.5 },
              { label: 'Yıllık Bakım (%)', value: maintenancePct, set: setMaintenancePct, min: 0, max: 5, step: 0.1 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{f.label}</label>
                <input
                  type="number"
                  value={f.value}
                  step={f.step ?? 1}
                  min={f.min}
                  max={f.max}
                  onChange={e => f.set(Number(e.target.value) as never)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-1 focus:ring-[#00C49F]/20"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Renting side */}
        <div className="bg-white rounded-2xl border border-blue-200 p-5">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Key size={15} className="text-blue-500" /> Kiralama
          </h2>
          <div className="space-y-3">
            {[
              { label: 'Aylık Kira (₺)', value: monthlyRent, set: setMonthlyRent, min: 1000 },
              { label: 'Yıllık Kira Artışı (%)', value: annualRentIncrease, set: setAnnualRentIncrease, min: 0, max: 100, step: 1 },
              { label: 'Yatırım Getirisi (% yıllık)', value: investmentReturn, set: setInvestmentReturn, min: 0, max: 100, step: 1 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-[10px] font-bold text-gray-500 mb-1">{f.label}</label>
                <input
                  type="number"
                  value={f.value}
                  step={f.step ?? 1}
                  min={f.min}
                  max={f.max}
                  onChange={e => f.set(Number(e.target.value) as never)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300/30"
                />
              </div>
            ))}
            <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
              <p className="font-bold mb-1">Fırsat Maliyeti</p>
              <p className="text-[10px]">Peşinat ({fmt(result.downPayment)}) bu yatırım oranıyla değerlendirilecek.</p>
            </div>
          </div>
        </div>

        {/* Horizon */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={15} className="text-amber-500" /> Projeksiyon
          </h2>
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-gray-500 mb-1">Analiz Süresi (Yıl)</label>
            <input
              type="number"
              value={years}
              min={1}
              max={30}
              onChange={e => setYears(Math.max(1, Math.min(30, Number(e.target.value))))}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-amber-400"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[5, 10, 15, 20].map(y => (
                <button
                  key={y}
                  onClick={() => setYears(y)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${years === y ? 'bg-amber-500 text-white' : 'bg-gray-50 text-gray-600'}`}
                >
                  {y} yıl
                </button>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className={`rounded-xl p-4 border ${result.breakeven ? 'bg-[#F0FDF8] border-[#00C49F]/30' : 'bg-blue-50 border-blue-200'}`}>
            <p className="text-[10px] font-bold text-gray-500 mb-1">{years} YILLIK VERDİKT</p>
            <p className={`text-base font-black ${result.breakeven ? 'text-[#00C49F]' : 'text-blue-600'}`}>
              {result.breakeven ? '🏠 Satın Alma Kazanıyor' : '🔑 Kiralama Kazanıyor'}
            </p>
            {result.crossoverYear && (
              <p className="text-[10px] text-gray-500 mt-1">
                Satın alma {result.crossoverYear}. yıldan itibaren avantajlı
              </p>
            )}
          </div>

          {/* Key numbers */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Aylık mortgage</span>
              <span className="font-bold text-[#00C49F]">{fmt(result.monthlyMortgage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Aylık kira (bugün)</span>
              <span className="font-bold text-blue-500">{fmt(monthlyRent)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Kira/Mortgage farkı</span>
              <span className={`font-bold ${result.monthlyMortgage > monthlyRent ? 'text-rose-500' : 'text-green-500'}`}>
                {fmt(Math.abs(result.monthlyMortgage - monthlyRent))} {result.monthlyMortgage > monthlyRent ? '(fazla)' : '(az)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wealth chart by year */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="text-sm font-black text-gray-900 mb-5">Net Servet Gelişimi ({years} Yıl)</h3>
        <div className="space-y-2">
          {result.yearlyData.map(d => {
            const buyerPct = (d.buyerWealth / maxAbsWealth) * 50;
            const renterPct = (d.renterWealth / maxAbsWealth) * 50;
            return (
              <div key={d.year} className="flex items-center gap-2 text-[10px]">
                <span className="w-8 text-gray-400 text-right shrink-0">{d.year}Y</span>
                <div className="flex-1 flex items-center gap-1">
                  <div className="flex-1 flex justify-end">
                    {d.buyerWealth >= 0 && (
                      <div className="h-4 rounded-l bg-[#00C49F]/80" style={{ width: `${Math.min(Math.abs(buyerPct), 50)}%` }} />
                    )}
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex-1 flex justify-start">
                    {d.renterWealth >= 0 && (
                      <div className="h-4 rounded-r bg-blue-400/80" style={{ width: `${Math.min(Math.abs(renterPct), 50)}%` }} />
                    )}
                  </div>
                </div>
                <div className="w-20 text-right shrink-0">
                  <span className={d.buyerWealth > d.renterWealth ? 'text-[#00C49F] font-bold' : 'text-gray-400'}>
                    🏠{fmt(d.buyerWealth)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-4 text-[10px]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#00C49F] inline-block" /> Satın Alma</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-400 inline-block" /> Kiralama + Yatırım</span>
        </div>
      </div>

      {/* Summary table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5">
          <h3 className="text-sm font-black text-[#00C49F] mb-4">🏠 Satın Alma Özeti ({years} Yıl)</h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Peşinat + Tapu', value: fmt(result.totalBuyingCost) },
              { label: 'Toplam Mortgage', value: fmt(result.totalMortgagePaid) },
              { label: 'Bakım Maliyeti', value: fmt(result.maintenanceTotal) },
              { label: 'Toplam Harcama', value: fmt(result.totalBuyerCost), bold: true },
              { label: `Ev Değeri (${years} yıl sonra)`, value: fmt(result.futureHomeValue) },
              { label: 'Net Pozisyon', value: fmt(result.buyerNetPosition), bold: true, color: result.buyerNetPosition >= 0 ? 'text-[#00C49F]' : 'text-rose-500' },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.bold ? 'font-black border-t border-[#00C49F]/20 pt-2' : ''}`}>
                <span className="text-gray-600">{r.label}</span>
                <span className={r.color ?? (r.bold ? 'text-gray-900' : 'text-gray-700')}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h3 className="text-sm font-black text-blue-700 mb-4">🔑 Kiralama Özeti ({years} Yıl)</h3>
          <div className="space-y-2 text-xs">
            {[
              { label: 'Toplam Kira Ödemeleri', value: fmt(result.totalRentPaid) },
              { label: 'Yatırıma Koyulan', value: fmt(result.totalBuyingCost) },
              { label: `Yatırım Büyümesi (${investmentReturn}%)`, value: fmt(result.investmentGrowth) },
              { label: 'Net Pozisyon', value: fmt(result.renterNetPosition), bold: true, color: result.renterNetPosition >= 0 ? 'text-blue-600' : 'text-rose-500' },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.bold ? 'font-black border-t border-blue-200 pt-2' : ''}`}>
                <span className="text-gray-600">{r.label}</span>
                <span className={r.color ?? (r.bold ? 'text-gray-900' : 'text-gray-700')}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Bu hesaplama bazılaştırılmış varsayımlara dayanır (sabit faiz, sabit değer artışı, sabit kira artışı).
          Gerçek sonuçlar ekonomik koşullara, bölgeye ve kişisel duruma göre önemli ölçüde farklılık gösterebilir.
        </p>
      </div>
    </div>
  );
}
