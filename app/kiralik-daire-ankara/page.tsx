import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiralık Daire Ankara | Güncel Kira İlanları | Söylemesi Bizden',
  description:
    'Ankara kiralık daire ilanları: Çankaya, Keçiören, Yenimahalle ilçelerinde güncel kira fiyatları, oda tipine göre karşılaştırma ve piyasa analizi.',
};

const KIRA_ILCELER = [
  { ilce: 'Çankaya', oda1: 9000, oda2: 14000, oda3: 22000, profil: 'Prestijli merkez' },
  { ilce: 'Keçiören', oda1: 5500, oda2: 8000, oda3: 12000, profil: 'Yoğun, uygun' },
  { ilce: 'Yenimahalle', oda1: 6000, oda2: 9000, oda3: 14000, profil: 'Orta segment' },
  { ilce: 'Mamak', oda1: 4500, oda2: 6500, oda3: 10000, profil: 'Bütçe dostu' },
  { ilce: 'Etimesgut', oda1: 6500, oda2: 10000, oda3: 15000, profil: 'Yeni projeler' },
  { ilce: 'Sincan', oda1: 4000, oda2: 5500, oda3: 8500, profil: 'En uygun' },
  { ilce: 'Pursaklar', oda1: 4500, oda2: 6500, oda3: 10000, profil: 'Sakin yaşam' },
  { ilce: 'Altındağ', oda1: 4000, oda2: 6000, oda3: 9000, profil: 'Tarihi merkez' },
];

const KIRA_OZETI = [
  { metrik: 'Ankara Ortalama 2+1', deger: '9.000 ₺/ay' },
  { metrik: 'En Uygun İlçe', deger: 'Sincan ~4.000 ₺' },
  { metrik: 'En Pahalı İlçe', deger: 'Çankaya ~22.000 ₺' },
  { metrik: 'Yıllık Kira Artışı', deger: '%25 yasal tavan' },
  { metrik: 'Depozito Standardı', deger: '1–2 aylık kira' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.5–7.0' },
];

async function getKiralikAnkaraListings() {
  try {
    return await prisma.listing.findMany({
      where: { status: 'ACTIVE', listingType: 'KİRALIK', city: { contains: 'Ankara', mode: 'insensitive' } },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, neighborhood: true },
      orderBy: { createdAt: 'desc' },
      take: 9,
    });
  } catch {
    return [];
  }
}

export default async function KiralikDaireAnkaraPage() {
  const ilanlar = await getKiralikAnkaraListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Ankara Kiralık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiralık Daire Ankara</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ankara&apos;nın tüm ilçelerinde kiralık daire ilanları, oda tipine göre kira aralıkları ve bölgesel kira analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Ankara&listingType=KİRALIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm İlanları Gör
            </Link>
            <Link href="/search?city=Ankara&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Gelişmiş Arama
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Ankara Kira Piyasası Özeti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KIRA_OZETI.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{p.metrik}</p>
                <p className="text-xs font-black text-[#00C49F]">{p.deger}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Aylık Kira (₺)</h2>
          <p className="text-xs text-gray-400 mb-4">2024 yılı ortalama kira fiyatları.</p>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">1+1</th>
                <th className="text-center py-2 font-black text-gray-500">2+1</th>
                <th className="text-center py-2 font-black text-gray-500">3+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {KIRA_ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=Ankara&district=${ilce.ilce}&listingType=KİRALIK`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda1.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda3.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Kiralık Ankara İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}{ilan.neighborhood ? ` / ${ilan.neighborhood}` : ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺/ay</p>
                  {ilan.area && <p className="text-[10px] text-gray-400">{ilan.area} m² • {ilan.rooms ?? '—'} oda</p>}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/listings?city=Ankara&listingType=KİRALIK" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
                Tüm Ankara Kiralık İlanlarını Gör
              </Link>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Ankara Kiracı Rehberi</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Ankara&apos;da kira piyasası İstanbul&apos;a göre %40–60 daha uygun olup kira getirisi oranları daha yüksektir. Özellikle Çankaya ve Etimesgut&apos;taki yeni konutlar yüksek talep görürken, metro hatları üzerindeki konutlar ek prim taşımaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
