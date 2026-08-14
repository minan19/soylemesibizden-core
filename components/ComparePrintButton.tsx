'use client';

import { Printer } from 'lucide-react';

export default function ComparePrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 text-sm font-semibold rounded-xl transition-colors print:hidden"
      title="Yazdır / PDF olarak kaydet"
    >
      <Printer size={14} /> Yazdır / PDF
    </button>
  );
}
