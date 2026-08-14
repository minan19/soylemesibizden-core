import { Metadata } from 'next';
import Link from 'next/link';
import { PiggyBank, ArrowRight } from 'lucide-react';
import PesinatClient from './PesinatClient';

export const metadata: Metadata = {
  title: 'Peşinat Birikim Planlayıcısı | Ne Zaman Ev Alabilirim? | Söylemesi Bizden',
  description:
    'Ev almak için ne kadar birikim yapmanız gerektiğini hesaplayın. Aylık birikim, mevduat faizi ve ev fiyat artışıyla yıllık projeksiyon.',
};

export default function PesinatPlaniPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#00C49F] to-[#009e80] text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <PiggyBank size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Peşinat Birikim Planlayıcısı</h1>
              <p className="text-white/70 text-sm mt-0.5">Ne zaman ev alabilirim? · Aylık projeksiyon</p>
            </div>
          </div>
          <p className="text-white/80 text-sm max-w-xl leading-relaxed">
            Hedeflediğiniz ev için ne kadar birikim yapmanız gerekiyor? Mevcut birikimler, aylık tasarruf,
            mevduat faizi ve ev fiyat artışını hesaba katarak gerçekçi bir plan oluşturun.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <PesinatClient />

        {/* Related tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Peşinat sonrası mortgage hesabı' },
            { href: '/kira-mi-satin-mi', label: 'Kira mı, Satın mı?', desc: 'Uzun vadeli karşılaştırma' },
            { href: '/tapu-masrafi', label: 'Tapu Masrafı', desc: 'Satın alma toplam maliyeti' },
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
