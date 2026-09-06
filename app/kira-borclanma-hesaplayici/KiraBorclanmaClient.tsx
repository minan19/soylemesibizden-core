'use client';

import { useState, useMemo } from 'react';

const FAIZ_ORANLARI = {
  yasal: 9,
  temerrut: 12,
  ticari: 16,
};

export default function KiraBorclanmaClient() {
  const [aylikKira, setAylikKira] = useState(15000);
  const [gecikmeAy, setGecikmeAy] = useState(3);
  const [gunkecikme, setGunGecikme] = useState(45);
  const [faizTipi, setFaizTipi] = useState<keyof typeof FAIZ_ORANLARI>('temerrut');
  const [dahilMasraflar, setDahilMasraflar] = useState(true);

  const hesap = useMemo(() => {
    const toplamAnaKira = aylikKira * gecikmeAy;
    const yillikFaiz = FAIZ_ORANLARI[faizTipi];
    const gunlukFaizOran = yillikFaiz / 365 / 100;

    const faizTutari = toplamAnaKira * gunlukFaizOran * gunkecikme;
    const icraUcreti = dahilMasraflar ? toplamAnaKira * 0.02 + 500 : 0;
    const mahkemeMasrafi = dahilMasraflar ? 800 : 0;
    const noterMasrafi = dahilMasraflar ? 400 : 0;

    const toplamBorç = toplamAnaKira + faizTutari + icraUcreti + mahkemeMasrafi + noterMasrafi;

    const ayBazli = Array.from({ length: gecikmeAy }, (_, i) => {
      const ayKira = aylikKira;
      const ayFaiz = ayKira * gunlukFaizOran * 30 * (i + 1);
      return { ay: i + 1, kira: ayKira, faiz: Math.round(ayFaiz) };
    });

    return { toplamAnaKira, faizTutari, icraUcreti, mahkemeMasrafi, noterMasrafi, toplamBorç, ayBazli };
  }, [aylikKira, gecikmeAy, gunkecikme, faizTipi, dahilMasraflar]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Giriş */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Kira Borç Bilgileri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))} step={500} min={1000}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Geciken Ay Sayısı</label>
            <input type="number" value={gecikmeAy} onChange={e => setGecikmeAy(Number(e.target.value))} step={1} min={1} max={24}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Faiz İşleme Günü</label>
            <input type="number" value={gunkecikme} onChange={e => setGunGecikme(Number(e.target.value))} step={5} min={1} max={365}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
          </div>
          <div>
            <label className="text-xs font-black text-gray-700 block mb-1">Faiz Türü</label>
            <select value={faizTipi} onChange={e => setFaizTipi(e.target.value as keyof typeof FAIZ_ORANLARI)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F] bg-white">
              <option value="yasal">Yasal Faiz (%9)</option>
              <option value="temerrut">Temerrüt Faizi (%12)</option>
              <option value="ticari">Ticari Temerrüt (%16)</option>
            </select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="masraf" checked={dahilMasraflar} onChange={e => setDahilMasraflar(e.target.checked)}
              className="accent-[#00C49F] w-4 h-4" />
            <label htmlFor="masraf" className="text-xs font-black text-gray-700">Hukuki masrafları dahil et (icra, mahkeme, noter)</label>
          </div>
        </div>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Ana Kira Borcu</p>
          <p className="text-sm font-black text-gray-900">{Math.round(hesap.toplamAnaKira).toLocaleString('tr-TR')} ₺</p>
        </div>
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Gecikme Faizi</p>
          <p className="text-sm font-black text-amber-500">{Math.round(hesap.faizTutari).toLocaleString('tr-TR')} ₺</p>
        </div>
        {dahilMasraflar && (
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
            <p className="text-[10px] text-gray-500 mb-1">Hukuki Masraflar</p>
            <p className="text-sm font-black text-gray-600">{Math.round(hesap.icraUcreti + hesap.mahkemeMasrafi + hesap.noterMasrafi).toLocaleString('tr-TR')} ₺</p>
          </div>
        )}
        <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center shadow-sm">
          <p className="text-[10px] text-gray-500 mb-1">Toplam Borç</p>
          <p className="text-sm font-black text-rose-600">{Math.round(hesap.toplamBorç).toLocaleString('tr-TR')} ₺</p>
        </div>
      </div>

      {/* Ay Bazlı Dökümü */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-sm font-black text-gray-900 mb-4">Aylara Göre Borç Dağılımı</h2>
        <div className="space-y-3">
          {hesap.ayBazli.map(({ ay, kira, faiz }) => (
            <div key={ay} className="flex items-center justify-between border border-gray-50 rounded-xl px-4 py-2.5">
              <span className="text-xs font-black text-gray-700">{ay}. Ay</span>
              <div className="flex gap-6 text-right">
                <div>
                  <p className="text-[9px] text-gray-400">Kira</p>
                  <p className="text-xs font-black text-gray-800">{kira.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400">Tahmini Faiz</p>
                  <p className="text-xs font-black text-amber-500">{faiz.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400">Toplam</p>
                  <p className="text-xs font-black text-rose-500">{(kira + faiz).toLocaleString('tr-TR')} ₺</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yasal Bilgi */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-black text-blue-700 mb-2">Yasal Bilgi</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">
          Temerrüt faizi, kiracının ödeme yapmaması durumunda kiraya verenin talep edebileceği ek faizdir (TBK md. 120). Fiili faiz oranları Merkez Bankası politika faizine ve mahkeme kararlarına göre değişebilir. Bu hesaplayıcı tahmini değerler üretir; hukuki süreçlerde avukat görüşü alınması önerilir.
        </p>
      </div>

    </div>
  );
}
