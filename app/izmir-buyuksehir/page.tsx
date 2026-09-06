import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İzmir Gayrimenkul Rehberi | Tüm İlçeler | Söylemesi Bizden',
  description:
    'İzmir büyükşehir gayrimenkul analizi: Karşıyaka, Bornova, Buca, Konak, Çiğli, Gaziemir ilçelerinde fiyat karşılaştırması.',
};

const ILCELER = [
  { ilce: 'Karşıyaka', m2: 55000, kirali2: 24000, profil: 'Sahil, prestijli', artis: 58 },
  { ilce: 'Bornova', m2: 45000, kirali2: 18000, profil: 'Üniversite, genç', artis: 52 },
  { ilce: 'Buca', m2: 38000, kirali2: 15000, profil: 'Büyüyen, metro', artis: 50 },
  { ilce: 'Konak (Merkez)', m2: 48000, kirali2: 20000, profil: 'Tarihi, merkezi', artis: 48 },
  { ilce: 'Çiğli', m2: 35000, kirali2: 13000, profil: 'Sanayi, ulaşım', artis: 45 },
  { ilce: 'Gaziemir', m2: 32000, kirali2: 12000, profil: 'Havalimanı, endüstri', artis: 43 },
  { ilce: 'Balçova', m2: 42000, kirali2: 17000, profil: 'Sakin, yeşil', artis: 50 },
  { ilce: 'Bayraklı', m2: 40000, kirali2: 16000, profil: 'İş kulesi, rezidans', artis: 55 },
  { ilce: 'Narlıdere', m2: 50000, kirali2: 21000, profil: 'Koru, sakin', artis: 54 },
  { ilce: 'Urla', m2: 60000, kirali2: 28000, profil: 'Sahil, tatil', artis: 65 },
];

const PIYASA_OZETI = [
  { metrik: 'Şehir Geneli Ort. ₺/m²', deger: '44.000 ₺' },
  { metrik: 'En Pahalı (Urla)', deger: '60.000+ ₺/m²' },
  { metrik: 'Yıllık Artış (Ort.)', deger: '%50–65 (2024)' },
  { metrik: 'Metro Hattı', deger: 'M1 + M2 + M3' },
  { metrik: 'Brüt Getiri (Ort.)', deger: '%4.0–5.5' },
  { metrik: 'Yabancı Talep', deger: 'Orta (Batı Avrupalı)' },
];

async function getIzmirListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
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

export default async function IzmirBuyuksehirPage() {
  const ilanlar = await getIzmirListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İzmir Büyükşehir</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İzmir Gayrimenkul Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İzmir&apos;in tüm ilçelerinde satılık ve kiralık daire fiyatları, yıllık artış oranları ve yatırım profili.
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

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İzmir Büyükşehir Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Fiyat ve Artış Tablosu</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık ₺/m², kiralık 2+1 ve 2024 yıllık artış oranı.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Kiralık 2+1</th>
                <th className="text-center py-2 font-black text-gray-500">2024 Artış</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{ilce.ilce}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.m2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.kirali2.toLocaleString('tr-TR')} ₺/ay</td>
                  <td className={`py-2 text-center font-black ${ilce.artis > 50 ? 'text-rose-500' : 'text-amber-500'}`}>%{ilce.artis}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel İzmir İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block ${ilan.listingType === 'SATILIK' ? 'bg-[#00C49F] text-white' : 'bg-blue-400 text-white'}`}>{ilan.listingType}</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? 'İzmir'}</p>
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
          <p className="text-xs font-black text-blue-700 mb-2">İzmir Piyasa Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            İzmir, Türkiye&apos;nin en hızlı değerlenen ikinci büyükşehridir. Karşıyaka ve Narlıdere sahil şeridindeki konutlar yüksek kira talebi ile güçlü getiri sunmaktadır. Urla ve Çeşme bölgeleri yazlık yatırım için ön plana çıkmaktadır. Metro ağının genişlemesi Bayraklı ve Buca gibi ilçelerde değer artışını hızlandırmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
