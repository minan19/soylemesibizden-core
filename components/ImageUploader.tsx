'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, ImageIcon, Loader2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

interface Props {
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export default function ImageUploader({ images, onChange, maxImages = 10 }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const res = await fetch(
      `/api/upload?filename=${encodeURIComponent(file.name)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      }
    );
    if (!res.ok) {
      const data = await res.json() as { error?: string };
      throw new Error(data.error ?? 'Yükleme hatası');
    }
    const data = await res.json() as { url: string };
    return data.url;
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    if (images.length >= maxImages) {
      setError(`En fazla ${maxImages} fotoğraf eklenebilir.`);
      return;
    }
    setError(null);
    setUploading(true);

    const remaining = maxImages - images.length;
    const toUpload = files.slice(0, remaining);
    const urls: string[] = [];

    try {
      for (const file of toUpload) {
        if (file.size > 10 * 1024 * 1024) {
          setError(`${file.name} 10MB sınırını aşıyor.`);
          continue;
        }
        const url = await uploadFile(file);
        if (url) urls.push(url);
      }
      onChange([...images, ...urls]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Yükleme başarısız.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  }, [images, maxImages, onChange, uploadFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) void handleFiles(files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith('image/')
    );
    if (files.length) void handleFiles(files);
  }, [handleFiles]);

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {images.length < maxImages && (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
            dragOver
              ? 'border-[#00C49F] bg-[#F0FDF8]'
              : 'border-gray-200 hover:border-[#00C49F]/50 hover:bg-gray-50'
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-[#00C49F]" />
              <p className="text-[12px] font-semibold text-gray-400">Yükleniyor...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
                <Upload size={22} className="text-[#00C49F]" />
              </div>
              <div className="text-center">
                <p className="text-[13px] font-bold text-[#0F172A]">
                  Fotoğraf sürükle veya <span className="text-[#00C49F]">seç</span>
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  JPEG, PNG, WebP • Maks. 10MB • {images.length}/{maxImages}
                </p>
              </div>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertTriangle size={14} className="text-red-400 shrink-0" />
          <p className="text-[11px] font-semibold text-red-500">{error}</p>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((url, idx) => (
            <div key={url} className="relative aspect-video rounded-2xl overflow-hidden group bg-gray-100">
              {url.startsWith('http') ? (
                <Image
                  src={url}
                  alt={`Fotoğraf ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={24} className="text-gray-300" />
                </div>
              )}
              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={12} className="text-white" />
              </button>
              {/* Cover badge */}
              {idx === 0 && (
                <div className="absolute bottom-2 left-2 bg-[#00C49F] text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">
                  Kapak
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
