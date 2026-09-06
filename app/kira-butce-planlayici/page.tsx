import { Metadata } from 'next';
import KiraButcePlanlayiciClient from './KiraButcePlanlayiciClient';

export const metadata: Metadata = {
  title: 'Kira Bütçe Planlayıcı | Gelirinize Göre Kira Limiti | Söylemesi Bizden',
  description:
    'Kira bütçe planlayıcısı: aylık gelirinize, bölgenize ve oda sayısına göre önerilen kira limiti, gider dağılımı ve piyasa kira tahmini.',
};

export default function KiraButcePlanlayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Bütçe Planlama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Bütçe Planlayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gelirinize ve diğer giderlerinize göre karşılayabileceğiniz maksimum kira limitini ve piyasa uyumunu analiz edin.
          </p>
        </div>
      </section>
      <KiraButcePlanlayiciClient />
    </main>
  );
}
