import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Heart, MapPin, ArrowRight, Home, Building2, Bed, Maximize2 } from 'lucide-react';
import FavoriteButton from '@/components/FavoriteButton';

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
              <div key={listing.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-[#00C49F]/20 transition-all">
                {/* Photo */}
                <Link href={`/listing/${listing.id}`} className="block">
                  <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    {listing.photos?.[0] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={28} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2.5">
                    <div className="flex gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
                        listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                        listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
                      </span>
                      {listing.listingType && (
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600">
                          {listing.listingType}
                        </span>
                      )}
                    </div>
                    <FavoriteButton listingId={listing.id} initialFavorited={true} />
                  </div>
                  <Link href={`/listing/${listing.id}`}>
                    <h2 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 hover:text-[#00C49F] transition-colors">{listing.title}</h2>
                  </Link>
                  {(listing.city || listing.location) && (
                    <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                      <MapPin size={11} /> {listing.city ?? listing.location}
                    </p>
                  )}
                  {(listing.rooms != null || listing.area != null) && (
                    <div className="flex gap-3 mb-3">
                      {listing.rooms != null && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Bed size={11} className="text-gray-400" />{listing.rooms} oda
                        </span>
                      )}
                      {listing.area != null && (
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Maximize2 size={11} className="text-gray-400" />{listing.area} m²
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-base font-bold text-gray-900 font-mono">
                      ₺ {listing.price.toLocaleString('tr-TR')}
                    </span>
                    <Link href={`/listing/${listing.id}`}>
                      <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                    </Link>
                  </div>
                </div>
              </div>
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
