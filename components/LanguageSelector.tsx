'use client';

import { useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getLanguageName, type Language } from '@/lib/i18n';

interface Props {
  currentLang: Language;
}

export default function LanguageSelector({ currentLang }: Props) {
  const router = useRouter();

  const switchLanguage = (lang: Language) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.refresh();
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-gray-400 hover:text-[#00C49F] transition-colors rounded-xl hover:bg-gray-50">
        <Globe size={14} />
        {getLanguageName(currentLang)}
      </button>

      <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang}
            onClick={() => switchLanguage(lang)}
            className={`block w-full text-left px-4 py-2.5 text-[11px] font-bold transition-all ${
              currentLang === lang
                ? 'bg-[#F0FDF8] text-[#00C49F]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {getLanguageName(lang)}
          </button>
        ))}
      </div>
    </div>
  );
}
