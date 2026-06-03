/**
 * i18n — Uluslararası Dil Desteği
 * Şu anda: TR/EN/AR sabit desteği
 * Gelecek: next-intl integrasyon ile tam lokalizasyon
 */

export type Language = 'tr' | 'en' | 'ar';

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  tr: {
    'nav.listings': 'İlanlar',
    'nav.offers': 'Teklifler',
    'nav.portfolio': 'Portföy',
    'nav.api': 'API Portal',
    'nav.construction': 'İnşaat',
    'nav.market': 'Piyasa Radar',
    'nav.franchise': 'Franchise',
    'common.search': 'Ara',
    'common.filter': 'Filtrele',
    'common.sort': 'Sırala',
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata oluştu',
    'common.success': 'Başarılı',
  },
  en: {
    'nav.listings': 'Listings',
    'nav.offers': 'Offers',
    'nav.portfolio': 'Portfolio',
    'nav.api': 'API Portal',
    'nav.construction': 'Construction',
    'nav.market': 'Market Radar',
    'nav.franchise': 'Franchise',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.success': 'Success',
  },
  ar: {
    'nav.listings': 'الإعلانات',
    'nav.offers': 'العروض',
    'nav.portfolio': 'المحفظة',
    'nav.api': 'بوابة API',
    'nav.construction': 'البناء',
    'nav.market': 'رادار السوق',
    'nav.franchise': 'الامتياز',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'فرز',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
  },
};

export function t(key: string, lang: Language = 'tr'): string {
  return TRANSLATIONS[lang]?.[key] ?? key;
}

export function getLanguageName(lang: Language): string {
  const names: Record<Language, string> = {
    tr: 'Türkçe',
    en: 'English',
    ar: 'العربية',
  };
  return names[lang];
}

export const SUPPORTED_LANGUAGES: Language[] = ['tr', 'en', 'ar'];
export const DEFAULT_LANGUAGE: Language = 'tr';
