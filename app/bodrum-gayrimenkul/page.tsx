import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bodrum Gayrimenkul | Satılık Villa ve Daire Bodrum | Söylemesi Bizden',
  description:
    'Bodrum gayrimenkul piyasası: Yalıkavak, Türkbükü, Gündoğan, Torba bölgelerinde lüks villa ve daire fiyatları, yabancı yatırımcı analizi.',
};

const BOLGELER = [
  { bolge: 'Yalıkavak', satilikM2: 120000, kiralikYillik: 2000000, profil: 'Lüks marina, mega yat' },
  { bolge: 'Türkbükü', satilikM2: 100000, kiralikYillik: 1500000, profil: 'Ünlüler koyu, tatil' },
  { bolge: 'Gündoğan', satilikM2: 70000, kiralikYillik: 1000000, profil: 'Sakin, doğa içi' },
  { bolge: 'Torba', satilikM2: 60000, kiralikYillik: 800000, profil: 'Deniz manzarası' },
  { bolge: 'Gümüşlük', satilikM2: 65000, kiralikYillik: 900000, profil: 'Butik, sakin' },
  { bolge: 'Bitez', satilikM2: 55000, kiralikYillik: 700000, profil: 'Mandalin bahçeli' },
  { bolge: 'Bodrum Merkez', satilikM2: 50000, kiralikYillik: 600000, profil: 'Kale, çarşı' },
  { bolge: 'Turgutreis', satilikM2: 40000, kiralikYillik: 400000, profil: 'Uygun fiyatlı Bodrum' },
];

const PIYASA_OZETI = [
  { metrik: 'Ortalama ₺/m² (Bodrum)', deger: '70.000 ₺' },
  { metrik: 'Yabancı Alıcı Payı', deger: '%40+' },
  { metrik: 'Yıllık Yaz Kira Getirisi', deger: '%6–12 brüt' },
  { metrik: 'Yazlık Kiralama Sezonu', deger: 'Mayıs–Ekim' },
  { metrik: 'Yıllık Fiyat Artışı', deger: '%50–80 (2024)' },
  { metrik: 'Vatandaşlık Eşiği', deger: '400.000 USD' },
];

async function getBodrumListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { city: { contains: 'Bodrum', mode: 'insensitive' } },
          { district: { contains: 'Bodrum', mode: 'insensitive' } },
        ],
      },
      select: { id: true, title: true, price: true, area: true, rooms: true, district: true, listingType: true },
      orderBy: { price: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function BodrumGayrimenkulPage() {
  const ilanlar = await getBodrumListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Bodrum Gayrimenkul</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Bodrum Gayrimenkul</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin lüks gayrimenkul başkenti Bodrum&apos;da bölge bazlı fiyatlar, yaz kira getirisi ve yabancı yatırımcı analizi.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?city=Bodrum&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Satılık İlanlar
            </Link>
            <Link href="/luks" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Lüks Koleksiyon
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Bodrum Piyasa Özeti</h2>
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
          <h2 className="text-base font-black text-gray-900 mb-1">Bölge Bazlı Fiyatlar</h2>
          <p className="text-xs text-gray-400 mb-5">Satılık ₺/m² ve yıllık kiralık gelir tahmini.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Bölge</th>
                <th className="text-center py-2 font-black text-gray-500">Satılık ₺/m²</th>
                <th className="text-center py-2 font-black text-gray-500">Yıllık Kira</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Profil</th>
              </tr>
            </thead>
            <tbody>
              {BOLGELER.map((b, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{b.bolge}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{b.satilikM2.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-center font-bold text-gray-600">{(b.kiralikYillik / 1000).toFixed(0)}K ₺</td>
                  <td className="py-2 text-right font-bold text-gray-400">{b.profil}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Bodrum İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded mb-1 inline-block ${ilan.listingType === 'SATILIK' ? 'bg-[#00C49F] text-white' : 'bg-blue-400 text-white'}`}>{ilan.listingType}</span>
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.district ?? ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && ilan.price && ilan.listingType === 'SATILIK' && (
                    <p className="text-[10px] text-gray-400">{Math.round(ilan.price / ilan.area).toLocaleString('tr-TR')} ₺/m²</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Bodrum Yatırım Notu</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Bodrum, Türkiye&apos;nin en yüksek ₺/m² değerlerine sahip bölgesidir. Yalıkavak ve Türkbükü lüks segmentte Avrupa kıyı bölgeleriyle rekabet etmektedir. Yaz sezonu kiralama geliri yıllık %6–12 brüt getiri sağlayabilmektedir. Yabancı yatırımcı talebi fiyatları desteklemektedir.
          </p>
        </div>

      </div>
    </main>
  );
}
