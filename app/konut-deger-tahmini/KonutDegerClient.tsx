'use client';

import { useState, useMemo } from 'react';

const SEHIR_M2: Record<string, number> = {
  'İstanbul — Avrupa Merkez': 90000,
  'İstanbul — Anadolu Merkez': 70000,
  'İstanbul — Çevre İlçeler': 45000,
  'Ankara — Merkez': 40000,
  'Ankara — Çevre': 25000,
  'İzmir — Merkez': 55000,
  'İzmir — Çevre': 30000,
  'Antalya — Merkez': 45000,
  'Antalya — Sahil': 60000,
  'Bursa': 30000,
  'Gaziantep': 20000,
  'Kocaeli': 28000,
  'Bodrum': 80000,
  'Muğla — Diğer': 40000,
};

const ODA_KATSAYI: Record<string, number> = {
  '1+0': 0.90,
  '1+1': 1.00,
  '2+1': 1.08,
  '3+1': 1.12,
  '4+1': 1.15,
  '4+2 ve üzeri': 1.10,
};

export default function KonutDegerClient() {
  const [sehir, setSehir] = useState('İstanbul — Anadolu Merkez');
  const [alan, setAlan] = useState(100);
  const [oda, setOda] = useState('2+1');
  const [binaYasi, setBinaYasi] = useState(10);
  const [kat, setKat] = useState(3);
  const [toplamKat, setToplamKat] = useState(8);
  const [asansor, setAsansor] = useState(true);
  const [otopark, setOtopark] = useState(false);
  const [bahce, setBahce] = useState(false);
  const [denizManzara, setDenizManzara] = useState(false);

  const hesap = useMemo(() => {
    const bazM2 = SEHIR_M2[sehir] ?? 30000;
    const odaKat = ODA_KATSAYI[oda] ?? 1.0;

    // Bina yaşı etkisi
    let yasKat = 1.0;
    if (binaYasi <= 2) yasKat = 1.20;
    else if (binaYasi <= 5) yasKat = 1.12;
    else if (binaYasi <= 10) yasKat = 1.05;
    else if (binaYasi <= 20) yasKat = 0.95;
    else if (binaYasi <= 30) yasKat = 0.85;
    else yasKat = 0.72;

    // Kat etkisi
    let katKat = 1.0;
    if (toplamKat >= 5) {
      if (kat === 1) katKat = 0.93;
      else if (kat === toplamKat) katKat = 1.05;
      else if (kat >= 3 && kat <= toplamKat - 1) katKat = 1.02;
    }

    // Ek özellikler
    let ozellikKat = 1.0;
    if (asansor) ozellikKat += 0.03;
    if (otopark) ozellikKat += 0.05;
    if (bahce) ozellikKat += 0.04;
    if (denizManzara) ozellikKat += 0.12;

    const hesaplananM2 = bazM2 * odaKat * yasKat * katKat * ozellikKat;
    const tahminiDeger = Math.round(hesaplananM2 * alan);
    const altSinir = Math.round(tahminiDeger * 0.85);
    const ustSinir = Math.round(tahminiDeger * 1.15);
    const m2Fiyat = Math.round(hesaplananM2);

    // Kira tahmini (brüt getiri %4–5)
    const tahminiKira = Math.round(tahminiDeger * 0.0038);

    return { tahminiDeger, altSinir, ustSinir, m2Fiyat, tahminiKira };
  }, [sehir, alan, oda, binaYasi, kat, toplamKat, asansor, otopark, bahce, denizManzara]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Konut Özellikleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Bölge</label>
            <select value={sehir} onChange={e => setSehir(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(SEHIR_M2).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Net Alan (m²)</label>
            <input type="number" value={alan} onChange={e => setAlan(Number(e.target.value))} step={5} min={30} max={500}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Oda Sayısı</label>
            <select value={oda} onChange={e => setOda(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(ODA_KATSAYI).map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Bina Yaşı: {binaYasi} Yıl</label>
            <input type="range" min={0} max={50} step={1} value={binaYasi} onChange={e => setBinaYasi(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Bulunduğu Kat: {kat}. Kat</label>
            <input type="range" min={1} max={toplamKat} step={1} value={kat} onChange={e => setKat(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Toplam Kat: {toplamKat}</label>
            <input type="range" min={2} max={30} step={1} value={toplamKat} onChange={e => { setToplamKat(Number(e.target.value)); if (kat > Number(e.target.value)) setKat(Number(e.target.value)); }}
              className="w-full accent-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <p className="text-xs font-black text-gray-700 mb-2">Ek Özellikler</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Asansör', value: asansor, set: setAsansor },
                { label: 'Otopark', value: otopark, set: setOtopark },
                { label: 'Bahçe/Teras', value: bahce, set: setBahce },
                { label: 'Deniz/Göl Manzarası', value: denizManzara, set: setDenizManzara },
              ].map((o, i) => (
                <button key={i} onClick={() => o.set(!o.value)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full border transition-colors ${o.value ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-5">Tahmini Değer</h2>
        <div className="text-center mb-6">
          <p className="text-[10px] text-gray-500 mb-1">Tahmini Piyasa Değeri</p>
          <p className="text-3xl font-black text-[#00C49F]">{hesap.tahminiDeger.toLocaleString('tr-TR')} ₺</p>
          <p className="text-[10px] text-gray-400 mt-1">Aralık: {hesap.altSinir.toLocaleString('tr-TR')} – {hesap.ustSinir.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Tahmini ₺/m²', value: `${hesap.m2Fiyat.toLocaleString('tr-TR')} ₺` },
            { label: 'Tahmini Aylık Kira', value: `${hesap.tahminiKira.toLocaleString('tr-TR')} ₺` },
            { label: 'Brüt Kira Getirisi', value: `%${((hesap.tahminiKira * 12 / hesap.tahminiDeger) * 100).toFixed(2)}` },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className="text-sm font-black text-gray-900">{k.value}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-4 text-center">
          Bu tahmin istatistiksel bir model olup gerçek değerlemeler ekspertiz, lokasyon detayı ve piyasa koşullarına göre farklılık gösterir.
        </p>
      </div>

    </div>
  );
}
