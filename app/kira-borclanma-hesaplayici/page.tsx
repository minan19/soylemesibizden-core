import { Metadata } from 'next';
import KiraBorclanmaClient from './KiraBorclanmaClient';

export const metadata: Metadata = {
  title: 'Kira Borclanma Hesaplayıcı | Gecikme Faizi | Söylemesi Bizden',
  description:
    'Ödenmemiş kira borcunun gecikme faizi, icra ve hukuki masraflarını hesaplayın. Temerrüt faizi ve toplam borç analizi.',
};

export default function KiraBorclanmaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Hesaplama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Borçlanma Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ödenmemiş kira borcunun gecikme faizi ve toplam maliyet hesaplama aracı.
          </p>
        </div>
      </section>
      <KiraBorclanmaClient />
    </main>
  );
}
