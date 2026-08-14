'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, TrendingUp, X, Command, ArrowUpRight, Clock } from 'lucide-react';

interface Suggestion {
  type: 'city' | 'listing';
  label: string;
  sublabel?: string;
  href: string;
}

const RECENT_KEY = 'sbd_recent_searches';
const MAX_RECENT = 5;

function getRecentSearches(): Array<{ label: string; href: string }> {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); } catch { return []; }
}

function saveRecentSearch(label: string, href: string) {
  try {
    const prev = getRecentSearches().filter(r => r.href !== href);
    localStorage.setItem(RECENT_KEY, JSON.stringify([{ label, href }, ...prev].slice(0, MAX_RECENT)));
  } catch { /* noop */ }
}

const QUICK_LINKS = [
  { label: 'Satılık İlanlar', href: '/listings?listingType=SATILIK' },
  { label: 'Kiralık İlanlar', href: '/listings?listingType=KİRALIK' },
  { label: 'İstanbul İlanları', href: '/sehir/%C4%B0stanbul' },
  { label: 'Ankara İlanları', href: '/sehir/Ankara' },
  { label: 'Konut Kredisi Hesapla', href: '/hesaplama' },
  { label: 'Gayrimenkul Değerle', href: '/valuation' },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<Array<{ label: string; href: string }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQ('');
      setSuggestions([]);
      setSelectedIdx(-1);
      setRecentSearches(getRecentSearches());
    }
  }, [open]);

  const search = useCallback(async (term: string) => {
    if (!term || term.length < 2) { setSuggestions([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      const data = await res.json();
      setSuggestions(data.suggestions ?? []);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInput = (value: string) => {
    setQ(value);
    setSelectedIdx(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 200);
  };

  const navigate = (href: string, label?: string) => {
    if (label) saveRecentSearch(label, href);
    setOpen(false);
    router.push(href);
  };

  const items = q.length >= 2 ? suggestions : [];
  const allItems = [...items];

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIdx >= 0 && allItems[selectedIdx]) {
        navigate(allItems[selectedIdx].href, allItems[selectedIdx].label);
      } else if (q.trim()) {
        navigate(`/listings?q=${encodeURIComponent(q.trim())}`, q.trim());
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={e => handleInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="İlan, şehir veya özellik ara…"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
          />
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-[#00C49F] border-t-transparent animate-spin shrink-0" />
          )}
          <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-600 shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {q.length >= 2 && allItems.length > 0 ? (
            <ul className="py-2">
              {allItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(item.href, item.label)}
                    className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-colors ${
                      selectedIdx === idx ? 'bg-[#F0FDF8]' : 'hover:bg-gray-50'
                    }`}
                  >
                    {item.type === 'city' ? (
                      <MapPin size={14} className="text-[#00C49F] shrink-0" />
                    ) : (
                      <TrendingUp size={14} className="text-gray-300 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{item.label}</p>
                      {item.sublabel && (
                        <p className="text-xs text-gray-400 truncate">{item.sublabel}</p>
                      )}
                    </div>
                    <ArrowUpRight size={13} className="text-gray-300 shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          ) : q.length >= 2 && !loading ? (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400">Sonuç bulunamadı</p>
              <button
                onClick={() => navigate(`/listings?q=${encodeURIComponent(q)}`, q)}
                className="mt-2 text-xs text-[#00C49F] font-semibold hover:underline"
              >
                Tüm ilanları ara →
              </button>
            </div>
          ) : (
            <div className="py-3">
              {recentSearches.length > 0 && (
                <>
                  <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-5 pb-2">Son Aramalar</p>
                  <ul>
                    {recentSearches.map((r, i) => (
                      <li key={i}>
                        <button
                          onClick={() => navigate(r.href)}
                          className="w-full text-left px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                        >
                          <Clock size={12} className="text-gray-300 shrink-0" />
                          <p className="text-sm text-gray-600">{r.label}</p>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-gray-50 mt-2 mb-1" />
                </>
              )}
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase px-5 pb-2">Hızlı Erişim</p>
              <ul>
                {QUICK_LINKS.map(link => (
                  <li key={link.href}>
                    <button
                      onClick={() => navigate(link.href, link.label)}
                      className="w-full text-left px-5 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <ArrowUpRight size={13} className="text-gray-300 shrink-0" />
                      <p className="text-sm text-gray-600">{link.label}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-gray-50 flex items-center gap-4 text-[10px] text-gray-300">
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">↑↓</kbd> Seç</span>
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">↵</kbd> Git</span>
          <span className="flex items-center gap-1"><kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Esc</kbd> Kapat</span>
          <span className="ml-auto flex items-center gap-1">
            <Command size={10} /> K ile aç
          </span>
        </div>
      </div>
    </div>
  );
}
