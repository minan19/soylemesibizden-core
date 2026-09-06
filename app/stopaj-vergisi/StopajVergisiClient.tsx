'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });

const STOPAJ_RATES: Record<string, { rate: number; label: string; note: string }> = {
  housing: { rate: 0.20, label: 'Konut Kirası (Kurumsal Kiracı)', note: 'GVK md. 94/5-a: Tam mükellef kurumlar konut kirası için %20 stopaj keser.' },
  workplace: { rate: 0.20, label: 'İşyeri Kirası (Kurumsal Kiracı)', note: 'GVK md. 94/5-b: İşyeri kirası için %20 stopaj kesintisi uygulanır.' },
  individual: { rate: 0, label: 'Gerçek Kişi Kiracı', note: 'Gerçek kişi kiracılar stopaj kesmez; ev sahibi yıllık gelir vergisi beyanname verir.' },
};

const INCOME_BRACKETS_2024 = [
  { limit: 110000, rate: 15 },
  { limit: 230000, rate: 20 },
  { limit: 870000, rate: 27 },
  { limit: 3000000, rate: 35 },
  { limit: Infinity, rate: 40 },
];

function calcGelirVergisi(yillikKira: number): number {
  const istisna = 33000; // 2024 mesken istisna tutarı (yaklaşık)
  const matrah = Math.max(0, yillikKira - istisna);
  let vergi = 0;
  let remaining = matrah;
  let prev = 0;
  for (const bracket of INCOME_BRACKETS_2024) {
    const taxable = Math.min(remaining, bracket.limit - prev);
    if (taxable <= 0) break;
    vergi += taxable * (bracket.rate / 100);
    remaining -= taxable;
    prev = bracket.limit;
    if (remaining <= 0) break;
  }
  return vergi;
}

