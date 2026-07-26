import { prisma } from '@/lib/prisma';
import { Shield, TrendingUp, DollarSign, List } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    maximumFractionDigits: 0,
  }).format(price);
}

function maskName(name: string | null | undefined): string {
  if (!name) return '***';
  return name.substring(0, 3) + '***';
}

export default async function DarkPoolPage() {
  const highValueListings = await prisma.listing.findMany({
    where: { status: 'ACTIVE', price: { gte: 5000000 } },
    orderBy: { price: 'desc' },
    take: 10,
    include: { owner: { select: { name: true, email: true } } },
  });

  const totalValue = highValueListings.reduce((s, l) => s + l.price, 0);
  const maxPrice = highValueListings[0]?.price ?? 0;

  const propertyTypeLabel: Record<string, string> = {
    KONUT: 'Konut',
    TİCARİ: 'Ticari',
    ARAZI: 'Arazi',
    DEPO: 'Depo',
    OFİS: 'Ofis',
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dark header section */}
      <div className="bg-slate-900 text-white px-8 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={22} className="text-[#00C49F]" />
          <h1 className="text-2xl font-bold tracking-widest uppercase">
            Dark Pool Terminal
          </h1>
        </div>
        <p className="text-slate-400 text-sm tracking-wide">
          Yüksek değerli ve kurumsal ilanlar — ≥ ₺5.000.000
        </p>
      </div>

      {/* Main content */}
      <div className="p-8">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <List size={16} className="text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Listede</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{highValueListings.length}</p>
            <p className="text-xs text-gray-400 mt-1">aktif ilan</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={16} className="text-[#00C49F]" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Toplam Değer</p>
            </div>
            <p className="text-2xl font-bold text-[#00C49F] leading-tight">{formatPrice(totalValue)}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Maks Fiyat</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 leading-tight">{formatPrice(maxPrice)}</p>
          </div>
        </div>

        {/* Table or empty state */}
        {highValueListings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <Shield size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">
              Henüz yüksek değerli ilan bulunmuyor (≥ ₺5M)
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Dark Pool&apos;a uygun aktif ilanlar burada görüntülenecektir.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-slate-900">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Kurumsal İlan Akışı
              </p>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Ünvan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Konum
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Fiyat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Tip
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Sahip
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {highValueListings.map((listing) => (
                  <tr
                    key={listing.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                        {listing.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {listing.city ?? listing.location ?? '—'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#00C49F] text-right whitespace-nowrap">
                      {formatPrice(listing.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                        {propertyTypeLabel[listing.propertyType] ?? listing.propertyType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono tracking-wider">
                      {maskName(listing.owner.name)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
