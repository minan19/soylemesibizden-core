'use client';

import { useState, useMemo } from 'react';

export default function ServetBirikimClient() {
  const [baslangicBirikim, setBaslangicBirikim] = useState(500000);
  const [aylikKatki, setAylikKatki] = useState(10000);
  const [yillikGetiri, setYillikGetiri] = useState(35);
  const [sure, setSure] = useState(10);
  const [enflasyon, setEnflasyon] = useState(40);

  const hesap = useMemo(() => {
    const aylikOran = yillikGetiri / 100 / 12;
    const yillar = [];
    let birikim = baslangicBirikim;
    let toplamKatki = baslangicBirikim;

    for (let y = 1; y <= sure; y++) {
      for (let m = 0; m < 12; m++) {
        birikim = (birikim + aylikKatki) * (1 + aylikOran);
      }
      toplamKatki += aylikKatki * 12;
      const enflKarpani = Math.pow(1 + enflasyon / 100, y);
      const reelDeger = birikim / enflKarpani;
      const faizKazanci = birikim - toplamKatki;
      yillar.push({
        yil: y,
        birikim: Math.round(birikim),
        toplamKatki: Math.round(toplamKatki),
        faizKazanci: Math.round(faizKazanci),
        reelDeger: Math.round(reelDeger),
      });
    }

    return { yillar, sonBirikim: Math.round(birikim), toplamKatki: Math.round(toplamKatki) };
  }, [baslangicBirikim, aylikKatki, yillikGetiri, sure, enflasyon]);

  const maxBirikim = Math.max(...hesap.yillar.map(y => y.birikim), 1);
  const sonYil = hesap.yillar[hesap.yillar.length - 1];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Birikim Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Birikimi (₺)</label>
            <input type="number" value={baslangicBirikim} onChange={e => setBaslangicBirikim(Number(e.target.value))} step={50000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Katkı (₺)</label>
            <input type="number" value={aylikKatki} onChange={e => setAylikKatki(Number(e.target.value))} step={1000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Getiri: %{yillikGetiri}</label>
            <input type="range" min={5} max={80} step={5} value={yillikGetiri} onChange={e => setYillikGetiri(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Süre: {sure} Yıl</label>
            <input type="range" min={1} max={30} step={1} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Enflasyon: %{enflasyon}</label>
            <input type="range" min={10} max={80} step={5} value={enflasyon} onChange={e => setEnflasyon(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: `${sure} Yıl Sonu Birikim`, value: `${hesap.sonBirikim.toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
          { label: 'Reel Değer (Bugünkü)', value: `${sonYil?.reelDeger.toLocaleString('tr-TR')} ₺`, color: 'text-blue-500' },
          { label: 'Toplam Katkı', value: `${hesap.toplamKatki.toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
          { label: 'Getiri Kazancı', value: `${sonYil?.faizKazanci.toLocaleString('tr-TR')} ₺`, color: 'text-emerald-500' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Birikim Büyüme Trendi</h2>
        <div className="space-y-2">
          {hesap.yillar.map((y, i) => {
            const pct = (y.birikim / maxBirikim) * 100;
            const katPct = (y.toplamKatki / maxBirikim) * 100;
            const reelPct = (y.reelDeger / maxBirikim) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-10 shrink-0">{y.yil}. Yıl</span>
                <div className="flex-1 space-y-1">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-gray-400 h-1.5 rounded-full" style={{ width: `${katPct}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-300 h-1.5 rounded-full" style={{ width: `${reelPct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-24 text-right shrink-0">{y.birikim.toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] text-gray-500 flex-wrap">
          <span><span className="inline-block w-3 h-2 bg-[#00C49F] rounded mr-1" />Nominal Birikim</span>
          <span><span className="inline-block w-3 h-1.5 bg-gray-400 rounded mr-1" />Toplam Katkı</span>
          <span><span className="inline-block w-3 h-1.5 bg-blue-300 rounded mr-1" />Reel Değer</span>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yıl Bazlı Birikim Tablosu</h2>
        <table className="w-full text-[10px] min-w-[480px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yıl</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Birikim</th>
              <th className="text-right py-2 font-black text-gray-500">Toplam Katkı</th>
              <th className="text-right py-2 font-black text-emerald-500">Getiri Kazancı</th>
              <th className="text-right py-2 font-black text-blue-500">Reel Değer</th>
            </tr>
          </thead>
          <tbody>
            {hesap.yillar.map((y, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-2 font-black text-gray-900">{y.yil}. Yıl</td>
                <td className="py-2 text-right font-black text-[#00C49F]">{y.birikim.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-gray-600">{y.toplamKatki.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-emerald-500">{y.faizKazanci.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-blue-500">{y.reelDeger.toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
