import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Gavel, TrendingUp, Clock, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function AuctionPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      owner: { select: { name: true, email: true } },
      offers: { orderBy: { amount: 'desc' }, take: 10, include: { user: { select: { name: true } } } },
    },
  });

  if (!listing) notFound();

  const highestOffer = listing.offers[0]?.amount ?? listing.price;
  const offerCount = listing.offers.length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/listings" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> İlanlara Dön
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Gavel size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{listing.title}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{listing.city ?? '—'} · {listing.propertyType} · {listing.listingType}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">

            {/* Price info */}
            <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-2">Talep Fiyatı</p>
              <p className="text-4xl font-black text-gray-900 font-mono">{formatPrice(listing.price)}</p>
              {listing.area && (
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={11} /> {formatPrice(Math.round(listing.price / listing.area))}/m²
                  · {listing.area} m²
                </p>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">İlan Detayları</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Mülk Tipi', value: listing.propertyType },
                  { label: 'İlan Türü', value: listing.listingType },
                  { label: 'Şehir', value: listing.city ?? '—' },
                  { label: 'Alan', value: listing.area ? `${listing.area} m²` : '—' },
                  { label: 'Oda Sayısı', value: listing.rooms ?? '—' },
                  { label: 'Bina Yaşı', value: listing.buildingAge ? `${listing.buildingAge} yıl` : '—' },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-0.5">{String(row.value)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers/bids */}
            {offerCount > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#00C49F]" />
                  <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">Gelen Teklifler</h2>
                </div>
                <div className="divide-y divide-gray-50">
                  {listing.offers.map((offer, idx) => (
                    <div key={offer.id} className="flex items-center gap-4 px-6 py-3">
                      <span className="text-xs font-black text-gray-300 w-5">{idx + 1}</span>
                      <span className="text-sm font-semibold text-gray-800">{offer.user.name ?? '—'}</span>
                      <span className={`ml-auto text-sm font-bold ${idx === 0 ? 'text-[#00C49F]' : 'text-gray-600'}`}>
                        {formatPrice(offer.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-amber-600" />
                <p className="text-xs font-bold text-amber-700">En Yüksek Teklif</p>
              </div>
              <p className="text-2xl font-black text-gray-900 font-mono">{formatPrice(highestOffer)}</p>
              <p className="text-xs text-gray-500 mt-1">{offerCount} teklif</p>
            </div>

            <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5">
              <ShieldCheck size={20} className="text-[#00C49F] mb-2" />
              <p className="text-xs font-bold text-gray-800">Sovereign Verified</p>
              <p className="text-[10px] text-gray-400 mt-0.5">İlan doğrulanmış ve kayıtlıdır.</p>
            </div>

            <Link href={`/listing/${listing.id}`}
              className="flex items-center justify-center gap-2 py-3 bg-[#00C49F] text-white text-sm font-semibold rounded-xl hover:bg-[#00B090] transition-colors">
              İlan Detayını Gör
            </Link>

            <Link href="/listings"
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              <ArrowLeft size={14} /> Tüm İlanlar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
