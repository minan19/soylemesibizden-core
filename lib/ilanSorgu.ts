import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import type { IlanKartVerisi } from '@/components/ilan/IlanKarti';
import type { Filtre } from '@/lib/ilanFiltre';

/**
 * Ilan sorgulari · 14.08.2026 (TRT)
 *
 * Iki asamali arama:
 *   1. HAM SQL ile filtrelenmis + siralanmis ID listesi
 *   2. Prisma ile o ID'lerin iliskilerini tek sorguda cekme
 *
 * Neden ham SQL? Iki siralama Prisma'nin filtre API'siyle ifade
 * edilemiyor:
 *   - m2 fiyati  : fiyatKurus / tasinmaz.brutM2 (tablolar arasi hesap)
 *   - fiyati dusenler : ilan.fiyatKurus < ilk kayitli fiyat
 *                       (ayni satirda iki sutun karsilastirmasi)
 * Bunlari bellekte yapmak sayfalamayi bozar — 20 kaydi siralayip
 * "en ucuz m2" demek yanlis olur, tum kumede siralamak gerekir.
 *
 * Sorgular parametrelidir; Prisma.sql ile birlestirilir, string
 * birlestirme yapilmaz.
 */

const KART_ICERIK = {
  tasinmaz: {
    select: {
      brutM2: true,
      mahalle: { select: { ilceAd: true, mahalleAd: true } },
    },
  },
  yetki: { select: { turu: true, durumu: true, kaynak: true } },
  medyalar: {
    select: { url: true, algiHash: true },
    orderBy: { sira: 'asc' as const },
  },
  _count: { select: { fiyatGecmisi: true, medyalar: true } },
} as const;

type IlanKaydi = Prisma.IlanGetPayload<{ include: typeof KART_ICERIK }>;

function karteDonustur(i: IlanKaydi): IlanKartVerisi {
  return {
    id: i.id,
    baslik: i.baslik,
    ilceAd: i.tasinmaz.mahalle.ilceAd,
    mahalleAd: i.tasinmaz.mahalle.mahalleAd,
    turu: i.turu,
    fiyatKurus: i.fiyatKurus,
    brutM2: i.tasinmaz.brutM2,
    odaSayisi: i.odaSayisi,
    yayinTs: i.yayinTs,
    kapakGorselUrl: i.medyalar[0]?.url ?? null,
    gorselSayisi: i._count.medyalar,
    kanitlar: {
      yetkiTuru: i.yetki.turu,
      yetkiDurumu: i.yetki.durumu,
      yetkiKaynagi: i.yetki.kaynak,
      sonTeyitTs: i.sonTeyitTs,
      teyitSonTarih: i.teyitSonTarih,
      // Ilk kayit "degisim" degil, baslangic fiyati.
      fiyatDegisimSayisi: Math.max(0, i._count.fiyatGecmisi - 1),
      gorselKontrolEdilen: i.medyalar.filter((m) => m.algiHash).length,
      gorselToplam: i._count.medyalar,
    },
  };
}

const SIRALAMA_SQL: Record<Filtre['siralama'], Prisma.Sql> = {
  'yayin-yeni': Prisma.sql`i."yayinTs" DESC NULLS LAST`,
  'yayin-eski': Prisma.sql`i."yayinTs" ASC NULLS LAST`,
  'fiyat-artan': Prisma.sql`i."fiyatKurus" ASC`,
  'fiyat-azalan': Prisma.sql`i."fiyatKurus" DESC`,
  // brutM2 yoksa en sona at; sifira bolme olmasin.
  'm2-fiyat': Prisma.sql`
    CASE WHEN t."brutM2" IS NULL OR t."brutM2" = 0 THEN NULL
         ELSE i."fiyatKurus"::numeric / t."brutM2"
    END ASC NULLS LAST`,
  // En cok dusenden en aza.
  'fiyat-dusen': Prisma.sql`
    CASE WHEN ilk.deger IS NULL OR ilk.deger = 0 THEN NULL
         ELSE (i."fiyatKurus"::numeric - ilk.deger) / ilk.deger
    END ASC NULLS LAST`,
};

export interface AramaSonucu {
  ilanlar: IlanKartVerisi[];
  toplam: number;
  sayfa: number;
  sayfaAdedi: number;
  sorguMs: number;
}

