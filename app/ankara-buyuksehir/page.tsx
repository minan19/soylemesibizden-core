import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ankara Gayrimenkul Rehberi | Tüm İlçeler | Söylemesi Bizden',
  description:
    'Ankara büyükşehir gayrimenkul analizi: Çankaya, Keçiören, Mamak, Altındağ, Yenimahalle ilçelerinde fiyat karşılaştırması ve piyasa analizi.',
};

const ILCELER = [
  { ilce: 'Çankaya', m2: 35000, kirali2: 16000, profil: 'Prestijli, diplomasi', artis: 42 },
  { ilce: 'Çankaya (Çukurambar)', m2: 45000, kirali2: 20000, profil: 'Finans, rezidans', artis: 50 },
  { ilce: 'Keçiören', m2: 21000, kirali2: 10000, profil: 'Kalabalık, üniversite', artis: 40 },
  { ilce: 'Mamak', m2: 15000, kirali2: 7500, profil: 'Uygun, büyüyen', artis: 38 },
  { ilce: 'Altındağ', m2: 13000, kirali2: 6500, profil: 'Tarihi, şehir merkezi', artis: 35 },
  { ilce: 'Yenimahalle', m2: 22000, kirali2: 10500, profil: 'Metro, geniş', artis: 42 },
  { ilce: 'Sincan', m2: 14000, kirali2: 7000, profil: 'TOKİ, sanayi', artis: 37 },
  { ilce: 'Gölbaşı', m2: 25000, kirali2: 12000, profil: 'Göl, sakin', artis: 45 },
  { ilce: 'Etimesgut', m2: 20000, kirali2: 9500, profil: 'Planlı konut', artis: 43 },
  { ilce: 'Pursaklar', m2: 17000, kirali2: 8000, profil: 'Yeni, büyüyen', artis: 40 },
];

const PIYASA_OZETI = [
  { metrik: 'Şehir Geneli Ort. ₺/m²', deger: '22.000 ₺' },
  { metrik: 'En Pahalı (Çukurambar)', deger: '45.000+ ₺/m²' },
  { metrik: 'Yıllık Artış (Ort.)', deger: '%38–50 (2024)' },
  { metrik: 'Metro Ağı', deger: 'M1+M2+M3+M4' },
  { metrik: 'Brüt Getiri (Ort.)', deger: '%5.0–6.5' },
  { metrik: 'Kamu Talebi', deger: 'Güçlü (memur nüfusu)' },
];

async function getAnkaraListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        city: { contains: 'Ankara', mode: 'insensitive' },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function AnkaraBuyuksehirPage() {
  const ilanlar = await getAnkaraListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Ankara Büyükşehir</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ankara Gayrimenkul Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Başkent Ankara&apos;nın tüm ilçelerinde satılık ve kiralık daire fiyatları, artış oranları ve yatırım analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Ankara&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/listings?city=Ankara&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Kiralık İlanlar
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Ankara Büyükşehir Piyasa Özeti</h2>
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
                  <td className={`py-2 text-center font-black ${ilce.artis >= 45 ? 'text-rose-500' : 'text-amber-500'}`}>%{ilce.artis}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Ankara İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block ${ilan.listingType === 'SATILIK' ? 'bg-[#00C49F] text-white' : 'bg-blue-400 text-white'}`}>{ilan.listingType}</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? 'Ankara'}</p>
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
          <p className="text-xs font-black text-blue-700 mb-2">Ankara Piyasa Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Ankara, Türkiye&apos;nin en istikrarlı gayrimenkul piyasalarından birini sunar. Kamu çalışanları ve üniversite nüfusunun yoğunluğu kira talebini güçlü tutmaktadır. Çankaya Çukurambar bölgesi son yıllarda büyük kurumsal yatırımları çekmiş; Gölbaşı ve Etimesgut ise planlı konut projeleriyle değer kazanmaktadır. İstanbul&apos;a kıyasla düşük fiyatlar uzun vadeli yatırım için avantaj sağlar.
          </p>
        </div>

      </div>
    </main>
  );
}
