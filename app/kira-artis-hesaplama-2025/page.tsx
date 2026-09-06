import { Metadata } from 'next';
import KiraArtis2025Client from './KiraArtis2025Client';

export const metadata: Metadata = {
  title: '2025 Kira Artış Hesaplama | TÜFE Bazlı | Söylemesi Bizden',
  description:
    '2025 yılı kira artış oranı hesaplayıcı: TÜİK TÜFE verilerine göre maksimum artış oranı, yeni kira tutarı ve aylık hesaplama.',
};

export default function KiraArtis2025Page() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kira Artış</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">2025 Kira Artış Hesaplama</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            2025 yılı için TÜİK TÜFE verilerine dayalı maksimum kira artış oranı ve yeni kira tutarını hesaplayın.
          </p>
        </div>
      </section>
      <KiraArtis2025Client />
    </main>
  );
}
