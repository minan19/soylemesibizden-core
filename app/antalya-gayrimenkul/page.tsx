import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Antalya Gayrimenkul | Satılık ve Kiralık Daire Antalya | Söylemesi Bizden',
  description:
    'Antalya gayrimenkul piyasası: Konyaaltı, Muratpaşa, Kepez, Lara, Kaleiçi bölgelerinde satılık ve kiralık ilanlar, yabancı yatırımcı rehberi.',
};

const ILCELER = [
  { ilce: 'Konyaaltı', satilikM2: 45000, kiralik2plus1: 20000, profil: 'Sahil, plaj, lüks' },
  { ilce: 'Muratpaşa', satilikM2: 35000, kiralik2plus1: 15000, profil: 'Merkez, Kaleiçi' },
  { ilce: 'Kepez', satilikM2: 18000, kiralik2plus1: 8000, profil: 'Uygun fiyat, iç kesim' },
  { ilce: 'Lara', satilikM2: 50000, kiralik2plus1: 22000, profil: 'Oteller, marina' },
  { ilce: 'Döşemealtı', satilikM2: 22000, kiralik2plus1: 10000, profil: 'Sakin, doğa' },
  { ilce: 'Alanya', satilikM2: 30000, kiralik2plus1: 13000, profil: 'Deniz manzarası, yabancı talep' },
  { ilce: 'Belek / Serik', satilikM2: 35000, kiralik2plus1: 15000, profil: 'Golf, tatil konutu' },
  { ilce: 'Kaş / Kalkan', satilikM2: 65000, kiralik2plus1: 28000, profil: 'Butik lüks, Avrupa talebi' },
];

const PIYASA_OZETI = [
  { metrik: 'Ortalama ₺/m² (Antalya)', deger: '35.000 ₺' },
  { metrik: 'Yabancı Yatırımcı Payı', deger: '%25–35' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%45–65 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.0–5.5' },
  { metrik: 'Kira Çarpanı', deger: '~145 ay' },
  { metrik: 'Vatandaşlık Eşiği (USD)', deger: '400.000 USD' },
];

async function getAntalyaListings() {
  try {
    return await prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { contains: 'Antalya', mode: 'insensitive' } },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function AntalyaGayrimenkulPage() {
  const ilanlar = await getAntalyaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Antalya Gayrimenkul</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Antalya Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Antalya&apos;nın tüm bölgelerinde satılık ve kiralık ilanlar, yabancı yatırımcı rehberi ve bölgesel piyasa analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Antalya&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=Antalya&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Antalya Konut Piyasası Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">Bölge Bazlı Piyasa Verileri</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık ₺/m² ve kiralık 2+1 ortalama fiyatları.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-center py-2 font-black text-gray-500">Satılık ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Kiralık 2+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=Antalya&district=${ilce.ilce}`} className="hover:text-[#00C49F] transition-colors">
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

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Antalya İlanları</h2>
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
          <p className="text-xs font-black text-blue-700 mb-2">Yabancı Yatırımcı Rehberi</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Antalya, Türk gayrimenkulüne yabancı yatırımcılar arasında en yüksek talep gören ikinci şehirdir. <strong>400.000 USD</strong> ve üzerinde gayrimenkul yatırımı, Türk vatandaşlığı başvurusuna hak kazandırır. Alanya, Konyaaltı ve Lara bölgeleri özellikle Rus, Alman ve Ukraynalı yatırımcıların yoğun tercih ettiği alanlardır.
          </p>
        </div>

      </div>
    </main>
  );
}
