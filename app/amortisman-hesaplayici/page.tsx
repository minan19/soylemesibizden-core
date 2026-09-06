import { Metadata } from 'next';
import AmortismanClient from './AmortismanClient';

export const metadata: Metadata = {
  title: 'Amortisman Hesaplayıcı | Gayrimenkul Geri Dönüş Süresi | Söylemesi Bizden',
  description:
    'Gayrimenkul amortisman hesaplayıcısı: kira geliri ile mülk değerinin kaç yılda geri döneceğini, brüt/net kira getirisini ve 20 yıllık ROI proyeksiyonunu hesaplayın.',
};

export default function AmortismanPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Amortisman Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Mülkünüzün kira gelirleriyle kaç yılda geri döneceğini, brüt/net getiriyi ve 20 yıllık ROI projeksiyonunu hesaplayın.
          </p>
        </div>
      </section>
      <AmortismanClient />
    </main>
  );
}
