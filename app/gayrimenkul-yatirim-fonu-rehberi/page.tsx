import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GYF ve GYO Rehberi | Gayrimenkul Yatırım Fonu ve Ortaklığı | Söylemesi Bizden',
  description:
    'Gayrimenkul Yatırım Fonu (GYF) ve Gayrimenkul Yatırım Ortaklığı (GYO) nedir? BİST\'te nasıl yatırım yapılır, vergi avantajları ve getiri karşılaştırması.',
};

const GYF_GYO_KARSILASTIRMA = [
  { kriter: 'Tanım', gyf: 'SPK lisanslı portföy yönetim şirketleri tarafından yönetilen kolektif yatırım aracı', gyo: 'BİST\'te halka açık, portföyünün en az %50\'si gayrimenkulden oluşan anonim şirket' },
  { kriter: 'Yatırımcı Erişimi', gyf: 'Nitelikli yatırımcılara özel (min. 1 milyon ₺ portföy veya yeterlilik belgesi)', gyo: 'BİST\'te işlem gören hisse senedi; her yatırımcı alabilir' },
  { kriter: 'Likidite', gyf: 'Düşük; fon bitiş tarihi veya geri alım penceresine göre', gyo: 'Yüksek; borsa saatlerinde anlık alım-satım imkânı' },
  { kriter: 'Vergi', gyf: '%0 stopaj (kurumlar vergisinden muaf); temettü dağıtımında bireysel vergilendirme', gyo: 'Temettü %10 stopaj; hisse alım-satım kazancında %0 (halka açık)' },
  { kriter: 'Getiri', gyf: 'Kira geliri + değer artışı; uzun vadeli sabit getiri hedefi', gyo: 'Temettü + hisse değer artışı; piyasa volatilitesine tabi' },
  { kriter: 'Minimum Yatırım', gyf: 'Genellikle 100.000 ₺ ve üzeri (fona göre değişir)', gyo: 'Borsa lotunun fiyatı (birkaç yüz ₺\'den başlayabilir)' },
];

const GYO_HAKKINDA = [
  { baslik: 'BİST\'teki GYO\'lar', aciklama: 'Türkiye\'de 35+ GYO BİST\'te işlem görmektedir. En büyükleri: Emlak Konut GYO (EKGYO), Torunlar GYO (TRGYO), Yeni Gimat GYO (YGGYO) gibi şirketler.' },
  { baslik: 'Portföy Yapısı', aciklama: 'GYO\'lar AVM, ofis binaları, lojistik merkezleri, konut projeleri ve otel gibi büyük ölçekli gayrimenkullere yatırım yapar.' },
  { baslik: 'Temettü Zorunluluğu', aciklama: 'GYO\'lar, vergi muafiyeti avantajından yararlanabilmek için kar payının büyük bölümünü temettü olarak dağıtmak zorundadır.' },
  { baslik: 'NAD (Net Aktif Değer)', aciklama: 'GYO\'ların portföy değeri genellikle halka açık şirket değerinden farklıdır; NAD iskontolu veya primli işlem görebilir.' },
];

const YATIRIM_AVANTAJLARI = [
  { avantaj: 'Düşük Sermayeyle Başlayın', aciklama: 'Büyük bir mülk almak için milyonlarca lira gerekirken, GYO hisseleriyle birkaç yüz lirayla gayrimenkule yatırım yapılabilir.' },
  { avantaj: 'Çeşitlendirme', aciklama: 'Tek bir GYO birden fazla mülke yatırım yapar; doğrudan mülk sahipliğinin getirdiği tekil risk azalır.' },
  { avantaj: 'Pasif Yönetim', aciklama: 'Kiracı bulmak, bakım yapmak ve tapu işlemleriyle uğraşmak gerekmez; profesyonel portföy yönetimi sizi bu yükten kurtarır.' },
  { avantaj: 'Likidite', aciklama: 'Doğrudan mülk sahipliğinde satış aylar sürebilir; GYO hisseleri borsa saatlerinde anında satılabilir.' },
  { avantaj: 'Şeffaflık', aciklama: 'SPK denetimi ve kamuyu aydınlatma yükümlülüğü ile portföy ve mali tablolara tam erişim sağlanır.' },
];

