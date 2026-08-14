/** @type {import('next').NextConfig} */

/**
 * next.config.js · 14.08.2026 (TRT)
 *
 * BIRLESTIRME NOTU: Bu depoda hem next.config.js hem next.config.mjs
 * vardi. Next.js once .js'i okur — .mjs HIC YUKLENMIYORDU. Sonuclari:
 *
 *  - .mjs'teki `serverComponentsExternalPackages` (undici webpack
 *    duzeltmesi) uygulanmiyordu. Buraya tasindi.
 *  - .mjs'teki `typescript.ignoreBuildErrors: true` ve
 *    `eslint.ignoreDuringBuilds: true` de uygulanmiyordu. Bunlar
 *    BILEREK TASINMADI — tip hatalarini sessizce gecirmek, 13.04.2026
 *    canli surumunun ("Sovereign Override: Ignoring all build errors")
 *    nasil olustugunu acikliyor.
 *
 * next.config.mjs artik olu dosyadir; silinmesi onaya birakildi.
 */

// Content-Security-Policy — once REPORT-ONLY.
// Amac: ihlalleri toplamak, hicbir seyi kirmadan. Bir hafta gozlemleyip
// temizse `Content-Security-Policy` olarak zorunlu hale getirilecek.
//
// 'unsafe-inline' style icin su an zorunlu: kod tabaninda 1.026 adet
// inline style={{ }} var. Bunlar Tailwind'e tasindikca kaldirilacak.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.pusher.com wss://*.pusher.com https://api.anthropic.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Content-Security-Policy-Report-Only', value: csp },
];

const nextConfig = {
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    instrumentationHook: true,
    // .mjs'ten tasindi — undici private class field (#target) Next.js 14
    // webpack'te parse edilemiyor; sunucu tarafli paketler bundle disi.
    serverComponentsExternalPackages: ['undici', '@vercel/blob', 'pusher'],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async redirects() {
    return [
      {
        // /auth — parola alani olan ama hicbir dogrulama yapmayan
        // sahte giris sayfasiydi. Gercek giris /login'de.
        //
        // Yonlendirme sayfa icinde redirect() ile de yapilabiliyordu
        // ama sayfa statik prerender edildigi icin Location basligi
        // uretilmiyordu. Routing katmani kesin cozum.
        source: '/auth',
        destination: '/login',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
