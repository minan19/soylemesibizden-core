import prisma from '@/lib/prisma';
import { teyitDurumu, teyitEdilebilirMi, type TeyitDurumu } from '@/lib/teyit';
import type { RandevuDurumu } from '@/lib/randevu';

/**
 * Panel sorgulari · 16.08.2026 (TRT)
 *
 * Ilan sahibinin kendi ilanlarini ve bekleyen islerini getirir.
 *
 * Bu ekranin varlik sebebi tek bir sey: kurdugumuz OTOMATIK
 * PASIFLESTIRME, teyit edecek bir yuzey olmadan tek yonlu bir
 * cezaya donusur. Ilan sahibi "teyit etmedin, ilanin dustu"
 * uyarisini alip ne yapacagini bilemezse, mekanizma adil olmaz.
 *
 * Bu yuzden panel ACILIYETI ONE KOYAR: once ne yapilmasi gerektigi,
 * sonra geri kalani.
 */

export interface PanelIlan {
  id: string;
  baslik: string;
  durumu: string;
  fiyatKurus: bigint;
  konum: string;
  brutM2: number | null;
  yayinTs: Date | null;
  sonTeyitTs: Date | null;
  teyitSonTarih: Date | null;
  otomatikPasifTs: Date | null;
  teyitDurum: TeyitDurumu;
  teyitEdilebilir: boolean;
  teyitEngeli?: string;
  yetkiBitis: Date;
  acikSikayet: number;
  okunmamisMesaj: number;
  bekleyenRandevu: number;
}

/** Ilan sahibinin ve bagli oldugu ofisin ilanlari. */
export async function panelIlanlari(kullaniciId: string): Promise<PanelIlan[]> {
  const kullanici = await prisma.kullanici.findUnique({
    where: { id: kullaniciId },
    select: { ofisId: true },
  });

  const kayitlar = await prisma.ilan.findMany({
    where: {
      OR: [
        { sahibiId: kullaniciId },
        ...(kullanici?.ofisId ? [{ ofisId: kullanici.ofisId }] : []),
      ],
      durumu: { not: 'ARSIVLENDI' },
    },
    include: {
      tasinmaz: {
        select: {
          brutM2: true,
          mahalle: { select: { ilceAd: true, mahalleAd: true } },
        },
      },
      yetki: { select: { durumu: true, bitis: true } },
      _count: { select: { sikayetler: true } },
    },
    orderBy: [{ teyitSonTarih: 'asc' }, { yayinTs: 'desc' }],
    take: 200,
  });

  const idler = kayitlar.map((k) => k.id);

  // Sayimlar tek sorguda — ilan basina ayri sorgu N+1 uretirdi.
  const [mesajlar, randevular, acikSikayetler] = await Promise.all([
    prisma.mesaj.groupBy({
      by: ['ilanId'],
      where: { ilanId: { in: idler }, aliciId: kullaniciId, okundu: false },
      _count: true,
    }),
    prisma.randevu.groupBy({
      by: ['ilanId'],
      where: { ilanId: { in: idler }, durumu: { in: ['TALEP', 'ONAYLANDI'] } },
      _count: true,
    }),
    prisma.sikayet.groupBy({
      by: ['ilanId'],
      where: { ilanId: { in: idler }, kapanisTs: null },
      _count: true,
    }),
  ]);

  const say = (g: { ilanId: string; _count: number }[], id: string) =>
    g.find((x) => x.ilanId === id)?._count ?? 0;

  return kayitlar.map((k) => {
    const kontrol = teyitEdilebilirMi({
      ilanDurumu: k.durumu,
      yetkiDurumu: k.yetki.durumu,
      yetkiBitis: k.yetki.bitis,
    });

    return {
      id: k.id,
      baslik: k.baslik,
      durumu: k.durumu,
      fiyatKurus: k.fiyatKurus,
      konum: `${k.tasinmaz.mahalle.ilceAd} / ${k.tasinmaz.mahalle.mahalleAd}`,
      brutM2: k.tasinmaz.brutM2,
      yayinTs: k.yayinTs,
      sonTeyitTs: k.sonTeyitTs,
      teyitSonTarih: k.teyitSonTarih,
      otomatikPasifTs: k.otomatikPasifTs,
      teyitDurum: teyitDurumu(k.teyitSonTarih),
      teyitEdilebilir: kontrol.edilebilir,
      teyitEngeli: kontrol.sebep,
      yetkiBitis: k.yetki.bitis,
      acikSikayet: say(acikSikayetler, k.id),
      okunmamisMesaj: say(mesajlar, k.id),
      bekleyenRandevu: say(randevular, k.id),
    };
  });
}

