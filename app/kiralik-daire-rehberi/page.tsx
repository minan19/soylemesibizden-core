import { Metadata } from 'next';
import Link from 'next/link';
import { Home, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kiralık Daire Bulma Rehberi 2024 | Adım Adım, Dolandırıcılık, Sözleşme | Söylemesi Bizden',
  description:
    'Kiralık daire bulma rehberi: bütçe hesabı, güvenilir ilan bulma, dolandırıcılık uyarıları, ilk görüşme soruları ve sözleşme imzalama.',
};

const ADIMLAR = [
  {
    adim: '1. Bütçe ve Kriterleri Belirle',
    icerik: [
      'Aylık kirayı net gelirinizin en fazla %30\'u olarak hedefleyin',
      'Aidat, yakıt, elektrik/su ortak giderlerini de hesaba katın',
      'Semte göre ulaşım masrafını (otobüs/metro kartı vs. araç) karşılaştırın',
      'Depozito (1–3 ay) + ilk ay kira nakit hazırlığı yapın',
    ],
  },
  {
    adim: '2. Güvenilir Kaynaklardan İlan Bul',
    icerik: [
      'Lisanslı emlakçı ofisleri (Söylemesi Bizden gibi platformlar)',
      'Sahibinden.com, Hepsiemlak.com — ancak doğrulama yapın',
      'Sosyal medya grupları dikkatli kullanılmalı; dolandırıcılık yaygın',
      'Muhit gezmesi: kapılardaki "Kiralık" ilanları hâlâ işe yarar',
    ],
  },
  {
    adim: '3. İlanı Değerlendir',
    icerik: [
      'Fotoğrafların gerçek mi yoksa temsili mi olduğunu kontrol edin',
      'Lokasyonu harita üzerinde doğrulayın (mesafeler)',
      'Yaklaşık bölge m² fiyatıyla kira karşılaştırması yapın',
      'İlanın ne kadar süredir yayında olduğunu kontrol edin',
    ],
  },
  {
    adim: '4. Yerinde Görüşme ve İnceleme',
    icerik: [
      'Gündüz ve mümkünse akşam saatlerinde ziyaret edin (gürültü kontrolü)',
      'Komşu katlara çıkın, apartman ortak alanlarını görün',
      'Su basıncı, elektrik prizi, doğalgaz sayacı test edin',
      'Nem, rutubet, koku kontrolü yapın',
      'Kalorifer/kombi/klima sistemlerini sorun',
    ],
  },
  {
    adim: '5. Belgeleri Kontrol Et',
    icerik: [
      'Kiraya verenin tapu fotokopisi: adın doğruluğunu kontrol edin',
      'Kimlik belgesi fotokopisi alın',
      'Kira bedeli banka havalesiyle ödenecekse IBAN alın',
      'Kira sözleşmesini imzalamadan avukata veya güvenilir bir kişiye inceletin',
    ],
  },
  {
    adim: '6. Sözleşme ve Teslim',
    icerik: [
      'Teslim tutanağı: fotoğraflı oda oda belgeleme',
      'Sayaç endekslerini (elektrik, su, gaz) kaydedin',
      'Demirbaş listesi oluşturun (mobilya, beyaz eşya)',
      'Depozitoyu vadeli hesapta tutma teklifini görüşün',
    ],
  },
];

const DOLANDIRICILIK_UYARILARI = [
  { durum: '"Anahtarı göndermeden önce depozito yatırın"', risk: 'Kesinlikle Dolandırıcılık' },
  { durum: 'Fiyat piyasanın %40–50 altında', risk: 'Çok Şüpheli' },
  { durum: 'Mal sahibi yurt dışında, fiziksel görüşme mümkün değil', risk: 'Yüksek Risk' },
  { durum: 'İlan fotoğrafları başka sitelerden çalınmış (Google Görsel Arama yapın)', risk: 'Dolandırıcılık' },
  { durum: 'Sözleşme öncesi herhangi bir ön ödeme isteniyor', risk: 'Çok Yüksek Risk' },
  { durum: 'Tapu fotokopisi vermekten kaçınıyor', risk: 'Şüpheli' },
];

