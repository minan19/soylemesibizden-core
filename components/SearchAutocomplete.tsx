'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, TrendingUp, X, Clock } from 'lucide-react';

interface Suggestion {
  type: 'city' | 'listing';
  label: string;
  sublabel?: string;
  href: string;
}

const RECENT_KEY = 'sb_recent_searches';
const MAX_RECENT = 5;

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); } catch { return []; }
}

function saveRecent(term: string) {
  try {
    const existing = getRecent().filter(r => r !== term);
    localStorage.setItem(RECENT_KEY, JSON.stringify([term, ...existing].slice(0, MAX_RECENT)));
  } catch {}
}

function clearRecent() {
  try { localStorage.removeItem(RECENT_KEY); } catch {}
}

export default function SearchAutocomplete() {
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setRecentSearches(getRecent());
  }, []);

  const fetchSuggestions = useCallback(async (query: string) => {
    if (query.length < 2) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions ?? []);
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(q), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [q, fetchSuggestions]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) {
      saveRecent(term);
      setRecentSearches(getRecent());
      setOpen(false);
      router.push(`/listings?q=${encodeURIComponent(term)}`);
    }
  };

  const handleSelect = (href: string, term?: string) => {
    if (term) {
      saveRecent(term);
      setRecentSearches(getRecent());
    }
    setOpen(false);
    setQ('');
    router.push(href);
  };

  const handleFocus = () => {
    setRecentSearches(getRecent());
    setOpen(true);
  };

  const showRecent = open && q.length < 2 && recentSearches.length > 0;
  const showSuggestions = open && q.length >= 2;

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={e => { setQ(e.target.value); setOpen(true); }}
            onFocus={handleFocus}
            placeholder="Şehir, ilçe, mahalle veya ilan ara…"
            className="w-full pl-12 pr-10 py-4 text-base bg-white text-gray-900 rounded-2xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00C49F]/30"
          />
          {q && (
            <button
              type="button"
              onClick={() => { setQ(''); setSuggestions([]); inputRef.current?.focus(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="shrink-0 px-6 py-4 bg-[#00C49F] hover:bg-[#00a882] text-white font-bold rounded-2xl transition-colors shadow-lg text-sm"
        >
          Ara
        </button>
      </form>

      {/* Recent searches dropdown */}
      {showRecent && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Son Aramalar</span>
            <button
              type="button"
              onClick={() => { clearRecent(); setRecentSearches([]); }}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Temizle
            </button>
          </div>
          {recentSearches.map((term, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { setQ(term); handleSelect(`/listings?q=${encodeURIComponent(term)}`, term); }}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-400">
                <Clock size={13} />
              </div>
              <span className="text-sm text-gray-700 font-medium">{term}</span>
            </button>
          ))}
        </div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {loading ? (
            <div className="px-5 py-4 text-sm text-gray-400">Aranıyor…</div>
          ) : suggestions.length === 0 ? (
            <div className="px-5 py-4 text-sm text-gray-400">Sonuç bulunamadı</div>
          ) : (
            <div>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(s.href, s.type === 'city' ? s.label : undefined)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0 text-[#00C49F]">
                    {s.type === 'city' ? <MapPin size={15} /> : <TrendingUp size={15} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                    {s.sublabel && <p className="text-xs text-gray-400 mt-0.5">{s.sublabel}</p>}
                  </div>
                </button>
              ))}
              <div className="px-5 py-3 border-t border-gray-50">
                <button
                  type="button"
                  onClick={() => handleSelect(`/listings?q=${encodeURIComponent(q)}`, q)}
                  className="text-sm text-[#00C49F] font-semibold hover:underline flex items-center gap-1.5"
                >
                  <Search size={13} /> &quot;{q}&quot; için tüm sonuçları gör
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
