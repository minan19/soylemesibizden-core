import { Metadata } from 'next';
import Link from 'next/link';
import { Home, CheckCircle, AlertTriangle, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Evi Satışa Hazırlama Rehberi 2024 | Home Staging, Fiyat, Belge | Söylemesi Bizden',
  description:
    'Evinizi satışa nasıl hazırlarsınız? Home staging, doğru fiyatlama, zorunlu belgeler ve alıcı çekme stratejileri hakkında kapsamlı rehber.',
};

const HAZIRLIK_ADIMLARI = [
  {
    baslik: 'Piyasa Araştırması ve Fiyatlama',
    adimlar: [
      'Aynı semtte benzer büyüklükteki son 3–6 aydaki satışları inceleyin',
      'Listeleme fiyatı ile gerçekleşen satış fiyatı arasındaki farkı analiz edin',
      'Emlak değerleme (ekspertiz) yaptırarak gerçekçi taban belirleyin',
      'Piyasanın durumuna göre %3–5 müzakere payı bırakın',
    ],
  },
  {
    baslik: 'Fiziksel Hazırlık ve Onarımlar',
    adimlar: [
      'Boya badana — özellikle girişi, mutfak ve banyoyu tazeleyin',
      'Kapı/pencere sızdırmazlıklarını, akan muslukları ve arızalı prizleri onarın',
      'Duvarları boşaltın; mobilya sayısını azaltarak alanı geniş gösterin',
      'Koku ve nem sorunlarını giderin; temizlik ve havalandırma yapın',
      'Enerji Kimlik Belgesi (EKB) alın — alıcılar sormadan önce hazırlayın',
    ],
  },
  {
    baslik: 'Home Staging (Görsel Hazırlık)',
    adimlar: [
      'Kişisel eşya ve aile fotoğraflarını kaldırın; nötr bir ortam yaratın',
      'Doğal ışıktan maksimum yararlanın; perdeler açık olsun',
      'Yeşil bitkiler ve küçük dekoratif öğeler ile canlı hava katın',
      'Profesyonel fotoğraf çekimi yaptırın — ilan performansını 3–5 kat artırır',
      'Drone fotoğrafı ve video tur hazırlayın (varsa)',
    ],
  },
  {
    baslik: 'Hukuki ve Mali Hazırlık',
    adimlar: [
      'Tapu, iskan ve yapı ruhsatı belgelerini eksiksiz hazırlayın',
      'Varsa ipotek, haciz veya takyidat durumunu tapu müdürlüğünden kontrol edin',
      'Tapu harcı ve vergi yükümlülüklerini önceden hesaplayın',
      '5 yıldan önce satışta değer artış kazancı vergisi hesaplayın',
      'Aidat ve ortak gider borçlarını tahliye öncesi kapatın',
    ],
  },
];

const BELGE_LISTESI = [
  { belge: 'Tapu senedi', zorunlu: true, aciklama: 'Güncel tapu kaydı (takyidat belgesi ile birlikte)' },
  { belge: 'İskan belgesi', zorunlu: true, aciklama: 'Yapı kullanma izin belgesi' },
  { belge: 'Enerji Kimlik Belgesi (EKB)', zorunlu: true, aciklama: '2011 sonrası yapılarda zorunlu' },
  { belge: 'DASK poliçesi', zorunlu: true, aciklama: 'Güncel zorunlu deprem sigortası' },
  { belge: 'Yapı ruhsatı', zorunlu: false, aciklama: 'Tadilat veya eklemeler için gerekli olabilir' },
  { belge: 'Aidat borç belgesi', zorunlu: false, aciklama: 'Yönetimden alınan borç yoktur yazısı' },
  { belge: 'Ekspertiz raporu', zorunlu: false, aciklama: 'Alıcının kredi kullanacaksa bankası talep eder' },
];

