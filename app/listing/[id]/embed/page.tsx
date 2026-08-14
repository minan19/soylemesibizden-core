import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, BedDouble, Maximize2, ExternalLink, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ListingEmbedPage({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    select: {
      id: true, title: true, price: true, city: true, district: true, neighborhood: true,
      location: true, rooms: true, area: true, listingType: true, propertyType: true,
      isVerified: true, photos: true, status: true,
    },
  });

  if (!listing) notFound();
  if (listing.status !== 'ACTIVE') notFound();

  const locationParts = [listing.neighborhood, listing.district, listing.city].filter(Boolean);
  const loc = locationParts.join(', ') || listing.location || '';
  const photo = listing.photos[0];
  const listingUrl = `https://soylemesibizden-core.vercel.app/listing/${listing.id}`;

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
        <title>{listing.title}</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; }
          .card { display: flex; flex-direction: column; height: 100vh; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; }
          .photo { width: 100%; height: 160px; object-fit: cover; background: #f3f4f6; }
          .photo-placeholder { width: 100%; height: 160px; background: linear-gradient(135deg, #f0fdf8, #e0faf3); display: flex; align-items: center; justify-content: center; color: #00C49F; font-size: 32px; }
          .body { padding: 14px; flex: 1; display: flex; flex-direction: column; gap: 8px; }
          .badges { display: flex; gap: 6px; flex-wrap: wrap; }
          .badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 20px; letter-spacing: 0.05em; }
          .badge-type { background: #eff6ff; color: #2563eb; }
          .badge-prop { background: #f0fdf8; color: #00C49F; }
          .badge-verified { background: #f0fdf8; color: #00C49F; border: 1px solid rgba(0,196,159,0.3); }
          .title { font-size: 14px; font-weight: 700; color: #111827; line-height: 1.4; }
          .loc { font-size: 11px; color: #9ca3af; display: flex; align-items: center; gap: 4px; }
          .specs { display: flex; gap: 10px; font-size: 11px; color: #6b7280; }
          .price { font-size: 20px; font-weight: 800; color: #111827; font-family: monospace; }
          .footer { padding: 10px 14px; border-top: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; }
          .brand { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; color: #d1d5db; }
          .cta { display: inline-flex; align-items: center; gap: 5px; padding: 6px 14px; background: #00C49F; color: white; border-radius: 8px; font-size: 11px; font-weight: 700; text-decoration: none; }
          .cta:hover { background: #00a882; }
        `}</style>
      </head>
      <body>
        <div className="card">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt={listing.title} className="photo" />
          ) : (
            <div className="photo-placeholder">🏠</div>
          )}

          <div className="body">
            <div className="badges">
              <span className="badge badge-type">{listing.listingType}</span>
              <span className="badge badge-prop">{listing.propertyType}</span>
              {listing.isVerified && <span className="badge badge-verified">✓ DOĞRULANMIŞ</span>}
            </div>

            <p className="title">{listing.title}</p>

            {loc && (
              <p className="loc">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {loc}
              </p>
            )}

            <div className="specs">
              {listing.rooms != null && <span>🛏 {listing.rooms} oda</span>}
              {listing.area != null && <span>📐 {listing.area} m²</span>}
            </div>

            <p className="price">₺ {listing.price.toLocaleString('tr-TR')}</p>
          </div>

          <div className="footer">
            <span className="brand">SÖYLEMESİBİZDEN</span>
            <a href={listingUrl} target="_blank" rel="noopener noreferrer" className="cta">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              İlanı Gör
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
