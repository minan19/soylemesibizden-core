import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Antalya Kiralık Daire | En Güncel İlanlar | Söylemesi Bizden',
  description:
    'Antalya kiralık daire ilanları: Konyaaltı, Kepez, Muratpaşa, Lara bölgelerinde 1+1, 2+1, 3+1 güncel kiralık fiyatları.',
};

const ILCELER = [
  { ilce: 'Konyaaltı', oda1: 15000, oda2: 22000, oda3: 32000, profil: 'Sahil, yabancı tercih' },
  { ilce: 'Muratpaşa (Lara)', oda1: 18000, oda2: 28000, oda3: 42000, profil: 'Merkez, prestijli' },
  { ilce: 'Kepez', oda1: 10000, oda2: 15000, oda3: 22000, profil: 'Uygun, geniş' },
  { ilce: 'Döşemealtı', oda1: 9000, oda2: 13000, oda3: 19000, profil: 'Sakin, yeşil' },
  { ilce: 'Aksu', oda1: 11000, oda2: 16000, oda3: 24000, profil: 'Havalimanı yakını' },
  { ilce: 'Serik', oda1: 8000, oda2: 12000, oda3: 17000, profil: 'Belek, turizm' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. Kiralık 2+1', deger: '18.000 ₺/ay' },
  { metrik: 'En Pahalı (Lara)', deger: '28.000 ₺/ay' },
  { metrik: 'En Uygun (Serik)', deger: '12.000 ₺/ay' },
  { metrik: 'Yıllık Artış', deger: '%45–62 (2024)' },
  { metrik: 'Yabancı Talep', deger: 'Yüksek (Rus, Alman)' },
  { metrik: 'Sezonluk Etki', deger: 'Yaz +%30–50' },
];

async function getKiralikAntalyaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'Antalya', mode: 'insensitive' },
        listingType: 'KİRALIK',
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'asc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function KiralikDaireAntalyaPage() {
  const ilanlar = await getKiralikAntalyaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Antalya Kiralık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Antalya Kiralık Daire</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Antalya&apos;nın tüm ilçelerinde güncel kiralık daire fiyatları ve oda bazlı karşılaştırma.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Antalya&listingType=KİRALIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm Kiralık İlanlar
            </Link>
            <Link href="/listings?city=Antalya&listingType=SATILIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Satılık Seçenekler
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Antalya Kiralık Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe ve Oda Bazlı Kiralık Fiyatlar</h2>
          <p className="text-xs text-gray-400 mb-5">Ortalama aylık kiralık fiyatları (₺/ay).</p>
          <table className="w-full text-[10px] min-w-[440px]">
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
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{ilce.ilce}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda1.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{ilce.oda2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda3.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Antalya Kiralık İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-blue-400 text-white">KİRALIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? 'Antalya'}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺/ay</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Antalya Kiralık Piyasa Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Antalya kiralık piyasasında güçlü yabancı talep ve turizm sezonu etkisi fiyatları belirlemektedir. Konyaaltı ve Lara bölgelerinde yıllık kiralık sözleşmeler, yaz aylarında günlük/haftalık kiralama rakabetine girmektedir. Uzun dönem kira sözleşmeleri için Kepez ve Döşemealtı daha istikrarlı fiyatlar sunmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
