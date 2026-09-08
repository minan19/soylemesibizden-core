import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İzmir Karşıyaka Gayrimenkul | Satılık ve Kiralık | Söylemesi Bizden',
  description:
    'İzmir Karşıyaka gayrimenkul piyasası: Bostanlı, Mavişehir, Yalı mahallelerinde satılık ve kiralık daire fiyatları ve İZBAN avantajı.',
};

const MAHALLELER = [
  { mahalle: 'Mavişehir', satilikM2: 82000, kiralik2plus1: 34000, profil: 'Deniz manzarası, lüks' },
  { mahalle: 'Bostanlı', satilikM2: 72000, kiralik2plus1: 30000, profil: 'Sahil, prestij, kafe' },
  { mahalle: 'Yalı', satilikM2: 68000, kiralik2plus1: 28000, profil: 'Kıyı, tarihi köy' },
  { mahalle: 'Karşıyaka Merkez', satilikM2: 65000, kiralik2plus1: 27000, profil: 'Alışveriş, merkezi' },
  { mahalle: 'Tersane', satilikM2: 58000, kiralik2plus1: 24000, profil: 'Sanayi dönüşümü' },
  { mahalle: 'Donanmacı', satilikM2: 62000, kiralik2plus1: 26000, profil: 'Köklü, aile' },
  { mahalle: 'Küçükçiğli', satilikM2: 55000, kiralik2plus1: 23000, profil: 'Sakin, yeşil' },
  { mahalle: 'Naldöken', satilikM2: 50000, kiralik2plus1: 21000, profil: 'Bütçe dostu, gelişen' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Karşıyaka)', deger: '64.000 ₺' },
  { metrik: 'Mavişehir Zirvesi', deger: '82.000+ ₺/m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%42–57 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.3–5.5' },
  { metrik: 'İZBAN', deger: 'Alsancak–Mavişehir' },
  { metrik: 'İzmir Körfezi', deger: 'Kuzey sahil şeridi' },
];

async function getKarsiyakaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'İzmir', mode: 'insensitive' },
        district: { contains: 'Karşıyaka', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function IzmirKarsiyakaPage() {
  const ilanlar = await getKarsiyakaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İzmir Karşıyaka</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İzmir Karşıyaka Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İzmir Körfezi&apos;nin kuzey sahilinde Karşıyaka&apos;da Mavişehir&apos;den Bostanlı&apos;ya mahalle bazlı fiyatlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İzmir&district=Karşıyaka&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=İzmir&district=Karşıyaka&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Karşıyaka Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">Mahalle Bazlı Fiyatlar</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık ₺/m² ve kiralık 2+1 ortalama fiyatları.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Mahalle</th>
                <th className="text-center py-2 font-black text-gray-500">Satılık ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Kiralık 2+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {MAHALLELER.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{m.mahalle}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{m.satilikM2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{m.kiralik2plus1.toLocaleString('tr-TR')} ₺/ay</td>
                  <td className="py-2 text-right font-bold text-gray-400">{m.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Karşıyaka İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block ${ilan.listingType === 'SATILIK' ? 'bg-[#00C49F] text-white' : 'bg-blue-400 text-white'}`}>{ilan.listingType}</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺{ilan.listingType === 'KİRALIK' ? '/ay' : ''}</p>
                  {ilan.area && ilan.price && ilan.listingType === 'SATILIK' && (
                    <p className="text-[10px] text-gray-400">{Math.round(ilan.price / ilan.area).toLocaleString('tr-TR')} ₺/m²</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Karşıyaka Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Karşıyaka, İzmir&apos;in en köklü ve yaşanabilir ilçelerinden biri olarak üst-orta gelir grubu ve emekli nüfusa hitap eden güçlü bir kira talebine sahiptir. Mavişehir sahil bandındaki yüksek katlı rezidans projeleri İzmir&apos;in en pahalı konutlarını barındırırken Bostanlı&apos;nın canlı sosyal ortamı kiralık piyasada yüksek doluluk sağlamaktadır. İZBAN hattının Alsancak&apos;a direkt bağlantısı ulaşım avantajını sürdürmektedir.
          </p>
        </div>

      </div>
    </main>
  );
}
