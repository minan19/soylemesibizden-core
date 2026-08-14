'use client';

import { useState } from 'react';
import { Code, Copy, Check, X } from 'lucide-react';

interface Props {
  listingId: string;
}

export default function EmbedCodeButton({ listingId }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://soylemesibizden-core.vercel.app';
  const embedUrl = `${baseUrl}/listing/${listingId}/embed`;
  const code = `<iframe src="${embedUrl}" width="300" height="360" frameborder="0" style="border-radius:12px;border:1px solid #e5e7eb;" title="Söylemesi Bizden İlan"></iframe>`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
        title="Embed kodu al"
      >
        <Code size={12} /> Embed
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Code size={16} className="text-[#00C49F]" /> İlan Embed Kodu
              </h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Aşağıdaki kodu web sitenize veya blogunuza yapıştırın. İlan kartı otomatik olarak güncel bilgilerle görünür.
            </p>

            <div className="relative">
              <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap break-all">
                {code}
              </pre>
              <button
                onClick={copy}
                className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  copied ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'
                }`}
              >
                {copied ? <><Check size={11} /> Kopyalandı</> : <><Copy size={11} /> Kopyala</>}
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-medium">Önizleme URL:</p>
              <a
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline break-all"
              >
                {embedUrl}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
