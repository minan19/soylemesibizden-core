import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Plus, MapPin, ArrowRight, Edit, TrendingUp, BarChart2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MyListingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      listings: {
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { offers: true, favorites: true, inquiries: true } },
        },
      },
    },
  });

  if (!user) redirect('/login');

  const listings = user.listings;
  const active = listings.filter(l => l.status === 'ACTIVE').length;
  const totalOffers = listings.reduce((s, l) => s + l._count.offers, 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">İlanlarım</h1>
            <p className="text-sm text-gray-500 mt-1">
              {listings.length} ilan · {active} aktif · {totalOffers} teklif
            </p>
          </div>
          <Link
            href={user.role === 'ADMIN' ? '/admin/create-listing' : '/create-listing'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Plus size={15} /> Yeni İlan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM', value: listings.length, color: 'text-gray-900' },
            { label: 'AKTİF', value: active, color: 'text-[#00C49F]' },
            { label: 'TOPLAM TEKLİF', value: totalOffers, color: 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Listing List */}
        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <TrendingUp size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Henüz ilanınız yok</p>
            <p className="text-gray-400 text-sm mt-1">İlk ilanınızı oluşturun ve alıcılarla buluşun.</p>
            <div className="mt-6 flex items-center gap-3 justify-center">
              <Link href={user.role === 'ADMIN' ? '/admin/create-listing' : '/create-listing'} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
                <Plus size={15} /> İlan Oluştur
              </Link>
              <Link href="/listings" className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                İlanları Keşfet
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                        listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-500">
                        {listing.listingType} · {listing.propertyType}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold text-gray-900 mb-1">{listing.title}</h2>
                    {(listing.location || listing.city) && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                        <MapPin size={10} /> {listing.location ?? listing.city}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="font-mono font-bold text-gray-700">₺ {listing.price.toLocaleString('tr-TR')}</span>
                      <span>{listing._count.offers} teklif</span>
                      <span>{listing._count.favorites} favori</span>
                      <span>{listing._count.inquiries} başvuru</span>
                      <span>{listing.views} görüntülenme</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href={`/my-listings/${listing.id}/analytics`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0FDF8] rounded-lg text-xs font-semibold text-[#00C49F] hover:bg-[#00C49F] hover:text-white transition-all"
                    >
                      <BarChart2 size={12} /> Analiz
                    </Link>
                    <Link
                      href={user.role === 'ADMIN' ? `/admin/edit-listing/${listing.id}` : `/edit-listing/${listing.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
                    >
                      <Edit size={12} /> Düzenle
                    </Link>
                    <Link
                      href={`/listing/${listing.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-all"
                    >
                      Görüntüle <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
