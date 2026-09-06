'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart2 } from 'lucide-react';

const BOLGE_KIRA: Record<string, number> = {
  'İstanbul — Avrupa': 35000,
  'İstanbul — Anadolu': 28000,
  'Ankara': 18000,
  'İzmir': 22000,
  'Antalya': 19000,
  'Bursa': 14000,
  'Diğer': 12000,
};

export default function KonutAnaliziClient() {
  const [alisFiyati, setAlisFiyati] = useState(3000000);
  const [aylıkKira, setAylikKira] = useState(20000);
  const [alan, setAlan] = useState(100);
  const [bolge, setBolge] = useState('İstanbul — Avrupa');
  const [yillikFiyatArtisi, setYillikFiyatArtisi] = useState(20);
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState(25);
  const [toplamMasraf, setToplamMasraf] = useState(150000);

  const sonuc = useMemo(() => {
    const toplamMaliyet = alisFiyati + toplamMasraf;
    const birimFiyat = alisFiyati / alan;
    const bolgeKirasi = BOLGE_KIRA[bolge] || 12000;

    const yillikKiraGeliri = aylıkKira * 12;
    const kiraBrutGetiri = (yillikKiraGeliri / toplamMaliyet) * 100;
    const kiraNetGetiri = kiraBrutGetiri * 0.85; // yaklaşık %15 gider oranı

    const basabas = toplamMaliyet / aylıkKira; // ay cinsinden

    // 10 yıllık projeksiyon
    let kumulatifKira = 0;
    let konutDeger = alisFiyati;
    let kiraTutar = aylıkKira;
    const projeksiyonlar = [];
    for (let y = 1; y <= 10; y++) {
      kiraTutar = kiraTutar * (1 + yillikKiraArtisi / 100);
      konutDeger = konutDeger * (1 + yillikFiyatArtisi / 100);
      kumulatifKira += kiraTutar * 12;
      projeksiyonlar.push({
        yil: y,
        kiraTutar: Math.round(kiraTutar),
        konutDeger: Math.round(konutDeger),
        kumulatifKira: Math.round(kumulatifKira),
        toplamGetiri: Math.round(konutDeger + kumulatifKira - toplamMaliyet),
      });
    }

    const onYilGetiri = projeksiyonlar[9].toplamGetiri;
    const onYilROI = (onYilGetiri / toplamMaliyet) * 100;

    return {
      birimFiyat: Math.round(birimFiyat),
      bolgeKirasi,
      yillikKiraGeliri: Math.round(yillikKiraGeliri),
      kiraBrutGetiri: Math.round(kiraBrutGetiri * 10) / 10,
      kiraNetGetiri: Math.round(kiraNetGetiri * 10) / 10,
      basabasAy: Math.round(basabas),
      basabasYil: Math.round(basabas / 12 * 10) / 10,
      projeksiyonlar,
      onYilGetiri,
      onYilROI: Math.round(onYilROI),
      kiraUygunluk: aylıkKira >= bolgeKirasi ? 'Piyasa Üzeri' : 'Piyasa Altı',
    };
  }, [alisFiyati, aylıkKira, alan, bolge, yillikFiyatArtisi, yillikKiraArtisi, toplamMasraf]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Konut Yatırım Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Konut Yatırım Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira getirisi, başabaş noktası ve 10 yıllık projeksiyon ile yatırım kararınızı optimize edin.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Konut Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alış Fiyatı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alisFiyati.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={alisFiyati}
                onChange={e => setAlisFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira Geliri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylıkKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={3000} max={100000} step={1000} value={aylıkKira}
                onChange={e => setAylikKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>3K</span><span>100K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Net Kullanım Alanı (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alan} m²</p>
              <input type="range" min={30} max={500} step={10} value={alan}
                onChange={e => setAlan(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>30</span><span>500</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Bölge (Kira Karşılaştırması)</label>
              <select value={bolge} onChange={e => setBolge(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(BOLGE_KIRA).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <p className="text-[10px] text-gray-400 mt-1">Piyasa ortalaması: {sonuc.bolgeKirasi.toLocaleString('tr-TR')} ₺/ay</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Fiyat Artışı (%)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikFiyatArtisi}</p>
              <input type="range" min={5} max={50} step={5} value={yillikFiyatArtisi}
                onChange={e => setYillikFiyatArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%50</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Kira Artışı (%)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikKiraArtisi}</p>
              <input type="range" min={5} max={50} step={5} value={yillikKiraArtisi}
                onChange={e => setYillikKiraArtisi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%50</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.birimFiyat.toLocaleString('tr-TR')}</p>
            <p className="text-xs text-gray-500 mt-1">₺/m²</p>
          </div>
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">%{sonuc.kiraBrutGetiri}</p>
            <p className="text-xs text-gray-500 mt-1">Brüt Kira Getirisi</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">%{sonuc.kiraNetGetiri}</p>
            <p className="text-xs text-gray-500 mt-1">Net Kira Getirisi</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.basabasYil} yıl</p>
            <p className="text-xs text-gray-500 mt-1">Başabaş (kira ile)</p>
          </div>
        </section>

        {/* Bölge Karşılaştırması */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs font-black text-gray-900 mb-1">Bölge Kira Karşılaştırması</p>
          <div className="flex items-center gap-3">
            <p className="text-2xl font-black text-amber-700">{sonuc.kiraUygunluk}</p>
            <p className="text-xs text-gray-600">Belirlediğiniz kira ({aylıkKira.toLocaleString('tr-TR')} ₺), {bolge} piyasa ortalamasına ({sonuc.bolgeKirasi.toLocaleString('tr-TR')} ₺) göre {sonuc.kiraUygunluk === 'Piyasa Üzeri' ? 'yüksek' : 'düşük'}.</p>
          </div>
        </section>

        {/* 10 Yıl Projeksiyon */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">10 Yıllık Projeksiyon</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                  <th className="text-right py-2 font-black text-gray-500">Aylık Kira</th>
                  <th className="text-right py-2 font-black text-gray-500">Konut Değeri</th>
                  <th className="text-right py-2 font-black text-gray-500">Toplam Getiri</th>
                </tr>
              </thead>
              <tbody>
                {sonuc.projeksiyonlar.filter(p => p.yil % 2 === 0 || p.yil === 1 || p.yil === 10).map(p => (
                  <tr key={p.yil} className={`border-b border-gray-50 ${p.yil === 10 ? 'bg-[#F0FDF8]' : ''}`}>
                    <td className="py-2 font-black text-gray-900">{p.yil}. Yıl</td>
                    <td className="py-2 text-right text-gray-700">{p.kiraTutar.toLocaleString('tr-TR')} ₺</td>
                    <td className="py-2 text-right text-gray-700">{(p.konutDeger / 1000000).toFixed(1)} M ₺</td>
                    <td className={`py-2 text-right font-black ${p.toplamGetiri > 0 ? 'text-[#00C49F]' : 'text-rose-600'}`}>
                      {p.toplamGetiri > 0 ? '+' : ''}{(p.toplamGetiri / 1000000).toFixed(1)} M ₺
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between p-3 bg-[#F0FDF8] rounded-xl">
            <p className="text-xs font-black text-gray-900">10 Yıl Toplam ROI</p>
            <p className="text-xl font-black text-[#00C49F]">%{sonuc.onYilROI}</p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/portfoy', label: 'Portföy Takip' },
              { href: '/emlak-piyasasi', label: 'Emlak Piyasası' },
              { href: '/bolge-karsilastir', label: 'Bölge Karşılaştır' },
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
