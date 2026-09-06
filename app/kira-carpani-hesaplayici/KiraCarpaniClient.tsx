'use client';

import { useState, useMemo } from 'react';

const SEHIR_KIRAC: Record<string, number> = {
  'İstanbul — Avrupa Merkez': 220,
  'İstanbul — Anadolu Merkez': 200,
  'İstanbul — Çevre İlçeler': 160,
  'Ankara — Merkez': 140,
  'İzmir — Merkez': 150,
  'Antalya': 145,
  'Bursa': 130,
  'Diğer Şehirler': 120,
};

function yorumla(carpan: number): { etiket: string; renk: string; aciklama: string } {
  if (carpan < 120) return { etiket: 'Çok Düşük (Kira Cazip)', renk: 'text-emerald-600', aciklama: 'Kira getirisi çok yüksek; alım yerine kira önerilir. Satın alma değer altında.' };
  if (carpan < 160) return { etiket: 'Düşük (Yatırımcı Bölgesi)', renk: 'text-[#00C49F]', aciklama: 'Yatırımcı için kira getirisi çekici; yatırım amaçlı alım değerlendirilebilir.' };
  if (carpan < 200) return { etiket: 'Orta (Denge Noktası)', renk: 'text-amber-500', aciklama: 'Kira ve alım maliyeti dengelenmiş; uzun vadeli oturmayı planlayanlar için alım uygun.' };
  if (carpan < 250) return { etiket: 'Yüksek (Satın Alma Pahalı)', renk: 'text-orange-500', aciklama: 'Fiyat yüksek; kirada oturmak finansal açıdan daha avantajlı olabilir.' };
  return { etiket: 'Çok Yüksek (Balon Riski)', renk: 'text-rose-600', aciklama: 'Piyasa aşırı değerlenmiş; fiyat balonu riski var. Alım önerilmez.' };
}

export default function KiraCarpaniClient() {
  const [konutFiyati, setKonutFiyati] = useState(5000000);
  const [aylikKira, setAylikKira] = useState(25000);
  const [sehir, setSehir] = useState('İstanbul — Avrupa Merkez');
  const [mod, setMod] = useState<'manuel' | 'sehir'>('manuel');

  const hesap = useMemo(() => {
    const efektifKira = mod === 'sehir' ? konutFiyati / SEHIR_KIRAC[sehir] / 12 : aylikKira;
    const carpan = Math.round(konutFiyati / (efektifKira * 12));
    const brutGetiri = ((efektifKira * 12) / konutFiyati) * 100;
    const geriOdeme = carpan;
    const piyasaCarpani = SEHIR_KIRAC[sehir];
    const piyasaKira = konutFiyati / piyasaCarpani / 12;
    const yorumObj = yorumla(carpan);
    return { carpan, brutGetiri, geriOdeme, piyasaKira, efektifKira, yorumObj, piyasaCarpani };
  }, [konutFiyati, aylikKira, sehir, mod]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Girişler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Çarpanı Parametreleri</h2>

        <div className="flex gap-2 mb-5">
          {(['manuel', 'sehir'] as const).map(m => (
            <button key={m} onClick={() => setMod(m)}
              className={`text-xs font-black px-4 py-2 rounded-full border transition-colors ${mod === m ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
              {m === 'manuel' ? 'Manuel Kira Girişi' : 'Piyasa Kirası Kullan'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Konut Satış Fiyatı (₺)</label>
            <input type="number" value={konutFiyati} onChange={e => setKonutFiyati(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          {mod === 'manuel' ? (
            <div>
              <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira (₺)</label>
              <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))} step={500} min={1000}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
            </div>
          ) : (
            <div>
              <label className="text-xs font-black text-gray-700 block mb-1">Şehir / Bölge</label>
              <select value={sehir} onChange={e => setSehir(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
                {Object.keys(SEHIR_KIRAC).map(s => (
                  <option key={s} value={s}>{s} (çarpan: {SEHIR_KIRAC[s]})</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Sonuç */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-2">Kira Çarpanı Analizi</h2>
        <div className={`text-center py-3 rounded-xl mb-5 border ${hesap.carpan < 200 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <p className="text-[10px] text-gray-500 mb-1">Hesaplanan Kira Çarpanı</p>
          <p className={`text-3xl font-black ${hesap.yorumObj.renk}`}>{hesap.carpan}</p>
          <p className={`text-xs font-black mt-1 ${hesap.yorumObj.renk}`}>{hesap.yorumObj.etiket}</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-5">
          <p className="text-[11px] text-gray-600 leading-relaxed">{hesap.yorumObj.aciklama}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Brüt Kira Getirisi', value: `%${hesap.brutGetiri.toFixed(2)}`, color: 'text-[#00C49F]' },
            { label: 'Geri Ödeme Süresi', value: `${hesap.geriOdeme} yıl`, color: 'text-gray-700' },
            { label: 'Piyasa Kira Çarpanı', value: `${hesap.piyasaCarpani}`, color: 'text-blue-500' },
            { label: 'Aylık Kira (hesaplanan)', value: `${Math.round(hesap.efektifKira).toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
            { label: 'Piyasa Ortalama Kirası', value: `${Math.round(hesap.piyasaKira).toLocaleString('tr-TR')} ₺`, color: 'text-amber-500' },
            { label: 'Satış Fiyatı', value: `${konutFiyati.toLocaleString('tr-TR')} ₺`, color: 'text-gray-700' },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`text-xs font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Şehir Karşılaştırması */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Şehir Bazlı Piyasa Çarpanları</h2>
        <div className="space-y-2">
          {Object.entries(SEHIR_KIRAC).map(([s, c]) => {
            const pct = Math.min((c / 300) * 100, 100);
            return (
              <div key={s} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-500 w-44 shrink-0">{s}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${c >= 200 ? 'bg-rose-400' : c >= 160 ? 'bg-amber-400' : 'bg-[#00C49F]'}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-black text-gray-700 w-8 text-right shrink-0">{c}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-gray-400 mt-3">* Düşük çarpan = yüksek kira getirisi = yatırımcı dostu. Yüksek çarpan = piyasa pahalı.</p>
      </div>

    </div>
  );
}
