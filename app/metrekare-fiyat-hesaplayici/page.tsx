import { Metadata } from 'next';
import MetrekareFiyatClient from './MetrekareFiyatClient';

export const metadata: Metadata = {
  title: '₺/m² Fiyat Hesaplayıcı | Konut Metrekare Fiyatı | Söylemesi Bizden',
  description:
    'Konutunuzun ₺/m² değerini hesaplayın, şehir ortalamalarıyla karşılaştırın. İstanbul, Ankara, İzmir, Bodrum bölgelerine göre piyasa analizi.',
};

export default function MetrekareFiyatPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Aracı</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">₺/m² Fiyat Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Konutunuzun metrekare başına fiyatını hesaplayın ve Türkiye&apos;nin önde gelen bölgeleriyle karşılaştırın.
          </p>
        </div>
      </section>
      <MetrekareFiyatClient />
    </main>
  );
}
