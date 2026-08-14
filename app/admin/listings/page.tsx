import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Plus, ArrowUpRight, Clock, Search } from 'lucide-react';
import BulkActionsTable from './BulkActionsTable';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 20;

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: { filter?: string; page?: string; q?: string };
}) {
  const isPending = searchParams.filter === 'pending';
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1') || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;
  const q = searchParams.q?.trim();

  const where = {
    ...(isPending ? { status: 'PENDING' } : {}),
    ...(q ? {
      OR: [
        { title: { contains: q, mode: 'insensitive' as const } },
        { owner: { email: { contains: q, mode: 'insensitive' as const } } },
        { city: { contains: q, mode: 'insensitive' as const } },
      ],
    } : {}),
  };

  const [listings, totalCount, pendingCount] = await Promise.all([
    prisma.listing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: PAGE_SIZE,
      include: { owner: { select: { name: true, email: true } } },
    }),
    prisma.listing.count({ where }),
    prisma.listing.count({ where: { status: 'PENDING' } }),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const sp = new URLSearchParams();
    if (isPending) sp.set('filter', 'pending');
    if (q) sp.set('q', q);
    if (currentPage > 1) sp.set('page', String(currentPage));
    Object.entries(overrides).forEach(([k, v]) => {
      if (v) sp.set(k, v); else sp.delete(k);
    });
    return `/admin/listings?${sp.toString()}`;
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
              <span className="ml-2 text-base font-semibold text-gray-400">({totalCount} adet)</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/admin/export"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#00C49F] text-gray-600 hover:text-[#00C49F] text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              title="CSV olarak indir"
            >
              <ArrowUpRight size={15} />
              CSV
            </a>
            <Link
              href="/admin/create-listing"
              className="inline-flex items-center gap-2 bg-[#00C49F] hover:bg-[#00b38e] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <Plus size={16} />
              + Yeni İlan
            </Link>
          </div>
        </div>

        {/* Filter & Search bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
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

          {/* Search */}
          <form method="get" action="/admin/listings" className="flex-1 min-w-[200px] max-w-xs">
            {isPending && <input type="hidden" name="filter" value="pending" />}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Başlık, email, şehir..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
              />
            </div>
          </form>
        </div>

        {/* Table with bulk actions */}
        <BulkActionsTable listings={listings} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-400">
              Sayfa {currentPage} / {totalPages} · {totalCount} ilan
            </p>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={buildUrl({ page: String(currentPage - 1) })}
                  className="px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
                >
                  ← Önceki
                </Link>
              )}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                return (
                  <Link
                    key={p}
                    href={buildUrl({ page: String(p) })}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-xl transition-colors ${
                      p === currentPage
                        ? 'bg-[#00C49F] text-white'
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#00C49F] hover:text-[#00C49F]'
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}
              {currentPage < totalPages && (
                <Link
                  href={buildUrl({ page: String(currentPage + 1) })}
                  className="px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
                >
                  Sonraki →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
