import { Metadata } from 'next';
import YatirimGetiriClient from './YatirimGetiriClient';

export const metadata: Metadata = {
  title: 'Yatırım Getiri Karşılaştırıcı | Gayrimenkul vs Altın vs Borsa | Söylemesi Bizden',
  description:
    'Gayrimenkul, altın, dolar, BIST ve mevduat yatırımlarını uzun vadede karşılaştırın; nominal ve reel getiri analizi yapın.',
};

export default function YatirimGetiriKarsilastiriciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Yatırım Getiri Karşılaştırıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gayrimenkul, altın, dolar, BIST 100, mevduat ve eurobond yatırımlarını uzun vadede nominal ve reel getiri bazında karşılaştırın.
          </p>
        </div>
      </section>
      <YatirimGetiriClient />
    </main>
  );
}
