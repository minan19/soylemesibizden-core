import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Satılık Daire İzmir | İzmir Konut Fiyatları | Söylemesi Bizden',
  description:
    'İzmir satılık daire ilanları: Konak, Karşıyaka, Bornova, Buca, Çiğli bölgelerinde güncel fiyatlar ve ₺/m² analizi.',
};

const ILCELER = [
  { ilce: 'Konak', minM2: 28000, maxM2: 55000, profil: 'Merkez, tarihi yarımada' },
  { ilce: 'Karşıyaka', minM2: 30000, maxM2: 60000, profil: 'Sahil, prestijli' },
  { ilce: 'Bornova', minM2: 20000, maxM2: 38000, profil: 'Üniversite, dinamik' },
  { ilce: 'Buca', minM2: 16000, maxM2: 28000, profil: 'Uygun fiyat, geniş' },
  { ilce: 'Çiğli', minM2: 18000, maxM2: 32000, profil: 'Sanayi yakını, uygun' },
  { ilce: 'Gaziemir', minM2: 15000, maxM2: 25000, profil: 'Havalimanı çevresi' },
  { ilce: 'Çeşme / Alaçatı', minM2: 60000, maxM2: 120000, profil: 'Lüks tatil konutu' },
  { ilce: 'Urla', minM2: 35000, maxM2: 65000, profil: 'Doğa, butik yaşam' },
];

const PIYASA_OZETI = [
  { metrik: 'Ortalama ₺/m² (İzmir)', deger: '32.000 ₺' },
  { metrik: 'Çeşme/Alaçatı ₺/m²', deger: '80.000–120.000 ₺' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%45–70 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%3.5–5.0' },
  { metrik: 'En Popüler İlçe', deger: 'Karşıyaka' },
  { metrik: 'Metrokent Etkisi', deger: 'Güçlü' },
];

async function getIzmirSatilikListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'SATILIK',
        city: { contains: 'İzmir', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function SatilikDaireIzmirPage() {
  const ilanlar = await getIzmirSatilikListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İzmir Satılık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Daire İzmir</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İzmir&apos;in tüm ilçelerinde güncel satılık daire fiyatları, bölge analizi ve yatırım fırsatları.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İzmir&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm İzmir İlanları
            </Link>
            <Link href="/izmir-gayrimenkul" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Piyasa Analizi
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İzmir Satılık Konut Piyasası</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Satılık ₺/m²</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık daire minimum–maksimum ₺/m² aralıkları.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">Min ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Maks ₺/m²</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=İzmir&district=${ilce.ilce}&listingType=SATILIK`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.minM2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.maxM2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Satılık İlanlar — İzmir</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-[#00C49F] text-white">SATILIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && ilan.price && (
                    <p className="text-[10px] text-gray-400">{Math.round(ilan.price / ilan.area).toLocaleString('tr-TR')} ₺/m²</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">İzmir Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            İzmir, Türkiye&apos;nin üçüncü büyük şehri olup Karşıyaka ve Konak sahil bölgeleri en yüksek talep gören alanlardır. Çeşme ve Alaçatı, lüks tatil konutu segmentinde Bodrum ile rekabet etmekte; Avrupa ve yerli yatırımcıların yoğun ilgisini çekmektedir. Metrobus ağı genişledikçe Bornova ve Gaziemir gibi dış ilçeler de değer kazanmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
