import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import KiraVsSatinClient from './KiraVsSatinClient';

export const metadata: Metadata = {
  title: 'Kira mı Satın Alma mı? Detaylı Karşılaştırma | Söylemesi Bizden',
  description:
    'Ev kiralamak mı yoksa satın almak mı daha avantajlı? Fırsat maliyeti, kira artışı, değer artışı ve 30 yıllık projeksiyon ile hesaplayın.',
};

export default function KiraMiSatinMiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Scale size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Kira mı, Satın Alma mı?</h1>
              <p className="text-slate-400 text-sm mt-0.5">Detaylı finansal karşılaştırma · 30 yıla kadar projeksiyon</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Türkiye gayrimenkul piyasasına özel: fırsat maliyeti, kira artışı, değer artışı ve mortgage
            analiziyle kira mı satın alma mı sorusuna sayısal yanıt.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['30 yıl projeksiyon', 'Fırsat maliyeti', 'Değer artışı', 'Kira artışı', 'Net servet hesabı'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs bg-white/10 border border-white/10 text-white/80 px-3 py-1.5 rounded-full">
                <CheckCircle2 size={10} className="text-[#00C49F]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <KiraVsSatinClient />

        {/* Related */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi', desc: 'Kira getirisi + değer artışı' },
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit detayı' },
            { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesapla', desc: 'TÜFE bazlı kira artışı' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
