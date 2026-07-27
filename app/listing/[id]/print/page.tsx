import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import { MapPin, BedDouble, Bath, Maximize2, Layers, Calendar, Building2, Car, Leaf, Phone, Mail, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

function fmt(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function ListingPrintPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { owner: { select: { name: true, email: true, phone: true } } },
  });

  if (!listing) notFound();

  const locationParts = [listing.neighborhood, listing.district, listing.city].filter(Boolean);
  const fullLocation = locationParts.length > 0 ? locationParts.join(', ') : (listing.location ?? '');
  const pricePerM2 = listing.area && listing.area > 0 ? listing.price / listing.area : null;

  const details = [
    { label: 'Oda', value: listing.rooms != null ? `${listing.rooms}+1` : '—', icon: <BedDouble size={14} /> },
    { label: 'Banyo', value: listing.bathrooms != null ? String(listing.bathrooms) : '—', icon: <Bath size={14} /> },
    { label: 'Alan', value: listing.area != null ? `${listing.area} m²` : '—', icon: <Maximize2 size={14} /> },
    { label: 'Kat', value: listing.floor != null ? (listing.totalFloors ? `${listing.floor}/${listing.totalFloors}` : String(listing.floor)) : '—', icon: <Layers size={14} /> },
    { label: 'Bina Yaşı', value: listing.buildingAge != null ? `${listing.buildingAge} yıl` : '—', icon: <Calendar size={14} /> },
    { label: 'Asansör', value: listing.hasElevator ? 'Var' : 'Yok', icon: <Building2 size={14} /> },
    { label: 'Otopark', value: listing.hasParking ? 'Var' : 'Yok', icon: <Car size={14} /> },
    { label: 'Bahçe', value: listing.hasGarden ? 'Var' : 'Yok', icon: <Leaf size={14} /> },
  ];

  return (
    <html lang="tr">
      <head>
        <title>{listing.title} — Söylemesi Bizden</title>
        <style>{`
          @media print {
            @page { margin: 1.5cm; size: A4; }
            body { font-family: system-ui, sans-serif; color: #111; background: white; }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
          }
          body { font-family: system-ui, -apple-system, sans-serif; margin: 0; padding: 0; color: #111; background: white; }
        `}</style>
      </head>
      <body>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>

          {/* Print button */}
          <div className="no-print" style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => window.print()}
              style={{ padding: '8px 20px', background: '#00C49F', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
            >
              Yazdır / PDF
            </button>
            <a href={`/listing/${listing.id}`} style={{ padding: '8px 20px', border: '1px solid #e5e7eb', borderRadius: '8px', fontWeight: 600, fontSize: '13px', textDecoration: 'none', color: '#374151' }}>
              ← İlana Dön
            </a>
          </div>

          {/* Header */}
          <div style={{ borderBottom: '2px solid #00C49F', paddingBottom: '16px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#00C49F', textTransform: 'uppercase', marginBottom: '4px' }}>
                  SÖYLEMESİ BİZDEN · {listing.listingType} · {listing.propertyType}
                  {listing.isVerified && <span style={{ marginLeft: '8px', color: '#00C49F' }}>✓ DOĞRULANMIŞ</span>}
                </div>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111', lineHeight: 1.2 }}>{listing.title}</h1>
                {fullLocation && (
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    📍 {fullLocation}
                  </div>
                )}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '28px', fontWeight: 900, color: '#00C49F' }}>{fmt(listing.price)}</div>
                {pricePerM2 && (
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                    {fmt(pricePerM2)} / m²
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main photo */}
          {listing.photos.length > 0 && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={listing.photos[0]}
              alt={listing.title}
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
            />
          )}

          {/* Photo strip */}
          {listing.photos.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {listing.photos.slice(1, 5).map((photo, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={photo}
                  alt={`Foto ${i + 2}`}
                  style={{ width: 'calc(25% - 6px)', height: '100px', objectFit: 'cover', borderRadius: '6px' }}
                />
              ))}
            </div>
          )}

          {/* Details grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '20px' }}>
            {details.map(d => (
              <div key={d.label} style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{d.label}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{d.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: '#00C49F', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>Açıklama</div>
            <p style={{ margin: 0, fontSize: '13px', color: '#374151', lineHeight: 1.7 }}>{listing.description}</p>
          </div>

          {/* Contact */}
          <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>İlan Sahibi</div>
              <div style={{ fontWeight: 700, color: '#111', fontSize: '14px' }}>{listing.owner.name ?? 'İsimsiz'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{listing.owner.email}</div>
              {listing.owner.phone && (
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{listing.owner.phone}</div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '2px' }}>Referans No</div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#374151' }}>{listing.id}</div>
              <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>
                {new Date(listing.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div style={{ fontSize: '10px', color: '#00C49F', marginTop: '4px', fontWeight: 700 }}>
                soylemesibizden-core.vercel.app
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
