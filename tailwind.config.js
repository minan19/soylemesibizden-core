/** @type {import('tailwindcss').Config} */

/**
 * Sovereign Tasarim Sistemi · 14.08.2026 (TRT)
 *
 * Ilkeler:
 *  1. MOBIL ONCE. Taban stiller telefon icin; sm/md/lg ile buyutulur.
 *     Onceki kod tabaninda 1.995 className icinde sadece 14 responsive
 *     prefix vardi — yani mobil-oncelikli degil, mobil uyumsuzdu.
 *  2. RENK ANLAM TASIR. Yesil "dogrulandi" demek; dekorasyon degil.
 *     Kanit rozetlerinde kullanilir, baslikta kullanilmaz.
 *  3. SAYI OKUNUR. Fiyat ve m2 icin tabular rakam; sutunlar hizalanir.
 */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Yuzey
        zemin: '#F7F8FA',
        kart: '#FFFFFF',
        cizgi: '#E6E9EF',
        cizgiKoyu: '#D3D8E2',

        // Metin
        metin: '#111827',
        metinIkincil: '#5B6472',
        metinSonuk: '#8B94A3',

        // Anlam
        dogrulandi: '#0E9F6E', // EIDS yetkisi gecerli
        uyari: '#D97706',      // teyit suresi doluyor
        risk: '#DC2626',       // suresi dolmus / sikayetli
        test: '#7C3AED',       // MOCK kaynakli test verisi
        bilgi: '#2563EB',

        // Marka — vurgu icin, genis alanlarda degil
        marka: {
          DEFAULT: '#0B7A5E',
          koyu: '#075F49',
          acik: '#E7F5F0',
        },
      },
      borderRadius: {
        kart: '14px',
        rozet: '6px',
      },
      boxShadow: {
        // Tek katmanli, yumusak. Onceki kodda 0 20px 40px gibi
        // agir golgeler vardi; mobilde kirli gorunuyor.
        kart: '0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06)',
        kartHover: '0 4px 12px rgba(17,24,39,0.08)',
      },
      fontSize: {
        rozet: ['11px', { lineHeight: '14px', letterSpacing: '0.01em' }],
        mikro: ['12px', { lineHeight: '16px' }],
      },
    },
  },
  plugins: [],
};
