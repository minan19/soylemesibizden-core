/**
 * EİDS sağlayıcı seçimi · v1.0 · 28.07.2026 (TRT)
 *
 * KURAL: Production'da gerçek EİDS yapılandırılmamışsa uygulama
 * SESSİZCE mock'a düşmez — açılmayı REDDEDER.
 *
 * Bu proje daha önce "sessizce bozulma" hatası yaşadı (Stripe demo
 * moda düşüyordu, Redis devre dışı kalıyordu). Aynı sınıfı burada
 * kapatıyoruz: yasal doğrulama katmanı ya gerçektir ya da hiç yoktur.
 */

import type { EidsProvider } from './types';
import { MockEids } from './mock';

export * from './types';

const GEREKLI_ENV = [
  'EIDS_BASE_URL',
  'EIDS_FIRMA_KODU',
  'EIDS_BASIC_AUTH',
] as const;

export function eidsYapilandirildiMi(): boolean {
  return GEREKLI_ENV.every((k) => Boolean(process.env[k]));
}

let _saglayici: EidsProvider | null = null;

export function getEids(): EidsProvider {
  if (_saglayici) return _saglayici;

  const prod = process.env.NODE_ENV === 'production';
  const buildAsamasi = process.env.NEXT_PHASE === 'phase-production-build';

  if (eidsYapilandirildiMi()) {
    // GercekEids buraya gelecek — Bakanlık erişimi alındığında.
    // Şu an bilerek NotImplemented: yazılmamış kodu "hazır" gibi
    // göstermek, olmayan güvenceyi varmış gibi sunmak olurdu.
    throw new Error(
      '[eids] Gercek EIDS saglayicisi henuz uygulanmadi. ' +
        'Bakanlik erisimi alindiktan sonra lib/eids/gercek.ts yazilacak.'
    );
  }

  if (prod && !buildAsamasi) {
    throw new Error(
      '[eids] PRODUCTION HATASI: EIDS yapilandirilmamis. ' +
        'Eksik: ' +
        GEREKLI_ENV.filter((k) => !process.env[k]).join(', ') +
        '. Mock saglayici production ortaminda KULLANILAMAZ — ' +
        'yasal olarak dogrulanmamis ilan yayinlanamaz.'
    );
  }

  console.warn(
    '[eids] MOCK saglayici aktif. Uretilen tum yetkiler TEST VERISIDIR ' +
      've arayuzde etiketlenmek ZORUNDADIR.'
  );
  _saglayici = new MockEids();
  return _saglayici;
}
