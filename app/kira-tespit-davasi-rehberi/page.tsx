import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Tespit Davası Rehberi 2024 | Hukuki Süreç, Mahkeme, Süreler | Söylemesi Bizden',
  description:
    'Kira tespit davası nedir, ne zaman açılır? Yetkili mahkeme, ispat araçları, süreler ve avukat seçimi hakkında kapsamlı rehber.',
};

const DAVA_NEDENLERI = [
  {
    neden: 'Piyasa Kirasının Çok Altında Kalmak',
    aciklama: '5 yılı aşan kira sözleşmelerinde piyasa değerinin önemli ölçüde altında kalan kira bedeli için tespit davası açılabilir.',
  },
  {
    neden: 'Yenilenen Sözleşmelerde Artış Anlaşmazlığı',
    aciklama: 'Taraflar yıllık artış oranında uzlaşamazsa mahkeme, piyasa kirasına ve TÜFE\'ye göre belirler.',
  },
  {
    neden: '5 Yıllık Dönem Sonu',
    aciklama: 'TBK m. 344/3: 5 yılı aşan sözleşmelerde kira bedeli hakkaniyete uygun biçimde yeniden belirlenebilir.',
  },
  {
    neden: 'Tarafların Anlaşamaması',
    aciklama: 'Kiraya veren veya kiracı, sözleşme yenileme döneminde yeni kira bedeli konusunda mutabık kalamazsa taraflardan biri dava açabilir.',
  },
];

const DAVA_SURECI = [
  { adim: 'Arabuluculuk (Zorunlu)', sure: '3 hafta', aciklama: 'Kira uyuşmazlıklarında önce arabulucu sürecine başvurulmalıdır (2023\'ten itibaren zorunlu). Anlaşma sağlanamazsa tutanak alınır.' },
  { adim: 'Sulh Hukuk Mahkemesi\'ne Başvuru', sure: '1–2 ay', aciklama: 'Yetkili mahkeme: kiralananın bulunduğu yer. Dava dilekçesi, sözleşme, arabuluculuk tutanağı ve deliller eklenir.' },
  { adim: 'Bilirkişi İncelemesi', sure: '2–4 ay', aciklama: 'Mahkeme, piyasa emsal kira araştırması için bilirkişi atar. Rapor taraflara tebliğ edilir; itiraz edilebilir.' },
  { adim: 'Karar', sure: '3–6 ay', aciklama: 'Mahkeme, bilirkişi raporu ve taraf beyanlarına göre yeni kira bedelini belirler. Karar tebliğden itibaren uygulanır.' },
  { adim: 'Temyiz', sure: '6–12 ay ek', aciklama: 'Karardan memnun olmayan taraf Bölge Adliye Mahkemesi\'ne istinaf, ardından Yargıtay\'a temyiz yoluna gidebilir.' },
];

const DELILLER = [
  'Kira sözleşmesi (noter tasdikli veya imzalı orijinal nüsha)',
  'Aynı bina ve semtte emsal kira sözleşmeleri (TKGM, emlak platformları)',
  'Taşınmazın teknik özellikleri (kat, cephe, alan, yaş, bakım durumu)',
  'Bölgeye ait TÜİK TÜFE verileri',
  'Arabuluculuk tutanağı (dava şartı)',
  'Banka ödeme dekontları (geçmiş kira ödemeleri)',
];

const PRATIK_BILGI = [
  { bilgi: 'Dava harcı', detay: 'Talep edilen yıllık kira tutarının %0,68\'i kadar peşin yatırılır; kaybeden taraf karşı tarafın yargılama giderini öder.' },
  { bilgi: 'Avukat zorunluluğu', detay: 'Zorunlu değil; ancak emsal araştırması ve bilirkişi itirazı için uzman desteği önerilir.' },
  { bilgi: 'Geriye yürüme', detay: 'Karar, dava tarihinden itibaren geçerlidir; fiilen ödenen ile belirlenen aradaki fark talep edilebilir.' },
  { bilgi: 'Süre sınırı', detay: 'Yenileme döneminin sona ermesinden itibaren 30 gün içinde dava açılmazsa o dönem için hak kaybı doğabilir.' },
];

export default function KiraTespitDavasiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Kira Tespit Davası
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Tespit Davası Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kira tespit davası nasıl açılır? Zorunlu arabuluculuk, yetkili mahkeme, deliller ve süreç hakkında kapsamlı bilgi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Adım</p>
              <p className="text-xs text-gray-400">Dava süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Zorunlu</p>
              <p className="text-xs text-gray-400">Arabuluculuk</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">30 Gün</p>
              <p className="text-xs text-gray-400">Başvuru süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Dava Nedenleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kira Tespit Davası Açma Nedenleri</h2>
          <div className="space-y-3">
            {DAVA_NEDENLERI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{d.neden}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dava Süreci</h2>
          <div className="space-y-3">
            {DAVA_SURECI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-8">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Deliller */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Gerekli Delil ve Belgeler
          </h2>
          <div className="space-y-2">
            {DELILLER.map((d, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="space-y-3">
            {PRATIK_BILGI.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır; hukuki danışmanlık yerine geçmez. Kira tespit davası açmadan önce süreleri, arabuluculuk zorunluluğunu ve yetkili mahkemeyi bir gayrimenkul avukatından teyit edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/tahliye-davasi', label: 'Tahliye Davası Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
              { href: '/depozito', label: 'Depozito Rehberi' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
