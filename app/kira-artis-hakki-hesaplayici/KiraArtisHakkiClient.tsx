'use client';

import { useState, useMemo } from 'react';

const TUFE_AYLIK: Record<string, number> = {
  'Ocak 2024': 6.70,
  'Şubat 2024': 4.53,
  'Mart 2024': 3.16,
  'Nisan 2024': 3.18,
  'Mayıs 2024': 3.37,
  'Haziran 2024': 1.64,
  'Temmuz 2024': 3.23,
  'Ağustos 2024': 2.47,
  'Eylül 2024': 2.97,
  'Ekim 2024': 2.88,
  'Kasım 2024': 2.24,
  'Aralık 2024': 1.03,
  'Ocak 2025': 5.28,
  'Şubat 2025': 2.27,
  'Mart 2025': 2.46,
  'Nisan 2025': 3.00,
  'Mayıs 2025': 1.60,
  'Haziran 2025': 1.38,
  'Temmuz 2025': 2.68,
  'Ağustos 2025': 2.05,
};

const AYLAR = Object.keys(TUFE_AYLIK);

function yillikTufe(baslangicAy: string): number {
  const idx = AYLAR.indexOf(baslangicAy);
  if (idx < 0) return 0;
  const dilim = AYLAR.slice(Math.max(0, idx - 11), idx + 1);
  let carpim = 1;
  for (const ay of dilim) {
    carpim *= (1 + TUFE_AYLIK[ay] / 100);
  }
  return (carpim - 1) * 100;
}

export default function KiraArtisHakkiClient() {
  const [mevcutKira, setMevcutKira] = useState(15000);
  const [referansAy, setReferansAy] = useState('Ağustos 2025');
  const [tavanUygula, setTavanUygula] = useState(true);
  const [yenilemeAyi, setYenilemeAyi] = useState(12);

  const hesap = useMemo(() => {
    const tufeTutar = yillikTufe(referansAy);
    const tavan = 25;
    const uygulanacakOran = tavanUygula ? Math.min(tufeTutar, tavan) : tufeTutar;
    const artis = mevcutKira * (uygulanacakOran / 100);
    const yeniKira = mevcutKira + artis;
    const tavanKira = mevcutKira * 1.25;
    const tavanAsiyor = tufeTutar > tavan;

    return { tufeTutar, uygulanacakOran, artis, yeniKira, tavanKira, tavanAsiyor };
  }, [mevcutKira, referansAy, tavanUygula]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Girişler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Artışı Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mevcut Aylık Kira (₺)</label>
            <input type="number" value={mevcutKira} onChange={e => setMevcutKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Referans TÜİK TÜFE Ayı</label>
            <select value={referansAy} onChange={e => setReferansAy(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {AYLAR.map(ay => <option key={ay} value={ay}>{ay} (%{TUFE_AYLIK[ay].toFixed(2)} aylık)</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yenileme Ayı (kaçıncı ay)</label>
            <div className="flex gap-2 flex-wrap">
              {[3, 6, 9, 12].map(a => (
                <button key={a} onClick={() => setYenilemeAyi(a)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full border transition-colors ${yenilemeAyi === a ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {a}. ay
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setTavanUygula(p => !p)}
              className={`relative w-10 h-5 rounded-full transition-colors ${tavanUygula ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow ${tavanUygula ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <label className="text-xs font-black text-gray-700 cursor-pointer" onClick={() => setTavanUygula(p => !p)}>
              %25 Yasal Tavan Uygula (7409 sayılı Kanun)
            </label>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Hesaplama Sonucu</h2>

        {hesap.tavanAsiyor && tavanUygula && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-[11px] text-amber-700 font-black">
              ⚠ TÜFE yıllık artışı %{hesap.tufeTutar.toFixed(2)} ile %25 tavanın üzerinde. 7409 sayılı Kanun kapsamında tavan uygulanıyor.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Yıllık TÜFE (12 aylık)', value: `%${hesap.tufeTutar.toFixed(2)}`, color: 'text-blue-500' },
            { label: 'Uygulanan Artış Oranı', value: `%${hesap.uygulanacakOran.toFixed(2)}`, color: 'text-[#00C49F]' },
            { label: 'Artış Tutarı', value: `${Math.round(hesap.artis).toLocaleString('tr-TR')} ₺`, color: 'text-amber-500' },
            { label: 'Mevcut Kira', value: `${mevcutKira.toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
            { label: 'Yeni Kira (%25 tavan)', value: `${Math.round(hesap.tavanKira).toLocaleString('tr-TR')} ₺`, color: 'text-rose-500' },
            { label: 'Hesaplanan Yeni Kira', value: `${Math.round(hesap.yeniKira).toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]' },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>

        {/* Görsel bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-500 w-28 shrink-0">Mevcut Kira</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div className="bg-gray-400 h-3 rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] font-black text-gray-600 w-24 text-right shrink-0">{mevcutKira.toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-500 w-28 shrink-0">Yeni Kira</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div className="bg-[#00C49F] h-3 rounded-full" style={{ width: `${Math.min((hesap.yeniKira / (mevcutKira * 1.5)) * 100, 100)}%` }} />
            </div>
            <span className="text-[10px] font-black text-[#00C49F] w-24 text-right shrink-0">{Math.round(hesap.yeniKira).toLocaleString('tr-TR')} ₺</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-gray-500 w-28 shrink-0">%25 Tavan</span>
            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div className="bg-rose-400 h-3 rounded-full" style={{ width: `${Math.min((hesap.tavanKira / (mevcutKira * 1.5)) * 100, 100)}%` }} />
            </div>
            <span className="text-[10px] font-black text-rose-500 w-24 text-right shrink-0">{Math.round(hesap.tavanKira).toLocaleString('tr-TR')} ₺</span>
          </div>
        </div>
      </div>

      {/* Yasal bilgi */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-black text-blue-700 mb-2">📋 Yasal Dayanak</p>
        <ul className="space-y-1 text-[11px] text-blue-600">
          <li>• <strong>7409 sayılı Kanun:</strong> Konut kiralarında yıllık artış %25 ile sınırlandırılmıştır (geçici madde).</li>
          <li>• Artış oranı, sözleşmenin yenileneceği aydan bir önceki 12 aylık TÜFE ortalamasıdır.</li>
          <li>• Taraflar daha düşük oran kararlaştırabilir; daha yüksek oran kararlaştıramazlar.</li>
          <li>• Kiracı, yasal sınırı aşan artışı mahkeme yoluyla iptal ettirebilir.</li>
          <li>• İşyeri kiraları bu sınıra tabi değildir; sözleşme serbestisi geçerlidir.</li>
        </ul>
      </div>

    </div>
  );
}
