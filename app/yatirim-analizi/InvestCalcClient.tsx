'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, Home, Key, Calculator } from 'lucide-react';

function fmt(n: number, decimals = 0) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}

function pct(n: number, d = 1) {
  return `${n.toFixed(d)}%`;
}

type Tab = 'roi' | 'buyvsrent';

export default function InvestCalcClient() {
  const [tab, setTab] = useState<Tab>('roi');

  // ROI inputs
  const [purchasePrice, setPurchasePrice] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [annualExpenses, setAnnualExpenses] = useState('');
  const [appreciationRate, setAppreciationRate] = useState('5');
  const [holdYears, setHoldYears] = useState('5');
  const [purchaseCosts, setPurchaseCosts] = useState('4'); // % of price

  // Buy vs Rent inputs
  const [bvr_price, setBvrPrice] = useState('');
  const [bvr_rent, setBvrRent] = useState('');
  const [bvr_down, setBvrDown] = useState('20');
  const [bvr_rate, setBvrRate] = useState('');
  const [bvr_years, setBvrYears] = useState('10');
  const [bvr_appre, setBvrAppre] = useState('5');
  const [bvr_rentIncrease, setBvrRentIncrease] = useState('10');

  const roiResult = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const expenses = parseFloat(annualExpenses) || 0;
    const appre = parseFloat(appreciationRate) || 0;
    const years = parseInt(holdYears) || 5;
    const costsPct = parseFloat(purchaseCosts) || 4;

    if (price <= 0 || rent <= 0) return null;

    const annualRent = rent * 12;
    const annualExpensesCalc = expenses > 0 ? expenses : price * 0.015; // default 1.5% of price
    const noi = annualRent - annualExpensesCalc;
    const grossYield = (annualRent / price) * 100;
    const netYield = (noi / price) * 100;
    const totalCosts = price * (1 + costsPct / 100);

    const futureValue = price * Math.pow(1 + appre / 100, years);
    const capitalGain = futureValue - price;
    const totalRentIncome = annualRent * years;
    const totalExpenses = annualExpensesCalc * years;
    const totalNetReturn = capitalGain + totalRentIncome - totalExpenses - (price * costsPct / 100);
    const totalROI = (totalNetReturn / price) * 100;
    const annualROI = totalROI / years;
    const paybackYears = noi > 0 ? price / noi : 0;

    return {
      grossYield, netYield, noi, annualRent, totalCosts, futureValue, capitalGain,
      totalRentIncome, totalExpenses, totalNetReturn, totalROI, annualROI, paybackYears,
    };
  }, [purchasePrice, monthlyRent, annualExpenses, appreciationRate, holdYears, purchaseCosts]);

  const bvrResult = useMemo(() => {
    const price = parseFloat(bvr_price) || 0;
    const currentRent = parseFloat(bvr_rent) || 0;
    const downPct = parseFloat(bvr_down) || 20;
    const rate = parseFloat(bvr_rate) || 0;
    const years = parseInt(bvr_years) || 10;
    const appre = parseFloat(bvr_appre) || 5;
    const rentIncrease = parseFloat(bvr_rentIncrease) || 10;

    if (price <= 0 || currentRent <= 0) return null;

    const downPayment = price * downPct / 100;
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const n = years * 12;
    const monthly = (monthlyRate > 0 && n > 0)
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
      : principal / n;
    const totalMortgage = monthly * n + downPayment;

    // Total rent paid over years (with annual increase)
    let totalRent = 0;
    let monthRent = currentRent;
    for (let y = 0; y < years; y++) {
      totalRent += monthRent * 12;
      monthRent *= (1 + rentIncrease / 100);
    }

    const futurePropertyValue = price * Math.pow(1 + appre / 100, years);
    const equity = futurePropertyValue - (principal - (monthly * n - (n > 0 ? (principal * (1 - Math.pow(1 + monthlyRate, -n))) : 0)));
    const buyingAdvantage = (futurePropertyValue - price) - (totalMortgage - price);
    const rentingAdvantage = totalRent - totalMortgage;
    const breakEvenYears = rate > 0 ? Math.log(futurePropertyValue / price) / Math.log(1 + appre / 100) : years;
    const verdict = totalMortgage < totalRent ? 'buy' : 'rent';

    return {
      downPayment, principal, monthly, totalMortgage, totalRent,
      futurePropertyValue, equity, buyingAdvantage, rentingAdvantage, breakEvenYears, verdict,
    };
  }, [bvr_price, bvr_rent, bvr_down, bvr_rate, bvr_years, bvr_appre, bvr_rentIncrease]);

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex bg-gray-100 rounded-2xl p-1 gap-1">
        {[
          { id: 'roi', label: 'Yatırım Getiri Analizi', icon: TrendingUp },
          { id: 'buyvsrent', label: 'Al mı Kirala mı?', icon: Home },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              tab === t.id ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <t.icon size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* ROI Calculator */}
      {tab === 'roi' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={17} className="text-[#00C49F]" />
              <h3 className="text-sm font-bold text-gray-900">Yatırım Getiri Analizi</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Alım Fiyatı (₺)', val: purchasePrice, set: setPurchasePrice, ph: '3.500.000' },
                { label: 'Aylık Kira Geliri (₺)', val: monthlyRent, set: setMonthlyRent, ph: '20.000' },
                { label: 'Yıllık Giderler (₺)', val: annualExpenses, set: setAnnualExpenses, ph: 'Boş=otomatik' },
                { label: 'Alım Masrafları (%)', val: purchaseCosts, set: setPurchaseCosts, ph: '4' },
                { label: 'Yıllık Değer Artışı (%)', val: appreciationRate, set: setAppreciationRate, ph: '5' },
                { label: 'Elde Tutma Süresi (yıl)', val: holdYears, set: setHoldYears, ph: '5' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {roiResult && (
            <div className="space-y-4">
              {/* Key metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Brüt Getiri', value: pct(roiResult.grossYield), color: 'text-[#00C49F]' },
                  { label: 'Net Getiri', value: pct(roiResult.netYield), color: 'text-blue-600' },
                  { label: 'Toplam ROI', value: pct(roiResult.totalROI), color: roiResult.totalROI > 0 ? 'text-green-600' : 'text-red-600' },
                  { label: 'Yıllık ROI', value: pct(roiResult.annualROI), color: roiResult.annualROI > 0 ? 'text-green-600' : 'text-red-600' },
                ].map(m => (
                  <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
                    <p className={`text-2xl font-black ${m.color}`}>{m.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Detail table */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Detaylı Analiz — {holdYears} Yıl</h4>
                <div className="space-y-2.5">
                  {[
                    { label: 'Yıllık Kira Geliri', value: fmt(roiResult.annualRent), positive: true },
                    { label: 'Yıllık Giderler (yönetim, sigorta, bakım vb.)', value: fmt(roiResult.totalExpenses / (parseInt(holdYears) || 5)), positive: false },
                    { label: 'Net Faaliyet Geliri (NOI)', value: fmt(roiResult.noi), positive: true },
                    { label: '─', value: '─', positive: true },
                    { label: 'Tahmini Gelecek Değer', value: fmt(roiResult.futureValue), positive: true },
                    { label: 'Sermaye Kazancı', value: fmt(roiResult.capitalGain), positive: roiResult.capitalGain > 0 },
                    { label: `${holdYears} Yıllık Toplam Kira`, value: fmt(roiResult.totalRentIncome), positive: true },
                    { label: `${holdYears} Yıllık Toplam Gider`, value: fmt(roiResult.totalExpenses), positive: false },
                    { label: 'Amortisman Süresi', value: `${roiResult.paybackYears > 0 ? roiResult.paybackYears.toFixed(1) : '—'} yıl`, positive: true },
                  ].map(r => r.label === '─' ? (
                    <hr key="sep" className="border-dashed border-gray-200" />
                  ) : (
                    <div key={r.label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{r.label}</span>
                      <span className={`font-bold ${r.positive ? 'text-gray-900' : 'text-red-500'}`}>{r.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <span className="text-sm font-black text-gray-900">Net Toplam Getiri</span>
                  <span className={`text-sm font-black ${roiResult.totalNetReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fmt(roiResult.totalNetReturn)}
                  </span>
                </div>
              </div>
            </div>
          )}
          {!roiResult && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <TrendingUp size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Alım fiyatı ve aylık kira geliri girin</p>
            </div>
          )}
        </div>
      )}

      {/* Buy vs Rent */}
      {tab === 'buyvsrent' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Calculator size={17} className="text-[#00C49F]" />
              <h3 className="text-sm font-bold text-gray-900">Al mı, Kirala mı? Karşılaştırması</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Mülk Alım Fiyatı (₺)', val: bvr_price, set: setBvrPrice, ph: '3.500.000' },
                { label: 'Mevcut Aylık Kira (₺)', val: bvr_rent, set: setBvrRent, ph: '25.000' },
                { label: 'Peşinat Oranı (%)', val: bvr_down, set: setBvrDown, ph: '20' },
                { label: 'Yıllık Faiz Oranı (%)', val: bvr_rate, set: setBvrRate, ph: '32' },
                { label: 'Süre (yıl)', val: bvr_years, set: setBvrYears, ph: '10' },
                { label: 'Yıllık Değer Artışı (%)', val: bvr_appre, set: setBvrAppre, ph: '5' },
                { label: 'Yıllık Kira Artışı (%)', val: bvr_rentIncrease, set: setBvrRentIncrease, ph: '10' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {bvrResult && (
            <div className="space-y-4">
              {/* Verdict */}
              <div className={`rounded-2xl p-6 border ${bvrResult.verdict === 'buy'
                ? 'bg-green-50 border-green-200'
                : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {bvrResult.verdict === 'buy' ? <Home size={22} className="text-green-600" /> : <Key size={22} className="text-blue-600" />}
                  <p className={`text-lg font-black ${bvrResult.verdict === 'buy' ? 'text-green-800' : 'text-blue-800'}`}>
                    {bvrResult.verdict === 'buy'
                      ? `${bvr_years} yılda ALMAK daha avantajlı`
                      : `${bvr_years} yılda KİRALAMAK daha avantajlı`}
                  </p>
                </div>
                <p className={`text-sm ${bvrResult.verdict === 'buy' ? 'text-green-700' : 'text-blue-700'}`}>
                  {bvrResult.verdict === 'buy'
                    ? `Satın alma, toplam kira ödemelerine göre ${fmt(Math.abs(bvrResult.rentingAdvantage))} daha avantajlı.`
                    : `Kiralama, ${bvr_years} yıllık koşullarda ipoteğe göre ${fmt(Math.abs(bvrResult.rentingAdvantage))} daha az yük.`}
                </p>
              </div>

              {/* Comparison cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Home size={15} className="text-green-600" />
                    <p className="text-xs font-bold text-gray-900">SATIN ALMA</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Peşinat</span><span className="font-bold">{fmt(bvrResult.downPayment)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Aylık taksit</span><span className="font-bold">{fmt(bvrResult.monthly)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Toplam ödeme</span><span className="font-bold">{fmt(bvrResult.totalMortgage)}</span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-50"><span className="text-gray-500">Tahmini gelecek değer</span><span className="font-bold text-green-600">{fmt(bvrResult.futurePropertyValue)}</span></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Key size={15} className="text-blue-600" />
                    <p className="text-xs font-bold text-gray-900">KİRALAMA</p>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-500">Mevcut aylık kira</span><span className="font-bold">{fmt(parseFloat(bvr_rent) || 0)}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Yıllık kira artışı</span><span className="font-bold">%{bvr_rentIncrease}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Toplam kira ({bvr_years} yıl)</span><span className="font-bold">{fmt(bvrResult.totalRent)}</span></div>
                    <div className="flex justify-between pt-2 border-t border-gray-50"><span className="text-gray-500">Birikim fırsatı</span><span className="font-bold text-blue-600">Esneklik</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!bvrResult && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <Home size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Mülk fiyatı ve mevcut kira tutarını girin</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
