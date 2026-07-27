import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { User, MapPin, ArrowRight, TrendingUp, Heart, Activity, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      listings: { orderBy: { createdAt: 'desc' }, take: 6 },
      offers: { include: { listing: { select: { title: true } } }, orderBy: { createdAt: 'desc' }, take: 5 },
      favorites: { include: { listing: true }, orderBy: { createdAt: 'desc' }, take: 6 },
      _count: { select: { listings: true, offers: true, favorites: true } },
    },
  });

  if (!user) redirect('/login');

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">

        {/* Profil Başlığı */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] flex-shrink-0">
            <User size={36} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name ?? 'İsimsiz Kullanıcı'}</h1>
              {user.role === 'ADMIN' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0FDF8] text-[#00C49F] text-[10px] font-bold tracking-widest rounded-full border border-[#00C49F]/20">
                  <ShieldCheck size={10} /> ADMİN
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            {user.phone && <p className="text-sm text-gray-500 mt-0.5">{user.phone}</p>}
            <p className="text-[10px] text-gray-400 mt-2">Üyelik: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { label: 'İlan', value: user._count.listings },
              { label: 'Teklif', value: user._count.offers },
              { label: 'Favori', value: user._count.favorites },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-[10px] font-bold tracking-widest text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* İlanlarım */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase flex items-center gap-2">
                <TrendingUp size={14} /> İlanlarım
              </h2>
              <Link href={user.role === 'ADMIN' ? '/admin/create-listing' : '/create-listing'} className="text-xs text-[#00C49F] font-semibold hover:underline">
                + Yeni İlan
              </Link>
            </div>
            {user.listings.map(listing => (
              <Link key={listing.id} href={`/listing/${listing.id}`}
                className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{listing.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    {listing.location && <><MapPin size={10} /> {listing.location} · </>}
                    ₺ {listing.price.toLocaleString('tr-TR')}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                    listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
                  </span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                </div>
              </Link>
            ))}
            {user.listings.length === 0 && (
              <div className="p-8 bg-white rounded-2xl border border-dashed border-gray-200 text-center text-sm text-gray-400">
                Henüz ilanınız yok.
              </div>
            )}
          </div>

          {/* Sağ Panel */}
          <div className="space-y-6">
            {/* Tekliflerim */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Activity size={12} /> Son Tekliflerim
              </h3>
              <div className="space-y-3">
                {user.offers.map(offer => (
                  <div key={offer.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold text-gray-700 line-clamp-1">{offer.listing.title}</p>
                      <p className="text-xs text-gray-400 font-mono">₺ {offer.amount.toLocaleString('tr-TR')}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      offer.status === 'ACCEPTED' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                      offer.status === 'REJECTED' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'
                    }`}>{offer.status}</span>
                  </div>
                ))}
                {user.offers.length === 0 && <p className="text-xs text-gray-400">Teklif yok.</p>}
              </div>
            </div>

            {/* Favorilerim */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                <Heart size={12} /> Favorilerim
              </h3>
              <div className="space-y-2">
                {user.favorites.map(({ listing }) => (
                  <Link key={listing.id} href={`/listing/${listing.id}`}
                    className="flex justify-between items-center hover:text-[#00C49F] transition-colors group">
                    <p className="text-xs font-medium text-gray-700 line-clamp-1 group-hover:text-[#00C49F]">{listing.title}</p>
                    <p className="text-xs text-gray-400 font-mono ml-2 shrink-0">₺ {listing.price.toLocaleString('tr-TR')}</p>
                  </Link>
                ))}
                {user.favorites.length === 0 && <p className="text-xs text-gray-400">Favori yok.</p>}
                {user.favorites.length > 0 && (
                  <Link href="/favorites" className="text-[10px] text-[#00C49F] font-semibold hover:underline">
                    Tümünü gör →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
