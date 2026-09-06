'use client';

import { useState, useMemo } from 'react';

const BANKA_FAIZLER = [
  { banka: 'Ziraat Bankası', aylik: 3.39, kampanya: false },
  { banka: 'Halkbank', aylik: 3.45, kampanya: false },
  { banka: 'Vakıfbank', aylik: 3.49, kampanya: false },
  { banka: 'Garanti BBVA', aylik: 3.59, kampanya: false },
  { banka: 'İş Bankası', aylik: 3.55, kampanya: false },
  { banka: 'Yapı Kredi', aylik: 3.65, kampanya: false },
  { banka: 'Akbank', aylik: 3.62, kampanya: false },
  { banka: 'QNB Finansbank', aylik: 3.75, kampanya: false },
];

export default function FaizKarsilastiriciClient() {
  const [krediTutari, setKrediTutari] = useState(2000000);
  const [vade, setVade] = useState(120);
  const [ozelFaiz, setOzelFaiz] = useState('');

  const hesaplar = useMemo(() => {
    const bankalar = BANKA_FAIZLER.map(b => {
      const r = b.aylik / 100;
      const n = vade;
      const taksit = krediTutari * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const toplamOdeme = taksit * n;
      const toplamFaiz = toplamOdeme - krediTutari;
      return { ...b, taksit, toplamOdeme, toplamFaiz };
    });

    if (ozelFaiz && !isNaN(parseFloat(ozelFaiz))) {
      const r = parseFloat(ozelFaiz) / 100;
      const n = vade;
      const taksit = krediTutari * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const toplamOdeme = taksit * n;
      const toplamFaiz = toplamOdeme - krediTutari;
      bankalar.push({ banka: 'Özel Faiz Girişi', aylik: parseFloat(ozelFaiz), kampanya: true, taksit, toplamOdeme, toplamFaiz });
    }

    return bankalar.sort((a, b) => a.taksit - b.taksit);
  }, [krediTutari, vade, ozelFaiz]);

  const minTaksit = hesaplar[0]?.taksit ?? 0;
  const maxTaksit = hesaplar[hesaplar.length - 1]?.taksit ?? 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Kredi Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Kredi Tutarı (₺)</label>
            <input type="number" value={krediTutari} onChange={e => setKrediTutari(Number(e.target.value))} step={100000} min={100000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Vade: {vade} Ay ({(vade / 12).toFixed(0)} Yıl)</label>
            <input type="range" min={12} max={240} step={12} value={vade} onChange={e => setVade(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Özel Aylık Faiz (%, isteğe bağlı)</label>
            <input type="number" value={ozelFaiz} onChange={e => setOzelFaiz(e.target.value)} step={0.01} placeholder="örn. 3.50"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">Banka Karşılaştırması — {krediTutari.toLocaleString('tr-TR')} ₺ / {vade} Ay</h2>
        <table className="w-full text-[10px] min-w-[500px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Banka</th>
              <th className="text-right py-2 font-black text-gray-500">Aylık Faiz</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Aylık Taksit</th>
              <th className="text-right py-2 font-black text-gray-500">Toplam Faiz</th>
              <th className="text-right py-2 font-black text-gray-500">Toplam Ödeme</th>
            </tr>
          </thead>
          <tbody>
            {hesaplar.map((h, i) => (
              <tr key={i} className={`border-b border-gray-50 ${i === 0 ? 'bg-[#F0FDF8]' : ''}`}>
                <td className="py-2 font-black text-gray-900">
                  {i === 0 && <span className="text-[9px] bg-[#00C49F] text-white px-1 py-0.5 rounded mr-1">EN İYİ</span>}
                  {h.banka}
                </td>
                <td className="py-2 text-right font-bold text-gray-700">%{h.aylik}</td>
                <td className="py-2 text-right font-black text-[#00C49F]">{Math.round(h.taksit).toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-rose-500">{Math.round(h.toplamFaiz).toLocaleString('tr-TR')} ₺</td>
                <td className="py-2 text-right font-bold text-gray-700">{Math.round(h.toplamOdeme).toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[10px] text-gray-400 mt-2">* Faiz oranları yaklaşık tahminidir; güncel oranlar için bankaları arayın.</p>
      </div>

      {/* Bar chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Aylık Taksit Karşılaştırması</h2>
        <div className="space-y-2">
          {hesaplar.map((h, i) => {
            const pct = maxTaksit > minTaksit ? ((h.taksit - minTaksit) / (maxTaksit - minTaksit)) * 60 + 40 : 70;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-32 shrink-0 truncate">{h.banka}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div className={`h-3 rounded-full ${i === 0 ? 'bg-[#00C49F]' : 'bg-blue-300'}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-gray-700 w-24 text-right shrink-0">{Math.round(h.taksit).toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
