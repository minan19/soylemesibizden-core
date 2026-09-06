'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';

const BIRIM_MALIYETLER = {
  boya: { min: 80, max: 150, birim: 'm²', label: 'Boya (İç Cephe)' },
  zemin: { min: 300, max: 800, birim: 'm²', label: 'Zemin Kaplaması (Laminat/Parke)' },
  seramik: { min: 400, max: 900, birim: 'm²', label: 'Seramik / Fayans' },
  banyo: { min: 20000, max: 60000, birim: 'adet', label: 'Banyo Renovasyonu (Komple)' },
  mutfak: { min: 30000, max: 120000, birim: 'adet', label: 'Mutfak Yenileme (Komple)' },
  elektrik: { min: 15000, max: 40000, birim: 'sabit', label: 'Elektrik Tesisatı Yenileme' },
  suvat: { min: 100, max: 200, birim: 'm²', label: 'Sıva + Alçı' },
  pencere: { min: 3000, max: 7000, birim: 'adet', label: 'PVC Pencere (Ortalama)' },
  kapi: { min: 2000, max: 5000, birim: 'adet', label: 'İç Kapı (PVC/Ahşap)' },
  tesisat: { min: 10000, max: 30000, birim: 'sabit', label: 'Su Tesisatı Yenileme' },
};

type IslemKey = keyof typeof BIRIM_MALIYETLER;

const ISLEM_LISTESI: IslemKey[] = ['boya', 'zemin', 'seramik', 'banyo', 'mutfak', 'elektrik', 'suvat', 'pencere', 'kapi', 'tesisat'];

interface IslemDeger {
  aktif: boolean;
  miktar: number;
  kalite: 'ekonomik' | 'orta' | 'lüks';
}

