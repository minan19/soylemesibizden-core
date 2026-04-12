export const dictionaries = {
  tr: {
    title: "KÜRESEL İSTİHBARAT",
    dashboard: "KONTROL PANELİ",
    radar: "PAZAR RADARI",
    darkPool: "GİZLİ HAVUZ",
    investorDNA: "YATIRIMCI DNA'SI",
    dir: "ltr"
  },
  en: {
    title: "GLOBAL INTELLIGENCE",
    dashboard: "DASHBOARD",
    radar: "MARKET RADAR",
    darkPool: "DARK POOL",
    investorDNA: "INVESTOR DNA",
    dir: "ltr"
  },
  ar: {
    title: "الاستخبارات العالمية",
    dashboard: "لوحة القيادة",
    radar: "رادار السوق",
    darkPool: "المجمع المظلم",
    investorDNA: "الحمض النووي للمستثمر",
    dir: "rtl"
  },
  ru: {
    title: "ГЛОБАЛЬНАЯ РАЗВЕДКА",
    dashboard: "ПАНЕЛЬ УПРАВЛЕНИЯ",
    radar: "РЫНОЧНЫЙ РАДАР",
    darkPool: "ТЕМНЫЙ ПУЛ",
    investorDNA: "ДНК ИНВЕСТОРА",
    dir: "ltr"
  }
};
export type Locale = keyof typeof dictionaries;