export async function ilanAra(f: Filtre, adet = 20): Promise<AramaSonucu> {
  const t0 = Date.now();
  const atla = (f.sayfa - 1) * adet;

  // ── Kosullar ────────────────────────────────────────────────
  const kosullar: Prisma.Sql[] = [
    // Yalnizca yayindakiler. Taslak, moderasyondaki ve teyit
    // suresi dolup pasiflesenler aramada gorunmez.
    Prisma.sql`i.durumu = 'YAYINDA'`,
  ];

  if (f.turu) kosullar.push(Prisma.sql`i.turu = ${f.turu}::"IlanTuru"`);
  if (f.tipi) kosullar.push(Prisma.sql`t.tipi = ${f.tipi}::"TasinmazTipi"`);
  if (f.ilce) kosullar.push(Prisma.sql`m."ilceAd" ILIKE ${f.ilce}`);
  if (f.odaSayisi) kosullar.push(Prisma.sql`i."odaSayisi" = ${f.odaSayisi}`);

  if (f.enAzLira !== undefined) {
    kosullar.push(Prisma.sql`i."fiyatKurus" >= ${BigInt(f.enAzLira) * 100n}`);
  }
  if (f.enCokLira !== undefined) {
    kosullar.push(Prisma.sql`i."fiyatKurus" <= ${BigInt(f.enCokLira) * 100n}`);
  }
  if (f.enAzM2 !== undefined) kosullar.push(Prisma.sql`t."brutM2" >= ${f.enAzM2}`);
  if (f.enCokM2 !== undefined) kosullar.push(Prisma.sql`t."brutM2" <= ${f.enCokM2}`);

  if (f.q) {
    const desen = `%${f.q}%`;
    kosullar.push(Prisma.sql`(
      i.baslik ILIKE ${desen}
      OR m."mahalleAd" ILIKE ${desen}
      OR m."ilceAd" ILIKE ${desen}
      OR t."tasinmazNo" = ${f.q}
    )`);
  }

  // "Fiyati dusenler" bir siralama degil, ayni zamanda filtredir.
  if (f.siralama === 'fiyat-dusen') {
    kosullar.push(Prisma.sql`ilk.deger IS NOT NULL AND i."fiyatKurus" < ilk.deger`);
  }

  const nerede = Prisma.join(kosullar, ' AND ');

  // Ilk kayitli fiyat — yalnizca gerektiginde baglanir.
  const ilkFiyatJoin =
    f.siralama === 'fiyat-dusen'
      ? Prisma.sql`
          LEFT JOIN LATERAL (
            SELECT fg."yeniFiyatKurus"::numeric AS deger
            FROM fiyat_gecmisi fg
            WHERE fg."ilanId" = i.id
            ORDER BY fg."degisimTs" ASC
            LIMIT 1
          ) ilk ON TRUE`
      : Prisma.sql``;

  const kaynak = Prisma.sql`
    FROM ilan i
    JOIN tasinmaz t ON t.id = i."tasinmazId"
    JOIN mahalle m ON m.id = t."mahalleId"
    ${ilkFiyatJoin}
    WHERE ${nerede}`;

  const [idSatirlari, sayimSatiri] = await Promise.all([
    prisma.$queryRaw<{ id: string }[]>(Prisma.sql`
      SELECT i.id ${kaynak}
      ORDER BY ${SIRALAMA_SQL[f.siralama]}, i.id
      LIMIT ${adet} OFFSET ${atla}`),
    prisma.$queryRaw<{ sayi: bigint }[]>(Prisma.sql`
      SELECT COUNT(*)::bigint AS sayi ${kaynak}`),
  ]);

  const toplam = Number(sayimSatiri[0]?.sayi ?? 0n);
  const idler = idSatirlari.map((r) => r.id);

  if (idler.length === 0) {
    return { ilanlar: [], toplam, sayfa: f.sayfa, sayfaAdedi: 1, sorguMs: Date.now() - t0 };
  }

  // Iliskileri tek sorguda cek, ham SQL'in sirasini koru.
  const kayitlar = await prisma.ilan.findMany({
    where: { id: { in: idler } },
    include: KART_ICERIK,
  });
  const haritaSira = new Map(idler.map((id, i) => [id, i]));
  kayitlar.sort((a, b) => haritaSira.get(a.id)! - haritaSira.get(b.id)!);

  return {
    ilanlar: kayitlar.map(karteDonustur),
    toplam,
    sayfa: f.sayfa,
    sayfaAdedi: Math.max(1, Math.ceil(toplam / adet)),
    sorguMs: Date.now() - t0,
  };
}

/** Filtre panelindeki ilce listesi — yalnizca ilan bulunan ilceler. */
export async function ilceleriGetir(): Promise<{ ilceAd: string; adet: number }[]> {
  const satirlar = await prisma.$queryRaw<{ ilceAd: string; adet: bigint }[]>(Prisma.sql`
    SELECT m."ilceAd", COUNT(*)::bigint AS adet
    FROM ilan i
    JOIN tasinmaz t ON t.id = i."tasinmazId"
    JOIN mahalle m ON m.id = t."mahalleId"
    WHERE i.durumu = 'YAYINDA'
    GROUP BY m."ilceAd"
    ORDER BY adet DESC, m."ilceAd" ASC`);
  return satirlar.map((s) => ({ ilceAd: s.ilceAd, adet: Number(s.adet) }));
}

export async function ilanGetir(id: string) {
  return prisma.ilan.findUnique({
    where: { id },
    include: {
      tasinmaz: { include: { mahalle: true } },
      yetki: true,
      sahibi: { select: { adSoyad: true, rol: true } },
      ofis: { select: { unvan: true, yetkiBelgeNo: true, yetkiBelgeGecerli: true } },
      medyalar: { orderBy: { sira: 'asc' } },
      fiyatGecmisi: { orderBy: { degisimTs: 'asc' } },
      _count: { select: { medyalar: true, sikayetler: true } },
    },
  });
}
