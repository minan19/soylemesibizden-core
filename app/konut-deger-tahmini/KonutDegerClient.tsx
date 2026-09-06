'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

const SEHIR_KATSAYILARI: Record<string, number> = {
  'İstanbul': 1.0,
  'Ankara': 0.60,
  'İzmir': 0.75,
  'Antalya': 0.70,
  'Bursa': 0.55,
  'Eskişehir': 0.45,
  'Kocaeli': 0.58,
  'Gaziantep': 0.42,
  'Konya': 0.40,
  'Bodrum': 0.90,
};

const ILCE_PREMIUM: Record<string, number> = {
  'Merkez/Şehir Merkezi': 1.15,
  'Prestijli Semt': 1.35,
  'Ortalama Semt': 1.0,
  'Gelişmekte Olan Semt': 0.85,
  'Çevre/Uydu Kent': 0.75,
};

const BINA_YASI_KATSAYI: Record<string, number> = {
  'Sıfır (0-2 yıl)': 1.25,
  'Yeni (3-5 yıl)': 1.15,
  'Orta (6-15 yıl)': 1.0,
  'Eski (16-30 yıl)': 0.85,
  'Çok Eski (30+ yıl)': 0.70,
};

export default function KonutDegerClient() {
  const [sehir, setSehir] = useState('İstanbul');
  const [ilceTipi, setIlceTipi] = useState('Ortalama Semt');
  const [binaYasi, setBinaYasi] = useState('Orta (6-15 yıl)');
  const [alan, setAlan] = useState(100);
  const [kat, setKat] = useState(3);
  const [toplamKat, setToplamKat] = useState(8);
  const [asansor, setAsansor] = useState(true);
  const [otopark, setOtopark] = useState(true);
  const [bahce, setBahce] = useState(false);
  const [denizManzara, setDenizManzara] = useState(false);

  const sonuc = useMemo(() => {
    const bazFiyat = 35000;
    const sehirK = SEHIR_KATSAYILARI[sehir] ?? 1.0;
    const ilceK = ILCE_PREMIUM[ilceTipi] ?? 1.0;
    const binaK = BINA_YASI_KATSAYI[binaYasi] ?? 1.0;
    const katK = kat === 1 ? 0.92 : kat === toplamKat ? 1.05 : kat >= toplamKat - 1 ? 1.02 : 1.0;
    const asansorK = asansor ? 1.05 : 0.97;
    const otoparkK = otopark ? 1.08 : 1.0;
    const bahceK = bahce ? 1.06 : 1.0;
    const manzaraK = denizManzara ? 1.15 : 1.0;

    const m2Fiyati = bazFiyat * sehirK * ilceK * binaK * katK * asansorK * otoparkK * bahceK * manzaraK;
    const tahminiDeger = m2Fiyati * alan;
    const minDeger = tahminiDeger * 0.85;
    const maxDeger = tahminiDeger * 1.15;

    const aylikKiraOrta = tahminiDeger * 0.004;
    const brutGetiri = (aylikKiraOrta * 12 / tahminiDeger) * 100;

    return {
      m2Fiyati: Math.round(m2Fiyati),
      tahminiDeger: Math.round(tahminiDeger),
      minDeger: Math.round(minDeger),
      maxDeger: Math.round(maxDeger),
      aylikKira: Math.round(aylikKiraOrta),
      brutGetiri: brutGetiri.toFixed(2),
    };
  }, [sehir, ilceTipi, binaYasi, alan, kat, toplamKat, asansor, otopark, bahce, denizManzara]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Değer Tahmini
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Konut Değer Tahmini</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Şehir, semt, bina yaşı ve özelliklerine göre konutunuzun tahmini piyasa değerini hesaplayın.
          </p>
          <p className="text-[10px] text-amber-400 mt-3">⚠ Bu araç tahmini değer üretir; kesin değer için ekspertiz raporu yaptırın.</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Konum */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Konum Bilgileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Şehir</label>
              <select value={sehir} onChange={e => setSehir(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C49F]/30">
                {Object.keys(SEHIR_KATSAYILARI).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Semt Tipi</label>
              <select value={ilceTipi} onChange={e => setIlceTipi(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C49F]/30">
                {Object.keys(ILCE_PREMIUM).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Bina Yaşı</label>
              <select value={binaYasi} onChange={e => setBinaYasi(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C49F]/30">
                {Object.keys(BINA_YASI_KATSAYI).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Fiziksel Özellikler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Konut Özellikleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Brüt Alan (m²)</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{alan} m²</p>
              <input type="range" min={30} max={500} step={5} value={alan}
                onChange={e => setAlan(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>30m²</span><span>500m²</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Bulunduğu Kat / Toplam Kat</label>
              <p className="text-lg font-black text-gray-700 mb-2">{kat}. Kat / {toplamKat} Kat</p>
              <div className="flex gap-2">
                <input type="range" min={1} max={toplamKat} step={1} value={kat}
                  onChange={e => setKat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
                <input type="range" min={kat} max={30} step={1} value={toplamKat}
                  onChange={e => setToplamKat(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Asansör', value: asansor, set: setAsansor },
              { label: 'Otopark', value: otopark, set: setOtopark },
              { label: 'Bahçe', value: bahce, set: setBahce },
              { label: 'Deniz Manzarası', value: denizManzara, set: setDenizManzara },
            ].map(f => (
              <button key={f.label} onClick={() => f.set(!f.value)}
                className={`p-3 rounded-xl border text-xs font-bold transition-all ${f.value ? 'bg-[#F0FDF8] border-[#00C49F]/30 text-[#00C49F]' : 'bg-gray-50 border-gray-100 text-gray-500'}`}>
                {f.value ? '✓' : '○'} {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Sonuç */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="sm:col-span-2 bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5 text-center">
            <p className="text-3xl font-black text-[#00C49F]">{(sonuc.tahminiDeger / 1000000).toFixed(2)} M ₺</p>
            <p className="text-xs text-gray-500 mt-1">Tahmini Piyasa Değeri</p>
            <p className="text-[10px] text-gray-400 mt-1">{(sonuc.minDeger / 1000000).toFixed(2)}M – {(sonuc.maxDeger / 1000000).toFixed(2)}M ₺ aralığı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-gray-900">{sonuc.m2Fiyati.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">₺/m²</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-blue-600">{sonuc.aylikKira.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Tahmini Kira</p>
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800">
          <span className="font-black">Önemli:</span> Bu hesaplama genel katsayılara dayalı tahminidir. Gerçek değer için lisanslı bir ekspertiz firmasına danışın.
        </div>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
              { href: '/m2-fiyat-karsilastir', label: '₺/m² Karşılaştır' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
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
