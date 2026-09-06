'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function YatirimButceClient() {
  const [mlkDegeri, setMlkDegeri] = useState(3000000);
  const [pesinatOrani, setPesinatOrani] = useState(30);
  const [krediVadesi, setKrediVadesi] = useState(120);
  const [aylikFaizOrani, setAylikFaizOrani] = useState(3.9);
  const [tapuHarci, setTapuHarci] = useState(4);
  const [emlakciKomisyonu, setEmlakciKomisyonu] = useState(2);
  const [tadilatButce, setTadilatButce] = useState(100000);
  const [ilkYilAidat, setIlkYilAidat] = useState(18000);
  const [sigortaYillik, setSigortaYillik] = useState(5000);
  const [nakliyat, setNakliyat] = useState(20000);

  const sonuc = useMemo(() => {
    const pesinat = mlkDegeri * (pesinatOrani / 100);
    const krediTutari = mlkDegeri - pesinat;
    const r = aylikFaizOrani / 100;
    const n = krediVadesi;
    const aylikTaksit = krediTutari > 0
      ? Math.round(krediTutari * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
      : 0;

    const tapuMasrafi = mlkDegeri * (tapuHarci / 100);
    const donerSermaye = 3200;
    const emlakciMasrafi = mlkDegeri * (emlakciKomisyonu / 100) * 1.20;
    const dask = Math.round(mlkDegeri * 0.0008);
    const ekMasraflar = tapuMasrafi + donerSermaye + emlakciMasrafi + dask + sigortaYillik + nakliyat;
    const toplamBaslangiçOdeme = pesinat + ekMasraflar + tadilatButce;
    const ilkYilToplamMaliyet = toplamBaslangiçOdeme + (aylikTaksit * 12) + ilkYilAidat;
    const toplamKrediOdeme = aylikTaksit * krediVadesi;
    const toplamFaiz = Math.max(0, toplamKrediOdeme - krediTutari);

    return {
      pesinat: Math.round(pesinat),
      krediTutari: Math.round(krediTutari),
      aylikTaksit,
      tapuMasrafi: Math.round(tapuMasrafi),
      donerSermaye,
      emlakciMasrafi: Math.round(emlakciMasrafi),
      dask,
      ekMasraflar: Math.round(ekMasraflar),
      toplamBaslangiçOdeme: Math.round(toplamBaslangiçOdeme),
      ilkYilToplamMaliyet: Math.round(ilkYilToplamMaliyet),
      toplamFaiz: Math.round(toplamFaiz),
      toplamSahiplikMaliyeti: Math.round(mlkDegeri + toplamFaiz + ekMasraflar + tadilatButce),
    };
  }, [mlkDegeri, pesinatOrani, krediVadesi, aylikFaizOrani, tapuHarci, emlakciKomisyonu, tadilatButce, ilkYilAidat, sigortaYillik, nakliyat]);

  const masrafKalemleri = [
    { kalem: 'Peşinat', tutar: sonuc.pesinat },
    { kalem: 'Tapu Harcı', tutar: sonuc.tapuMasrafi },
    { kalem: 'Döner Sermaye', tutar: sonuc.donerSermaye },
    { kalem: 'Emlakçı Komisyonu', tutar: sonuc.emlakciMasrafi },
    { kalem: 'DASK Sigortası', tutar: sonuc.dask },
    { kalem: 'Konut Sigortası', tutar: sigortaYillik },
    { kalem: 'Nakliye & Yerleşim', tutar: nakliyat },
    { kalem: 'Tadilat Bütçesi', tutar: tadilatButce },
  ];
  const maxMasraf = Math.max(...masrafKalemleri.map(m => m.tutar));

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Calculator size={13} /> Yatırım Bütçe Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Gayrimenkul Yatırım Bütçe Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Peşinat, kredi taksiti, ek masraflar ve tadilat dahil toplam sahiplik maliyetini hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Mülk & Kredi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Mülk ve Kredi Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mülk Değeri</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{mlkDegeri.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={mlkDegeri}
                onChange={e => setMlkDegeri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Peşinat Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{pesinatOrani}</p>
              <input type="range" min={20} max={100} step={5} value={pesinatOrani}
                onChange={e => setPesinatOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%20</span><span>%100</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kredi Vadesi (Ay)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{krediVadesi} ay</p>
              <input type="range" min={12} max={240} step={12} value={krediVadesi}
                onChange={e => setKrediVadesi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>12</span><span>240</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Faiz Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{aylikFaizOrani}</p>
              <input type="range" min={1} max={7} step={0.1} value={aylikFaizOrani}
                onChange={e => setAylikFaizOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%1</span><span>%7</span></div>
            </div>

          </div>
        </section>

        {/* Masraflar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Ek Masraflar ve Kurulum</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tapu Harcı Oranı</label>
              <p className="text-lg font-black text-gray-700 mb-2">%{tapuHarci}</p>
              <input type="range" min={3} max={4} step={0.5} value={tapuHarci}
                onChange={e => setTapuHarci(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%3</span><span>%4</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Emlakçı Komisyonu</label>
              <p className="text-lg font-black text-gray-700 mb-2">%{emlakciKomisyonu}</p>
              <input type="range" min={0} max={3} step={0.5} value={emlakciKomisyonu}
                onChange={e => setEmlakciKomisyonu(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>%3</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tadilat Bütçesi</label>
              <p className="text-lg font-black text-gray-700 mb-2">{tadilatButce.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={500000} step={10000} value={tadilatButce}
                onChange={e => setTadilatButce(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>500K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nakliye & Yerleşim</label>
              <p className="text-lg font-black text-gray-700 mb-2">{nakliyat.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={100000} step={5000} value={nakliyat}
                onChange={e => setNakliyat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>100K</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">{sonuc.toplamBaslangiçOdeme.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Başlangıç Ödemesi</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.aylikTaksit.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Aylık Kredi Taksiti</p>
          </div>
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center col-span-2 sm:col-span-1">
            <p className="text-xl font-black text-rose-600">{(sonuc.toplamSahiplikMaliyeti / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Sahiplik Maliyeti</p>
          </div>
        </section>

        {/* Maliyet Dağılımı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Başlangıç Maliyet Dağılımı</h2>
          <div className="space-y-3">
            {masrafKalemleri.filter(m => m.tutar > 0).map((m, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-xs font-bold text-gray-700">{m.kalem}</p>
                  <p className="text-xs font-black text-gray-900">{m.tutar.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#00C49F] h-full rounded-full" style={{ width: `${(m.tutar / Math.max(1, maxMasraf)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
            <p className="text-xs font-black text-gray-700">Ek Masraflar Toplamı</p>
            <p className="text-xs font-black text-rose-600">{sonuc.ekMasraflar.toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="mt-1 flex justify-between">
            <p className="text-xs font-black text-gray-700">İlk Yıl Toplam Maliyeti</p>
            <p className="text-xs font-black text-gray-900">{sonuc.ilkYilToplamMaliyet.toLocaleString('tr-TR')} ₺</p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
