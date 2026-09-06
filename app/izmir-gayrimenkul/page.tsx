import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İzmir Gayrimenkul | Satılık ve Kiralık Daire İzmir | Söylemesi Bizden',
  description:
    'İzmir gayrimenkul piyasası: Alsancak, Bornova, Karşıyaka, Konak ilçelerinde satılık ve kiralık daire, villa ve arsa ilanları ile ₺/m² analizi.',
};

const ILCELER = [
  { ilce: 'Konak', satilikM2: 30000, kiralik2plus1: 14000, profil: 'Tarihi merkez, Kordon' },
  { ilce: 'Karşıyaka', satilikM2: 32000, kiralik2plus1: 15000, profil: 'Sahil, prestijli' },
  { ilce: 'Bornova', satilikM2: 22000, kiralik2plus1: 10000, profil: 'Üniversite, dinamik' },
  { ilce: 'Buca', satilikM2: 16000, kiralik2plus1: 7500, profil: 'Uygun fiyatlı' },
  { ilce: 'Çiğli', satilikM2: 20000, kiralik2plus1: 9000, profil: 'Sanayiye yakın' },
  { ilce: 'Güzelbahçe', satilikM2: 35000, kiralik2plus1: 16000, profil: 'Sahil, lüks' },
  { ilce: 'Urla', satilikM2: 40000, kiralik2plus1: 18000, profil: 'Ege yaşam tarzı' },
  { ilce: 'Çeşme / Alaçatı', satilikM2: 80000, kiralik2plus1: 35000, profil: 'Yazlık, premium' },
];

const PIYASA_OZETI = [
  { metrik: 'Ortalama ₺/m² (İzmir)', deger: '28.000 ₺' },
  { metrik: 'En Ucuz İlçe', deger: 'Buca ~16.000 ₺/m²' },
  { metrik: 'En Pahalı İlçe', deger: 'Çeşme ~80.000 ₺/m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%40–60 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.0–6.0' },
  { metrik: 'Kira Çarpanı (İzmir)', deger: '~150 ay' },
];

async function getIzmirListings() {
  try {
    return await prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { contains: 'İzmir', mode: 'insensitive' } },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function IzmirGayrimenkulPage() {
  const ilanlar = await getIzmirListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İzmir Gayrimenkul</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İzmir Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İzmir&apos;in tüm ilçelerinde satılık ve kiralık ilanlar, ₺/m² karşılaştırmaları ve bölgesel piyasa analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İzmir&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=İzmir&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Piyasa Özeti */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İzmir Konut Piyasası Özeti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PIYASA_OZETI.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{p.metrik}</p>
                <p className="text-xs font-black text-[#00C49F]">{p.deger}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İlçe Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Piyasa Verileri</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık ₺/m² ve kiralık 2+1 ortalama fiyatları.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">Satılık ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Kiralık 2+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=İzmir&district=${ilce.ilce}`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.satilikM2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.kiralik2plus1.toLocaleString('tr-TR')} ₺/ay</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Güncel İlanlar */}
        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel İzmir İlanları</h2>
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

        {/* SEO İçerik */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-3">İzmir&apos;de Gayrimenkul Almak</h2>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
            İzmir, Türkiye&apos;nin üçüncü büyük şehri olarak Ege&apos;nin kıyısında konumlanır. Son yıllarda İstanbul&apos;dan göç eden nüfus, kıyı yaşamına olan talepde artış ve turizm potansiyeli nedeniyle İzmir gayrimenkul piyasası güçlü büyüme kaydetmektedir.
          </p>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Çeşme ve Alaçatı gibi kıyı bölgeleri yazlık yatırım için tercih edilirken, Urla ve Güzelbahçe kalıcı oturum için popülerleşmektedir. Bornova ve Buca ise uygun fiyatlı konut arayanlar için alternatif sunmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
