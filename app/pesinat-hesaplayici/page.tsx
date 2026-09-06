import { Metadata } from 'next';
import PesinatClient from './PesinatClient';

export const metadata: Metadata = {
  title: 'Peşinat Hesaplayıcı | Ne Kadar Sürede Birikir? | Söylemesi Bizden',
  description:
    'Ev için peşinat hesaplayıcı: mevcut birikim, aylık tasarruf ve yatırım getirisiyle hedefe ne kadar sürede ulaşacağınızı hesaplayın.',
};

export default function PesinatHesaplayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Finansal Planlama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Peşinat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ev peşinatı için ne kadar birikmeniz gerektiğini ve hedefe ne sürede ulaşacağınızı hesaplayın.
          </p>
        </div>
      </section>
      <PesinatClient />
    </main>
  );
}
