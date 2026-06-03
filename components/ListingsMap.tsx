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

// Türkiye şehirleri ve mahalleleri için koordinatlar
const CITY_COORDS: Record<string, [number, number]> = {
  // İstanbul Avrupa
  'istanbul': [41.0082, 28.9784],
  'beşiktaş': [41.0422, 29.0099],
  'bebek': [41.0530, 29.0170],
  'ortaköy': [41.0392, 29.0254],
  'akatlar': [41.0350, 29.0080],
  'etiler': [41.0280, 29.0010],
  'nişantaşı': [41.0480, 29.0050],
  'taksim': [41.0373, 29.0125],
  'şişli': [41.0616, 28.9876],
  'cihangir': [41.0450, 29.0170],
  'kaköy': [41.0245, 29.0245],
  'ulus': [41.0512, 29.0288],
  'teşvikiye': [41.0380, 29.0180],
  'yeniköy': [41.1580, 29.0550],

  // İstanbul Anadolu
  'kadıköy': [40.9827, 29.0274],
  'moda': [40.9810, 29.0330],
  'acıbadem': [40.9750, 29.0290],
  'bağdat': [40.9850, 29.0450],
  'sarıyer': [41.1694, 29.0511],
  'rumelihisarı': [41.1395, 29.0618],
  'bakırköy': [40.9812, 28.8804],
  'florya': [40.9750, 28.8201],
  'bahçelievler': [41.0054, 28.8754],
  'zeytinburnu': [41.0086, 28.9101],
  'ataköy': [40.9915, 28.8290],
  'maslak': [41.1186, 29.0098],

  // Ankara
  'ankara': [39.9334, 32.8597],
  'çankaya': [39.9042, 32.8625],

  // İzmir
  'izmir': [38.4237, 27.1428],
  'konak': [38.4237, 27.1428],
  'alsancak': [38.4263, 27.1365],
  'göztepe': [38.4512, 27.1698],
  'çeşme': [38.3219, 26.3029],
  'alacati': [38.3976, 26.1549],

  // Muğla
  'muğla': [37.2153, 28.3636],
  'bodrum': [37.0344, 27.4305],
  'yalikavak': [37.0748, 27.5113],
  'türkbükü': [37.0611, 27.6268],
  'marmaris': [37.2485, 28.2766],
  'içmeler': [37.2680, 28.2925],
  'fethiye': [36.6189, 29.1188],
  'ölüdeniz': [36.6254, 29.1287],

  // Antalya
  'antalya': [36.8969, 30.7133],
  'kemer': [36.5928, 30.5639],
  'alanya': [36.5440, 31.9954],

  // Bursa
  'bursa': [40.1826, 29.0665],

  // Konya
  'konya': [37.8746, 32.4932],

  // Diğer
  'nevşehir': [38.6939, 34.7257],
  'göreme': [38.7432, 34.8269],
  'fatih': [41.0087, 28.9611],
  'topkapi': [41.0206, 28.9292],
  'sultanahmet': [41.0056, 28.9764],
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
