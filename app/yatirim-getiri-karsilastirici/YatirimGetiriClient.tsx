'use client';

import { useState, useMemo } from 'react';

type AracKey = 'gayrimenkul' | 'altin' | 'dolar' | 'borsa' | 'mevduat' | 'eurobond';

const ARACLAR: Record<AracKey, { label: string; varsayilanGetiri: number; renk: string; bilgi: string }> = {
  gayrimenkul: { label: 'Gayrimenkul', varsayilanGetiri: 55, renk: 'bg-[#00C49F]', bilgi: '2024 Türkiye ortalama fiyat artışı' },
  altin: { label: 'Altın (TL)', varsayilanGetiri: 60, renk: 'bg-yellow-400', bilgi: 'TL bazlı altın getirisi' },
  dolar: { label: 'Dolar/EUR', varsayilanGetiri: 30, renk: 'bg-blue-400', bilgi: 'TL/USD kur artışı' },
  borsa: { label: 'BIST 100', varsayilanGetiri: 40, renk: 'bg-purple-400', bilgi: '2024 endeks getirisi' },
  mevduat: { label: 'Mevduat', varsayilanGetiri: 45, renk: 'bg-gray-400', bilgi: 'Faiz geliri (yıllık brüt)' },
  eurobond: { label: 'Eurobond', varsayilanGetiri: 8, renk: 'bg-indigo-400', bilgi: 'USD bazlı devlet tahvili' },
};

export default function YatirimGetiriClient() {
  const [baslangic, setBaslangic] = useState(1000000);
  const [sure, setSure] = useState(5);
  const [getiriler, setGetiriler] = useState<Record<AracKey, number>>({
    gayrimenkul: 55, altin: 60, dolar: 30, borsa: 40, mevduat: 45, eurobond: 8,
  });
  const [enflasyon, setEnflasyon] = useState(45);

  const guncelle = (key: AracKey, deger: number) => setGetiriler(prev => ({ ...prev, [key]: deger }));

  const hesap = useMemo(() => {
    const sonuclar = (Object.keys(ARACLAR) as AracKey[]).map(key => {
      let miktar = baslangic;
      for (let y = 0; y < sure; y++) {
        miktar = miktar * (1 + getiriler[key] / 100);
      }
      const reel = miktar / Math.pow(1 + enflasyon / 100, sure);
      const nominalkaz = miktar - baslangic;
      const reelkaz = reel - baslangic;
      return { key, label: ARACLAR[key].label, renk: ARACLAR[key].renk, miktar, reel, nominalkaz, reelkaz };
    });

    sonuclar.sort((a, b) => b.miktar - a.miktar);
    return sonuclar;
  }, [baslangic, sure, getiriler, enflasyon]);

  const maxMiktar = hesap[0]?.miktar ?? 1;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Parametreler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Yatırım Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Başlangıç Yatırımı (₺)</label>
            <input type="number" value={baslangic} onChange={e => setBaslangic(Number(e.target.value))} step={100000} min={100000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Yatırım Süresi: {sure} yıl</label>
            <input type="range" min={1} max={20} step={1} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-black text-gray-700 block mb-1">Ortalama Yıllık Enflasyon: %{enflasyon}</label>
            <input type="range" min={10} max={70} step={5} value={enflasyon} onChange={e => setEnflasyon(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>
        </div>

        {/* Getiri Oranları */}
        <h3 className="text-xs font-black text-gray-700 mb-3">Yıllık Getiri Oranlarını Ayarlayın</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.entries(ARACLAR) as [AracKey, typeof ARACLAR[AracKey]][]).map(([key, arac]) => (
            <div key={key}>
              <label className="text-[10px] font-black text-gray-600 block mb-1">{arac.label}: %{getiriler[key]}</label>
              <input type="range" min={0} max={100} step={5} value={getiriler[key]} onChange={e => guncelle(key, Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <p className="text-[9px] text-gray-400">{arac.bilgi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sonuçlar */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">{sure} Yıl Sonra Birikim Karşılaştırması</h2>
        <div className="space-y-4">
          {hesap.map((h, i) => {
            const pct = (h.miktar / maxMiktar) * 100;
            return (
              <div key={h.key}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-400 w-4">{i + 1}</span>
                    <span className="text-xs font-black text-gray-900">{h.label}</span>
                    <span className="text-[9px] font-black text-gray-400">(%{getiriler[h.key]}/yıl)</span>
                  </div>
                  <span className="text-xs font-black text-gray-900">{Math.round(h.miktar).toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-3">
                    <div className={`${ARACLAR[h.key].renk} h-3 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="flex justify-between text-[9px] text-gray-400 mt-0.5">
                  <span>Nominal kazanç: +{Math.round(h.nominalkaz).toLocaleString('tr-TR')} ₺</span>
                  <span className={h.reelkaz >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                    Reel: {h.reelkaz >= 0 ? '+' : ''}{Math.round(h.reelkaz).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* En İyi / En Kötü */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
          <p className="text-[10px] text-emerald-600 font-black mb-1">🏆 En Yüksek Getiri</p>
          <p className="text-sm font-black text-emerald-700">{hesap[0]?.label}</p>
          <p className="text-xl font-black text-emerald-600">{Math.round(hesap[0]?.miktar ?? 0).toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center">
          <p className="text-[10px] text-rose-600 font-black mb-1">En Düşük Getiri</p>
          <p className="text-sm font-black text-rose-700">{hesap[hesap.length - 1]?.label}</p>
          <p className="text-xl font-black text-rose-600">{Math.round(hesap[hesap.length - 1]?.miktar ?? 0).toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>

    </div>
  );
}
