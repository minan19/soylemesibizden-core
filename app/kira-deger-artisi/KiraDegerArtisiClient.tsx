'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

const TUFE_VERILERI = [
  { yil: 2019, oran: 11.8 },
  { yil: 2020, oran: 14.6 },
  { yil: 2021, oran: 19.6 },
  { yil: 2022, oran: 64.3 },
  { yil: 2023, oran: 65.2 },
  { yil: 2024, oran: 48.6 },
];

export default function KiraDegerArtisiClient() {
  const [mevcutKira, setMevcutKira] = useState(15000);
  const [yillikArtis, setYillikArtis] = useState(35);
  const [enflasyonOrani, setEnflasyonOrani] = useState(40);
  const [yil, setYil] = useState(5);

  const sonuc = useMemo(() => {
    const yillar = [];
    let kira = mevcutKira;
    let reel = mevcutKira;
    let nominalKumulatif = 0;

    for (let y = 1; y <= yil; y++) {
      const yillikNominalKira = kira * 12;
      nominalKumulatif += yillikNominalKira;
      kira = kira * (1 + yillikArtis / 100);
      const reelDeflator = Math.pow(1 + enflasyonOrani / 100, y);
      const reelKira = (mevcutKira * Math.pow(1 + yillikArtis / 100, y)) / reelDeflator;

      yillar.push({
        y,
        nominalAylik: Math.round(kira / (1 + yillikArtis / 100)),
        nominalAylikSonraki: Math.round(kira),
        nominalYillik: Math.round(yillikNominalKira),
        nominalKumulatif: Math.round(nominalKumulatif),
        reelAylik: Math.round(reelKira),
        reelKayip: reelKira < mevcutKira,
      });
    }

    const sonYil = yillar[yillar.length - 1];
    const toplamNominal = nominalKumulatif;
    const nominalArtis = ((sonYil.nominalAylikSonraki / mevcutKira) - 1) * 100;

    return { yillar, toplamNominal, nominalArtis: nominalArtis.toFixed(1) };
  }, [mevcutKira, yillikArtis, enflasyonOrani, yil]);

  const maxNominal = Math.max(...sonuc.yillar.map(y => y.nominalAylikSonraki));
  const maxReel = Math.max(...sonuc.yillar.map(y => y.reelAylik));
  const maxY = Math.max(maxNominal, maxReel, mevcutKira);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kira Değer Artışı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Kira Değer Artışı Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kiranızın nominal ve reel değerinin yıllar içinde nasıl değişeceğini, enflasyona karşı satın alma gücünü hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mevcut Aylık Kira</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{mevcutKira.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={2000} max={100000} step={1000} value={mevcutKira}
                onChange={e => setMevcutKira(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>2K</span><span>100K</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Kira Artış Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikArtis}</p>
              <input type="range" min={5} max={80} step={5} value={yillikArtis}
                onChange={e => setYillikArtis(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%80</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Beklenen Yıllık Enflasyon</label>
              <p className="text-lg font-black text-amber-500 mb-2">%{enflasyonOrani}</p>
              <input type="range" min={10} max={80} step={5} value={enflasyonOrani}
                onChange={e => setEnflasyonOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%80</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Projeksiyon Süresi</label>
              <p className="text-lg font-black text-gray-700 mb-2">{yil} yıl</p>
              <input type="range" min={1} max={15} step={1} value={yil}
                onChange={e => setYil(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1 yıl</span><span>15 yıl</span></div>
            </div>
          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">{sonuc.yillar[sonuc.yillar.length - 1]?.nominalAylikSonraki.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Nominal Kira ({yil}. Yıl)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-amber-500">{sonuc.yillar[sonuc.yillar.length - 1]?.reelAylik.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Reel Kira ({yil}. Yıl)</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center col-span-2 sm:col-span-1">
            <p className="text-xl font-black text-blue-600">{(sonuc.toplamNominal / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Kira Geliri</p>
          </div>
        </section>

        {/* Grafik */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-2">Nominal vs Reel Kira Grafiği</h2>
          <div className="flex gap-4 text-[10px] mb-4">
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-[#00C49F] inline-block" /> Nominal Kira</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 rounded bg-amber-400 inline-block" /> Reel Kira (Enflasyon Düzeltmeli)</span>
          </div>
          <div className="space-y-3">
            {sonuc.yillar.map(row => (
              <div key={row.y} className="space-y-1">
                <p className="text-[10px] font-bold text-gray-500">{row.y}. Yıl</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-[#00C49F] rounded-full transition-all"
                      style={{ width: `${(row.nominalAylikSonraki / maxY) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-[#00C49F] w-24 text-right">{row.nominalAylikSonraki.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 rounded-full h-4 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all"
                      style={{ width: `${(row.reelAylik / maxY) * 100}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-amber-500 w-24 text-right">{row.reelAylik.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TÜFE Geçmiş */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Geçmiş TÜFE Oranları (Referans)</h2>
          <div className="space-y-2">
            {TUFE_VERILERI.map(t => (
              <div key={t.yil} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500 w-12">{t.yil}</span>
                <div className="flex-1 bg-gray-50 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(t.oran / 70) * 100}%` }} />
                </div>
                <span className="text-xs font-black text-amber-600 w-12 text-right">%{t.oran}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/enflasyon-korumasi', label: 'Enflasyona Karşı Korunma' },
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
