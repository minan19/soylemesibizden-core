'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, TrendingDown, TrendingUp, Minus, Trash2, ExternalLink, ArrowLeft } from 'lucide-react';

const STORAGE_KEY = 'sbd_price_tracker';

interface TrackedItem {
  price: number;
  trackedAt: string;
}

interface ListingInfo {
  id: string;
  title: string;
  currentPrice: number;
  city: string | null;
  photos: string[];
}

interface TrackedEntry {
  listingId: string;
  storedPrice: number;
  trackedAt: string;
  listing: ListingInfo | null;
  loading: boolean;
  error: boolean;
}

export default function TrackedPricesClient() {
  const [entries, setEntries] = useState<TrackedEntry[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const tracker: Record<string, TrackedItem> = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
    })();

    const ids = Object.keys(tracker);
    if (ids.length === 0) { setInitialized(true); return; }

    const initial = ids.map(id => ({
      listingId: id,
      storedPrice: tracker[id].price,
      trackedAt: tracker[id].trackedAt,
      listing: null,
      loading: true,
      error: false,
    }));
    setEntries(initial);
    setInitialized(true);

    // Fetch listing info for each tracked id
    ids.forEach(async (id) => {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        setEntries(prev => prev.map(e =>
          e.listingId === id
            ? { ...e, loading: false, listing: { id: data.id, title: data.title, currentPrice: data.price, city: data.city, photos: data.photos ?? [] } }
            : e
        ));
      } catch {
        setEntries(prev => prev.map(e =>
          e.listingId === id ? { ...e, loading: false, error: true } : e
        ));
      }
    });
  }, []);

  const removeTracking = (listingId: string) => {
    const tracker: Record<string, TrackedItem> = (() => {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); } catch { return {}; }
    })();
    delete tracker[listingId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracker));
    setEntries(prev => prev.filter(e => e.listingId !== listingId));
  };

  const clearAll = () => {
    localStorage.setItem(STORAGE_KEY, '{}');
    setEntries([]);
  };

  if (!initialized) return null;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
          <ArrowLeft size={14} /> Ana Sayfa
        </Link>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Bell size={22} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fiyat Takibim</h1>
              <p className="text-sm text-gray-500 mt-0.5">{entries.length} ilan takip ediliyor</p>
            </div>
          </div>
          {entries.length > 0 && (
            <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
              <Trash2 size={12} /> Tümünü Temizle
            </button>
          )}
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <Bell size={32} className="text-gray-200 mx-auto mb-3" />
          <p className="font-semibold text-gray-400">Takip ettiğiniz fiyat yok</p>
          <p className="text-sm text-gray-300 mt-1">İlan sayfasında &quot;Fiyat Değişimini Takip Et&quot; butonuna tıklayın</p>
          <Link href="/listings" className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
            İlanları Keşfet
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map(entry => {
            const currentPrice = entry.listing?.currentPrice ?? entry.storedPrice;
            const diff = currentPrice - entry.storedPrice;
            const pct = entry.storedPrice > 0 ? ((diff / entry.storedPrice) * 100).toFixed(1) : '0';

            return (
              <div key={entry.listingId} className={`bg-white rounded-2xl border p-5 flex items-center gap-4 ${
                diff < -100 ? 'border-[#00C49F]/20' : diff > 100 ? 'border-red-100' : 'border-gray-100'
              }`}>
                {/* Photo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {entry.listing?.photos[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={entry.listing.photos[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">—</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {entry.loading ? (
                    <div className="space-y-1.5">
                      <div className="h-3.5 bg-gray-100 rounded animate-pulse w-48" />
                      <div className="h-3 bg-gray-100 rounded animate-pulse w-24" />
                    </div>
                  ) : entry.error ? (
                    <p className="text-sm text-gray-400 italic">İlan bulunamadı (silinmiş olabilir)</p>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <Link href={`/listing/${entry.listingId}`} className="text-sm font-semibold text-gray-900 hover:text-[#00C49F] transition-colors truncate">
                          {entry.listing?.title}
                        </Link>
                        <Link href={`/listing/${entry.listingId}`} className="shrink-0">
                          <ExternalLink size={11} className="text-gray-300 hover:text-[#00C49F] transition-colors" />
                        </Link>
                      </div>
                      {entry.listing?.city && <p className="text-xs text-gray-400">{entry.listing.city}</p>}
                    </>
                  )}
                </div>

                {/* Price change */}
                <div className="text-right shrink-0">
                  <p className="text-base font-bold font-mono text-gray-900">
                    ₺{currentPrice.toLocaleString('tr-TR')}
                  </p>
                  {diff !== 0 ? (
                    <p className={`text-xs font-bold flex items-center justify-end gap-0.5 ${diff < 0 ? 'text-[#00C49F]' : 'text-red-500'}`}>
                      {diff < 0 ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                      {diff > 0 ? '+' : ''}{diff.toLocaleString('tr-TR')} ({diff > 0 ? '+' : ''}{pct}%)
                    </p>
                  ) : (
                    <p className="text-xs text-gray-300 flex items-center justify-end gap-1">
                      <Minus size={11} /> Değişmedi
                    </p>
                  )}
                  <p className="text-[10px] text-gray-300 mt-0.5">
                    {new Date(entry.trackedAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeTracking(entry.listingId)}
                  className="text-gray-300 hover:text-red-400 transition-colors p-1 shrink-0"
                  title="Takibi kaldır"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
