import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Satılık Villa | Lüks ve Müstakil Villa İlanları | Söylemesi Bizden',
  description:
    'Satılık villa ilanları: İstanbul, Antalya, Bodrum, İzmir ve daha fazlasında lüks villa, yazlık villa ve müstakil ev seçenekleri.',
};

const VILLA_BOLGELER = [
  { bolge: 'Bodrum', tip: 'Yalıkavak / Türkbükü', min: 15000000, max: 200000000, ozellik: 'Deniz manzarası, yat iskelesi' },
  { bolge: 'Antalya — Kalkan', tip: 'Kaş / Kalkan', min: 8000000, max: 80000000, ozellik: 'Akdeniz manzarası' },
  { bolge: 'İstanbul — Çeşme', tip: 'Alaçatı / Çeşme', min: 10000000, max: 120000000, ozellik: 'Sahil, rüzgar sörfü' },
  { bolge: 'İstanbul — Avrupa', tip: 'Beykoz / Sarıyer', min: 20000000, max: 300000000, ozellik: 'Boğaz manzarası' },
  { bolge: 'Sapanca / Abant', tip: 'Göl bölgesi', min: 5000000, max: 30000000, ozellik: 'Doğa içinde huzur' },
  { bolge: 'Fethiye', tip: 'Göcek / Ölüdeniz', min: 7000000, max: 60000000, ozellik: 'Mavi lagün' },
];

const VILLA_OZELLIKLERI = [
  { ozellik: 'Müstakil Bahçe', aciklama: 'Özel bahçe ve dış alan kullanımı' },
  { ozellik: 'Özel Havuz', aciklama: 'Isıtmalı veya açık yüzme havuzu' },
  { ozellik: 'Garaj', aciklama: '2–4 araçlık kapalı garaj' },
  { ozellik: 'Güvenlik', aciklama: '7/24 güvenlik, kamera sistemi' },
  { ozellik: 'Manzara', aciklama: 'Deniz, orman veya boğaz görüntüsü' },
  { ozellik: 'Akıllı Ev', aciklama: 'Otomasyon sistemleri, ses/ışık kontrolü' },
];

async function getVillaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'SATILIK',
        propertyType: { in: ['VİLLA', 'MÜSTAKIL', 'villa', 'mustakil'] },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, city: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function SatilikVillaPage() {
  const ilanlar = await getVillaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Lüks Gayrimenkul</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Villa</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin en gözde bölgelerinde müstakil villa, yazlık villa ve lüks konut ilanları.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?propertyType=VİLLA&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Villa İlanlarını Gör
            </Link>
            <Link href="/luks" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Lüks Koleksiyon
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Bölge Fiyat Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Bölge Bazlı Villa Fiyatları</h2>
          <p className="text-xs text-gray-400 mb-5">2024 yılı villa fiyat aralıkları.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-left py-2 font-black text-gray-500">Lokasyon</th>
                <th className="text-center py-2 font-black text-gray-500">Min Fiyat</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Max Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {VILLA_BOLGELER.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.bolge}</td>
                  <td className="py-2 font-bold text-gray-500">{b.tip}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{(b.min / 1000000).toFixed(0)}M ₺</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{(b.max / 1000000).toFixed(0)}M ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Villa Özellikleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Villa Konutlarda Aranan Özellikler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VILLA_OZELLIKLERI.map((o, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">✓ {o.ozellik}</p>
                <p className="text-[10px] text-gray-400">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Güncel İlanlar */}
        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Öne Çıkan Villa İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.city ?? ''}{ilan.district ? ` / ${ilan.district}` : ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && <p className="text-[10px] text-gray-400">{ilan.area} m² • {ilan.rooms ?? '—'} oda</p>}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tüm Villalar CTA */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 text-center">
          <p className="text-white font-black text-sm mb-1">Lüks villalara özel koleksiyona göz atın</p>
          <p className="text-gray-300 text-xs mb-4">Piyasa değerinin üzerindeki premium gayrimenkuller.</p>
          <Link href="/luks" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
            Lüks Koleksiyon
          </Link>
        </div>

      </div>
    </main>
  );
}
