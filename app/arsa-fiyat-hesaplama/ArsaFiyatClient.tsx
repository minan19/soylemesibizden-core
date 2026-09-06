'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingUp } from 'lucide-react';

const BOLGE_YAPI_MALIYETI: Record<string, number> = {
  'İstanbul': 22000,
  'Ankara': 18000,
  'İzmir': 19000,
  'Bursa': 17000,
  'Antalya': 18500,
  'Diğer Büyükşehir': 16000,
  'İlçe/Taşra': 13000,
};

export default function ArsaFiyatClient() {
  const [arsaAlani, setArsaAlani] = useState(500);
  const [taks, setTaks] = useState(0.30);
  const [kaks, setKaks] = useState(1.50);
  const [katAdedi, setKatAdedi] = useState(5);
  const [bolge, setBolge] = useState('İstanbul');
  const [satisFiyati, setSatisFiyati] = useState(85000);
  const [arsa_birim_fiyat, setArsaBirimFiyat] = useState(15000);

  const sonuc = useMemo(() => {
    const insaatAlani = arsaAlani * kaks;
    const tabanAlani = arsaAlani * taks;
    const yapimMaliyeti = BOLGE_YAPI_MALIYETI[bolge] || 16000;

    const toplamInsaatMaliyeti = insaatAlani * yapimMaliyeti;
    const arsaMaliyeti = arsaAlani * arsa_birim_fiyat;
    const toplamMaliyet = toplamInsaatMaliyeti + arsaMaliyeti;

    const toplamSatisGeliri = insaatAlani * satisFiyati;
    const brutkKar = toplamSatisGeliri - toplamMaliyet;
    const karMarji = (brutkKar / toplamMaliyet) * 100;

    const maxArsaDegeri = toplamSatisGeliri * 0.35 - toplamInsaatMaliyeti;
    const maxArsaBirimFiyat = maxArsaDegeri / arsaAlani;

    return {
      insaatAlani: Math.round(insaatAlani),
      tabanAlani: Math.round(tabanAlani),
      toplamInsaatMaliyeti: Math.round(toplamInsaatMaliyeti),
      arsaMaliyeti: Math.round(arsaMaliyeti),
      toplamMaliyet: Math.round(toplamMaliyet),
      toplamSatisGeliri: Math.round(toplamSatisGeliri),
      brutkKar: Math.round(brutkKar),
      karMarji: Math.round(karMarji * 10) / 10,
      maxArsaDegeri: Math.round(Math.max(0, maxArsaDegeri)),
      maxArsaBirimFiyat: Math.round(Math.max(0, maxArsaBirimFiyat)),
      karlimi: brutkKar > 0,
    };
  }, [arsaAlani, taks, kaks, katAdedi, bolge, satisFiyati, arsa_birim_fiyat]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Arsa Fiyat Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Arsa Fiyat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İmar durumu ve inşaat maliyetiyle arsa değerini ve projenin kârlılığını tahmin edin.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Arsa ve İmar Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Arsa Alanı (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{arsaAlani.toLocaleString('tr-TR')} m²</p>
              <input type="range" min={100} max={5000} step={50} value={arsaAlani}
                onChange={e => setArsaAlani(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>100</span><span>5.000</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">TAKS (Taban Alanı Katsayısı)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{taks.toFixed(2)}</p>
              <input type="range" min={0.10} max={0.60} step={0.05} value={taks}
                onChange={e => setTaks(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0.10</span><span>0.60</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">KAKS/Emsal (Toplam İnşaat Alanı/Arsa)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{kaks.toFixed(2)}</p>
              <input type="range" min={0.50} max={4.00} step={0.25} value={kaks}
                onChange={e => setKaks(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0.50</span><span>4.00</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Bölge</label>
              <select value={bolge} onChange={e => setBolge(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(BOLGE_YAPI_MALIYETI).map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Satış Fiyatı (₺/m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{satisFiyati.toLocaleString('tr-TR')} ₺/m²</p>
              <input type="range" min={10000} max={200000} step={5000} value={satisFiyati}
                onChange={e => setSatisFiyati(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>10K</span><span>200K</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Arsa Birim Fiyatı (₺/m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{arsa_birim_fiyat.toLocaleString('tr-TR')} ₺/m²</p>
              <input type="range" min={1000} max={200000} step={1000} value={arsa_birim_fiyat}
                onChange={e => setArsaBirimFiyat(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1K</span><span>200K</span></div>
            </div>

          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-2xl font-black text-[#00C49F]">{sonuc.insaatAlani.toLocaleString('tr-TR')} m²</p>
            <p className="text-xs text-gray-500 mt-1">Toplam İnşaat Alanı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.toplamInsaatMaliyeti / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">İnşaat Maliyeti</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.arsaMaliyeti / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Arsa Maliyeti</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.toplamMaliyet / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Maliyet</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.toplamSatisGeliri / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Satış Geliri</p>
          </div>
          <div className={`rounded-2xl border p-4 text-center ${sonuc.karlimi ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-rose-50 border-rose-100'}`}>
            <p className={`text-xl font-black ${sonuc.karlimi ? 'text-[#00C49F]' : 'text-rose-600'}`}>
              {sonuc.karlimi ? '+' : ''}{(sonuc.brutkKar / 1000000).toFixed(1)} M ₺
            </p>
            <p className="text-xs text-gray-500 mt-1">Brüt Kâr ({sonuc.karMarji}%)</p>
          </div>
        </section>

        {/* Max Arsa Değeri */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-xs font-black text-gray-900 mb-1">Maksimum Ödeyebileceğiniz Arsa Fiyatı</p>
          <p className="text-2xl font-black text-amber-700 mb-1">{sonuc.maxArsaBirimFiyat.toLocaleString('tr-TR')} ₺/m²</p>
          <p className="text-[10px] text-gray-600">Bu fiyatın üzerinde arsa alırsanız gelirin %35 kuralı çerçevesinde kâr marjı baskı altına girer. Hesaplama, toplam satış gelirinin %35 arsa payı ve %65 inşaat + kâr payı ilkesine dayanmaktadır.</p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/muteahhit-secimi', label: 'Müteahhit Seçimi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/vergi-planlama', label: 'Vergi Planlama Rehberi' },
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
