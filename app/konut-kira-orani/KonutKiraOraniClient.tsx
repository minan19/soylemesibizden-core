'use client';

import { useState, useMemo } from 'react';

const SEHIR_VERILERI = [
  { sehir: 'İstanbul', ortKira: 28000, ortFiyat: 7500000, getiri: 4.5 },
  { sehir: 'İzmir', ortKira: 20000, ortFiyat: 5000000, getiri: 4.8 },
  { sehir: 'Ankara', ortKira: 15000, ortFiyat: 3500000, getiri: 5.1 },
  { sehir: 'Antalya', ortKira: 22000, ortFiyat: 5500000, getiri: 4.8 },
  { sehir: 'Bursa', ortKira: 14000, ortFiyat: 3000000, getiri: 5.6 },
  { sehir: 'Muğla', ortKira: 30000, ortFiyat: 8000000, getiri: 4.5 },
];

export default function KonutKiraOraniClient() {
  const [konutFiyati, setKonutFiyati] = useState(5000000);
  const [aylikKira, setAylikKira] = useState(20000);
  const [yillikGider, setYillikGider] = useState(15000);
  const [bos, setBos] = useState(1);

  const sonuc = useMemo(() => {
    const yillikBrutKira = aylikKira * (12 - bos);
    const yillikNetKira = yillikBrutKira - yillikGider;
    const brutGetiri = konutFiyati > 0 ? (yillikBrutKira / konutFiyati) * 100 : 0;
    const netGetiri = konutFiyati > 0 ? (yillikNetKira / konutFiyati) * 100 : 0;
    const amortismanYili = netGetiri > 0 ? 100 / netGetiri : 0;
    const kiraSatisOran = aylikKira > 0 ? konutFiyati / aylikKira : 0;
    return { yillikBrutKira, yillikNetKira, brutGetiri, netGetiri, amortismanYili, kiraSatisOran };
  }, [konutFiyati, aylikKira, yillikGider, bos]);

  const getRenkClass = (getiri: number) => {
    if (getiri >= 6) return 'text-emerald-600';
    if (getiri >= 4.5) return 'text-[#00C49F]';
    if (getiri >= 3) return 'text-amber-500';
    return 'text-rose-500';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Konut Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Konut Değeri (₺)</label>
            <input type="number" value={konutFiyati} onChange={e => setKonutFiyati(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[2000000, 3500000, 5000000, 8000000].map(v => (
                <button key={v} onClick={() => setKonutFiyati(v)}
                  className={`text-[9px] font-black px-2 py-1 rounded-full border transition-colors ${konutFiyati === v ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'border-gray-200 text-gray-500 hover:border-[#00C49F]'}`}>
                  {(v / 1000000).toFixed(1)}M ₺
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[10000, 15000, 20000, 30000].map(v => (
                <button key={v} onClick={() => setAylikKira(v)}
                  className={`text-[9px] font-black px-2 py-1 rounded-full border transition-colors ${aylikKira === v ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'border-gray-200 text-gray-500 hover:border-[#00C49F]'}`}>
                  {v.toLocaleString('tr-TR')} ₺
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Yıllık Gider (aidat, vergi, bakım) (₺)</label>
            <input type="number" value={yillikGider} onChange={e => setYillikGider(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Ortalama Boş Kalma (ay/yıl): {bos}</label>
            <input type="range" min={0} max={6} step={0.5} value={bos} onChange={e => setBos(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1"><span>0 ay</span><span>6 ay</span></div>
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Analiz Sonuçları</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Yıllık Brüt Kira</p>
            <p className="text-sm font-black text-gray-900">{sonuc.yillikBrutKira.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Yıllık Net Kira</p>
            <p className="text-sm font-black text-gray-900">{sonuc.yillikNetKira.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Kira/Satış Oranı</p>
            <p className="text-sm font-black text-gray-900">{Math.round(sonuc.kiraSatisOran)} ay</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Brüt Getiri</p>
            <p className={`text-sm font-black ${getRenkClass(sonuc.brutGetiri)}`}>%{sonuc.brutGetiri.toFixed(2)}</p>
          </div>
          <div className="bg-[#00C49F] rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/80 mb-1">Net Getiri</p>
            <p className="text-sm font-black text-white">%{sonuc.netGetiri.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Amortisman</p>
            <p className={`text-sm font-black ${getRenkClass(sonuc.netGetiri)}`}>{sonuc.amortismanYili.toFixed(1)} yıl</p>
          </div>
        </div>
      </div>

      {/* Şehir Karşılaştırması */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-base font-black text-gray-900 mb-1">Şehir Bazlı Getiri Karşılaştırması</h2>
        <p className="text-xs text-gray-400 mb-5">2024 yılı ortalama piyasa verileri (brüt kira getirisi).</p>
        <table className="w-full text-[10px] min-w-[440px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Şehir</th>
              <th className="text-center py-2 font-black text-gray-500">Ort. Kira</th>
              <th className="text-center py-2 font-black text-gray-500">Ort. Fiyat</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Brüt Getiri</th>
            </tr>
          </thead>
          <tbody>
            {SEHIR_VERILERI.map((s, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-0">
                <td className="py-2 font-black text-gray-900">{s.sehir}</td>
                <td className="py-2 text-center font-bold text-gray-600">{s.ortKira.toLocaleString('tr-TR')} ₺/ay</td>
                <td className="py-2 text-center font-bold text-gray-600">{(s.ortFiyat / 1000000).toFixed(1)}M ₺</td>
                <td className={`py-2 text-right font-black ${getRenkClass(s.getiri)}`}>%{s.getiri.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
        <p className="text-xs font-black text-emerald-700 mb-2">Değerlendirme Kriterleri</p>
        <p className="text-[11px] text-emerald-600 leading-relaxed">
          Gayrimenkul yatırımında %5 üzeri net getiri güçlü, %3-5 arası kabul edilebilir, %3 altı zayıf sayılır. Amortisman 20 yılın altındaysa yatırım avantajlı olarak değerlendirilir. Kira/satış oranı 200 ayın altında olan konutlar genel olarak cazip yatırım profili sunar.
        </p>
      </div>

    </div>
  );
}
