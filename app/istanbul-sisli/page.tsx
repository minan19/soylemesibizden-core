import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İstanbul Şişli Gayrimenkul | Satılık ve Kiralık | Söylemesi Bizden',
  description:
    'İstanbul Şişli gayrimenkul piyasası: Nişantaşı, Fulya, Mecidiyeköy, Bomonti mahallelerinde satılık ve kiralık daire fiyatları.',
};

const MAHALLELER = [
  { mahalle: 'Nişantaşı', satilikM2: 150000, kiralik2plus1: 65000, profil: 'Lüks, moda, prestij' },
  { mahalle: 'Fulya', satilikM2: 110000, kiralik2plus1: 48000, profil: 'Rezidans, üst segment' },
  { mahalle: 'Bomonti', satilikM2: 95000, kiralik2plus1: 40000, profil: 'Hipster, dönüşen' },
  { mahalle: 'Mecidiyeköy', satilikM2: 80000, kiralik2plus1: 35000, profil: 'İş merkezi, metro' },
  { mahalle: 'Harbiye', satilikM2: 120000, kiralik2plus1: 52000, profil: 'Diplomatik, sakin' },
  { mahalle: 'Pangaltı', satilikM2: 75000, kiralik2plus1: 32000, profil: 'Orta segment, merkezi' },
  { mahalle: 'Kurtuluş', satilikM2: 70000, kiralik2plus1: 30000, profil: 'Köklü, tarihi' },
  { mahalle: 'Teşvikiye', satilikM2: 130000, kiralik2plus1: 58000, profil: 'Ultra prestijli' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Şişli)', deger: '100.000 ₺' },
  { metrik: 'Nişantaşı Zirvesi', deger: '150.000+ ₺/m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%50–75 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%3.5–5.0' },
  { metrik: 'Metro Erişimi', deger: 'M2 + M7' },
  { metrik: 'Yabancı Talep', deger: 'Yüksek (Arap, Rus)' },
];

async function getSisliListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'İstanbul', mode: 'insensitive' },
        district: { contains: 'Şişli', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function IstanbulSisliPage() {
  const ilanlar = await getSisliListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İstanbul Şişli</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İstanbul Şişli Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İstanbul&apos;un en prestijli merkez ilçesi Şişli&apos;de Nişantaşı&apos;ndan Mecidiyeköy&apos;e mahalle bazlı fiyatlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İstanbul&district=Şişli&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=İstanbul&district=Şişli&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Şişli Piyasa Özeti</h2>
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
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Şişli İlanları</h2>
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
          <p className="text-xs font-black text-blue-700 mb-2">Şişli Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Şişli, İstanbul&apos;un en yüksek metrekare fiyatına sahip Avrupa Yakası ilçelerinden biridir. Nişantaşı ve Teşvikiye lüks konut segmentinde uluslararası alıcıları çekmeye devam etmektedir. Bomonti bölgesi kentsel dönüşüm projeleriyle yeni bir değer katmanı oluşturmaktadır. Mecidiyeköy iş merkezi lokasyonu kurumsal kiracı talebini canlı tutmaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
