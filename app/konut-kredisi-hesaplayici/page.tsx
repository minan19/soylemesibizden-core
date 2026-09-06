import { Metadata } from 'next';
import KonutKredisiClient from './KonutKredisiClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Hesaplayıcı | Taksit ve Banka Karşılaştırma | Söylemesi Bizden',
  description:
    'Konut kredisi hesaplayıcı: aylık taksit, toplam faiz, banka karşılaştırması ve ilk 12 ay ödeme planı. 7 Türk bankasının güncel oranları.',
};

export default function KonutKredisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Kredisi Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Aylık taksit hesapla, 7 banka oranını karşılaştır, 12 aylık ödeme planını gör.
          </p>
        </div>
      </section>
      <KonutKredisiClient />
    </main>
  );
}
