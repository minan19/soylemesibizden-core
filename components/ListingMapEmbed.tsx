'use client';

import { useState } from 'react';
import { MapPin, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  neighborhood?: string | null;
  district?: string | null;
  city?: string | null;
  location?: string | null;
}

export default function ListingMapEmbed({ neighborhood, district, city, location }: Props) {
  const [expanded, setExpanded] = useState(false);

  const addressParts = [neighborhood, district, city, 'Türkiye'].filter(Boolean);
  const query = (location || addressParts.join(', ')).trim();
  if (!query || addressParts.length < 2) return null;

  const encodedQ = encodeURIComponent(query);
  const embedSrc = `https://maps.google.com/maps?q=${encodedQ}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQ}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
            <MapPin size={16} className="text-[#00C49F]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Konum Haritası</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">{addressParts.join(', ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="hidden sm:flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline"
          >
            <ExternalLink size={12} />
            Google Maps
          </a>
          {expanded ? (
            <ChevronUp size={16} className="text-gray-400 shrink-0" />
          ) : (
            <ChevronDown size={16} className="text-gray-400 shrink-0" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="relative">
          <iframe
            title="Konum Haritası"
            src={embedSrc}
            className="w-full h-64 border-0"
            loading="lazy"
            allowFullScreen
          />
          <div className="absolute bottom-3 right-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white shadow-md px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-[#00C49F] transition-colors"
            >
              <ExternalLink size={11} />
              Büyük Haritada Gör
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
