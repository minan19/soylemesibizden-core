import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, HelpCircle, MessageSquare } from 'lucide-react';
import FaqClient from './FaqClient';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular (SSS) | Söylemesi Bizden',
  description: 'Söylemesi Bizden platformu hakkında sıkça sorulan sorular ve cevapları. İlan verme, satın alma, kiralama, güvenlik ve araçlar hakkında bilgi edinin.',
};

export default function SSSPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Ana Sayfa
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <HelpCircle size={24} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sıkça Sorulan Sorular</h1>
              <p className="text-sm text-gray-500 mt-0.5">Merak ettiğiniz her şey burada</p>
            </div>
          </div>
        </div>

        <FaqClient />

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[#00C49F] to-[#00a882] rounded-2xl p-8 text-center text-white">
          <MessageSquare size={32} className="mx-auto mb-3 text-white/80" />
          <h2 className="text-xl font-bold mb-2">Cevap bulamadınız mı?</h2>
          <p className="text-white/80 text-sm mb-5">
            Ekibimiz sorularınızı yanıtlamak için hazır. Bize ulaşın.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#00C49F] text-sm font-bold rounded-xl hover:bg-[#F0FDF8] transition-colors"
          >
            İletişime Geçin
          </Link>
        </div>
      </div>
    </main>
  );
}
