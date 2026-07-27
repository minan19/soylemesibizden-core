import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Home, Calculator } from 'lucide-react';
import ValuationForm from './ValuationForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Değerleme Aracı | Söylemesi Bizden' };

export default async function ValuationPage({
  searchParams,
}: {
  searchParams: { city?: string; propertyType?: string; rooms?: string; area?: string; listingType?: string };
}) {
  const { city, propertyType, rooms, area, listingType } = searchParams;

  const hasQuery = city && propertyType && area;

  let comparables: Array<{
    id: string;
    title: string;
    price: number;
    area: number | null;
    rooms: number | null;
    city: string | null;
    neighborhood: string | null;
    listingType: string;
    propertyType: string;
    pricePerSqm: number | null;
  }> = [];

  let estimate: { min: number; avg: number; max: number } | null = null;

  if (hasQuery) {
    const areaNum = parseFloat(area!);
    const roomsNum = rooms ? parseInt(rooms) : undefined;

    const where = {
      status: 'ACTIVE',
      city: { contains: city!, mode: 'insensitive' as const },
      propertyType: propertyType!,
      ...(listingType ? { listingType } : {}),
      area: {
        gte: areaNum * 0.5,
        lte: areaNum * 1.5,
      },
      ...(roomsNum ? { rooms: { gte: roomsNum - 1, lte: roomsNum + 1 } } : {}),
    };

    const raw = await prisma.listing.findMany({
      where,
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        price: true,
        area: true,
        rooms: true,
        city: true,
        neighborhood: true,
        listingType: true,
        propertyType: true,
      },
    });

    comparables = raw.map(l => ({
      ...l,
      pricePerSqm: l.area && l.area > 0 ? Math.round(l.price / l.area) : null,
    }));

    if (comparables.length >= 2) {
      const prices = comparables.map(c => c.price);
      const sorted = [...prices].sort((a, b) => a - b);
      const avg = Math.round(sorted.reduce((s, p) => s + p, 0) / sorted.length);
      const min = Math.round(sorted[0] * 0.9);
      const max = Math.round(sorted[sorted.length - 1] * 1.1);
      estimate = { min, avg, max };
    }
  }

  function formatPrice(n: number) {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Calculator size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Değerleme Aracı</h1>
              <p className="text-xs text-gray-400 mt-0.5">Gerçek piyasa verisine dayalı mülk değerleme</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <ValuationForm
          defaultCity={city}
          defaultPropertyType={propertyType}
          defaultRooms={rooms}
          defaultArea={area}
          defaultListingType={listingType}
        />

        {/* Results */}
        {hasQuery && (
          <div className="space-y-6">
            {/* Estimate */}
            {estimate ? (
              <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-[#00C49F]" />
                  <h2 className="text-sm font-bold text-gray-800">Tahmini Piyasa Değeri</h2>
                  <span className="text-xs text-gray-400">({comparables.length} benzer ilana göre)</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-amber-50 rounded-xl">
                    <p className="text-xs text-amber-600 font-semibold mb-1">MİN</p>
                    <p className="text-lg font-bold text-amber-700">{formatPrice(estimate.min)}</p>
                  </div>
                  <div className="text-center p-4 bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20">
                    <p className="text-xs text-[#00C49F] font-semibold mb-1">ORTALAMA</p>
                    <p className="text-xl font-bold text-[#00C49F]">{formatPrice(estimate.avg)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-xs text-blue-600 font-semibold mb-1">MAKS</p>
                    <p className="text-lg font-bold text-blue-700">{formatPrice(estimate.max)}</p>
                  </div>
                </div>
                {area && (
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Ortalama m² fiyatı: <strong className="text-gray-600">{formatPrice(Math.round(estimate.avg / parseFloat(area)))}/m²</strong>
                  </p>
                )}
              </div>
            ) : (
              hasQuery && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                  <Home size={28} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">Yeterli karşılaştırılabilir ilan bulunamadı.</p>
                  <p className="text-xs text-gray-400 mt-1">Farklı şehir veya mülk tipi deneyin.</p>
                </div>
              )
            )}

            {/* Comparable listings */}
            {comparables.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-50">
                  <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
                    Karşılaştırılabilir İlanlar
                  </h2>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-5 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">İlan</th>
                      <th className="px-5 py-3 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">Oda</th>
                      <th className="px-5 py-3 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">m²</th>
                      <th className="px-5 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">Fiyat</th>
                      <th className="px-5 py-3 text-right text-[9px] font-bold text-gray-400 uppercase tracking-widest">₺/m²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {comparables.map(c => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <Link href={`/listing/${c.id}`} className="text-sm font-semibold text-gray-800 hover:text-[#00C49F] transition-colors line-clamp-1">
                            {c.title}
                          </Link>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {c.city}{c.neighborhood ? ` · ${c.neighborhood}` : ''} · {c.listingType}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-center text-sm text-gray-600">{c.rooms ?? '—'}</td>
                        <td className="px-5 py-4 text-center text-sm text-gray-600">{c.area ? `${c.area} m²` : '—'}</td>
                        <td className="px-5 py-4 text-right text-sm font-bold text-[#00C49F]">{formatPrice(c.price)}</td>
                        <td className="px-5 py-4 text-right text-xs text-gray-500">
                          {c.pricePerSqm ? formatPrice(c.pricePerSqm) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center">
          Değerleme, platformdaki aktif ilanlar baz alınarak hesaplanır. Profesyonel ekspertiz yerine geçmez.
        </p>
      </div>
    </main>
  );
}
