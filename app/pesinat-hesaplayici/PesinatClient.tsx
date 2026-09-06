'use client';

import { useState, useMemo } from 'react';

export default function PesinatClient() {
  const [evFiyati, setEvFiyati] = useState(3000000);
  const [aylikGelir, setAylikGelir] = useState(60000);
  const [mevcutBirikim, setMevcutBirikim] = useState(300000);
  const [aylikTasarruf, setAylikTasarruf] = useState(15000);
  const [getiriOrani, setGetiriOrani] = useState(30);
  const [hedefPesinat, setHedefPesinat] = useState(20);

  const hesap = useMemo(() => {
    const hedefTutar = evFiyati * (hedefPesinat / 100);
    const eksik = Math.max(0, hedefTutar - mevcutBirikim);

    // Aylık bileşik birikim: ne kadar ayda hedefe ulaşılır?
    const aylikGetiri = getiriOrani / 100 / 12;
    let birikim = mevcutBirikim;
    let ay = 0;
    while (birikim < hedefTutar && ay < 600) {
      birikim = (birikim + aylikTasarruf) * (1 + aylikGetiri);
      ay++;
    }

    const yil = Math.floor(ay / 12);
    const kalanAy = ay % 12;

    const tasarrufOrani = (aylikTasarruf / aylikGelir) * 100;
    const krediTutari = evFiyati - hedefTutar;
    const krediMaliyet = krediTutari > 0 ? krediTutari * 0.035 * 12 : 0; // yaklaşık yıllık faiz

    // Hızlandırılmış senaryo: %50 daha fazla tasarruf
    let birikimHiz = mevcutBirikim;
    let ayHiz = 0;
    const aylikTasarrufHiz = aylikTasarruf * 1.5;
    while (birikimHiz < hedefTutar && ayHiz < 600) {
      birikimHiz = (birikimHiz + aylikTasarrufHiz) * (1 + aylikGetiri);
      ayHiz++;
    }

    return { hedefTutar, eksik, ay, yil, kalanAy, tasarrufOrani, krediTutari, krediMaliyet, ayHiz };
  }, [evFiyati, aylikGelir, mevcutBirikim, aylikTasarruf, getiriOrani, hedefPesinat]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Ev ve Birikim Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Ev Fiyatı (₺)</label>
            <input type="number" value={evFiyati} onChange={e => setEvFiyati(Number(e.target.value))} step={100000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Hedef Peşinat: %{hedefPesinat}</label>
            <input type="range" min={10} max={50} step={5} value={hedefPesinat} onChange={e => setHedefPesinat(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Gelir (₺)</label>
            <input type="number" value={aylikGelir} onChange={e => setAylikGelir(Number(e.target.value))} step={5000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mevcut Birikim (₺)</label>
            <input type="number" value={mevcutBirikim} onChange={e => setMevcutBirikim(Number(e.target.value))} step={10000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Tasarruf (₺)</label>
            <input type="number" value={aylikTasarruf} onChange={e => setAylikTasarruf(Number(e.target.value))} step={1000} min={0}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yıllık Getiri: %{getiriOrani}</label>
            <input type="range" min={10} max={60} step={5} value={getiriOrani} onChange={e => setGetiriOrani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Özet */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Hedef Peşinat', value: `${Math.round(hesap.hedefTutar).toLocaleString('tr-TR')} ₺`, sub: `%${hedefPesinat} oran` },
          { label: 'Eksik Tutar', value: `${Math.round(hesap.eksik).toLocaleString('tr-TR')} ₺`, sub: 'Birikimden sonra' },
          { label: 'Tahmini Süre', value: hesap.ay === 0 ? 'Hazır!' : `${hesap.yil}Y ${hesap.kalanAy}A`, sub: 'Mevcut hızla' },
          { label: 'Tasarruf Oranı', value: `%${hesap.tasarrufOrani.toFixed(0)}`, sub: 'Gelirin' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
            <p className="text-sm font-black text-[#00C49F]">{k.value}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Karşılaştırma */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Senaryo Karşılaştırması</h2>
        <div className="space-y-3">
          {[
            { label: 'Mevcut Hız', ay: hesap.ay, renk: 'bg-blue-400' },
            { label: '%50 Daha Fazla Tasarruf', ay: hesap.ayHiz, renk: 'bg-[#00C49F]' },
          ].map((s, i) => {
            const pct = hesap.ay > 0 ? Math.min((s.ay / hesap.ay) * 100, 100) : 0;
            const yil = Math.floor(s.ay / 12);
            const kalanAy = s.ay % 12;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-44 shrink-0">{s.label}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3">
                  <div className={`${s.renk} h-3 rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-gray-700 w-20 text-right shrink-0">{yil}Y {kalanAy}A</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black text-gray-500">Kredi Tutarı</span>
            <span className="text-xs font-black text-[#00C49F]">{Math.round(hesap.krediTutari).toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs font-black text-gray-500">Tahmini Yıllık Faiz</span>
            <span className="text-xs font-black text-rose-500">{Math.round(hesap.krediMaliyet).toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>
      </div>

    </div>
  );
}
