'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle, Trash2, Loader2, Eye, Building2, MapPin, CheckSquare, Square,
} from 'lucide-react';

interface Owner {
  id: string;
  name: string | null;
  email: string;
}

interface PendingListing {
  id: string;
  title: string;
  price: number;
  photos: string[];
  city: string | null;
  district: string | null;
  propertyType: string;
  listingType: string;
  rooms: number | null;
  area: number | null;
  description: string | null;
  status: string;
  createdAt: Date;
  owner: Owner;
}

interface Props {
  listings: PendingListing[];
}

export default function PendingListingsClient({ listings }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [approving, setApproving] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<Set<string>>(new Set());
  const [bulkLoading, setBulkLoading] = useState<'approve' | 'delete' | null>(null);

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectAll = () => setSelected(new Set(listings.map(l => l.id)));
  const clearAll = () => setSelected(new Set());

  const approve = async (id: string) => {
    setApproving(prev => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVE' }),
      });
      if (!res.ok) alert('İlan onaylanamadı.');
      else router.refresh();
    } finally {
      setApproving(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
  };

  const deleteListing = async (id: string, title: string) => {
    if (!confirm(`"${title}" ilanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) return;
    setDeleting(prev => new Set(prev).add(id));
    try {
      const res = await fetch(`/api/listings/${id}`, { method: 'DELETE' });
      if (!res.ok) alert('İlan silinemedi.');
      else router.refresh();
    } finally {
      setDeleting(prev => { const n = new Set(prev); n.delete(id); return n; });
    }
  };

  const bulkApprove = async () => {
    if (selected.size === 0) return;
    setBulkLoading('approve');
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/listings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'ACTIVE' }),
          })
        )
      );
      setSelected(new Set());
      router.refresh();
    } finally {
      setBulkLoading(null);
    }
  };

  const bulkDelete = async () => {
    if (selected.size === 0) return;
    if (!confirm(`${selected.size} ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`)) return;
    setBulkLoading('delete');
    try {
      await Promise.all(
        Array.from(selected).map(id =>
          fetch(`/api/listings/${id}`, { method: 'DELETE' })
        )
      );
      setSelected(new Set());
      router.refresh();
    } finally {
      setBulkLoading(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Select all bar */}
      <div className="flex items-center gap-4 px-1">
        <button
          onClick={selected.size === listings.length ? clearAll : selectAll}
          className="flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          {selected.size === listings.length
            ? <CheckSquare size={15} className="text-[#00C49F]" />
            : <Square size={15} />}
          {selected.size === 0
            ? 'Tümünü Seç'
            : selected.size === listings.length
              ? 'Seçimi Kaldır'
              : `${selected.size} / ${listings.length} seçildi`}
        </button>
      </div>

      {/* Listing cards */}
      {listings.map((listing, idx) => {
        const age = Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / 1000 / 60 / 60);
        const ageLabel = age < 1 ? 'Az önce' : age < 24 ? `${age} saat önce` : `${Math.floor(age / 24)} gün önce`;
        const isUrgent = age >= 24;
        const isSelected = selected.has(listing.id);

        return (
          <div
            key={listing.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all
              ${isSelected ? 'border-[#00C49F] ring-1 ring-[#00C49F]/30' : isUrgent ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'}
            `}
          >
            <div className="flex flex-col sm:flex-row gap-4 p-5">
              {/* Checkbox */}
              <div className="flex-shrink-0 flex items-start pt-1">
                <button
                  onClick={() => toggle(listing.id)}
                  className="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: isSelected ? '#00C49F' : 'transparent',
                    borderColor: isSelected ? '#00C49F' : '#D1D5DB',
                  }}
                  aria-label="Seç"
                >
                  {isSelected && <CheckCircle size={12} className="text-white" />}
                </button>
              </div>

              {/* Photo */}
              <div className="w-full sm:w-36 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                {listing.photos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 size={24} className="text-slate-300" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        #{idx + 1} BEKLEMEDE
                      </span>
                      {isUrgent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                          ACİL ({ageLabel})
                        </span>
                      )}
                    </div>
                    <Link href={`/listing/${listing.id}`} target="_blank">
                      <h2 className="text-base font-bold text-gray-900 hover:text-[#00C49F] transition-colors line-clamp-1">
                        {listing.title}
                      </h2>
                    </Link>
                  </div>
                  <p className="text-lg font-bold text-[#00C49F] whitespace-nowrap">
                    {listing.price.toLocaleString('tr-TR')} ₺
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                  {(listing.city || listing.district) && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {[listing.district, listing.city].filter(Boolean).join(', ')}
                    </span>
                  )}
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{listing.propertyType}</span>
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{listing.listingType}</span>
                  {listing.rooms != null && <span>{listing.rooms} oda</span>}
                  {listing.area != null && <span>{listing.area} m²</span>}
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-400">
                    <Link href={`/user/${listing.owner.id}`} className="text-[#00C49F] hover:underline font-medium">
                      {listing.owner.name ?? listing.owner.email}
                    </Link>
                    {' · '}{ageLabel}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/listing/${listing.id}`}
                      target="_blank"
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Eye size={12} /> İncele
                    </Link>
                    <Link
                      href={`/admin/edit-listing/${listing.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => approve(listing.id)}
                      disabled={approving.has(listing.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      {approving.has(listing.id)
                        ? <Loader2 size={12} className="animate-spin" />
                        : <CheckCircle size={12} />}
                      Onayla
                    </button>
                    <button
                      onClick={() => deleteListing(listing.id, listing.title)}
                      disabled={deleting.has(listing.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-500 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deleting.has(listing.id)
                        ? <Loader2 size={12} className="animate-spin" />
                        : <Trash2 size={12} />}
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Description preview */}
            {listing.description && (
              <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{listing.description}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Floating bulk action bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 whitespace-nowrap">
          <span className="text-sm font-semibold">{selected.size} ilan seçildi</span>
          <div className="w-px h-5 bg-gray-700" />
          <button
            onClick={bulkApprove}
            disabled={bulkLoading !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {bulkLoading === 'approve' ? <Loader2 size={13} className="animate-spin" /> : <CheckCircle size={13} />}
            Tümünü Onayla
          </button>
          <button
            onClick={bulkDelete}
            disabled={bulkLoading !== null}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-400 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {bulkLoading === 'delete' ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
            Tümünü Sil
          </button>
          <button onClick={clearAll} className="text-gray-400 hover:text-white text-xs">
            İptal
          </button>
        </div>
      )}
    </div>
  );
}
