import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { legacyGorunurMu, legacyRotaMi } from '@/lib/legacyRoutes';

/**
 * Middleware · 14.08.2026 (TRT)
 *
 * Iki is yapar:
 *  1. Kurgu (teatral) rotalari bayrak kapaliysa 404'ler.
 *  2. Oturum ve rol korumasi uygular.
 *
 * NOT: 13.04.2026'da canliya cikan surumde bu dosya HIC YOKTU —
 * /admin oturumsuz aciktı. Matcher listesi o yuzden genisletildi.
 */
export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // 1. Kurgu rotalar — bayrak kapaliysa yokmus gibi davran
    if (legacyRotaMi(pathname) && !legacyGorunurMu()) {
      return NextResponse.rewrite(new URL('/sb-kaldirildi', req.url));
    }

    // 2. Admin rotalari — sadece ADMIN rolu
    if (pathname.startsWith('/admin') && req.nextauth.token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Kurgu rotalar zaten 404 donecek; once giris ekranina
        // yonlendirmek kullaniciyi bosuna dolastirir.
        if (legacyRotaMi(req.nextUrl.pathname)) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    // Korumali alanlar
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/deals/:path*',
    '/offers/:path*',
    '/legal-vault/:path*',
    '/vault/:path*',
    '/decision/:path*',

    // Kurgu rotalar (bayrak kapaliysa 404)
    '/nexus/:path*',
    '/carbon/:path*',
    '/genealogy/:path*',
    '/defense/:path*',
    '/authority/:path*',
    '/radar/:path*',
    '/boardroom/:path*',
    '/presentation/:path*',
    '/developer/:path*',
    '/security/:path*',
    '/api-portal/:path*',
    '/franchise/:path*',
    '/construction/:path*',
    '/investor-network/:path*',
    '/dark-pool/:path*',
    '/wealth/:path*',
    '/concierge/:path*',
  ],
};
