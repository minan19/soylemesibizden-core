import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, MapPin, Activity, CheckCircle, XCircle, GitCompare } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut',
  COMMERCIAL: 'Ticari',
  LAND: 'Arsa',
  INDUSTRIAL: 'Endüstriyel',
};

const STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Aktif',
  PENDING: 'Beklemede',
  SOLD: 'Satıldı',
  WITHDRAWN: 'Geri Çekildi',
};

interface SearchParams {
  ids?: string;
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Auth guard — owner.email must not leak to unauthenticated users
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const rawIds = searchParams.ids ?? '';
  // Validate each segment looks like a Prisma CUID (26 alphanumeric chars) or UUID before DB query
  const cuidLike = /^[a-zA-Z0-9_-]{10,36}$/;
  const ids = rawIds
    .split(',')
    .map((s) => s.trim())
    .filter((s) => Boolean(s) && cuidLike.test(s))
    .slice(0, 3);

  if (ids.length < 2) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col items-center justify-center text-center px-8">
        <GitCompare size={56} className="text-gray-200 mb-8" />
        <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-3">
          Karşılaştırma
        </p>
        <h1 className="text-3xl font-black tracking-tighter text-[#0F172A] mb-4">
          En az 2 ilan seçin
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          İlanlar sayfasından "Karşılaştır" butonuna tıklayarak ilanları seçin.
        </p>
        <Link
          href="/listings"
          className="px-6 py-3 bg-[#00C49F] text-white text-[11px] font-black tracking-widest uppercase rounded-full hover:bg-[#00A887] transition-all"
        >
          İLANLARA GİT
        </Link>
      </div>
    );
  }

  const listings = await prisma.listing.findMany({
    where: { id: { in: ids } },
    include: {
      owner: { select: { name: true } },
      _count: { select: { offers: true } },
    },
  });

  if (listings.length < 2) notFound();

  // Sort by ids order
  const sorted = ids.map((id) => listings.find((l) => l.id === id)).filter(Boolean) as typeof listings;

  // Comparison rows
  type RowValue = { text: string; highlight: boolean; sub?: string; long?: boolean };

  // Use null for area=0 so it never wins the "En Düşük" m² comparison
  const pricePerM2 = sorted.map((l) => (l.area > 0 ? l.priceAmount / l.area : null));
  const validPerM2 = pricePerM2.filter((v): v is number => v !== null);
  const minPerM2 = validPerM2.length > 0 ? Math.min(...validPerM2) : null;

  // Guard lowestPrice against zero (prevents NaN% calculation)
  const positiveAmounts = sorted.map((l) => l.priceAmount).filter((p) => p > 0);
  const lowestPrice = positiveAmounts.length > 0 ? Math.min(...positiveAmounts) : 0;
  const highestOffers = Math.max(...sorted.map((l) => l._count.offers));

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link
          href="/listings"
          className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft size={14} />
          İlanlara Dön
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">
            INTEL KARŞILAŞTIRMA
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-[#0F172A]">
            İlan Karşılaştırma
            <span className="text-gray-300 text-2xl font-semibold ml-3">
              {sorted.length} ilan
            </span>
          </h1>
        </div>

        {/* Listing Header Cards */}
        <div className="grid mb-2" style={{ gridTemplateColumns: `200px repeat(${sorted.length}, 1fr)` }}>
          <div />
          {sorted.map((listing) => (
            <div
              key={listing.id}
              className="px-6 py-6 bg-white rounded-t-[28px] border border-b-0 border-gray-100 mx-1"
            >
              <span
                className={`text-[9px] font-black tracking-widest px-3 py-1 rounded-full uppercase mb-3 inline-block ${
                  listing.status === 'ACTIVE'
                    ? 'bg-[#F0FDF8] text-[#00C49F]'
                    : listing.status === 'SOLD'
                    ? 'bg-red-50 text-red-400'
                    : 'bg-yellow-50 text-yellow-500'
                }`}
              >
                {STATUS_LABELS[listing.status] ?? listing.status}
              </span>
              <h2 className="text-lg font-black tracking-tight mb-2 leading-snug">
                {listing.title}
              </h2>
              {listing.location && (
                <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
                  <MapPin size={11} /> {listing.location}
                </p>
              )}
              <Link
                href={`/listing/${listing.id}`}
                className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] hover:underline"
              >
                Detay Gör →
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="rounded-b-[28px] overflow-hidden border border-gray-100 shadow-sm mb-8">
          {(
            [
              {
                label: 'Fiyat',
                icon: '₺',
                values: sorted.map((l) => {
                  // Only show % delta when lowestPrice > 0 and this listing is not the cheapest
                  const isDiff = lowestPrice > 0 && l.priceAmount > lowestPrice;
                  const pct = isDiff
                    ? `+${(((l.priceAmount - lowestPrice) / lowestPrice) * 100).toFixed(1)}%`
                    : undefined;
                  return {
                    text: formatCurrency(l.priceAmount),
                    highlight: lowestPrice > 0 && l.priceAmount === lowestPrice,
                    sub: pct,
                  };
                }) as RowValue[],
              },
              {
                label: 'Alan',
                icon: '□',
                values: sorted.map((l) => ({
                  text: `${l.area.toLocaleString('tr-TR')} m²`,
                  highlight: false,
                })) as RowValue[],
              },
              {
                label: 'Fiyat / m²',
                icon: '÷',
                // minPerM2 hoisted — not recomputed per iteration
                values: pricePerM2.map((v) => ({
                  text: v !== null ? `${Math.round(v).toLocaleString('tr-TR')} ₺/m²` : '—',
                  highlight: v !== null && minPerM2 !== null && v === minPerM2,
                  sub: v !== null && minPerM2 !== null && v === minPerM2 ? 'En Düşük' : undefined,
                })) as RowValue[],
              },
              {
                label: 'Mülk Tipi',
                icon: '🏠',
                values: sorted.map((l) => ({
                  text: TYPE_LABELS[l.propertyType] ?? l.propertyType,
                  highlight: false,
                })) as RowValue[],
              },
              {
                label: 'Durum',
                icon: '●',
                values: sorted.map((l) => ({
                  text: STATUS_LABELS[l.status] ?? l.status,
                  highlight: l.status === 'ACTIVE',
                })) as RowValue[],
              },
              {
                label: 'Teklif Sayısı',
                icon: '📋',
                values: sorted.map((l) => ({
                  text: `${l._count.offers} teklif`,
                  highlight: l._count.offers === highestOffers && highestOffers > 0,
                  sub: l._count.offers === highestOffers && highestOffers > 0 ? 'En Fazla' : undefined,
                })) as RowValue[],
              },
              {
                label: 'İlan Sahibi',
                icon: '👤',
                values: sorted.map((l) => ({
                  text: l.owner?.name ?? '—',
                  highlight: false,
                })) as RowValue[],
              },
              {
                label: 'Açıklama',
                icon: '📝',
                values: sorted.map((l) => ({
                  text: l.description ? l.description.slice(0, 120) + (l.description.length > 120 ? '…' : '') : '—',
                  highlight: false,
                  long: true,
                })) as RowValue[],
              },
            ] as Array<{ label: string; icon: string; values: RowValue[] }>
          ).map((row, rowIdx) => (
            <div
              key={row.label}
              className={`grid items-stretch ${rowIdx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}`}
              style={{ gridTemplateColumns: `200px repeat(${sorted.length}, 1fr)` }}
            >
              {/* Row Label */}
              <div className="px-6 py-5 border-r border-gray-100 flex items-start gap-3">
                <span className="text-base">{row.icon}</span>
                <span className="text-[11px] font-black tracking-widest uppercase text-gray-400 pt-0.5">
                  {row.label}
                </span>
              </div>
              {/* Row Values */}
              {row.values.map((val, idx) => (
                <div
                  key={idx}
                  className={`px-6 py-5 border-r border-gray-100 last:border-r-0 ${
                    val.highlight ? 'bg-[#F0FDF8]' : ''
                  }`}
                >
                  <p
                    className={`font-bold ${
                      'long' in val && val.long
                        ? 'text-xs text-gray-500 leading-relaxed'
                        : 'text-sm text-[#0F172A]'
                    } ${val.highlight ? 'text-[#00C49F]' : ''}`}
                  >
                    {val.text}
                  </p>
                  {val.sub && (
                    <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mt-1">
                      {val.sub}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Verdict / Summary Row */}
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${sorted.length}, 1fr)` }}
        >
          {sorted.map((listing, i) => {
            const isLowest = lowestPrice > 0 && listing.priceAmount === lowestPrice;
            const isMostOffers = listing._count.offers === highestOffers && highestOffers > 0;
            const perM2 = pricePerM2[i];
            // minPerM2 already hoisted above — safe null check
            const bestPerM2 = perM2 !== null && minPerM2 !== null && perM2 === minPerM2;
            const pros = [
              isLowest && 'En düşük fiyat',
              isMostOffers && 'En fazla teklif',
              bestPerM2 && 'En iyi fiyat/m²',
              listing.status === 'ACTIVE' && 'Aktif ilan',
            ].filter(Boolean) as string[];

            return (
              <div
                key={listing.id}
                className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm"
              >
                <p className="text-[9px] font-black tracking-widest uppercase text-gray-400 mb-3">
                  Değerlendirme {i + 1}
                </p>
                <p className="text-sm font-bold text-[#0F172A] mb-4 leading-snug">
                  {listing.title}
                </p>
                <div className="space-y-2">
                  {pros.length > 0 ? (
                    pros.map((pro, pi) => (
                      <div key={pi} className="flex items-center gap-2">
                        <CheckCircle size={12} className="text-[#00C49F] shrink-0" />
                        <span className="text-[11px] font-semibold text-gray-600">{pro}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <XCircle size={12} className="text-gray-300 shrink-0" />
                      <span className="text-[11px] font-semibold text-gray-400">
                        Öne çıkan avantaj yok
                      </span>
                    </div>
                  )}
                </div>
                <Link
                  href={`/listing/${listing.id}`}
                  className="mt-5 block text-center px-4 py-2.5 bg-[#00C49F] text-white text-[10px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#00A887] transition-all"
                >
                  Teklif Ver
                </Link>
              </div>
            );
          })}
        </div>

        {/* Back CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft size={14} />
            Tüm İlanlar
          </Link>
        </div>
      </div>
    </div>
  );
}