const STAGING_PUANLARI = [
  { alan: 'Salon / Oturma Odası', oneri: 'Mobilya sayısını azaltın, doğal ışık vurgulayın, nötr tonlar kullanın', etki: 'Yüksek' },
  { alan: 'Mutfak', oneri: 'Tezgahı boşaltın, parlatın. Eski dolap kapılarına yeni kulp ekleyin', etki: 'Yüksek' },
  { alan: 'Banyo', oneri: 'Kireç ve pas lekelerini temizleyin; yeni havlu ve paspas koyun', etki: 'Orta' },
  { alan: 'Yatak Odası', oneri: 'Düzgün yatak örtüsü, boş gece lambası, ayna ile derinlik katın', etki: 'Orta' },
  { alan: 'Balkon / Bahçe', oneri: 'Temizleyin, basit saksı bitkileri koyun, oturma düzeni oluşturun', etki: 'Yüksek' },
  { alan: 'Giriş', oneri: 'İlk izlenim kritik: kapı boyası, paspas, iyi aydınlatma şarttır', etki: 'Yüksek' },
];

const FIYATLAMA_IPUCLARI = [
  { ipucu: 'Yuvarlak sayıdan kaçının', aciklama: '2.999.000 ₺ yerine 3.000.000 ₺ yazmak, arama filtrelerinde elenmenize yol açabilir.' },
  { ipucu: 'İlk 2 haftayı takip edin', aciklama: 'Görüntülenme çok ama soru yoksa fiyat yüksektir; sorular ama teklif yoksa sunumu gözden geçirin.' },
  { ipucu: 'Müzakere payı bırakın', aciklama: 'Türkiye pazarında alıcılar %3–8 indirim talep eder; bunu baştan hesaba katın.' },
  { ipucu: 'Sezonluk dalgalanma', aciklama: 'İlkbahar (Mart–Mayıs) ve Eylül–Ekim satışlar için en aktif dönemdir.' },
];

export default function EvSatisaHazirlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Satış Hazırlığı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Evi Satışa Hazırlama Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Doğru fiyatlama, home staging ve hukuki hazırlık ile evinizi hızla ve maksimum fiyatta satın.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Aşama</p>
              <p className="text-xs text-gray-400">Hazırlık süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">7 Belge</p>
              <p className="text-xs text-gray-400">Gerekli evrak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3–5x</p>
              <p className="text-xs text-gray-400">Pro fotoğraf etkisi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Hazırlık Adımları */}
        {HAZIRLIK_ADIMLARI.map((bolum, bi) => (
          <section key={bi}>
            <h2 className="text-xl font-black text-gray-900 mb-4">
              <span className="text-[#00C49F]">{bi + 1}.</span> {bolum.baslik}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2">
              {bolum.adimlar.map((a, ai) => (
                <div key={ai} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Staging Tavsiyeleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Oda Bazlı Staging Tavsiyeleri</h2>
          <div className="space-y-3">
            {STAGING_PUANLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{s.alan}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${s.etki === 'Yüksek' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'}`}>
                    {s.etki} Etki
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.oneri}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Belge Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Zorunlu ve Önerilen Belgeler</h2>
          <div className="space-y-2">
            {BELGE_LISTESI.map((b, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className={`shrink-0 mt-0.5 ${b.zorunlu ? 'text-[#00C49F]' : 'text-gray-300'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black text-gray-900">{b.belge}</p>
                    {b.zorunlu && <span className="text-[9px] bg-[#F0FDF8] text-[#00C49F] font-black px-1.5 py-0.5 rounded">Zorunlu</span>}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{b.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fiyatlama İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Star size={14} className="text-amber-500" /> Fiyatlama İpuçları
          </h2>
          <div className="space-y-3">
            {FIYATLAMA_IPUCLARI.map((f, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{f.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Not:</span> Bu rehber genel bilgi amaçlıdır. Vergi ve hukuki yükümlülükler için uzman danışman desteği alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi Rehberi' },
              { href: '/emlak-danismani-secme', label: 'Emlak Danışmanı Seçme' },
              { href: '/fiyat-muzakere-stratejileri', label: 'Fiyat Müzakere Stratejileri' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
