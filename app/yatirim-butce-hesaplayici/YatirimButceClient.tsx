'use client';

import { useState, useMemo } from 'react';

const SEHIR_GETIRI: Record<string, number> = {
  'İstanbul': 4.5,
  'Ankara': 5.2,
  'İzmir': 4.8,
  'Antalya': 5.6,
  'Bursa': 5.8,
  'Bodrum': 3.9,
  'Gaziantep': 6.3,
  'Kocaeli': 5.5,
};

export default function YatirimButceClient() {
  const [butce, setButce] = useState(2000000);
  const [pesinatOrani, setPesinatOrani] = useState(30);
  const [sehir, setSehir] = useState('İstanbul');
  const [yillikFiyatArtisi, setYillikFiyatArtisi] = useState(30);
  const [kiraDoluluk, setKiraDoluluk] = useState(92);
  const [alisGiderleri, setAlisGiderleri] = useState(4);

  const hesap = useMemo(() => {
    const kiraSehirGetirisi = SEHIR_GETIRI[sehir] || 5.0;
    const toplamMaliyet = butce * (1 + alisGiderleri / 100);
    const pesinatTutari = butce * (pesinatOrani / 100);
    const krediTutari = butce - pesinatTutari;
    const aylikKira = (butce * (kiraSehirGetirisi / 100)) / 12;
    const aylikKiraGeliri = aylikKira * (kiraDoluluk / 100);
    const yillikKiraGeliri = aylikKiraGeliri * 12;

    // 5 yıllık projeksiyon
    const yillar = [];
    let mlkDegeri = butce;
    let toplamKira = 0;
    for (let y = 1; y <= 5; y++) {
      mlkDegeri = mlkDegeri * (1 + yillikFiyatArtisi / 100);
      toplamKira += yillikKiraGeliri * Math.pow(1.25, y - 1); // kira %25 artış varsayımı
      const toplamGetiri = mlkDegeri - butce + toplamKira;
      const roi = (toplamGetiri / toplamMaliyet) * 100;
      yillar.push({ yil: y, mlkDegeri, toplamKira, toplamGetiri, roi });
    }

    const brut_kira_getirisi = (yillikKiraGeliri / butce) * 100;
    const net_kira_getirisi = brut_kira_getirisi * 0.75; // gider tahmini %25

    return { toplamMaliyet, pesinatTutari, krediTutari, aylikKiraGeliri, yillikKiraGeliri, brut_kira_getirisi, net_kira_getirisi, yillar };
  }, [butce, pesinatOrani, sehir, yillikFiyatArtisi, kiraDoluluk, alisGiderleri]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Yatırım Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mülk Değeri (₺)</label>
            <input type="number" value={butce} onChange={e => setButce(Number(e.target.value))} step={100000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Peşinat Oranı: %{pesinatOrani}</label>
            <input type="range" min={20} max={100} step={5} value={pesinatOrani} onChange={e => setPesinatOrani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Şehir</label>
            <select value={sehir} onChange={e => setSehir(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(SEHIR_GETIRI).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Fiyat Artışı: %{yillikFiyatArtisi}</label>
            <input type="range" min={10} max={60} step={5} value={yillikFiyatArtisi} onChange={e => setYillikFiyatArtisi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kira Doluluk Oranı: %{kiraDoluluk}</label>
            <input type="range" min={70} max={100} step={1} value={kiraDoluluk} onChange={e => setKiraDoluluk(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Alım Giderleri: %{alisGiderleri}</label>
            <input type="range" min={2} max={8} step={0.5} value={alisGiderleri} onChange={e => setAlisGiderleri(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Toplam Maliyet', value: `${Math.round(hesap.toplamMaliyet).toLocaleString('tr-TR')} ₺`, sub: 'Alım giderleri dahil' },
          { label: 'Peşinat', value: `${Math.round(hesap.pesinatTutari).toLocaleString('tr-TR')} ₺`, sub: `%${pesinatOrani} peşinat` },
          { label: 'Aylık Kira Geliri', value: `${Math.round(hesap.aylikKiraGeliri).toLocaleString('tr-TR')} ₺`, sub: `%${kiraDoluluk} dolulukla` },
          { label: 'Net Kira Getirisi', value: `%${hesap.net_kira_getirisi.toFixed(1)}`, sub: 'Giderler sonrası' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* 5 Yıl Projeksiyon */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">5 Yıllık Yatırım Projeksiyonu</h2>
        <table className="w-full text-[10px] min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Yıl</th>
              <th className="text-right py-2 font-black text-gray-500">Mülk Değeri</th>
              <th className="text-right py-2 font-black text-gray-500">Kira Geliri</th>
              <th className="text-right py-2 font-black text-gray-500">Toplam Getiri</th>
              <th className="text-right py-2 font-black text-[#00C49F]">ROI</th>
            </tr>
          </thead>
          <tbody>
            {hesap.yillar.map((y, i) => (
              <tr key={i} className="border-b border-gray-50">
                <td className="py-2 font-black text-gray-900">{y.yil}. Yıl</td>
                <td className="py-2 text-right font-bold text-gray-700">{Math.round(y.mlkDegeri).toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-blue-600">{Math.round(y.toplamKira).toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-gray-700">{Math.round(y.toplamGetiri).toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-black text-[#00C49F]">%{y.roi.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-gray-400 mt-2">* Kira artışı yıllık %25 varsayılmıştır. Gerçek değerler piyasa koşullarına göre değişir.</p>
      </div>

      {/* Getiri Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">ROI Projeksiyonu</h2>
        <div className="space-y-2">
          {hesap.yillar.map((y, i) => {
            const maxRoi = hesap.yillar[hesap.yillar.length - 1].roi;
            const pct = Math.min((y.roi / maxRoi) * 100, 100);
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-10 shrink-0">{y.yil}. Yıl</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div className="bg-[#00C49F] h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-[#00C49F] w-12 text-right shrink-0">%{y.roi.toFixed(0)}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
