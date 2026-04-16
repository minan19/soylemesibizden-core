'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Sovereign Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-red-50 rounded-full flex items-center justify-center">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Bir hata oluştu</h2>
          <p className="text-sm text-gray-500">{error.message || 'Beklenmeyen bir sorun yaşandı.'}</p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#00C49F] text-white text-sm font-semibold rounded-full hover:bg-[#00a882] transition-colors"
        >
          <RefreshCw size={16} /> Tekrar Dene
        </button>
      </div>
    </div>
  );
}
