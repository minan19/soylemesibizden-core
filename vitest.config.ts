import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Vitest yapilandirmasi · 15.08.2026 (TRT)
 *
 * Yalnizca SAF MANTIK dosyalari test edilir: lib/ altindaki
 * veritabani ve HTTP bilmeyen modüller.
 *
 * API rotalari ve sayfalar burada test EDILMEZ — onlar golge
 * veritabaninda gercek istekle dogrulaniyor. Ikisini karistirmak,
 * test kurulumunu agirlastirip kimsenin calistirmadigi bir takim
 * uretir.
 */
export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'node',
    // Testler zamana bagli kurallar iceriyor (teyit suresi, belge
    // bitisi). Sahte zaman kullanmak yerine testler gorece tarih
    // uretiyor; yine de kacak bir bekleme olmasin diye kisa timeout.
    testTimeout: 5000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
});
