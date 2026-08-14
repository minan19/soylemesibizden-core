import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowRight } from 'lucide-react';
import KrediKarsilastirmaClient from './KrediKarsilastirmaClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Karşılaştırma | 4 Senaryoyu Yan Yana | Söylemesi Bizden',
  description:
    'Farklı faiz oranı, vade ve kredi tutarı senaryolarını yan yana karşılaştırın. Aylık taksit, toplam faiz ve toplam ödeme farkını görün.',
};

export default function KrediKarsilastirmaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Scale size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Kredi Karşılaştırma Aracı</h1>
              <p className="text-blue-200 text-sm mt-0.5">4 senaryo · Yan yana karşılaştırma</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
            Farklı faiz oranı, vade ve kredi tutarı kombinasyonlarını yan yana karşılaştırın.
            Hangi senaryo size en uygun? Aylık taksit ve toplam faiz farkını görün.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <KrediKarsilastirmaClient />

        {/* Related tools */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Detaylı taksit analizi' },
            { href: '/odeme-plani', label: 'Ödeme Planı', desc: 'Ay ay anapara + faiz' },
            { href: '/banka-kredileri', label: 'Banka Faizleri', desc: '8 banka karşılaştırması' },
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
