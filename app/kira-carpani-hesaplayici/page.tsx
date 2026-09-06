import { Metadata } from 'next';
import KiraCarpaniClient from './KiraCarpaniClient';

export const metadata: Metadata = {
  title: 'Kira Çarpanı Hesaplayıcı | Fiyat/Kira Oranı | Söylemesi Bizden',
  description:
    'Kira çarpanı hesaplayıcı: konut fiyatının yıllık kiraya oranıyla piyasanın pahalı mı yoksa ucuz mu olduğunu ölçün, şehir karşılaştırması yapın.',
};

export default function KiraCarpaniPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Çarpanı Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Konut fiyatı / yıllık kira oranı olan kira çarpanı ile piyasanın aşırı değerlenip değerlenmediğini ve yatırım cazibesini ölçün.
          </p>
        </div>
      </section>
      <KiraCarpaniClient />
    </main>
  );
}
