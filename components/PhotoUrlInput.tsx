'use client';

import { useState, useEffect } from 'react';
import { ImageOff, Plus, Trash2 } from 'lucide-react';

interface Props {
  defaultValue?: string;
  name?: string;
}

export default function PhotoUrlInput({ defaultValue = '', name = 'photos' }: Props) {
  const [urls, setUrls] = useState<string[]>(() =>
    defaultValue ? defaultValue.split(',').map(u => u.trim()).filter(Boolean) : ['']
  );

  const addUrl = () => setUrls(prev => [...prev, '']);
  const removeUrl = (i: number) => setUrls(prev => prev.filter((_, idx) => idx !== i));
  const updateUrl = (i: number, val: string) => setUrls(prev => prev.map((u, idx) => idx === i ? val : u));

  const validUrls = urls.filter(u => u.trim().length > 0);

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={validUrls.join(',')} />

      {urls.map((url, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex-1 space-y-1.5">
            <div className="flex gap-2">
              <input
                type="url"
                value={url}
                onChange={e => updateUrl(i, e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUrl(i)}
                  className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            {url.trim() && (
              <div className="h-20 w-32 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url.trim()}
                  alt="Önizleme"
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                />
                <div className="hidden w-full h-full flex items-center justify-center">
                  <ImageOff size={16} className="text-gray-300" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addUrl}
        className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
      >
        <Plus size={14} /> Fotoğraf Ekle
      </button>

      {validUrls.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {validUrls.slice(0, 6).map((url, i) => (
            <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
              <span className="absolute bottom-0.5 right-0.5 bg-black/60 text-white text-[8px] font-bold px-1 rounded">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
