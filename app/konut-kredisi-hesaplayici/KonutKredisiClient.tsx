'use client';

import { useState, useMemo } from 'react';

const BANKALAR = [
  { isim: 'Ziraat Bankası', faiz: 3.99, vade: [60, 120, 180] },
  { isim: 'Halkbank', faiz: 4.10, vade: [60, 120, 180] },
  { isim: 'Vakıfbank', faiz: 4.05, vade: [60, 120, 180] },
  { isim: 'İş Bankası', faiz: 4.25, vade: [60, 120, 180] },
  { isim: 'Garanti BBVA', faiz: 4.30, vade: [60, 120, 180] },
  { isim: 'Yapı Kredi', faiz: 4.35, vade: [60, 120, 180] },
  { isim: 'Akbank', faiz: 4.28, vade: [60, 120, 180] },
];

export default function KonutKredisiClient() {
  const [konutDegeri, setKonutDegeri] = useState(5000000);
  const [pesinOrani, setPesinOrani] = useState(20);
  const [faizOrani, setFaizOrani] = useState(4.10);
  const [vade, setVade] = useState(120);

  const hesap = useMemo(() => {
    const krediTutari = konutDegeri * (1 - pesinOrani / 100);
    const aylikFaiz = faizOrani / 100;
    const taksit = krediTutari * (aylikFaiz * Math.pow(1 + aylikFaiz, vade)) / (Math.pow(1 + aylikFaiz, vade) - 1);
    const toplamOdeme = taksit * vade;
    const toplamFaiz = toplamOdeme - krediTutari;
    const pesinTutar = konutDegeri * (pesinOrani / 100);

    const odemeTablosu = [];
    let kalanAnapara = krediTutari;
    for (let ay = 1; ay <= Math.min(vade, 12); ay++) {
      const faizKismi = kalanAnapara * aylikFaiz;
      const anaparaKismi = taksit - faizKismi;
      kalanAnapara -= anaparaKismi;
      odemeTablosu.push({ ay, taksit, anaparaKismi, faizKismi, kalanAnapara: Math.max(0, kalanAnapara) });
    }

    return { krediTutari, taksit, toplamOdeme, toplamFaiz, pesinTutar, odemeTablosu };
  }, [konutDegeri, pesinOrani, faizOrani, vade]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Parametreler */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kredi Parametreleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Konut Değeri (₺)</label>
            <input type="number" value={konutDegeri} onChange={e => setKonutDegeri(Number(e.target.value))} step={250000} min={500000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Peşinat: %{pesinOrani} ({Math.round(hesap.pesinTutar).toLocaleString('tr-TR')} ₺)</label>
            <input type="range" min={10} max={50} step={5} value={pesinOrani} onChange={e => setPesinOrani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Faiz Oranı: %{faizOrani}</label>
            <input type="range" min={2.5} max={6.0} step={0.05} value={faizOrani} onChange={e => setFaizOrani(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Vade: {vade} ay ({(vade / 12).toFixed(0)} yıl)</label>
            <div className="flex gap-2 flex-wrap">
              {[60, 84, 120, 180, 240].map(v => (
                <button key={v} onClick={() => setVade(v)}
                  className={`text-xs font-black px-3 py-1.5 rounded-full border transition-colors ${vade === v ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200'}`}>
                  {v} ay
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sonuç Özeti */}
      <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kredi Özeti</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Aylık Taksit', value: `${Math.round(hesap.taksit).toLocaleString('tr-TR')} ₺`, color: 'text-[#00C49F]', big: true },
            { label: 'Kredi Tutarı', value: `${Math.round(hesap.krediTutari).toLocaleString('tr-TR')} ₺`, color: 'text-gray-900', big: false },
            { label: 'Peşinat', value: `${Math.round(hesap.pesinTutar).toLocaleString('tr-TR')} ₺`, color: 'text-gray-700', big: false },
            { label: 'Toplam Ödeme', value: `${Math.round(hesap.toplamOdeme).toLocaleString('tr-TR')} ₺`, color: 'text-gray-700', big: false },
            { label: 'Toplam Faiz', value: `${Math.round(hesap.toplamFaiz).toLocaleString('tr-TR')} ₺`, color: 'text-rose-500', big: false },
            { label: 'Faiz / Kredi Oranı', value: `%${((hesap.toplamFaiz / hesap.krediTutari) * 100).toFixed(1)}`, color: 'text-amber-500', big: false },
          ].map((k, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[10px] text-gray-500 mb-1">{k.label}</p>
              <p className={`${k.big ? 'text-base' : 'text-xs'} font-black ${k.color}`}>{k.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banka Karşılaştırması */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-1">Banka Oran Karşılaştırması</h2>
        <p className="text-xs text-gray-400 mb-4">Seçtiğiniz kredi tutarı ({Math.round(hesap.krediTutari).toLocaleString('tr-TR')} ₺) ve vade ({vade} ay) için.</p>
        <table className="w-full text-[10px] min-w-[360px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Banka</th>
              <th className="text-center py-2 font-black text-gray-500">Aylık Faiz</th>
              <th className="text-center py-2 font-black text-gray-500">Taksit</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Toplam Fark</th>
            </tr>
          </thead>
          <tbody>
            {BANKALAR.map((b, i) => {
              const aylikF = b.faiz / 100;
              const taksit = hesap.krediTutari * (aylikF * Math.pow(1 + aylikF, vade)) / (Math.pow(1 + aylikF, vade) - 1);
              const toplam = taksit * vade;
              const secilenToplam = hesap.taksit * vade;
              const fark = toplam - secilenToplam;
              return (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.isim}</td>
                  <td className="py-2 text-center font-bold text-gray-600">%{b.faiz}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{Math.round(taksit).toLocaleString('tr-TR')} ₺</td>
                  <td className={`py-2 text-right font-black ${fark > 0 ? 'text-rose-500' : fark < 0 ? 'text-emerald-500' : 'text-gray-400'}`}>
                    {fark > 0 ? '+' : ''}{Math.round(fark).toLocaleString('tr-TR')} ₺
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* İlk 12 Ay Ödeme Planı */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-sm font-black text-gray-900 mb-4">İlk 12 Ay Ödeme Planı</h2>
        <table className="w-full text-[10px] min-w-[380px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-center py-2 font-black text-gray-500">Ay</th>
              <th className="text-center py-2 font-black text-gray-500">Taksit</th>
              <th className="text-center py-2 font-black text-gray-500">Anapara</th>
              <th className="text-center py-2 font-black text-gray-500">Faiz</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Kalan Borç</th>
            </tr>
          </thead>
          <tbody>
            {hesap.odemeTablosu.map((o) => (
              <tr key={o.ay} className="border-b border-gray-50 last:border-0">
                <td className="py-1.5 text-center font-bold text-gray-700">{o.ay}</td>
                <td className="py-1.5 text-center font-bold text-gray-900">{Math.round(o.taksit).toLocaleString('tr-TR')} ₺</td>
                <td className="py-1.5 text-center font-bold text-[#00C49F]">{Math.round(o.anaparaKismi).toLocaleString('tr-TR')} ₺</td>
                <td className="py-1.5 text-center font-bold text-rose-400">{Math.round(o.faizKismi).toLocaleString('tr-TR')} ₺</td>
                <td className="py-1.5 text-right font-bold text-gray-600">{Math.round(o.kalanAnapara).toLocaleString('tr-TR')} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
