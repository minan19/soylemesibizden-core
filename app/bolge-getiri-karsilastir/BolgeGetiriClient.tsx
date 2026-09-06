'use client';

import { useState, useMemo } from 'react';

const BOLGE_DATA: Record<string, { m2Fiyat: number; kiraCarpani: number; yillikArtis: number; doluluk: number }> = {
  'İstanbul — Avrupa Merkez': { m2Fiyat: 90000, kiraCarpani: 0.0038, yillikArtis: 45, doluluk: 96 },
  'İstanbul — Anadolu Yakası': { m2Fiyat: 75000, kiraCarpani: 0.0042, yillikArtis: 42, doluluk: 94 },
  'İstanbul — Avrupa Çevre': { m2Fiyat: 55000, kiraCarpani: 0.0048, yillikArtis: 38, doluluk: 91 },
  'Ankara — Çankaya': { m2Fiyat: 50000, kiraCarpani: 0.0050, yillikArtis: 38, doluluk: 92 },
  'Ankara — Çevre İlçeler': { m2Fiyat: 38000, kiraCarpani: 0.0055, yillikArtis: 35, doluluk: 88 },
  'İzmir — Alsancak/Konak': { m2Fiyat: 65000, kiraCarpani: 0.0045, yillikArtis: 42, doluluk: 93 },
  'İzmir — Bornova/Buca': { m2Fiyat: 48000, kiraCarpani: 0.0052, yillikArtis: 38, doluluk: 90 },
  'Antalya — Merkez': { m2Fiyat: 55000, kiraCarpani: 0.0053, yillikArtis: 50, doluluk: 88 },
  'Bodrum': { m2Fiyat: 95000, kiraCarpani: 0.0036, yillikArtis: 55, doluluk: 82 },
  'Bursa — Nilüfer': { m2Fiyat: 42000, kiraCarpani: 0.0056, yillikArtis: 36, doluluk: 89 },
  'Gaziantep': { m2Fiyat: 30000, kiraCarpani: 0.0062, yillikArtis: 32, doluluk: 86 },
  'Kocaeli — İzmit': { m2Fiyat: 40000, kiraCarpani: 0.0055, yillikArtis: 35, doluluk: 88 },
};

export default function BolgeGetiriClient() {
  const [alan, setAlan] = useState(100);
  const [seciliBolgeler, setSeciliBolgeler] = useState<string[]>([
    'İstanbul — Avrupa Merkez',
    'Ankara — Çankaya',
    'İzmir — Alsancak/Konak',
    'Bursa — Nilüfer',
  ]);

  const toggleBolge = (bolge: string) => {
    setSeciliBolgeler(prev =>
      prev.includes(bolge)
        ? prev.filter(b => b !== bolge)
        : prev.length < 5 ? [...prev, bolge] : prev
    );
  };

  const hesaplar = useMemo(() => {
    return seciliBolgeler.map(bolge => {
      const d = BOLGE_DATA[bolge];
      const evDegeri = d.m2Fiyat * alan;
      const aylikKira = evDegeri * d.kiraCarpani;
      const yillikBrut = aylikKira * 12 * (d.doluluk / 100);
      const yillikNet = yillikBrut * 0.75;
      const brutGetiri = (yillikBrut / evDegeri) * 100;
      const netGetiri = (yillikNet / evDegeri) * 100;
      const bes_yil_deger = evDegeri * Math.pow(1 + d.yillikArtis / 100, 5);
      const bes_yil_kira = yillikBrut * ((Math.pow(1.25, 5) - 1) / 0.25);
      const bes_yil_toplam_getiri = ((bes_yil_deger - evDegeri + bes_yil_kira) / evDegeri) * 100;
      return { bolge, evDegeri, aylikKira, brutGetiri, netGetiri, yillikArtis: d.yillikArtis, doluluk: d.doluluk, bes_yil_toplam_getiri };
    }).sort((a, b) => b.netGetiri - a.netGetiri);
  }, [seciliBolgeler, alan]);

  const maxGetiri = Math.max(...hesaplar.map(h => h.bes_yil_toplam_getiri), 1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Alan */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-black text-gray-700">Daire Büyüklüğü: {alan} m²</label>
        </div>
        <input type="range" min={50} max={300} step={10} value={alan} onChange={e => setAlan(Number(e.target.value))}
          className="w-full accent-[#00C49F]" />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>50 m²</span><span>300 m²</span></div>
      </div>

      {/* Bölge Seçimi */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-3">Bölge Seçin (max 5)</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(BOLGE_DATA).map(bolge => (
            <button key={bolge} onClick={() => toggleBolge(bolge)}
              className={`text-[10px] font-black px-3 py-1.5 rounded-full border transition-all ${seciliBolgeler.includes(bolge) ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#00C49F]/40'}`}>
              {bolge}
            </button>
          ))}
        </div>
      </div>

      {/* Karşılaştırma Tablosu */}
      {hesaplar.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bölge Karşılaştırması — {alan} m²</h2>
          <table className="w-full text-[10px] min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-right py-2 font-black text-gray-500">Mülk Değeri</th>
                <th className="text-right py-2 font-black text-gray-500">Aylık Kira</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Brüt Getiri</th>
                <th className="text-right py-2 font-black text-gray-500">Net Getiri</th>
                <th className="text-right py-2 font-black text-gray-500">5 Yıl ROI</th>
              </tr>
            </thead>
            <tbody>
              {hesaplar.map((h, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-black text-gray-900">{h.bolge}</td>
                  <td className="py-2 text-right font-bold text-gray-700">{Math.round(h.evDegeri).toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-700">{Math.round(h.aylikKira).toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{h.brutGetiri.toFixed(2)}</td>
                  <td className="py-2 text-right font-bold text-blue-600">%{h.netGetiri.toFixed(2)}</td>
                  <td className="py-2 text-right font-black text-gray-900">%{h.bes_yil_toplam_getiri.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">* Net getiri giderler sonrası tahminidir. 5 yıl ROI fiyat artışı + kira gelirini içerir.</p>
        </div>
      )}

      {/* 5 Yıl ROI Bar Chart */}
      {hesaplar.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">5 Yıllık Toplam Getiri Karşılaştırması</h2>
          <div className="space-y-3">
            {hesaplar.map((h, i) => {
              const pct = (h.bes_yil_toplam_getiri / maxGetiri) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-gray-600 w-40 shrink-0 truncate">{h.bolge}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div className="bg-[#00C49F] h-3 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[10px] font-black text-[#00C49F] w-14 text-right shrink-0">%{h.bes_yil_toplam_getiri.toFixed(0)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
