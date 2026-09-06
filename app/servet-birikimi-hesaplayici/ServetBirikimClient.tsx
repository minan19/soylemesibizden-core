'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function ServetBirikimClient() {
  const [aylikGelir, setAylikGelir] = useState(50000);
  const [tasarrufOrani, setTasarrufOrani] = useState(25);
  const [yillikGetiri, setYillikGetiri] = useState(30);
  const [enflasyon, setEnflasyon] = useState(40);
  const [sure, setSure] = useState(10);

  const sonuc = useMemo(() => {
    const aylikTasarruf = aylikGelir * (tasarrufOrani / 100);
    const aylikGetiriOrani = yillikGetiri / 12 / 100;
    const yillar = [];
    let nominal = 0;
    let reel = 0;

    for (let y = 1; y <= sure; y++) {
      for (let ay = 0; ay < 12; ay++) {
        nominal = (nominal + aylikTasarruf) * (1 + aylikGetiriOrani);
      }
      const reelDeflator = Math.pow(1 + enflasyon / 100, y);
      reel = nominal / reelDeflator;

      yillar.push({
        y,
        nominal: Math.round(nominal),
        reel: Math.round(reel),
        yillikTasarruf: Math.round(aylikTasarruf * 12),
        toplamKatkı: Math.round(aylikTasarruf * 12 * y),
        kazanc: Math.round(nominal - aylikTasarruf * 12 * y),
      });
    }

    return { yillar, aylikTasarruf: Math.round(aylikTasarruf) };
  }, [aylikGelir, tasarrufOrani, yillikGetiri, enflasyon, sure]);

  const son = sonuc.yillar[sonuc.yillar.length - 1];
  const maxNominal = Math.max(...sonuc.yillar.map(y => y.nominal), 1);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Servet Birikimi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Servet Birikimi Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Düzenli tasarruf ve yatırım getirisi ile {sure} yılda ne kadar servet biriktirebilirsiniz? Nominal ve reel değer karşılaştırması.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Net Gelir</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikGelir.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={10000} max={500000} step={5000} value={aylikGelir}
                onChange={e => setAylikGelir(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>10K</span><span>500K</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tasarruf Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{tasarrufOrani} — {sonuc.aylikTasarruf.toLocaleString('tr-TR')} ₺/ay</p>
              <input type="range" min={5} max={70} step={5} value={tasarrufOrani}
                onChange={e => setTasarrufOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%70</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Yatırım Getirisi</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikGetiri}</p>
              <input type="range" min={10} max={80} step={5} value={yillikGetiri}
                onChange={e => setYillikGetiri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%80</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Enflasyon</label>
              <p className="text-lg font-black text-amber-500 mb-2">%{enflasyon}</p>
              <input type="range" min={10} max={80} step={5} value={enflasyon}
                onChange={e => setEnflasyon(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%80</span></div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Süre (Yıl)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{sure} yıl</p>
              <input type="range" min={1} max={30} step={1} value={sure}
                onChange={e => setSure(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1 yıl</span><span>30 yıl</span></div>
            </div>
          </div>
        </section>

        {/* Özet */}
        {son && (
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="sm:col-span-2 bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5 text-center">
              <p className="text-3xl font-black text-[#00C49F]">{(son.nominal / 1000000).toFixed(2)} M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Nominal Servet ({sure}. Yıl)</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <p className="text-xl font-black text-amber-500">{(son.reel / 1000000).toFixed(2)} M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Reel Servet</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
              <p className="text-xl font-black text-blue-600">{(son.kazanc / 1000000).toFixed(2)} M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Yatırım Kazancı</p>
            </div>
          </section>
        )}

        {/* Büyüme Grafiği */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Büyüme Grafiği</h2>
          <div className="space-y-2">
            {sonuc.yillar.map(row => (
              <div key={row.y} className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-gray-500 w-10">{row.y}. yıl</span>
                <div className="flex-1 bg-gray-50 rounded-full h-4 overflow-hidden">
                  <div className="h-full bg-[#00C49F] rounded-full transition-all"
                    style={{ width: `${(row.nominal / maxNominal) * 100}%` }} />
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-20 text-right">{(row.nominal / 1000000).toFixed(2)}M ₺</span>
              </div>
            ))}
          </div>
        </section>

        {/* Detay Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Projeksiyon Tablosu</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Katkı</th>
                <th className="text-right py-2 font-black text-gray-500">Yatırım Kazancı</th>
                <th className="text-right py-2 font-black text-gray-500">Nominal Servet</th>
                <th className="text-right py-2 font-black text-gray-500">Reel Servet</th>
              </tr>
            </thead>
            <tbody>
              {sonuc.yillar.filter((_, i) => i < 5 || i === 9 || i === 14 || i === 19 || i === sure - 1).map(row => (
                <tr key={row.y} className="border-b border-gray-50">
                  <td className="py-1.5 font-bold text-gray-800">{row.y}. Yıl</td>
                  <td className="py-1.5 text-right text-blue-600">{(row.toplamKatkı / 1000000).toFixed(2)}M ₺</td>
                  <td className="py-1.5 text-right text-[#00C49F] font-bold">{(row.kazanc / 1000000).toFixed(2)}M ₺</td>
                  <td className="py-1.5 text-right font-black text-gray-900">{(row.nominal / 1000000).toFixed(2)}M ₺</td>
                  <td className="py-1.5 text-right text-amber-500">{(row.reel / 1000000).toFixed(2)}M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/kira-deger-artisi', label: 'Kira Değer Artışı Simülatörü' },
              { href: '/enflasyon-korumasi', label: 'Enflasyona Karşı Korunma' },
              { href: '/portfoy', label: 'Portföy Takip' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
