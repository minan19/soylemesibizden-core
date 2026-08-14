import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowRight, Info } from 'lucide-react';
import OdemePlaniClient from './OdemePlaniClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Ödeme Planı | Anapara + Faiz Tablosu | Söylemesi Bizden',
  description:
    'Konut kredinizin ay ay ödeme planını görün. Anapara ve faiz dağılımı, kalan borç, yıllık özet ve toplam maliyet hesabı.',
};

export default function OdemePlaniPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Calculator size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Ödeme Planı Simülatörü</h1>
              <p className="text-blue-200 text-sm mt-0.5">Anapara + Faiz · Aylık & Yıllık Tablo</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
            Konut kredinizin ay ay ödeme planını inceleyin. Her taksitteki anapara ve faiz dağılımını,
            yıllık ödemelerinizi ve kalan borcunuzu görün.
          </p>
          <div className="flex items-start gap-2 mt-5 bg-blue-700/30 border border-blue-600/30 rounded-xl px-4 py-3 w-fit">
            <Info size={13} className="text-blue-300 shrink-0 mt-0.5" />
            <p className="text-blue-200 text-xs">Hesaplamalar eşit taksitli anapara+faiz yöntemi (annüite) kullanır.</p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <OdemePlaniClient />

        {/* Related tools */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit ve vade seçimi' },
            { href: '/banka-kredileri', label: 'Banka Faizleri', desc: '8 banka karşılaştırması' },
            { href: '/tapu-masrafi', label: 'Tapu Masrafı', desc: 'Tüm alım maliyetleri' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
