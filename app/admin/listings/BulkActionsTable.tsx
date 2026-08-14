'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckSquare, Square, CheckCheck, Trash2, ShieldCheck, ToggleLeft } from 'lucide-react';
import DeleteListingButton from '@/components/DeleteListingButton';
import ChangeStatusButton from '@/components/ChangeStatusButton';
import ApproveListingButton from '@/components/ApproveListingButton';

interface Listing {
  id: string;
  title: string;
  price: number;
  status: string;
  createdAt: Date;
  propertyType: string;
  listingType: string;
  city: string | null;
  owner: { name: string | null; email: string } | null;
}

interface Props {
  listings: Listing[];
}

const STATUS_BADGE: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  PENDING: 'bg-amber-100 text-amber-700',
  SOLD: 'bg-gray-100 text-gray-600',
};
const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Aktif',
  PENDING: 'Beklemede',
  SOLD: 'Satıldı',
};

export default function BulkActionsTable({ listings }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const allSelected = listings.length > 0 && selected.size === listings.length;

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(listings.map(l => l.id)));
    }
  }

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function bulkAction(action: string) {
    const ids = Array.from(selected);
    if (!ids.length) return;
    const label = action === 'delete' ? `${ids.length} ilanı silmek istediğinize emin misiniz?` : null;
    if (label && !window.confirm(label)) return;

    startTransition(async () => {
      await fetch('/api/admin/listings-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, action }),
      });
      setSelected(new Set());
      router.refresh();
    });
  }

  return (
    <div>
      {/* Bulk toolbar */}
      {selected.size > 0 && (
        <div className="mb-3 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5">
          <span className="text-sm font-semibold text-blue-700">{selected.size} ilan seçildi</span>
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <button
              onClick={() => bulkAction('approve')}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <ShieldCheck size={12} /> Yayınla
            </button>
            <button
              onClick={() => bulkAction('setPending')}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 transition-colors"
            >
              <ToggleLeft size={12} /> Beklet
            </button>
            <button
              onClick={() => bulkAction('delete')}
              disabled={isPending}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
            >
              <Trash2 size={12} /> Sil
            </button>
            <button
              onClick={() => setSelected(new Set())}
              className="text-xs text-gray-500 hover:text-gray-800 font-semibold ml-1"
            >
              Seçimi Kaldır
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3.5 w-10">
                  <button
                    onClick={toggleAll}
                    className="text-gray-400 hover:text-[#00C49F] transition-colors"
                    title={allSelected ? 'Tümünü kaldır' : 'Tümünü seç'}
                  >
                    {allSelected ? <CheckCheck size={16} className="text-[#00C49F]" /> : <CheckSquare size={16} />}
                  </button>
                </th>
                {['Başlık', 'Sahip', 'Fiyat', 'Tip', 'Durum', 'Tarih', 'Düzenle', 'İşlem'].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {listings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-sm text-gray-400">
                    İlan bulunamadı.
                  </td>
                </tr>
              ) : (
                listings.map((listing) => (
                  <tr
                    key={listing.id}
                    className={`hover:bg-gray-50 transition-colors ${selected.has(listing.id) ? 'bg-blue-50/40' : listing.status === 'PENDING' ? 'bg-amber-50/30' : ''}`}
                  >
                    <td className="px-4 py-4">
                      <button onClick={() => toggle(listing.id)} className="text-gray-300 hover:text-[#00C49F] transition-colors">
                        {selected.has(listing.id)
                          ? <CheckSquare size={16} className="text-[#00C49F]" />
                          : <Square size={16} />
                        }
                      </button>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800 max-w-[200px] truncate">
                      <Link href={`/listing/${listing.id}`} className="hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </Link>
                      {listing.city && <span className="block text-xs text-gray-400 font-normal">{listing.city}</span>}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-gray-700 font-medium">{listing.owner?.name ?? '—'}</div>
                      <div className="text-xs text-gray-400">{listing.owner?.email}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
                      {listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-600 font-medium">{listing.listingType}</div>
                      <div className="text-xs text-gray-400">{listing.propertyType}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_BADGE[listing.status] ?? 'bg-gray-100 text-gray-500'}`}>
                        {STATUS_LABEL[listing.status] ?? listing.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <Link
                        href={`/admin/edit-listing/${listing.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-[#00C49F] transition-colors"
                      >
                        Düzenle
                      </Link>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {listing.status === 'PENDING' && <ApproveListingButton listingId={listing.id} currentStatus={listing.status} />}
                        <ChangeStatusButton listingId={listing.id} currentStatus={listing.status as 'ACTIVE' | 'PENDING' | 'SOLD'} />
                        <DeleteListingButton listingId={listing.id} listingTitle={listing.title} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
