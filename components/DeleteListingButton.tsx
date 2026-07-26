'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

interface Props {
  listingId: string;
  listingTitle: string;
}

export default function DeleteListingButton({ listingId, listingTitle }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`"${listingTitle}" ilanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/listings/${listingId}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('İlan silinemedi. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 text-xs font-semibold rounded-lg transition-all disabled:opacity-50"
      title="İlanı sil"
    >
      {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      Sil
    </button>
  );
}
