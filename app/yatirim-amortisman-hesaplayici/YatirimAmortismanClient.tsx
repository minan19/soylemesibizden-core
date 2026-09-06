'use client';

import { useState, useMemo } from 'react';

export default function YatirimAmortismanClient() {
  const [konutFiyati, setKonutFiyati] = useState(5000000);
  const [aylikKira, setAylikKira] = useState(25000);
  const [yillikMasraf, setYillikMasraf] = useState(30000);
  const [bosKalmaAy, setBosKalmaAy] = useState(1);
  const [yillikDegerArtisi, setYillikDegerArtisi] = useState(30);
  const [yatirimSuresi, setYatirimSuresi] = useState(10);
  const [vergiFiyat, setVergiFiyat] = useState(true);

  const hesap = useMemo(() => {
    const yillikBrutKira = aylikKira * (12 - bosKalmaAy);
    const gelirVergisi = vergiFiyat ? yillikBrutKira * 0.15 : 0;
    const yillikNetKira = yillikBrutKira - yillikMasraf - gelirVergisi;

    const brutGetiriYuzde = (yillikBrutKira / konutFiyati) * 100;
    const netGetiriYuzde = (yillikNetKira / konutFiyati) * 100;

    // Amortisman: kaç yılda geri dönecek
    const amortismanYili = netGetiriYuzde > 0 ? 100 / netGetiriYuzde : 0;
    const amortismanAy = amortismanYili * 12;

    // Sermaye kazancı
    const sonDeger = konutFiyati * Math.pow(1 + yillikDegerArtisi / 100, yatirimSuresi);
    const sermayeKazanci = sonDeger - konutFiyati;
    const toplamKiraGeliri = yillikNetKira * yatirimSuresi;
    const toplamGetiri = ((toplamKiraGeliri + sermayeKazanci) / konutFiyati) * 100;
    const yillikOrtalama = toplamGetiri / yatirimSuresi;

    // Yıl bazlı birikim
    const yillar = Array.from({ length: yatirimSuresi }, (_, i) => {
      const y = i + 1;
      const birikenKira = yillikNetKira * y;
      const deger = konutFiyati * Math.pow(1 + yillikDegerArtisi / 100, y);
      const toplamVarlik = birikenKira + deger;
      return { y, birikenKira, deger, toplamVarlik };
    });

    return {
      yillikBrutKira, yillikNetKira, brutGetiriYuzde, netGetiriYuzde,
      amortismanYili, amortismanAy, sonDeger, sermayeKazanci,
      toplamKiraGeliri, toplamGetiri, yillikOrtalama, yillar,
    };
  }, [konutFiyati, aylikKira, yillikMasraf, bosKalmaAy, yillikDegerArtisi, yatirimSuresi, vergiFiyat]);

  const maxVarlik = Math.max(...hesap.yillar.map(y => y.toplamVarlik));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yatırım Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Konut Fiyatı (₺)</label>
            <input type="number" value={konutFiyati} onChange={e => setKonutFiyati(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Masraf (aidat, bakım, vergi) (₺)</label>
            <input type="number" value={yillikMasraf} onChange={e => setYillikMasraf(Number(e.target.value))} step={1000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Boş Kalma Süresi (ay)</label>
            <input type="number" value={bosKalmaAy} onChange={e => setBosKalmaAy(Number(e.target.value))} step={1} min={0} max={6}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Tahmini Yıllık Değer Artışı (%)</label>
            <input type="range" value={yillikDegerArtisi} onChange={e => setYillikDegerArtisi(Number(e.target.value))} min={5} max={80} step={5}
              className="w-full accent-[#00C49F]" />
            <div className="text-right text-xs font-black text-[#00C49F]">%{yillikDegerArtisi}</div>
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yatırım Süresi (yıl)</label>
            <input type="range" value={yatirimSuresi} onChange={e => setYatirimSuresi(Number(e.target.value))} min={3} max={20} step={1}
              className="w-full accent-[#00C49F]" />
            <div className="text-right text-xs font-black text-[#00C49F]">{yatirimSuresi} yıl</div>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="vergi" checked={vergiFiyat} onChange={e => setVergiFiyat(e.target.checked)}
              className="accent-[#00C49F] w-4 h-4" />
            <label htmlFor="vergi" className="text-xs font-black text-gray-700">Kira geliri vergisi uygula (%15 götürü)</label>
          </div>
        </div>
      </div>

      {/* KPI Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Brüt Getiri</p>
          <p className="text-sm font-black text-[#00C49F]">%{hesap.brutGetiriYuzde.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Net Getiri</p>
          <p className="text-sm font-black text-blue-500">%{hesap.netGetiriYuzde.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Amortisman</p>
          <p className="text-sm font-black text-amber-500">{hesap.amortismanYili > 0 ? `${hesap.amortismanYili.toFixed(1)} yıl` : '—'}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">{yatirimSuresi}Y Ort. Getiri</p>
          <p className="text-sm font-black text-emerald-600">%{hesap.yillikOrtalama.toFixed(1)}</p>
        </div>
      </div>

      {/* Özet */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">{yatirimSuresi} Yıl Sonunda Toplam</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Toplam Kira Geliri (Net)</p>
            <p className="text-xs font-black text-gray-900">{Math.round(hesap.toplamKiraGeliri).toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Sermaye Kazancı</p>
            <p className="text-xs font-black text-[#00C49F]">{Math.round(hesap.sermayeKazanci).toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Mülk Son Değer</p>
            <p className="text-xs font-black text-blue-500">{Math.round(hesap.sonDeger).toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>

        {/* Yıllık Bar Chart */}
        <div className="space-y-2">
          {hesap.yillar.map(({ y, birikenKira, toplamVarlik }) => {
            const pct = (toplamVarlik / maxVarlik) * 100;
            const kiraPct = (birikenKira / toplamVarlik) * pct;
            return (
              <div key={y} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-8 shrink-0">{y}Y</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className="h-3 rounded-full flex">
                    <div className="bg-[#00C49F] h-3" style={{ width: `${kiraPct}%` }} />
                    <div className="bg-blue-400 h-3" style={{ width: `${pct - kiraPct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-600 w-28 text-right shrink-0">{Math.round(toplamVarlik / 1000000).toLocaleString('tr-TR')}M ₺</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex gap-4">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#00C49F]" /><span className="text-[10px] text-gray-400">Kira Geliri</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-400" /><span className="text-[10px] text-gray-400">Mülk Değeri</span></div>
        </div>
      </div>

    </div>
  );
}
