import { Metadata } from 'next';
import KiraDegerArtisiClient from './KiraDegerArtisiClient';

export const metadata: Metadata = {
  title: 'Kira Değer Artışı Analizi | Enflasyona Karşı Kira Büyümesi | Söylemesi Bizden',
  description:
    'Kira değer artışı analizi: yıllık kira artışını enflasyonla karşılaştırın, reel kira değeri kaybı veya kazancını yıl yıl görün.',
};

export default function KiraDegerArtisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kira Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Değer Artışı Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira artışınızın enflasyonu yakalayıp yakalamadığını görün; reel kira değeri kazancı veya kaybını yıl yıl takip edin.
          </p>
        </div>
      </section>
      <KiraDegerArtisiClient />
    </main>
  );
}
