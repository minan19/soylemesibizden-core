import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import type { Filtre } from '@/lib/ilanFiltre';

/**
 * Kayitli arama eslestirme · 15.08.2026 (TRT)
 *
 * Bir filtreye uyan ve BELIRLI TARIHTEN SONRA yayina alinmis
 * ilanlarin sayisini dondurur.
 *
 * Neden lib/ilanSorgu.ts'teki ilanAra() kullanilmiyor: orasi kart
 * gosterimi icin iliskileri de cekiyor. Burada tek ihtiyac sayim;
 * binlerce kayitli arama icin her seferinde iliski cekmek gereksiz
 * yuk olur.
 *
 * Kosullar ilanAra() ile AYNI kalmali. Ayrilirlarsa kullanici
 * "bildirim geldi ama tiklayinca ilan yok" der. Bu yuzden ikisi de
 * ayni Filtre tipini alir ve ayni alanlara bakar.
 */
export async function yeniEslesenler(
  f: Filtre,
  bastan: Date
): Promise<number> {
  const kosullar: Prisma.Sql[] = [
    Prisma.sql`i.durumu = 'YAYINDA'`,
    Prisma.sql`i."yayinTs" > ${bastan}`,
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

  const satirlar = await prisma.$queryRaw<{ sayi: bigint }[]>(Prisma.sql`
    SELECT COUNT(*)::bigint AS sayi
    FROM ilan i
    JOIN tasinmaz t ON t.id = i."tasinmazId"
    JOIN mahalle m ON m.id = t."mahalleId"
    WHERE ${Prisma.join(kosullar, ' AND ')}`);

  return Number(satirlar[0]?.sayi ?? 0n);
}
