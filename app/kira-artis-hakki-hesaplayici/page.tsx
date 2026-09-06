import { Metadata } from 'next';
import KiraArtisHakkiClient from './KiraArtisHakkiClient';

export const metadata: Metadata = {
  title: 'Kira Artış Hakkı Hesaplayıcı | TÜİK TÜFE & %25 Tavan | Söylemesi Bizden',
  description:
    'Kira artış hakkı hesaplayıcı: yasal TÜFE oranı ve %25 tavan kuralıyla yeni kiranızı hesaplayın, 7409 sayılı Kanun bilgisi.',
};

export default function KiraArtisHakkiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hesaplama Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Artış Hakkı Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            TÜİK TÜFE verisine göre yasal kira artış oranını ve %25 tavan uygulamasını hesaplayın.
          </p>
        </div>
      </section>
      <KiraArtisHakkiClient />
    </main>
  );
}
