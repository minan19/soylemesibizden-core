"use client";
import React from 'react';
import { Globe } from 'lucide-react';
import { useSovereignLang } from '../context/LanguageContext';
import { Locale } from '../lib/dictionary';

export const LanguageSelector = () => {
  const { lang, setLang } = useSovereignLang();
  const langs: { id: Locale; label: string }[] = [
    { id: 'tr', label: 'TR' },
    { id: 'en', label: 'EN' },
    { id: 'ar', label: 'AR' },
    { id: 'ru', label: 'RU' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: 'var(--bg-secondary)', padding: '8px 20px', borderRadius: '50px', border: '1px solid var(--border-color)' }}>
      <Globe size={14} color="var(--accent-emerald)" />
      <div style={{ display: 'flex', gap: '10px' }}>
        {langs.map((l) => (
          <button
            key={l.id}
            onClick={() => setLang(l.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.65rem',
              fontWeight: lang === l.id ? '950' : '600',
              color: lang === l.id ? 'var(--accent-emerald)' : 'var(--text-secondary)',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};
