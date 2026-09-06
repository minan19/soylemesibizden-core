import { Metadata } from 'next';
import KiraTespitClient from './KiraTespitClient';

export const metadata: Metadata = {
  title: 'Kira Tespit Davası Hesaplayıcı | Piyasa Kira Analizi | Söylemesi Bizden',
  description:
    'Kiranızın piyasa değerinden ne kadar saptığını hesaplayın. Kira tespit davası gereklilik analizi, TÜFE birikimi ve %25 tavan karşılaştırması.',
};

export default function KiraTespitPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Hesaplama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Tespit Davası Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Mevcut kiranızın piyasa değerinden sapma oranını hesaplayın, kira tespit davası gereklilik analizini görün.
          </p>
        </div>
      </section>
      <KiraTespitClient />
    </main>
  );
}
