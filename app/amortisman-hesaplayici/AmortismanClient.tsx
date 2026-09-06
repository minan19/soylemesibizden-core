'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';

export default function AmortismanClient() {
  const [alisFiyati, setAlisFiyati] = useState(3000000);
  const [ekMasraflar, setEkMasraflar] = useState(180000);
  const [aylikKira, setAylikKira] = useState(18000);
  const [yillikGider, setYillikGider] = useState(40000);
  const [yillikFiyatArtisi, setYillikFiyatArtisi] = useState(20);
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState(25);

  const sonuc = useMemo(() => {
    const baslangicMaliyet = alisFiyati + ekMasraflar;
    let kumulatifNetKira = 0;
    let mlkDegeri = alisFiyati;
    let kira = aylikKira;
    let amortismanYili = 0;

    const yillar = [];
    for (let y = 1; y <= 40; y++) {
      const yillikNetKira = kira * 12 - yillikGider;
      kumulatifNetKira += yillikNetKira;
      mlkDegeri = mlkDegeri * (1 + yillikFiyatArtisi / 100);
      kira = kira * (1 + yillikKiraArtisi / 100);

      yillar.push({
        yil: y,
        yillikNetKira: Math.round(yillikNetKira),
        kumulatifKira: Math.round(kumulatifNetKira),
        mlkDegeri: Math.round(mlkDegeri),
        toplamVarlik: Math.round(kumulatifNetKira + mlkDegeri),
      });

      if (amortismanYili === 0 && kumulatifNetKira >= baslangicMaliyet) {
        amortismanYili = y;
      }
    }

    const brutGetiri = (aylikKira * 12 / alisFiyati) * 100;
    const netGetiri = ((aylikKira * 12 - yillikGider) / alisFiyati) * 100;
    const on_yil = yillar[9];
    const yirmi_yil = yillar[19];

    return {
      baslangicMaliyet,
      amortismanYili: amortismanYili || 40,
      brutGetiri: brutGetiri.toFixed(2),
      netGetiri: netGetiri.toFixed(2),
      on_yil,
      yirmi_yil,
      yillar: yillar.filter((_, i) => i < 5 || i === 9 || i === 14 || i === 19),
    };
  }, [alisFiyati, ekMasraflar, aylikKira, yillikGider, yillikFiyatArtisi, yillikKiraArtisi]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Amortisman Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Gayrimenkul Amortisman Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yatırımınızın kaç yılda kendini amorti edeceğini, 10-20 yıl varlık büyümesini ve net kira getirisini hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Yatırım Parametreleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alış Fiyatı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alisFiyati.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={alisFiyati}
                onChange={e => setAlisFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ek Masraflar (tapu, tadilat)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{ekMasraflar.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={1000000} step={10000} value={ekMasraflar}
                onChange={e => setEkMasraflar(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>1M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={2000} max={100000} step={1000} value={aylikKira}
                onChange={e => setAylikKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>2K</span><span>100K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Gider (aidat, vergi, vb.)</label>
              <p className="text-lg font-black text-gray-700 mb-2">{yillikGider.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={200000} step={5000} value={yillikGider}
                onChange={e => setYillikGider(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>200K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Fiyat Artışı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikFiyatArtisi}</p>
              <input type="range" min={5} max={50} step={5} value={yillikFiyatArtisi}
                onChange={e => setYillikFiyatArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%50</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Kira Artışı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikKiraArtisi}</p>
              <input type="range" min={5} max={60} step={5} value={yillikKiraArtisi}
                onChange={e => setYillikKiraArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`rounded-2xl border p-4 text-center ${sonuc.amortismanYili <= 15 ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-white border-gray-100'}`}>
            <p className={`text-2xl font-black ${sonuc.amortismanYili <= 15 ? 'text-[#00C49F]' : 'text-amber-600'}`}>{sonuc.amortismanYili} yıl</p>
            <p className="text-xs text-gray-500 mt-1">Amortisman Süresi</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-2xl font-black text-gray-900">%{sonuc.netGetiri}</p>
            <p className="text-xs text-gray-500 mt-1">Net Getiri</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-blue-600">{(sonuc.on_yil?.toplamVarlik / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">10 Yıl Varlık</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-purple-600">{(sonuc.yirmi_yil?.toplamVarlik / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">20 Yıl Varlık</p>
          </div>
        </section>

        {/* Projeksiyon Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Projeksiyon</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                <th className="text-right py-2 font-black text-gray-500">Yıllık Net Kira</th>
                <th className="text-right py-2 font-black text-gray-500">Kümülatif Kira</th>
                <th className="text-right py-2 font-black text-gray-500">Mülk Değeri</th>
                <th className="text-right py-2 font-black text-gray-500">Toplam Varlık</th>
              </tr>
            </thead>
            <tbody>
              {sonuc.yillar.map(row => (
                <tr key={row.yil} className={`border-b border-gray-50 ${row.yil === sonuc.amortismanYili ? 'bg-[#F0FDF8] font-black' : ''}`}>
                  <td className="py-2 font-bold text-gray-800">{row.yil}. Yıl</td>
                  <td className="py-2 text-right text-[#00C49F] font-bold">{row.yillikNetKira.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right text-gray-700">{(row.kumulatifKira / 1000000).toFixed(2)} M ₺</td>
                  <td className="py-2 text-right text-blue-600 font-bold">{(row.mlkDegeri / 1000000).toFixed(2)} M ₺</td>
                  <td className="py-2 text-right font-black text-gray-900">{(row.toplamVarlik / 1000000).toFixed(2)} M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sonuc.amortismanYili <= 40 && (
            <p className="text-[10px] text-[#00C49F] font-black mt-2">★ {sonuc.amortismanYili}. yılda yatırım kendini amorti etmektedir.</p>
          )}
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/konut-analizi', label: 'Konut Yatırım Analizi' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
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
