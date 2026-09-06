'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const fmt = (n: number) =>
  n.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

function calcNPV(cashflows: number[], discountRate: number): number {
  return cashflows.reduce((npv, cf, t) => npv + cf / Math.pow(1 + discountRate, t + 1), 0);
}

function calcIRR(initialInvestment: number, cashflows: number[]): number {
  let lo = -0.99;
  let hi = 5.0;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const npv = calcNPV(cashflows, mid) - initialInvestment;
    if (Math.abs(npv) < 1) return mid;
    if (npv > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export default function YatirimNpvClient() {
  const [purchasePrice, setPurchasePrice] = useState(3000000);
  const [monthlyRent, setMonthlyRent] = useState(15000);
  const [annualRentGrowth, setAnnualRentGrowth] = useState(25);
  const [annualAppreciation, setAnnualAppreciation] = useState(20);
  const [vacancyPct, setVacancyPct] = useState(5);
  const [annualExpensePct, setAnnualExpensePct] = useState(15);
  const [discountRate, setDiscountRate] = useState(30);
  const [holdYears, setHoldYears] = useState(5);
  const [exitCapRate, setExitCapRate] = useState(4.5);

  const result = useMemo(() => {
    const initialEquity = purchasePrice * 1.045; // purchase + ~4.5% closing costs
    const cashflows: number[] = [];
    let propertyValue = purchasePrice;
    let rent = monthlyRent * 12;

    for (let year = 1; year <= holdYears; year++) {
      if (year > 1) {
        rent *= 1 + annualRentGrowth / 100;
        propertyValue *= 1 + annualAppreciation / 100;
      }
      const effectiveRent = rent * (1 - vacancyPct / 100);
      const expenses = effectiveRent * (annualExpensePct / 100);
      const noi = effectiveRent - expenses;

      if (year === holdYears) {
        // Terminal year: NOI + exit value
        const exitValue = noi / (exitCapRate / 100);
        const sellingCosts = exitValue * 0.025; // ~2.5% selling costs
        cashflows.push(noi + exitValue - sellingCosts);
      } else {
        cashflows.push(noi);
      }
    }

    const npv = calcNPV(cashflows, discountRate / 100) - initialEquity;
    const irr = calcIRR(initialEquity, cashflows);

    const totalCashflow = cashflows.reduce((s, c) => s + c, 0);
    const exitValue = cashflows[holdYears - 1];
    const yearlyNOI = cashflows[0];
    const grossYield = (monthlyRent * 12) / purchasePrice * 100;

    return { npv, irr: irr * 100, totalCashflow, exitValue, yearlyNOI, grossYield, cashflows };
  }, [purchasePrice, monthlyRent, annualRentGrowth, annualAppreciation, vacancyPct, annualExpensePct, discountRate, holdYears, exitCapRate]);

  const npvPositive = result.npv >= 0;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Yatırım Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">NBD / NPV Yatırım Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Net bugünkü değer (NBD) ve iç verim oranı (IRR) ile gayrimenkul yatırımınızın gerçek karlılığını ölçün.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Yatırım Parametreleri</h2>

              {[
                { label: 'Satın Alma Fiyatı', value: purchasePrice, set: setPurchasePrice, min: 500000, max: 20000000, step: 100000, display: `₺${fmt(purchasePrice)}` },
                { label: 'Aylık Kira Geliri', value: monthlyRent, set: setMonthlyRent, min: 2000, max: 200000, step: 500, display: `₺${fmt(monthlyRent)}/ay` },
              ].map(({ label, value, set, min, max, step, display }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {label} <span className="font-normal text-gray-400">{display}</span>
                  </label>
                  <input type="range" min={min} max={max} step={step} value={value}
                    onChange={e => set(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                </div>
              ))}

              {[
                { label: 'Yıllık Kira Artışı', value: annualRentGrowth, set: setAnnualRentGrowth, min: 0, max: 80, step: 1, suffix: '%' },
                { label: 'Yıllık Değer Artışı', value: annualAppreciation, set: setAnnualAppreciation, min: 0, max: 80, step: 1, suffix: '%' },
                { label: 'Boşluk Oranı', value: vacancyPct, set: setVacancyPct, min: 0, max: 30, step: 1, suffix: '%' },
                { label: 'Yıllık Gider Oranı (kira üzerinden)', value: annualExpensePct, set: setAnnualExpensePct, min: 5, max: 40, step: 1, suffix: '%' },
                { label: 'İskonto Oranı (fırsat maliyeti)', value: discountRate, set: setDiscountRate, min: 5, max: 60, step: 1, suffix: '%' },
                { label: 'Elde Tutma Süresi', value: holdYears, set: setHoldYears, min: 2, max: 15, step: 1, suffix: ' yıl' },
                { label: 'Çıkış Cap Rate', value: exitCapRate, set: setExitCapRate, min: 2, max: 10, step: 0.1, suffix: '%' },
              ].map(({ label, value, set, min, max, step, suffix }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {label} <span className="font-normal text-gray-400">{value}{suffix}</span>
                  </label>
                  <input type="range" min={min} max={max} step={step} value={value}
                    onChange={e => set(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {/* NBD Card */}
            <div className={`rounded-2xl p-6 text-white ${npvPositive ? 'bg-gradient-to-br from-[#00C49F] to-[#00a882]' : 'bg-gradient-to-br from-rose-600 to-rose-700'}`}>
              <p className="text-xs text-white/70 mb-1">Net Bugünkü Değer (NBD)</p>
              <p className="text-4xl font-black mb-2">{result.npv >= 0 ? '+' : ''}₺{fmt(Math.round(result.npv))}</p>
              <p className="text-xs text-white/70">
                {npvPositive
                  ? 'Pozitif NBD: Yatırım, iskonto oranınızı aşan getiri sağlıyor.'
                  : 'Negatif NBD: Beklenen getiri, fırsat maliyetinizin altında.'}
              </p>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">İç Verim Oranı (IRR)</p>
                <p className={`text-xl font-black ${result.irr > discountRate ? 'text-[#00C49F]' : 'text-rose-500'}`}>%{result.irr.toFixed(1)}</p>
                <p className="text-[10px] text-gray-400">Hurdle: %{discountRate}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Brüt Kira Getirisi</p>
                <p className="text-xl font-black text-blue-600">%{result.grossYield.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">1. Yıl NOI</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.yearlyNOI))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Toplam {holdYears} Yıl Nakit Akışı</p>
                <p className="text-xl font-black text-amber-600">₺{fmt(Math.round(result.totalCashflow))}</p>
              </div>
            </div>

            {/* Yıllık Nakit Akışı Grafiği */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Yıllık Nakit Akışı</h3>
              <div className="flex items-end gap-2 h-28">
                {result.cashflows.map((cf, i) => {
                  const maxCf = Math.max(...result.cashflows);
                  const heightPct = (cf / maxCf) * 90;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[8px] text-gray-500">₺{fmt(Math.round(cf / 1000))}K</span>
                      <div
                        className={`w-full rounded-t-md ${i === result.cashflows.length - 1 ? 'bg-amber-400' : 'bg-[#00C49F]'}`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[9px] text-gray-400">Y{i + 1}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Son yıl çıkış değeri dahildir (sarı bar).</p>
            </div>

            {/* Decision box */}
            <div className={`flex items-start gap-3 rounded-xl p-4 ${npvPositive ? 'bg-[#F0FDF8] border border-[#00C49F]/20' : 'bg-rose-50 border border-rose-200'}`}>
              {npvPositive ? <CheckCircle size={14} className="text-[#00C49F] shrink-0 mt-0.5" /> : <AlertTriangle size={14} className="text-rose-500 shrink-0 mt-0.5" />}
              <p className="text-xs text-gray-700 leading-relaxed">
                {npvPositive
                  ? `IRR %${result.irr.toFixed(1)} ile iskonto oranınız %${discountRate}'ın üzerinde. Bu yatırım pozitif değer yaratıyor.`
                  : `IRR %${result.irr.toFixed(1)}, iskonto oranınız %${discountRate}'ın altında. Alternatif yatırımlar daha iyi getiri sağlayabilir.`}
              </p>
            </div>

            <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
              <Info size={12} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-blue-700 leading-relaxed">İskonto oranı, fonunuzun başka bir yatırımda (örn. hazine tahvili) elde edebileceği getiridir. TÜFE + reel getiri beklentiniz iyi bir başlangıç noktasıdır.</p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Getirisi</p>
                  <p className="text-[10px] text-gray-400">Cap rate, geri ödeme</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/yatirim-analizi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Yatırım ROI</p>
                  <p className="text-[10px] text-gray-400">Al/kirala karşılaştır</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
