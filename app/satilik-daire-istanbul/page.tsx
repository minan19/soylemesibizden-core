import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Satılık Daire İstanbul | En Güncel İstanbul Daire İlanları | Söylemesi Bizden',
  description:
    'İstanbul satılık daire ilanları: Avrupa yakası, Anadolu yakası, merkezi ilçeler. Fiyat karşılaştırması, ₺/m² analizi ve bölgeye göre konut seçenekleri.',
};

const ILCELER = [
  { ilce: 'Beşiktaş', min: 35000, max: 90000, profil: 'Prestijli, merkezi, yüksek talep' },
  { ilce: 'Kadıköy', min: 28000, max: 75000, profil: 'Canlı yaşam, Anadolu yakası merkezi' },
  { ilce: 'Şişli', min: 25000, max: 70000, profil: 'İş merkezi yakını, ulaşım kolaylığı' },
  { ilce: 'Üsküdar', min: 22000, max: 60000, profil: 'Sakin, tarihi doku, Boğaz manzarası' },
  { ilce: 'Bahçelievler', min: 15000, max: 35000, profil: 'Uygun fiyatlı Avrupa yakası' },
  { ilce: 'Maltepe', min: 14000, max: 32000, profil: 'Sahil, yeni projeler, Anadolu yakası' },
  { ilce: 'Esenyurt', min: 8000, max: 20000, profil: 'Bütçe dostu, yeni konut projeleri' },
  { ilce: 'Pendik', min: 11000, max: 28000, profil: 'Havalimanı yakını, deniz manzaralı' },
];

const PIYASA_OZETI = [
  { metrik: 'Ortalama ₺/m² (İstanbul)', deger: '32.000 ₺' },
  { metrik: 'En Ucuz İlçe', deger: 'Esenyurt ~8.000 ₺/m²' },
  { metrik: 'En Pahalı İlçe', deger: 'Beşiktaş ~90.000 ₺/m²' },
  { metrik: 'Ortalama Konut Büyüklüğü', deger: '90–110 m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%45–65 (2024)' },
  { metrik: 'Kira Getirisi', deger: '%3.5–5.5 brüt yıllık' },
];

async function getIstanbulListings() {
  try {
    return await prisma.listing.findMany({
      where: { status: 'ACTIVE', listingType: 'SATILIK', city: { contains: 'İstanbul', mode: 'insensitive' } },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, neighborhood: true },
      orderBy: { createdAt: 'desc' },
      take: 9,
    });
  } catch {
    return [];
  }
}

export default async function SatilikDaireIstanbulPage() {
  const ilanlar = await getIstanbulListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İstanbul Gayrimenkul</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Daire İstanbul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İstanbul&apos;un tüm ilçelerinde satılık daire seçenekleri, ₺/m² karşılaştırmaları ve bölgesel piyasa analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İstanbul&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm İlanları Gör
            </Link>
            <Link href="/search?city=İstanbul&listingType=SATILIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Gelişmiş Arama
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Piyasa Özeti */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İstanbul Konut Piyasası Özeti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PIYASA_OZETI.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{p.metrik}</p>
                <p className="text-xs font-black text-[#00C49F]">{p.deger}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İlçe Fiyat Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı ₺/m² Aralıkları</h2>
          <p className="text-xs text-gray-400 mb-4">2024 yılı piyasa verileri.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">Min ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Max ₺/m²</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=İstanbul&district=${ilce.ilce}&listingType=SATILIK`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.min.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.max.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Güncel İlanlar */}
        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel İstanbul İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}{ilan.neighborhood ? ` / ${ilan.neighborhood}` : ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && ilan.price && (
                    <p className="text-[10px] text-gray-400">{Math.round(ilan.price / ilan.area).toLocaleString('tr-TR')} ₺/m²</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/listings?city=İstanbul&listingType=SATILIK" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
                Tüm İstanbul İlanlarını Gör
              </Link>
            </div>
          </div>
        )}

        {/* SEO İçerik */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm prose prose-sm max-w-none">
          <h2 className="text-base font-black text-gray-900 mb-3">İstanbul&apos;da Satılık Daire Almak</h2>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
            İstanbul, Türkiye&apos;nin en büyük ve en dinamik gayrimenkul piyasasına sahip şehridir. Avrupa ve Anadolu yakasında birbirinden farklı fiyat bantlarında konut seçeneği bulunmaktadır. Beşiktaş, Şişli ve Kadıköy gibi merkezi ilçeler yüksek ₺/m² değeri taşırken, Esenyurt, Avcılar ve Beylikdüzü bütçe dostu alternatifler sunar.
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Satın alma sürecinde tapu harcı (%4), DASK zorunlu deprem sigortası ve emlakçı komisyonu (%2+KDV) gibi ek maliyetleri bütçenize dahil etmeyi unutmayın. Yabancı uyruklu alıcılar da İstanbul&apos;da gayrimenkul satın alabilir; bazı ilçelerde yatırım miktarına bağlı oturma izni veya vatandaşlık başvurusu yapılabilir.
          </p>
        </div>

      </div>
    </main>
  );
}
