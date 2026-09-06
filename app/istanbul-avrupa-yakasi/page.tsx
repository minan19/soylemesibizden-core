import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İstanbul Avrupa Yakası Gayrimenkul | Satılık ve Kiralık | Söylemesi Bizden',
  description:
    'İstanbul Avrupa Yakası gayrimenkul: Beşiktaş, Şişli, Kadıköy, Bakırköy, Beylikdüzü bölgelerinde satılık ve kiralık konut fiyatları.',
};

const ILCELER = [
  { ilce: 'Beşiktaş', satilikM2: 95000, kiralik2plus1: 45000, profil: 'Prestijli, Boğaz manzarası' },
  { ilce: 'Şişli', satilikM2: 75000, kiralik2plus1: 35000, profil: 'Merkez, iş dünyası' },
  { ilce: 'Sarıyer', satilikM2: 80000, kiralik2plus1: 38000, profil: 'Boğaz, villa' },
  { ilce: 'Bakırköy', satilikM2: 55000, kiralik2plus1: 25000, profil: 'Sahil, köprü çıkışı' },
  { ilce: 'Zeytinburnu', satilikM2: 40000, kiralik2plus1: 18000, profil: 'Ulaşım, metro' },
  { ilce: 'Beylikdüzü', satilikM2: 28000, kiralik2plus1: 13000, profil: 'Uygun, gelişen bölge' },
  { ilce: 'Esenyurt', satilikM2: 20000, kiralik2plus1: 9000, profil: 'Bütçe dostu, kalabalık' },
  { ilce: 'Büyükçekmece', satilikM2: 30000, kiralik2plus1: 14000, profil: 'Sahil, yazlık' },
  { ilce: 'Başakşehir', satilikM2: 35000, kiralik2plus1: 16000, profil: 'Yeni kentsel, metro' },
  { ilce: 'Kağıthane', satilikM2: 45000, kiralik2plus1: 21000, profil: 'Merkeze yakın, gelişen' },
];

const PIYASA_OZETI = [
  { metrik: 'Ort. ₺/m² (Avrupa Yakası)', deger: '55.000 ₺' },
  { metrik: 'Beşiktaş Zirvesi', deger: '95.000+ ₺/m²' },
  { metrik: 'En Uygun İlçe', deger: 'Esenyurt 20K ₺' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%50–90 (2024)' },
  { metrik: 'Brüt Kira Getirisi', deger: '%3–5' },
  { metrik: 'Metro Etkisi', deger: '+%15–25 değer' },
];

async function getAvrupaYakasiListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'İstanbul', mode: 'insensitive' },
        district: {
          in: ['Beşiktaş', 'Şişli', 'Sarıyer', 'Bakırköy', 'Zeytinburnu', 'Beylikdüzü', 'Esenyurt', 'Büyükçekmece', 'Başakşehir', 'Kağıthane'],
          mode: 'insensitive',
        },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function IstanbulAvrupaYakasiPage() {
  const ilanlar = await getAvrupaYakasiListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İstanbul Avrupa Yakası</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İstanbul Avrupa Yakası Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Beşiktaş&apos;tan Beylikdüzü&apos;ne İstanbul&apos;un Avrupa yakasında bölge bazlı fiyatlar ve güncel ilanlar.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İstanbul&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=İstanbul&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Avrupa Yakası Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Fiyatlar</h2>
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
                    <Link href={`/listings?city=İstanbul&district=${ilce.ilce}`} className="hover:text-[#00C49F] transition-colors">
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
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel İlanlar — Avrupa Yakası</h2>
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
          <p className="text-xs font-black text-blue-700 mb-2">Avrupa Yakası Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Avrupa Yakası, İstanbul konut piyasasının en geniş fiyat yelpazesini barındırır. Beşiktaş ve Sarıyer yüksek prestij segmentini temsil ederken Esenyurt ve Beylikdüzü metropol yaşamına bütçe dostu giriş kapısı sunar. Metro ve metrobüs hatlarına yakınlık fiyatları doğrudan etkileyen en kritik faktördür.
          </p>
        </div>

      </div>
    </main>
  );
}
