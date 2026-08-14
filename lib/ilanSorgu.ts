import prisma from '@/lib/prisma';
import type { IlanKartVerisi } from '@/components/ilan/IlanKarti';

/**
 * Ilan sorgulari · 14.08.2026 (TRT)
 *
 * v2 modeli: merkez varlik TASINMAZ, ilan ona bagli bir kayittir.
 * Kart icin gereken her alan tek sorguda cekilir; N+1 yok.
 */

/** Kart icin gereken minimum iliski seti. */
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

type IlanKaydi = Awaited<
  ReturnType<
    typeof prisma.ilan.findFirstOrThrow<{ include: typeof KART_ICERIK }>
  >
>;

function karteDonustur(i: IlanKaydi): IlanKartVerisi {
  const kontrolEdilen = i.medyalar.filter((m) => m.algiHash).length;

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
      fiyatDegisimSayisi: Math.max(0, i._count.fiyatGecmisi - 1), // ilk kayit "degisim" degil
      gorselKontrolEdilen: kontrolEdilen,
      gorselToplam: i._count.medyalar,
    },
  };
}

export interface IlanFiltre {
  ilceAd?: string;
  turu?: 'SATILIK' | 'KIRALIK';
  enAzKurus?: bigint;
  enCokKurus?: bigint;
  sayfa?: number;
  adet?: number;
}

export async function ilanlariGetir(f: IlanFiltre = {}) {
  const adet = Math.min(f.adet ?? 20, 50);
  const sayfa = Math.max(f.sayfa ?? 1, 1);

  const where = {
    // YALNIZCA yayinda olanlar. Taslak, moderasyondaki veya
    // teyit suresi dolup pasiflesen ilanlar listede gorunmez.
    durumu: 'YAYINDA' as const,
    ...(f.turu ? { turu: f.turu } : {}),
    ...(f.ilceAd
      ? { tasinmaz: { mahalle: { ilceAd: { equals: f.ilceAd, mode: 'insensitive' as const } } } }
      : {}),
    ...(f.enAzKurus || f.enCokKurus
      ? {
          fiyatKurus: {
            ...(f.enAzKurus ? { gte: f.enAzKurus } : {}),
            ...(f.enCokKurus ? { lte: f.enCokKurus } : {}),
          },
        }
      : {}),
  };

  const [kayitlar, toplam] = await Promise.all([
    prisma.ilan.findMany({
      where,
      include: KART_ICERIK,
      orderBy: { yayinTs: 'desc' },
      skip: (sayfa - 1) * adet,
      take: adet,
    }),
    prisma.ilan.count({ where }),
  ]);

  return {
    ilanlar: kayitlar.map(karteDonustur),
    toplam,
    sayfa,
    sayfaAdedi: Math.max(1, Math.ceil(toplam / adet)),
  };
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
