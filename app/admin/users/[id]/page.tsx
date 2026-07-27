import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import { ArrowLeft, User, Mail, Phone, ShieldCheck, TrendingUp, Heart, MessageSquare, Handshake, Calendar, ArrowUpRight } from 'lucide-react';
import ChangeRoleButton from '@/components/ChangeRoleButton';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

const ROLE_COLORS: Record<string, string> = {
  ADMIN: 'bg-green-100 text-green-700 border-green-200',
  CONCIERGE: 'bg-blue-100 text-blue-700 border-blue-200',
  USER: 'bg-gray-100 text-gray-600 border-gray-200',
};

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-[#F0FDF8] text-[#00C49F]',
  PENDING: 'bg-amber-50 text-amber-600',
  SOLD: 'bg-gray-100 text-gray-500',
};

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      listings: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { _count: { select: { offers: true, favorites: true } } },
      },
      offers: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { listing: { select: { id: true, title: true, price: true } } },
      },
      favorites: {
        orderBy: { createdAt: 'desc' },
        take: 6,
        include: { listing: { select: { id: true, title: true, price: true, city: true } } },
      },
      _count: { select: { listings: true, offers: true, favorites: true } },
    },
  });

  if (!user) notFound();

  const totalListingValue = user.listings.reduce((s, l) => s + l.price, 0);
  const acceptedOffers = user.offers.filter(o => o.status === 'ACCEPTED').length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/admin/users" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Kullanıcılar
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0">
                <User size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{user.name ?? 'İsimsiz Kullanıcı'}</h1>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${ROLE_COLORS[user.role] ?? ROLE_COLORS['USER']}`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Mail size={11} /> {user.email}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Phone size={11} /> {user.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={11} /> {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
            </div>
            <ChangeRoleButton userId={user.id} currentRole={user.role as 'USER' | 'ADMIN' | 'CONCIERGE'} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'TOPLAM İLAN', value: user._count.listings, icon: <TrendingUp size={16} />, color: 'text-[#00C49F]' },
            { label: 'TOPLAM TEKLİF', value: user._count.offers, icon: <Handshake size={16} />, color: 'text-blue-600' },
            { label: 'FAVORİ', value: user._count.favorites, icon: <Heart size={16} />, color: 'text-red-500' },
            { label: 'KABUL EDİLEN', value: acceptedOffers, icon: <ShieldCheck size={16} />, color: 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
                İlanları ({user._count.listings})
              </h2>
              {totalListingValue > 0 && (
                <span className="text-xs font-semibold text-gray-500">
                  Toplam: {formatPrice(totalListingValue)}
                </span>
              )}
            </div>
            {user.listings.length === 0 ? (
              <p className="p-6 text-sm text-gray-400 text-center">İlan bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {user.listings.map(listing => (
                  <div key={listing.id} className="px-6 py-4 flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[listing.status] ?? 'bg-gray-100 text-gray-500'}`}>
                          {listing.status}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 truncate">{listing.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {formatPrice(listing.price)} · {listing._count.offers} teklif · {listing._count.favorites} favori
                      </p>
                    </div>
                    <Link href={`/listing/${listing.id}`} className="text-[#00C49F] hover:text-[#00a882] shrink-0">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Offers */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
                Teklifleri ({user._count.offers})
              </h2>
            </div>
            {user.offers.length === 0 ? (
              <p className="p-6 text-sm text-gray-400 text-center">Teklif bulunamadı.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {user.offers.map(offer => (
                  <div key={offer.id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">
                        {offer.listing.title}
                      </p>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        offer.status === 'ACCEPTED' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                        offer.status === 'REJECTED' ? 'bg-red-50 text-red-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      Teklif: {formatPrice(offer.amount)} · İlan: {formatPrice(offer.listing.price)}
                    </p>
                    <p className="text-[10px] text-gray-300 mt-0.5">{new Date(offer.createdAt).toLocaleDateString('tr-TR')}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Favorites */}
        {user.favorites.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
                <Heart size={12} /> Favoriler ({user._count.favorites})
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {user.favorites.map(fav => (
                <Link
                  key={fav.id}
                  href={`/listing/${fav.listing.id}`}
                  className="p-4 rounded-xl border border-gray-100 hover:border-[#00C49F]/30 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{fav.listing.title}</p>
                  <p className="text-xs text-gray-400">{fav.listing.city ?? '—'}</p>
                  <p className="text-sm font-bold text-[#00C49F] mt-2">{formatPrice(fav.listing.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
