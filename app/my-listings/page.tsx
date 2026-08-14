import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Plus, MapPin, ArrowRight, Edit, TrendingUp, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';
import DeleteListingButton from '@/components/DeleteListingButton';
import ChangeStatusButton from '@/components/ChangeStatusButton';
import ListingNoteIndicator from '@/components/ListingNoteIndicator';

export const dynamic = 'force-dynamic';

type ListingForScore = {
  description?: string | null;
  photos: string[];
  area?: number | null;
  rooms?: number | null;
  city?: string | null;
  district?: string | null;
  floor?: number | null;
  location?: string | null;
};

function completenessScore(l: ListingForScore): { score: number; tips: string[] } {
  const checks = [
    { ok: !!(l.description && l.description.trim().length > 10), weight: 20, tip: 'Açıklama ekleyin' },
    { ok: l.photos.length > 0, weight: 20, tip: 'En az 1 fotoğraf ekleyin' },
    { ok: l.photos.length >= 3, weight: 10, tip: '3+ fotoğraf ekleyin' },
    { ok: !!l.area, weight: 15, tip: 'Alan (m²) girin' },
    { ok: !!l.rooms, weight: 10, tip: 'Oda sayısı girin' },
    { ok: !!(l.city || l.location), weight: 10, tip: 'Şehir bilgisi girin' },
    { ok: !!l.district, weight: 10, tip: 'İlçe bilgisi girin' },
    { ok: l.floor != null, weight: 5, tip: 'Kat bilgisi girin' },
  ];
  const score = checks.filter(c => c.ok).reduce((s, c) => s + c.weight, 0);
  const tips = checks.filter(c => !c.ok).map(c => c.tip);
  return { score, tips };
}

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
  const totalViews = listings.reduce((s, l) => s + l.views, 0);
  const totalFavorites = listings.reduce((s, l) => s + l._count.favorites, 0);
  const totalInquiries = listings.reduce((s, l) => s + l._count.inquiries, 0);

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
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'TOPLAM İLAN', value: listings.length, color: 'text-gray-900' },
            { label: 'AKTİF', value: active, color: 'text-[#00C49F]' },
            { label: 'TEKLIFLER', value: totalOffers, color: 'text-amber-600' },
            { label: 'GÖRÜNTÜLENMELERİ', value: totalViews.toLocaleString('tr-TR'), color: 'text-blue-600' },
            { label: 'FAVORİLER', value: totalFavorites, color: 'text-pink-500' },
            { label: 'BAŞVURULAR', value: totalInquiries, color: 'text-purple-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
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
            {listings.map(listing => {
              const { score, tips } = completenessScore(listing);
              return (
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
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-base font-semibold text-gray-900">{listing.title}</h2>
                      <ListingNoteIndicator listingId={listing.id} />
                    </div>
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
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <ChangeStatusButton listingId={listing.id} currentStatus={listing.status as 'ACTIVE' | 'PENDING' | 'SOLD'} />
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
                    <DeleteListingButton listingId={listing.id} listingTitle={listing.title} />
                  </div>
                </div>

                {/* Completeness score */}
                <div className="mt-4 pt-3 border-t border-gray-50">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {score >= 80 ? (
                        <CheckCircle2 size={12} className="text-[#00C49F]" />
                      ) : (
                        <AlertCircle size={12} className="text-amber-500" />
                      )}
                      <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">İlan Tamamlama</span>
                    </div>
                    <span className={`text-[10px] font-bold ${score >= 80 ? 'text-[#00C49F]' : score >= 50 ? 'text-amber-600' : 'text-red-500'}`}>
                      %{score}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all ${score >= 80 ? 'bg-[#00C49F]' : score >= 50 ? 'bg-amber-400' : 'bg-red-400'}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  {tips.length > 0 && (
                    <p className="mt-1.5 text-[10px] text-gray-400">
                      Öneri: {tips.slice(0, 2).join(', ')}
                    </p>
                  )}
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
