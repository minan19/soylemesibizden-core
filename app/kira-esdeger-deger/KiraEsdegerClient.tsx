'use client';

import { useState, useMemo } from 'react';

const SEHIR_CARPANLARI: Record<string, { carpan: number; yorum: string }> = {
  'İstanbul': { carpan: 220, yorum: 'Pahalı piyasa, kira mantıklı' },
  'İzmir': { carpan: 195, yorum: 'Yüksek, nötr bölge' },
  'Ankara': { carpan: 168, yorum: 'Satın alma avantajlı' },
  'Antalya': { carpan: 200, yorum: 'Sezon etkisi var' },
  'Bursa': { carpan: 155, yorum: 'Satın alma cazip' },
  'Muğla': { carpan: 230, yorum: 'En pahalı, kira mantıklı' },
};

export default function KiraEsdegerClient() {
  const [aylikKira, setAylikKira] = useState(18000);
  const [yillikArtis, setYillikArtis] = useState(35);
  const [alternatifGetiri, setAlternatifGetiri] = useState(45);
  const [sehir, setSehir] = useState('İstanbul');
  const [sure, setSure] = useState(10);

  const sonuc = useMemo(() => {
    const sehirVeri = SEHIR_CARPANLARI[sehir];

    // Kira çarpanına göre eşdeğer konut değeri
    const esdegerKonutDegeri = aylikKira * sehirVeri.carpan;

    // Seçilen süre boyunca ödenen toplam kira (bileşik artışlı)
    let toplamKira = 0;
    let kiraBu = aylikKira;
    for (let y = 0; y < sure; y++) {
      toplamKira += kiraBu * 12;
      kiraBu *= 1 + yillikArtis / 100;
    }

    // Son yılın aylık kirası
    const sonYilKira = aylikKira * Math.pow(1 + yillikArtis / 100, sure);

    // Konut değer artışı (yıllık artış = enflasyon bağlı)
    const konutDegerArtis = yillikArtis * 0.8;
    const gelecekKonutDegeri = esdegerKonutDegeri * Math.pow(1 + konutDegerArtis / 100, sure);

    // Alternatif yatırım getirisi (kira yerine biriktirirse)
    let birikim = 0;
    let kiraBir = aylikKira;
    for (let y = 0; y < sure; y++) {
      const yillikOdeme = kiraBir * 12;
      birikim = (birikim + yillikOdeme) * (1 + alternatifGetiri / 100);
      kiraBir *= 1 + yillikArtis / 100;
    }

    return {
      esdegerKonutDegeri,
      toplamKira,
      sonYilKira,
      gelecekKonutDegeri,
      birikim,
      carpan: sehirVeri.carpan,
      yorum: sehirVeri.yorum,
      fark: gelecekKonutDegeri - toplamKira,
    };
  }, [aylikKira, yillikArtis, alternatifGetiri, sehir, sure]);

  const formatM = (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(2)}M ₺` : `${Math.round(v).toLocaleString('tr-TR')} ₺`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Parametreler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Aylık Kira (₺)</label>
            <input type="number" value={aylikKira} onChange={e => setAylikKira(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#00C49F]" />
            <div className="flex gap-2 mt-2 flex-wrap">
              {[10000, 15000, 20000, 30000].map(v => (
                <button key={v} onClick={() => setAylikKira(v)}
                  className={`text-[9px] font-black px-2 py-1 rounded-full border ${aylikKira === v ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'border-gray-200 text-gray-500 hover:border-[#00C49F]'}`}>
                  {v.toLocaleString('tr-TR')} ₺
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-2">Şehir</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(SEHIR_CARPANLARI).map(s => (
                <button key={s} onClick={() => setSehir(s)}
                  className={`text-[9px] font-black px-2.5 py-1 rounded-full border transition-colors ${sehir === s ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'border-gray-200 text-gray-500 hover:border-[#00C49F]'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Analiz Süresi: {sure} yıl</label>
            <input type="range" min={5} max={30} step={5} value={sure} onChange={e => setSure(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1"><span>5</span><span>30 yıl</span></div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Yıllık Kira Artışı: %{yillikArtis}</label>
            <input type="range" min={10} max={80} step={5} value={yillikArtis} onChange={e => setYillikArtis(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1"><span>%10</span><span>%80</span></div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-500 mb-1">Alternatif Yatırım Getirisi: %{alternatifGetiri}/yıl</label>
            <input type="range" min={10} max={80} step={5} value={alternatifGetiri} onChange={e => setAlternatifGetiri(Number(e.target.value))}
              className="w-full accent-[#00C49F]" />
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h2 className="text-base font-black text-gray-900 mb-5">Analiz Sonuçları</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 text-center sm:col-span-1">
            <p className="text-[10px] text-gray-500 mb-1">Piyasa Kira Çarpanı</p>
            <p className="text-lg font-black text-gray-900">{sonuc.carpan} ay</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{sonuc.yorum}</p>
          </div>
          <div className="bg-[#00C49F] rounded-xl p-4 text-center">
            <p className="text-[10px] text-white/80 mb-1">Eşdeğer Konut Değeri</p>
            <p className="text-sm font-black text-white">{formatM(sonuc.esdegerKonutDegeri)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">{sure} Yılda Toplam Kira</p>
            <p className="text-sm font-black text-rose-500">{formatM(sonuc.toplamKira)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">{sure}. Yıl Aylık Kira</p>
            <p className="text-sm font-black text-gray-900">{Math.round(sonuc.sonYilKira).toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Konutun {sure} Yıl Sonraki Değeri</p>
            <p className="text-sm font-black text-emerald-600">{formatM(sonuc.gelecekKonutDegeri)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-500 mb-1">Alternatif Yatırım Birikimi</p>
            <p className="text-sm font-black text-blue-500">{formatM(sonuc.birikim)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
        <h2 className="text-base font-black text-gray-900 mb-1">Şehir Kira Çarpanları</h2>
        <p className="text-xs text-gray-400 mb-5">Kira çarpanı = Konut Değeri / Aylık Kira. Düşük = satın alma avantajlı.</p>
        <table className="w-full text-[10px] min-w-[380px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 font-black text-gray-500">Şehir</th>
              <th className="text-center py-2 font-black text-gray-500">Kira Çarpanı</th>
              <th className="text-right py-2 font-black text-[#00C49F]">Yorum</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(SEHIR_CARPANLARI).map(([s, v], i) => (
              <tr key={i} className={`border-b border-gray-50 last:border-0 ${s === sehir ? 'bg-[#00C49F]/5' : ''}`}>
                <td className="py-2 font-black text-gray-900">{s}</td>
                <td className={`py-2 text-center font-bold ${v.carpan > 200 ? 'text-rose-500' : v.carpan < 170 ? 'text-emerald-600' : 'text-amber-500'}`}>{v.carpan} ay</td>
                <td className="py-2 text-right font-bold text-gray-400">{v.yorum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <p className="text-xs font-black text-blue-700 mb-2">Kira Çarpanı Yorumu</p>
        <p className="text-[11px] text-blue-600 leading-relaxed">
          Uluslararası norm olarak 150 ay altı çarpan satın almayı, 200 ay üzeri kiralamayı avantajlı kılar. Türkiye&apos;de yüksek enflasyon ve kira artışları bu hesabı karmaşıklaştırmaktadır. Kira birikimini alternatif getirili enstrümanla değerlendirirseniz sonuç farklılaşır. Konut aynı zamanda bir kullanım değeri ve güvence sağlar; salt finansal karşılaştırma yeterli olmayabilir.
        </p>
      </div>

    </div>
  );
}
