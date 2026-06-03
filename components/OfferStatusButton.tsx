'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface OfferStatusButtonProps {
  offerId: string;
}

export default function OfferStatusButton({ offerId }: OfferStatusButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [result, setResult] = useState<'ACCEPTED' | 'REJECTED' | null>(null);

  const handle = async (newStatus: 'ACCEPTED' | 'REJECTED') => {
    setStatus('loading');
    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setResult(newStatus);
        setStatus('done');
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
  };

  if (status === 'done' && result) {
    return (
      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${result === 'ACCEPTED' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-red-50 text-red-500'}`}>
        {result === 'ACCEPTED' ? '✓ Kabul Edildi' : '✕ Reddedildi'}
      </span>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {status === 'loading' ? (
        <Loader2 size={16} className="animate-spin text-gray-400" />
      ) : (
        <>
          <button
            onClick={() => void handle('ACCEPTED')}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black rounded-full hover:bg-[#00C49F] hover:text-white transition-all"
          >
            <CheckCircle size={12} /> KABUL
          </button>
          <button
            onClick={() => void handle('REJECTED')}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-400 text-[10px] font-black rounded-full hover:bg-red-500 hover:text-white transition-all"
          >
            <XCircle size={12} /> RET
          </button>
        </>
      )}
    </div>
  );
}
