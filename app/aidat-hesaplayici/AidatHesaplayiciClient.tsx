'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Building2 } from 'lucide-react';

const HIZMET_TURLERI = [
  { label: 'Kapıcı/Yönetici', key: 'kapici', birimAsgari: 4000, birimMax: 12000, birim: 'aylık maaş', aciklama: 'Daire sayısına bölünür' },
  { label: 'Asansör Bakımı', key: 'asansor', birimAsgari: 800, birimMax: 2500, birim: 'aylık/asansör', aciklama: 'Asansör sayısına göre' },
  { label: 'Temizlik', key: 'temizlik', birimAsgari: 500, birimMax: 3000, birim: 'aylık', aciklama: 'Bina büyüklüğüne göre' },
  { label: 'Bahçe Bakımı', key: 'bahce', birimAsgari: 300, birimMax: 2000, birim: 'aylık', aciklama: 'Bahçe alanına göre' },
  { label: 'Havuz Bakımı', key: 'havuz', birimAsgari: 1500, birimMax: 8000, birim: 'aylık', aciklama: 'Varsa eklenir' },
  { label: 'Güvenlik', key: 'guvenlik', birimAsgari: 8000, birimMax: 25000, birim: 'aylık maaş', aciklama: 'Daire sayısına bölünür' },
  { label: 'Sigorta', key: 'sigorta', birimAsgari: 5000, birimMax: 30000, birim: 'yıllık', aciklama: '12\'ye bölünür' },
  { label: 'Elektrik (Ortak Alan)', key: 'elektrik', birimAsgari: 500, birimMax: 5000, birim: 'aylık', aciklama: 'Daire sayısına bölünür' },
  { label: 'Su (Ortak Alan)', key: 'su', birimAsgari: 200, birimMax: 1500, birim: 'aylık', aciklama: 'Daire sayısına bölünür' },
  { label: 'Boya/Bakım Fonu', key: 'bakim', birimAsgari: 2000, birimMax: 10000, birim: 'yıllık daire başı', aciklama: 'İlerideki masraflar için' },
];

type HizmetKey = 'kapici' | 'asansor' | 'temizlik' | 'bahce' | 'havuz' | 'guvenlik' | 'sigorta' | 'elektrik' | 'su' | 'bakim';

interface AktifHizmet { aktif: boolean; tutar: number }

export default function AidatHesaplayiciClient() {
  const [daireAdet, setDaireAdet] = useState(20);
  const [hizmetler, setHizmetler] = useState<Record<HizmetKey, AktifHizmet>>({
    kapici: { aktif: true, tutar: 8000 },
    asansor: { aktif: true, tutar: 1200 },
    temizlik: { aktif: true, tutar: 1500 },
    bahce: { aktif: false, tutar: 800 },
    havuz: { aktif: false, tutar: 3000 },
    guvenlik: { aktif: false, tutar: 15000 },
    sigorta: { aktif: true, tutar: 12000 },
    elektrik: { aktif: true, tutar: 1500 },
    su: { aktif: true, tutar: 600 },
    bakim: { aktif: true, tutar: 3000 },
  });

  const toggle = (key: HizmetKey) =>
    setHizmetler(prev => ({ ...prev, [key]: { ...prev[key], aktif: !prev[key].aktif } }));
  const setTutar = (key: HizmetKey, tutar: number) =>
    setHizmetler(prev => ({ ...prev, [key]: { ...prev[key], tutar } }));

  const sonuc = useMemo(() => {
    let toplamAylik = 0;
    const satirlar: { label: string; tutarDaire: number }[] = [];

    HIZMET_TURLERI.forEach(h => {
      const hizmet = hizmetler[h.key as HizmetKey];
      if (!hizmet.aktif) return;
      let aylik = hizmet.tutar;
      if (h.key === 'sigorta' || h.key === 'bakim') aylik = hizmet.tutar / 12;
      const dairePay = aylik / daireAdet;
      toplamAylik += dairePay;
      satirlar.push({ label: h.label, tutarDaire: Math.round(dairePay) });
    });

    return { toplamAylik: Math.round(toplamAylik), toplamYillik: Math.round(toplamAylik * 12), satirlar };
  }, [hizmetler, daireAdet]);

  const maxPay = Math.max(...sonuc.satirlar.map(s => s.tutarDaire), 1);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Aidat Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Aidat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Binadaki hizmet maliyetlerini daire sayısına bölerek aylık ve yıllık aidat tutarını hesaplayın.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        {/* Daire Sayısı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-gray-900">Bina / Site Bilgisi</h2>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Toplam Daire / Bağımsız Bölüm Sayısı</label>
            <p className="text-lg font-black text-[#00C49F] mb-2">{daireAdet} daire</p>
            <input type="range" min={4} max={200} step={2} value={daireAdet}
              onChange={e => setDaireAdet(Number(e.target.value))} className="w-full accent-[#00C49F]" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>4</span><span>200</span></div>
          </div>
        </section>

        {/* Hizmetler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bina Hizmetleri ve Maliyetler</h2>
          <div className="space-y-4">
            {HIZMET_TURLERI.map(h => {
              const hizmet = hizmetler[h.key as HizmetKey];
              return (
                <div key={h.key} className={`rounded-xl border p-3 transition-all ${hizmet.aktif ? 'border-[#00C49F]/20 bg-[#F0FDF8]' : 'border-gray-100 bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={hizmet.aktif} onChange={() => toggle(h.key as HizmetKey)}
                        className="accent-[#00C49F] w-3.5 h-3.5" />
                      <span className="text-xs font-black text-gray-900">{h.label}</span>
                    </label>
                    <span className="text-[10px] text-gray-400">{h.birim}</span>
                  </div>
                  {hizmet.aktif && (
                    <div>
                      <p className="text-xs font-black text-[#00C49F] mb-1">{hizmet.tutar.toLocaleString('tr-TR')} ₺</p>
                      <input type="range" min={h.birimAsgari} max={h.birimMax} step={100} value={hizmet.tutar}
                        onChange={e => setTutar(h.key as HizmetKey, Number(e.target.value))} className="w-full accent-[#00C49F]" />
                      <p className="text-[10px] text-gray-400 mt-0.5">{h.aciklama}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Sonuç */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5 text-center">
            <p className="text-3xl font-black text-[#00C49F]">{sonuc.toplamAylik.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Daire Başı Aylık Aidat</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm text-center">
            <p className="text-3xl font-black text-gray-900">{sonuc.toplamYillik.toLocaleString('tr-TR')} ₺</p>
            <p className="text-xs text-gray-500 mt-1">Daire Başı Yıllık Aidat</p>
          </div>
        </section>

        {/* Dağılım */}
        {sonuc.satirlar.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4">Daire Başı Maliyet Dağılımı</h2>
            <div className="space-y-3">
              {sonuc.satirlar.map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-700">{s.label}</span>
                    <span className="text-xs font-black text-[#00C49F]">{s.tutarDaire.toLocaleString('tr-TR')} ₺/ay</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 bg-[#00C49F] rounded-full" style={{ width: `${(s.tutarDaire / maxPay) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/tadilat-maliyet-hesaplayici', label: 'Tadilat Maliyet Hesaplayıcı' },
              { href: '/kira-butce-planlayici', label: 'Kira Bütçe Planlayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/deprem-sigorta-hesaplayici', label: 'Deprem Sigorta Hesaplayıcı' },
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
