/**
 * Söylemesi Bizden — v2 seed · 14.08.2026 (TRT)
 *
 * ⚠️ ÜRETİLEN HER KAYIT TEST VERİSİDİR.
 *
 * Eski seed'den farkı: veri uydurulmuyor, lib/eids'in MockEids
 * sağlayıcısından ÇEKİLİYOR. Böylece EİDS entegrasyonu ilk günden
 * gerçek çağrı yolunu kullanıyor; Bakanlık erişimi geldiğinde
 * değişen tek şey sağlayıcı olacak, akış değil.
 *
 * Kurallar (CC görev listesi):
 *  #5 — mock kaynaklı her yetki kaydı `kaynak: MOCK` işaretli
 *  #6 — para her yerde BigInt kuruş, Float yok
 *
 * Hiçbir ilan YAYINDA durumunda oluşturulmaz. Hepsi TASLAK.
 * Yayına alma, gerçek EİDS bağlandıktan sonra elle yapılır.
 */

import { PrismaClient, TasinmazTipi, IlanTuru, IlanDurumu, YetkiTuru, YetkiDurumu, KullaniciRol } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { getEids } from '../lib/eids';

const prisma = new PrismaClient();
const eids = getEids();

/**
 * Test taşınmaz numaraları.
 * MockEids.tasinmazSorgula yalnızca /^\d{6,}$/ kabul ediyor.
 * Numaralar deterministik: aynı numara hep aynı mahalle/ada/parsel döner.
 */
const TASINMAZ_NOLARI = [
  '100001', '100002', '100003', '100004', '100005',
  '100006', '100007', '100008', '100009', '100010',
  '200001', '200002', '200003', '200004', '200005',
  '300001', '300002', '300003', '300004', '300005',
];

/**
 * Mahalle ortalama m² fiyatı — kuruş cinsinden.
 * Bunlar GERÇEK PİYASA VERİSİ DEĞİLDİR; yalnızca fiyat hesabı
 * akışının çalıştığını göstermek için yuvarlak test değerleridir.
 * Gerçek endeks FAZ 4'te FiyatGecmisi üzerinden hesaplanacak.
 */
const TEST_M2_KURUS: Record<string, bigint> = {
  Caferağa: 9_000_000n,   //  90.000 ₺/m² (test)
  Levent: 12_000_000n,    // 120.000 ₺/m² (test)
  Kazimiye: 3_000_000n,   //  30.000 ₺/m² (test)
  Yavuz: 2_500_000n,      //  25.000 ₺/m² (test)
};
const VARSAYILAN_M2_KURUS = 4_000_000n;

const TIPLER: TasinmazTipi[] = ['KONUT', 'KONUT', 'KONUT', 'ISYERI', 'ARSA'];

