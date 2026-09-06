import { Metadata } from 'next';
import KiraGelirGiderClient from './KiraGelirGiderClient';

export const metadata: Metadata = {
  title: 'Kira Gelir-Gider Analizi 2025 | Net Getiri Hesaplayıcı | Söylemesi Bizden',
  description:
    'Kira gelirinizin net getirisini hesaplayın: vergi, sigorta, aidat, bakım giderleri düşüldükten sonra gerçek kira getirisi.',
};

export default function KiraGelirGiderPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Aracı 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Gelir-Gider Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Brüt kira gelirinizden vergi, sigorta, aidat ve bakım giderlerini düşerek gerçek net getirinizi hesaplayın.
          </p>
        </div>
      </section>
      <KiraGelirGiderClient />
    </main>
  );
}
