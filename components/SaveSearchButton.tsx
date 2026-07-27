'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck, X } from 'lucide-react';

interface Props {
  filters: Record<string, string>;
}

export default function SaveSearchButton({ filters }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const hasFilters = Object.values(filters).some(v => v && v !== 'ALL' && v !== 'newest');

  async function handleSave() {
    if (!name.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/saved-searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), filters }),
      });
      if (res.status === 201) {
        setSaved(true);
        setOpen(false);
        setName('');
      } else {
        const data = await res.json();
        setError(data.error ?? 'Kayıt başarısız.');
      }
    } catch {
      setError('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  if (!hasFilters) return null;

  return (
    <div className="relative">
      <button
        onClick={() => { if (!saved) setOpen(o => !o); }}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
          saved
            ? 'bg-[#F0FDF8] text-[#00C49F] border-[#00C49F]/30'
            : 'bg-white text-gray-600 border-gray-200 hover:border-[#00C49F]/40 hover:text-[#00C49F]'
        }`}
      >
        {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
        {saved ? 'Arama Kaydedildi' : 'Aramayı Kaydet'}
      </button>

      {open && !saved && (
        <div className="absolute right-0 top-10 z-50 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700">Aramayı Kaydet</p>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Arama adı (ör: İstanbul 3+1)"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] mb-2"
            autoFocus
            onKeyDown={e => e.key === 'Enter' && handleSave()}
          />
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <button
            onClick={handleSave}
            disabled={loading || !name.trim()}
            className="w-full py-2 bg-[#00C49F] text-white text-xs font-bold rounded-xl hover:bg-[#00a882] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </div>
      )}
    </div>
  );
}