export default function StopajVergisiClient() {
  const [tenantType, setTenantType] = useState<keyof typeof STOPAJ_RATES>('workplace');
  const [rentType, setRentType] = useState<'gross' | 'net'>('gross');
  const [monthlyRent, setMonthlyRent] = useState(25000);

  const result = useMemo(() => {
    const { rate } = STOPAJ_RATES[tenantType];
    const annualRent = monthlyRent * 12;

    let grossAnnual: number;
    let netAnnual: number;
    let stopajAnnual: number;

    if (tenantType === 'individual') {
      grossAnnual = annualRent;
      netAnnual = annualRent;
      stopajAnnual = 0;
    } else if (rentType === 'gross') {
      grossAnnual = annualRent;
      stopajAnnual = annualRent * rate;
      netAnnual = annualRent - stopajAnnual;
    } else {
      netAnnual = annualRent;
      grossAnnual = annualRent / (1 - rate);
      stopajAnnual = grossAnnual * rate;
    }

    const gelirVergisi = calcGelirVergisi(grossAnnual);
    const stopajAsGelirVergisiCredit = stopajAnnual;
    const additionalTax = Math.max(0, gelirVergisi - stopajAsGelirVergisiCredit);
    const refund = Math.max(0, stopajAsGelirVergisiCredit - gelirVergisi);
    const effectiveRate = grossAnnual > 0 ? gelirVergisi / grossAnnual * 100 : 0;

    return {
      grossMonthly: grossAnnual / 12,
      netMonthly: netAnnual / 12,
      stopajMonthly: stopajAnnual / 12,
      grossAnnual,
      netAnnual,
      stopajAnnual,
      gelirVergisi,
      additionalTax,
      refund,
      effectiveRate,
    };
  }, [tenantType, rentType, monthlyRent]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <FileText size={13} /> Hesaplama Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Stopaj Vergisi Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kurumsal kiracıların kira ödemelerinde kestiği %20 stopaj ve yıllık gelir vergisi beyanı hesaplaması. Net/brüt kira dönüşümü.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Kiracı ve Kira Bilgileri</h2>

              {/* Tenant type */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Kiracı Türü</label>
                <div className="space-y-2">
                  {(Object.entries(STOPAJ_RATES) as [keyof typeof STOPAJ_RATES, (typeof STOPAJ_RATES)[keyof typeof STOPAJ_RATES]][]).map(([key, val]) => (
                    <button key={key} onClick={() => setTenantType(key)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${tenantType === key ? 'bg-[#F0FDF8] border border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border border-transparent hover:border-gray-200 text-gray-700'}`}
                    >
                      <span className="font-bold">{val.label}</span>
                      <span className="block text-[10px] mt-0.5 opacity-70">Stopaj: %{(val.rate * 100).toFixed(0)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rent type */}
              {tenantType !== 'individual' && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">Kira Türü</label>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      { value: 'gross', label: 'Brüt Kira' },
                      { value: 'net', label: 'Net Kira' },
                    ].map(r => (
                      <button key={r.value} onClick={() => setRentType(r.value as 'gross' | 'net')}
                        className={`text-xs py-2 rounded-lg font-bold transition-all ${rentType === r.value ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly rent */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Aylık Kira ({rentType === 'gross' || tenantType === 'individual' ? 'Brüt' : 'Net'})
                  <span className="font-normal text-gray-400 ml-2">₺{fmt(monthlyRent)}</span>
                </label>
                <input type="range" min={5000} max={500000} step={1000} value={monthlyRent}
                  onChange={e => setMonthlyRent(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₺5K</span><span>₺500K</span></div>
              </div>

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">{STOPAJ_RATES[tenantType].note}</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {/* Main */}
            <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
              <p className="text-xs text-white/70 mb-1">Aylık Net Kira (Elinize Geçen)</p>
              <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.netMonthly))}</p>
              <p className="text-xs text-white/70">
                Brüt: ₺{fmt(Math.round(result.grossMonthly))} — Stopaj: ₺{fmt(Math.round(result.stopajMonthly))}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Brüt Kira</p>
                <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.grossAnnual))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Yıllık Stopaj Kesintisi</p>
                <p className="text-xl font-black text-rose-500">₺{fmt(Math.round(result.stopajAnnual))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Hesaplanan Gelir Vergisi</p>
                <p className="text-xl font-black text-amber-600">₺{fmt(Math.round(result.gelirVergisi))}</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Efektif Vergi Oranı</p>
                <p className="text-xl font-black text-blue-600">%{result.effectiveRate.toFixed(1)}</p>
              </div>
            </div>

            {/* Tax reconciliation */}
            {tenantType !== 'individual' && (
              <div className={`flex items-start gap-3 rounded-xl p-4 ${result.refund > 0 ? 'bg-[#F0FDF8] border border-[#00C49F]/20' : result.additionalTax > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}>
                {result.refund > 0
                  ? <CheckCircle size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
                  : <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />}
                <p className="text-xs leading-relaxed text-gray-700">
                  {result.refund > 0
                    ? `Yıllık gelir vergisi beyanında ₺${fmt(Math.round(result.refund))} iade (mahsup) hakkı doğabilir.`
                    : result.additionalTax > 0
                    ? `Yıllık beyannamede stopaj mahsup sonrası ek ₺${fmt(Math.round(result.additionalTax))} gelir vergisi ödemeniz gerekebilir.`
                    : 'Stopaj kesintisi, hesaplanan gelir vergisiyle tam olarak örtüşmektedir.'}
                </p>
              </div>
            )}

            {/* Bracket table */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">2024 Gelir Vergisi Dilimleri</h3>
              <table className="w-full text-[10px]">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="text-left pb-1 text-gray-500">Dilim Üst Sınırı</th>
                    <th className="text-right pb-1 text-gray-500">Oran</th>
                  </tr>
                </thead>
                <tbody>
                  {INCOME_BRACKETS_2024.map((b, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="py-1 text-gray-700">{b.limit === Infinity ? 'Üzeri' : `₺${fmt(b.limit)} altı`}</td>
                      <td className="py-1 text-right font-bold text-[#00C49F]">%{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-gray-400 mt-2">Mesken istisnası 2024: ~₺33.000. Kesin tutar için GİB açıklamalarını kontrol edin.</p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/kira-geliri-vergisi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <FileText size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Geliri Vergisi</p>
                  <p className="text-[10px] text-gray-400">Götürü/gerçek gider seçimi</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/kira-getiri-hesaplayici" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <FileText size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Kira Getiri Hesapla</p>
                  <p className="text-[10px] text-gray-400">Brüt/net getiri analizi</p>
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
