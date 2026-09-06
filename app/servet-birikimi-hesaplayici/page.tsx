import { Metadata } from 'next';
import ServetBirikimClient from './ServetBirikimClient';

export const metadata: Metadata = {
  title: 'Servet Birikimi Hesaplayıcı | Bileşik Faiz Projeksiyon | Söylemesi Bizden',
  description:
    'Servet birikimi simülatörü: başlangıç birikimi, aylık katkı ve yıllık getiri oranına göre bileşik faiz ile nominal ve reel servet projeksiyonu.',
};

export default function ServetBirikimPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Servet Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Servet Birikimi Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Bileşik faiz gücüyle birikimlerinizin yıl yıl nasıl büyüyeceğini, reel değer ve getiri kazancını görün.
          </p>
        </div>
      </section>
      <ServetBirikimClient />
    </main>
  );
}