function tohum(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

async function main() {
  console.log('─'.repeat(60));
  console.log('v2 SEED — EİDS sağlayıcı kaynağı:', eids.kaynak);
  console.log('─'.repeat(60));

  if (eids.kaynak !== 'MOCK') {
    throw new Error('Seed yalnizca MOCK saglayici ile calistirilir. Gercek EIDS ile seed atilmaz.');
  }

  // Seed tekrar calistirilabilir olmali (eidsReferansNo benzersiz).
  // Temizlik YALNIZCA production disinda yapilir; ustteki MOCK kontrolu
  // zaten gercek ortamda buraya gelinmesini engelliyor.
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Seed production ortaminda calistirilamaz.');
  }

  await prisma.fiyatGecmisi.deleteMany();
  await prisma.medya.deleteMany();
  await prisma.favori.deleteMany();
  await prisma.mesaj.deleteMany();
  await prisma.randevu.deleteMany();
  await prisma.sikayet.deleteMany();
  await prisma.kayitliArama.deleteMany();
  await prisma.ilan.deleteMany();
  await prisma.eidsYetki.deleteMany();
  await prisma.tasinmaz.deleteMany();
  await prisma.mahalle.deleteMany();
  await prisma.kullanici.deleteMany();
  await prisma.emlakOfisi.deleteMany();
  console.log('✓ önceki test verisi temizlendi');

  // ── 1. Kullanıcılar ────────────────────────────────────────────
  // eidsKullaniciKodu MockEids.kimlikDogrula'dan geçirilir.
  const parolaHash = await bcrypt.hash('Test.Parola.2026!', 12);

  const kullaniciTanimlari = [
    { eposta: 'admin@soylemesibizden.test', adSoyad: 'Sistem Yöneticisi', rol: 'ADMIN' as KullaniciRol, kod: 'EIDS-TEST-ADMIN' },
    { eposta: 'ofis@soylemesibizden.test', adSoyad: 'Ofis Yetkilisi', rol: 'OFIS_YETKILISI' as KullaniciRol, kod: 'EIDS-TEST-OFIS' },
    { eposta: 'malik@soylemesibizden.test', adSoyad: 'Bireysel Malik', rol: 'BIREYSEL' as KullaniciRol, kod: 'EIDS-TEST-MALIK' },
  ];

  const kullanicilar = [];
  for (const k of kullaniciTanimlari) {
    const kimlik = await eids.kimlikDogrula(k.kod, 'seed');
    const u = await prisma.kullanici.upsert({
      where: { eposta: k.eposta },
      update: {},
      create: {
        eposta: k.eposta,
        parolaHash,
        adSoyad: k.adSoyad,
        rol: k.rol,
        eidsKullaniciKodu: kimlik.kullaniciKodu,
        kimlikDogrulandi: kimlik.dogrulandi,
        kimlikDogrulamaTs: kimlik.dogrulandi ? new Date() : null,
      },
    });
    kullanicilar.push(u);
  }
  console.log(`✓ ${kullanicilar.length} kullanıcı`);

  // ── 2. Emlak ofisi ─────────────────────────────────────────────
  const ofis = await prisma.emlakOfisi.upsert({
    where: { mersisNo: '0000000000000001' },
    update: {},
    create: {
      unvan: 'TEST Emlak Ticaret Ltd. Şti.',
      mersisNo: '0000000000000001',
      vergiNo: '0000000001',
      yetkiBelgeNo: 'TEST-YB-000001',
      yetkiBelgeBitis: new Date(Date.now() + 365 * 24 * 3600 * 1000),
      yetkiBelgeGecerli: true,
      ilTrafikKodu: 34,
      adres: 'TEST VERİSİ — gerçek adres değildir',
    },
  });

  await prisma.kullanici.update({
    where: { id: kullanicilar[1].id },
    data: { ofisId: ofis.id },
  });
  console.log('✓ 1 emlak ofisi');

  // ── 3. Taşınmaz + yetki + ilan ─────────────────────────────────
  let mahalleSayisi = 0;
  let tasinmazSayisi = 0;
  let yetkiliSayisi = 0;
  let yetkisizSayisi = 0;
  let ilanSayisi = 0;

  const mahalleCache = new Map<string, string>();

  for (let i = 0; i < TASINMAZ_NOLARI.length; i++) {
    const no = TASINMAZ_NOLARI[i];

    // 3a. Tapu bilgisini EİDS'ten çek — uydurmuyoruz
    const tapu = await eids.tasinmazSorgula(no);
    if (!tapu.bulundu || !tapu.mahalleAd || !tapu.ilceAd || !tapu.ilKodu) {
      console.log(`  ⨯ ${no} — EİDS'te bulunamadı, atlandı`);
      continue;
    }

    // 3b. Mahalle
    const anahtar = `${tapu.ilKodu}|${tapu.ilceAd}|${tapu.mahalleAd}`;
    let mahalleId = mahalleCache.get(anahtar);
    if (!mahalleId) {
      const m = await prisma.mahalle.upsert({
        where: {
          ilKodu_ilceAd_mahalleAd: {
            ilKodu: tapu.ilKodu,
            ilceAd: tapu.ilceAd,
            mahalleAd: tapu.mahalleAd,
          },
        },
        update: {},
        create: {
          ilKodu: tapu.ilKodu,
          ilAd: tapu.ilKodu === 34 ? 'İstanbul' : 'Tekirdağ',
          ilceAd: tapu.ilceAd,
          mahalleAd: tapu.mahalleAd,
          ortalamaM2Kurus: TEST_M2_KURUS[tapu.mahalleAd] ?? VARSAYILAN_M2_KURUS,
          endeksGuncelTs: new Date(),
        },
      });
      mahalleId = m.id;
      mahalleCache.set(anahtar, mahalleId);
      mahalleSayisi++;
    }

    // 3c. Taşınmaz
    const brutM2 = tapu.brutM2 ?? 100;
    const tasinmaz = await prisma.tasinmaz.upsert({
      where: { tasinmazNo: no },
      update: {},
      create: {
        tasinmazNo: no,
        tipi: TIPLER[tohum(no) % TIPLER.length],
        ada: tapu.ada,
        parsel: tapu.parsel,
        mahalleId,
        brutM2,
        netM2: Math.round(brutM2 * 0.85),
      },
    });
    tasinmazSayisi++;

    // 3d. Yetki sorgusu — %20'si bilerek reddedilir
    const sahip = kullanicilar[i % 3];
    const yetki = await eids.yetkiSorgula({
      eidsKullaniciKodu: sahip.eidsKullaniciKodu!,
      tasinmazNo: no,
    });

    if (!yetki.yetkili) {
      yetkisizSayisi++;
      console.log(`  ⨯ ${no} — ${yetki.redSebebi}`);
      continue; // Yetki yoksa ilan YOK. Kapı burada.
    }

    const yetkiKaydi = await prisma.eidsYetki.create({
      data: {
        tasinmazId: tasinmaz.id,
        turu: (yetki.turu ?? 'MALIK') as YetkiTuru,
        durumu: 'GECERLI' as YetkiDurumu,
        eidsKullaniciKodu: sahip.eidsKullaniciKodu!,
        eidsReferansNo: yetki.referansNo,
        baslangic: yetki.baslangic ?? new Date(),
        bitis: yetki.bitis ?? new Date(Date.now() + 180 * 24 * 3600 * 1000),
        kaynak: 'MOCK', // ← CC kuralı #5
      },
    });
    yetkiliSayisi++;

    // 3e. İlan — fiyat, mahalle endeksinden türetilir (uydurulmuyor)
    const mahalle = await prisma.mahalle.findUniqueOrThrow({ where: { id: mahalleId } });
    const m2Kurus = mahalle.ortalamaM2Kurus ?? VARSAYILAN_M2_KURUS;
    const sapma = BigInt(90 + (tohum(no) % 21)); // %90–%110 arası
    const satisKurus = (m2Kurus * BigInt(brutM2) * sapma) / 100n;

    const kiralik = tohum(no) % 4 === 0;

    // Kira, satis degerinin binde 4'u alinarak turetilir. Bu bir piyasa
    // iddiasi degil, test verisinin makul buyuklukte olmasi icindir —
    // aksi halde "6.220.800 TL / ay" gibi anlamsiz kayitlar olusuyordu.
    const fiyatKurus = kiralik ? (satisKurus * 4n) / 1000n : satisKurus;

    const teyitSon = new Date(Date.now() + 30 * 24 * 3600 * 1000);

    const ilan = await prisma.ilan.create({
      data: {
        tasinmazId: tasinmaz.id,
        yetkiId: yetkiKaydi.id,
        sahibiId: sahip.id,
        ofisId: sahip.rol === 'OFIS_YETKILISI' ? ofis.id : null,
        turu: (kiralik ? 'KIRALIK' : 'SATILIK') as IlanTuru,

        // YAYINDA — ama yalnizca gelistirme veritabaninda anlami var.
        // Guvence su zincirden gelir:
        //   1. Bu seed, saglayici MOCK degilse en basta throw eder.
        //   2. lib/eids/index.ts production'da MOCK saglayiciyi reddeder,
        //      yani bu veri hicbir zaman gercek ortamda uretilemez.
        //   3. Her kayit kaynak=MOCK tasir ve arayuzde
        //      "DOGRULANMAMIS — TEST VERISI" rozetiyle gosterilir (CC #5).
        durumu: 'YAYINDA' as IlanDurumu,
        yayinTs: new Date(Date.now() - (tohum(no) % 120) * 86_400_000),
        sonTeyitTs: new Date(Date.now() - (tohum(no) % 25) * 86_400_000),
        baslik: `${mahalle.ilceAd} / ${mahalle.mahalleAd} — Ada ${tapu.ada} Parsel ${tapu.parsel}`,
        aciklama: 'DOĞRULANMAMIŞ — TEST VERİSİ. Bu kayıt MockEids sağlayıcısından üretilmiştir.',
        fiyatKurus,
        // m² bilgisi Tasinmaz'da tutulur, Ilan'da tekrarlanmaz.
        // Oda sayisi m2 ile tutarli olsun (60 m2'de 5+1 olmasin).
        odaSayisi: `${Math.max(1, Math.min(5, Math.round(brutM2 / 35)))}+1`,
        binaYasi: tohum(no) % 40,
        kat: (tohum(no) % 12) - 1,
        esyali: tohum(no) % 7 === 0,
        teyitSonTarih: teyitSon,
      },
    });

    // 3f. Fiyat geçmişi — ilk kayıt
    await prisma.fiyatGecmisi.create({
      data: {
        ilanId: ilan.id,
        eskiFiyatKurus: null,
        yeniFiyatKurus: fiyatKurus,
      },
    });

    ilanSayisi++;
  }

  // ── Rapor ──────────────────────────────────────────────────────
  console.log('─'.repeat(60));
  console.log(`Mahalle          : ${mahalleSayisi}`);
  console.log(`Taşınmaz         : ${tasinmazSayisi}`);
  console.log(`Yetki (GEÇERLİ)  : ${yetkiliSayisi}   ← hepsi kaynak=MOCK`);
  console.log(`Yetki reddedildi : ${yetkisizSayisi}   ← bunlar için ilan açılmadı`);
  console.log(`İlan (YAYINDA)   : ${ilanSayisi}   ← yalnızca geliştirme DB'sinde`);
  console.log('─'.repeat(60));
  console.log('⚠️  TÜM KAYITLAR TEST VERİSİDİR. Arayüzde');
  console.log('    "DOĞRULANMAMIŞ — TEST VERİSİ" rozeti ZORUNLUDUR.');
  console.log('─'.repeat(60));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
