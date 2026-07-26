'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';

interface Props {
  caseId: string;
  currentStatus: string;
}

export default function ResolveCaseButton({ caseId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isResolved = currentStatus === 'RESOLVED';

  const toggle = async () => {
    setLoading(true);
    await fetch(`/api/concierge/${caseId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: isResolved ? 'OPEN' : 'RESOLVED' }),
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${
        isResolved
          ? 'bg-gray-100 text-gray-500 hover:bg-amber-50 hover:text-amber-600'
          : 'bg-[#F0FDF8] text-[#00C49F] hover:bg-[#00C49F] hover:text-white'
      }`}
    >
      {isResolved ? <Clock size={12} /> : <CheckCircle size={12} />}
      {loading ? '...' : isResolved ? 'Aç' : 'Çöz'}
    </button>
  );
}
