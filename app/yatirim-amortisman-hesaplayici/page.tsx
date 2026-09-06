import { Metadata } from 'next';
import YatirimAmortismanClient from './YatirimAmortismanClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul Amortisman Hesaplayıcı | Kaç Yılda Geri Döner | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımınızın kaç yılda amortize olacağını hesaplayın. Net kira getirisi, değer artışı ve toplam yatırım getirisi analizi.',
};

export default function YatirimAmortismanPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Hesaplama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Amortisman Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yatırımınızın kaç yılda amortize olacağını, toplam kira gelirini ve sermaye kazancını hesaplayın.
          </p>
        </div>
      </section>
      <YatirimAmortismanClient />
    </main>
  );
}