const GORUSME_SORULARI = [
  'Kira süresi ve uzatma koşulları ne?',
  'Aidat ne kadar, neleri kapsıyor?',
  'Yakıt giderleri (doğalgaz/kombi) nasıl ödeniyor?',
  'Bina yönetimi var mı? Yönetici iletişimi nasıl?',
  'Son ne zaman tadilat/boyama yapıldı?',
  'İnternette hangi alt yapı var (fiber/ADSL/kablo)?',
  'Otopark/depo dahil mi veya ücretli mi?',
  'Depozito iadesi için koşullar neler?',
  'Kira artışı nasıl belirleniyor?',
  'Evcil hayvan veya çocuk politikası var mı?',
];

const BUTCE_FORMUL = [
  { kalem: 'Aylık Kira', oran: 'Maks. net gelirin %30\'u', ornek: '20.000 ₺ maaş → 6.000 ₺ kira' },
  { kalem: 'Aidat', oran: 'Genellikle kiranın %5–15\'i', ornek: '6.000 ₺ kira → 300–900 ₺ aidat' },
  { kalem: 'Yakıt/Elektrik', oran: 'Sezona göre 500–3.000 ₺', ornek: 'Kış aylarında yüksek' },
  { kalem: 'İnternet', oran: '300–500 ₺/ay', ornek: 'Fiber paket ortalaması' },
  { kalem: 'Başlangıç Masrafı', oran: '3–4 aylık kira', ornek: '1 ay kira + 3 ay depozito' },
];

export default function KiralikDaireRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Kiralık Daire Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kiralık Daire Bulma Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bütçe hesabı, güvenilir ilan bulma, dolandırıcılık uyarıları ve sözleşme imzalama adım adım rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Adım</p>
              <p className="text-xs text-gray-400">Daire bulma süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%30</p>
              <p className="text-xs text-gray-400">Kira/gelir kuralı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3–4 Ay</p>
              <p className="text-xs text-gray-400">Başlangıç masrafı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Adım Adım */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Adım Adım Kiralık Daire Bulma</h2>
          <div className="space-y-4">
            {ADIMLAR.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{a.adim}</p>
                <div className="space-y-2">
                  {a.icerik.map((ic, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-700 leading-relaxed">{ic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bütçe Formülü */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Bütçe Hesaplama Formülü</h2>
          <div className="space-y-2">
            {BUTCE_FORMUL.map((b, i) => (
              <div key={i} className={`grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0 ${i === BUTCE_FORMUL.length - 1 ? 'bg-amber-50 rounded-lg px-2' : ''}`}>
                <p className="text-xs font-black text-gray-900">{b.kalem}</p>
                <p className="text-xs text-[#00C49F] font-bold">{b.oran}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{b.ornek}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dolandırıcılık Uyarıları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dolandırıcılık Uyarıları</h2>
          <div className="space-y-3">
            {DOLANDIRICILIK_UYARILARI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-3">
                <p className="text-xs text-gray-800 italic">&ldquo;{d.durum}&rdquo;</p>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${
                  d.risk === 'Kesinlikle Dolandırıcılık' || d.risk === 'Dolandırıcılık' ? 'bg-rose-100 text-rose-700' :
                  d.risk === 'Çok Yüksek Risk' || d.risk === 'Yüksek Risk' ? 'bg-orange-100 text-orange-700' :
                  'bg-amber-100 text-amber-700'
                }`}>{d.risk}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Görüşme Soruları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Görüşmede Sormanız Gereken 10 Soru
          </h2>
          <div className="space-y-2">
            {GORUSME_SORULARI.map((s, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0">{i + 1}</span>
                <p className="text-xs text-gray-700 self-center">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Depozito dahil hiçbir ödemeyi fiziksel görüşme ve sözleşme imzası olmadan yapmayın. Mal sahibinin tapu sicil kaydını e-Devlet üzerinden de doğrulayabilirsiniz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları Rehberi' },
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/m2-fiyat-karsilastir', label: 'm² Fiyat Karşılaştır' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
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
