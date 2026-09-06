'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });

const BRACKETS_2024 = [
  { limit: 110000, rate: 15 },
  { limit: 230000, rate: 20 },
  { limit: 870000, rate: 27 },
  { limit: 3000000, rate: 35 },
  { limit: Infinity, rate: 40 },
];

const TUFE_RATES: Record<number, number> = {
  1: 0.65, 2: 0.72, 3: 0.85, 4: 0.90,
};

function calcTax(matrah: number): number {
  let tax = 0;
  let remaining = matrah;
  let prev = 0;
  for (const b of BRACKETS_2024) {
    const taxable = Math.min(remaining, b.limit - prev);
    if (taxable <= 0) break;
    tax += taxable * (b.rate / 100);
    remaining -= taxable;
    prev = b.limit;
    if (remaining <= 0) break;
  }
  return tax;
}

export default function DegerArtisClient() {
  const [satisFiyati, setSatisFiyati] = useState(3000000);
  const [alisFiyati, setAlisFiyati] = useState(1500000);
  const [yil, setYil] = useState(3);
  const [tufeAdjust, setTufeAdjust] = useState(true);

  const result = useMemo(() => {
    if (yil >= 5) {
      return { exempt: true, tax: 0, matrah: 0, netGain: 0, rawGain: 0, adjustedAlis: alisFiyati, effectiveRate: 0 };
    }
    const tufeRate = TUFE_RATES[yil] ?? 0;
    const adjustedAlis = tufeAdjust ? alisFiyati * (1 + tufeRate) : alisFiyati;
    const rawGain = satisFiyati - adjustedAlis;
    const istisna = 87000; // 2024 istisna tutarı (yaklaşık)
    const matrah = Math.max(0, rawGain - istisna);
    const tax = matrah > 0 ? calcTax(matrah) : 0;
    const netGain = rawGain - tax;
    const effectiveRate = rawGain > 0 ? (tax / rawGain) * 100 : 0;
    return { exempt: false, tax, matrah, netGain, rawGain, adjustedAlis, effectiveRate };
  }, [satisFiyati, alisFiyati, yil, tufeAdjust]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <TrendingUp size={13} /> Hesaplama Aracı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Değer Artış Kazancı Vergisi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gayrimenkulü 5 yıl içinde satarken ödeyeceğiniz vergi. TÜFE endekslemesi, 2024 istisna tutarı ve kademeli tarife.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Inputs */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Satış Bilgileri</h2>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Satış Fiyatı <span className="font-normal text-gray-400">₺{fmt(satisFiyati)}</span>
                </label>
                <input type="range" min={500000} max={20000000} step={50000} value={satisFiyati}
                  onChange={e => setSatisFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₺500K</span><span>₺20M</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Alış Fiyatı <span className="font-normal text-gray-400">₺{fmt(alisFiyati)}</span>
                </label>
                <input type="range" min={100000} max={15000000} step={50000} value={alisFiyati}
                  onChange={e => setAlisFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₺100K</span><span>₺15M</span></div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Elde Tutma Süresi</label>
                <div className="grid grid-cols-5 gap-1">
                  {[1, 2, 3, 4, 5].map(y => (
                    <button key={y} onClick={() => setYil(y)}
                      className={`text-xs py-2 rounded-lg font-bold transition-all ${yil === y ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {y === 5 ? '5+' : `${y}y`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setTufeAdjust(v => !v)}
                  className={`w-10 h-5 rounded-full transition-colors ${tufeAdjust ? 'bg-[#00C49F]' : 'bg-gray-300'} relative`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${tufeAdjust ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                <label className="text-xs text-gray-700 font-medium">TÜFE Endeksleme Uygula</label>
              </div>

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3">
                <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-700 leading-relaxed">5 yıl veya üzeri elde tutma → vergi muafiyeti. 2024 istisna: ~₺87.000. TÜFE endekslemesi maliyet matrahını artırır.</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-4">

            {result.exempt ? (
              <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white flex items-center gap-4">
                <CheckCircle size={40} className="shrink-0" />
                <div>
                  <p className="text-xs text-white/70 mb-1">Elde Tutma Süresi 5+ Yıl</p>
                  <p className="text-2xl font-black">Vergi Muafiyeti</p>
                  <p className="text-xs text-white/70 mt-1">GVK md. 80: 5 yılı geçen gayrimenkul satışları vergiden muaftır.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-6 text-white">
                  <p className="text-xs text-white/70 mb-1">Ödenecek Değer Artış Vergisi</p>
                  <p className="text-4xl font-black mb-2">₺{fmt(Math.round(result.tax))}</p>
                  <p className="text-xs text-white/70">Efektif vergi oranı: %{result.effectiveRate.toFixed(1)}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Ham Kazanç</p>
                    <p className="text-xl font-black text-gray-900">₺{fmt(Math.round(result.rawGain))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Vergiye Tabi Matrah</p>
                    <p className="text-xl font-black text-amber-600">₺{fmt(Math.round(result.matrah))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Endekslenmiş Alış</p>
                    <p className="text-xl font-black text-blue-600">₺{fmt(Math.round(result.adjustedAlis))}</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                    <p className="text-[10px] text-gray-400 mb-1">Net Kazanç (Vergiden Sonra)</p>
                    <p className="text-xl font-black text-[#00C49F]">₺{fmt(Math.round(result.netGain))}</p>
                  </div>
                </div>
              </>
            )}

            {/* Brackets */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <h3 className="text-xs font-black text-gray-900 mb-3">2024 Gelir Vergisi Dilimleri (Değer Artış Kazancı)</h3>
              <table className="w-full text-[10px]">
                <thead className="border-b border-gray-100">
                  <tr>
                    <th className="text-left pb-1 text-gray-500">Matrah Üst Sınırı</th>
                    <th className="text-right pb-1 text-gray-500">Oran</th>
                  </tr>
                </thead>
                <tbody>
                  {BRACKETS_2024.map((b, i) => (
                    <tr key={i} className={i % 2 === 0 ? '' : 'bg-gray-50'}>
                      <td className="py-1 text-gray-700">{b.limit === Infinity ? 'Üzeri' : `₺${fmt(b.limit)} altı`}</td>
                      <td className="py-1 text-right font-bold text-[#00C49F]">%{b.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[10px] text-gray-400 mt-2">Miras ve bağış yoluyla edinilen taşınmazlar bu vergiye tabi değildir.</p>
            </div>

            {/* Saving tips */}
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-xl p-4">
              <p className="text-xs font-black text-gray-900 mb-2 flex items-center gap-2">
                <CheckCircle size={12} className="text-[#00C49F]" /> Vergi Tasarrufu İpuçları
              </p>
              <ul className="space-y-1.5">
                {[
                  '5. yıla kadar bekleyerek tam muafiyetten yararlanın.',
                  'TÜFE endekslemesini mutlaka uygulayın — matrahı önemli ölçüde azaltır.',
                  'İyileştirme/renovasyon belgelerini saklayın; maliyet olarak düşülebilir.',
                  'Noterde ödenen tapu harcı ve komisyon da maliyet olarak matrahtan düşülür.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#00C49F] text-[10px] font-bold shrink-0">•</span>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/tapu-masrafi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-[#00C49F] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Tapu Masrafları</p>
                  <p className="text-[10px] text-gray-400">Harç ve toplam maliyet</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 group-hover:text-gray-600 shrink-0" />
              </Link>
              <Link href="/emlak-vergisi" className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all flex items-center gap-3">
                <TrendingUp size={16} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-900">Emlak Vergisi</p>
                  <p className="text-[10px] text-gray-400">Yıllık vergi hesabı</p>
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
