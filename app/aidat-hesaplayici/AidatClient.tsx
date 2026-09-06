'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, Info, CheckCircle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');

type ExpenseItem = {
  id: string;
  label: string;
  defaultAmount: number;
  enabled: boolean;
};

const DEFAULT_EXPENSES: ExpenseItem[] = [
  { id: 'kapici', label: 'Kapıcı/Güvenlik Maaşı', defaultAmount: 25000, enabled: true },
  { id: 'temizlik', label: 'Ortak Alan Temizliği', defaultAmount: 8000, enabled: true },
  { id: 'elektrik', label: 'Ortak Alan Elektriği', defaultAmount: 5000, enabled: true },
  { id: 'asansor', label: 'Asansör Bakım Sözleşmesi', defaultAmount: 6000, enabled: true },
  { id: 'su', label: 'Ortak Su/Bahçe Sulaması', defaultAmount: 2000, enabled: false },
  { id: 'sigorta', label: 'Bina Sigortası (Aylık)', defaultAmount: 3000, enabled: true },
  { id: 'havuz', label: 'Havuz/Spor Salonu Bakımı', defaultAmount: 10000, enabled: false },
  { id: 'bahce', label: 'Bahçe/Çevre Düzenlemesi', defaultAmount: 4000, enabled: false },
  { id: 'bakim', label: 'Genel Bakım/Onarım Fonu', defaultAmount: 5000, enabled: true },
  { id: 'yonetim', label: 'Yönetici/Muhasebe Ücreti', defaultAmount: 3000, enabled: false },
  { id: 'kamera', label: 'Güvenlik Kamera Sistemi', defaultAmount: 1500, enabled: false },
  { id: 'jenerator', label: 'Jeneratör Bakımı', defaultAmount: 2000, enabled: false },
];

