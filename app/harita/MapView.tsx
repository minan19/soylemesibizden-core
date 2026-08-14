'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { X, MapPin, Maximize2, Bed } from 'lucide-react';

/* Approximate city centers for major Turkish cities */
const CITY_COORDS: Record<string, [number, number]> = {
  'İstanbul': [28.9784, 41.0082],
  'Ankara': [32.8597, 39.9334],
  'İzmir': [27.1428, 38.4237],
  'Bursa': [29.0610, 40.1826],
  'Antalya': [30.7133, 36.8969],
  'Adana': [35.3213, 37.0000],
  'Gaziantep': [37.3781, 37.0662],
  'Konya': [32.4847, 37.8713],
  'Mersin': [34.6415, 36.8000],
  'Kayseri': [35.4826, 38.7312],
  'Eskişehir': [30.5206, 39.7767],
  'Diyarbakır': [40.2100, 37.9144],
  'Samsun': [36.3313, 41.2867],
  'Denizli': [29.0875, 37.7765],
  'Şanlıurfa': [38.7955, 37.1591],
  'Adapazarı': [30.3939, 40.7731],
  'Sakarya': [30.3939, 40.7731],
  'Malatya': [38.3552, 38.3552],
  'Kahramanmaraş': [36.9014, 37.5858],
  'Erzurum': [41.2749, 39.9208],
  'Van': [43.3798, 38.4891],
  'Trabzon': [39.7278, 41.0015],
  'Bodrum': [27.4292, 37.0344],
  'Marmaris': [28.2673, 36.8552],
  'Fethiye': [29.1167, 36.6521],
  'Alanya': [32.0000, 36.5436],
  'Kocaeli': [29.9187, 40.8533],
  'İzmit': [29.9187, 40.8533],
  'Muğla': [28.3665, 37.2153],
  'Hatay': [36.1658, 36.2021],
  'Manisa': [27.4284, 38.6191],
  'Afyonkarahisar': [30.5387, 38.7569],
  'Balıkesir': [27.8861, 39.6484],
  'Tekirdağ': [27.5138, 40.9781],
  'Kırıkkale': [33.5076, 39.8468],
  'İçel': [34.6415, 36.8000],
  'Aydın': [27.8451, 37.8444],
  'Çanakkale': [26.4043, 40.1553],
  'Edirne': [26.5557, 41.6818],
  'Kastamonu': [33.7749, 41.3887],
  'Zonguldak': [31.7928, 41.4564],
  'Artvin': [41.8183, 41.1828],
  'Nevşehir': [34.7239, 38.6939],
};

function getCityCoords(city: string | null | undefined): [number, number] | null {
  if (!city) return null;
  const key = Object.keys(CITY_COORDS).find(k =>
    k.toLowerCase() === city.toLowerCase() ||
    city.toLowerCase().includes(k.toLowerCase())
  );
  return key ? CITY_COORDS[key] : null;
}

export interface MapListing {
  id: string;
  title: string;
  price: number;
  city: string | null;
  district: string | null;
  neighborhood: string | null;
  listingType: string;
  propertyType: string;
  rooms: number | null;
  area: number | null;
  photos: string[];
  status: string;
}

interface Props {
  listings: MapListing[];
}

interface Popup {
  listing: MapListing;
  x: number;
  y: number;
}

