import prisma from '@/lib/prisma';
import Link from 'next/link';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import ListingsClient from './ListingsClient';

export const dynamic = 'force-dynamic';

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; sort?: string };
}) {
  const { q, status, sort } = searchParams;

  const listings = await prisma.listing.findMany({
    where: {
      ...(q ? {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
        ]
      } : {}),
      ...(status && status !== 'ALL' ? { status } : {}),
    },
    orderBy: sort === 'price_asc'
      ? { price: 'asc' }
      : sort === 'price_desc'
      ? { price: 'desc' }
      : { createdAt: 'desc' },
    include: { owner: true },
  });

  const counts = await prisma.listing.groupBy({
    by: ['status'],
    _count: true,
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kritik Varlıklar</h1>
            <p className="text-sm text-gray-500 mt-1">{listings.length} ilan bulundu</p>
          </div>
          <div className="flex gap-2">
            {counts.map(c => (
              <span key={c.status} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600">
                {c.status} <span className="text-[#00C49F]">{c._count}</span>
              </span>
            ))}
          </div>
        </header>

        <ListingsClient listings={listings} currentQ={q} currentStatus={status} currentSort={sort} />

      </div>
    </main>
  );
}
