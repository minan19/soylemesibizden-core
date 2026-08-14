import { Metadata } from 'next';
import Link from 'next/link';
import { Receipt, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import KiraVergisiClient from './KiraVergisiClient';

export const metadata: Metadata = {
  title: 'Kira Geliri Vergisi Hesaplayıcı 2024 | Söylemesi Bizden',
  description:
    'Kira geliri üzerinden ödenecek gelir vergisini hesaplayın. Götürü gider, gerçek gider, mesken istisnası (₺33.000) ve 2024 vergi dilimleri.',
};

const FAQS = [
  {
    q: 'Kira geliri vergisi beyannamesi ne zaman verilir?',
    a: 'Her yılın Mart ayında (1-31 Mart) bir önceki yıla ait kira gelirleri için yıllık beyanname GİB\'e verilir.',
  },
  {
    q: 'Götürü gider yöntemi nedir?',
    a: 'Kira gelirinden istisna düşüldükten sonra kalan tutarın %15\'i gider olarak düşülür. Belge gerekmez.',
  },
  {
    q: 'Gerçek gider yöntemi avantajı ne zaman?',
    a: 'Aidat, bakım, onarım, konut kredisi faizi ve amortismanın toplamı götürü gideri aşıyorsa gerçek gider yöntemi daha avantajlıdır.',
  },
  {
    q: 'Mesken istisnası ne zaman uygulanır?',
    a: '2024\'te ₺33.000 mesken istisnası; sahip olunan tek konuttan elde edilen kira gelirinde uygulanabilir. İşyeri kiraları için geçerli değildir.',
  },
  {
    q: 'Kira vergisini ödemezse ne olur?',
    a: 'GİB; banka hesapları, tapu kayıtları ve DASK poliçeleri üzerinden kira gelirini takip eder. Beyan dışı gelir cezalı tarhiyata yol açar.',
  },
  {
    q: 'Konut kredisi faizi gider yazılabilir mi?',
    a: 'Evet, kiralanan gayrimenkul için kullanılan kredinin faizi gerçek gider yönteminde gider olarak indirilir.',
  },
];

export default function KiraGeliriVergisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Receipt size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Kira Geliri Vergisi Hesaplayıcı</h1>
              <p className="text-slate-400 text-sm mt-0.5">2024 Vergi Dilimleri · Götürü & Gerçek Gider</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Kira geliriniz üzerinden ödenecek gelir vergisini hesaplayın. Götürü gider veya gerçek gider
            yöntemi karşılaştırması, mesken istisnası ve net kira geliri.
          </p>

          {/* Key facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Mesken İstisnası', value: '₺33.000', sub: '2024 konut için' },
              { label: 'Götürü Gider', value: '%15', sub: 'belge gerekmez' },
              { label: 'Min. Vergi Oranı', value: '%15', sub: '₺110.000\'e kadar' },
              { label: 'Beyanname', value: 'Mart', sub: '1-31 Mart arası' },
            ].map(f => (
              <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-[10px] text-slate-400 mb-1">{f.label}</p>
                <p className="text-xl font-black text-white">{f.value}</p>
                <p className="text-[10px] text-slate-500">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Calculator */}
          <div className="lg:col-span-2 space-y-6">
            <KiraVergisiClient />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Tips */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-black text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 size={13} className="text-[#00C49F]" /> Vergi Azaltma Yolları
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Mesken istisnasını her yıl mutlaka uygulayın',
                  'Konut kredisi faizinizi gider olarak yazın',
                  'Aidat, bakım, onarım giderlerini belgeleyin',
                  'Amortisman (bina değerinin %2\'si) gider yazılabilir',
                  'Düşük gelirli yıllarda gerçek gider daha avantajlı olabilir',
                ].map(tip => (
                  <li key={tip} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deadline */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="text-xs font-black text-amber-900 mb-3">Önemli Tarihler</h3>
              <div className="space-y-2 text-xs text-amber-800">
                <div className="flex justify-between">
                  <span>Beyanname son günü</span>
                  <span className="font-bold">31 Mart</span>
                </div>
                <div className="flex justify-between">
                  <span>1. taksit ödemesi</span>
                  <span className="font-bold">Mart</span>
                </div>
                <div className="flex justify-between">
                  <span>2. taksit ödemesi</span>
                  <span className="font-bold">Temmuz</span>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-1.5">
                <Info size={10} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-600">Geç ödeme faiz ve ceza doğurur.</p>
              </div>
            </div>

            {/* Related */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-black text-gray-900 mb-3">İlgili Araçlar</h3>
              <div className="space-y-2">
                {[
                  { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesapla' },
                  { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
                  { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesapla' },
                  { href: '/gayrimenkul-sozlugu', label: 'Gayrimenkul Sözlüğü' },
                ].map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between text-xs text-gray-600 hover:text-[#00C49F] py-1.5 border-b border-gray-50 last:border-0 group transition-colors"
                  >
                    {l.label}
                    <ArrowRight size={11} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-4">
          <h2 className="text-sm font-black text-gray-900">Sıkça Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map(f => (
              <div key={f.q} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-black text-gray-900 mb-2">{f.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
