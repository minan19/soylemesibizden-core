'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';

export default function KiraButceClient() {
  const [netGelir, setNetGelir] = useState(25000);
  const [kira, setKira] = useState(8000);
  const [aidat, setAidat] = useState(800);
  const [elektrik, setElektrik] = useState(600);
  const [dogalgaz, setDogalgaz] = useState(500);
  const [internet, setInternet] = useState(300);
  const [su, setSu] = useState(150);
  const [tasima, setTasima] = useState(1000);
  const [gida, setGida] = useState(4000);
  const [diger, setDiger] = useState(1500);

  const sonuc = useMemo(() => {
    const toplamKonutGider = kira + aidat + elektrik + dogalgaz + internet + su;
    const toplamYasam = toplamKonutGider + tasima + gida + diger;
    const kiraGelirOrani = (kira / netGelir) * 100;
    const toplamGelirOrani = (toplamYasam / netGelir) * 100;
    const artanPara = netGelir - toplamYasam;
    const idealKiraMax = netGelir * 0.30;
    const idealKiraUyari = kira > idealKiraMax;

    return {
      toplamKonutGider,
      toplamYasam,
      kiraGelirOrani: kiraGelirOrani.toFixed(1),
      toplamGelirOrani: toplamGelirOrani.toFixed(1),
      artanPara,
      idealKiraMax: Math.round(idealKiraMax),
      idealKiraUyari,
    };
  }, [netGelir, kira, aidat, elektrik, dogalgaz, internet, su, tasima, gida, diger]);

  const giderKalemleri = [
    { kalem: 'Kira', tutar: kira, renk: 'bg-rose-400' },
    { kalem: 'Aidat', tutar: aidat, renk: 'bg-orange-400' },
    { kalem: 'Elektrik', tutar: elektrik, renk: 'bg-amber-400' },
    { kalem: 'Doğalgaz', tutar: dogalgaz, renk: 'bg-yellow-400' },
    { kalem: 'İnternet', tutar: internet, renk: 'bg-blue-400' },
    { kalem: 'Su', tutar: su, renk: 'bg-cyan-400' },
    { kalem: 'Ulaşım', tutar: tasima, renk: 'bg-purple-400' },
    { kalem: 'Gıda', tutar: gida, renk: 'bg-green-400' },
    { kalem: 'Diğer', tutar: diger, renk: 'bg-gray-400' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Kira Bütçe Planlayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Kira Bütçe Planlayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira, faturalar ve yaşam giderlerinizi gelirle karşılaştırın; bütçe sağlığını anlık görün.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Gelir */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Aylık Net Gelir</h2>
          <div>
            <p className="text-2xl font-black text-[#00C49F] mb-2">{netGelir.toLocaleString('tr-TR')} ₺</p>
            <input type="range" min={5000} max={100000} step={1000} value={netGelir}
              onChange={e => setNetGelir(Number(e.target.value))} className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>5K</span><span>100K</span></div>
          </div>
        </section>

        {/* Konut Giderleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Konut Giderleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { label: 'Aylık Kira', value: kira, setter: setKira, max: 50000, step: 500 },
              { label: 'Aidat', value: aidat, setter: setAidat, max: 5000, step: 100 },
              { label: 'Elektrik', value: elektrik, setter: setElektrik, max: 3000, step: 100 },
              { label: 'Doğalgaz', value: dogalgaz, setter: setDogalgaz, max: 3000, step: 100 },
              { label: 'İnternet', value: internet, setter: setInternet, max: 1000, step: 50 },
              { label: 'Su', value: su, setter: setSu, max: 500, step: 25 },
            ].map(({ label, value, setter, max, step }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
                <p className="text-base font-black text-gray-900 mb-1">{value.toLocaleString('tr-TR')} ₺</p>
                <input type="range" min={0} max={max} step={step} value={value}
                  onChange={e => setter(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            ))}
          </div>
        </section>

        {/* Yaşam Giderleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Yaşam Giderleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Ulaşım', value: tasima, setter: setTasima, max: 5000, step: 250 },
              { label: 'Gıda & Market', value: gida, setter: setGida, max: 15000, step: 500 },
              { label: 'Diğer Giderler', value: diger, setter: setDiger, max: 10000, step: 250 },
            ].map(({ label, value, setter, max, step }) => (
              <div key={label}>
                <label className="block text-xs font-bold text-gray-700 mb-1">{label}</label>
                <p className="text-base font-black text-gray-900 mb-1">{value.toLocaleString('tr-TR')} ₺</p>
                <input type="range" min={0} max={max} step={step} value={value}
                  onChange={e => setter(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı: kira oranı */}
        {sonuc.idealKiraUyari && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-700 font-bold">
            Kira/gelir oranınız %{sonuc.kiraGelirOrani} — ideal eşik %30 ({sonuc.idealKiraMax.toLocaleString('tr-TR')} ₺). Kira bütçenizi gözden geçirin.
          </div>
        )}

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-lg font-black text-gray-900">{sonuc.toplamKonutGider.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Konut Gideri</p>
          </div>
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center">
            <p className="text-lg font-black text-rose-600">{sonuc.toplamYasam.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Gider</p>
          </div>
          <div className={`rounded-2xl border p-4 text-center ${sonuc.artanPara >= 0 ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-rose-50 border-rose-100'}`}>
            <p className={`text-lg font-black ${sonuc.artanPara >= 0 ? 'text-[#00C49F]' : 'text-rose-600'}`}>{sonuc.artanPara.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Kalan / Tasarruf</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className={`text-lg font-black ${parseFloat(sonuc.kiraGelirOrani) <= 30 ? 'text-[#00C49F]' : 'text-rose-600'}`}>%{sonuc.kiraGelirOrani}</p>
            <p className="text-xs text-gray-500 mt-1">Kira/Gelir Oranı</p>
          </div>
        </section>

        {/* Gider Dağılımı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Gider Dağılımı</h2>
          <div className="space-y-2">
            {giderKalemleri.filter(g => g.tutar > 0).map((g, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="text-[10px] font-bold text-gray-500 w-16 shrink-0">{g.kalem}</p>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div className={`${g.renk} h-full rounded-full`} style={{ width: `${Math.min(100, (g.tutar / Math.max(1, netGelir)) * 100)}%` }} />
                </div>
                <p className="text-[10px] font-black text-gray-700 w-20 text-right shrink-0">{g.tutar.toLocaleString('tr-TR')} ₺</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Bar genişlikleri net gelir üzerinden hesaplanmıştır.</p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/butce-planlayici', label: 'Genel Bütçe Planlayıcı' },
              { href: '/kiralik-daire-rehberi', label: 'Kiralık Daire Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/kira-simulatoru', label: 'Kira Simülatörü' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri (Yatırımcı)' },
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
