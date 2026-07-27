'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, CheckCircle, Clock, Loader2 } from 'lucide-react';

interface Props {
  dealId: string;
  currentStatus: string;
}

const TRANSITIONS: Record<string, { next: string; label: string; cls: string }[]> = {
  OPEN: [
    { next: 'IN_PROGRESS', label: 'Müzakereye Başla', cls: 'bg-blue-600 hover:bg-blue-700 text-white' },
    { next: 'CLOSED', label: 'Odayı Kapat', cls: 'bg-gray-700 hover:bg-gray-800 text-white' },
  ],
  IN_PROGRESS: [
    { next: 'CLOSED', label: 'Anlaşmayı Tamamla', cls: 'bg-[#00C49F] hover:bg-[#00a882] text-white' },
    { next: 'OPEN', label: 'Geri Al', cls: 'bg-gray-100 hover:bg-gray-200 text-gray-700' },
  ],
  CLOSED: [],
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  OPEN: <Clock size={13} />,
  IN_PROGRESS: <Activity size={13} />,
  CLOSED: <CheckCircle size={13} />,
};

export default function DealStatusButton({ dealId, currentStatus }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const transitions = TRANSITIONS[currentStatus] ?? [];

  if (transitions.length === 0) return null;

  const changeStatus = async (next: string) => {
    setLoading(next);
    try {
      await fetch(`/api/deals/${dealId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      router.refresh();
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-2">
      {transitions.map(t => (
        <button
          key={t.next}
          onClick={() => changeStatus(t.next)}
          disabled={loading !== null}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors disabled:opacity-60 ${t.cls}`}
        >
          {loading === t.next ? <Loader2 size={13} className="animate-spin" /> : STATUS_ICONS[t.next]}
          {t.label}
        </button>
      ))}
    </div>
  );
}
