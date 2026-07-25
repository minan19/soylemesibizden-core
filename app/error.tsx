'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-red-400 mx-auto mb-6">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bir Hata Oluştu</h1>
        <p className="text-gray-500 text-sm mb-8">
          Beklenmeyen bir hata meydana geldi. Sayfayı yenileyerek tekrar deneyebilirsiniz.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <RefreshCw size={14} /> Tekrar Dene
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Home size={14} /> Ana Sayfa
          </Link>
        </div>
      </div>
    </main>
  );
}
