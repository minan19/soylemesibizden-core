import { Metadata } from 'next';
import FaizKarsilastiriciClient from './FaizKarsilastiriciClient';

export const metadata: Metadata = {
  title: 'Faiz Oranı Karşılaştırıcı | Banka Banka Taksit Hesaplama | Söylemesi Bizden',
  description:
    'Farklı bankaların konut kredisi faiz oranlarını karşılaştırın. Aylık taksit, toplam faiz ve ödeme tutarları banka banka görün.',
};

export default function FaizOraniKarsilastiriciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kredi Karşılaştırma</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Faiz Oranı Karşılaştırıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            8 bankanın konut kredisi faizini karşılaştırın; aylık taksit ve toplam faiz yükünü görün.
          </p>
        </div>
      </section>
      <FaizKarsilastiriciClient />
    </main>
  );
}
