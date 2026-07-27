'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Clock, Building2, X } from 'lucide-react';

const STORAGE_KEY = 'sbd_recent_views';
const MAX_ITEMS = 8;

export interface RecentItem {
  id: string;
  title: string;
  price: number;
  city?: string | null;
  listingType?: string | null;
  photo?: string | null;
}

export function recordView(item: RecentItem) {
  try {
    const stored: RecentItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    const filtered = stored.filter(r => r.id !== item.id);
    const next = [item, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch { /* noop */ }
}

export default function RecentlyViewed() {
  const [items, setItems] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored: RecentItem[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      setItems(stored);
    } catch { /* noop */ }
  }, []);

  const remove = (id: string) => {
    setItems(prev => {
      const next = prev.filter(r => r.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  if (!mounted || items.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-900">Son Görüntülenen İlanlar</h2>
        </div>
        <button
          onClick={() => {
            setItems([]);
            localStorage.removeItem(STORAGE_KEY);
          }}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          Temizle
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
        {items.map(item => (
          <div
            key={item.id}
            className="relative flex-shrink-0 w-48 bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
          >
            <button
              onClick={() => remove(item.id)}
              className="absolute top-1.5 right-1.5 z-10 w-5 h-5 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={10} />
            </button>
            <Link href={`/listing/${item.id}`} className="block">
              <div className="w-full h-28 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                {item.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.photo} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-slate-300" />
                  </div>
                )}
              </div>
              <div className="p-2.5">
                <p className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug mb-1">{item.title}</p>
                {item.city && <p className="text-[10px] text-gray-400 mb-1">{item.city}</p>}
                <p className="text-[#00C49F] font-bold text-sm">{item.price.toLocaleString('tr-TR')} ₺</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
