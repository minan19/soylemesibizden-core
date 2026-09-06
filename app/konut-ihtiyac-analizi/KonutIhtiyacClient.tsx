'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Home, TrendingUp } from 'lucide-react';

const SEHIR_FIYAT: Record<string, { satilik: number; kiralik: number }> = {
  'İstanbul': { satilik: 52800, kiralik: 32000 },
  'Ankara': { satilik: 22400, kiralik: 14500 },
  'İzmir': { satilik: 38600, kiralik: 22000 },
  'Bursa': { satilik: 21800, kiralik: 12000 },
  'Antalya': { satilik: 35200, kiralik: 20000 },
  'Adana': { satilik: 14200, kiralik: 8500 },
  'Konya': { satilik: 15800, kiralik: 9000 },
  'Gaziantep': { satilik: 13500, kiralik: 7500 },
};

const ODA_ONERILERI: Record<string, string> = {
  '1': 'Bekar veya çift için ideal; 45–65 m² aralığında arayın.',
  '2': 'Çift veya bebek sahibi için uygun; 65–90 m² bütçe planlayın.',
  '3': 'Küçük aile (2 çocuk) için yeterli; 90–120 m².',
  '4': 'Büyük aile veya çalışma odası ihtiyacı için; 120–160 m².',
  '5+': 'Geniş aile veya misafir odası gereksinimi; 160 m²+.',
};

