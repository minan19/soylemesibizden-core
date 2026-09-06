import { Metadata } from 'next';
import TasinmaClient from './TasinmaClient';

export const metadata: Metadata = {
  title: 'Taşınma Maliyet Hesaplayıcı | Nakliye Fiyatı | Söylemesi Bizden',
  description:
    'Taşınma maliyet hesaplayıcı: eşya büyüklüğü, mesafe, kat ve ekstra hizmetlere göre nakliye bütçenizi tahmin edin.',
};

export default function TasinmaMaliyetPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Taşınma Maliyet Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Eşya büyüklüğüne, mesafeye ve ekstra hizmetlere göre taşınma maliyetinizi tahmin edin.
          </p>
        </div>
      </section>
      <TasinmaClient />
    </main>
  );
}
