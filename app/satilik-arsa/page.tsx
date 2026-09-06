import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Satılık Arsa | İmarlı ve Tarla Arsa İlanları | Söylemesi Bizden',
  description:
    'Satılık arsa ilanları: imarlı konut arsası, tarla, ticari arsa, bağ-bahçe. Türkiye\'nin tüm illerinde arsa yatırım fırsatları.',
};

const ARSA_TURLERI = [
  { tur: 'Konut İmarlı Arsa', aciklama: 'Yapılaşmaya açık, imar planında konut bölgesinde yer alan arsa', getiri: 'Yüksek' },
  { tur: 'Ticari İmarlı Arsa', aciklama: 'İş yeri, AVM veya ofis inşaatına uygun ticari amaçlı arsa', getiri: 'Çok Yüksek' },
  { tur: 'Tarla / Bahçe', aciklama: 'Tarım arazisi; yapılaşma izni olmayan ancak uzun vadede değer kazanan arsa', getiri: 'Orta' },
  { tur: 'Sanayi Arsası', aciklama: 'Organize sanayi bölgesi veya sanayi imar planlı arsa', getiri: 'Yüksek' },
  { tur: 'Bağ ve Bahçe', aciklama: 'Küçük yapı izinli, doğa içinde yaşam için tercih edilen arsa', getiri: 'Orta' },
];

const DEGER_FAKTORLERI = [
  { faktor: 'İmar Durumu', etki: 'Çok Yüksek', aciklama: 'İmarlı arsalar imar dışına göre 3–10 kat daha değerlidir.' },
  { faktor: 'Konum ve Ulaşım', etki: 'Yüksek', aciklama: 'Ana yola yakınlık, toplu taşıma erişimi fiyatı doğrudan etkiler.' },
  { faktor: 'EMSAL (İnşaat Yoğunluğu)', etki: 'Yüksek', aciklama: 'Yüksek TAKS ve KAKS, daha fazla inşaat alanı = daha değerli arsa.' },
  { faktor: 'Altyapı Erişimi', etki: 'Orta', aciklama: 'Elektrik, su, kanalizasyon bağlantısı değeri artırır.' },
  { faktor: 'Topografya (Eğim)', etki: 'Orta', aciklama: 'Düz arazi, eğimli araziye göre daha düşük inşaat maliyeti sunar.' },
  { faktor: 'Yakın Çevre Projeleri', etki: 'Orta-Yüksek', aciklama: 'Yeni yol, metro, hastane veya üniversite arsayı değer artırır.' },
];

const SATIN_ALMA_KONTROL = [
  'Tapu ve kadastro kaydını tapu müdürlüğünden kontrol edin',
  'İmar durumunu ilgili belediyeden sorgulatın',
  'Arsada ipotek, haciz, şerh olup olmadığını inceleyin',
  'Parsel cephesi ve yola mesafesini ölçtürün',
  'Altyapı bağlantı durumunu (su/elektrik/kanalizasyon) öğrenin',
  'Komşu parsellerin imar durumunu ve yapılarını inceleyin',
  'Gerekirse zemin etüdü yaptırın',
];

async function getArsaListings() {
  try {
    return await prisma.listing.findMany({
      where: {
        status: 'ACTIVE',
        listingType: 'SATILIK',
        propertyType: { in: ['ARSA', 'arsa'] },
      },
      select: { id: true, title: true, price: true, area: true, district: true, city: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });
  } catch {
    return [];
  }
}

export default async function SatilikArsaPage() {
  const ilanlar = await getArsaListings();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Arsa Yatırımı</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Satılık Arsa</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye genelinde imarlı konut arsası, ticari arsa, tarla ve bağ-bahçe ilanları. Uzun vadeli yatırım fırsatları.
          </p>
          <div className="flex gap-3 mt-6">
            <Link href="/listings?propertyType=ARSA&listingType=SATILIK" className="bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tüm Arsa İlanları
            </Link>
            <Link href="/arsa-yatirim-rehberi" className="border border-white/30 text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">
              Arsa Yatırım Rehberi
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Arsa Türleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Arsa Türleri ve Getiri Potansiyeli</h2>
          <div className="space-y-3">
            {ARSA_TURLERI.map((a, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.tur}</p>
                  <p className="text-[11px] text-gray-500">{a.aciklama}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-1 rounded-full shrink-0 ${a.getiri === 'Çok Yüksek' ? 'bg-emerald-100 text-emerald-700' : a.getiri === 'Yüksek' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-100 text-amber-700'}`}>
                  {a.getiri}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Değer Faktörleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Arsa Değerini Etkileyen Faktörler</h2>
          <p className="text-xs text-gray-400 mb-5">Fiyat analizi yaparken dikkate alınması gereken kriterler.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Faktör</th>
                <th className="text-center py-2 font-black text-gray-500">Etki</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {DEGER_FAKTORLERI.map((f, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{f.faktor}</td>
                  <td className="py-2 text-center font-bold text-amber-500">{f.etki}</td>
                  <td className="py-2 text-right font-bold text-gray-400 max-w-[200px]">{f.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kontrol Listesi */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Arsa Alımı Kontrol Listesi</h2>
          <div className="space-y-2">
            {SATIN_ALMA_KONTROL.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded border-2 border-[#00C49F] flex items-center justify-center shrink-0">
                  <span className="text-[8px] text-[#00C49F] font-black">✓</span>
                </span>
                <p className="text-[11px] text-gray-700">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Güncel İlanlar */}
        {ilanlar.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-black text-gray-900 mb-4">Güncel Arsa İlanları</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ilanlar.map(ilan => (
                <Link key={ilan.id} href={`/listing/${ilan.id}`} className="border border-gray-100 rounded-xl p-4 hover:border-[#00C49F] transition-colors block">
                  <p className="text-xs font-black text-gray-900 mb-1 line-clamp-2">{ilan.title}</p>
                  <p className="text-[10px] text-gray-400 mb-2">{ilan.city ?? ''}{ilan.district ? ` / ${ilan.district}` : ''}</p>
                  <p className="text-sm font-black text-[#00C49F]">{(ilan.price ?? 0).toLocaleString('tr-TR')} ₺</p>
                  {ilan.area && <p className="text-[10px] text-gray-400">{ilan.area} m²</p>}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/listings?propertyType=ARSA&listingType=SATILIK" className="inline-block bg-[#00C49F] text-white text-xs font-black px-5 py-2.5 rounded-full hover:bg-[#00a882] transition-colors">
                Tüm Arsa İlanlarını Gör
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
