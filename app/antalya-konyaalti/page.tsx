import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Antalya Konyaaltı Gayrimenkul | Satılık ve Kiralık | Söylemesi Bizden',
  description:
    'Antalya Konyaaltı gayrimenkul piyasası: Hurma, Sarısu, Uncalı, Altınkum mahallelerinde satılık ve kiralık daire fiyatları.',
};

const MAHALLELER = [
  { mahalle: 'Hurma', satilikM2: 55000, kiralik2plus1: 25000, profil: 'Sahil, yabancı talebi' },
  { mahalle: 'Sarısu', satilikM2: 50000, kiralik2plus1: 22000, profil: 'Plaj, turistik' },
  { mahalle: 'Uncalı', satilikM2: 45000, kiralik2plus1: 20000, profil: 'Site yaşamı, iş insanları' },
  { mahalle: 'Altınkum', satilikM2: 42000, kiralik2plus1: 18000, profil: 'Boğazkent sahili' },
  { mahalle: 'Liman', satilikM2: 40000, kiralik2plus1: 17000, profil: 'Marina, yat limanı' },
  { mahalle: 'Kışlahan', satilikM2: 38000, kiralik2plus1: 16000, profil: 'Sanayi arka bölge' },
  { mahalle: 'Fener', satilikM2: 43000, kiralik2plus1: 19000, profil: 'Denize yakın, kent merkezi' },
  { mahalle: 'Arapsuyu', satilikM2: 35000, kiralik2plus1: 15000, profil: 'Bütçe dostu, ulaşım' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Konyaaltı)', deger: '45.000 ₺' },
  { metrik: 'Hurma Zirvesi', deger: '55.000+ ₺/m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%45–70 (2024)' },
  { metrik: 'Yabancı Alıcı Payı', deger: '%30+' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.0–5.5' },
  { metrik: 'Sahil Mesafesi', deger: '0.5–3 km' },
];

async function getKonyaaltiListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'Antalya', mode: 'insensitive' },
        district: { contains: 'Konyaaltı', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function AntalyaKonyaaltiPage() {
  const ilanlar = await getKonyaaltiListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Antalya Konyaaltı</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Antalya Konyaaltı Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Antalya&apos;nın en gözde sahil ilçesi Konyaaltı&apos;nda mahalle bazlı fiyatlar ve güncel ilanlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Antalya&district=Konyaaltı&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=Antalya&district=Konyaaltı&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Konyaaltı Piyasa Özeti</h2>
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
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Konyaaltı İlanları</h2>
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
          <p className="text-xs font-black text-blue-700 mb-2">Konyaaltı Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Konyaaltı, Antalya&apos;nın en yüksek yabancı alıcı oranına sahip sahil ilçesidir. Hurma ve Sarısu mahalleleri özellikle Rus, Ukraynalı ve Alman yatırımcıların yoğun tercih ettiği bölgelerdir. Sahil şeridine yakınlık ve Antalya merkez ile kolay ulaşım, kira talebini güçlü tutmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
