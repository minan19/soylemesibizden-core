"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { dictionaries, Locale } from '../lib/dictionary';

const LanguageContext = createContext({
  lang: 'tr' as Locale,
  t: dictionaries.tr,
  setLang: (l: Locale) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Locale>('tr');

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', dictionaries[lang].dir);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], setLang }}>
      <div style={{ direction: dictionaries[lang].dir as any }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useSovereignLang = () => useContext(LanguageContext);
