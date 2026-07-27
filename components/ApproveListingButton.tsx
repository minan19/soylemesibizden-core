'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

interface Props {
  listingId: string;
  currentStatus: string;
}

export default function ApproveListingButton({ listingId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (currentStatus !== 'PENDING') return null;

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${listingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVE' }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('İlan onaylanamadı. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-600 text-xs font-semibold rounded-lg transition-all disabled:opacity-50 whitespace-nowrap"
      title="İlanı onayla ve yayınla"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
      Onayla
    </button>
  );
}
