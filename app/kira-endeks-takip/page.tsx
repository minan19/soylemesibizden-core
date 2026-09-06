import { Metadata } from 'next';
import KiraEndeksClient from './KiraEndeksClient';

export const metadata: Metadata = {
  title: 'Kira Endeksi Takip | TÜFE Kira Artış Hesaplayıcı | Söylemesi Bizden',
  description:
    'Kira endeksi takibi: aylık TÜFE verileriyle biriken kira artış oranı, %25 tavan karşılaştırması ve aylık kira seyir grafiği.',
};

export default function KiraEndeksTakipPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kira Takip Aracı</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Endeksi Takip</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Aylık TÜFE verilerine göre kiranızın ne kadar artması gerektiğini hesaplayın, %25 tavan etkisini görün.
          </p>
        </div>
      </section>
      <KiraEndeksClient />
    </main>
  );
}
