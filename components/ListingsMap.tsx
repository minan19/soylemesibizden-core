'use client';

import { useEffect, useRef } from 'react';

interface MapListing {
  id: string;
  title: string;
  priceAmount: number;
  location: string | null;
  propertyType: string;
  status: string;
}

interface Props {
  listings: MapListing[];
}

// Türkiye şehirleri için yaklaşık koordinatlar
const CITY_COORDS: Record<string, [number, number]> = {
  'istanbul': [41.0082, 28.9784],
  'beşiktaş': [41.0422, 29.0099],
  'kadıköy': [40.9827, 29.0274],
  'sarıyer': [41.1694, 29.0511],
  'beylikdüzü': [40.9835, 28.6522],
  'şişli': [41.0616, 28.9876],
  'üsküdar': [41.0225, 29.0106],
  'moda': [40.9810, 29.0330],
  'ankara': [39.9334, 32.8597],
  'çankaya': [39.9042, 32.8625],
  'izmir': [38.4237, 27.1428],
  'bodrum': [37.0344, 27.4305],
  'muğla': [37.2153, 28.3636],
  'urla': [38.3199, 26.7610],
  'çanakkale': [40.1553, 26.4142],
  'antalya': [36.8969, 30.7133],
  'bursa': [40.1826, 29.0665],
  'konya': [37.8746, 32.4932],
};

function getCoords(location: string | null): [number, number] {
  if (!location) return [39.9334 + (Math.random() - 0.5) * 2, 32.8597 + (Math.random() - 0.5) * 3];
  const lower = location.toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (lower.includes(city)) {
      return [
        coords[0] + (Math.random() - 0.5) * 0.02,
        coords[1] + (Math.random() - 0.5) * 0.02,
      ];
    }
  }
  // Türkiye ortası + random offset
  return [39.9334 + (Math.random() - 0.5) * 4, 32.8597 + (Math.random() - 0.5) * 6];
}

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(1) + 'Mlr ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(1) + 'M ₺';
  return (val / 1e3).toFixed(0) + 'K ₺';
}

function getPriceColor(val: number): string {
  if (val < 2_000_000) return '#00C49F';
  if (val < 10_000_000) return '#3B82F6';
  if (val < 50_000_000) return '#F59E0B';
  return '#EF4444';
}

export default function ListingsMap({ listings }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Leaflet'i dinamik import et (SSR güvenli)
    import('leaflet').then((L) => {
      // Leaflet default icon düzeltmesi
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: [39.5, 32.5],
        zoom: 6,
        zoomControl: true,
      });
      mapInstanceRef.current = map;

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Her ilan için marker ekle
      listings.forEach((listing) => {
        const coords = getCoords(listing.location);
        const color = getPriceColor(listing.priceAmount);

        // Custom HTML marker
        const markerHtml = `
          <div style="
            background: ${color};
            color: white;
            padding: 4px 8px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 900;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 2px solid white;
            cursor: pointer;
          ">
            ${formatCurrency(listing.priceAmount)}
          </div>
        `;

        const icon = L.divIcon({
          html: markerHtml,
          className: '',
          iconAnchor: [0, 0],
        });

        const marker = L.marker(coords, { icon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; min-width: 180px;">
            <p style="font-size: 11px; font-weight: 900; margin: 0 0 4px 0; color: #0F172A;">${listing.title}</p>
            <p style="font-size: 10px; color: #94A3B8; margin: 0 0 8px 0;">${listing.location ?? 'Konum belirtilmemiş'}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 13px; font-weight: 900; color: ${color};">${formatCurrency(listing.priceAmount)}</span>
              <span style="font-size: 9px; font-weight: 900; background: #F0FDF8; color: #00C49F; padding: 2px 8px; border-radius: 20px;">${listing.status}</span>
            </div>
            <a href="/listing/${listing.id}" style="display: block; margin-top: 10px; text-align: center; background: #0F172A; color: white; padding: 6px; border-radius: 8px; font-size: 10px; font-weight: 900; text-decoration: none;">
              Detay Gör →
            </a>
          </div>
        `, { maxWidth: 220 });
      });

      // Tüm markerları kapsayacak şekilde zoom
      if (listings.length > 1) {
        const group = new L.FeatureGroup(
          listings.map((l) => L.marker(getCoords(l.location)))
        );
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }).catch(console.error);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative rounded-[32px] overflow-hidden border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
      {/* Leaflet CSS */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      {/* Map Container */}
      <div ref={mapRef} style={{ height: '560px', width: '100%' }} />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border border-gray-100">
        <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase mb-3">Fiyat Skalası</p>
        {[
          { label: '< 2M ₺', color: '#00C49F' },
          { label: '2M–10M ₺', color: '#3B82F6' },
          { label: '10M–50M ₺', color: '#F59E0B' },
          { label: '> 50M ₺', color: '#EF4444' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 mb-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-[10px] font-semibold text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Count Badge */}
      <div className="absolute top-4 right-4 z-[1000] bg-[#0F172A] text-white px-4 py-2 rounded-full text-[11px] font-black">
        {listings.length} İlan
      </div>
    </div>
  );
}
