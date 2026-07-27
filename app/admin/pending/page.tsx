import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, XCircle, MapPin, Building2, Eye } from 'lucide-react';
import ApproveListingButton from '@/components/ApproveListingButton';
import DeleteListingButton from '@/components/DeleteListingButton';

export const dynamic = 'force-dynamic';

export default async function AdminPendingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  if (user?.role !== 'ADMIN') redirect('/dashboard');

  const pending = await prisma.listing.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' }, // oldest first (FIFO)
    include: { owner: { select: { id: true, name: true, email: true } } },
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        {/* Header */}
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3"
          >
            <ArrowLeft size={14} /> Admin Panel
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Onay Kuyruğu</h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {pending.length} ilan onay bekliyor · En eskiden en yeniye
                </p>
              </div>
            </div>
            {pending.length === 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm font-semibold text-green-600">
                <CheckCircle size={15} /> Tüm ilanlar onaylandı
              </div>
            )}
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <CheckCircle size={40} className="text-[#00C49F] mx-auto mb-4" />
            <p className="text-gray-600 font-semibold text-base">Onay bekleyen ilan yok</p>
            <p className="text-gray-400 text-sm mt-1">Yeni ilanlar geldiğinde burada görünecek.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((listing, idx) => {
              const age = Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / 1000 / 60 / 60);
              const ageLabel = age < 1 ? 'Az önce' : age < 24 ? `${age} saat önce` : `${Math.floor(age / 24)} gün önce`;
              const isUrgent = age >= 24;
              return (
                <div key={listing.id} className={`bg-white rounded-2xl border ${isUrgent ? 'border-amber-200 bg-amber-50/30' : 'border-gray-100'} shadow-sm overflow-hidden`}>
                  <div className="flex flex-col sm:flex-row gap-4 p-5">
                    {/* Photo */}
                    <div className="w-full sm:w-36 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                      {listing.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={listing.photos[0]} alt={listing.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 size={24} className="text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                              #{idx + 1} BEKLEMEDE
                            </span>
                            {isUrgent && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                                ACİL ({ageLabel})
                              </span>
                            )}
                          </div>
                          <Link href={`/listing/${listing.id}`} target="_blank">
                            <h2 className="text-base font-bold text-gray-900 hover:text-[#00C49F] transition-colors line-clamp-1">
                              {listing.title}
                            </h2>
                          </Link>
                        </div>
                        <p className="text-lg font-bold text-[#00C49F] whitespace-nowrap">
                          {listing.price.toLocaleString('tr-TR')} ₺
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                        {(listing.city || listing.district) && (
                          <span className="flex items-center gap-1">
                            <MapPin size={11} /> {[listing.district, listing.city].filter(Boolean).join(', ')}
                          </span>
                        )}
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{listing.propertyType}</span>
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{listing.listingType}</span>
                        {listing.rooms != null && <span>{listing.rooms} oda</span>}
                        {listing.area != null && <span>{listing.area} m²</span>}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="text-xs text-gray-400">
                          <Link href={`/user/${listing.owner.id}`} className="text-[#00C49F] hover:underline font-medium">
                            {listing.owner.name ?? listing.owner.email}
                          </Link>
                          {' · '}{ageLabel}
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/listing/${listing.id}`}
                            target="_blank"
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <Eye size={12} /> İncele
                          </Link>
                          <Link
                            href={`/admin/edit-listing/${listing.id}`}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            Düzenle
                          </Link>
                          <ApproveListingButton listingId={listing.id} currentStatus={listing.status} />
                          <DeleteListingButton listingId={listing.id} listingTitle={listing.title} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description preview */}
                  {listing.description && (
                    <div className="px-5 pb-4 border-t border-gray-50 pt-3">
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{listing.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
