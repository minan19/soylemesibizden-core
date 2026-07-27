import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Eye,
  BedDouble,
  Bath,
  Maximize2,
  Building2,
  Calendar,
  Car,
  Leaf,
  Layers,
  TrendingUp,
  User,
  Phone,
  Mail,
  ImageOff,
  Tag,
  Edit,
} from 'lucide-react';
import MortgageCalculator from '@/components/MortgageCalculator';
import InquiryForm from '@/components/InquiryForm';
import FavoriteButton from '@/components/FavoriteButton';
import OfferForm from '@/components/OfferForm';
import CreateDealButton from '@/components/CreateDealButton';
import CompareButton from '@/components/CompareButton';
import ShareButton from '@/components/ShareButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    select: { title: true, description: true, price: true, city: true },
  });
  if (!listing) return { title: 'İlan Bulunamadı' };
  return {
    title: `${listing.title} | Söylemesi Bizden`,
    description: listing.description?.slice(0, 160),
    openGraph: {
      title: listing.title,
      description: listing.description?.slice(0, 160),
      type: 'website',
    },
  };
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { id: true, name: true, email: true, phone: true, role: true } },
      offers: { orderBy: { createdAt: 'desc' }, take: 10 },
    },
  });

  if (!listing) notFound();

  // Check if the current user has favorited this listing
  const session = await getServerSession(authOptions);
  let isFavorited = false;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user) {
      const fav = await prisma.favorite.findUnique({
        where: { userId_listingId: { userId: user.id, listingId: listing.id } },
      });
      isFavorited = !!fav;
    }
  }

  const sessionUser = session?.user as { id?: string; email?: string; role?: string } | undefined;
  const canEdit = !!(
    sessionUser &&
    (sessionUser.id === listing.ownerId || sessionUser.role === 'ADMIN')
  );

  // Increment views and fetch similar listings concurrently
  const [similarListings] = await Promise.all([
    prisma.listing.findMany({
      where: {
        propertyType: listing.propertyType,
        id: { not: listing.id },
        status: 'ACTIVE',
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.listing.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    }),
  ]);

  /* ── Derived values ───────────────────────────────────────────── */
  const statusColor =
    listing.status === 'ACTIVE'
      ? 'bg-[#F0FDF8] text-[#00C49F] border-[#00C49F]/20'
      : listing.status === 'SOLD'
      ? 'bg-gray-100 text-gray-500 border-gray-200'
      : 'bg-amber-50 text-amber-600 border-amber-200';

  const statusLabel =
    listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE';

  const locationParts = [listing.neighborhood, listing.district, listing.city].filter(Boolean);
  const fullLocation = locationParts.length > 0 ? locationParts.join(', ') : (listing.location ?? '');

  const pricePerM2 =
    listing.area && listing.area > 0 ? listing.price / listing.area : null;

  const details = [
    {
      icon: <BedDouble size={15} />,
      label: 'Oda Sayısı',
      value: listing.rooms != null ? String(listing.rooms) : 'Belirtilmemiş',
    },
    {
      icon: <Bath size={15} />,
      label: 'Banyo',
      value: listing.bathrooms != null ? String(listing.bathrooms) : '—',
    },
    {
      icon: <Maximize2 size={15} />,
      label: 'Metrekare',
      value: listing.area != null ? `${listing.area} m²` : '—',
    },
    {
      icon: <Layers size={15} />,
      label: 'Kat',
      value:
        listing.floor != null
          ? listing.totalFloors
            ? `${listing.floor} / ${listing.totalFloors}`
            : String(listing.floor)
          : '—',
    },
    {
      icon: <Calendar size={15} />,
      label: 'Bina Yaşı',
      value: listing.buildingAge != null ? `${listing.buildingAge} yıl` : '—',
    },
    {
      icon: <Building2 size={15} />,
      label: 'Asansör',
      value: listing.hasElevator ? 'Var' : 'Yok',
    },
    {
      icon: <Car size={15} />,
      label: 'Otopark',
      value: listing.hasParking ? 'Var' : 'Yok',
    },
    {
      icon: <Leaf size={15} />,
      label: 'Bahçe',
      value: listing.hasGarden ? 'Var' : 'Yok',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">

        {/* Back navigation */}
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          <ArrowLeft size={16} />
          Tüm İlanlar
        </Link>

        {/* ────────── Main grid ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── LEFT COLUMN (2/3) ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1 · Photo Gallery */}
            {listing.photos.length > 0 ? (
              <div className="space-y-2">
                <div className="w-full h-[420px] rounded-3xl overflow-hidden bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={listing.photos[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {listing.photos.length > 1 && (
                  <div className="grid grid-cols-3 gap-2">
                    {listing.photos.slice(1, 4).map((photo, i) => (
                      <div
                        key={i}
                        className="relative h-36 rounded-2xl overflow-hidden bg-gray-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo}
                          alt={`${listing.title} fotoğraf ${i + 2}`}
                          className="w-full h-full object-cover"
                        />
                        {i === 2 && listing.photos.length > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              +{listing.photos.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-72 rounded-3xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-400">
                <ImageOff size={44} strokeWidth={1.5} />
                <p className="text-sm font-medium">Fotoğraf eklenmemiş</p>
              </div>
            )}

            {/* 2 · Title & Key Info Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-widest border ${statusColor}`}
                >
                  {statusLabel}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full tracking-widest bg-gray-100 text-gray-600 border border-gray-200">
                  {listing.propertyType}
                </span>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full tracking-widest bg-blue-50 text-blue-600 border border-blue-100">
                  {listing.listingType}
                </span>
                {listing.isVerified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20">
                    <ShieldCheck size={11} />
                    DOĞRULANMIŞ
                  </span>
                )}
                <span className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
                  <Eye size={13} />
                  {listing.views.toLocaleString('tr-TR')} görüntülenme
                </span>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 leading-snug">
                  {listing.title}
                </h1>
                <div className="flex items-center gap-2">
                  {canEdit && (
                    <Link
                      href={`/admin/edit-listing/${listing.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
                    >
                      <Edit size={12} /> Düzenle
                    </Link>
                  )}
                  <FavoriteButton listingId={listing.id} initialFavorited={isFavorited} />
                  <CompareButton listingId={listing.id} />
                  <ShareButton title={listing.title} />
                </div>
              </div>
              {fullLocation && (
                <p className="flex items-center gap-1.5 text-sm text-gray-500">
                  <MapPin size={14} className="text-[#00C49F] flex-shrink-0" />
                  {fullLocation}
                </p>
              )}
            </div>

            {/* 3 · Property Details Grid */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-5">
                İlan Detayları
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {details.map(item => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#F8FAFC] border border-gray-100"
                  >
                    <div className="text-[#00C49F]">{item.icon}</div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase leading-tight">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 · Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Açıklama
              </h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                {listing.description}
              </p>
            </div>

            {/* 5 · Map */}
            {(listing.city || listing.location) && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Konum</h2>
                <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: '280px' }}>
                  <iframe
                    title="Harita"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=26%2C36%2C45%2C42&layer=mapnik&marker=${encodeURIComponent(`${listing.district ?? ''} ${listing.city ?? listing.location ?? 'Türkiye'}`)}`}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <MapPin size={11} /> {[listing.neighborhood, listing.district, listing.city].filter(Boolean).join(', ')}
                </p>
              </div>
            )}

            {/* 6 · Price Analysis */}
            {pricePerM2 && (
              <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#00C49F]/15 flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={20} className="text-[#00C49F]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-0.5">
                    Metrekare Birim Fiyatı
                  </p>
                  <p className="text-xl font-bold font-mono text-gray-900">
                    ₺{' '}
                    {pricePerM2.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} / m²
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {listing.area} m² × ₺{' '}
                    {pricePerM2.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}/m² ={' '}
                    ₺ {listing.price.toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
            )}

            {/* 6 · Mortgage Calculator */}
            <MortgageCalculator defaultPrice={listing.price} />

            {/* 7 · Inquiry / Contact Form */}
            <InquiryForm listingId={listing.id} />
          </div>

          {/* ── RIGHT SIDEBAR (1/3) ───────────────────────────────── */}
          <div className="space-y-4 lg:sticky lg:top-10">

            {/* Price Card */}
            <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6 shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                Fiyat
              </p>
              <p className="text-3xl font-bold font-mono text-gray-900 mb-1">
                ₺ {listing.price.toLocaleString('tr-TR')}
              </p>
              <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 tracking-widest mb-5">
                {listing.listingType}
              </span>
              <div className="space-y-2.5">
                <Link
                  href="/offers"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Teklif Ver
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/deals"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Anlaşma Odası Aç
                </Link>
              </div>
            </div>

            {/* Owner Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                İlan Sahibi
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#00C49F]/10 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-[#00C49F]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {listing.owner.name ?? 'İsimsiz'}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mt-0.5">
                    {listing.owner.role}
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 border-t border-gray-50 pt-3.5">
                {listing.owner.email && (
                  <a
                    href={`mailto:${listing.owner.email}`}
                    className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#00C49F] transition-colors group"
                  >
                    <Mail size={13} className="text-gray-300 group-hover:text-[#00C49F] flex-shrink-0 transition-colors" />
                    <span className="truncate">{listing.owner.email}</span>
                  </a>
                )}
                {listing.owner.phone && (
                  <>
                    <a
                      href={`tel:${listing.owner.phone}`}
                      className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#00C49F] transition-colors group"
                    >
                      <Phone size={13} className="text-gray-300 group-hover:text-[#00C49F] flex-shrink-0 transition-colors" />
                      <span>{listing.owner.phone}</span>
                    </a>
                    <a
                      href={`https://wa.me/${listing.owner.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba, "${listing.title}" ilanınız hakkında bilgi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2 mt-1 bg-[#25D366] hover:bg-[#20b357] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp ile İletişim
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
                Hızlı İstatistikler
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye size={14} className="text-gray-300" />
                    Görüntülenme
                  </div>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {listing.views.toLocaleString('tr-TR')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag size={14} className="text-gray-300" />
                    Teklif Sayısı
                  </div>
                  <span className="font-bold text-gray-900 font-mono text-sm">
                    {listing.offers.length}
                  </span>
                </div>
                {listing.offers.length > 0 && (
                  <div className="pt-3 border-t border-gray-50 space-y-2">
                    {listing.offers.slice(0, 3).map(offer => (
                      <div
                        key={offer.id}
                        className="flex items-center justify-between"
                      >
                        <span className="font-mono text-xs font-semibold text-gray-800">
                          ₺ {offer.amount.toLocaleString('tr-TR')}
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            offer.status === 'ACCEPTED'
                              ? 'bg-[#F0FDF8] text-[#00C49F]'
                              : offer.status === 'REJECTED'
                              ? 'bg-red-50 text-red-500'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {offer.status === 'ACCEPTED'
                            ? 'KABUL'
                            : offer.status === 'REJECTED'
                            ? 'RED'
                            : 'BEKLEMEDE'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Offer Form */}
            <OfferForm listingId={listing.id} listingPrice={listing.price} />

            {/* Deal Room */}
            <CreateDealButton listingId={listing.id} sellerId={listing.ownerId} />

          </div>
        </div>

        {/* ────────── Similar Listings ────────── */}
        {similarListings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-900">Benzer İlanlar</h2>
              <Link
                href="/listings"
                className="text-sm font-semibold text-[#00C49F] hover:text-[#00a882] flex items-center gap-1 transition-colors"
              >
                Tümünü Gör <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {similarListings.map(item => {
                const itemLocation =
                  [item.neighborhood, item.district, item.city].filter(Boolean).join(', ') ||
                  item.location ||
                  '';
                return (
                  <Link
                    key={item.id}
                    href={`/listing/${item.id}`}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#00C49F]/25 transition-all group"
                  >
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-gray-100 mb-4">
                      {item.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.photos[0]}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff size={24} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-2 group-hover:text-[#00C49F] transition-colors">
                      {item.title}
                    </p>
                    {itemLocation && (
                      <p className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <MapPin size={11} className="flex-shrink-0" />
                        {itemLocation}
                      </p>
                    )}
                    <p className="font-bold font-mono text-gray-900">
                      ₺ {item.price.toLocaleString('tr-TR')}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
