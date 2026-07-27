'use client';

import { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface Props {
  title: string;
}

export default function ShareButton({ title }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={share}
      title="İlanı paylaş"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
        copied
          ? 'bg-[#F0FDF8] border-[#00C49F] text-[#00C49F]'
          : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'
      }`}
    >
      {copied ? <Check size={12} /> : <Share2 size={12} />}
      {copied ? 'Kopyalandı' : 'Paylaş'}
    </button>
  );
}
