import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Search, Trash2 } from 'lucide-react';
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

export default async function SavedSearchesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const userId = (session.user as { id?: string })?.id;
  if (!userId) redirect('/login');

  const searches = await prisma.savedSearch.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

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
            {searches.map(s => {
              const filters = s.filters as Record<string, string>;
              return (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4 hover:shadow-sm transition-shadow">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 mb-1">{s.name}</p>
                    <p className="text-xs text-gray-400 mb-3">{describeFilters(filters)}</p>
                    <Link
                      href={buildUrl(filters)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] text-[#00C49F] text-xs font-semibold rounded-lg hover:bg-[#00C49F] hover:text-white transition-colors"
                    >
                      <Search size={12} /> Aramayı Tekrarla
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <p className="text-xs text-gray-400">
                      {new Date(s.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                    <DeleteSavedSearchButton id={s.id} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