export interface PanelRandevu {
  id: string;
  ilanId: string;
  ilanBasligi: string;
  tarih: Date;
  durumu: RandevuDurumu;
  talepEden: string;
  notlar: string | null;
  ilanGercekMi: boolean | null;
}

/** Ilan tarafinin islem bekleyen randevulari. */
export async function panelRandevulari(kullaniciId: string): Promise<PanelRandevu[]> {
  const kullanici = await prisma.kullanici.findUnique({
    where: { id: kullaniciId },
    select: { ofisId: true },
  });

  const kayitlar = await prisma.randevu.findMany({
    where: {
      ilan: {
        OR: [
          { sahibiId: kullaniciId },
          ...(kullanici?.ofisId ? [{ ofisId: kullanici.ofisId }] : []),
        ],
      },
      durumu: { in: ['TALEP', 'ONAYLANDI'] },
    },
    include: {
      ilan: { select: { id: true, baslik: true } },
      talepEden: { select: { adSoyad: true, eposta: true } },
    },
    orderBy: { tarih: 'asc' },
    take: 100,
  });

  return kayitlar.map((r) => ({
    id: r.id,
    ilanId: r.ilan.id,
    ilanBasligi: r.ilan.baslik,
    tarih: r.tarih,
    durumu: r.durumu as RandevuDurumu,
    // Kisisel veri en aza indirilir: e-posta yerine ad, adi yoksa
    // e-postanin yalnizca kullanici kismi.
    talepEden: r.talepEden.adSoyad ?? r.talepEden.eposta.split('@')[0],
    notlar: r.notlar,
    ilanGercekMi: r.ilanGercekMi,
  }));
}

/** Panel ustundeki "yapilacak" ozeti. */
export interface PanelOzet {
  teyitBekleyen: number;
  teyitYaklasan: number;
  otomatikDusen: number;
  bekleyenRandevu: number;
  okunmamisMesaj: number;
  acikSikayet: number;
}

export function panelOzetle(
  ilanlar: PanelIlan[],
  randevular: PanelRandevu[]
): PanelOzet {
  return {
    teyitBekleyen: ilanlar.filter(
      (i) => i.durumu === 'TEYIT_BEKLIYOR' && i.teyitEdilebilir
    ).length,
    teyitYaklasan: ilanlar.filter(
      (i) => i.durumu === 'YAYINDA' && i.teyitDurum === 'yaklasiyor'
    ).length,
    // SU AN pasif olanlar sayilir. otomatikPasifTs gecmiste dolmus
    // ama ilan sonradan yayina donmus olabilir; onu "dusen" saymak
    // panelde yanlis alarm uretir.
    otomatikDusen: ilanlar.filter(
      (i) => i.durumu === 'PASIF' && i.otomatikPasifTs !== null
    ).length,
    bekleyenRandevu: randevular.filter((r) => r.durumu === 'TALEP').length,
    okunmamisMesaj: ilanlar.reduce((t, i) => t + i.okunmamisMesaj, 0),
    acikSikayet: ilanlar.reduce((t, i) => t + i.acikSikayet, 0),
  };
}
