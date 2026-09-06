import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İstanbul Maltepe Gayrimenkul | Satılık ve Kiralık | Söylemesi Bizden',
  description:
    'İstanbul Maltepe gayrimenkul piyasası: Bağlarbaşı, Gülsuyu, Cevizli, Altayçeşme mahallelerinde satılık ve kiralık daire fiyatları.',
};

const MAHALLELER = [
  { mahalle: 'Cevizli', satilikM2: 75000, kiralik2plus1: 33000, profil: 'Sahil, E-5 yakını' },
  { mahalle: 'Altayçeşme', satilikM2: 70000, kiralik2plus1: 30000, profil: 'Sıfır konutlar, modern' },
  { mahalle: 'Bağlarbaşı', satilikM2: 65000, kiralik2plus1: 28000, profil: 'Köklü, sosyal' },
  { mahalle: 'Maltepe Sahil', satilikM2: 80000, kiralik2plus1: 35000, profil: 'Deniz manzarası' },
  { mahalle: 'Gülsuyu', satilikM2: 48000, kiralik2plus1: 21000, profil: 'Uygun, büyüyen' },
  { mahalle: 'Fındıklı', satilikM2: 55000, kiralik2plus1: 24000, profil: 'Sakin, aile' },
  { mahalle: 'İdealtepe', satilikM2: 68000, kiralik2plus1: 29000, profil: 'Yerleşik, köprü' },
  { mahalle: 'Küçükyalı', satilikM2: 72000, kiralik2plus1: 31000, profil: 'Marmaray, sahil' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Maltepe)', deger: '67.000 ₺' },
  { metrik: 'Sahil Şeridi Zirvesi', deger: '80.000+ ₺/m²' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%45–60 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%4.0–5.5' },
  { metrik: 'Marmaray Erişimi', deger: 'Küçükyalı + Maltepe' },
  { metrik: 'Sahil Mesafesi', deger: '0–2 km' },
];

async function getMaltepeListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'İstanbul', mode: 'insensitive' },
        district: { contains: 'Maltepe', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function IstanbulMaltepePage() {
  const ilanlar = await getMaltepeListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İstanbul Maltepe</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İstanbul Maltepe Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Anadolu Yakası&apos;nın sahil ilçesi Maltepe&apos;de Cevizli&apos;den Küçükyalı&apos;ya mahalle bazlı fiyatlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İstanbul&district=Maltepe&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=İstanbul&district=Maltepe&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Maltepe Piyasa Özeti</h2>
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
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Maltepe İlanları</h2>
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
          <p className="text-xs font-black text-blue-700 mb-2">Maltepe Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Maltepe, Marmaray ve E-5 güzergahı sayesinde Anadolu Yakası&apos;nın en iyi bağlantılı sahil ilçelerinden birisidir. Cevizli ve Altayçeşme yeni konut projeleriyle prestij segmentini güçlendirmektedir. Sahil şeridindeki konutlar kira talebi açısından Kadıköy&apos;e yakın profil sunarken daha uygun fiyat imkânı tanımaktadır.
          </p>
        </div>

      </div>
    </main>
  );
}