export default function TadilatClient() {
  const [islemler, setIslemler] = useState<Record<IslemKey, IslemDeger>>(() => {
    const init: Partial<Record<IslemKey, IslemDeger>> = {};
    ISLEM_LISTESI.forEach(k => {
      init[k] = { aktif: false, miktar: k === 'banyo' || k === 'mutfak' || k === 'elektrik' || k === 'tesisat' ? 1 : 50, kalite: 'orta' };
    });
    return init as Record<IslemKey, IslemDeger>;
  });
  const [iscilikPayi, setIscilikPayi] = useState(30);
  const [kdv, setKdv] = useState(20);

  const toggleAktif = (key: IslemKey) => {
    setIslemler(prev => ({ ...prev, [key]: { ...prev[key], aktif: !prev[key].aktif } }));
  };
  const setMiktar = (key: IslemKey, val: number) => {
    setIslemler(prev => ({ ...prev, [key]: { ...prev[key], miktar: val } }));
  };
  const setKalite = (key: IslemKey, val: IslemDeger['kalite']) => {
    setIslemler(prev => ({ ...prev, [key]: { ...prev[key], kalite: val } }));
  };

  const sonuc = useMemo(() => {
    let malzemeMaliyeti = 0;
    const aktifIslemler: { label: string; tutar: number }[] = [];

    ISLEM_LISTESI.forEach(key => {
      const islem = islemler[key];
      if (!islem.aktif) return;
      const veri = BIRIM_MALIYETLER[key];
      const katsayi = islem.kalite === 'ekonomik' ? 0.75 : islem.kalite === 'lüks' ? 1.50 : 1.0;
      const birimFiyat = ((veri.min + veri.max) / 2) * katsayi;
      const toplam = veri.birim === 'sabit' ? birimFiyat : birimFiyat * islem.miktar;
      malzemeMaliyeti += toplam;
      aktifIslemler.push({ label: veri.label, tutar: Math.round(toplam) });
    });

    const iscilik = malzemeMaliyeti * (iscilikPayi / 100);
    const araToplam = malzemeMaliyeti + iscilik;
    const kdvTutari = araToplam * (kdv / 100);
    const genel = araToplam + kdvTutari;
    const tampon = genel * 0.15;

    return {
      malzemeMaliyeti: Math.round(malzemeMaliyeti),
      iscilik: Math.round(iscilik),
      araToplam: Math.round(araToplam),
      kdvTutari: Math.round(kdvTutari),
      genel: Math.round(genel),
      tampon: Math.round(tampon),
      genelTamponlu: Math.round(genel + tampon),
      aktifIslemler,
    };
  }, [islemler, iscilikPayi, kdv]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Wrench size={13} /> Tadilat Maliyet Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Tadilat Maliyet Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yapılacak tadilat işlemlerini seçin, miktarı ve kalite seviyesini belirleyin; toplam maliyeti hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* İşlemler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Tadilat İşlemleri</h2>
          <div className="space-y-4">
            {ISLEM_LISTESI.map(key => {
              const veri = BIRIM_MALIYETLER[key];
              const islem = islemler[key];
              return (
                <div key={key} className={`border rounded-xl p-4 transition-colors ${islem.aktif ? 'border-[#00C49F]/30 bg-[#F0FDF8]' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={islem.aktif} onChange={() => toggleAktif(key)}
                        className="accent-[#00C49F] w-4 h-4" />
                      <span className="text-xs font-bold text-gray-800">{veri.label}</span>
                    </label>
                    {islem.aktif && (
                      <div className="flex gap-1">
                        {(['ekonomik', 'orta', 'lüks'] as const).map(k => (
                          <button key={k} onClick={() => setKalite(key, k)}
                            className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${islem.kalite === k ? 'bg-[#00C49F] text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                            {k.charAt(0).toUpperCase() + k.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {islem.aktif && veri.birim !== 'sabit' && (
                    <div className="mt-2">
                      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                        <span>Miktar: {islem.miktar} {veri.birim}</span>
                        <span>~{Math.round(((veri.min + veri.max) / 2) * (islem.kalite === 'ekonomik' ? 0.75 : islem.kalite === 'lüks' ? 1.5 : 1) * islem.miktar).toLocaleString('tr-TR')} ₺</span>
                      </div>
                      <input type="range" min={veri.birim === 'adet' ? 1 : 10} max={veri.birim === 'adet' ? 20 : 300} step={veri.birim === 'adet' ? 1 : 10}
                        value={islem.miktar} onChange={e => setMiktar(key, Number(e.target.value))}
                        className="w-full accent-[#00C49F]" />
                    </div>
                  )}
                  {islem.aktif && veri.birim === 'sabit' && (
                    <p className="text-[10px] text-gray-500 mt-1">~{Math.round(((veri.min + veri.max) / 2) * (islem.kalite === 'ekonomik' ? 0.75 : islem.kalite === 'lüks' ? 1.5 : 1)).toLocaleString('tr-TR')} ₺ sabit maliyet</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Parametreler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-5">Genel Parametreler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">İşçilik Payı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{iscilikPayi}</p>
              <input type="range" min={20} max={50} step={5} value={iscilikPayi}
                onChange={e => setIscilikPayi(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%20</span><span>%50</span></div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">KDV Oranı</label>
              <p className="text-lg font-black text-[#00C49F] mb-2">%{kdv}</p>
              <input type="range" min={10} max={20} step={10} value={kdv}
                onChange={e => setKdv(Number(e.target.value))} className="w-full accent-[#00C49F]" />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%10</span><span>%20</span></div>
            </div>
          </div>
        </section>

        {/* Özet */}
        {sonuc.aktifIslemler.length > 0 ? (
          <>
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-sm font-black text-gray-900 mb-4">Maliyet Özeti</h2>
              <div className="space-y-2">
                {sonuc.aktifIslemler.map((is, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <p className="text-xs text-gray-700">{is.label}</p>
                    <p className="text-xs font-black text-gray-900">{is.tutar.toLocaleString('tr-TR')} ₺</p>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                  <p className="text-xs font-bold text-gray-700">Malzeme Toplamı</p>
                  <p className="text-xs font-black text-gray-900">{sonuc.malzemeMaliyeti.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-xs text-gray-500">İşçilik (%{iscilikPayi})</p>
                  <p className="text-xs text-gray-700">{sonuc.iscilik.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-xs text-gray-500">KDV (%{kdv})</p>
                  <p className="text-xs text-gray-700">{sonuc.kdvTutari.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between py-2 border-t border-[#00C49F]/20 bg-[#F0FDF8] rounded-xl px-2 mt-1">
                  <p className="text-xs font-black text-gray-900">Tahmini Toplam</p>
                  <p className="text-xs font-black text-[#00C49F]">{sonuc.genel.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between py-1">
                  <p className="text-xs text-amber-600">+%15 Beklenmedik Gider Tamponu</p>
                  <p className="text-xs text-amber-600 font-bold">{sonuc.tampon.toLocaleString('tr-TR')} ₺</p>
                </div>
                <div className="flex justify-between py-2 font-black text-base">
                  <p className="text-xs text-gray-900">Önerilen Toplam Bütçe</p>
                  <p className="text-sm font-black text-gray-900">{sonuc.genelTamponlu.toLocaleString('tr-TR')} ₺</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
            <p className="text-xs text-gray-400">Yukarıdan tadilat işlemlerini seçin</p>
          </section>
        )}

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyet Hesaplayıcı' },
              { href: '/yatirim-butce-hesaplayici', label: 'Yatırım Bütçe Hesaplayıcı' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/tadilat-rehberi', label: 'Tadilat Rehberi' },
              { href: '/muteahhit-secimi', label: 'Müteahhit Seçimi' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
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
