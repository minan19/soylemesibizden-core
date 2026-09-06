import { Metadata } from 'next';
import Link from 'next/link';
import { Building2, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kentsel Dönüşüm Rehberi 2024 | Hak Sahipliği, Süreç, Destekler | Söylemesi Bizden',
  description:
    'Kentsel dönüşüm nedir, nasıl başvurulur? Kiracı ve mal sahibi hakları, devlet destekleri, 2/3 çoğunluk kuralı ve kira yardımı hakkında kapsamlı rehber.',
};

const TEMEL_BILGILER = [
  { baslik: 'Kentsel Dönüşüm Nedir?', icerik: '6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun kapsamında riskli yapıların yıkılıp yeniden inşa edilmesidir.' },
  { baslik: 'Riskli Yapı Tespiti', icerik: 'Çevre ve Şehircilik Bakanlığı\'ndan lisanslı kuruluşlar tarafından deprem riski araştırması yapılır. Başvuru hak sahibi veya yapı sahiplerince yapılabilir.' },
  { baslik: '2/3 Çoğunluk Kuralı', icerik: 'Riskli yapı kararı kesinleştiğinde kat maliklerinin 2/3 çoğunluğunun anlaşması yeterlidir; anlaşmayanların payları diğerlerine satılır.' },
  { baslik: 'Kira Yardımı', icerik: 'Yıkım süresince hak sahiplerine 18 aya kadar aylık kira yardımı yapılır. Tutar her yıl güncellenir; 2024 için ortalama 5.000–8.000 ₺ aylık.' },
  { baslik: 'Vergi Muafiyeti', icerik: 'Dönüşüm kapsamındaki işlemler tapu harcı, KDV, harç ve damga vergisinden muaf tutulabilmektedir.' },
];

const SUREC_ADIMLARI = [
  { adim: 'Riskli Yapı Tespiti Başvurusu', sure: '1–3 ay', aciklama: 'Lisanslı kuruluşa başvurulur; bina incelenir ve rapor hazırlanır. Bakanlık onayı alındıktan sonra tebligat yapılır.' },
  { adim: 'Kat Malikleri Toplantısı', sure: '2–4 hafta', aciklama: '2/3 çoğunluk sağlanarak yıkım ve yeniden inşa kararı alınır. Müteahhit seçimi ve sözleşme şartları belirlenir.' },
  { adim: 'Anlaşmayan Paylara İşlem', sure: '1–2 ay', aciklama: 'Anlaşmayan pay sahiplerinin payları açık artırma ile diğer maliklere ya da Bakanlık\'a devredilir.' },
  { adim: 'Kira Yardımı ve Tahliye', sure: '1–3 ay', aciklama: 'Hak sahiplerine kira yardımı başlar; bina boşaltılır ve yıkım gerçekleştirilir.' },
  { adim: 'İnşaat Süreci', sure: '12–36 ay', aciklama: 'Müteahhit inşaatı gerçekleştirir. Hak sahipleri sözleşmedeki koşullara göre yeni bağımsız bölüm alır.' },
  { adim: 'Tapu Tescili', sure: '1–2 ay', aciklama: 'Yeni bina iskanı alındıktan sonra tapu iptali ve tescil işlemi yapılır.' },
];

const KIRACI_HAKLARI = [
  'Riskli yapı tespitinden sonra kiracıya tahliye için en az 60 günlük süre tanınmalıdır',
  'Kiracı kira yardımına doğrudan hak kazanmaz; ancak anlaşmazlık halinde mahkemeye başvurabilir',
  'Sözleşmede hüküm varsa kiracı tazminat talep edebilir',
  'Mal sahibi mücbir sebep (kentsel dönüşüm) gerekçesiyle kira sözleşmesini feshedebilir',
  'Kiracının yeni binada öncelik hakkı yoktur; sözleşme ile güvence altına alınabilir',
];

const MAL_SAHIBI_HAKLARI = [
  'Kira yardımı (18 aya kadar aylık ödeme)',
  'Faiz destekli kredi kullanım imkânı (Bakanlık güvenceli)',
  'Tapu harcı, KDV ve harç muafiyeti',
  'Yeni binada eşdeğer veya anlaşmayla belirlenen bağımsız bölüm hakkı',
  'Anlaşmayan kat maliklerine karşı 2/3 çoğunlukla karar alma hakkı',
  'Müteahhitle serbest sözleşme yapma ve şartları belirleme hakkı',
];

const DIKKAT_NOKTALAR = [
  { nokta: 'Müteahhit seçimi kritik', aciklama: 'Referansları, tamamlanan projeleri ve mali durumunu araştırın. Kat karşılığı sözleşmeyi bir avukata inceletin.' },
  { nokta: 'Sözleşmede teslim tarihi', aciklama: 'Gecikme cezası, kira yardımı süresi ve teslim garantisini sözleşmeye ekletin.' },
  { nokta: 'Kat mülkiyeti planı', aciklama: 'Yeni bölümlerin konumu, kat, cephe ve metrekaresi sözleşmede net belirlenmelidir.' },
  { nokta: 'Hukuki danışmanlık', aciklama: 'Dönüşüm sürecinde bir gayrimenkul avukatından destek alınması hak kayıplarını önler.' },
];

export default function KentselDonusumRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Kentsel Dönüşüm
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kentsel Dönüşüm Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Riskli yapı tespiti, 2/3 çoğunluk kuralı, kira yardımı ve mal sahibi/kiracı haklarına dair kapsamlı bilgi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Adım</p>
              <p className="text-xs text-gray-400">Dönüşüm süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">2/3</p>
              <p className="text-xs text-gray-400">Çoğunluk kuralı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">18 Ay</p>
              <p className="text-xs text-gray-400">Kira yardımı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Bilgiler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Bilgiler</h2>
          <div className="space-y-3">
            {TEMEL_BILGILER.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{b.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.icerik}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dönüşüm Süreci</h2>
          <div className="space-y-3">
            {SUREC_ADIMLARI.map((a, i) => (
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

        {/* Haklar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={14} className="text-amber-500" /> Kiracı Hakları
            </h2>
            <div className="space-y-2">
              {KIRACI_HAKLARI.map((h, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <CheckCircle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={14} className="text-[#00C49F]" /> Mal Sahibi Hakları
            </h2>
            <div className="space-y-2">
              {MAL_SAHIBI_HAKLARI.map((h, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{h}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Dikkat Noktaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {DIKKAT_NOKTALAR.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{d.nokta}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kentsel dönüşüm süreci karmaşık hukuki ve mali işlemler içerir. Hak kayıplarını önlemek için bir gayrimenkul avukatı ile çalışmanız önerilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/deprem-sigorta-hesaplayici', label: 'Deprem Sigorta Hesaplayıcı' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/yeni-konut-projeleri', label: 'Yeni Konut Projeleri' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
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
