import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-gray-100 mb-4 tracking-tighter">404</div>
        <div className="w-16 h-16 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] mx-auto mb-6">
          <Home size={28} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sayfa Bulunamadı</h1>
        <p className="text-gray-500 text-sm mb-8">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanım dışı olabilir.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Home size={14} /> Ana Sayfa
          </Link>
          <Link
            href="/listings"
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Search size={14} /> İlanlar
          </Link>
        </div>
      </div>
    </main>
  );
}
