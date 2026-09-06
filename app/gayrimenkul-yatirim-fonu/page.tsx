import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp, CheckCircle, AlertTriangle, ArrowRight, Building2, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Yatırım Ortaklığı (GYO) ve Fonu (GYF) Rehberi | Söylemesi Bizden',
  description:
    'GYO ve GYF nedir, nasıl yatırım yapılır? Doğrudan gayrimenkul ile karşılaştırma, vergi avantajları, Türkiye büyük GYO\'lar.',
};

const GYO_VS_DIREKT = [
  { konu: 'Başlangıç Sermayesi', gyo: 'Borsa payı fiyatı (~₺100+)', direkt: '₺500K–₺10M+' },
  { konu: 'Likidite', gyo: 'Yüksek — borsa saatlerinde alım-satım', direkt: 'Düşük — satış 1–12 ay sürebilir' },
  { konu: 'Çeşitlendirme', gyo: 'Onlarca mülk portföyüne pay', direkt: 'Genellikle tek mülk' },
  { konu: 'Yönetim Yükü', gyo: 'Yok — profesyonel yönetim', direkt: 'Kiracı, onarım, vergi yönetimi' },
  { konu: 'Temettü', gyo: 'Net gelirin %80\'i zorunlu dağıtılır', direkt: 'Kira geliri doğrudan' },
  { konu: 'Kaldıraç İmkânı', gyo: 'Marjin hesabı ile (riskli)', direkt: 'Konut kredisi ile (%80\'e kadar)' },
  { konu: 'Şeffaflık', gyo: 'SPK/BIST denetimli açık raporlama', direkt: 'Sınırlı piyasa şeffaflığı' },
  { konu: 'Vergi (Temettü)', gyo: 'Stopaj %15 (bireysel)', direkt: 'Gelir vergisi dilimleri %15–%40' },
];

const BUYUK_GYOLAR = [
  { ad: 'Emlak Konut GYO', kod: 'EKGYO', odak: 'Konut + TOKİ projeleri', piyasaDegeri: '₺50 Milyar+' },
  { ad: 'İş GYO', kod: 'ISGYO', odak: 'AVM ve ofis', piyasaDegeri: '₺15 Milyar+' },
  { ad: 'Torunlar GYO', kod: 'TRGYO', odak: 'AVM, ofis, otel', piyasaDegeri: '₺8 Milyar+' },
  { ad: 'Reysaş GYO', kod: 'RYGYO', odak: 'Lojistik ve depo', piyasaDegeri: '₺5 Milyar+' },
  { ad: 'Halk GYO', kod: 'HLGYO', odak: 'Karma portföy', piyasaDegeri: '₺4 Milyar+' },
];

const GYF_OZELLIKLERI = [
  { ozellik: 'Yatırımcı Tipi', detay: 'Nitelikli yatırımcı (₺1M+ portföy veya belirli gelir eşiği).' },
  { ozellik: 'Yapı', detay: 'Borsa\'da işlem görmez; belirli dönemlerde alım-satım penceresi açılır.' },
  { ozellik: 'Portföy', detay: 'Direkt gayrimenkul, GYO payı, alacak senedi ve gayrimenkul projelerine yatırım.' },
  { ozellik: 'Getiri Hedefi', detay: 'Genellikle yıllık %15–%25 net getiri hedeflenir (garantili değil).' },
  { ozellik: 'Denetim', detay: 'SPK onaylı, portföy yönetim şirketi tarafından yönetilir.' },
];

const AVANTAJLAR = [
  'Düşük sermayeyle geniş gayrimenkul portföyüne erişim.',
  'Profesyonel portföy yönetimi — bireysel mülk yönetim yükü yok.',
  'Net gelirin %80\'i temettü olarak dağıtım zorunluluğu (GYO).',
  'BIST\'te anlık alım-satım imkânı ile yüksek likidite.',
  'Enflasyona karşı kısmen koruma — reel varlık tabanı.',
  'Kurumsal yönetim ve SPK/BIST denetimi ile şeffaflık.',
];

