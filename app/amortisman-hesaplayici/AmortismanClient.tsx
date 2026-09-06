'use client';

import { useState, useMemo } from 'react';

export default function AmortismanClient() {
  const [evDegeri, setEvDegeri] = useState(5000000);
  const [aylikKira, setAylikKira] = useState(20000);
  const [yillikGider, setYillikGider] = useState(8);
  const [yillikFiyatArtisi, setYillikFiyatArtisi] = useState(30);
  const [yillikKiraArtisi, setYillikKiraArtisi] = useState(25);

  const hesap = useMemo(() => {
    const brutYillikKira = aylikKira * 12;
    const netYillikKira = brutYillikKira * (1 - yillikGider / 100);
    const brutGetiriYuzde = (brutYillikKira / evDegeri) * 100;
    const netGetiriYuzde = (netYillikKira / evDegeri) * 100;
    const basitAmortisman = Math.round(evDegeri / netYillikKira * 10) / 10;

    const yillar = [];
    let kumulatifKira = 0;
    let guncelEvDegeri = evDegeri;
    let guncelKira = aylikKira;

    for (let y = 1; y <= 20; y++) {
      const yillikBrutKira = guncelKira * 12;
      const yillikNetKira = yillikBrutKira * (1 - yillikGider / 100);
      kumulatifKira += yillikNetKira;
      guncelEvDegeri = guncelEvDegeri * (1 + yillikFiyatArtisi / 100);
      guncelKira = guncelKira * (1 + yillikKiraArtisi / 100);
      const toplamGetiri = kumulatifKira + guncelEvDegeri - evDegeri;
      const roi = (toplamGetiri / evDegeri) * 100;
      const geriDonus = kumulatifKira >= evDegeri;
      yillar.push({
        yil: y,
        yillikKira: Math.round(yillikNetKira),
        kumulatifKira: Math.round(kumulatifKira),
        evDegeri: Math.round(guncelEvDegeri),
        roi: Math.round(roi),
        geriDonus,
      });
    }

    const amortismanYili = yillar.find(y => y.geriDonus)?.yil ?? null;

    return { brutGetiriYuzde, netGetiriYuzde, basitAmortisman, amortismanYili, yillar };
  }, [evDegeri, aylikKira, yillikGider, yillikFiyatArtisi, yillikKiraArtisi]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Yatırım Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mülk Değeri (₺)</label>
            <input type="number" value={evDegeri} onChange={e => setEvDegeri(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Gider/Vergi: %{yillikGider}</label>
            <input type="range" min={3} max={25} step={1} value={yillikGider} onChange={e => setYillikGider(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Fiyat Artışı: %{yillikFiyatArtisi}</label>
            <input type="range" min={5} max={60} step={5} value={yillikFiyatArtisi} onChange={e => setYillikFiyatArtisi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Kira Artışı: %{yillikKiraArtisi}</label>
            <input type="range" min={10} max={60} step={5} value={yillikKiraArtisi} onChange={e => setYillikKiraArtisi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Brüt Kira Getirisi', value: `%${hesap.brutGetiriYuzde.toFixed(2)}`, color: 'text-[#00C49F]' },
          { label: 'Net Kira Getirisi', value: `%${hesap.netGetiriYuzde.toFixed(2)}`, color: 'text-emerald-500' },
          { label: 'Basit Amortisman', value: `${hesap.basitAmortisman} Yıl`, color: 'text-amber-500' },
          { label: 'Kira ile Geri Dönüş', value: hesap.amortismanYili ? `${hesap.amortismanYili}. Yıl` : '20+ Yıl', color: 'text-blue-500' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-sm font-black ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">20 Yıllık Amortisman Tablosu</h2>
        <table className="w-full text-[10px] min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yıl</th>
              <th className="text-right py-2 font-black text-gray-500">Yıllık Net Kira</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Kümülatif Kira</th>
              <th className="text-right py-2 font-black text-gray-500">Mülk Değeri</th>
              <th className="text-right py-2 font-black text-emerald-500">Toplam ROI</th>
            </tr>
          </thead>
          <tbody>
            {hesap.yillar.map((y, i) => (
              <tr key={i} className={`border-b border-gray-50 last:border-0 ${y.geriDonus && !hesap.yillar[i - 1]?.geriDonus ? 'bg-[#F0FDF8]' : ''}`}>
                <td className="py-2 font-black text-gray-900 flex items-center gap-1">
                  {y.yil}. Yıl
                  {y.geriDonus && !hesap.yillar[i - 1]?.geriDonus && (
                    <span className="text-[9px] bg-[#00C49F] text-white px-1 rounded font-black">GERİ DÖNDÜ</span>
                  )}
                </td>
                <td className="py-2 text-right font-bold text-gray-600">{y.yillikKira.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-black text-[#00C49F]">{y.kumulatifKira.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-gray-700">{y.evDegeri.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-black text-emerald-500">%{y.roi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