export default function MapView({ listings }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('maplibre-gl').Map | null>(null);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [cityFilter, setCityFilter] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let map: import('maplibre-gl').Map;

    import('maplibre-gl').then(maplibre => {
      map = new maplibre.Map({
        container: mapContainer.current!,
        style: {
          version: 8,
          sources: {
            osm: {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors',
            },
          },
          layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
        },
        center: [35.2433, 38.9637],
        zoom: 5.5,
        minZoom: 4,
        maxZoom: 16,
      });

      mapRef.current = map;

      map.on('load', () => {
        setLoaded(true);

        // Build GeoJSON from listings with known city coords
        const features: GeoJSON.Feature<GeoJSON.Point>[] = [];

        for (const listing of listings) {
          const coords = getCityCoords(listing.city);
          if (!coords) continue;

          // Jitter to separate overlapping pins
          const jitter = () => (Math.random() - 0.5) * 0.08;

          features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [coords[0] + jitter(), coords[1] + jitter()] },
            properties: {
              id: listing.id,
              title: listing.title,
              price: listing.price,
              city: listing.city,
              district: listing.district,
              listingType: listing.listingType,
              propertyType: listing.propertyType,
              rooms: listing.rooms,
              area: listing.area,
              photo: listing.photos[0] ?? null,
              status: listing.status,
            },
          });
        }

        map.addSource('listings', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features },
          cluster: true,
          clusterMaxZoom: 10,
          clusterRadius: 45,
        });

        // Cluster circles
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'listings',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': '#00C49F',
            'circle-radius': ['step', ['get', 'point_count'], 18, 5, 24, 20, 30],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.9,
          },
        });

        // Cluster count labels
        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'listings',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
          paint: { 'text-color': '#ffffff' },
        });

        // Individual listing pins
        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'listings',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#00C49F',
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
          },
        });

        // Expand cluster on click
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
          if (!features.length) return;
          const clusterId = features[0].properties?.cluster_id as number | undefined;
          if (clusterId == null) return;
          const src = map.getSource('listings') as import('maplibre-gl').GeoJSONSource;
          src.getClusterExpansionZoom(clusterId).then((zoom) => {
            const geo = features[0].geometry as GeoJSON.Point;
            map.easeTo({ center: geo.coordinates as [number, number], zoom: zoom ?? 8 });
          }).catch(() => {});
        });

        // Show popup on single-listing click
        map.on('click', 'unclustered-point', (e) => {
          const props = e.features?.[0]?.properties;
          if (!props) return;
          const listingData = listings.find(l => l.id === props.id);
          if (!listingData) return;
          const point = e.point;
          setPopup({ listing: listingData, x: point.x, y: point.y });
        });

        map.on('mouseenter', 'clusters', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'clusters', () => { map.getCanvas().style.cursor = ''; });
        map.on('mouseenter', 'unclustered-point', () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', 'unclustered-point', () => { map.getCanvas().style.cursor = ''; });
      });
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [listings]);

  // Update cluster data when cityFilter changes
  useEffect(() => {
    if (!mapRef.current || !loaded) return;
    const map = mapRef.current;
    const src = map.getSource('listings') as import('maplibre-gl').GeoJSONSource | undefined;
    if (!src) return;

    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
    const filtered = cityFilter ? listings.filter(l => l.city?.toLowerCase().includes(cityFilter.toLowerCase())) : listings;

    for (const listing of filtered) {
      const coords = getCityCoords(listing.city);
      if (!coords) continue;
      const jitter = () => (Math.random() - 0.5) * 0.08;
      features.push({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [coords[0] + jitter(), coords[1] + jitter()] },
        properties: {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          city: listing.city,
          district: listing.district,
          listingType: listing.listingType,
          propertyType: listing.propertyType,
          rooms: listing.rooms,
          area: listing.area,
          photo: listing.photos[0] ?? null,
          status: listing.status,
        },
      });
    }

    src.setData({ type: 'FeatureCollection', features });

    if (cityFilter) {
      const firstCoords = getCityCoords(cityFilter);
      if (firstCoords) map.easeTo({ center: firstCoords, zoom: 10 });
    } else {
      map.easeTo({ center: [35.2433, 38.9637], zoom: 5.5 });
    }
  }, [cityFilter, listings, loaded]);

  const cities = Array.from(new Set(listings.map(l => l.city).filter(Boolean))).sort() as string[];

  const mappedCount = listings.filter(l => getCityCoords(l.city) !== null).length;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Controls bar */}
      <div className="shrink-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-[#00C49F]" />
          <span className="text-sm font-semibold text-gray-700">{mappedCount} ilan haritada</span>
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setCityFilter(null)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${!cityFilter ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50'}`}
            >
              Tümü
            </button>
            {cities.slice(0, 12).map(c => (
              <button
                key={c}
                onClick={() => setCityFilter(cityFilter === c ? null : c)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${cityFilter === c ? 'bg-[#00C49F] text-white border-[#00C49F]' : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="flex-1 relative">
        <div ref={mapContainer} className="absolute inset-0" />

        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-[#00C49F] border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: '3px' }} />
              <p className="text-sm text-gray-500">Harita yükleniyor…</p>
            </div>
          </div>
        )}

        {/* Popup overlay */}
        {popup && (
          <div
            className="absolute z-20 w-72"
            style={{
              left: Math.min(popup.x + 12, window.innerWidth - 300),
              top: Math.max(popup.y - 140, 8),
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Photo */}
              <div className="relative w-full h-32 bg-gray-100">
                {popup.listing.photos[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={popup.listing.photos[0]} alt={popup.listing.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">Fotoğraf yok</div>
                )}
                <button
                  onClick={() => setPopup(null)}
                  className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X size={13} />
                </button>
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                    {popup.listing.listingType}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {popup.listing.propertyType}
                  </span>
                </div>
              </div>
              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-bold text-gray-900 line-clamp-1 mb-1">{popup.listing.title}</p>
                {popup.listing.city && (
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin size={10} />
                    {[popup.listing.district, popup.listing.city].filter(Boolean).join(', ')}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  {popup.listing.rooms != null && (
                    <span className="flex items-center gap-1"><Bed size={11} /> {popup.listing.rooms} oda</span>
                  )}
                  {popup.listing.area != null && (
                    <span className="flex items-center gap-1"><Maximize2 size={11} /> {popup.listing.area} m²</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900 font-mono">
                    ₺ {popup.listing.price.toLocaleString('tr-TR')}
                  </span>
                  <Link
                    href={`/listing/${popup.listing.id}`}
                    className="px-3 py-1.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-xs font-bold rounded-lg transition-colors"
                    onClick={() => setPopup(null)}
                  >
                    Detay →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
