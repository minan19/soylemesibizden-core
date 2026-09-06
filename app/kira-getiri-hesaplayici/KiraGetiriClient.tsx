'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');
const pct = (n: number) => n.toFixed(2) + '%';

export default function KiraGetiriClient() {
  const [purchasePrice, setPurchasePrice] = useState(3000000);
  const [monthlyRent, setMonthlyRent] = useState(15000);
  const [vacancyPct, setVacancyPct] = useState(5); // % vacancy rate
  const [annualExpenses, setAnnualExpenses] = useState(12000); // aidat, sigorta, bakım
  const [taxRate, setTaxRate] = useState(15); // effective kira geliri vergisi %
  const [appreciationPct, setAppreciationPct] = useState(20); // annual home price increase %
  const [closingCostPct, setClosingCostPct] = useState(4); // tapu etc

  const result = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const effectiveRent = annualRent * (1 - vacancyPct / 100);
    const grossYield = (annualRent / purchasePrice) * 100;

    const taxAmount = effectiveRent * (taxRate / 100);
    const netIncome = effectiveRent - annualExpenses - taxAmount;
    const netYield = (netIncome / purchasePrice) * 100;

    const totalCost = purchasePrice * (1 + closingCostPct / 100);
    const grossYieldOnCost = (annualRent / totalCost) * 100;
    const netYieldOnCost = (netIncome / totalCost) * 100;

    const paybackYearsGross = annualRent > 0 ? purchasePrice / annualRent : Infinity;
    const paybackYearsNet = netIncome > 0 ? purchasePrice / netIncome : Infinity;

    const appreciation5y = purchasePrice * Math.pow(1 + appreciationPct / 100, 5) - purchasePrice;
    const totalReturn5y = netIncome * 5 + appreciation5y;
    const totalReturnPct5y = (totalReturn5y / totalCost) * 100;

    const capRate = (netIncome / purchasePrice) * 100;

    return {
      annualRent,
      effectiveRent,
      grossYield,
      netIncome,
      netYield,
      taxAmount,
      totalCost,
      grossYieldOnCost,
      netYieldOnCost,
      paybackYearsGross,
      paybackYearsNet,
      appreciation5y,
      totalReturn5y,
      totalReturnPct5y,
      capRate,
      scoreLabel: netYield >= 5 ? 'Mükemmel' : netYield >= 3.5 ? 'İyi' : netYield >= 2 ? 'Orta' : 'Düşük',
      scoreColor: netYield >= 5 ? 'text-[#00C49F]' : netYield >= 3.5 ? 'text-blue-600' : netYield >= 2 ? 'text-amber-500' : 'text-rose-600',
    };
  }, [purchasePrice, monthlyRent, vacancyPct, annualExpenses, taxRate, appreciationPct, closingCostPct]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Yatırım Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Getiri Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Brüt ve net kira getirisi, geri ödeme süresi, cap rate ve 5 yıllık toplam getiri.
            Boşluk oranı ve vergi dahil gerçekçi analiz.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Inputs */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Mülk & Kira Bilgileri</h2>

              {[
                { label: 'Satın Alma Fiyatı', value: purchasePrice, min: 500000, max: 20000000, step: 100000, set: setPurchasePrice, prefix: '₺' },
                { label: 'Aylık Kira', value: monthlyRent, min: 1000, max: 200000, step: 1000, set: setMonthlyRent, prefix: '₺' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {f.label}
                    <span className="ml-2 font-normal text-gray-400">{f.prefix}{fmt(f.value)}</span>
                  </label>
                  <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                    onChange={e => f.set(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                </div>
              ))}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Boşluk Oranı
                  <span className="ml-2 font-normal text-gray-400">%{vacancyPct}</span>
                </label>
                <input type="range" min={0} max={20} step={1} value={vacancyPct}
                  onChange={e => setVacancyPct(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <p className="text-[10px] text-gray-400 mt-1">Yılda ne kadar süre boş kalır?</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yıllık Giderler (Aidat + Sigorta + Bakım)
                  <span className="ml-2 font-normal text-gray-400">₺{fmt(annualExpenses)}</span>
                </label>
                <input type="range" min={0} max={100000} step={1000} value={annualExpenses}
                  onChange={e => setAnnualExpenses(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Efektif Kira Vergisi Oranı
                  <span className="ml-2 font-normal text-gray-400">%{taxRate}</span>
                </label>
                <input type="range" min={0} max={40} step={5} value={taxRate}
                  onChange={e => setTaxRate(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <p className="text-[10px] text-gray-400 mt-1">Gelir vergisi + stopaj</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yıllık Değer Artışı
                  <span className="ml-2 font-normal text-gray-400">%{appreciationPct}</span>
                </label>
                <input type="range" min={0} max={50} step={5} value={appreciationPct}
                  onChange={e => setAppreciationPct(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alım Masrafları (Tapu, DASK, vb.)
                  <span className="ml-2 font-normal text-gray-400">%{closingCostPct}</span>
                </label>
                <input type="range" min={2} max={8} step={1} value={closingCostPct}
                  onChange={e => setClosingCostPct(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">

            {/* Score */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Net Kira Getirisi</p>
                  <p className={`text-4xl font-black ${result.scoreColor}`}>{pct(result.netYield)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Getiri Skoru</p>
                  <p className={`text-xl font-black ${result.scoreColor}`}>{result.scoreLabel}</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00C49F] rounded-full"
                  style={{ width: `${Math.min(100, result.netYield / 8 * 100).toFixed(0)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>%0</span><span>%4 iyi</span><span>%8+</span>
              </div>
            </div>

            {/* Key metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Brüt Getiri', value: pct(result.grossYield), sub: 'Satın alma fiyatına göre', color: 'text-gray-900' },
                { label: 'Net Getiri', value: pct(result.netYield), sub: 'Gider + vergi sonrası', color: 'text-[#00C49F]' },
                { label: 'Cap Rate', value: pct(result.capRate), sub: 'Net gelir / Mülk değeri', color: 'text-blue-600' },
                { label: 'Geri Ödeme', value: `${result.paybackYearsNet.toFixed(1)} yıl`, sub: 'Net gelirle', color: 'text-amber-600' },
              ].map(m => (
                <div key={m.label} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <p className="text-[10px] text-gray-400 mb-1">{m.label}</p>
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{m.sub}</p>
                </div>
              ))}
            </div>

            {/* Annual breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 mb-3">Yıllık Gelir Dökümü</h3>
              <div className="space-y-2">
                {[
                  { label: 'Yıllık kira (brüt)', value: result.annualRent, color: 'text-[#00C49F]' },
                  { label: `Boşluk kaybı (%${vacancyPct})`, value: -result.annualRent * vacancyPct / 100, color: 'text-rose-500' },
                  { label: 'Efektif kira geliri', value: result.effectiveRent, color: 'text-gray-700', bold: true },
                  { label: 'Yıllık giderler', value: -annualExpenses, color: 'text-rose-500' },
                  { label: `Kira vergisi (%${taxRate})`, value: -result.taxAmount, color: 'text-rose-500' },
                  { label: 'Net yıllık gelir', value: result.netIncome, color: 'text-[#00C49F]', bold: true },
                ].map(r => (
                  <div key={r.label} className={`flex justify-between ${r.bold ? 'border-t border-gray-100 pt-2' : ''}`}>
                    <span className="text-xs text-gray-500">{r.label}</span>
                    <span className={`text-xs font-bold ${r.color}`}>
                      {r.value >= 0 ? '' : '–'}₺{fmt(Math.abs(Math.round(r.value)))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5yr projection */}
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-5">
              <h3 className="text-xs font-bold text-[#00C49F] mb-3">5 Yıllık Toplam Getiri Projeksiyonu</h3>
              <div className="space-y-2">
                {[
                  { label: '5 yıl net kira geliri', value: result.netIncome * 5 },
                  { label: `Değer artışı (%${appreciationPct}/yıl)`, value: result.appreciation5y },
                  { label: 'Toplam Getiri', value: result.totalReturn5y, bold: true },
                  { label: 'Toplam Getiri Oranı (Alım maliyetine)', value: null, pctVal: result.totalReturnPct5y, bold: true },
                ].map(r => (
                  <div key={r.label} className={`flex justify-between ${r.bold ? 'border-t border-[#00C49F]/20 pt-2' : ''}`}>
                    <span className={`text-xs ${r.bold ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{r.label}</span>
                    <span className={`text-xs font-bold text-[#00C49F]`}>
                      {r.pctVal !== undefined ? pct(r.pctVal) : `₺${fmt(Math.round(r.value!))}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmark */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start gap-2">
                <Info size={13} className="text-gray-400 shrink-0 mt-0.5" />
                <div className="text-xs text-gray-500 space-y-1">
                  <p className="font-bold text-gray-700">Türkiye Kira Getiri Kıyaslaması (2024)</p>
                  <p>• İstanbul ortalama brüt getiri: %3–5</p>
                  <p>• Ankara/İzmir: %4–6</p>
                  <p>• Tatil bölgeleri (Antalya/Bodrum): %5–8 (sezonsal)</p>
                  <p>• %2 altı → değer artışı odaklı yatırım senaryosu</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/yatirim-analizi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">ROI Analizi</p>
                  <p className="text-[10px] text-gray-400">Detaylı yatırım analizi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
              <Link href="/kira-mi-satin-mi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <CheckCircle size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira mı, Satın mı?</p>
                  <p className="text-[10px] text-gray-400">30 yıl projeksiyon</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
