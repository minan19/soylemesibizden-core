import { Metadata } from 'next';
import KiraSimulatoruClient from './KiraSimulatoruClient';

export const metadata: Metadata = {
  title: 'Kira Simülatörü | Yıllık Kira Geliri Projeksiyonu | Söylemesi Bizden',
  description:
    'Kira simülatörü: yıllık kira artışı ve enflasyona göre nominal ve reel kira geliri projeksiyonu. Doluluk oranı dahil detaylı analiz.',
};

export default function KiraSimulatoruPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kira Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Simülatörü</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira artışı ve enflasyona göre nominal ve reel gelir projeksiyonunuzu yıl yıl görün.
          </p>
        </div>
      </section>
      <KiraSimulatoruClient />
    </main>
  );
}
