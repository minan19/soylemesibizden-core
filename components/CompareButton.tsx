'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart2, X } from 'lucide-react';

interface Props {
  listingId: string;
}

const STORAGE_KEY = 'sbd_compare_ids';

export function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      setIds(Array.isArray(stored) ? stored : []);
    } catch {
      setIds([]);
    }
  }, []);

  const toggle = (id: string) => {
    setIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length >= 4 ? prev : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clear = () => {
    setIds([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { ids, toggle, clear };
}

export default function CompareButton({ listingId }: Props) {
  const { ids, toggle } = useCompare();
  const isSelected = ids.includes(listingId);

  return (
    <button
      onClick={e => { e.preventDefault(); toggle(listingId); }}
      title={isSelected ? 'Karşılaştırmadan çıkar' : 'Karşılaştırmaya ekle (maks 4)'}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
        isSelected
          ? 'bg-[#F0FDF8] border-[#00C49F] text-[#00C49F]'
          : 'bg-white border-gray-200 text-gray-400 hover:border-[#00C49F]/50 hover:text-gray-600'
      }`}
    >
      <BarChart2 size={12} />
      {isSelected ? 'Karşılaştırılıyor' : 'Karşılaştır'}
    </button>
  );
}

export function CompareBar() {
  const { ids, clear } = useCompare();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || ids.length < 2) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 bg-gray-900 text-white rounded-2xl shadow-2xl">
        <BarChart2 size={16} className="text-[#00C49F]" />
        <span className="text-sm font-semibold">
          <span className="text-[#00C49F] font-bold">{ids.length}</span> ilan seçildi
        </span>
        <button
          onClick={() => router.push(`/compare?ids=${ids.join(',')}`)}
          className="px-4 py-1.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-xs font-bold rounded-xl transition-colors"
        >
          Karşılaştır
        </button>
        <button onClick={clear} className="text-gray-400 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
