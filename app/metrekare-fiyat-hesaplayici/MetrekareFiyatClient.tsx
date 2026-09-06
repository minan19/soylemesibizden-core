'use client';

import { useState, useMemo } from 'react';

const SEHIR_M2: Record<string, number> = {
  'İstanbul — Avrupa Merkez': 90000,
  'İstanbul — Anadolu Merkez': 70000,
  'İstanbul — Çevre': 25000,
  'Ankara — Çankaya': 30000,
  'Ankara — Ortalama': 14000,
  'İzmir — Merkez': 30000,
  'Antalya — Merkez': 35000,
  'Bodrum': 70000,
  'Bursa': 15000,
  'Diğer Şehirler': 10000,
};

export default function MetrekareFiyatClient() {
  const [toplam, setToplam] = useState(5000000);
  const [alan, setAlan] = useState(100);
  const [karsilastirmaBolge, setKarsilastirmaBolge] = useState('Ankara — Ortalama');

  const hesap = useMemo(() => {
    const hesaplananM2 = toplam / alan;
    const bolgeM2 = SEHIR_M2[karsilastirmaBolge] ?? 10000;
    const fark = hesaplananM2 - bolgeM2;
    const farkYuzde = (fark / bolgeM2) * 100;

    const siralanmis = Object.entries(SEHIR_M2)
      .map(([sehir, m2]) => ({ sehir, m2, farkBizden: ((hesaplananM2 - m2) / m2) * 100 }))
      .sort((a, b) => Math.abs(a.farkBizden) - Math.abs(b.farkBizden));

    return { hesaplananM2, bolgeM2, fark, farkYuzde, siralanmis };
  }, [toplam, alan, karsilastirmaBolge]);

  const maxM2 = Math.max(...Object.values(SEHIR_M2));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Girişler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Konut Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Toplam Fiyat (₺)</label>
            <input type="number" value={toplam} onChange={e => setToplam(Number(e.target.value))} step={100000} min={100000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Brüt Alan (m²)</label>
            <input type="number" value={alan} onChange={e => setAlan(Number(e.target.value))} step={5} min={20}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Karşılaştırma Bölgesi</label>
            <select value={karsilastirmaBolge} onChange={e => setKarsilastirmaBolge(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(SEHIR_M2).map(s => <option key={s} value={s}>{s} — {SEHIR_M2[s].toLocaleString('tr-TR')} ₺/m²</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-2">₺/m² Analizi</h2>

        <div className="text-center py-4 rounded-xl bg-gray-50 mb-5">
          <p className="text-[10px] text-gray-500 mb-1">Hesaplanan ₺/m² Değeri</p>
          <p className="text-3xl font-black text-[#00C49F]">{Math.round(hesap.hesaplananM2).toLocaleString('tr-TR')} ₺/m²</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Bölge Piyasası</p>
            <p className="text-xs font-black text-blue-500">{hesap.bolgeM2.toLocaleString('tr-TR')} ₺/m²</p>
          </div>
          <div className={`rounded-xl p-3 text-center ${hesap.fark > 0 ? 'bg-rose-50' : 'bg-emerald-50'}`}>
            <p className="text-[10px] text-gray-500 mb-1">Fark</p>
            <p className={`text-xs font-black ${hesap.fark > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
              {hesap.fark > 0 ? '+' : ''}{Math.round(hesap.fark).toLocaleString('tr-TR')} ₺
            </p>
          </div>
          <div className={`rounded-xl p-3 text-center ${hesap.farkYuzde > 15 ? 'bg-rose-50' : hesap.farkYuzde < -15 ? 'bg-emerald-50' : 'bg-amber-50'}`}>
            <p className="text-[10px] text-gray-500 mb-1">Piyasa Farkı</p>
            <p className={`text-xs font-black ${hesap.farkYuzde > 15 ? 'text-rose-500' : hesap.farkYuzde < -15 ? 'text-emerald-600' : 'text-amber-500'}`}>
              {hesap.farkYuzde > 0 ? '+' : ''}{hesap.farkYuzde.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className={`rounded-xl px-4 py-3 ${Math.abs(hesap.farkYuzde) <= 15 ? 'bg-amber-50 text-amber-700' : hesap.farkYuzde > 15 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
          <p className="text-[11px] font-bold">
            {Math.abs(hesap.farkYuzde) <= 15
              ? `Seçilen bölge piyasa ortalamasına göre dengeli fiyatlanmış (%${Math.abs(hesap.farkYuzde).toFixed(1)} sapma).`
              : hesap.farkYuzde > 15
                ? `Seçilen bölge piyasa ortalamasının %${hesap.farkYuzde.toFixed(1)} üzerinde — piyasanın üzerinde fiyatlı.`
                : `Seçilen bölge piyasa ortalamasının %${Math.abs(hesap.farkYuzde).toFixed(1)} altında — piyasanın altında fiyatlı.`
            }
          </p>
        </div>
      </div>

      {/* Şehir Karşılaştırması */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Tüm Bölgelerle Karşılaştırma</h2>
        <div className="space-y-2">
          {Object.entries(SEHIR_M2).map(([s, m2]) => {
            const pct = (m2 / maxM2) * 100;
            const isYours = Math.abs(hesap.hesaplananM2 - m2) / m2 < 0.15;
            return (
              <div key={s} className="flex items-center gap-3">
                <span className={`text-[10px] font-black w-40 shrink-0 ${isYours ? 'text-[#00C49F]' : 'text-gray-500'}`}>{s}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className={`text-[10px] font-black w-24 text-right shrink-0 ${isYours ? 'text-[#00C49F]' : 'text-gray-600'}`}>{m2.toLocaleString('tr-TR')} ₺</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00C49F]" />
          <span className="text-[10px] text-gray-400">Hesaplanan değerinizle benzer bölgeler yeşil renkte vurgulanır.</span>
        </div>
      </div>

    </div>
  );
}