const RISKLER = [
  'Borsa dalgalanmaları GYO fiyatını kısa vadede büyük oranda etkileyebilir.',
  'Mülk değerleri düştüğünde temettü kesilmesi veya azalması.',
  'Yönetim ücretleri ve portföy maliyetleri getiriyi aşındırabilir.',
  'GYF\'lerde çıkış likidite penceresi kısıtlı; acil nakit ihtiyacında sorun yaratır.',
  'Kira artışları GYO gelirine yansımasında zaman gecikmesi olabilir.',
];

const NASIL_YATIRIM = [
  { adim: 'BIST Hesabı Açın', detay: 'Aracı kurumda yatırım hesabı açın; BIST\'te GYO paylarına MKK kanalından ulaşırsınız.' },
  { adim: 'GYO Analizi Yapın', detay: 'Portföy kompozisyonu, doluluk oranı, FFO (Fondan Operasyonlar) ve temettü geçmişini inceleyin.' },
  { adim: 'Değerleme Oranlarını Kontrol Edin', detay: 'NAV (Net Varlık Değeri) iskontosu veya primini hesaplayın; iskontolu alım fırsat yaratabilir.' },
  { adim: 'Çeşitlendirin', detay: 'Konut, AVM, lojistik ve ofis odaklı GYO\'ları birleştirerek sektörel riski dağıtın.' },
  { adim: 'Temettü Döngüsünü Takip Edin', detay: 'Temettü dağıtım tarihleri öncesinde payları elde tutmak temettü geliri sağlar.' },
];

export default function GayrimenkulYatirimFonuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Yatırım Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            GYO ve GYF: Gayrimenkul Yatırım Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Gayrimenkul yatırım ortaklıkları (GYO) ve fonları (GYF) ile düşük sermayeyle geniş portföy,
            yüksek likidite ve zorunlu temettü avantajı.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%80</p>
              <p className="text-xs text-gray-400">Zorunlu temettü dağıtımı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">BIST</p>
              <p className="text-xs text-gray-400">Yüksek likidite</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%15</p>
              <p className="text-xs text-gray-400">Temettü stopajı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* GYO vs Direkt Karşılaştırma */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">GYO vs Direkt Gayrimenkul Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Konu</th>
                    <th className="text-left px-4 py-3 font-black text-[#00C49F]">GYO (Borsa)</th>
                    <th className="text-left px-4 py-3 font-black text-blue-600">Direkt Gayrimenkul</th>
                  </tr>
                </thead>
                <tbody>
                  {GYO_VS_DIREKT.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.konu}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{r.gyo}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{r.direkt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Türkiye Büyük GYO'lar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Türkiye'nin Önde Gelen GYO'ları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BUYUK_GYOLAR.map((g, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Building2 size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-black text-gray-900">{g.ad}</p>
                    <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] px-2 py-0.5 rounded font-bold">{g.kod}</span>
                  </div>
                  <p className="text-[10px] text-gray-600">{g.odak}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Piyasa değeri ~{g.piyasaDegeri}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GYF Özellikleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Gayrimenkul Yatırım Fonları (GYF)</h2>
          <div className="space-y-3">
            {GYF_OZELLIKLERI.map((o, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{o.ozellik}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{o.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Avantaj / Risk */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={14} className="text-[#00C49F]" /> Avantajlar
            </h2>
            <ul className="space-y-2.5">
              {AVANTAJLAR.map((a, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-rose-500" /> Riskler
            </h2>
            <ul className="space-y-2.5">
              {RISKLER.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle size={11} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Nasıl Yatırım Yapılır */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">GYO'ya Nasıl Yatırım Yapılır?</h2>
          <div className="space-y-3">
            {NASIL_YATIRIM.map((s, i) => (
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

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Uyarı:</span> GYO payları borsada işlem gördüğünden kısa vadeli fiyat dalgalanmaları yüksek olabilir. Geçmiş temettü performansı gelecek getirileri garanti etmez. Yatırım kararı öncesinde SPK onaylı aracı kurum danışmanınıza başvurun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yatirim-analizi', label: 'Yatırım Analizi ve ROI' },
              { href: '/yatirim-npv', label: 'NPV / IRR Hesaplayıcı' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/enflasyon-korumasi', label: 'Enflasyon Koruması' },
              { href: '/portfoy', label: 'Portföy Takip Aracı' },
              { href: '/rehber/yatirim-rehberi', label: 'Yatırım Rehberi' },
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
