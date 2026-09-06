'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, PiggyBank } from 'lucide-react';

export default function PesinatHesaplayiciClient() {
  const [evFiyati, setEvFiyati] = useState(3000000);
  const [pesinatOrani, setPesinatOrani] = useState(20);
  const [aylikBirikim, setAylikBirikim] = useState(15000);
  const [mevcutBirikim, setMevcutBirikim] = useState(200000);
  const [yillikGetiri, setYillikGetiri] = useState(30);

  const sonuc = useMemo(() => {
    const pesinatTutari = Math.round(evFiyati * (pesinatOrani / 100));
    const ekMasraflar = Math.round(evFiyati * 0.06);
    const toplamGerekli = pesinatTutari + ekMasraflar;
    const eksik = Math.max(0, toplamGerekli - mevcutBirikim);

    const aylikGetiri = yillikGetiri / 12 / 100;
    let birikim = mevcutBirikim;
    let ayCount = 0;
    if (eksik > 0) {
      while (birikim < toplamGerekli && ayCount < 600) {
        birikim = birikim * (1 + aylikGetiri) + aylikBirikim;
        ayCount++;
      }
    }

    const yil = Math.floor(ayCount / 12);
    const ay = ayCount % 12;
    const ulasilabilir = ayCount < 600;

    const birikim5Yil = (() => {
      let b = mevcutBirikim;
      for (let i = 0; i < 60; i++) b = b * (1 + aylikGetiri) + aylikBirikim;
      return Math.round(b);
    })();

    const birikim10Yil = (() => {
      let b = mevcutBirikim;
      for (let i = 0; i < 120; i++) b = b * (1 + aylikGetiri) + aylikBirikim;
      return Math.round(b);
    })();

    return {
      pesinatTutari,
      ekMasraflar,
      toplamGerekli,
      eksik,
      ayCount,
      yil,
      ay,
      ulasilabilir,
      birikim5Yil,
      birikim10Yil,
    };
  }, [evFiyati, pesinatOrani, aylikBirikim, mevcutBirikim, yillikGetiri]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <PiggyBank size={13} /> Peşinat Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Peşinat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Hedeflediğiniz eve ne zaman ulaşabileceğinizi öğrenin: peşinat tutarı, ek masraflar ve birikim süresi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Inputs */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ev Fiyatı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{evFiyati.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={500000} max={20000000} step={100000} value={evFiyati}
                onChange={e => setEvFiyati(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>500K</span><span>20M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Peşinat Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{pesinatOrani}</p>
              <input type="range" min={10} max={50} step={5} value={pesinatOrani}
                onChange={e => setPesinatOrani(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%50</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Mevcut Birikim</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{mevcutBirikim.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={0} max={5000000} step={50000} value={mevcutBirikim}
                onChange={e => setMevcutBirikim(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0</span><span>5M</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Aylık Birikim</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">{aylikBirikim.toLocaleString('tr-TR')} ₺</p>
              <input type="range" min={1000} max={100000} step={1000} value={aylikBirikim}
                onChange={e => setAylikBirikim(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>1K</span><span>100K</span></div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">Yıllık Yatırım Getirisi</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{yillikGetiri}</p>
              <input type="range" min={5} max={60} step={5} value={yillikGetiri}
                onChange={e => setYillikGetiri(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%5</span><span>%60</span></div>
            </div>

          </div>
        </section>

        {/* Özet */}
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-4 text-center">
            <p className="text-xl font-black text-[#00C49F]">{sonuc.pesinatTutari.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Peşinat Tutarı</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm text-center">
            <p className="text-xl font-black text-amber-600">{sonuc.ekMasraflar.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Ek Masraflar (%6)</p>
          </div>
          <div className="bg-rose-50 rounded-2xl border border-rose-100 p-4 text-center sm:col-span-1 col-span-2">
            <p className="text-xl font-black text-rose-600">{sonuc.toplamGerekli.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Toplam Gerekli</p>
          </div>
        </section>

        {/* Süre */}
        <section className={`rounded-2xl border p-6 shadow-sm ${sonuc.eksik === 0 ? 'bg-[#F0FDF8] border-[#00C49F]/30' : 'bg-white border-gray-100'}`}>
          <h2 className="text-sm font-black text-gray-900 mb-3">Hedefe Ulaşma Süresi</h2>
          {sonuc.eksik === 0 ? (
            <div className="text-center py-4">
              <p className="text-3xl font-black text-[#00C49F] mb-2">Hazırsınız!</p>
              <p className="text-sm text-gray-600">Mevcut birikimiz peşinat + ek masrafları karşılamaya yetmektedir.</p>
            </div>
          ) : sonuc.ulasilabilir ? (
            <div className="text-center py-4">
              <p className="text-3xl font-black text-gray-900 mb-1">
                {sonuc.yil > 0 ? `${sonuc.yil} yıl` : ''}{sonuc.ay > 0 ? ` ${sonuc.ay} ay` : ''}
              </p>
              <p className="text-xs text-gray-500">Eksik: {sonuc.eksik.toLocaleString('tr-TR')} ₺ · Mevcut birikimle aylık {aylikBirikim.toLocaleString('tr-TR')} ₺ eklendiğinde</p>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-2xl font-black text-rose-600 mb-2">50 yılı aşıyor</p>
              <p className="text-xs text-gray-500">Aylık birikiminizi artırın veya daha uygun bir fiyat aralığı deneyin.</p>
            </div>
          )}
        </section>

        {/* Projeksiyon */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Birikim Projeksiyonu</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-500 mb-1">5 Yıl Sonra</p>
              <p className="text-lg font-black text-gray-900">{(sonuc.birikim5Yil / 1000000).toFixed(2)} M ₺</p>
              <p className="text-[10px] text-gray-400 mt-1">%{yillikGetiri} getiri ile</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-500 mb-1">10 Yıl Sonra</p>
              <p className="text-lg font-black text-gray-900">{(sonuc.birikim10Yil / 1000000).toFixed(2)} M ₺</p>
              <p className="text-[10px] text-gray-400 mt-1">%{yillikGetiri} getiri ile</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-3 text-center">Mevcut birikim + aylık {aylikBirikim.toLocaleString('tr-TR')} ₺ katkı, bileşik getiri</p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvurusu' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/butce-planlayici', label: 'Bütçe Planlayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı' },
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
