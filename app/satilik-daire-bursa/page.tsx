import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bursa Satılık Daire | En Güncel Fiyatlar | Söylemesi Bizden',
  description:
    'Bursa satılık daire ilanları: Nilüfer, Osmangazi, Yıldırım, Mudanya ilçelerinde ₺/m² fiyatları ve güncel satılık daire listesi.',
};

const ILCELER = [
  { ilce: 'Nilüfer', m2min: 22000, m2maks: 35000, oda2: 4200000, oda3: 6000000, profil: 'Modern, rezidans' },
  { ilce: 'Osmangazi (Merkez)', m2min: 18000, m2maks: 28000, oda2: 3000000, oda3: 4500000, profil: 'Tarihi, alışveriş' },
  { ilce: 'Mudanya', m2min: 20000, m2maks: 32000, oda2: 3500000, oda3: 5500000, profil: 'Sahil, Marmara' },
  { ilce: 'Görükle', m2min: 16000, m2maks: 22000, oda2: 2500000, oda3: 3800000, profil: 'Üniversite, büyüme' },
  { ilce: 'Yıldırım', m2min: 12000, m2maks: 18000, oda2: 1800000, oda3: 2800000, profil: 'Uygun, sanayi' },
  { ilce: 'Gemlik', m2min: 14000, m2maks: 20000, oda2: 2200000, oda3: 3200000, profil: 'Sahil, liman' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Bursa)', deger: '20.000 ₺' },
  { metrik: 'Nilüfer Zirvesi', deger: '35.000 ₺/m²' },
  { metrik: 'Yıllık Artış', deger: '%35–55 (2024)' },
  { metrik: 'En Uygun İlçe', deger: 'Yıldırım' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.5–6.0' },
  { metrik: 'Metro', deger: 'BURSARAY hattı' },
];

async function getSatilikBursaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'Bursa', mode: 'insensitive' },
        listingType: 'SATILIK',
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function SatilikDaireBursaPage() {
  const ilanlar = await getSatilikBursaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Bursa Satılık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Bursa Satılık Daire</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Bursa&apos;nın tüm ilçelerinde satılık daire fiyatları: ₺/m² karşılaştırması ve güncel ilanlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Bursa&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm Satılık İlanlar
            </Link>
            <Link href="/listings?city=Bursa&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık Seçenekler
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Bursa Satılık Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Satılık Fiyatlar</h2>
          <p className="text-xs text-gray-400 mb-5">₺/m² aralığı ve ortalama daire fiyatları.</p>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">₺/m² Aralığı</th>
                <th className="text-center py-2 font-black text-gray-500">2+1 Ort.</th>
                <th className="text-center py-2 font-black text-gray-500">3+1 Ort.</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{ilce.ilce}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.m2min.toLocaleString('tr-TR')}–{ilce.m2maks.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{(ilce.oda2 / 1000000).toFixed(1)}M ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{(ilce.oda3 / 1000000).toFixed(1)}M ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Bursa Satılık İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-[#00C49F] text-white">SATILIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? 'Bursa'}</p>
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
          <p className="text-xs font-black text-blue-700 mb-2">Bursa Satılık Piyasa Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Bursa, İstanbul&apos;a yakınlığı ve gelişmiş sanayi altyapısıyla hem yatırımcılar hem de kendi evi olmak isteyenler için güçlü bir alternatiftir. Nilüfer ilçesi modern rezidans projeleriyle üst segmentte büyümektedir. Mudanya ve Gemlik sahil konumları yatırım değerini desteklemektedir. BURSARAY metro hattı ulaşım güzergahlarındaki değer artışını sürdürmektedir.
          </p>
        </div>

      </div>
    </main>
  );
}
