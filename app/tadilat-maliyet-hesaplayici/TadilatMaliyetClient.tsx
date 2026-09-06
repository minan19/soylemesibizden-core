'use client';

import { useState, useMemo } from 'react';

type IslemKey = keyof typeof ISLEMLER;

const ISLEMLER = {
  boya: { label: 'Boya / Badana', birimFiyat: 250, birim: 'm²', aciklama: 'Duvar yüzeyi (2 kat)' },
  laminant: { label: 'Laminant Zemin', birimFiyat: 400, birim: 'm²', aciklama: 'Montaj dahil, orta kalite' },
  seramik: { label: 'Seramik Döşeme', birimFiyat: 500, birim: 'm²', aciklama: 'Montaj dahil, orta kalite' },
  mutfakDolap: { label: 'Mutfak Dolabı', birimFiyat: 3500, birim: 'mt', aciklama: 'MDF kapak, tezgah dahil' },
  banyoReviz: { label: 'Banyo Revizyonu', birimFiyat: 80000, birim: 'adet', aciklama: 'Komple banyo yenileme' },
  elektrik: { label: 'Elektrik Tesisatı', birimFiyat: 800, birim: 'm²', aciklama: 'Komple yenileme' },
  su: { label: 'Su Tesisatı', birimFiyat: 600, birim: 'm²', aciklama: 'Boru + armatür değişimi' },
  pencere: { label: 'Pencere (PVC)', birimFiyat: 8000, birim: 'adet', aciklama: 'Standart pencere, montaj dahil' },
  kapi: { label: 'İç Kapı', birimFiyat: 6000, birim: 'adet', aciklama: 'Ahşap kaplı, kasa dahil' },
  aydınlatma: { label: 'Aydınlatma Armatür', birimFiyat: 1500, birim: 'adet', aciklama: 'Spot + sarkıt set' },
};

export default function TadilatMaliyetClient() {
  const [miktar, setMiktar] = useState<Partial<Record<IslemKey, number>>>({
    boya: 80, laminant: 60,
  });
  const [iscilikorani, setIscilikorani] = useState(30);
  const [kdv, setKdv] = useState(20);

  const toggleIslem = (key: IslemKey) => {
    setMiktar(prev => {
      if (key in prev) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: ISLEMLER[key].birim === 'm²' ? 50 : ISLEMLER[key].birim === 'mt' ? 3 : 1 };
    });
  };

  const hesap = useMemo(() => {
    let malzemeMaliyeti = 0;
    const detaylar: { label: string; miktar: number; birim: string; tutar: number }[] = [];

    for (const [key, val] of Object.entries(miktar) as [IslemKey, number][]) {
      const islem = ISLEMLER[key];
      const tutar = islem.birimFiyat * val;
      malzemeMaliyeti += tutar;
      detaylar.push({ label: islem.label, miktar: val, birim: islem.birim, tutar });
    }

    const iscilikMaliyeti = malzemeMaliyeti * (iscilikorani / 100);
    const araToplamMaliyeti = malzemeMaliyeti + iscilikMaliyeti;
    const kdvTutar = araToplamMaliyeti * (kdv / 100);
    const toplamMaliyet = araToplamMaliyeti + kdvTutar;
    const tampon = toplamMaliyet * 0.25;

    return { malzemeMaliyeti, iscilikMaliyeti, kdvTutar, toplamMaliyet, tampon, detaylar };
  }, [miktar, iscilikorani, kdv]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* İşlem Seçimi */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Tadilat İşlemlerini Seçin</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(Object.entries(ISLEMLER) as [IslemKey, typeof ISLEMLER[IslemKey]][]).map(([key, islem]) => (
            <div key={key} className={`border rounded-xl p-3 cursor-pointer transition-all ${key in miktar ? 'border-[#00C49F] bg-[#F0FDF8]' : 'border-gray-200 bg-white'}`}
              onClick={() => toggleIslem(key)}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-black text-gray-900">{islem.label}</p>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${key in miktar ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {key in miktar ? 'Seçildi' : 'Ekle'}
                </span>
              </div>
              <p className="text-[9px] text-gray-400">{islem.aciklama} • {islem.birimFiyat.toLocaleString('tr-TR')} ₺/{islem.birim}</p>
              {key in miktar && (
                <div className="mt-2" onClick={e => e.stopPropagation()}>
                  <label className="text-[9px] text-gray-500">Miktar ({islem.birim})</label>
                  <input type="number" value={miktar[key] ?? 0}
                    onChange={e => setMiktar(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                    min={1} step={islem.birim === 'm²' ? 5 : 1}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:border-[#00C49F] mt-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Parametreler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Maliyet Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">İşçilik Oranı: %{iscilikorani}</label>
            <input type="range" min={15} max={50} step={5} value={iscilikorani} onChange={e => setIscilikorani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">KDV Oranı: %{kdv}</label>
            <div className="flex gap-2">
              {[10, 20].map(k => (
                <button key={k} onClick={() => setKdv(k)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full border transition-colors ${kdv === k ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  %{k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç */}
      {hesap.detaylar.length > 0 && (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
            <h2 className="text-sm font-black text-gray-900 mb-4">Maliyet Dökümü</h2>
            <table className="w-full text-[10px] min-w-[380px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">İşlem</th>
                  <th className="text-center py-2 font-black text-gray-500">Miktar</th>
                  <th className="text-right py-2 font-black text-[#00C49F]">Tutar</th>
                </tr>
              </thead>
              <tbody>
                {hesap.detaylar.map((d, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-black text-gray-900">{d.label}</td>
                    <td className="py-2 text-center font-bold text-gray-600">{d.miktar} {d.birim}</td>
                    <td className="py-2 text-right font-black text-[#00C49F]">{d.tutar.toLocaleString('tr-TR')} ₺</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200">
                  <td colSpan={2} className="py-2 font-black text-gray-700">Malzeme Toplamı</td>
                  <td className="py-2 text-right font-black text-gray-700">{hesap.malzemeMaliyeti.toLocaleString('tr-TR')} ₺</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 font-black text-gray-700">İşçilik (%{iscilikorani})</td>
                  <td className="py-2 text-right font-black text-gray-700">{hesap.iscilikMaliyeti.toLocaleString('tr-TR')} ₺</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 font-black text-gray-700">KDV (%{kdv})</td>
                  <td className="py-2 text-right font-black text-gray-700">{hesap.kdvTutar.toLocaleString('tr-TR')} ₺</td>
                </tr>
                <tr className="bg-[#F0FDF8]">
                  <td colSpan={2} className="py-2 font-black text-[#00C49F] text-xs">Toplam Maliyet</td>
                  <td className="py-2 text-right font-black text-[#00C49F] text-sm">{hesap.toplamMaliyet.toLocaleString('tr-TR')} ₺</td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-2 font-black text-amber-600">+%25 Sürpriz Tampon</td>
                  <td className="py-2 text-right font-black text-amber-600">{Math.round(hesap.toplamMaliyet + hesap.tampon).toLocaleString('tr-TR')} ₺</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {hesap.detaylar.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center text-gray-400 text-xs">
          Yukarıdan tadilat işlemlerini seçin ve miktarları girin.
        </div>
      )}

    </div>
  );
}
