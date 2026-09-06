'use client';

import { useState, useMemo } from 'react';

const ISITMA_TIPI: Record<string, number> = {
  'Doğalgaz Kombi': 120,
  'Merkezi Isıtma': 140,
  'Elektrikli Isıtma': 200,
  'Isı Pompası': 70,
  'Soba/Katı Yakıt': 180,
};

const YALITIM_TIPI: Record<string, number> = {
  'A+ (Yüksek)': 0.65,
  'A (İyi)': 0.80,
  'B (Orta)': 1.00,
  'C (Zayıf)': 1.30,
  'D (Çok Zayıf)': 1.60,
};

const EKB_SINIFLARI = [
  { sinif: 'A+', maks: 50, renk: 'bg-emerald-500', text: 'text-white' },
  { sinif: 'A', maks: 75, renk: 'bg-green-500', text: 'text-white' },
  { sinif: 'B', maks: 100, renk: 'bg-lime-500', text: 'text-white' },
  { sinif: 'C', maks: 125, renk: 'bg-yellow-400', text: 'text-gray-900' },
  { sinif: 'D', maks: 160, renk: 'bg-orange-400', text: 'text-white' },
  { sinif: 'E', maks: 200, renk: 'bg-orange-600', text: 'text-white' },
  { sinif: 'F', maks: 250, renk: 'bg-red-500', text: 'text-white' },
  { sinif: 'G', maks: 9999, renk: 'bg-red-700', text: 'text-white' },
];

export default function EnerjiVerimliligiClient() {
  const [alan, setAlan] = useState(100);
  const [isitmaTipi, setIsitmaTipi] = useState('Doğalgaz Kombi');
  const [yalitim, setYalitim] = useState('B (Orta)');
  const [pencereAdet, setPencereAdet] = useState(8);
  const [catVar, setCatVar] = useState(false);
  const [dogalgazFiyat, setDogalgazFiyat] = useState(12.5);

  const sonuc = useMemo(() => {
    const temelTuketim = ISITMA_TIPI[isitmaTipi] ?? 120;
    const yalitimKatsayi = YALITIM_TIPI[yalitim] ?? 1.0;
    const pencereKatsayi = 1 + (pencereAdet - 6) * 0.015;
    const catKatsayi = catVar ? 0.90 : 1.0;

    const isitmaTuketim = temelTuketim * yalitimKatsayi * pencereKatsayi * catKatsayi;
    const sicakSuTuketim = 25;
    const aydinlatmaTuketim = 10;
    const toplamKwh = (isitmaTuketim + sicakSuTuketim + aydinlatmaTuketim) * alan / 100;

    const yillikMaliyet = toplamKwh * dogalgazFiyat * 0.8;
    const aylikMaliyet = yillikMaliyet / 12;

    const ekbSinifi = EKB_SINIFLARI.find(s => toplamKwh <= s.maks) ?? EKB_SINIFLARI[EKB_SINIFLARI.length - 1];

    const iyilestirmeKazanim = toplamKwh * 0.25;
    const iyilestirmeMaliyet = iyilestirmeKazanim * dogalgazFiyat * 0.8;

    return { toplamKwh: Math.round(toplamKwh), yillikMaliyet: Math.round(yillikMaliyet), aylikMaliyet: Math.round(aylikMaliyet), ekbSinifi, iyilestirmeKazanim: Math.round(iyilestirmeKazanim), iyilestirmeMaliyet: Math.round(iyilestirmeMaliyet) };
  }, [alan, isitmaTipi, yalitim, pencereAdet, catVar, dogalgazFiyat]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Konut Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Net Alan (m²): {alan}</label>
            <input type="range" min={40} max={400} step={10} value={alan} onChange={e => setAlan(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400"><span>40 m²</span><span>400 m²</span></div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Isıtma Sistemi</label>
            <select value={isitmaTipi} onChange={e => setIsitmaTipi(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00C49F]">
              {Object.keys(ISITMA_TIPI).map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2">Yalıtım Kalitesi</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(YALITIM_TIPI).map(k => (
                <button key={k} onClick={() => setYalitim(k)}
                  className={`text-[9px] font-black px-2.5 py-1 rounded-full border transition-colors ${yalitim === k ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'border-gray-200 text-gray-500 hover:border-[#00C49F]'}`}>
                  {k}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Pencere Sayısı: {pencereAdet}</label>
            <input type="range" min={2} max={20} step={1} value={pencereAdet} onChange={e => setPencereAdet(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400"><span>2</span><span>20</span></div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setCatVar(!catVar)}
              className={`relative w-10 h-5 rounded-full transition-colors ${catVar ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${catVar ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-[11px] font-black text-gray-700">Çatı Yalıtımı Var</span>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Enerji Birim Fiyatı (₺/kWh): {dogalgazFiyat}</label>
            <input type="number" step={0.5} value={dogalgazFiyat} onChange={e => setDogalgazFiyat(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Enerji Analizi Sonucu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Yıllık Tüketim</p>
            <p className="text-sm font-black text-gray-900">{sonuc.toplamKwh} kWh/m²</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Yıllık Maliyet</p>
            <p className="text-sm font-black text-rose-500">{sonuc.yillikMaliyet.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Aylık Ortalama</p>
            <p className="text-sm font-black text-gray-900">{sonuc.aylikMaliyet.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className={`${sonuc.ekbSinifi.renk} rounded-xl p-4 text-center`}>
            <p className={`text-[10px] mb-1 ${sonuc.ekbSinifi.text} opacity-80`}>EKB Sınıfı</p>
            <p className={`text-2xl font-black ${sonuc.ekbSinifi.text}`}>{sonuc.ekbSinifi.sinif}</p>
          </div>
        </div>

        {/* EKB Ölçeği */}
        <div className="space-y-1.5">
          {EKB_SINIFLARI.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`text-[9px] font-black w-6 text-center py-0.5 rounded ${s.renk} ${s.text}`}>{s.sinif}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                <div className={`${s.renk} h-2.5 rounded-full transition-all`}
                  style={{ width: `${Math.min((s.maks / 250) * 100, 100)}%` }} />
              </div>
              <span className="text-[9px] text-gray-400 w-20 text-right">≤{s.maks < 9999 ? s.maks : '250+'} kWh/m²</span>
              {s.sinif === sonuc.ekbSinifi.sinif && (
                <span className="text-[9px] font-black text-[#00C49F]">← Sizin</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* İyileştirme Tavsiyesi */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
        <p className="text-xs font-black text-emerald-700 mb-2">%25 Tasarruf Potansiyeli</p>
        <p className="text-[11px] text-emerald-600 leading-relaxed">
          Yalıtım iyileştirmesi ile yıllık yaklaşık <strong>{sonuc.iyilestirmeKazanim} kWh/m²</strong> tasarruf sağlanabilir.
          Bu, yıllık <strong>{sonuc.iyilestirmeMaliyet.toLocaleString('tr-TR')} ₺</strong> maliyet düşüşü anlamına gelir.
          Dış cephe yalıtımı, çift cam ve kombi değişimi en yüksek geri dönüşü sağlayan yatırımlardır.
        </p>
      </div>

    </div>
  );
}
