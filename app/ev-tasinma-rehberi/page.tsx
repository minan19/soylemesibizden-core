import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Taşınma Rehberi 2024 | Planlama, Paketleme, Nakliye | Söylemesi Bizden',
  description:
    'Ev taşınma rehberi: 8 haftalık planlama takvimi, paketleme ipuçları, nakliyat firması seçimi ve taşınma günü kontrol listesi.',
};

const TAKVIM = [
  {
    sure: '8 Hafta Önce',
    gorevler: [
      'Taşınma tarihini kesinleştirin',
      'Nakliyat firması tekliflerini alın (en az 3)',
      'Eski evdeki kira/tapu durumunu netleştirin',
      'Depozito iade sürecini başlatın',
    ],
  },
  {
    sure: '6 Hafta Önce',
    gorevler: [
      'Nakliyat firmasını seçin ve sözleşme imzalayın',
      'Posta/fatura adres değişikliği bildirimlerini listeleyin',
      'Okul kaydı veya işyeri adres güncellemelerini planlayın',
      'Gereksiz eşyaları bağışlayın veya satın',
    ],
  },
  {
    sure: '4 Hafta Önce',
    gorevler: [
      'Paketleme malzemeleri temin edin (kutu, bant, ambalaj malzemesi)',
      'Nadiren kullanılan eşyaları paketlemeye başlayın',
      'İnternet, elektrik, su bildirimlerini yapın',
      'Yeni evdeki tadilat varsa tamamlanmasını takip edin',
    ],
  },
  {
    sure: '2 Hafta Önce',
    gorevler: [
      'Kıyafet, mutfak ve salon eşyalarını paketleyin',
      'Değerli eşyaları kendiniz taşımak üzere ayırın',
      'İlaç ve kişisel bakım ürünleri için ayrı çanta hazırlayın',
      'Nakliyatçıyla son gün detaylarını teyit edin',
    ],
  },
  {
    sure: 'Taşınma Haftası',
    gorevler: [
      'Dondurucuyu boşaltın ve buzdolabını defrost yapın',
      'Elektrik/su aboneliklerini yeni adrese taşıyın',
      'Eski evin anahtarlarını teslim tarihini ayarlayın',
      'Komşulara vedayı unutmayın',
    ],
  },
  {
    sure: 'Taşınma Günü',
    gorevler: [
      'Nakliyatçıyı ev girişinde karşılayın; hasar tutanağı imzalatın',
      'Kırılgan eşyaları bizzat etiketleyin',
      'Eski evi kilitleyin ve son kez kontrol edin (sayaç kapatma, gaz vana)',
      'Yeni evin elektrik, su ve doğalgazını kontrol edin',
    ],
  },
];

const NAKLIYAT_SECIMI = [
  { kriter: 'Sigortalı taşıma', aciklama: 'Nakliyat sırasında hasar teminatı olup olmadığını sorun; kırılma riski olan eşyalar için eşya sigortası yaptırın.' },
  { kriter: 'Referans ve online yorumlar', aciklama: 'Hizmet Puanı (HP) listeleri ve Google yorumlarını inceleyin; en az 3 firmadan karşılaştırmalı teklif alın.' },
  { kriter: 'Oda sayısı ve km', aciklama: 'Fiyatlar genellikle oda adedi + km üzerinden belirlenir. Şehiriçi 2+1 için 5.000–15.000 ₺ aralığı normal.' },
  { kriter: 'Ek ücretler', aciklama: 'Asansör erişimi, kat farkı, ambalaj malzemesi, tarih değişikliği gibi kalemler için önceden netlik isteyin.' },
  { kriter: 'Montaj ve demontaj', aciklama: 'Dolap, yatak, beyaz eşya sökme/takması dahil mi? Sözleşmede açıkça belirtilmeli.' },
];

const PAKETLEME_IPUCU = [
  'Her kutuya içerik ve ait olduğu odayı yazın; büyük harflerle işaretleyin',
  'Ağır eşyaları küçük kutulara, hafif eşyaları büyük kutulara koyun',
  'Fincan ve bardakları dikey değil yatay paketleyin — daha az kırılır',
  'Giysileri valiz veya poşetlerde asmadan taşıyın; ütü ihtiyacını azaltır',
  'Elektronikleri orijinal kutularında taşımak mümkünse en güvenli yoldur',
  'İlk gece kutusunu ayırın: çarşaf, diş fırçası, ilaç, şarj aleti, tuvalet kağıdı',
];

const TESLIM_SONRASI = [
  'Tüm eşyaları teslim anında kontrol edin; hasar varsa tutanak tutun',
  'Yeni evin su, elektrik ve doğalgaz sayaçlarını fotoğraflayın',
  'Abonelik ve adres bildirimlerini yapın: banka, SGK, vergi dairesi, nüfus müdürlüğü',
  'Apartman aidat bilgisini ve yönetici iletişimini öğrenin',
  'Güvenlik için kilitleri değiştirmeyi değerlendirin',
];

export default function EvTasinmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Truck size={13} /> Ev Taşınma Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Ev Taşınma Rehberi 2024</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            8 haftalık planlama takviminden nakliyat firması seçimine, paketleme ipuçlarından teslim sonrasına eksiksiz rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Hafta</p>
              <p className="text-xs text-gray-400">Planlama süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 Teklif</p>
              <p className="text-xs text-gray-400">Nakliyat için minimum</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Sigortalı</p>
              <p className="text-xs text-gray-400">Taşıma zorunlu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Takvim */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">8 Haftalık Taşınma Takvimi</h2>
          <div className="space-y-4">
            {TAKVIM.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#00C49F] text-white text-[10px] font-black px-3 py-1 rounded-full">{t.sure}</div>
                </div>
                <div className="space-y-2">
                  {t.gorevler.map((g, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700 leading-relaxed">{g}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nakliyat */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Nakliyat Firması Seçim Kriterleri</h2>
          <div className="space-y-3">
            {NAKLIYAT_SECIMI.map((n, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{n.kriter}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Paketleme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Paketleme İpuçları
          </h2>
          <div className="space-y-2">
            {PAKETLEME_IPUCU.map((ip, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teslim Sonrası */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Taşınma Sonrası Yapılacaklar</h2>
          <div className="space-y-2">
            {TESLIM_SONRASI.map((t, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[#00C49F]/10 text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Nakliyat hasar tutanağı imzalanmadan önce tüm eşyaları kontrol edin. Sonradan yapılan hasar şikayetleri ispatı güçleştireceğinden, teslim anında belgeleme yapın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tadilat-maliyet-hesaplayici', label: 'Tadilat Maliyet Hesaplayıcı' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/kiralik-daire-rehberi', label: 'Kiralık Daire Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
              { href: '/aidat-hesaplayici', label: 'Aidat Hesaplayıcı' },
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
