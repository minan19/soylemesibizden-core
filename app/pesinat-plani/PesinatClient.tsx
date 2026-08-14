'use client';

import { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Target, Info } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

const QUICK_PRICES = [1_500_000, 2_000_000, 3_000_000, 5_000_000, 8_000_000];

export default function PesinatClient() {
  const [homePrice, setHomePrice] = useState(3_000_000);
  const [downPct, setDownPct] = useState(20);
  const [currentSavings, setCurrentSavings] = useState(100_000);
  const [monthlySaving, setMonthlySaving] = useState(15_000);
  const [savingsReturn, setSavingsReturn] = useState(40); // annual % on savings (TL mevduat)
  const [homePriceIncrease, setHomePriceIncrease] = useState(25); // annual home price increase

  const result = useMemo(() => {
    const targetDown = homePrice * (downPct / 100);
    const targetWithCosts = targetDown + homePrice * 0.04; // +tapu harci ~4%

    if (currentSavings >= targetWithCosts) {
      return {
        targetDown,
        targetWithCosts,
        monthsNeeded: 0,
        yearsNeeded: 0,
        feasible: true,
        ready: true,
        monthlySavingNeeded: 0,
        futureHomePrice: homePrice,
        finalSavings: currentSavings,
        inflation_effect: 0,
        yearlyPath: [],
      };
    }

    // Simulate month by month until savings >= target (with growing home price)
    let savings = currentSavings;
    let futureHome = homePrice;
    let months = 0;
    const maxMonths = 360;

    while (months < maxMonths) {
      // Add monthly saving
      savings += monthlySaving;
      // Apply monthly savings return
      savings *= 1 + savingsReturn / 100 / 12;
      // Increment home price monthly
      futureHome *= 1 + homePriceIncrease / 100 / 12;
      months++;

      const requiredDown = futureHome * (downPct / 100) + futureHome * 0.04;
      if (savings >= requiredDown) break;
    }

    const feasible = months < maxMonths;
    const yearsNeeded = months / 12;

    // How much monthly saving needed to reach goal in X years
    // Using FV = PV*(1+r)^n + PMT*((1+r)^n - 1)/r
    const targetAt5Yrs = homePrice * Math.pow(1 + homePriceIncrease / 100, 5) * (downPct / 100) + homePrice * Math.pow(1 + homePriceIncrease / 100, 5) * 0.04;
    const r5 = savingsReturn / 100 / 12;
    const n5 = 60;
    const pvGrowth5 = currentSavings * Math.pow(1 + r5, n5);
    const monthlySavingNeeded5 = r5 === 0
      ? (targetAt5Yrs - pvGrowth5) / n5
      : ((targetAt5Yrs - pvGrowth5) * r5) / (Math.pow(1 + r5, n5) - 1);

    // Year-by-year path
    const yearlyPath: { year: number; savings: number; target: number; gap: number }[] = [];
    let savSim = currentSavings;
    let homeSim = homePrice;
    for (let y = 1; y <= Math.min(Math.ceil(yearsNeeded) + 2, 15); y++) {
      for (let m = 0; m < 12; m++) {
        savSim += monthlySaving;
        savSim *= 1 + savingsReturn / 100 / 12;
        homeSim *= 1 + homePriceIncrease / 100 / 12;
      }
      const req = homeSim * (downPct / 100) + homeSim * 0.04;
      yearlyPath.push({ year: y, savings: savSim, target: req, gap: Math.max(req - savSim, 0) });
    }

    return {
      targetDown,
      targetWithCosts: targetDown + homePrice * 0.04,
      monthsNeeded: months,
      yearsNeeded,
      feasible,
      ready: false,
      monthlySavingNeeded: Math.max(monthlySavingNeeded5, 0),
      futureHomePrice: futureHome,
      finalSavings: savings,
      inflation_effect: futureHome - homePrice,
      yearlyPath,
    };
  }, [homePrice, downPct, currentSavings, monthlySaving, savingsReturn, homePriceIncrease]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
          <Target size={15} className="text-[#00C49F]" /> Hedef Bilgileri
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Home price */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Hedef Ev Fiyatı (₺)</label>
            <input
              type="number"
              value={homePrice}
              onChange={e => setHomePrice(Math.max(100_000, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 mb-1.5"
            />
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PRICES.map(p => (
                <button key={p} onClick={() => setHomePrice(p)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${homePrice === p ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                  {(p / 1_000_000).toFixed(p % 1_000_000 === 0 ? 0 : 1)}M
                </button>
              ))}
            </div>
          </div>

          {/* Down payment % */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Peşinat Oranı (%{downPct})</label>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={downPct}
              onChange={e => setDownPct(Number(e.target.value))}
              className="w-full mb-1"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>%10 (min)</span>
              <span className="font-bold text-[#00C49F]">{fmt(homePrice * downPct / 100)}</span>
              <span>%50</span>
            </div>
          </div>

          {/* Current savings */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mevcut Birikim (₺)</label>
            <input
              type="number"
              value={currentSavings}
              onChange={e => setCurrentSavings(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
          </div>

          {/* Monthly saving */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Birikim (₺)</label>
            <input
              type="number"
              value={monthlySaving}
              onChange={e => setMonthlySaving(Math.max(1000, Number(e.target.value)))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
          </div>

          {/* Savings return */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Mevduat/Yatırım Getirisi (% yıllık)</label>
            <input
              type="number"
              value={savingsReturn}
              step={1}
              min={0}
              max={100}
              onChange={e => setSavingsReturn(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
            <p className="text-[10px] text-gray-400 mt-1">TL mevduat faizi, altın, vs.</p>
          </div>

          {/* Home price increase */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Ev Fiyat Artışı (%)</label>
            <input
              type="number"
              value={homePriceIncrease}
              step={1}
              min={0}
              max={100}
              onChange={e => setHomePriceIncrease(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className={`rounded-2xl p-6 text-white ${result.ready ? 'bg-gradient-to-br from-[#00C49F] to-[#009e80]' : result.feasible ? 'bg-gradient-to-br from-blue-700 to-blue-900' : 'bg-gradient-to-br from-rose-700 to-rose-900'}`}>
        <h2 className="text-sm font-black mb-5 opacity-80">Projeksiyon Sonucu</h2>
        {result.ready ? (
          <div>
            <p className="text-3xl font-black mb-2">Hedefe Ulaştınız!</p>
            <p className="text-sm opacity-80">Mevcut birikiminiz peşinat için yeterli.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-xs opacity-70 mb-1">Tahmini Hedef Süresi</p>
                <p className="text-3xl font-black">{result.yearsNeeded < 1 ? `${result.monthsNeeded} ay` : `${result.yearsNeeded.toFixed(1)} yıl`}</p>
                <p className="text-[10px] opacity-60 mt-0.5">{result.feasible ? `${Math.ceil(result.yearsNeeded * 12)} ay` : '30 yılda ulaşılamıyor'}</p>
              </div>
              <div>
                <p className="text-xs opacity-70 mb-1">5 Yılda Hedefe İçin Gereken Aylık Birikim</p>
                <p className="text-3xl font-black">{fmt(result.monthlySavingNeeded)}</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/20 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="opacity-70">Bugünkü peşinat hedefi</span>
                <span className="font-bold">{fmt(result.targetWithCosts)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Hedef tarihe ev fiyatı</span>
                <span className="font-bold">{fmt(result.futureHomePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Fiyat artışı etkisi</span>
                <span className="font-bold text-yellow-300">+{fmt(result.inflation_effect)}</span>
              </div>
              <div className="flex justify-between border-t border-white/20 pt-2">
                <span className="opacity-70">Ulaşılan birikim</span>
                <span className="font-black">{fmt(result.finalSavings)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Year-by-year bar chart */}
      {result.yearlyPath.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <TrendingUp size={14} className="text-[#00C49F]" /> Yıllık Birikim & Hedef
          </h3>
          <div className="space-y-3">
            {result.yearlyPath.map(row => {
              const maxVal = Math.max(...result.yearlyPath.map(r => r.target), 1);
              const savPct = Math.min((row.savings / maxVal) * 100, 100);
              const tgtPct = Math.min((row.target / maxVal) * 100, 100);
              const reached = row.savings >= row.target;
              return (
                <div key={row.year}>
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>{row.year}. Yıl</span>
                    <span>{reached ? '✓ Hedefe Ulaşıldı' : `Açık: ${fmt(row.gap)}`}</span>
                  </div>
                  <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="absolute inset-0 rounded-full bg-amber-200" style={{ width: `${tgtPct}%` }} />
                    <div className={`absolute inset-0 rounded-full ${reached ? 'bg-[#00C49F]' : 'bg-blue-400'}`} style={{ width: `${savPct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-[10px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-400 inline-block" /> Birikim</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-200 inline-block" /> Peşinat Hedefi</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#00C49F] inline-block" /> Hedef Aşıldı</span>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5">
        <h3 className="text-xs font-black text-[#00C49F] mb-3 flex items-center gap-2">
          <PiggyBank size={13} /> Birikim Hızlandırma İpuçları
        </h3>
        <ul className="space-y-2 text-xs text-gray-700">
          {[
            'Birikimlerinizi yüksek faizli mevduat veya devlet tahviliyle değerlendirin',
            'Kira öderken kira miktarının %30-40\'ını ek birikim olarak ayırmayı hedefleyin',
            'Konut kredisi devlet destekli kampanyalarını (TOKİ, Emlak Konut) takip edin',
            'Peşinat oranını artırmak aylık taksiti düşürür; uzun vadede faizi azaltır',
            'Birden fazla kişiyle ortak alım (ön alım hakkı) ilk adımı kolaylaştırır',
          ].map(tip => (
            <li key={tip} className="flex items-start gap-2">
              <span className="text-[#00C49F] shrink-0 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
        <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Hesaplama sabit oranlı kümüleşik büyüme modeliyle yapılmaktadır. Gerçek ev fiyat artışı ve mevduat getirileri değişkendir.
          Projeksiyon bilgilendirme amaçlıdır; yatırım tavsiyesi değildir.
        </p>
      </div>
    </div>
  );
}
