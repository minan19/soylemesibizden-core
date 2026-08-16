#!/usr/bin/env node
/**
 * MUTASYON TESTİ · 15.08.2026 (TRT)
 *
 * ── NEDEN VAR ─────────────────────────────────────────────────
 *
 * 15.08.2026'da lib/mesajGuvenlik.ts'teki ibanMaskele() hatalı
 * yazıldı VE testi o hatalı davranışı "doğru" diye kaydetti.
 * Sebep: beklenti gereksinimden değil, çalıştırılan kodun
 * çıktısından türetilmişti.
 *
 * Böyle bir test yeşil yanar ama hiçbir şey korumaz. Test sayısına
 * bakarak güvende olduğumuzu sanırız — en tehlikeli durum budur.
 *
 * Bu betik o tuzağı sistematik olarak arar: kritik kuralları
 * bilerek bozar ve testlerin YAKALADIĞINI doğrular. Yakalamayan
 * mutasyon = korumasız kural.
 *
 * Kullanım:  node test/mutasyon.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

/**
 * Her mutasyon bir GEREKSİNİMİ hedefler.
 * "aciklama" alanı, bozulan kuralın ne olduğunu söyler.
 */
const MUTASYONLAR = [
  {
    aciklama: 'Yem ilan eşiği 2 yerine 1 olursa tek kişi ilan düşürebilir',
    dosya: 'lib/randevu.ts',
    bul: 'export const YEM_ILAN_ESIGI = 2;',
    koy: 'export const YEM_ILAN_ESIGI = 1;',
  },
  {
    aciklama: 'Şikâyet eşiği 2 yerine 1 olursa tek kişi ilan düşürebilir',
    dosya: 'lib/sikayet.ts',
    bul: 'export const OTOMATIK_TEYIT_ESIGI = 2;',
    koy: 'export const OTOMATIK_TEYIT_ESIGI = 1;',
  },
  {
    aciklama: 'Teyit yetki bitişini aşarsa EİDS kapısı etrafından dolaşılır',
    dosya: 'lib/teyit.ts',
    bul: 'return periyot < yetkiBitis ? periyot : yetkiBitis;',
    koy: 'return periyot;',
  },
  {
    aciklama: 'GERCEKLESTI son durum olmazsa gösterim kanıtı silinebilir',
    dosya: 'lib/randevu.ts',
    bul: 'GERCEKLESTI: [],',
    koy: "GERCEKLESTI: ['IPTAL'],",
  },
  {
    aciklama: 'Para hesabı BigInt yerine Number olursa büyük tutarda hassasiyet gider',
    dosya: 'lib/bicim.ts',
    bul: '  const lira = v / 100n;\n  return lira.toLocaleString',
    koy: '  const lira = BigInt(Math.floor(Number(v) / 100));\n  return lira.toLocaleString',
  },
  {
    aciklama: 'SLA ortanca yerine ortalama olursa uç değerler tabloyu bozar',
    dosya: 'lib/sikayet.ts',
    bul: 'ortancaSaat: Math.round(ortanca * 10) / 10,',
    koy: 'ortancaSaat: Math.round(ortalama * 10) / 10,',
  },
  {
    aciklama: 'Belgesi dolmuş ofis ilan verebilir hale gelir',
    dosya: 'lib/yetkiBelgesi.ts',
    bul: "      durumu: 'suresi_doldu',\n      ilanVerebilir: false,",
    koy: "      durumu: 'suresi_doldu',\n      ilanVerebilir: true,",
  },
  {
    aciklama: 'IBAN maskesi kaldırılırsa ham finansal veri denetim kaydına sızar',
    dosya: 'lib/mesajGuvenlik.ts',
    bul: 'return metin.replace(/TR(?:[\\s.\\-–—]*\\d){24}/gi, (eslesme) => {',
    koy: 'return metin.replace(/ASLA_ESLESMEYECEK_DESEN/gi, (eslesme) => {',
  },
  {
    aciklama: 'Filtre beyaz listesi kalkarsa geçersiz sıralama SQL\'e sızabilir',
    dosya: 'lib/ilanFiltre.ts',
    bul: "      siralamaHam && siralamaHam in SIRALAMALAR\n        ? (siralamaHam as Siralama)\n        : 'yayin-yeni',",
    koy: "      (siralamaHam as Siralama) ?? 'yayin-yeni',",
  },
  {
    aciklama: 'Aciliyet tek başına uyarı üretirse masum mesajlar işaretlenir',
    dosya: 'lib/mesajGuvenlik.ts',
    bul: "  const odemeIsaretleri = isaretler.filter((i) => i !== 'ACELE_BASKISI');\n  const uyariGoster = odemeIsaretleri.length > 0;",
    koy: '  const uyariGoster = isaretler.length > 0;',
  },
];

function testleriCalistir() {
  try {
    execSync('npx vitest run --reporter=dot', {
      stdio: 'pipe',
      env: { ...process.env, NODE_ENV: 'development' },
    });
    return 'gecti';
  } catch {
    return 'kirildi';
  }
}

console.log('─'.repeat(66));
console.log('MUTASYON TESTİ — testlerin gerçekten koruduğunu doğrular');
console.log('─'.repeat(66));

// Önce temiz durumda testler geçmeli; geçmiyorsa sonuç anlamsız.
if (testleriCalistir() !== 'gecti') {
  console.error('\n✗ Testler MUTASYONSUZ hâlde geçmiyor. Önce onu düzeltin.');
  process.exit(1);
}
console.log('✓ Temel durum: testler geçiyor\n');

const hayattaKalanlar = [];

for (const m of MUTASYONLAR) {
  const orijinal = readFileSync(m.dosya, 'utf8');

  if (!orijinal.includes(m.bul)) {
    console.log(`⚠ ATLANDI  ${m.aciklama}`);
    console.log(`           (hedef kod ${m.dosya} içinde bulunamadı — güncellenmeli)\n`);
    hayattaKalanlar.push({ ...m, sebep: 'hedef bulunamadı' });
    continue;
  }

  writeFileSync(m.dosya, orijinal.replace(m.bul, m.koy));
  const sonuc = testleriCalistir();
  writeFileSync(m.dosya, orijinal); // her hâlükârda geri al

  if (sonuc === 'kirildi') {
    console.log(`✓ YAKALANDI  ${m.aciklama}`);
  } else {
    console.log(`✗ KAÇTI      ${m.aciklama}`);
    console.log(`             ${m.dosya} — bu kuralı koruyan test YOK\n`);
    hayattaKalanlar.push({ ...m, sebep: 'test yakalamadı' });
  }
}

console.log('\n' + '─'.repeat(66));
if (hayattaKalanlar.length === 0) {
  console.log(`✓ ${MUTASYONLAR.length}/${MUTASYONLAR.length} mutasyon yakalandı.`);
  process.exit(0);
}

console.log(`✗ ${hayattaKalanlar.length} mutasyon hayatta kaldı:`);
for (const h of hayattaKalanlar) console.log(`   - ${h.aciklama} (${h.sebep})`);
console.log('\nHer biri korumasız bir kuraldır. Test yazılmalı.');
process.exit(1);
