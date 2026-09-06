import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Yatırım Fonu (GYF) Rehberi | GYO, REIF | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırım fonları (GYF) ve ortaklıkları (GYO) nedir? Nasıl yatırım yapılır? Avantajlar, riskler ve Türkiye pazarı hakkında kapsamlı rehber.',
};

const GYF_GYO_FARKI = [
  {
    tur: 'Gayrimenkul Yatırım Ortaklığı (GYO)',
    borsada: true,
    aciklama: 'Borsada işlem gören şirket hisseleri. Taşınmaz varlıklar kiraya verilir; kira geliri ve değer artışı yatırımcıya yansır. İstanbul Menkul Kıymetler Borsası\'nda işlem görür.',
    avantaj: 'Likidite yüksek, düşük sermaye, borsada anında alım-satım',
    dezavantaj: 'Borsa dalgalanmasına açık; temettü garantisi yok',
  },
  {
    tur: 'Gayrimenkul Yatırım Fonu (GYF)',
    borsada: false,
    aciklama: 'Nitelikli yatırımcılara satılan, Sermaye Piyasası Kurulu (SPK) tarafından yetkilendirilmiş portföy yönetim şirketlerince yönetilen fonlar.',
    avantaj: 'Profesyonel yönetim, çeşitlendirme, vergi avantajları',
    dezavantaj: 'Likidite düşük; genellikle 250.000 USD+ giriş eşiği',
  },
];

const TURKIYE_GYO = [
  { ad: 'Emlak Konut GYO', odak: 'Konut projeleri', temettüVerimi: '%2–4', aciklama: 'TOKİ ortaklığıyla sıfır konut projeleri geliştiren en büyük GYO.' },
  { ad: 'Torunlar GYO', odak: 'AVM ve otel', temettüVerimi: '%1–3', aciklama: 'Alışveriş merkezi ve oteller odaklı ticari gayrimenkul portföyü.' },
  { ad: 'Özak GYO', odak: 'Karma proje', temettüVerimi: '%1–3', aciklama: 'Konut, ofis ve ticari alanlar karma portföy.' },
  { ad: 'Vakıf GYO', odak: 'Ofis ve lojistik', temettüVerimi: '%2–5', aciklama: 'Vakıfbank grubuna bağlı; ofis ve depo ağırlıklı.' },
  { ad: 'Reysaş GYO', odak: 'Lojistik', temettüVerimi: '%3–6', aciklama: 'Türkiye\'nin en büyük lojistik gayrimenkul portföyü.' },
];

const YATIRIM_ADIM = [
  { adim: 'Aracı Kurum Hesabı Açın', aciklama: 'GYO hissesi almak için Borsa İstanbul\'da işlem yapan bir aracı kurumda hesap gereklidir.' },
  { adim: 'GYO Şirketlerini Araştırın', aciklama: 'KAP\'tan (Kamuyu Aydınlatma Platformu) finansal raporları inceleyin; net aktif değer (NAV) ve temettü geçmişini değerlendirin.' },
  { adim: 'Portföy Değeri/Piyasa Değeri Farkı', aciklama: 'GYO hissesi NAV\'ın altında işlem görüyorsa iskontolu fırsat olabilir; üzerinde ise prim ödüyorsunuz.' },
  { adim: 'Temettü Politikasını İnceleyin', aciklama: 'GYO\'lar yasal olarak belirli oranda kar dağıtmak zorundadır. Düzenli temettü geçmişi olan şirketleri tercih edin.' },
  { adim: 'Çeşitlendirin', aciklama: 'Tek GYO\'ya yatırım yapmak yerine farklı sektörlere (konut, AVM, lojistik) yayılın.' },
];

const VERGI_BILGISI = [
  { konu: 'GYO Temettüsü', oran: '%10 stopaj', aciklama: 'GYO\'dan alınan temettü üzerinden %10 oranında stopaj kesilir.' },
  { konu: 'Hisse Değer Artışı', oran: '2 yıldan sonra muaf', aciklama: '2 yılı aşan GYO hisse tutumları değer artış kazancı vergisinden muaftır.' },
  { konu: 'GYF Yatırım Kazancı', oran: 'SPK düzenlemesine göre', aciklama: 'GYF gelirleri fon türüne ve nitelikli yatırımcı statüsüne göre farklı vergilendirilir.' },
];

export default function GayrimenkulYatirimFonuRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> GYF / GYO Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Yatırım Fonu ve Ortaklığı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            GYO ve GYF aracılığıyla gayrimenkul yatırımının avantajları, Türkiye\'deki büyük oyuncular ve nasıl başlanır.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">BIST</p>
              <p className="text-xs text-gray-400">GYO işlem yeri</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%10</p>
              <p className="text-xs text-gray-400">Temettü stopajı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">2 Yıl</p>
              <p className="text-xs text-gray-400">Vergi muafiyeti</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* GYF vs GYO */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">GYO ve GYF Farkı</h2>
          <div className="space-y-4">
            {GYF_GYO_FARKI.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{g.tur}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${g.borsada ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'}`}>
                    {g.borsada ? 'Borsada İşlem Görür' : 'Nitelikli Yatırımcı'}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mb-2">{g.aciklama}</p>
                <div className="flex gap-4 text-[10px]">
                  <span className="text-green-600">✓ {g.avantaj}</span>
                </div>
                <div className="flex gap-4 text-[10px] mt-1">
                  <span className="text-rose-500">✗ {g.dezavantaj}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Türkiye GYO'ları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Türkiye\'deki Büyük GYO\'lar</h2>
          <div className="space-y-3">
            {TURKIYE_GYO.map((g, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-black text-gray-900">{g.ad}</p>
                  <p className="text-[10px] text-gray-500">{g.odak}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-gray-600 leading-relaxed">{g.aciklama}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-[#00C49F]">{g.temettüVerimi}</p>
                  <p className="text-[10px] text-gray-400">Temettü</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* Temettü verimleri yıllık değişkendir; güncel veriler için KAP&apos;ı takip edin.</p>
        </section>

        {/* Yatırım Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">GYO&apos;ya Nasıl Yatırım Yapılır?</h2>
          <div className="space-y-3">
            {YATIRIM_ADIM.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{a.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi Bilgisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Vergi Bilgisi
          </h2>
          <div className="space-y-3">
            {VERGI_BILGISI.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{v.konu}</p>
                <p className="text-xs font-black text-[#00C49F]">{v.oran}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Yatırım Riski:</span> GYO hisse fiyatları borsa koşullarına bağlıdır; geçmiş getiri gelecek performansı garanti etmez. Yatırım kararları için lisanslı yatırım danışmanından destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yatirim-analizi', label: 'Yatırım ROI Hesaplayıcı' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
              { href: '/portfoy', label: 'Portföy Takip' },
              { href: '/servet-birikimi-hesaplayici', label: 'Servet Birikimi Hesaplayıcı' },
              { href: '/gayrimenkul-vergi-optimizasyon', label: 'Vergi Optimizasyon' },
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
