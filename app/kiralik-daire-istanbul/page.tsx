import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiralık Daire İstanbul | Güncel Kira İlanları | Söylemesi Bizden',
  description:
    'İstanbul kiralık daire ilanları: Avrupa ve Anadolu yakası, tüm ilçelerde güncel kira fiyatları, oda sayısı seçeneği ve bölgesel kira analizi.',
};

const KIRA_ILCELER = [
  { ilce: 'Beşiktaş', oda1: 18000, oda2: 28000, oda3: 45000, profil: 'Merkezi, lüks' },
  { ilce: 'Kadıköy', oda1: 15000, oda2: 22000, oda3: 35000, profil: 'Canlı, Anadolu merkezi' },
  { ilce: 'Şişli', oda1: 12000, oda2: 18000, oda3: 30000, profil: 'İş merkezi yakını' },
  { ilce: 'Üsküdar', oda1: 11000, oda2: 16000, oda3: 26000, profil: 'Sakin, tarihi' },
  { ilce: 'Bahçelievler', oda1: 8000, oda2: 12000, oda3: 18000, profil: 'Uygun, Avrupa yakası' },
  { ilce: 'Maltepe', oda1: 7500, oda2: 11000, oda3: 17000, profil: 'Sahil, yeni projeler' },
  { ilce: 'Esenyurt', oda1: 5000, oda2: 7500, oda3: 11000, profil: 'En uygun' },
  { ilce: 'Pendik', oda1: 6500, oda2: 9500, oda3: 14000, profil: 'Havalimanı yakını' },
];

const KIRA_OZETI = [
  { metrik: 'İstanbul Ortalama 2+1', deger: '18.000 ₺/ay' },
  { metrik: 'En Düşük Kira İlçesi', deger: 'Esenyurt ~5.000 ₺' },
  { metrik: 'En Yüksek Kira İlçesi', deger: 'Beşiktaş ~45.000 ₺' },
  { metrik: 'Yıllık Kira Artışı', deger: '%25 yasal tavan' },
  { metrik: 'Depozito Standardı', deger: '1–3 aylık kira' },
  { metrik: 'Brüt Kira Getirisi', deger: '%3.5–5.5' },
];

async function getKiralikIstanbulListings() {
  try {
    return await prisma.listing.findMany({
      where: { status: 'ACTIVE', listingType: 'KİRALIK', city: { contains: 'İstanbul', mode: 'insensitive' } },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, neighborhood: true },
      orderBy: { createdAt: 'desc' },
      take: 9,
    });
  } catch {
    return [];
  }
}

export default async function KiralikDaireIstanbulPage() {
  const ilanlar = await getKiralikIstanbulListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İstanbul Kiralık</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiralık Daire İstanbul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İstanbul&apos;un tüm ilçelerinde kiralık daire ilanları, oda tipine göre kira aralıkları ve bölgesel kira analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=İstanbul&listingType=KİRALIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm İlanları Gör
            </Link>
            <Link href="/search?city=İstanbul&listingType=KİRALIK" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Gelişmiş Arama
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Kira Özeti */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İstanbul Kira Piyasası Özeti</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {KIRA_OZETI.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-[10px] text-gray-500 mb-1">{p.metrik}</p>
                <p className="text-xs font-black text-[#00C49F]">{p.deger}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İlçe Kira Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">İlçe Bazlı Aylık Kira (₺)</h2>
          <p className="text-xs text-gray-400 mb-4">2024 yılı ortalama kira fiyatları.</p>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İlçe</th>
                <th className="text-center py-2 font-black text-gray-500">1+1</th>
                <th className="text-center py-2 font-black text-gray-500">2+1</th>
                <th className="text-center py-2 font-black text-gray-500">3+1</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {KIRA_ILCELER.map((ilce, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">
                    <Link href={`/listings?city=İstanbul&district=${ilce.ilce}&listingType=KİRALIK`} className="hover:text-[#00C49F] transition-colors">
                      {ilce.ilce}
                    </Link>
                  </td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda1.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{ilce.oda3.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{ilce.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Güncel İlanlar */}
        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Kiralık İlanlar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}{ilan.neighborhood ? ` / ${ilan.neighborhood}` : ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺/ay</p>
                  {ilan.area && <p className="text-[10px] text-gray-400">{ilan.area} m² • {ilan.rooms ?? '—'} oda</p>}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/listings?city=İstanbul&listingType=KİRALIK" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
                Tüm Kiralık İlanları Gör
              </Link>
            </div>
          </div>
        )}

        {/* Kira Hakkı Bilgisi */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Kira Artış Hakkınız</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            7409 sayılı Kanun kapsamında konut kiralarındaki yıllık artış <strong>%25</strong> ile sınırlandırılmıştır. Kiraya veren bu oranın üzerinde artış talep edemez. Yasal artış oranınızı hesaplamak için <a href="/kira-artis-hakki-hesaplayici" className="font-black underline">Kira Artış Hakkı Hesaplayıcı</a> aracımızı kullanabilirsiniz.
          </p>
        </div>

      </div>
    </main>
  );
}
