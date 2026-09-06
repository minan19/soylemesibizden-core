'use client';

import { useState, useMemo } from 'react';

const SEHIR_TAVAN: Record<string, number> = {
  'İstanbul': 45000,
  'Ankara': 18000,
  'İzmir': 22000,
  'Antalya': 20000,
  'Bursa': 12000,
  'Diğer': 8000,
};

const YIL_TUFE: Record<number, number> = {
  2020: 14.6,
  2021: 19.6,
  2022: 64.3,
  2023: 64.8,
  2024: 47.1,
};

export default function KiraTespitClient() {
  const [mevcutKira, setMevcutKira] = useState(15000);
  const [sozlesmeTarihi, setSozlesmeTarihi] = useState(2020);
  const [sehir, setSehir] = useState('İstanbul');
  const [daireM2, setDaireM2] = useState(100);
  const [guncelM2Deger, setGuncelM2Deger] = useState(25000);

  const hesap = useMemo(() => {
    const tavanM2 = SEHIR_TAVAN[sehir] ?? 8000;
    const piyasaKiraOran = 0.004; // ~%4.8 yıllık / 12
    const piyasaKira = tavanM2 * daireM2 * piyasaKiraOran;

    // Compound TUFE from sözleşme yılına kadar
    let birikimliTufe = 1;
    for (let y = sozlesmeTarihi; y < 2025; y++) {
      const oran = YIL_TUFE[y] ?? 50;
      birikimliTufe *= (1 + oran / 100);
    }

    const tufeyeGoreBeklenen = mevcutKira * birikimliTufe;
    const fark = piyasaKira - mevcutKira;
    const farkYuzde = (fark / mevcutKira) * 100;
    const davaOlasiligiSkoru = Math.min(100, Math.max(0,
      (farkYuzde > 100 ? 90 : farkYuzde > 50 ? 70 : farkYuzde > 25 ? 45 : 20)
    ));

    // %25 tavan uygulaması (2022+ yasal düzenleme)
    const yasal25Artis = mevcutKira * 1.25;

    return { tavanM2, piyasaKira, fark, farkYuzde, birikimliTufe, tufeyeGoreBeklenen, davaOlasiligiSkoru, yasal25Artis };
  }, [mevcutKira, sozlesmeTarihi, sehir, daireM2, guncelM2Deger]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Mevcut Aylık Kira (₺)</label>
            <input type="number" value={mevcutKira} onChange={e => setMevcutKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Sözleşme Başlangıç Yılı</label>
            <select value={sozlesmeTarihi} onChange={e => setSozlesmeTarihi(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {[2020, 2021, 2022, 2023, 2024].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Şehir</label>
            <select value={sehir} onChange={e => setSehir(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              {Object.keys(SEHIR_TAVAN).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Daire Alan (m²)</label>
            <input type="number" value={daireM2} onChange={e => setDaireM2(Number(e.target.value))} step={5} min={30}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
        </div>
      </div>

      {/* Sonuç Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Mevcut Kira</p>
          <p className="text-sm font-black text-gray-900">{mevcutKira.toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Piyasa Kirası</p>
          <p className="text-sm font-black text-[#00C49F]">{Math.round(hesap.piyasaKira).toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className={`rounded-2xl border p-4 text-center shadow-sm ${hesap.fark > 0 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
          <p className="text-[10px] text-gray-500 mb-1">Fark</p>
          <p className={`text-sm font-black ${hesap.fark > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {hesap.fark > 0 ? '+' : ''}{Math.round(hesap.fark).toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">%25 Tavan</p>
          <p className="text-sm font-black text-amber-500">{Math.round(hesap.yasal25Artis).toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>

      {/* Dava Olasılığı */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Tespit Davası Analizi</h2>

        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-500">Dava Gereklilik Skoru</span>
            <span className={`text-xs font-black ${hesap.davaOlasiligiSkoru >= 70 ? 'text-rose-600' : hesap.davaOlasiligiSkoru >= 45 ? 'text-amber-500' : 'text-emerald-600'}`}>
              {hesap.davaOlasiligiSkoru}/100
            </span>
          </div>
          <div className="bg-gray-100 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${hesap.davaOlasiligiSkoru >= 70 ? 'bg-rose-500' : hesap.davaOlasiligiSkoru >= 45 ? 'bg-amber-400' : 'bg-emerald-500'}`}
              style={{ width: `${hesap.davaOlasiligiSkoru}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 mb-1">TÜFE Birikimi ({sozlesmeTarihi}→2025)</p>
            <p className="text-xs font-black text-gray-900">%{((hesap.birikimliTufe - 1) * 100).toFixed(1)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 mb-1">TÜFE&apos;ye Göre Beklenen</p>
            <p className="text-xs font-black text-blue-500">{Math.round(hesap.tufeyeGoreBeklenen).toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] text-gray-500 mb-1">Piyasa Farkı</p>
            <p className={`text-xs font-black ${hesap.farkYuzde > 0 ? 'text-rose-500' : 'text-emerald-600'}`}>
              {hesap.farkYuzde > 0 ? '+' : ''}{hesap.farkYuzde.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className={`mt-5 rounded-xl px-4 py-3 ${hesap.davaOlasiligiSkoru >= 70 ? 'bg-rose-50 text-rose-700' : hesap.davaOlasiligiSkoru >= 45 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
          <p className="text-[11px] font-bold">
            {hesap.davaOlasiligiSkoru >= 70
              ? 'Kira, piyasa değerinin çok üzerinde görünüyor. Kira tespit davası açılması değerlendirilebilir (TBK md. 344).'
              : hesap.davaOlasiligiSkoru >= 45
                ? 'Kira ile piyasa arasında önemli fark var. Arabuluculuk veya ihtarname ile çözüm denenebilir.'
                : 'Kira piyasa değeriyle uyumlu görünüyor. Dava açılması pratik olmayabilir.'}
          </p>
        </div>
      </div>

      {/* Yasal Bilgi */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yasal Çerçeve</h2>
        <div className="space-y-3">
          {[
            { baslik: 'TBK md. 344 — Kira Artış Sınırı', aciklama: 'Her yenileme döneminde artış TÜFE oranını aşamaz; konut kiralarında %25 yasal tavan uygulanmaktadır.' },
            { baslik: 'TBK md. 345 — Kira Tespit Davası', aciklama: 'Kiraya veren veya kiracı, aşırı kira farkı varsa sulh hukuk mahkemesinde kira tespiti talep edebilir.' },
            { baslik: 'Dava Şartları', aciklama: 'Dava açılabilmesi için kira sözleşmesinin en az 5 yıl sürmesi ya da ikinci kira dönemi bitmesi gerekir.' },
            { baslik: 'Arabuluculuk Zorunluluğu', aciklama: '2023 sonrası kira uyuşmazlıklarında dava açmadan önce arabuluculuk zorunlu hale getirilmiştir.' },
          ].map((item, i) => (
            <div key={i} className="border border-gray-100 rounded-xl p-4">
              <p className="text-xs font-black text-gray-900 mb-1">{item.baslik}</p>
              <p className="text-[11px] text-gray-500 leading-relaxed">{item.aciklama}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
