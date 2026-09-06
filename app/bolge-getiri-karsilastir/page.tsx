import { Metadata } from 'next';
import BolgeGetiriClient from './BolgeGetiriClient';

export const metadata: Metadata = {
  title: 'Bölge Getiri Karşılaştırması | Şehir ve İlçe ROI Analizi | Söylemesi Bizden',
  description:
    'Farklı şehir ve ilçelerdeki gayrimenkul yatırım getirilerini karşılaştırın. Brüt/net kira getirisi ve 5 yıllık ROI analizi ile en karlı bölgeyi bulun.',
};

export default function BolgeGetiriKarsilastirPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Bölge Getiri Karşılaştırması</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Farklı bölgeleri seçerek kira getirisi ve 5 yıllık toplam ROI karşılaştırması yapın.
          </p>
        </div>
      </section>
      <BolgeGetiriClient />
    </main>
  );
}
