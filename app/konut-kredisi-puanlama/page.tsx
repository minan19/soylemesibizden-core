import { Metadata } from 'next';
import KonutKredisiPuanlamaClient from './KonutKredisiPuanlamaClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Uygunluk Puanlama | Başvuru Öncesi Test | Söylemesi Bizden',
  description:
    'Konut kredisi başvurusundan önce uygunluk puanınızı hesaplayın: gelir, kredi notu, borç oranı, peşinat ve istihdam kriterleri.',
};

export default function KonutKredisiPuanlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kredi Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Kredisi Uygunluk Puanlama</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Bankaların değerlendirdiği kriterlere göre kredi uygunluk puanınızı hesaplayın ve başvuru öncesi hazırlıklı olun.
          </p>
        </div>
      </section>
      <KonutKredisiPuanlamaClient />
    </main>
  );
}
