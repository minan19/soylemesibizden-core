import { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, CheckCircle, ShieldCheck, ArrowRight, MapPin, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deprem Riski ve Gayrimenkul Rehberi | DASK, Yapı Sağlamlığı | Söylemesi Bizden',
  description:
    'Türkiye deprem haritası, gayrimenkul alımında deprem riski değerlendirmesi, yapı sağlamlığı, DASK ve konut sigortası kapsamı.',
};

const RISK_ZONES = [
  { zone: '1. Derece Deprem Bölgesi', risk: 'Çok Yüksek', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', cities: 'İstanbul, Düzce, Adapazarı, Kocaeli, Bursa, İzmir, Erzincan', note: 'Son 100 yılda yıkıcı deprem deneyimlendi.' },
  { zone: '2. Derece Deprem Bölgesi', risk: 'Yüksek', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', cities: 'Ankara, Antalya, Denizli, Manisa, Balıkesir', note: 'Aktif fay hatları yakınında, uzun vadeli risk mevcut.' },
  { zone: '3. Derece Deprem Bölgesi', risk: 'Orta', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', cities: 'Trabzon, Samsun, Mersin, Adana', note: 'Moderate sismik aktivite; yeni binalar daha güvende.' },
  { zone: '4-5. Derece Deprem Bölgesi', risk: 'Düşük', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', cities: 'Trakya, Orta Anadolu iç kesimleri', note: 'Nispeten düşük sismik risk bölgesi.' },
];

const BUILDING_CHECKS = [
  { check: 'Yapı Yaşı ve Yönetmelik', detail: '1975 öncesi binalar eski sismik yönetmeliklere göre inşa edilmiştir. 1999 sonrası binalar güncel deprem yönetmeliğine uygundur.' },
  { check: 'Zemin Etüdü', detail: 'Sıvılaşma riski olan zeminler (kumul, dolgu) depremde binayı çöktürebilir. Satın almadan önce zemin etüdünü inceleyin.' },
  { check: 'Yapı Malzemesi', detail: 'Betonarme > Çelik > Gazbeton. Tarihi yığma yapılarda deprem riski en yüksektir.' },
  { check: 'Güçlendirme Belgesi', detail: 'Kentsel dönüşüm kapsamında güçlendirilen binalarda güçlendirme raporu ve tapu şerhi olmalıdır.' },
  { check: 'İskan ve Ruhsat Durumu', detail: 'İskansız veya kaçak yapılar depremde yıkıldığında tazminat hakkı önemli ölçüde kısıtlanır.' },
  { check: 'Fay Hattı Mesafesi', detail: 'Aktif fay hattına 15 km\'den yakın konumdaki mülkler için AFAD fay haritasını inceleyin.' },
];

const INSURANCE_COMPARISON = [
  { aspect: 'Kapsam', dask: 'Yalnızca bina hasarı (deprem ve doğrudan sonuçları)', konut: 'Yangın, su hasarı, hırsızlık, eşya dahil daha geniş kapsam' },
  { aspect: 'Zorunluluk', dask: 'Tüm konutlar için zorunlu (tapu devri şartı)', konut: 'Zorunlu değil, isteğe bağlı' },
  { aspect: 'Prim', dask: 'Yapı türü ve m²\'ye göre ₺200–₺2.500/yıl', konut: 'Kapsama göre ₺800–₺5.000/yıl' },
  { aspect: 'Tazminat Limiti', dask: 'Deprem bölgesine göre ₺300K–₺800K (2024)', konut: 'Poliçe limitine göre, üst sınır yok' },
  { aspect: 'Eşya Koruması', dask: 'Hayır', konut: 'Evet (ek poliçeyle)' },
];

const CHECKLIST_BUYER = [
  'Belediye veya AFAD\'dan bölgenin deprem risk haritasını kontrol edin.',
  'Binanın yapım yılını ve hangi deprem yönetmeliğine göre inşa edildiğini öğrenin.',
  'Zemin etüdü raporunu ve varsa güçlendirme belgesini isteyin.',
  'DASK poliçesinin güncel ve geçerli olduğunu teyit edin.',
  'Bina sigorta değerini piyasa değerinden bağımsız değerlendirin.',
  'Kentsel dönüşüm kapsamına alınmış bölgelerde tapu şerhini inceleyin.',
  'Yüksek risk bölgesinde geniş kapsamlı konut sigortası yaptırın.',
];

const POST_QUAKE_RIGHTS = [
  { right: 'DASK Hasarı', detail: 'Hasarı 15 gün içinde DASK\'a bildirin; hasar tespit ekibi 5-10 iş günü içinde inceler.' },
  { right: 'Kira Yardımı', detail: 'Ağır hasarlı ve yıkılan konutlarda devlet kira yardımı veya geçici konut tahsisi talep edilebilir.' },
  { right: 'Kredi Yapılandırması', detail: 'Afet bölgesinde Bankacılık Düzenleme ve Denetleme Kurumu kararıyla kredi ötelemesi uygulanabilir.' },
  { right: 'Hızlı Yeniden Yapım', detail: 'TOKİ ve Çevre Bakanlığı afet konutu programlarından yararlanma hakkı doğar.' },
];

export default function DepremRiskiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <AlertTriangle size={13} /> Risk Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Deprem Riski ve Gayrimenkul Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye deprem risk bölgeleri, gayrimenkul alımında yapı güvenliği kontrol listesi,
            DASK ve konut sigortası farkları, deprem sonrası alıcı hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-rose-400">%96</p>
              <p className="text-xs text-gray-400">Türkiye deprem riski altında</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">DASK</p>
              <p className="text-xs text-gray-400">Zorunlu deprem sigortası</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1999</p>
              <p className="text-xs text-gray-400">Güncel yönetmelik yılı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Risk Bölgeleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Türkiye Deprem Risk Bölgeleri</h2>
          <div className="space-y-4">
            {RISK_ZONES.map(z => (
              <div key={z.zone} className={`bg-white rounded-2xl border ${z.border} p-5 shadow-sm`}>
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1.5 rounded-xl text-xs font-black ${z.bg} ${z.color} shrink-0`}>
                    {z.risk}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-1">{z.zone}</h3>
                    <p className="text-xs text-gray-600 mb-1"><span className="font-bold">Başlıca İller:</span> {z.cities}</p>
                    <p className="text-[10px] text-gray-500">{z.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yapı Kontrol Listesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Satın Almadan Önce Yapı Güvenliği Kontrolleri</h2>
          <div className="space-y-3">
            {BUILDING_CHECKS.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{c.check}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DASK vs Konut Sigortası */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">DASK vs Konut Sigortası Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Özellik</th>
                    <th className="text-left px-4 py-3 font-black text-rose-600">DASK</th>
                    <th className="text-left px-4 py-3 font-black text-blue-600">Konut Sigortası</th>
                  </tr>
                </thead>
                <tbody>
                  {INSURANCE_COMPARISON.map((c, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{c.aspect}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{c.dask}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{c.konut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Alıcı Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#00C49F]" /> Alıcı Kontrol Listesi
          </h2>
          <ul className="space-y-2.5">
            {CHECKLIST_BUYER.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Deprem Sonrası Haklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Deprem Sonrası Malik Hakları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POST_QUAKE_RIGHTS.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{r.right}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-rose-600 shrink-0 mt-0.5" />
          <p className="text-xs text-rose-700 leading-relaxed">
            <span className="font-black">1999 öncesi binalarda ekstra dikkat:</span> Marmara ve diğer depremlerde yıkılan binaların büyük çoğunluğu eski yönetmeliğe göre inşa edilmişti. Bu tarihten önce yapılmış binalarda uzman yapı denetçisine inceleme yaptırmanızı kesinlikle öneririz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi (EKB)' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
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
