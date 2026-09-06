'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function KiraKarsiligiBirikimClient() {
  const [aylikKira, setAylikKira] = useState(12000);
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState(25);
  const [alternatifGetiri, setAlternatifGetiri] = useState(35);
  const [sure, setSure] = useState(10);
  const [evFiyati, setEvFiyati] = useState(3000000);
  const [yillikFiyatArtisi, setYillikFiyatArtisi] = useState(20);

  const sonuc = useMemo(() => {
    let toplamKiraOdendi = 0;
    let kira = aylikKira;
    let birikimYatirimsiz = 0;
    let birikimYatirimli = 0;
    let evDegeri = evFiyati;
    const aylikGetiriOrani = alternatifGetiri / 12 / 100;

    const yillar = [];
    for (let y = 1; y <= sure; y++) {
      const yillikKira = kira * 12;
      toplamKiraOdendi += yillikKira;
      birikimYatirimsiz += yillikKira;
      for (let ay = 0; ay < 12; ay++) {
        birikimYatirimli = (birikimYatirimli + kira) * (1 + aylikGetiriOrani);
      }
      evDegeri = evDegeri * (1 + yillikFiyatArtisi / 100);
      kira = kira * (1 + yillikKiraArtisi / 100);

      yillar.push({
        y,
        kira: Math.round(kira / (1 + yillikKiraArtisi / 100)),
        toplamOdendi: Math.round(toplamKiraOdendi),
        birikimYatirimsiz: Math.round(birikimYatirimsiz),
        birikimYatirimli: Math.round(birikimYatirimli),
        evDegeri: Math.round(evDegeri),
      });
    }

    return { yillar, toplamKiraOdendi: Math.round(toplamKiraOdendi) };
  }, [aylikKira, yillikKiraArtisi, alternatifGetiri, sure, evFiyati, yillikFiyatArtisi]);

  const son = sonuc.yillar[sonuc.yillar.length - 1];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Kira vs Birikim
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Kira Karşılığı Birikim Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira ödemek yerine o parayı yatırsaydınız ne olurdu? Ev değer artışı ile karşılaştırın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={3000} max={100000} step={1000} value={aylikKira}
                onChange={e => setAylikKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>3K</span><span>100K</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Kira Artışı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikKiraArtisi}</p>
              <input type="range" min={5} max={60} step={5} value={yillikKiraArtisi}
                onChange={e => setYillikKiraArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alternatif Yatırım Getirisi</label>
              <p className="text-lg font-black text-blue-600 mb-2">%{alternatifGetiri}/yıl</p>
              <input type="range" min={10} max={70} step={5} value={alternatifGetiri}
                onChange={e => setAlternatifGetiri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%70</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Süre (Yıl)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{sure} yıl</p>
              <input type="range" min={1} max={20} step={1} value={sure}
                onChange={e => setSure(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1</span><span>20</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ev Fiyatı (Satın Almak İstenen)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{evFiyati.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={evFiyati}
                onChange={e => setEvFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ev Yıllık Değer Artışı</label>
              <p className="text-lg font-black text-gray-700 mb-2">%{yillikFiyatArtisi}</p>
              <input type="range" min={5} max={50} step={5} value={yillikFiyatArtisi}
                onChange={e => setYillikFiyatArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%50</span></div>
            </div>
          </div>
        </section>

        {/* Özet */}
        {son && (
          <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
              <p className="text-xl font-black text-rose-600">{(sonuc.toplamKiraOdendi / 1000000).toFixed(2)}M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Toplam Kira Ödendi</p>
            </div>
            <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
              <p className="text-xl font-black text-[#00C49F]">{(son.birikimYatirimli / 1000000).toFixed(2)}M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Yatırımlı Birikim</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center col-span-2 sm:col-span-1">
              <p className="text-xl font-black text-blue-600">{(son.evDegeri / 1000000).toFixed(2)}M ₺</p>
              <p className="text-xs text-gray-500 mt-1">Ev Değeri ({sure}. yıl)</p>
            </div>
          </section>
        )}

        {/* Karşılaştırma Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Karşılaştırma</h2>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Kira</th>
                <th className="text-right py-2 font-black text-gray-500">Yatırımlı Birikim</th>
                <th className="text-right py-2 font-black text-gray-500">Ev Değeri</th>
              </tr>
            </thead>
            <tbody>
              {sonuc.yillar.filter((_, i) => i < 5 || i === 9 || i === sure - 1).map(row => (
                <tr key={row.y} className="border-b border-gray-50">
                  <td className="py-1.5 font-bold text-gray-800">{row.y}. Yıl</td>
                  <td className="py-1.5 text-right text-rose-500">{(row.toplamOdendi / 1000000).toFixed(2)}M ₺</td>
                  <td className="py-1.5 text-right text-[#00C49F] font-bold">{(row.birikimYatirimli / 1000000).toFixed(2)}M ₺</td>
                  <td className="py-1.5 text-right text-blue-600 font-bold">{(row.evDegeri / 1000000).toFixed(2)}M ₺</td>
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
              { href: '/servet-birikimi-hesaplayici', label: 'Servet Birikimi Hesaplayıcı' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/kira-deger-artisi', label: 'Kira Değer Artışı Simülatörü' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
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
