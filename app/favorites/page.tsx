import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Heart, MapPin, ArrowRight, Home } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      favorites: {
        include: { listing: { include: { owner: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const favorites = user?.favorites ?? [];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Heart size={28} className="text-[#00C49F]" /> Favorilerim
            </h1>
            <p className="text-sm text-gray-500 mt-1">{favorites.length} kayıtlı ilan</p>
          </div>
          <Link href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
            İlanlara Göz At <ArrowRight size={15} />
          </Link>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {favorites.map(({ listing }) => (
              <Link key={listing.id} href={`/listing/${listing.id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#00C49F]/20 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
                    listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                    listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {listing.listingType && (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600">
                        {listing.listingType}
                      </span>
                    )}
                    <Heart size={14} className="text-[#00C49F] fill-[#00C49F]" />
                  </div>
                </div>
                <h2 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{listing.title}</h2>
                {listing.location && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin size={11} /> {listing.location}
                  </p>
                )}
                {(listing.rooms || listing.area) && (
                  <p className="text-xs text-gray-500 mb-3">
                    {listing.rooms ? `${listing.rooms}+1` : ''}{listing.rooms && listing.area ? ' · ' : ''}{listing.area ? `${listing.area} m²` : ''}
                  </p>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <span className="text-lg font-bold text-gray-900 font-mono">
                    ₺ {listing.price.toLocaleString('tr-TR')}
                  </span>
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-dashed border-gray-200 py-24 text-center">
            <Home size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Henüz favoriniz yok</p>
            <p className="text-gray-400 text-sm mt-1">İlan detay sayfasından kalp ikonuna tıklayarak favorilere ekleyin</p>
            <Link href="/listings" className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
              İlanları Keşfet <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
