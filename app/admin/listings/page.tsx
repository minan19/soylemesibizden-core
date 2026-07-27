import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Plus, ArrowUpRight, Pencil, Clock } from 'lucide-react';
import DeleteListingButton from '@/components/DeleteListingButton';
import ChangeStatusButton from '@/components/ChangeStatusButton';
import ApproveListingButton from '@/components/ApproveListingButton';

export const dynamic = 'force-dynamic';

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const isPending = searchParams.filter === 'pending';

  const [listings, pendingCount] = await Promise.all([
    prisma.listing.findMany({
      where: isPending ? { status: 'PENDING' } : undefined,
      orderBy: { createdAt: 'desc' },
      include: { owner: { select: { name: true, email: true } } },
    }),
    prisma.listing.count({ where: { status: 'PENDING' } }),
  ]);

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-700',
      PENDING: 'bg-amber-100 text-amber-700',
      SOLD: 'bg-gray-100 text-gray-600',
    };
    const labelMap: Record<string, string> = {
      ACTIVE: 'Aktif',
      PENDING: 'Beklemede',
      SOLD: 'Satıldı',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
        {labelMap[status] ?? status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 font-medium transition-colors"
            >
              <ArrowLeft size={15} />
              Admin Panel
            </Link>
            <span className="text-gray-300">|</span>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">
              {isPending ? 'Bekleyen İlanlar' : 'Tüm İlanlar'}
              <span className="ml-2 text-base font-semibold text-gray-400">({listings.length} adet)</span>
            </h1>
          </div>
          <Link
            href="/admin/create-listing"
            className="inline-flex items-center gap-2 bg-[#00C49F] hover:bg-[#00b38e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
          >
            <Plus size={16} />
            + Yeni İlan
          </Link>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/admin/listings"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              !isPending
                ? 'bg-[#00C49F] text-white border-[#00C49F]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#00C49F] hover:text-[#00C49F]'
            }`}
          >
            Tümü
          </Link>
          <Link
            href="/admin/listings?filter=pending"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
              isPending
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-amber-400 hover:text-amber-600'
            }`}
          >
            <Clock size={14} />
            Bekleyenler
            {pendingCount > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                isPending ? 'bg-white text-amber-600' : 'bg-amber-100 text-amber-700'
              }`}>
                {pendingCount}
              </span>
            )}
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
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
                    <td colSpan={8} className="px-5 py-12 text-center text-sm text-gray-400">
                      {isPending ? 'Onay bekleyen ilan bulunmuyor.' : 'Henüz ilan bulunmuyor.'}
                    </td>
                  </tr>
                ) : (
                  listings.map((listing) => (
                    <tr key={listing.id} className={`hover:bg-gray-50 transition-colors ${listing.status === 'PENDING' ? 'bg-amber-50/30' : ''}`}>
                      <td className="px-5 py-4 font-semibold text-gray-800 max-w-[200px] truncate">
                        {listing.title}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="text-gray-700 font-medium">{listing.owner?.name ?? '—'}</div>
                        <div className="text-xs text-gray-400">{listing.owner?.email}</div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-gray-800 whitespace-nowrap">
                        {listing.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })}
                      </td>
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                        {listing.propertyType}
                      </td>
                      <td className="px-5 py-4">
                        <ChangeStatusButton listingId={listing.id} currentStatus={listing.status as 'ACTIVE' | 'PENDING' | 'SOLD'} />
                      </td>
                      <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                        {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/edit-listing/${listing.id}`}
                            className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 text-xs font-semibold transition-colors"
                          >
                            <Pencil size={12} /> Düzenle
                          </Link>
                          <Link
                            href={`/listing/${listing.id}`}
                            className="inline-flex items-center gap-1 text-[#00C49F] hover:text-[#00b38e] text-xs font-semibold transition-colors"
                          >
                            Detay <ArrowUpRight size={13} />
                          </Link>
                          <DeleteListingButton listingId={listing.id} listingTitle={listing.title} />
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <ApproveListingButton listingId={listing.id} currentStatus={listing.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
