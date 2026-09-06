import { Metadata } from 'next';
import InsaatMaliyetiClient from './InsaatMaliyetiClient';

export const metadata: Metadata = {
  title: 'İnşaat Maliyet Hesaplayıcı | m² Maliyeti, Yapı Sınıfı | Söylemesi Bizden',
  description:
    'İnşaat maliyeti hesaplayıcı: kat alanı, yapı sınıfı (ekonomik/lüks), eklentiler ve arsa dahil toplam maliyet tahmini. Min-max aralığı ile dağılım analizi.',
};

export default function InsaatMaliyetiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İnşaat Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İnşaat Maliyet Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kat alanı, yapı sınıfı ve eklentilere göre toplam inşaat maliyetinizi min-max aralığıyla hesaplayın.
          </p>
        </div>
      </section>
      <InsaatMaliyetiClient />
    </main>
  );
}
