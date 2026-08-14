import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, PieChart, TrendingUp, Home, ArrowRight } from 'lucide-react';
import PortfoyClient from './PortfoyClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul Portföy Takibi | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırım portföyünüzü takip edin. Toplam değer, kira getirisi, kazanç analizi ve şehir dağılımı.',
};

export default function PortfoyPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
              <PieChart size={26} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Portföy Takibi</h1>
              <p className="text-gray-500 mt-1 text-sm max-w-xl">
                Tüm gayrimenkul yatırımlarınızı tek ekranda yönetin. Toplam değer, kira getirisi ve sermaye kazancı.
                Veriler tarayıcınızda saklanır, hesap gerektirmez.
              </p>
            </div>
          </div>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: Home, label: 'Birden fazla mülk' },
            { icon: TrendingUp, label: 'Getiri analizi' },
            { icon: PieChart, label: 'Şehir dağılımı' },
            { icon: ArrowRight, label: 'Kazanç/kayıp' },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-100 rounded-full text-xs font-semibold text-gray-600">
              <f.icon size={12} className="text-[#00C49F]" />
              {f.label}
            </div>
          ))}
        </div>

        {/* Client component */}
        <PortfoyClient />

        {/* Related tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/yatirim-analizi', label: 'Yatırım Analizi', desc: 'ROI ve kira getirisi hesaplama' },
            { href: '/assets', label: 'Varlık Portföyüm', desc: 'Platform varlık kaydı' },
            { href: '/fiyat-trendi', label: 'Fiyat Trendi', desc: 'Aylık piyasa değişimleri' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all"
            >
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