export default function AidatClient() {
  const [totalUnits, setTotalUnits] = useState(20);
  const [myArea, setMyArea] = useState(120);
  const [avgArea, setAvgArea] = useState(100);
  const [expenses, setExpenses] = useState<ExpenseItem[]>(DEFAULT_EXPENSES);
  const [shareMethod, setShareMethod] = useState<'equal' | 'area'>('area');
  const [reserve, setReserve] = useState(10);

  const toggleExpense = (id: string) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, enabled: !e.enabled } : e));
  };

  const updateAmount = (id: string, amount: number) => {
    setExpenses(prev => prev.map(e => e.id === id ? { ...e, defaultAmount: amount } : e));
  };

  const result = useMemo(() => {
    const totalMonthly = expenses.filter(e => e.enabled).reduce((s, e) => s + e.defaultAmount, 0);
    const withReserve = totalMonthly * (1 + reserve / 100);

    let myShare: number;
    if (shareMethod === 'equal') {
      myShare = withReserve / totalUnits;
    } else {
      const myAreaRatio = myArea / (avgArea * totalUnits);
      myShare = withReserve * myAreaRatio;
    }

    const avgShare = withReserve / totalUnits;
    const annualTotal = totalMonthly * 12;
    const myAnnual = myShare * 12;

    return { totalMonthly, withReserve, myShare, avgShare, annualTotal, myAnnual };
  }, [expenses, totalUnits, myArea, avgArea, shareMethod, reserve]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Calculator size={13} /> Aidat Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Apartman Aidat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Bina ortak giderlerini girin, dairenizin aylık aidat payını hesaplayın. Eşit pay veya m² bazlı hesaplama seçenekleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Inputs */}
          <div className="lg:col-span-3 space-y-5">

            {/* Building info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-black text-gray-900">Bina Bilgileri</h2>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Toplam Daire</label>
                  <input
                    type="number" min={2} max={500} value={totalUnits}
                    onChange={e => setTotalUnits(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dairem (m²)</label>
                  <input
                    type="number" min={30} max={1000} value={myArea}
                    onChange={e => setMyArea(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Ortalama m²</label>
                  <input
                    type="number" min={30} max={1000} value={avgArea}
                    onChange={e => setAvgArea(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-800 focus:outline-none focus:border-[#00C49F]"
                  />
                </div>
              </div>

              {/* Share method */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Dağıtım Yöntemi</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'equal', label: 'Eşit Pay', sub: 'Her daire eşit öder' },
                    { value: 'area', label: 'M² Bazlı', sub: 'Büyük daire daha fazla öder' },
                  ].map(m => (
                    <button
                      key={m.value}
                      onClick={() => setShareMethod(m.value as 'equal' | 'area')}
                      className={`p-3 rounded-xl text-left transition-all ${shareMethod === m.value ? 'bg-[#00C49F] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                    >
                      <p className="text-xs font-black">{m.label}</p>
                      <p className={`text-[10px] mt-0.5 ${shareMethod === m.value ? 'text-white/70' : 'text-gray-400'}`}>{m.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reserve */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Yedek Akçe Oranı
                  <span className="ml-2 font-normal text-gray-400">%{reserve}</span>
                </label>
                <input type="range" min={0} max={30} step={5} value={reserve}
                  onChange={e => setReserve(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <p className="text-[10px] text-gray-400 mt-1">Acil onarımlar için rezerv fon oranı</p>
              </div>
            </div>

            {/* Expenses */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h2 className="text-sm font-black text-gray-900 mb-4">Aylık Ortak Giderler</h2>
              <div className="space-y-3">
                {expenses.map(e => (
                  <div key={e.id} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${e.enabled ? 'bg-[#F0FDF8]' : 'bg-gray-50 opacity-60'}`}>
                    <button
                      onClick={() => toggleExpense(e.id)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${e.enabled ? 'bg-[#00C49F] border-[#00C49F]' : 'bg-white border-gray-300'}`}
                    >
                      {e.enabled && <CheckCircle size={12} className="text-white" />}
                    </button>
                    <span className="text-xs text-gray-700 flex-1 font-medium">{e.label}</span>
                    <input
                      type="number"
                      value={e.defaultAmount}
                      onChange={ev => updateAmount(e.id, Number(ev.target.value))}
                      disabled={!e.enabled}
                      className="w-28 text-right border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#00C49F] disabled:opacity-50 disabled:bg-gray-50"
                    />
                    <span className="text-[10px] text-gray-400 shrink-0 w-4">₺</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="lg:col-span-2 space-y-4">

            {/* My share */}
            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Aylık Aidat Payım</p>
              <p className="text-4xl font-black mb-1">₺{fmt(Math.round(result.myShare))}</p>
              <p className="text-xs text-white/60">Yıllık: ₺{fmt(Math.round(result.myAnnual))}</p>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-3">
              <h3 className="text-xs font-black text-gray-900">Hesaplama Özeti</h3>
              {[
                { label: 'Toplam aylık gider', value: `₺${fmt(Math.round(result.totalMonthly))}` },
                { label: `Yedek akçe (%${reserve})`, value: `₺${fmt(Math.round(result.totalMonthly * reserve / 100))}` },
                { label: 'Yedek dahil toplam', value: `₺${fmt(Math.round(result.withReserve))}`, bold: true },
                { label: 'Ortalama daire payı', value: `₺${fmt(Math.round(result.avgShare))}` },
                { label: 'Benim daire payım', value: `₺${fmt(Math.round(result.myShare))}`, bold: true },
              ].map(r => (
                <div key={r.label} className={`flex justify-between ${r.bold ? 'border-t border-gray-100 pt-2' : ''}`}>
                  <span className="text-xs text-gray-500">{r.label}</span>
                  <span className={`text-xs font-bold ${r.bold ? 'text-[#00C49F]' : 'text-gray-700'}`}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Active expenses breakdown */}
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">Seçili Giderler</h3>
              <div className="space-y-1.5">
                {expenses.filter(e => e.enabled).map(e => (
                  <div key={e.id} className="flex justify-between">
                    <span className="text-[10px] text-gray-500 truncate pr-2">{e.label}</span>
                    <span className="text-[10px] font-bold text-gray-700 shrink-0">₺{fmt(e.defaultAmount)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <Info size={13} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 leading-relaxed">
                  Türk hukukunda aidat, Kat Mülkiyeti Kanunu&apos;na göre belirlenir. Apartman yönetimi
                  yıllık bütçeyi kat maliklerine sunar ve onaylatır. Aidat ödememek icra takibine yol açabilir.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <Link href="/emlak-vergisi" className="group flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all">
              <Calculator size={16} className="text-[#00C49F] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-gray-900">Emlak Vergisi Hesapla</p>
                <p className="text-[10px] text-gray-400">Yıllık bina vergisi</p>
              </div>
              <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
