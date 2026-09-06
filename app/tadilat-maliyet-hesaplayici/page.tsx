import { Metadata } from 'next';
import TadilatMaliyetClient from './TadilatMaliyetClient';

export const metadata: Metadata = {
  title: 'Tadilat Maliyet Hesaplayıcı | Ev Renovasyon Bütçesi | Söylemesi Bizden',
  description:
    'Ev tadilat maliyet hesaplayıcısı: boya, zemin, mutfak dolabı, banyo, elektrik, su tesisatı, pencere ve kapı için 2024 birim fiyatlarıyla bütçe tahmini yapın.',
};

export default function TadilatMaliyetPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Tadilat Maliyet Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tadilat işlemlerini seçin, miktarları girin; malzeme, işçilik ve KDV dahil toplam bütçenizi ve sürpriz tampon tutarını anında görün.
          </p>
        </div>
      </section>
      <TadilatMaliyetClient />
    </main>
  );
}
