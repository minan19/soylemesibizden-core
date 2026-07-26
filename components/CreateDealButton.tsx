'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Handshake } from 'lucide-react';

interface Props {
  listingId: string;
  sellerId: string;
}

export default function CreateDealButton({ listingId, sellerId }: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const router = useRouter();

  const user = session?.user as { id?: string } | undefined;
  if (!user?.id || user.id === sellerId) return null;

  const create = async () => {
    setLoading(true);
    const res = await fetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId, buyerId: user.id, sellerId }),
    });
    setLoading(false);
    if (res.ok) {
      setDone(true);
      const data = await res.json();
      router.push(`/boardroom/${data.id}`);
    }
  };

  if (done) return null;

  return (
    <button
      onClick={create}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
    >
      <Handshake size={16} />
      {loading ? 'Oluşturuluyor...' : 'Anlaşma Odası Aç'}
    </button>
  );
}
