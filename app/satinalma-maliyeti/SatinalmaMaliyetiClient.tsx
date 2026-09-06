'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function SatinalmaMaliyetiClient() {
  const [satisFiyati, setSatisFiyati] = useState(3000000);
  const [krediKullaniyor, setKrediKullaniyor] = useState(false);
  const [krediOrani, setKrediOrani] = useState(70);
  const [emlakciVar, setEmlakciVar] = useState(true);
  const [ilkKonut, setIlkKonut] = useState(false);

  const sonuc = useMemo(() => {
    // Tapu harcı: normalde %4, ilk konut+koşullar sağlanırsa %3
    const tapuHarciOrani = ilkKonut ? 0.03 : 0.04;
    const tapuHarci = satisFiyati * tapuHarciOrani;

    // Döner sermaye 2024 tahmini
    const donerSermaye = 3200;

    // Emlakçı komisyonu %2 + KDV (alıcı payı)
    const emlakciKomisyonu = emlakciVar ? satisFiyati * 0.02 * 1.20 : 0;

    // DASK (zorunlu deprem sigortası) — tahmini
    const dask = Math.min(satisFiyati * 0.0005, 5000);

    // Ekspertiz ücreti (kredi kullanımında zorunlu)
    const ekspertiz = krediKullaniyor ? 2500 : 0;

    // Kredi masrafları (kullanılıyorsa)
    const krediTutari = krediKullaniyor ? (satisFiyati * krediOrani) / 100 : 0;
    const krediMasrafi = krediKullaniyor ? krediTutari * 0.005 + 1500 : 0; // %0,5 dosya ücreti + hayat sigortası tahmini

    // Toplam masraf
    const toplamMasraf = tapuHarci + donerSermaye + emlakciKomisyonu + dask + ekspertiz + krediMasrafi;
    const toplamMaliyet = satisFiyati + toplamMasraf;
    const masrafOrani = (toplamMasraf / satisFiyati) * 100;

    return {
      tapuHarci: Math.round(tapuHarci),
      donerSermaye,
      emlakciKomisyonu: Math.round(emlakciKomisyonu),
      dask: Math.round(dask),
      ekspertiz,
      krediMasrafi: Math.round(krediMasrafi),
      krediTutari: Math.round(krediTutari),
      toplamMasraf: Math.round(toplamMasraf),
      toplamMaliyet: Math.round(toplamMaliyet),
      masrafOrani: Math.round(masrafOrani * 10) / 10,
    };
  }, [satisFiyati, krediKullaniyor, krediOrani, emlakciVar, ilkKonut]);

  const kalemler = [
    { ad: 'Tapu Harcı', tutar: sonuc.tapuHarci, aciklama: ilkKonut ? '%3 (ilk konut)' : '%4' },
    { ad: 'Döner Sermaye', tutar: sonuc.donerSermaye, aciklama: 'Tapu sicil ücreti' },
    { ad: 'Emlakçı Komisyonu', tutar: sonuc.emlakciKomisyonu, aciklama: '%2 + %20 KDV', gizle: !emlakciVar },
    { ad: 'DASK Zorunlu Sigorta', tutar: sonuc.dask, aciklama: 'Tahmini yıllık prim' },
    { ad: 'Ekspertiz Ücreti', tutar: sonuc.ekspertiz, aciklama: 'Banka zorunluluğu', gizle: !krediKullaniyor },
    { ad: 'Kredi Masrafları', tutar: sonuc.krediMasrafi, aciklama: 'Dosya ücreti + hayat sigortası', gizle: !krediKullaniyor },
  ].filter(k => !k.gizle);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Calculator size={13} /> Alım Maliyeti Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Gayrimenkul Satın Alma Maliyeti</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tapu harcı, komisyon, DASK ve kredi masraflarıyla gerçek toplam maliyeti hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Alım Bilgileri</h2>
          <div className="space-y-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Satış Fiyatı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{satisFiyati.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={satisFiyati}
                onChange={e => setSatisFiyati(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div onClick={() => setKrediKullaniyor(v => !v)}
                  className={`w-10 h-5 rounded-full transition-colors ${krediKullaniyor ? 'bg-[#00C49F]' : 'bg-gray-200'} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${krediKullaniyor ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs text-gray-700">Kredi Kullanıyorum</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div onClick={() => setEmlakciVar(v => !v)}
                  className={`w-10 h-5 rounded-full transition-colors ${emlakciVar ? 'bg-[#00C49F]' : 'bg-gray-200'} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${emlakciVar ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs text-gray-700">Emlakçı Var</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <div onClick={() => setIlkKonut(v => !v)}
                  className={`w-10 h-5 rounded-full transition-colors ${ilkKonut ? 'bg-[#00C49F]' : 'bg-gray-200'} relative`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${ilkKonut ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-xs text-gray-700">İlk Konut</span>
              </label>
            </div>

            {krediKullaniyor && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Kredi Oranı</label>
                <p className="text-lg font-black text-[#00C49F] mb-2">%{krediOrani} — {sonuc.krediTutari.toLocaleString('tr-TR')} ₺</p>
                <input type="range" min={10} max={90} step={5} value={krediOrani}
                  onChange={e => setKrediOrani(Number(e.target.value))}
                  className="w-full accent-[#00C49F]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%90</span></div>
              </div>
            )}

          </div>
        </section>

        {/* Kalemler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Maliyet Kalemleri</h2>
          <div className="space-y-2">
            {kalemler.map((k, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-bold text-gray-900">{k.ad}</p>
                  <p className="text-[10px] text-gray-400">{k.aciklama}</p>
                </div>
                <p className="text-xs font-black text-gray-800">{k.tutar.toLocaleString('tr-TR')} ₺</p>
              </div>
            ))}
            <div className="flex items-center justify-between py-3 bg-[#F0FDF8] rounded-xl px-3 mt-2">
              <p className="text-xs font-black text-gray-900">Toplam Ek Masraf</p>
              <p className="text-sm font-black text-[#00C49F]">{sonuc.toplamMasraf.toLocaleString('tr-TR')} ₺</p>
            </div>
          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-lg font-black text-gray-900">{(satisFiyati / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Satış Fiyatı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-lg font-black text-amber-600">{(sonuc.toplamMasraf / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Ek Masraflar (%{sonuc.masrafOrani})</p>
          </div>
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-lg font-black text-[#00C49F]">{(sonuc.toplamMaliyet / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Maliyet</p>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/pesinat-plani', label: 'Peşinat Planlayıcı' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
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
