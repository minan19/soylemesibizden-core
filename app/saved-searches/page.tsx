import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Search, TrendingUp } from 'lucide-react';
import DeleteSavedSearchButton from './DeleteSavedSearchButton';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Kayıtlı Aramalar | Söylemesi Bizden' };

function buildUrl(filters: Record<string, string>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v) sp.set(k, v);
  }
  const qs = sp.toString();
  return `/listings${qs ? '?' + qs : ''}`;
}

function describeFilters(filters: Record<string, string>) {
  const parts: string[] = [];
  if (filters.q) parts.push(`"${filters.q}"`);
  if (filters.city) parts.push(filters.city);
  if (filters.listingType && filters.listingType !== 'ALL') parts.push(filters.listingType);
  if (filters.propertyType && filters.propertyType !== 'ALL') parts.push(filters.propertyType);
  if (filters.minRooms) parts.push(`${filters.minRooms}+ oda`);
  if (filters.minPrice || filters.maxPrice) {
    const min = filters.minPrice ? `${Number(filters.minPrice).toLocaleString('tr-TR')}₺` : '';
    const max = filters.maxPrice ? `${Number(filters.maxPrice).toLocaleString('tr-TR')}₺` : '';
    parts.push(min && max ? `${min} – ${max}` : min || max);
  }
  if (filters.hasElevator === '1') parts.push('Asansör');
  if (filters.hasParking === '1') parts.push('Otopark');
  if (filters.hasGarden === '1') parts.push('Bahçe');
  return parts.length > 0 ? parts.join(' · ') : 'Tüm ilanlar';
}

function buildPrismaWhere(filters: Record<string, string>) {
  const priceFilter: { gte?: number; lte?: number } = {};
  if (filters.minPrice) priceFilter.gte = Number(filters.minPrice);
  if (filters.maxPrice) priceFilter.lte = Number(filters.maxPrice);

  return {
    status: 'ACTIVE' as const,
    ...(filters.q
      ? { OR: [
          { title: { contains: filters.q, mode: 'insensitive' as const } },
          { description: { contains: filters.q, mode: 'insensitive' as const } },
        ]}
      : {}),
    ...(filters.city ? { city: { contains: filters.city, mode: 'insensitive' as const } } : {}),
    ...(filters.propertyType && filters.propertyType !== 'ALL' ? { propertyType: filters.propertyType } : {}),
    ...(filters.listingType && filters.listingType !== 'ALL' ? { listingType: filters.listingType } : {}),
    ...(Object.keys(priceFilter).length > 0 ? { price: priceFilter } : {}),
    ...(filters.minRooms ? { rooms: { gte: Number(filters.minRooms) } } : {}),
    ...(filters.hasElevator === '1' ? { hasElevator: true } : {}),
    ...(filters.hasParking === '1' ? { hasParking: true } : {}),
    ...(filters.hasGarden === '1' ? { hasGarden: true } : {}),
  };
}

export default async function SavedSearchesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userId = (session.user as { id?: string })?.id;
  if (!userId) redirect('/login');

  const searches = await prisma.savedSearch.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  // Compute live match counts for each saved search
  const matchCounts = await Promise.all(
    searches.map(s => {
      const filters = s.filters as Record<string, string>;
      const where = buildPrismaWhere(filters);
      return prisma.listing.count({ where });
    })
  );

  // Also compute new matches in the last 7 days
  const newMatchCounts = await Promise.all(
    searches.map(s => {
      const filters = s.filters as Record<string, string>;
      const where = {
        ...buildPrismaWhere(filters),
        createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      };
      return prisma.listing.count({ where });
    })
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Bookmark size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Kayıtlı Aramalar</h1>
              <p className="text-xs text-gray-400 mt-0.5">{searches.length} kayıtlı arama</p>
            </div>
          </div>
        </div>

        {searches.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Bookmark size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Henüz kayıtlı arama yok.</p>
            <p className="text-gray-400 text-xs mt-1 mb-4">İlanlar sayfasında filtre uygulayıp "Aramayı Kaydet" butonunu kullanın.</p>
            <Link href="/listings" className="inline-flex items-center gap-2 px-4 py-2 bg-[#00C49F] text-white text-sm font-bold rounded-xl hover:bg-[#00a882] transition-colors">
              <Search size={14} /> İlanlara Git
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {searches.map((s, idx) => {
              const filters = s.filters as Record<string, string>;
              const matchCount = matchCounts[idx];
              const newCount = newMatchCounts[idx];
              return (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="text-sm font-bold text-gray-900">{s.name}</p>
                        {newCount > 0 && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            +{newCount} yeni (7 gün)
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-3">{describeFilters(filters)}</p>
                      <div className="flex items-center gap-3">
                        <Link
                          href={buildUrl(filters)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] text-xs font-semibold rounded-lg hover:bg-[#00C49F] hover:text-white transition-colors"
                        >
                          <Search size={12} /> Aramayı Tekrarla
                        </Link>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <TrendingUp size={11} className="text-[#00C49F]" />
                          {matchCount} ilan eşleşiyor
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-xs text-gray-400">
                        {new Date(s.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                      <DeleteSavedSearchButton id={s.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create search CTA */}
        <div className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#00C49F]/10 flex items-center justify-center shrink-0">
            <Search size={18} className="text-[#00C49F]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">Yeni Arama Kaydet</p>
            <p className="text-xs text-gray-500 mt-0.5">İlanlar sayfasında filtreleri ayarlayın, ardından "Aramayı Kaydet" butonuna tıklayın.</p>
          </div>
          <Link
            href="/listings"
            className="px-4 py-2 bg-[#00C49F] text-white text-xs font-bold rounded-xl hover:bg-[#00a882] transition-colors shrink-0"
          >
            İlanlara Git
          </Link>
        </div>
      </div>
    </main>
  );
}
