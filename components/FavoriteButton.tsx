'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';

interface FavoriteButtonProps {
  listingId: string;
  initialFavorited: boolean;
}

export default function FavoriteButton({ listingId, initialFavorited }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId }),
      });
      if (res.ok) {
        const data: { favorited: boolean } = await res.json();
        setFavorited(data.favorited);
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-semibold text-sm ${
        favorited
          ? 'bg-[#F0FDF8] border-[#00C49F] text-[#00C49F]'
          : 'bg-white border-gray-200 text-gray-500 hover:border-[#00C49F] hover:text-[#00C49F]'
      } disabled:opacity-60`}
    >
      <Heart size={16} className={favorited ? 'fill-[#00C49F]' : ''} />
      {favorited ? 'Favoride' : 'Favoriye Ekle'}
    </button>
  );
}
