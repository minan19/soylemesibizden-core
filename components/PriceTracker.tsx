'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, TrendingDown, TrendingUp, Minus } from 'lucide-react';

const STORAGE_KEY = 'sbd_price_tracker';

interface TrackedItem {
  price: number;
  trackedAt: string;
}

interface Props {
  listingId: string;
  currentPrice: number;
}

function getTracker(): Record<string, TrackedItem> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export default function PriceTracker({ listingId, currentPrice }: Props) {
  const [tracked, setTracked] = useState<TrackedItem | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const tracker = getTracker();
    const item = tracker[listingId];
    if (item) {
      setTracked(item);
      // Update stored price if changed
      if (item.price !== currentPrice) {
        tracker[listingId] = { price: currentPrice, trackedAt: item.trackedAt };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
      }
    }
  }, [listingId, currentPrice]);

  const startTracking = () => {
    const tracker = getTracker();
    tracker[listingId] = { price: currentPrice, trackedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    setTracked(tracker[listingId]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const stopTracking = () => {
    const tracker = getTracker();
    delete tracker[listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    setTracked(null);
  };

  const priceDiff = tracked ? currentPrice - tracked.price : 0;
  const pricePct = tracked && tracked.price > 0 ? ((priceDiff / tracked.price) * 100).toFixed(1) : '0';
  const trackedDate = tracked ? new Date(tracked.trackedAt).toLocaleDateString('tr-TR') : '';

  if (tracked) {
    return (
      <div className={`rounded-2xl border p-4 flex items-center justify-between gap-3 ${
        priceDiff < -100 ? 'bg-[#F0FDF8] border-[#00C49F]/20' :
        priceDiff > 100 ? 'bg-red-50 border-red-100' :
        'bg-gray-50 border-gray-100'
      }`}>
        <div className="flex items-center gap-2.5 min-w-0">
          {priceDiff < -100 ? (
            <TrendingDown size={16} className="text-[#00C49F] shrink-0" />
          ) : priceDiff > 100 ? (
            <TrendingUp size={16} className="text-red-500 shrink-0" />
          ) : (
            <Minus size={16} className="text-gray-400 shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-xs font-bold text-gray-700">Fiyat Takibi Aktif</p>
            {priceDiff !== 0 ? (
              <p className={`text-[11px] font-semibold ${priceDiff < 0 ? 'text-[#00C49F]' : 'text-red-500'}`}>
                {priceDiff > 0 ? '+' : ''}{priceDiff.toLocaleString('tr-TR')} ₺ ({priceDiff > 0 ? '+' : ''}{pricePct}%)
              </p>
            ) : (
              <p className="text-[11px] text-gray-400">Fiyat değişmedi · {trackedDate}&apos;den beri</p>
            )}
          </div>
        </div>
        <button
          onClick={stopTracking}
          className="flex items-center gap-1 text-[10px] font-semibold text-gray-400 hover:text-red-500 transition-colors shrink-0"
          title="Takibi durdur"
        >
          <BellOff size={12} /> Durdur
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={startTracking}
      className={`w-full flex items-center justify-center gap-2 py-2.5 border rounded-2xl text-xs font-semibold transition-colors ${
        justAdded
          ? 'bg-[#F0FDF8] text-[#00C49F] border-[#00C49F]/30'
          : 'bg-white border-gray-200 text-gray-500 hover:border-[#00C49F]/50 hover:text-[#00C49F]'
      }`}
    >
      <Bell size={12} />
      {justAdded ? 'Fiyat takibe alındı ✓' : 'Fiyat Değişimini Takip Et'}
    </button>
  );
}