const RISKLER = [
  { risk: 'Piyasa Volatilitesi', aciklama: 'GYO hisseleri tüm borsa hisseleri gibi kısa vadeli dalgalanmalara tabidir; mülk fiyatlarındaki istikrar hisse fiyatına yansımayabilir.' },
  { risk: 'Yönetim Kalitesi', aciklama: 'Portföy yönetim kalitesi şirketten şirkete büyük farklılık gösterir; seçmeden önce track record ve yönetim ekibini araştırın.' },
  { risk: 'Kaldıraç Riski', aciklama: 'GYO\'lar kredi kullanarak mülk alabilir; yüksek borçluluk oranı faiz artışı dönemlerinde şirketi zora sokabilir.' },
  { risk: 'NAD İskontosu', aciklama: 'Piyasa koşullarına bağlı olarak GYO hisseleri portföy değerinin altında işlem görebilir; bu iskonto uzun süre devam edebilir.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'GYO Karşılaştırması', detay: 'EKGYO, TRGYO, ISGYO gibi önde gelen GYO\'ların temettü verimi, NAD iskontosu ve P/D oranlarını kıyaslayarak karar verin.' },
  { bilgi: 'Temettü Takvimi', detay: 'GYO\'lar genellikle yılda bir veya iki kez temettü dağıtır; yıllık temettü verimini mülk kira getirisine karşı kıyaslayın.' },
  { bilgi: 'GYF Portföy Erişimi', detay: 'GYF\'lere erişmek için aracı kurum veya portföy yönetim şirketiyle iletişime geçin; nitelikli yatırımcı olup olmadığınızı sorgulayın.' },
  { bilgi: 'Uzun Vade', detay: 'Gayrimenkul yatırımları doğası gereği uzun vadeli. GYO ve GYF\'lerde de 3–5 yıl ve üzeri yatırım ufuklarıyla değerlendirme yapmak önerilir.' },
];

export default function GayrimenkulYatirimFonuRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> GYF / GYO
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Yatırım Fonu ve Ortaklığı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            GYF ve GYO nedir, nasıl çalışır? BİST&apos;teki gayrimenkul yatırım araçları, vergi avantajları ve doğrudan mülk sahipliğiyle karşılaştırma.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">35+</p>
              <p className="text-xs text-gray-400">BİST&apos;teki GYO sayısı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%0</p>
              <p className="text-xs text-gray-400">GYO alım-satım stopajı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">SPK</p>
              <p className="text-xs text-gray-400">Denetleyici otorite</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Karşılaştırma Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">GYF vs GYO Karşılaştırması</h2>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kriter</th>
                <th className="text-left py-2 font-black text-[#00C49F]">GYF</th>
                <th className="text-left py-2 font-black text-blue-500">GYO</th>
              </tr>
            </thead>
            <tbody>
              {GYF_GYO_KARSILASTIRMA.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900 pr-2">{k.kriter}</td>
                  <td className="py-2 text-gray-600 pr-2">{k.gyf}</td>
                  <td className="py-2 text-gray-600">{k.gyo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* GYO Hakkında */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">GYO Hakkında Bilinmesi Gerekenler</h2>
          <div className="space-y-3">
            {GYO_HAKKINDA.map((g, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{g.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{g.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avantajlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yatırım Avantajları</h2>
          <div className="space-y-3">
            {YATIRIM_AVANTAJLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1 flex items-center gap-2">
                  <CheckCircle size={11} /> {a.avantaj}
                </p>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-4">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Riskler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-rose-500">{r.risk}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{r.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="space-y-3">
            {PRATIK_BILGILER.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> GYO ve GYF yatırımları anapara güvencesi içermez; piyasa değerleri düşebilir. Yatırım kararı vermeden önce SPK onaylı izahname ve kamuyu aydınlatma belgelerini inceleyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/amortisman-hesaplayici', label: 'Amortisman Hesaplayıcı' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Hesaplayıcı' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştır' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi' },
              { href: '/piyasa', label: 'Türkiye Piyasa Verileri' },
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
