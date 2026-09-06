'use client';

import { useState, useMemo } from 'react';

// TÜİK TÜFE 12 aylık ortalama değişim (yıllık bazda, aylık)
const TUFE_2025: Record<string, number> = {
  'Ocak 2025': 42.12,
  'Şubat 2025': 39.05,
  'Mart 2025': 38.10,
  'Nisan 2025': 37.86,
  'Mayıs 2025': 35.20,
  'Haziran 2025': 33.92,
  'Temmuz 2025': 31.88,
  'Ağustos 2025': 28.52,
};

const TUFE_2024: Record<string, number> = {
  'Ocak 2024': 64.86,
  'Şubat 2024': 67.07,
  'Mart 2024': 68.50,
  'Nisan 2024': 69.80,
  'Mayıs 2024': 75.45,
  'Haziran 2024': 71.60,
  'Temmuz 2024': 61.78,
  'Ağustos 2024': 52.00,
  'Eylül 2024': 49.38,
  'Ekim 2024': 48.58,
  'Kasım 2024': 47.09,
  'Aralık 2024': 44.38,
};

const TUM_AYLAR = [...Object.keys(TUFE_2025), ...Object.keys(TUFE_2024)];
const TUM_TUFE: Record<string, number> = { ...TUFE_2025, ...TUFE_2024 };

export default function KiraArtis2025Client() {
  const [mevcutKira, setMevcutKira] = useState(15000);
  const [sozlesmeAyi, setSozlesmeAyi] = useState('Ocak 2025');
  const [tavanUygula, setTavanUygula] = useState(false);
  const [tavan, setTavan] = useState(25);

  const sonuc = useMemo(() => {
    const tufeOran = TUM_TUFE[sozlesmeAyi] ?? 0;
    const uygulanacakOran = tavanUygula ? Math.min(tufeOran, tavan) : tufeOran;
    const artisKira = Math.round(mevcutKira * uygulanacakOran / 100);
    const yeniKira = mevcutKira + artisKira;
    return { tufeOran, uygulanacakOran, artisKira, yeniKira };
  }, [mevcutKira, sozlesmeAyi, tavanUygula, tavan]);

  const kategori2025 = Object.keys(TUFE_2025);
  const kategori2024 = Object.keys(TUFE_2024);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Hesaplama Parametreleri</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Mevcut Aylık Kira (₺)</label>
            <input
              type="number"
              value={mevcutKira}
              onChange={e => setMevcutKira(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Sözleşme Yenileme Ayı</label>
            <select value={sozlesmeAyi} onChange={e => setSozlesmeAyi(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-[#00C49F]">
              <optgroup label="2025">
                {kategori2025.map(ay => (
                  <option key={ay} value={ay}>{ay} — %{TUFE_2025[ay].toFixed(2)}</option>
                ))}
              </optgroup>
              <optgroup label="2024">
                {kategori2024.map(ay => (
                  <option key={ay} value={ay}>{ay} — %{TUFE_2024[ay].toFixed(2)}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => setTavanUygula(!tavanUygula)}
            className={`relative w-10 h-5 rounded-full transition-colors ${tavanUygula ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${tavanUygula ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
          <span className="text-[11px] font-black text-gray-700">Tavan Oranı Uygula</span>
          {tavanUygula && (
            <div className="flex items-center gap-2 ml-2">
              <input type="number" value={tavan} onChange={e => setTavan(Number(e.target.value))} min={1} max={100}
                className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold text-center focus:outline-none focus:border-[#00C49F]" />
              <span className="text-[10px] text-gray-500">%</span>
            </div>
          )}
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Hesaplama Sonucu</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">TÜFE Oranı</p>
            <p className="text-lg font-black text-gray-900">%{sonuc.tufeOran.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Uygulanan Oran</p>
            <p className="text-lg font-black text-[#00C49F]">%{sonuc.uygulanacakOran.toFixed(2)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Artış Tutarı</p>
            <p className="text-lg font-black text-rose-500">+{sonuc.artisKira.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-[#00C49F] rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/80 mb-1">Yeni Kira</p>
            <p className="text-lg font-black text-white">{sonuc.yeniKira.toLocaleString('tr-TR')} ₺</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-100 rounded-full h-3">
          <div className="bg-[#00C49F] h-3 rounded-full transition-all" style={{ width: `${Math.min(sonuc.uygulanacakOran, 100)}%` }} />
        </div>
        <p className="text-[10px] text-gray-400 mt-1 text-center">Artış oranı görselleştirmesi (maks. %100 ekranı)</p>
      </div>

      {/* TÜFE Tablosu */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-base font-black text-gray-900 mb-1">2025 Yılı TÜFE Değerleri</h2>
        <p className="text-xs text-gray-400 mb-5">TÜİK 12 aylık ortalama değişim — kira artış hesabında esas alınan değer.</p>
        <table className="w-full text-[10px] min-w-[300px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Ay</th>
              <th className="text-center py-2 font-black text-gray-500">12 Ay Ort. TÜFE</th>
              <th className="text-right py-2 font-black text-gray-500">1.000 ₺ Kira İçin Artış</th>
            </tr>
          </thead>
          <tbody>
            {TUM_AYLAR.slice(0, 8).map((ay, i) => (
              <tr key={i} className={`border-b border-gray-50 last:border-0 ${ay === sozlesmeAyi ? 'bg-[#00C49F]/5' : ''}`}>
                <td className="py-2 font-black text-gray-900">{ay}</td>
                <td className="py-2 text-center font-bold text-[#00C49F]">%{TUM_TUFE[ay].toFixed(2)}</td>
                <td className="py-2 text-right font-bold text-gray-600">+{Math.round(1000 * TUM_TUFE[ay] / 100).toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <p className="text-xs font-black text-amber-700 mb-2">Yasal Dayanak (TBK md. 344)</p>
        <p className="text-[11px] text-amber-600 leading-relaxed">
          Türk Borçlar Kanunu md. 344 uyarınca konut kiralarında yıllık artış oranı, bir önceki kira yılında gerçekleşen tüketici fiyat endeksinin 12 aylık ortalamalarına göre değişim oranını aşamaz. Taraflar bu oranın üzerinde artış kararlaştıramaz; aksi hüküm geçersizdir.
        </p>
      </div>

    </div>
  );
}
