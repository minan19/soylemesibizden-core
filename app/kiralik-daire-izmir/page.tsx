import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiralık Daire İzmir | İzmir Kira Fiyatları | Söylemesi Bizden',
  description:
    'İzmir kiralık daire ilanları: Konak, Karşıyaka, Bornova, Buca, Çiğli bölgelerinde güncel kira fiyatları ve oda bazlı analiz.',
};

const ILCELER = [
  { ilce: 'Karşıyaka', oda1: 12000, oda2: 18000, oda3: 26000 },
  { ilce: 'Konak', oda1: 11000, oda2: 16000, oda3: 24000 },
  { ilce: 'Bornova', oda1: 9000, oda2: 13000, oda3: 19000 },
  { ilce: 'Buca', oda1: 7500, oda2: 11000, oda3: 16000 },
  { ilce: 'Çiğli', oda1: 8000, oda2: 12000, oda3: 17000 },
  { ilce: 'Gaziemir', oda1: 7000, oda2: 10000, oda3: 14000 },
  { ilce: 'Narlıdere', oda1: 10000, oda2: 14000, oda3: 20000 },
  { ilce: 'Balçova', oda1: 9500, oda2: 13500, oda3: 19000 },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. 2+1 Kira (İzmir)', deger: '13.000 ₺' },
  { metrik: 'Yıllık Kira Artışı', deger: '%30–50' },
  { metrik: 'En Pahalı İlçe', deger: 'Karşıyaka 18K ₺' },
  { metrik: 'Kira Çarpanı', deger: '~155 ay' },
  { metrik: 'Depozito', deger: '2 aylık kira' },
  { metrik: 'Yasal Artış Tavanı', deger: '%25 (TÜFE)' },
];

async function getIzmirKiralikListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'KİRALIK',
        city: { contains: 'İzmir', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function KiralikDaireIzmirPage() {
  const ilanlar = await getIzmirKiralikListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İzmir Kiralık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiralık Daire İzmir</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İzmir&apos;in tüm ilçelerinde oda bazlı kiralık daire fiyatları ve güncel ilanlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İzmir&listingType=KİRALIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm Kiralık İlanlar
            </Link>
            <Link href="/izmir-gayrimenkul" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Piyasa Analizi
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İzmir Kiralık Konut Piyasası</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Kira Fiyatları</h2>
          <p className="text-xs text-gray-400 mb-5">Aylık ortalama kira (₺) — oda tipine göre.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">1+1</th>
                <th className="text-center py-2 font-black text-gray-500">2+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">3+1</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=İzmir&district=${ilce.ilce}&listingType=KİRALIK`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda1.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-[#00C49F]">{ilce.oda3.toLocaleString('tr-TR')} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Kiralık İlanlar — İzmir</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-blue-400 text-white">KİRALIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺/ay</p>
                  {ilan.area && (
                    <p className="text-[10px] text-gray-400">{ilan.area} m²{ilan.rooms ? ` · ${ilan.rooms}` : ''}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Kiracı Hakları — Hatırlatma</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            İzmir&apos;de kiralık konut ararken sözleşmeyi imzalamadan önce depozito tutarını, kira artış oranını ve tahliye koşullarını teyit edin. Yasal kira artış tavanı %25&apos;tir; sözleşmede daha yüksek oran yazılı olsa dahi geçersizdir. Daha fazlası için &ldquo;Kiracı Hakları&rdquo; rehberimizi inceleyin.
          </p>
        </div>

      </div>
    </main>
  );
}
