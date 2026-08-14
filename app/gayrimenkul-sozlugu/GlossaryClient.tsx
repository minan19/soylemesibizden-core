'use client';

import { useState, useMemo } from 'react';
import { Search, X, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

type Term = {
  term: string;
  letter: string;
  definition: string;
  related?: string[];
  links?: { href: string; label: string }[];
};

export default function GlossaryClient({ terms }: { terms: Term[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return terms;
    return terms.filter(
      t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  }, [query, terms]);

  const byLetter = useMemo(() => {
    const map = new Map<string, Term[]>();
    for (const t of filtered) {
      const arr = map.get(t.letter) ?? [];
      arr.push(t);
      map.set(t.letter, arr);
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0], 'tr'));
  }, [filtered]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Terim veya tanım ara…"
          className="w-full pl-10 pr-10 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#00C49F] focus:ring-2 focus:ring-[#00C49F]/10 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Result count */}
      {query && (
        <p className="text-xs text-gray-500">
          <span className="font-bold text-gray-800">{filtered.length}</span> terim bulundu
        </p>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <p className="text-gray-400 text-sm">Arama sonucu bulunamadı.</p>
          <button onClick={() => setQuery('')} className="mt-3 text-xs text-[#00C49F] font-semibold hover:underline">
            Aramayı temizle
          </button>
        </div>
      )}

      {/* Terms by letter */}
      {byLetter.map(([letter, letterTerms]) => (
        <div key={letter} id={`letter-${letter}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 flex items-center justify-center bg-[#00C49F] text-white text-sm font-black rounded-xl shrink-0">
              {letter}
            </span>
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">{letterTerms.length} terim</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {letterTerms.map(t => (
              <div
                key={t.term}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-[#00C49F]/30 hover:shadow-sm transition-all"
              >
                <h2 className="text-sm font-black text-gray-900 mb-2">{t.term}</h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">{t.definition}</p>

                {t.related && t.related.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {t.related.map(r => (
                      <span
                        key={r}
                        className="inline-flex items-center gap-1 text-[10px] text-[#00C49F] bg-[#F0FDF8] border border-[#00C49F]/20 px-2 py-0.5 rounded-full font-semibold"
                      >
                        <Tag size={8} /> {r}
                      </span>
                    ))}
                  </div>
                )}

                {t.links && t.links.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {t.links.map(l => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#00C49F] font-semibold transition-colors"
                      >
                        <ExternalLink size={9} /> {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
