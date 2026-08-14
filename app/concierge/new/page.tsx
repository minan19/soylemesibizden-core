import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Headphones, ShieldCheck, Clock, Star } from 'lucide-react';
import NewCaseForm from '@/components/NewCaseForm';

export const metadata: Metadata = {
  title: 'Danışmanlık Talebi | Söylemesi Bizden',
  description: 'Gayrimenkul danışmanlığı için uzman ekibimize başvurun. Ücretsiz ilk danışma.',
};

const SERVICES = [
  {
    icon: ShieldCheck,
    title: 'Hukuki Danışmanlık',
    desc: 'Tapu işlemleri, sözleşme incelemesi ve hukuki süreç desteği.',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
  },
  {
    icon: Star,
    title: 'Değerleme Hizmeti',
    desc: 'Mülkünüzün gerçek piyasa değerini uzman gözüyle öğrenin.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Clock,
    title: 'Hızlı Satış Desteği',
    desc: 'Doğru fiyatlama ve pazarlama stratejisiyle hızlı satış.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Headphones,
    title: 'Genel Danışma',
    desc: 'Her türlü gayrimenkul sorunuzda uzman desteği alın.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
];

export default async function NewCasePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login?callbackUrl=/concierge/new');

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/concierge" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 mb-3 transition-colors">
            <ArrowLeft size={14} /> Danışmanlık
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Headphones size={22} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Yeni Danışmanlık Talebi</h1>
              <p className="text-sm text-gray-500 mt-0.5">Uzman ekibimiz 24 saat içinde geri dönecek</p>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SERVICES.map(s => (
            <div key={s.title} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                <s.icon size={16} className={s.color} />
              </div>
              <p className="text-xs font-bold text-gray-900 mb-1">{s.title}</p>
              <p className="text-[11px] text-gray-400 leading-snug">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Main form area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-5">Talebinizi Açıklayın</h2>
              <NewCaseForm />
            </div>
          </div>

          {/* Info sidebar */}
          <div className="space-y-4">
            <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-3">Nasıl Çalışır?</p>
              <ol className="space-y-3 text-xs text-gray-600">
                {[
                  'Talebinizi doldurup gönderin',
                  'Ekibimiz 24 saat içinde inceler',
                  'Uzman danışman ataması yapılır',
                  'Süreç takibini platformdan yapın',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Çalışma Saatleri</p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Pazartesi–Cuma</span>
                  <span className="font-semibold">09:00–18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi</span>
                  <span className="font-semibold">10:00–16:00</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Pazar</span>
                  <span>Kapalı</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400">
                  Acil durumlar için:{' '}
                  <a href="tel:+902121234567" className="text-[#00C49F] font-semibold hover:underline">
                    +90 212 123 45 67
                  </a>
                </p>
              </div>
            </div>

            <Link
              href="/concierge"
              className="block text-center text-xs font-semibold text-gray-400 hover:text-[#00C49F] transition-colors py-2"
            >
              Önceki taleplerime dön →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
