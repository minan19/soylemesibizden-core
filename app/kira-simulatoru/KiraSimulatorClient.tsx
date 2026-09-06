'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function KiraSimulatorClient() {
  const [baslangicKira, setBaslangicKira] = useState(15000);
  const [yillikArtis, setYillikArtis] = useState(25);
  const [yil, setYil] = useState(10);
  const [birikimGetirisi, setBirikimGetirisi] = useState(30);
  const [pesinat, setPesinat] = useState(1000000);

  const sonuc = useMemo(() => {
    let toplamKira = 0;
    let birikim = pesinat;
    const kiralar: number[] = [];
    const birikimler: number[] = [];

    for (let y = 1; y <= yil; y++) {
      const yillikKira = baslangicKira * Math.pow(1 + yillikArtis / 100, y - 1) * 12;
      toplamKira += yillikKira;
      kiralar.push(Math.round(yillikKira));

      // Birikim: her yıl peşinat getirisi + kira ödemek yerine biriktirilen değer
      birikim = birikim * (1 + birikimGetirisi / 100);
      birikimler.push(Math.round(birikim));
    }

    const sonKira = baslangicKira * Math.pow(1 + yillikArtis / 100, yil - 1);
    const ortalamaAylikKira = toplamKira / (yil * 12);
    const birikimFarki = birikim - pesinat;

    return {
      toplamKira: Math.round(toplamKira),
      sonKira: Math.round(sonKira),
      ortalamaAylikKira: Math.round(ortalamaAylikKira),
      sonBirikim: Math.round(birikim),
      birikimFarki: Math.round(birikimFarki),
      kiralar,
      birikimler,
      yilSayisi: yil,
    };
  }, [baslangicKira, yillikArtis, yil, birikimGetirisi, pesinat]);

  const gosterilecekYillar = sonuc.kiralar
    .map((k, i) => ({ yil: i + 1, kira: k, birikim: sonuc.birikimler[i] }))
    .filter((_item, i) => i === 0 || i === Math.floor(yil / 2) - 1 || i === yil - 1 || yil <= 5);

  const maxKira = Math.max(...sonuc.kiralar);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kira Simülatörü
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Kira Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Uzun vadeli kira maliyetinizi ve kira ödeme yerine yatırım yapılsaydı birikiminizi karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Simülasyon Parametreleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Başlangıç Aylık Kira</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{baslangicKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={2000} max={80000} step={1000} value={baslangicKira}
                onChange={e => setBaslangicKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>2K</span><span>80K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Kira Artışı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikArtis}</p>
              <input type="range" min={5} max={60} step={5} value={yillikArtis}
                onChange={e => setYillikArtis(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Simülasyon Süresi (Yıl)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{yil} yıl</p>
              <input type="range" min={1} max={25} step={1} value={yil}
                onChange={e => setYil(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1</span><span>25</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yatırım Getirisi (Yıllık)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{birikimGetirisi}</p>
              <input type="range" min={5} max={60} step={5} value={birikimGetirisi}
                onChange={e => setBirikimGetirisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Başlangıç Yatırım Tutarı (Peşinat Eşdeğeri)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{pesinat.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={100000} max={10000000} step={100000} value={pesinat}
                onChange={e => setPesinat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>100K</span><span>10M</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
            <p className="text-xl font-black text-rose-600">{(sonuc.toplamKira / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">{yil} Yıl Toplam Kira</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.sonKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">{yil}. Yıl Aylık Kira</p>
          </div>
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">{(sonuc.sonBirikim / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Yatırım Değeri ({yil} yıl)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-amber-600">{(sonuc.birikimFarki / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Yatırım Artışı</p>
          </div>
        </section>

        {/* Yıllık Kira Grafiği */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Kira Artışı</h2>
          <div className="space-y-2">
            {sonuc.kiralar.map((k, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-[10px] font-bold text-gray-500 w-10 shrink-0">{i + 1}. Yıl</p>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: `${(k / maxKira) * 100}%` }} />
                </div>
                <p className="text-[10px] font-black text-gray-700 w-24 text-right shrink-0">{(k / 12).toLocaleString('tr-TR')} ₺/ay</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projeksiyon Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kira vs. Yatırım Projeksiyon</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                  <th className="text-right py-2 font-black text-gray-500">Yıllık Kira</th>
                  <th className="text-right py-2 font-black text-gray-500">Yatırım Değeri</th>
                </tr>
              </thead>
              <tbody>
                {gosterilecekYillar.map(row => (
                  <tr key={row.yil} className={`border-b border-gray-50 ${row.yil === yil ? 'bg-[#F0FDF8]' : ''}`}>
                    <td className="py-2 font-black text-gray-900">{row.yil}. Yıl</td>
                    <td className="py-2 text-right text-rose-600 font-bold">{row.kira.toLocaleString('tr-TR')} ₺</td>
                    <td className="py-2 text-right text-[#00C49F] font-black">{(row.birikim / 1000000).toFixed(2)} M ₺</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/portfoy', label: 'Portföy Takip' },
              { href: '/butce-planlayici', label: 'Bütçe Planlayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
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
