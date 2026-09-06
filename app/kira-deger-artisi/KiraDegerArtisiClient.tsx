'use client';

import { useState, useMemo } from 'react';

export default function KiraDegerArtisiClient() {
  const [baslangicKira, setBaslangicKira] = useState(15000);
  const [yillikArtis, setYillikArtis] = useState(25);
  const [enflasyon, setEnflasyon] = useState(40);
  const [sure, setSure] = useState(5);

  const hesap = useMemo(() => {
    const yillar = [];
    let kira = baslangicKira;
    let enflasyonluKira = baslangicKira;

    for (let y = 1; y <= sure; y++) {
      kira = kira * (1 + yillikArtis / 100);
      enflasyonluKira = enflasyonluKira * (1 + enflasyon / 100);
      const reelKira = kira / Math.pow(1 + enflasyon / 100, y);
      const enflasyonFark = kira - enflasyonluKira;
      const enflasyonFarkYuzde = ((kira / enflasyonluKira) - 1) * 100;
      yillar.push({
        yil: y,
        kira: Math.round(kira),
        enflasyonluKira: Math.round(enflasyonluKira),
        reelKira: Math.round(reelKira),
        enflasyonFark: Math.round(enflasyonFark),
        enflasyonFarkYuzde: Math.round(enflasyonFarkYuzde * 10) / 10,
      });
    }

    return { yillar };
  }, [baslangicKira, yillikArtis, enflasyon, sure]);

  const maxKira = Math.max(...hesap.yillar.map(y => Math.max(y.kira, y.enflasyonluKira)), 1);
  const sonYil = hesap.yillar[hesap.yillar.length - 1];
  const reelDegisim = sonYil ? ((sonYil.reelKira / baslangicKira) - 1) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Kira ve Enflasyon Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Kira (₺/ay)</label>
            <input type="number" value={baslangicKira} onChange={e => setBaslangicKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Kira Artışı: %{yillikArtis}</label>
            <input type="range" min={5} max={60} step={5} value={yillikArtis} onChange={e => setYillikArtis(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Enflasyon Oranı: %{enflasyon}</label>
            <input type="range" min={10} max={80} step={5} value={enflasyon} onChange={e => setEnflasyon(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Süre: {sure} Yıl</label>
            <input type="range" min={1} max={15} step={1} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: `${sure}. Yıl Kira`, value: `${sonYil?.kira.toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
          { label: `${sure}. Yıl Enflasyon Bazlı Kira`, value: `${sonYil?.enflasyonluKira.toLocaleString('tr-TR')} ₺`, color: 'text-rose-500' },
          { label: 'Reel Değer Değişimi', value: `${reelDegisim >= 0 ? '+' : ''}${reelDegisim.toFixed(1)}%`, color: reelDegisim >= 0 ? 'text-emerald-500' : 'text-rose-500' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className={`text-sm font-black ${k.color}`}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Artışı vs Enflasyon Karşılaştırması</h2>
        <div className="space-y-2">
          {hesap.yillar.map((y, i) => {
            const kiraPct = (y.kira / maxKira) * 100;
            const enflPct = (y.enflasyonluKira / maxKira) * 100;
            const reelPct = (y.reelKira / maxKira) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-10 shrink-0">{y.yil}. Yıl</span>
                <div className="flex-1 space-y-1">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${kiraPct}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-rose-300 h-1.5 rounded-full" style={{ width: `${enflPct}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-300 h-1.5 rounded-full" style={{ width: `${reelPct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-24 text-right shrink-0">{y.kira.toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] text-gray-500 flex-wrap">
          <span><span className="inline-block w-3 h-2 bg-[#00C49F] rounded mr-1" />Kira (%{yillikArtis} artış)</span>
          <span><span className="inline-block w-3 h-1.5 bg-rose-300 rounded mr-1" />Enflasyon Bazlı Kira</span>
          <span><span className="inline-block w-3 h-1.5 bg-blue-300 rounded mr-1" />Reel Kira (Bugünkü)</span>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yıl Bazlı Kira ve Enflasyon Tablosu</h2>
        <table className="w-full text-[10px] min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yıl</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Kira</th>
              <th className="text-right py-2 font-black text-rose-500">Enflasyon Bazlı</th>
              <th className="text-right py-2 font-black text-blue-500">Reel Kira</th>
              <th className="text-right py-2 font-black text-gray-500">Fark</th>
            </tr>
          </thead>
          <tbody>
            {hesap.yillar.map((y, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-2 font-black text-gray-900">{y.yil}. Yıl</td>
                <td className="py-2 text-right font-black text-[#00C49F]">{y.kira.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-rose-500">{y.enflasyonluKira.toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-blue-500">{y.reelKira.toLocaleString('tr-TR')} ₺</td>
                <td className={`py-2 text-right font-black ${y.enflasyonFark >= 0 ? 'text-emerald-500' : 'text-rose-600'}`}>
                  {y.enflasyonFark >= 0 ? '+' : ''}{y.enflasyonFark.toLocaleString('tr-TR')} ₺
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