export default function KonutIhtiyacClient() {
  const [kisisi, setKisisi] = useState(2);
  const [cocuk, setCocuk] = useState(0);
  const [sehir, setSehir] = useState('İstanbul');
  const [butce, setButce] = useState(3000000);
  const [aylikButce, setAylikButce] = useState(25000);
  const [calismaOdasi, setCalismaOdasi] = useState(false);

  const sonuc = useMemo(() => {
    const toplamKisi = kisisi + cocuk;
    let onerillenOda: string;
    if (toplamKisi <= 1) onerillenOda = '1';
    else if (toplamKisi <= 2) onerillenOda = '2';
    else if (toplamKisi <= 4) onerillenOda = '3';
    else if (toplamKisi <= 6) onerillenOda = '4';
    else onerillenOda = '5+';

    if (calismaOdasi && parseInt(onerillenOda) < 5) {
      const current = parseInt(onerillenOda.replace('+', ''));
      const next = current + 1;
      onerillenOda = next >= 5 ? '5+' : String(next);
    }

    const fiyat = SEHIR_FIYAT[sehir] || SEHIR_FIYAT['İstanbul'];
    const odaSayisi = parseInt(onerillenOda.replace('+', ''));
    const minAlan = odaSayisi * 20 + 20;
    const maxAlan = minAlan + 40;

    const minFiyat = minAlan * fiyat.satilik;
    const maxFiyat = maxAlan * fiyat.satilik;
    const aylikKira = Math.round(fiyat.kiralik * minAlan / 1000) * 1000;

    const satinAlabilir = butce >= minFiyat;
    const kiraAffordable = aylikKira <= aylikButce * 0.35;

    const yillikGetiri = fiyat.kiralik * 12 / (fiyat.satilik * minAlan) * 100;

    return {
      onerillenOda,
      minAlan,
      maxAlan,
      minFiyat,
      maxFiyat,
      aylikKira,
      satinAlabilir,
      kiraAffordable,
      yillikGetiri: Math.round(yillikGetiri * 10) / 10,
      tavsiye: satinAlabilir ? 'Satın Alma' : kiraAffordable ? 'Kiralama' : 'Bütçeyi Artırın',
    };
  }, [kisisi, cocuk, sehir, butce, aylikButce, calismaOdasi]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Konut İhtiyaç Analizi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Konut İhtiyaç Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kaç oda, hangi şehir, kira mı satın mı? Kişisel durumunuza göre öneriler alın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <Users size={14} className="text-[#00C49F]" /> Hane Bilgileri
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Yetişkin Sayısı</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setKisisi(Math.max(1, kisisi - 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-black hover:bg-[#F0FDF8] hover:text-[#00C49F] transition-colors">−</button>
                <span className="text-2xl font-black text-gray-900 w-8 text-center">{kisisi}</span>
                <button onClick={() => setKisisi(Math.min(8, kisisi + 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-black hover:bg-[#F0FDF8] hover:text-[#00C49F] transition-colors">+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Çocuk Sayısı</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setCocuk(Math.max(0, cocuk - 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-black hover:bg-[#F0FDF8] hover:text-[#00C49F] transition-colors">−</button>
                <span className="text-2xl font-black text-gray-900 w-8 text-center">{cocuk}</span>
                <button onClick={() => setCocuk(Math.min(6, cocuk + 1))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 font-black hover:bg-[#F0FDF8] hover:text-[#00C49F] transition-colors">+</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">Şehir</label>
              <select value={sehir} onChange={e => setSehir(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#00C49F]">
                {Object.keys(SEHIR_FIYAT).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Satın Alma Bütçesi</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{(butce / 1000000).toFixed(1)} M ₺</p>
              <input type="range" min={500000} max={20000000} step={250000} value={butce}
                onChange={e => setButce(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Kira Bütçesi</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikButce.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={5000} max={100000} step={1000} value={aylikButce}
                onChange={e => setAylikButce(Number(e.target.value))}
                className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>5K</span><span>100K</span></div>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="calisma" checked={calismaOdasi} onChange={e => setCalismaOdasi(e.target.checked)}
                className="w-4 h-4 accent-[#00C49F]" />
              <label htmlFor="calisma" className="text-xs font-bold text-gray-700 cursor-pointer">Çalışma / Misafir Odası İhtiyacı Var</label>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-3xl font-black text-[#00C49F]">{sonuc.onerillenOda}+1</p>
            <p className="text-xs text-gray-500 mt-1">Önerilen Oda</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.minAlan}–{sonuc.maxAlan} m²</p>
            <p className="text-xs text-gray-500 mt-1">İdeal Alan</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{(sonuc.minFiyat / 1000000).toFixed(1)}–{(sonuc.maxFiyat / 1000000).toFixed(1)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Tahmini Satış</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.aylikKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Tahmini Kira</p>
          </div>
        </section>

        {/* Tavsiye */}
        <section className={`rounded-2xl p-6 ${
          sonuc.tavsiye === 'Satın Alma' ? 'bg-[#F0FDF8] border border-[#00C49F]/20' :
          sonuc.tavsiye === 'Kiralama' ? 'bg-blue-50 border border-blue-100' :
          'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-start gap-3">
            <TrendingUp size={16} className={`shrink-0 mt-0.5 ${
              sonuc.tavsiye === 'Satın Alma' ? 'text-[#00C49F]' :
              sonuc.tavsiye === 'Kiralama' ? 'text-blue-600' : 'text-amber-600'
            }`} />
            <div>
              <p className="text-xs font-black text-gray-900 mb-1">Öneri: {sonuc.tavsiye}</p>
              <p className="text-[10px] text-gray-700 leading-relaxed mb-2">
                {sonuc.onerillenOda}+1 oda önerilmektedir.{' '}
                {ODA_ONERILERI[sonuc.onerillenOda]}
              </p>
              <p className="text-[10px] text-gray-600">
                {sehir} bölgesinde kira getiri oranı yaklaşık <strong>%{sonuc.yillikGetiri}</strong>.{' '}
                {sonuc.satinAlabilir
                  ? 'Bütçeniz bu konutu satın almaya yetebilir.'
                  : sonuc.kiraAffordable
                  ? 'Bütçeniz satın alma için yetersiz; kiralama tavsiye edilir (kira gelirin %35 altında).'
                  : 'Hem satın alma bütçeniz hem de kira bütçeniz bu bölge için sınırlı; farklı şehir veya ilçe değerlendirin.'}
              </p>
            </div>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı? 30 Yıl Analizi' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Karşılaştırma' },
              { href: '/ev-degerleme', label: 'Ev Değerleme Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
