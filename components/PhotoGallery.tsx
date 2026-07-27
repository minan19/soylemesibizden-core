'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Building2, ImageOff } from 'lucide-react';

interface Props {
  photos: string[];
  title: string;
}

export default function PhotoGallery({ photos, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);

  const next = useCallback(() => {
    setLightboxIndex(i => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next]);

  if (photos.length === 0) {
    return (
      <div className="w-full h-72 rounded-3xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-400">
        <ImageOff size={44} strokeWidth={1.5} />
        <p className="text-sm font-medium">Fotoğraf eklenmemiş</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-2">
        {/* Main photo */}
        <button
          onClick={() => open(0)}
          className="group relative w-full h-[420px] rounded-3xl overflow-hidden bg-gray-100 block text-left"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[0]} alt={title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
            <span className="bg-white/90 rounded-full p-2 shadow-lg">
              <ZoomIn size={20} className="text-gray-700" />
            </span>
          </span>
          {photos.length > 1 && (
            <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              1 / {photos.length}
            </span>
          )}
        </button>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="grid grid-cols-3 gap-2">
            {photos.slice(1, 4).map((photo, i) => (
              <button
                key={i}
                onClick={() => open(i + 1)}
                className="relative h-36 rounded-2xl overflow-hidden bg-gray-100 group block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={`${title} fotoğraf ${i + 2}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {i === 2 && photos.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">+{photos.length - 4}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={close}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            onClick={close}
          >
            <X size={22} />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold">
            {lightboxIndex + 1} / {photos.length}
          </span>

          {/* Prev */}
          {photos.length > 1 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              onClick={e => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] flex items-center justify-center px-16" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[lightboxIndex]}
              alt={`${title} ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next */}
          {photos.length > 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
              onClick={e => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-lg overflow-x-auto px-2">
              {photos.map((photo, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                    i === lightboxIndex ? 'border-[#00C49F] opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
