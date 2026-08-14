/**
 * Kurgu (teatral) rotalar · 14.08.2026 (TRT)
 *
 * Bu sayfalar hicbir veri cekmiyor; sabit kurgu gosteriyorlar:
 * "SQL INJECTION" saldiri kaydi, "QUANTUM_READY", "SYSTEM IQ: 99.4",
 * uydurma tapu gecmisi, uydurma karbon/ESG skorlari.
 *
 * ADR-001 modeler monolit + tasinmaz-merkezli urun karari aldi.
 * Bu rotalar o urune hizmet etmiyor.
 *
 * SILINMIYORLAR — bayrak arkasina aliniyorlar. Geri donus ucuz kalsin:
 *   SB_SHOW_LEGACY_PAGES=1  → yine gorunur
 *   (tanimsiz / 0)          → 404
 *
 * Bir ay kimse aramadiysa v2 temiz kesiminde silinecekler.
 */

export const LEGACY_ROUTES = [
  '/nexus',
  '/carbon',
  '/genealogy',
  '/defense',
  '/authority',
  '/radar',
  '/boardroom',
  '/presentation',
  '/developer',
  '/security',
  '/api-portal',
  '/franchise',
  '/construction',
  '/investor-network',
  '/dark-pool',
  '/wealth',
  '/concierge',
  '/admin/defense',
  '/admin/create-asset',
  '/admin/dashboard',
] as const;

export function legacyGorunurMu(): boolean {
  return process.env.SB_SHOW_LEGACY_PAGES === '1';
}

export function legacyRotaMi(pathname: string): boolean {
  return LEGACY_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  );
}
