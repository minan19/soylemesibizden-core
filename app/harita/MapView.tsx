'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import { X, MapPin, Maximize2, Bed, SlidersHorizontal, ChevronDown } from 'lucide-react';

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
  initialCity?: string;
  initialListingType?: string;
}

interface Popup {
  listing: MapListing;
  x: number;
  y: number;
}

const PROPERTY_TYPES = ['KONUT', 'TİCARİ', 'ARSA', 'ARAZI', 'DEVREMÜLKs'];

export default function MapView({ listings, initialCity, initialListingType }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('maplibre-gl').Map | null>(null);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [cityFilter, setCityFilter] = useState<string | null>(initialCity ?? null);
  const [listingTypeFilter, setListingTypeFilter] = useState<string | null>(initialListingType ?? null);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (cityFilter && !l.city?.toLowerCase().includes(cityFilter.toLowerCase())) return false;
      if (listingTypeFilter && l.listingType !== listingTypeFilter) return false;
      if (propertyTypeFilter && l.propertyType !== propertyTypeFilter) return false;
      return true;
    });
  }, [listings, cityFilter, listingTypeFilter, propertyTypeFilter]);

  const cityCount = useMemo(() => {
    const map = new Map<string, number>();
    listings.forEach(l => {
      if (l.city) map.set(l.city, (map.get(l.city) ?? 0) + 1);
    });
    return map;
  }, [listings]);

  const cities = useMemo(() =>
    Array.from(new Set(listings.map(l => l.city).filter(Boolean)))
      .sort((a, b) => (cityCount.get(b!) ?? 0) - (cityCount.get(a!) ?? 0))
      .slice(0, 15) as string[]
  , [listings, cityCount]);

  const buildFeatures = (source: MapListing[]): GeoJSON.Feature<GeoJSON.Point>[] => {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
    for (const listing of source) {
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
    return features;
  };

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let map: import('maplibre-gl').Map;

    import('maplibre-gl').then(maplibre => {
      const initialCenter: [number, number] = initialCity
        ? (getCityCoords(initialCity) ?? [35.2433, 38.9637])
        : [35.2433, 38.9637];
      const initialZoom = initialCity ? 10 : 5.5;

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
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 4,
        maxZoom: 16,
      });

      mapRef.current = map;

      map.on('load', () => {
        setLoaded(true);

        map.addSource('listings', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: buildFeatures(filtered) },
          cluster: true,
          clusterMaxZoom: 10,
          clusterRadius: 45,
        });

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

        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'listings',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'case',
              ['==', ['get', 'listingType'], 'KİRALIK'], '#8B5CF6',
              '#00C49F',
            ],
            'circle-radius': 10,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
          },
        });

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

        map.on('click', 'unclustered-point', (e) => {
          const props = e.features?.[0]?.properties;
          if (!props) return;
          const listingData = listings.find(l => l.id === props.id);
          if (!listingData) return;
          setPopup({ listing: listingData, x: e.point.x, y: e.point.y });
        });

        map.on('click', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point', 'clusters'] });
          if (!features.length) setPopup(null);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update data when filters change
  useEffect(() => {
    if (!mapRef.current || !loaded) return;
    const map = mapRef.current;
    const src = map.getSource('listings') as import('maplibre-gl').GeoJSONSource | undefined;
    if (!src) return;

    src.setData({ type: 'FeatureCollection', features: buildFeatures(filtered) });

    if (cityFilter) {
      const coords = getCityCoords(cityFilter);
      if (coords) map.easeTo({ center: coords, zoom: 10 });
    } else if (!listingTypeFilter && !propertyTypeFilter) {
      map.easeTo({ center: [35.2433, 38.9637], zoom: 5.5 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, loaded]);

  const mappedCount = filtered.filter(l => getCityCoords(l.city) !== null).length;

  const activeFilterCount = [cityFilter, listingTypeFilter, propertyTypeFilter].filter(Boolean).length;

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Controls bar */}
      <div className="shrink-0 bg-white border-b border-gray-100 px-4 py-2.5 flex items-center gap-3 flex-wrap">
        {/* Count */}
        <div className="flex items-center gap-1.5 shrink-0">
          <MapPin size={14} className="text-[#00C49F]" />
          <span className="text-sm font-semibold text-gray-700">{mappedCount} ilan</span>
        </div>

        {/* Listing type pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          {['SATILIK', 'KİRALIK'].map(lt => (
            <button
              key={lt}
              onClick={() => setListingTypeFilter(listingTypeFilter === lt ? null : lt)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full border transition-all ${
                listingTypeFilter === lt
                  ? lt === 'KİRALIK'
                    ? 'bg-violet-600 text-white border-violet-600'
                    : 'bg-[#00C49F] text-white border-[#00C49F]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
            >
              {lt}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-gray-200 shrink-0" />

        {/* City chips */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1.5 min-w-max">
            <button
              onClick={() => setCityFilter(null)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full border transition-all shrink-0 ${!cityFilter ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
            >
              Tümü
            </button>
            {cities.map(c => (
              <button
                key={c}
                onClick={() => setCityFilter(cityFilter === c ? null : c)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-full border transition-all shrink-0 ${cityFilter === c ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
              >
                {c}
                {cityCount.get(c) != null && (
                  <span className={`ml-1 ${cityFilter === c ? 'text-gray-300' : 'text-gray-400'}`}>
                    {cityCount.get(c)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-lg border transition-all ${showFilters || activeFilterCount > 0 ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
        >
          <SlidersHorizontal size={12} />
          Filtre
          {activeFilterCount > 0 && <span className="bg-[#00C49F] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">{activeFilterCount}</span>}
          <ChevronDown size={11} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Extended filter panel */}
      {showFilters && (
        <div className="shrink-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-wrap">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mülk Türü:</span>
          {PROPERTY_TYPES.map(pt => (
            <button
              key={pt}
              onClick={() => setPropertyTypeFilter(propertyTypeFilter === pt ? null : pt)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-full border transition-all ${propertyTypeFilter === pt ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
            >
              {pt}
            </button>
          ))}
          {(cityFilter || listingTypeFilter || propertyTypeFilter) && (
            <button
              onClick={() => { setCityFilter(null); setListingTypeFilter(null); setPropertyTypeFilter(null); }}
              className="ml-auto text-[11px] text-rose-500 font-bold hover:underline"
            >
              Tümünü Temizle
            </button>
          )}
        </div>
      )}

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

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow border border-gray-100 px-3 py-2 flex items-center gap-3 text-[11px] font-semibold text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#00C49F] inline-block" />
            Satılık
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
            Kiralık
          </span>
          <span className="flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-[#00C49F] border-2 border-white inline-flex items-center justify-center text-white text-[7px] font-black">N</span>
            Küme
          </span>
        </div>

        {/* Popup overlay */}
        {popup && (
          <div
            className="absolute z-20 w-72"
            style={{
              left: Math.min(popup.x + 12, (typeof window !== 'undefined' ? window.innerWidth : 800) - 300),
              top: Math.max(popup.y - 160, 8),
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
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${popup.listing.listingType === 'KİRALIK' ? 'bg-violet-100 text-violet-700' : 'bg-[#F0FDF8] text-[#00C49F]'}`}>
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
                    {[popup.listing.neighborhood, popup.listing.district, popup.listing.city].filter(Boolean).join(', ')}
                  </p>
                )}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  {popup.listing.rooms != null && (
                    <span className="flex items-center gap-1"><Bed size={11} /> {popup.listing.rooms}+1</span>
                  )}
                  {popup.listing.area != null && (
                    <span className="flex items-center gap-1"><Maximize2 size={11} /> {popup.listing.area} m²</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-gray-900 font-mono">
                      ₺ {popup.listing.price.toLocaleString('tr-TR')}
                    </span>
                    {popup.listing.area && popup.listing.area > 0 && (
                      <p className="text-[10px] text-gray-400">
                        {Math.round(popup.listing.price / popup.listing.area).toLocaleString('tr-TR')} ₺/m²
                      </p>
                    )}
                  </div>
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
