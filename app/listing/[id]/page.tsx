import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, ArrowLeft, Tag, User, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      owner: true,
      offers: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  });

  if (!listing) notFound();

  const statusColor = listing.status === 'ACTIVE'
    ? 'bg-[#F0FDF8] text-[#00C49F] border-[#00C49F]/20'
    : listing.status === 'SOLD'
    ? 'bg-gray-100 text-gray-500 border-gray-200'
    : 'bg-amber-50 text-amber-600 border-amber-200';

  const statusLabel = listing.status === 'ACTIVE' ? 'AKTİF' : listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE';

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Tüm İlanlar
        </Link>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest border ${statusColor}`}>
              {statusLabel}
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck size={13} className="text-[#00C49F]" />
              SOVEREIGN VERIFIED
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{listing.title}</h1>
          {listing.location && (
            <p className="flex items-center gap-2 text-gray-500 text-sm mb-6">
              <MapPin size={14} /> {listing.location}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed">{listing.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-2 gap-4">
              {[
                { icon: <Tag size={14} />, label: 'Durum', value: listing.status },
                { icon: <User size={14} />, label: 'Sahibi', value: listing.owner.name ?? listing.owner.email },
                { icon: <Calendar size={14} />, label: 'Eklenme', value: new Date(listing.createdAt).toLocaleDateString('tr-TR') },
                { icon: <Calendar size={14} />, label: 'Güncelleme', value: new Date(listing.updatedAt).toLocaleDateString('tr-TR') },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="text-[#00C49F]">{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {listing.offers.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Gelen Teklifler</h2>
                <div className="space-y-3">
                  {listing.offers.map(offer => (
                    <div key={offer.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                      <span className="font-mono text-base font-bold text-gray-900">
                        ₺ {offer.amount.toLocaleString('tr-TR')}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        offer.status === 'ACCEPTED' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                        offer.status === 'REJECTED' ? 'bg-red-50 text-red-500' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {offer.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6 shadow-sm">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2">Fiyat</p>
              <p className="text-3xl font-bold font-mono text-gray-900">
                ₺ {listing.price.toLocaleString('tr-TR')}
              </p>
              <div className="mt-6 space-y-3">
                <Link href="/offers"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
                  Teklif Ver <ArrowRight size={16} />
                </Link>
                <Link href="/deals"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  Anlaşma Odası Aç
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">İlan Sahibi</p>
              <p className="font-semibold text-gray-900">{listing.owner.name ?? 'İsimsiz'}</p>
              <p className="text-xs text-gray-500 mt-1">{listing.owner.email}</p>
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] mt-2">{listing.owner.role}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
