import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Sigortası Rehberi | Kapsamlar, Primler, İpuçları | Söylemesi Bizden',
  description:
    'Konut sigortası nedir, ne kapsar? Zorunlu DASK ile ihtiyari konut sigortası farkı, teminat türleri, hasar tazminatı ve sigorta seçim ipuçları.',
};

const SIGORTA_TURLERI = [
  {
    tur: 'DASK (Zorunlu Deprem Sigortası)',
    zorunlu: true,
    kapsam: 'Yalnızca deprem ve buna bağlı yangın, patlama, çığ ve heyelan hasarlarını karşılar.',
    sinir: 'Yapı bedeli üst sınırlı (m² ve yapı türüne göre belirlenir)',
    fiyat: '500–3.000 ₺/yıl',
  },
  {
    tur: 'İhtiyari Konut Sigortası',
    zorunlu: false,
    kapsam: 'Yangın, hırsızlık, su baskını, doğal afet, cam kırılması, eşya hasarı gibi geniş kapsamlı teminatlar.',
    sinir: 'Sigortalı değer (yapı + eşya + sorumluluk)',
    fiyat: '1.500–10.000 ₺/yıl',
  },
  {
    tur: 'Kiracı Sigortası',
    zorunlu: false,
    kapsam: 'Kiracının sorumluluğundaki eşya hasarları ve ev sahibine karşı sorumlulukları kapsar; yapı teminatı içermez.',
    sinir: 'Eşya değerine göre',
    fiyat: '800–3.000 ₺/yıl',
  },
  {
    tur: 'Konut Kredi Sigortası (Hayat)',
    zorunlu: false,
    kapsam: 'Banka konut kredisinde borçlunun vefatı veya iş göremezliği halinde kalan kredi borcunu karşılar.',
    sinir: 'Kalan kredi bakiyesi',
    fiyat: 'Kredi tutarına göre yıllık prim',
  },
];

const TEMINAT_TURLERI = [
  { teminat: 'Yangın ve Duman', aciklama: 'Konut yangını ve duman hasarını karşılar; mutfak yangınlarında kısmi hasar teminatı önemlidir.' },
  { teminat: 'Su Baskını ve Fırtına', aciklama: 'Dışarıdan gelen sel/su baskını teminatı ile fırtına hasarı; bölgesel risk koşullarına göre prim değişir.' },
  { teminat: 'Hırsızlık', aciklama: 'Kırarak/zorlayarak giriş yoluyla gerçekleşen hırsızlık hasarlarını karşılar; alt limit ve belgeleme şartı vardır.' },
  { teminat: 'Cam Kırılması', aciklama: 'Konut pencereleri, sürgülü kapılar ve vitrin camlarının kırılmasını karşılar; çatlaklar için ek kloz gerekebilir.' },
  { teminat: 'Eşya ve Beyaz Eşya', aciklama: 'Mobilya, elektronik ve ev aletleri için ek teminat; her yıl güncellenen değer bildiriminde doğruluk önemlidir.' },
  { teminat: 'Malik/Kiracı Sorumluluğu', aciklama: 'Alt daire gibi üçüncü kişilere verilen su/yangın hasarlarını karşılar; site ve apartman hayatında kritik teminattır.' },
];

const HASARDA_YAPILACAKLAR = [
  { adim: '24 Saat İçinde Bildir', aciklama: 'Hasarı fark ettiğiniz andan itibaren 24 saat (bazı poliçelerde 5 iş günü) içinde sigorta şirketine bildirin; gecikmeli bildirim tazminatı etkileyebilir.' },
  { adim: 'Belgeleme Yapın', aciklama: 'Hasarı fotoğraflayın, mümkünse video çekin. Hasarın kaynağını (boru kaçağı faturası, hırsızlık ihbar belgesi) belgeleyin.' },
  { adim: 'Eksik İmzalamayın', aciklama: 'Sigorta eksperinin sunduğu tutanağı, hasarı tam olarak tazmin edecek miktarı görmeden imzalamayın; itiraz hakkı tanınmıştır.' },
  { adim: 'Hasar Tespiti Öncesi Onarım Yapmayın', aciklama: 'Eksper gelmeden hasarlı bölümü onarmaya başlamayın; aksi halde hasar miktarı eksik belgelenebilir.' },
];

const SECIM_IPUCLARI = [
  { ipucu: 'Üst Yapı Değerini Doğru Bildirin', aciklama: 'Yapı değerini düşük bildirmek prim tasarrufu sağlar ama hasar anında eksik tazminat almanıza yol açar. Güncel inşaat m² maliyetiyle hesaplayın.' },
  { ipucu: 'Eşyaları Ayrı Teminat Alın', aciklama: 'Birçok temel konut poliçesi yalnızca yapı hasarını karşılar. Eşya ve beyaz eşya için ek teminat seçeneğini mutlaka değerlendirin.' },
  { ipucu: 'Muafiyet Tutarına Bakın', aciklama: 'Hasar başına düşen muafiyet (franchise) tutarı, küçük hasarlarda sigorta ödemesi yapılmayacağı anlamına gelir; bu tutarı önceden öğrenin.' },
  { ipucu: 'Fiyat Karşılaştırması Yapın', aciklama: 'DASK dahil tüm poliçeleri en az 3 sigorta şirketinden kıyaslayın. Banka aracılığıyla alınan poliçeler genellikle daha pahalıdır.' },
];

export default function KonutSigortasiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Konut Sigortası
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Sigortası Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            DASK ve ihtiyari konut sigortası türleri, teminat kapsamları, hasar prosedürü ve sigorta seçim ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">Zorunlu</p>
              <p className="text-xs text-gray-400">DASK poliçesi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6 Teminat</p>
              <p className="text-xs text-gray-400">Temel kapsam türleri</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">24 Saat</p>
              <p className="text-xs text-gray-400">Hasar bildirim süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Sigorta Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Konut Sigortası Türleri</h2>
          <div className="space-y-3">
            {SIGORTA_TURLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{s.tur}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${s.zorunlu ? 'bg-rose-50 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>
                    {s.zorunlu ? 'Zorunlu' : 'İhtiyari'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{s.kapsam}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-400">{s.sinir}</p>
                  <span className="text-[10px] font-black text-[#00C49F]">{s.fiyat}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teminat Türleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Temel Teminat Türleri
          </h2>
          <div className="space-y-3">
            {TEMINAT_TURLERI.map((t, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{t.teminat}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hasarda Yapılacaklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hasar Durumunda Yapılacaklar</h2>
          <div className="space-y-3">
            {HASARDA_YAPILACAKLAR.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-xs font-black text-gray-900">{a.adim}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seçim İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sigorta Seçim İpuçları</h2>
          <div className="space-y-3">
            {SECIM_IPUCLARI.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{s.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> DASK olmadan tapu işlemi ve konut kredisi kullanılamaz. Poliçenizi her yıl yenileyin; geçersiz DASK poliçesiyle sigorta tazminatı alınamaz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/deprem-sigorta-hesaplayici', label: 'Deprem Sigortası Hesaplayıcı' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvuru Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Hesaplayıcı' },
              { href: '/rehber', label: 'Konut Rehberi' },
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
