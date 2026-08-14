import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Map } from 'lucide-react';
import dynImport from 'next/dynamic';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'İlan Haritası | Söylemesi Bizden',
  description: 'Türkiye genelindeki aktif gayrimenkul ilanlarını harita üzerinde keşfedin. Şehir, ilçe ve mahalle bazında interaktif harita.',
};

const MapView = dynImport(() => import('./MapView'), { ssr: false });

type SearchParams = { city?: string; listingType?: string };

export default async function HaritaPage({ searchParams }: { searchParams: SearchParams }) {
  const { city, listingType } = searchParams;

  const where = {
    status: 'ACTIVE' as const,
    city: { not: null as null },
    ...(city ? { city: { contains: city, mode: 'insensitive' as const } } : {}),
    ...(listingType ? { listingType } : {}),
  };

  const listings = await prisma.listing.findMany({
    where,
    select: {
      id: true,
      title: true,
      price: true,
      city: true,
      district: true,
      neighborhood: true,
      listingType: true,
      propertyType: true,
      rooms: true,
      area: true,
      photos: true,
      status: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  const totalCount = await prisma.listing.count({ where: { status: 'ACTIVE' } });

  return (
    <main className="flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Compact header */}
      <div className="shrink-0 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/listings" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={14} /> İlanlar
          </Link>
          <span className="text-gray-200">|</span>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF8] flex items-center justify-center">
              <Map size={14} className="text-[#00C49F]" />
            </div>
            <h1 className="text-base font-bold text-gray-900">İlan Haritası</h1>
          </div>
          <span className="text-xs text-gray-400 hidden sm:block">
            {listings.length} / {totalCount} ilan gösteriliyor
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/listings"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300"
          >
            Liste Görünümü
          </Link>
          <Link
            href="/search"
            className="text-xs font-semibold text-[#00C49F] hover:text-[#00a882] transition-colors px-3 py-1.5 border border-[#00C49F]/30 rounded-lg hover:border-[#00C49F]"
          >
            Gelişmiş Arama
          </Link>
        </div>
      </div>

      {/* Full-height map */}
      <div className="flex-1 overflow-hidden">
        <MapView
          listings={listings}
          initialCity={city}
          initialListingType={listingType}
        />
      </div>
    </main>
  );
}
