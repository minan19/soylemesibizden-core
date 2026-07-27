import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  MapPin, Building2, User, Phone, Mail, Star,
  TrendingUp, Tag, Eye, CheckCircle, ArrowRight,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id }, select: { name: true, email: true } });
  if (!user) return { title: 'Kullanıcı Bulunamadı' };
  const displayName = user.name ?? user.email.split('@')[0];
  return {
    title: `${displayName} | Söylemesi Bizden`,
    description: `${displayName} ilanlarını ve profil bilgilerini görüntüleyin.`,
  };
}

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    select: {
      id: true, name: true, email: true, phone: true, role: true, createdAt: true,
      _count: { select: { listings: true, offers: true } },
    },
  });

  if (!user) notFound();

  const [activeListings, soldListings, totalViews, avgPrice] = await Promise.all([
    prisma.listing.count({ where: { ownerId: params.id, status: 'ACTIVE' } }),
    prisma.listing.count({ where: { ownerId: params.id, status: 'SOLD' } }),
    prisma.listing.aggregate({ where: { ownerId: params.id }, _sum: { views: true } }),
    prisma.listing.aggregate({ where: { ownerId: params.id, status: 'ACTIVE' }, _avg: { price: true } }),
  ]);

  const listings = await prisma.listing.findMany({
    where: { ownerId: params.id, status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    take: 12,
    select: {
      id: true, title: true, price: true, city: true, district: true,
      rooms: true, area: true, listingType: true, propertyType: true,
      isVerified: true, photos: true, views: true, createdAt: true,
    },
  });

  const displayName = user.name ?? user.email.split('@')[0];
  const joinYear = new Date(user.createdAt).getFullYear();
  const totalViewed = totalViews._sum.views ?? 0;
  const avg = avgPrice._avg.price;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#00C49F] transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-[#00C49F] transition-colors">İlanlar</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium">{displayName}</span>
        </nav>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-[#00C49F]">
                {displayName.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl font-bold text-gray-900">{displayName}</h1>
                {user.role === 'ADMIN' && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-100 tracking-widest">
                    ADMİN
                  </span>
                )}
                {user.role === 'CONCIERGE' && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 tracking-widest">
                    KONSİYERJ
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mb-4">{joinYear}&apos;dan beri üye</p>

              {/* Contact */}
              <div className="flex flex-wrap gap-4">
                {user.phone && (
                  <a
                    href={`tel:${user.phone}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00C49F] transition-colors"
                  >
                    <Phone size={14} className="text-gray-300" />
                    {user.phone}
                  </a>
                )}
                {user.phone && (
                  <a
                    href={`https://wa.me/${user.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Merhaba ${displayName}, ilanlarınız hakkında bilgi almak istiyorum.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-[#25D366] hover:underline"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                )}
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00C49F] transition-colors"
                >
                  <Mail size={14} className="text-gray-300" />
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Aktif İlan', value: activeListings, icon: Building2, color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
            { label: 'Satılan İlan', value: soldListings, icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Toplam Görüntülenme', value: totalViewed.toLocaleString('tr-TR'), icon: Eye, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Ort. Fiyat', value: avg ? `${Math.round(avg).toLocaleString('tr-TR')} ₺` : '—', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Listings */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900">Aktif İlanlar</h2>
            <span className="text-sm text-gray-400">{activeListings} ilan</span>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
              <Building2 className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">Aktif ilan bulunmuyor</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map(listing => {
                const isNew = Date.now() - new Date(listing.createdAt).getTime() < 3 * 24 * 60 * 60 * 1000;
                return (
                  <Link
                    key={listing.id}
                    href={`/listing/${listing.id}`}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#00C49F]/20 transition-all"
                  >
                    {/* Photo */}
                    <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                      {listing.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 size={28} className="text-slate-300" />
                        </div>
                      )}
                      {listing.isVerified && (
                        <span className="absolute top-2 left-2 bg-white/90 text-[#00C49F] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <CheckCircle size={9} /> Onaylı
                        </span>
                      )}
                      {isNew && (
                        <span className="absolute top-2 right-2 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          YENİ
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${listing.listingType === 'KİRALIK' ? 'bg-violet-50 text-violet-600' : 'bg-[#F0FDF8] text-[#00C49F]'}`}>
                          {listing.listingType}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                          {listing.propertyType}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </h3>

                      {(listing.city || listing.district) && (
                        <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                          <MapPin size={10} />
                          {[listing.district, listing.city].filter(Boolean).join(', ')}
                        </p>
                      )}

                      <div className="flex gap-2 mb-3">
                        {listing.rooms != null && <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{listing.rooms} oda</span>}
                        {listing.area != null && <span className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">{listing.area} m²</span>}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <span className="font-bold text-gray-900 font-mono text-sm">
                          ₺ {listing.price.toLocaleString('tr-TR')}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          {listing.views > 0 && <span>{listing.views} 👁</span>}
                          <ArrowRight size={13} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
