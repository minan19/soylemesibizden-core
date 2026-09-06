import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kiralık Villa | Yaz ve Uzun Dönem Villa Kiralama | Söylemesi Bizden',
  description:
    'Türkiye\'nin en güzel bölgelerinde kiralık villa: Bodrum, Antalya, Çeşme, Fethiye. Yaz sezonu ve yıllık uzun dönem villa kiralama.',
};

const VILLA_BOLGELER = [
  { bolge: 'Bodrum — Yalıkavak', yazlikHaftalik: 80000, uzundonemAylik: 150000, profil: 'Lüks marina, mega yat' },
  { bolge: 'Bodrum — Türkbükü', yazlikHaftalik: 65000, uzundonemAylik: 120000, profil: 'Ünlüler koyu' },
  { bolge: 'Antalya — Kalkan', yazlikHaftalik: 50000, uzundonemAylik: 90000, profil: 'Sonsuz havuz, manzara' },
  { bolge: 'Antalya — Belek', yazlikHaftalik: 40000, uzundonemAylik: 70000, profil: 'Golf, tatil köyü' },
  { bolge: 'Çeşme — Alaçatı', yazlikHaftalik: 55000, uzundonemAylik: 100000, profil: 'Butik, sörf' },
  { bolge: 'Fethiye — Göcek', yazlikHaftalik: 45000, uzundonemAylik: 80000, profil: 'Yelken, marinalar' },
  { bolge: 'Sapanca / Kartepe', yazlikHaftalik: 25000, uzundonemAylik: 45000, profil: 'Dağ, doğa, kış' },
  { bolge: 'İstanbul — Adalar', yazlikHaftalik: 60000, uzundonemAylik: 110000, profil: 'Deniz, nostalji' },
];

const VILLA_OZELLIKLERI = [
  { ozellik: 'Özel Havuz', oran: '%85', aciklama: 'Lüks segment villaların büyük çoğunluğunda özel yüzme havuzu' },
  { ozellik: 'Bahçe', oran: '%95', aciklama: 'Geniş peyzajlı bahçe, mangal ve oturma alanı' },
  { ozellik: 'Deniz Manzarası', oran: '%70', aciklama: 'Kıyı bölgelerinde çoğunlukla deniz veya körfez manzarası' },
  { ozellik: 'Oda Sayısı', oran: '3–8+', aciklama: 'Aile ve grup tatilleri için geniş kapasiteli seçenekler' },
  { ozellik: 'Otopark', oran: '%90', aciklama: 'Araç park alanı veya kapalı garaj' },
  { ozellik: 'Temizlik Hizmeti', oran: 'Opsiyonel', aciklama: 'Çoğu villa kiralama için haftalık temizlik hizmeti mevcut' },
];

const KIRA_SEZONU = [
  { sezon: 'Yüksek Sezon', donem: 'Temmuz – Ağustos', artis: '%60–80', notlar: 'En yüksek talep, erken rezervasyon şart' },
  { sezon: 'Orta Sezon', donem: 'Haziran & Eylül', artis: '%20–40', notlar: 'Konforlu tatil, uygun fiyat' },
  { sezon: 'Düşük Sezon', donem: 'Nisan–Mayıs & Ekim', artis: 'Baz fiyat', notlar: 'Uygun fiyat, sessiz' },
  { sezon: 'Kış / Uzun Dönem', donem: 'Kasım – Mart', artis: '-%30–50', notlar: 'Aylık uzun dönem için en uygun' },
];

async function getKiralikVillaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'KİRALIK',
        propertyType: { in: ['VİLLA', 'MÜSTAKIL'] },
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, city: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function KiralikVillaPage() {
  const ilanlar = await getKiralikVillaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiralık Villa</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kiralık Villa</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin en güzel tatil ve yaşam bölgelerinde yaz sezonu ve uzun dönem kiralık villa seçenekleri.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?listingType=KİRALIK&propertyType=VİLLA" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Villa İlanları
            </Link>
            <Link href="/luks" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Lüks Koleksiyon
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Bölge Bazlı Villa Kira Fiyatları</h2>
          <p className="text-xs text-gray-400 mb-5">Yaz sezonu haftalık ve uzun dönem aylık tahmini kira değerleri.</p>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-center py-2 font-black text-gray-500">Yaz Haftalık</th>
                <th className="text-center py-2 font-black text-gray-500">Uzun Dönem/ay</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {VILLA_BOLGELER.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.bolge}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{b.yazlikHaftalik.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{b.uzundonemAylik.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{b.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Sezon Takvimine Göre Fiyat</h2>
          <p className="text-xs text-gray-400 mb-5">Tatil villaları için sezon dönemlerine göre fiyat değişimi.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Sezon</th>
                <th className="text-center py-2 font-black text-gray-500">Dönem</th>
                <th className="text-center py-2 font-black text-gray-500">Fiyat Farkı</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {KIRA_SEZONU.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{s.sezon}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{s.donem}</td>
                  <td className={`py-2 text-center font-black ${s.artis.startsWith('-') ? 'text-emerald-600' : s.artis.startsWith('+') || s.artis.includes('–') ? 'text-rose-500' : 'text-gray-500'}`}>{s.artis}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{s.notlar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Villa Özellikleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VILLA_OZELLIKLERI.map((o, i) => (
              <div key={i} className="flex items-start gap-3 border border-gray-100 rounded-xl p-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C49F]/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-[#00C49F]">{o.oran}</span>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{o.ozellik}</p>
                  <p className="text-[10px] text-gray-500">{o.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Kiralık Villa İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className="text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block bg-blue-400 text-white">KİRALIK</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{[ilan.district, ilan.city].filter(Boolean).join(', ')}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺/ay</p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
