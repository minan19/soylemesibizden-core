import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Satılık Daire Antalya 2025 | Fiyatlar ve İlanlar | Söylemesi Bizden',
  description:
    'Antalya satılık daire fiyatları 2025: Konyaaltı, Muratpaşa, Kepez ilçelerinde m² fiyatları, oda tipleri ve güncel ilanlar.',
};

const ILCE_FIYATLAR = [
  { ilce: 'Konyaaltı', min1p1: 2800000, min2p1: 4500000, min3p1: 7000000, m2Fiyat: 72000 },
  { ilce: 'Muratpaşa', min1p1: 2200000, min2p1: 3800000, min3p1: 6000000, m2Fiyat: 62000 },
  { ilce: 'Lara / Kundu', min1p1: 3500000, min2p1: 6000000, min3p1: 10000000, m2Fiyat: 90000 },
  { ilce: 'Kepez', min1p1: 1500000, min2p1: 2500000, min3p1: 4000000, m2Fiyat: 38000 },
  { ilce: 'Döşemealtı', min1p1: 2000000, min2p1: 3500000, min3p1: 5500000, m2Fiyat: 52000 },
  { ilce: 'Aksu', min1p1: 1800000, min2p1: 3000000, min3p1: 4800000, m2Fiyat: 45000 },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Antalya)', deger: '58.000 ₺' },
  { metrik: 'Lara Zirvesi', deger: '90.000+ ₺/m²' },
  { metrik: 'Yabancı Alıcı Oranı', deger: '%35+ (2024)' },
  { metrik: 'Yıllık Artış', deger: '%55–75 (2024)' },
  { metrik: 'Kira Getirisi', deger: '%4.5–6.5' },
  { metrik: 'Sıfır Proje Sayısı', deger: '200+ aktif' },
];

const OZELLIK_OZETI = [
  { ozellik: 'Havuz', aciklama: 'Yeni projelerin %80\'inde site havuzu' },
  { ozellik: 'Otopark', aciklama: 'Kapalı otopark standart hale geldi' },
  { ozellik: 'Klima', aciklama: 'Tüm dairelerde split klima zorunlu' },
  { ozellik: 'Deniz Manzarası', deger: '%30-50 prim', aciklama: 'Fiyatı önemli ölçüde artırır' },
];

async function getAntalyaSatilikListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'SATILIK',
        city: { contains: 'Antalya', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, neighborhood: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 9,
    });
  } catch {
    return [];
  }
}

export default async function SatilikDaireAntalyaPage() {
  const ilanlar = await getAntalyaSatilikListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Antalya Satılık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Daire Antalya</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            2025 güncel Antalya satılık daire fiyatları: Konyaaltı&apos;ndan Lara&apos;ya ilçe bazlı m² fiyatları ve oda tipi karşılaştırması.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Antalya&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm İlanlar
            </Link>
            <Link href="/antalya-gayrimenkul" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Antalya Rehberi
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Antalya Satılık Piyasa Özeti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PIYASA_OZETI.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{p.metrik}</p>
                <p className="text-xs font-black text-[#00C49F]">{p.deger}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Fiyat Tablosu</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık minimum fiyatlar (₺) — oda tipine göre.</p>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">1+1 Min</th>
                <th className="text-center py-2 font-black text-gray-500">2+1 Min</th>
                <th className="text-right py-2 font-black text-[#00C49F]">3+1 Min</th>
              </tr>
            </thead>
            <tbody>
              {ILCE_FIYATLAR.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{ilce.ilce}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{ilce.m2Fiyat.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{(ilce.min1p1 / 1000000).toFixed(1)}M ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{(ilce.min2p1 / 1000000).toFixed(1)}M ₺</td>
                  <td className="py-2 text-right font-bold text-gray-600">{(ilce.min3p1 / 1000000).toFixed(0)}M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Antalya Konut Özellikleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OZELLIK_OZETI.map((o, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{o.ozellik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Antalya Satılık İlanlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-[#00C49F] text-white">SATILIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{[ilan.neighborhood, ilan.district].filter(Boolean).join(', ')}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && ilan.price && (
                    <p className="text-[10px] text-gray-400">{Math.round(ilan.price / ilan.area).toLocaleString('tr-TR')} ₺/m²</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Antalya Alım Notu</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Antalya&apos;da yabancı yatırımcı talebi fiyatları yukarı baskılamaktadır. Lara ve Konyaaltı sahil bantları talep açısından en yoğun bölgelerdir. Sıfır projeler öncelikli tercih olsa da ikinci el piyasasında da güçlü hareket gözlemlenmektedir. Turizm sezonunda fiyat artışı Eylül sonrasına göre %10-15 daha hızlı gerçekleşmektedir.
          </p>
        </div>

      </div>
    </main>
  );
}
