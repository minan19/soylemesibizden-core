'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'ACTIVE' | 'PENDING' | 'SOLD';

interface Props {
  listingId: string;
  currentStatus: Status;
}

const labels: Record<Status, string> = {
  ACTIVE: 'Aktif',
  PENDING: 'Beklemede',
  SOLD: 'Satıldı',
};

const options: Status[] = ['ACTIVE', 'PENDING', 'SOLD'];

export default function ChangeStatusButton({ listingId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    if (newStatus === currentStatus) return;
    setLoading(true);
    await fetch(`/api/listings/${listingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={loading}
      className="text-xs font-semibold border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 hover:border-[#00C49F] focus:outline-none focus:border-[#00C49F] transition-colors disabled:opacity-50 cursor-pointer"
    >
      {options.map(s => (
        <option key={s} value={s}>{labels[s]}</option>
      ))}
    </select>
  );
}
