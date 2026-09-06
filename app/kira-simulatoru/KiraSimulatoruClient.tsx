'use client';

import { useState, useMemo } from 'react';

export default function KiraSimulatoruClient() {
  const [baslangicKira, setBaslangicKira] = useState(12000);
  const [yillikArtis, setYillikArtis] = useState(25);
  const [sure, setSure] = useState(5);
  const [enflasyon, setEnflasyon] = useState(40);
  const [dolulukAy, setDolulukAy] = useState(11);

  const hesap = useMemo(() => {
    const yillar = [];
    let kira = baslangicKira;
    let toplamGelir = 0;
    let toplamReel = 0;

    for (let y = 1; y <= sure; y++) {
      const yillikGelir = kira * dolulukAy;
      const enflKarpani = Math.pow(1 + enflasyon / 100, y);
      const reelGelir = yillikGelir / enflKarpani;
      toplamGelir += yillikGelir;
      toplamReel += reelGelir;
      yillar.push({ yil: y, aylikKira: Math.round(kira), yillikGelir: Math.round(yillikGelir), reelGelir: Math.round(reelGelir) });
      kira = kira * (1 + yillikArtis / 100);
    }

    return { yillar, toplamGelir, toplamReel };
  }, [baslangicKira, yillikArtis, sure, enflasyon, dolulukAy]);

  const maxGelir = Math.max(...hesap.yillar.map(y => y.yillikGelir), 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Kira Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Kira (₺/ay)</label>
            <input type="number" value={baslangicKira} onChange={e => setBaslangicKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Artış: %{yillikArtis}</label>
            <input type="range" min={10} max={60} step={5} value={yillikArtis} onChange={e => setYillikArtis(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Simülasyon Süresi: {sure} Yıl</label>
            <input type="range" min={1} max={20} step={1} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Enflasyon Oranı: %{enflasyon}</label>
            <input type="range" min={10} max={80} step={5} value={enflasyon} onChange={e => setEnflasyon(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Yılda Doluluk: {dolulukAy} Ay</label>
            <input type="range" min={6} max={12} step={1} value={dolulukAy} onChange={e => setDolulukAy(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: `${sure} Yıl Toplam Gelir`, value: `${Math.round(hesap.toplamGelir).toLocaleString('tr-TR')} ₺` },
          { label: 'Reel Gelir (Bugünkü değer)', value: `${Math.round(hesap.toplamReel).toLocaleString('tr-TR')} ₺` },
          { label: `${sure}. Yıl Aylık Kira`, value: `${hesap.yillar[hesap.yillar.length - 1]?.aylikKira.toLocaleString('tr-TR')} ₺` },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Yıl Yıl Tablo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yıl Bazlı Kira Geliri</h2>
        <table className="w-full text-[10px] min-w-[400px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yıl</th>
              <th className="text-right py-2 font-black text-gray-500">Aylık Kira</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Yıllık Gelir</th>
              <th className="text-right py-2 font-black text-gray-500">Reel Gelir</th>
            </tr>
          </thead>
          <tbody>
            {hesap.yillar.map((y, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-2 font-black text-gray-900">{y.yil}. Yıl</td>
                <td className="py-2 text-right font-bold text-gray-700">{y.aylikKira.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-black text-[#00C49F]">{y.yillikGelir.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-blue-500">{y.reelGelir.toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık Gelir Trendi</h2>
        <div className="space-y-2">
          {hesap.yillar.map((y, i) => {
            const pct = (y.yillikGelir / maxGelir) * 100;
            const reelPct = (y.reelGelir / maxGelir) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-10 shrink-0">{y.yil}. Yıl</span>
                <div className="flex-1 space-y-1">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-300 h-1.5 rounded-full" style={{ width: `${reelPct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-20 text-right shrink-0">{y.yillikGelir.toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] text-gray-500">
          <span><span className="inline-block w-3 h-2 bg-[#00C49F] rounded mr-1" />Nominal Gelir</span>
          <span><span className="inline-block w-3 h-1.5 bg-blue-300 rounded mr-1" />Reel Gelir</span>
        </div>
      </div>

    </div>
  );
}
