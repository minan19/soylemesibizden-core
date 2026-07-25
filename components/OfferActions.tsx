'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface Props {
  offerId: string;
  currentStatus: string;
  onUpdate?: (newStatus: string) => void;
}

export default function OfferActions({ offerId, currentStatus, onUpdate }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState<string | null>(null);

  if (status !== 'PENDING') {
    return (
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
        status === 'ACCEPTED'
          ? 'bg-[#F0FDF8] text-[#00C49F]'
          : 'bg-red-50 text-red-500'
      }`}>
        {status === 'ACCEPTED' ? 'KABUL EDİLDİ' : 'REDDEDİLDİ'}
      </span>
    );
  }

  const act = async (newStatus: 'ACCEPTED' | 'REJECTED') => {
    setLoading(newStatus);
    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        onUpdate?.(newStatus);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => act('ACCEPTED')}
        disabled={!!loading}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] hover:bg-[#00C49F] text-[#00C49F] hover:text-white border border-[#00C49F]/30 text-xs font-bold rounded-lg transition-all disabled:opacity-50"
      >
        {loading === 'ACCEPTED' ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
        Kabul
      </button>
      <button
        onClick={() => act('REJECTED')}
        disabled={!!loading}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 text-xs font-bold rounded-lg transition-all disabled:opacity-50"
      >
        {loading === 'REJECTED' ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={12} />}
        Reddet
      </button>
    </div>
  );
}
