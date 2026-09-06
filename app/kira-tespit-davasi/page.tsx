import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Tespit Davası Rehberi | TBK 344, Piyasa Kira, Sulh Hukuk | Söylemesi Bizden',
  description:
    'Kira tespit davası nedir, nasıl açılır? TBK 344 kapsamında hakkaniyete uygun kira tespiti, bilirkişi süreci ve dava takvimi.',
};

const DAVA_SARTLARI = [
  {
    sart: 'Beş Yıl Kuralı',
    aciklama: 'Kira sözleşmesinin başlangıcından itibaren 5 yıl geçmişse veya tek bir kiracıyla birbirini izleyen birden fazla kira dönemi geçmişse mahkeme hakkaniyete uygun kira belirleyebilir.',
    dayanak: 'TBK md. 344/3',
  },
  {
    sart: 'Anlaşmazlık Halinde',
    aciklama: 'Taraflar yeni dönem kira bedelinde uzlaşamıyorsa herhangi biri Sulh Hukuk Mahkemesi\'ne kira tespit davası açabilir.',
    dayanak: 'TBK md. 344/1-2',
  },
  {
    sart: 'TÜFE Sınırı Aşıldıysa',
    aciklama: 'Bir yılı aşmayan kira artışlarında taraflar TÜFE oranını aşan artış kararlaştıramaz; aşan kısım geçersizdir.',
    dayanak: 'TBK md. 344/1 + Geçici Madde',
  },
  {
    sart: 'Tahliye Davası Olmaksızın',
    aciklama: 'Kira tespit davası tahliye talebi içermez; sadece kira bedelinin tespitine yönelik bir dava olup kiracıyı evden çıkarmaz.',
    dayanak: 'HMK ilkeleri',
  },
];

const SUREC = [
  { adim: 'Arabuluculuk (Zorunlu)', detay: 'Dava açmadan önce taraflar arabuluculuk sürecini denemelidir (2023 sonrası zorunlu dava şartı).' },
  { adim: 'Dava Dilekçesi', detay: 'Taşınmazın bulunduğu yer Sulh Hukuk Mahkemesi\'ne dava dilekçesi verilir; tapu kaydı ve kira sözleşmesi eklenir.' },
  { adim: 'Yetki', detay: 'Yetkili mahkeme taşınmazın bulunduğu yer Sulh Hukuk Mahkemesi\'dir; yetki itirazı yapılabilir.' },
  { adim: 'Bilirkişi Atanması', detay: 'Mahkeme piyasa kira araştırması için bilirkişi (taşınmaz değerleme uzmanı) atar.' },
  { adim: 'Bilirkişi Raporu', detay: 'Bilirkişi bölgedeki benzer mülklerin kira bedellerini inceleyerek "piyasa kira değeri" tespit eder.' },
  { adim: 'Karar', detay: 'Mahkeme bilirkişi raporunu esas alarak hakkaniyete uygun kira bedelini karara bağlar; yeni dönem için geçerli olur.' },
  { adim: 'Yürürlük', detay: 'Kira tespit kararı, dava tarihinde başlayan kira dönemi için uygulanır; geçmişe etkili olmaz.' },
];

const BILIRKISI_KRITERLERI = [
  'Taşınmazın konumu, büyüklüğü ve özellikleri',
  'Aynı mahallede veya çevresinde benzer mülklerin kira bedeli (emsal)',
  'Bölgenin sosyoekonomik yapısı ve ulaşım imkânları',
  'Mülkün yaşı, durumu ve olanakları (otopark, asansör)',
  'Son yılların enflasyon ve piyasa trendleri',
  'Resmi kurum değerleme raporları ve tapu kayıtları',
];

