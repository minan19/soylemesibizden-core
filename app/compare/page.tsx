import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle, MapPin, Bed, Bath, Maximize2, Layers, Building2, CalendarDays, ArrowRight, Star, Eye } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { ids?: string };
}) {
  const ids = searchParams.ids?.split(',').filter(Boolean).slice(0, 4) ?? [];

  const listings = ids.length > 0
    ? await prisma.listing.findMany({
        where: { id: { in: ids } },
        include: { owner: { select: { name: true, email: true } } },
      })
    : [];

  const statusLabel: Record<string, string> = {
    ACTIVE: 'AKTİF', SOLD: 'SATILDI', PENDING: 'BEKLEMEDE',
  };
  const statusColor: Record<string, string> = {
    ACTIVE: 'text-[#00C49F]', SOLD: 'text-gray-400', PENDING: 'text-amber-500',
  };

  type Row = {
    label: string;
    render: (l: typeof listings[number]) => React.ReactNode;
  };

  const rows: Row[] = [
    {
      label: 'Durum',
      render: l => (
        <span className={`font-bold ${statusColor[l.status] ?? 'text-gray-600'}`}>
          {statusLabel[l.status] ?? l.status}
        </span>
      ),
    },
    { label: 'İlan Türü', render: l => l.listingType ?? '—' },
    { label: 'Mülk Tipi', render: l => l.propertyType ?? '—' },
    {
      label: 'Fiyat (₺)',
      render: l => (
        <span className="font-bold font-mono text-gray-900 text-lg">
          {l.price.toLocaleString('tr-TR')}
        </span>
      ),
    },
    {
      label: 'Konum',
      render: l =>
        l.location || l.city ? (
          <span className="flex items-center gap-1 text-gray-600">
            <MapPin size={12} /> {l.location ?? l.city}
          </span>
        ) : (
          '—'
        ),
    },
    { label: 'Şehir', render: l => l.city ?? '—' },
    { label: 'İlçe', render: l => l.district ?? '—' },
    {
      label: 'Oda Sayısı',
      render: l =>
        l.rooms != null ? (
          <span className="flex items-center gap-1">
            <Bed size={13} className="text-gray-400" /> {l.rooms}+1
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Banyo',
      render: l =>
        l.bathrooms != null ? (
          <span className="flex items-center gap-1">
            <Bath size={13} className="text-gray-400" /> {l.bathrooms}
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Alan (m²)',
      render: l =>
        l.area != null ? (
          <span className="flex items-center gap-1">
            <Maximize2 size={13} className="text-gray-400" /> {l.area} m²
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Fiyat/m²',
      render: l =>
        l.area && l.area > 0 ? (
          <span className="font-mono font-semibold text-[#00C49F]">
            ₺ {Math.round(l.price / l.area).toLocaleString('tr-TR')}
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Kat',
      render: l =>
        l.floor != null ? (
          <span className="flex items-center gap-1">
            <Layers size={13} className="text-gray-400" /> {l.floor}. Kat
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Toplam Kat',
      render: l => (l.totalFloors != null ? `${l.totalFloors} Kat` : '—'),
    },
    {
      label: 'Bina Yaşı',
      render: l =>
        l.buildingAge != null ? (
          <span className="flex items-center gap-1">
            <CalendarDays size={13} className="text-gray-400" /> {l.buildingAge} Yıl
          </span>
        ) : (
          '—'
        ),
    },
    {
      label: 'Asansör',
      render: l =>
        l.hasElevator ? (
          <CheckCircle2 size={16} className="text-[#00C49F]" />
        ) : (
          <XCircle size={16} className="text-gray-300" />
        ),
    },
    {
      label: 'Otopark',
      render: l =>
        l.hasParking ? (
          <CheckCircle2 size={16} className="text-[#00C49F]" />
        ) : (
          <XCircle size={16} className="text-gray-300" />
        ),
    },
    {
      label: 'Bahçe',
      render: l =>
        l.hasGarden ? (
          <CheckCircle2 size={16} className="text-[#00C49F]" />
        ) : (
          <XCircle size={16} className="text-gray-300" />
        ),
    },
    {
      label: 'Onaylı',
      render: l =>
        l.isVerified ? (
          <CheckCircle2 size={16} className="text-[#00C49F]" />
        ) : (
          <XCircle size={16} className="text-gray-300" />
        ),
    },
    {
      label: 'Görüntülenme',
      render: l => (
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Eye size={12} className="text-gray-300" /> {l.views.toLocaleString('tr-TR')}
        </span>
      ),
    },
    {
      label: 'İlan Sahibi',
      render: l => (
        <Link href={`/user/${l.ownerId}`} className="text-xs text-[#00C49F] hover:underline">
          {l.owner.name ?? l.owner.email}
        </Link>
      ),
    },
  ];

  // Best deal by price per m²
  const withPpm2 = listings.filter(l => l.area && l.area > 0).map(l => ({ ...l, ppm2: l.price / (l.area!) }));
  const bestDealId = withPpm2.length > 0 ? withPpm2.reduce((a, b) => a.ppm2 < b.ppm2 ? a : b).id : null;

  // Lowest price
  const lowestPriceId = listings.length > 0 ? listings.reduce((a, b) => a.price < b.price ? a : b).id : null;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        <div>
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3"
          >
            <ArrowLeft size={14} /> İlanlara Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Building2 size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">İlan Karşılaştırma</h1>
              <p className="text-xs text-gray-400 mt-0.5">
                {listings.length > 0
                  ? `${listings.length} ilan karşılaştırılıyor`
                  : 'URL\'ye ?ids=id1,id2 ekleyerek karşılaştır'}
              </p>
            </div>
          </div>
        </div>

        {listings.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-24 text-center">
            <Building2 size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Karşılaştırılacak ilan seçilmedi</p>
            <p className="text-gray-400 text-sm mt-1">
              URL&apos;ye <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">?ids=id1,id2</code> formatında ilan ID&apos;leri ekleyin
            </p>
            <Link
              href="/listings"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              İlanları Keşfet <ArrowRight size={15} />
            </Link>
          </div>
        )}

        {listings.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            {/* İlan başlık kartları */}
            <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: `200px repeat(${listings.length}, 1fr)` }}>
              <div className="p-5 bg-gray-50 border-r border-gray-100">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Özellik</p>
              </div>
              {listings.map(l => (
                <div key={l.id} className={`p-5 border-r last:border-r-0 border-gray-100 ${l.id === bestDealId ? 'bg-[#F0FDF8]' : ''}`}>
                  {/* Photo */}
                  <Link href={`/listing/${l.id}`} className="block mb-3">
                    <div className="w-full h-28 rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 relative">
                      {l.photos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={l.photos[0]} alt={l.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Building2 size={24} className="text-slate-300" />
                        </div>
                      )}
                      {l.id === bestDealId && (
                        <span className="absolute top-2 left-2 bg-[#00C49F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star size={9} fill="currentColor" /> EN İYİ DEĞER
                        </span>
                      )}
                      {l.id === lowestPriceId && l.id !== bestDealId && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                          EN UCUZ
                        </span>
                      )}
                    </div>
                  </Link>
                  <Link href={`/listing/${l.id}`} className="group">
                    <h2 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-[#00C49F] transition-colors mb-1">
                      {l.title}
                    </h2>
                    {(l.location || l.city) && (
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={10} /> {l.location ?? l.city}
                      </p>
                    )}
                    <p className="text-lg font-bold text-[#00C49F] mt-2">
                      {l.price.toLocaleString('tr-TR')} ₺
                    </p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Karşılaştırma satırları */}
            {rows.map((row, i) => (
              <div
                key={row.label}
                className={`grid border-b last:border-b-0 border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                style={{ gridTemplateColumns: `200px repeat(${listings.length}, 1fr)` }}
              >
                <div className="px-5 py-3.5 border-r border-gray-100 flex items-center">
                  <span className="text-xs font-semibold text-gray-500">{row.label}</span>
                </div>
                {listings.map(l => (
                  <div key={l.id} className="px-5 py-3.5 border-r last:border-r-0 border-gray-50 flex items-center">
                    <span className="text-sm text-gray-700">{row.render(l)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {listings.length > 0 && (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${listings.length}, 1fr)` }}
          >
            {listings.map(l => (
              <Link
                key={l.id}
                href={`/listing/${l.id}`}
                className="flex items-center justify-center gap-2 py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
              >
                İlana Git <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