const DAVACI_STRATEJISI = [
  { taraf: 'Kiracı Açarsa', amac: 'Mevcut kiranın piyasanın üzerinde olduğunu ispat', belgeler: 'Emsal kira sözleşmeleri, ilan fiyatları, mahalle araştırması', olasi: 'Kira düşürülür veya artış sınırlandırılır' },
  { taraf: 'Ev Sahibi Açarsa', amac: 'Mevcut kiranın piyasanın altında kaldığını ispat', belgeler: 'Güncel kira ilanları, ekspertiz raporu, bölge karşılaştırması', olasi: 'Kira artırılır; karar sonraki kira dönemine uygulanır' },
];

const PRATIK_IPUCU = [
  'Dava açmadan önce noter ihtarıyla müzakere denemek zaman ve maliyet kazandırır.',
  'Arabuluculuk sürecinde anlaşılırsa dava masrafları sıfırlanır.',
  'Emsal kira sözleşmeleri toplayın; mahkemeye delil olarak sunun.',
  'Bilirkişi raporuna itiraz hakkınız var; raporun mantıklı gerekçesi yoksa karşı itiraz açın.',
  'Dava masrafları ve bilirkişi ücreti (ortalama 5.000–15.000 ₺) başlangıçta davacı tarafından ödenir; karar sonrası karşı tarafa yüklenebilir.',
  'Süreç ortalama 6–18 ay sürebilir; sabırlı ve belgelenmiş bir strateji belirleyin.',
];

const KISITLAMALAR_2024 = [
  { konu: 'TÜFE Tavan (%25 Kuralı)', detay: 'Konut kiralarında kira artışı TÜFE ile sınırlandırılmakta ve belirli dönemler için %25 tavan uygulanmaktadır. Bu yasal sınır mevcut olduğu sürece tespit davası yolu yerine önce bu sınırı uygulamak mantıklıdır.' },
  { konu: 'Geçici Madde Uygulaması', detay: 'TBK\'nın geçici maddeleri kapsamında belirlenen dönemlerde kira tespit davası açılabilirlik koşulları değişebilir; güncel mevzuatı avukat ile teyit edin.' },
  { konu: 'Yeni Kira Dönemine Etki', detay: 'Kira tespit kararı geriye dönük uygulanmaz; sadece ilerleyen kira dönemine etki eder. Gecikmiş dava kaybedilen kira farkının geri alınmasını sağlamaz.' },
];

export default function KiraTespitDavasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Kira Tespit Davası
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Tespit Davası Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            TBK 344 kapsamında hakkaniyete uygun kira tespiti, bilirkişi süreci ve strateji.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Yıl</p>
              <p className="text-xs text-gray-400">Dava açma koşulu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TBK 344</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Sulh HM</p>
              <p className="text-xs text-gray-400">Yetkili mahkeme</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Dava Şartları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dava Açma Şartları</h2>
          <div className="space-y-4">
            {DAVA_SARTLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-black text-gray-900">{s.sart}</p>
                      <span className="text-[10px] bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded">{s.dayanak}</span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dava Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dava Süreci</h2>
          <div className="space-y-3">
            {SUREC.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Davacı Stratejisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Taraf Stratejileri</h2>
          <div className="space-y-4">
            {DAVACI_STRATEJISI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{d.taraf}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Amaç</p>
                    <p className="text-[10px] text-gray-600">{d.amac}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Belgeler</p>
                    <p className="text-[10px] text-gray-600">{d.belgeler}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Olası Sonuç</p>
                    <p className="text-[10px] text-gray-600">{d.olasi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bilirkişi Kriterleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-[#00C49F]" /> Bilirkişinin Dikkate Aldıkları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BILIRKISI_KRITERLERI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2024 Kısıtlamaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Güncel Mevzuat Notları</h2>
          <div className="space-y-3">
            {KISITLAMALAR_2024.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpucu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Pratik İpuçları
          </h2>
          <div className="space-y-2">
            {PRATIK_IPUCU.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kira tespit davası teknik ve hukuki detaylar içerir. Bilirkişi itirazı, delil sunumu ve emsal kira araştırması için deneyimli bir avukat desteği almanız sonucu doğrudan etkiler.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
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
