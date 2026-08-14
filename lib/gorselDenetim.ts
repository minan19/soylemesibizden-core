import prisma from '@/lib/prisma';
import {
  hammingMesafesi,
  benzerlik,
  SUPHE_ESIGI,
  type BenzerlikSonucu,
} from '@/lib/algiHash';

/**
 * Gorsel butunlugu denetimi · 14.08.2026 (TRT)
 *
 * Bir gorselin baska ilanlarda kullanilip kullanilmadigini bulur.
 *
 * ONEMLI: bulgu ENGELLEME degil, ISARETLEME uretir.
 * Ayni fotografin iki ilanda gorunmesi her zaman dolandiricilik
 * demek degildir — ayni daire yeniden kiraya cikabilir, ofis
 * degistirmis olabilir, malik ayni binada iki daire satiyor
 * olabilir. Yanlis pozitifle masum bir ilan sahibini "kopyaci"
 * diye damgalamak, cozmeye calistigimiz guven sorununu kendi
 * elimizle uretmek olur.
 *
 * Bu yuzden: bulgu kullaniciya GOSTERILIR, karar ona birakilir.
 */

export interface EslesmeKaydi {
  medyaId: string;
  ilanId: string;
  ilanBasligi: string;
  ilanDurumu: string;
  mahalle: string;
  eklendi: Date;
  mesafe: number;
  tur: BenzerlikSonucu;
}

export interface DenetimSonucu {
  birebirKopya: EslesmeKaydi[];
  gorselEslesme: EslesmeKaydi[];
  toplamEslesme: number;
}

/**
 * Aday havuzunu daraltma notu:
 *
 * dHash icin veritabani duzeyinde "yakin" sorgusu yapilamaz —
 * Hamming mesafesi SQL indeksiyle taranamaz. Su anki olcekte
 * (tek koridor, binlerce ilan) tum hash'leri cekip bellekte
 * karsilastirmak kabul edilebilir.
 *
 * Olcek buyudugunde secenekler: hash'i 4 parcaya bolup her parca
 * icin esitlik indeksi (pigeonhole), ya da pgvector / BK-agaci.
 * O gun geldiginde burasi degisir; arayuz sozlesmesi degismez.
 */
const TARAMA_SINIRI = 20_000;

export async function gorselDenetle(params: {
  algiHash: string;
  icerikHash: string;
  haricIlanId?: string;
}): Promise<DenetimSonucu> {
  const { algiHash, icerikHash, haricIlanId } = params;

  // 1. Birebir ayni dosya — indeksli, ucuz.
  const birebir = await prisma.medya.findMany({
    where: {
      icerikHash,
      ...(haricIlanId ? { ilanId: { not: haricIlanId } } : {}),
    },
    select: {
      id: true,
      eklendi: true,
      ilan: {
        select: {
          id: true,
          baslik: true,
          durumu: true,
          tasinmaz: { select: { mahalle: { select: { ilceAd: true, mahalleAd: true } } } },
        },
      },
    },
    take: 50,
  });

  const birebirKopya: EslesmeKaydi[] = birebir.map((m) => ({
    medyaId: m.id,
    ilanId: m.ilan.id,
    ilanBasligi: m.ilan.baslik,
    ilanDurumu: m.ilan.durumu,
    mahalle: `${m.ilan.tasinmaz.mahalle.ilceAd} / ${m.ilan.tasinmaz.mahalle.mahalleAd}`,
    eklendi: m.eklendi,
    mesafe: 0,
    tur: 'ayni',
  }));

  const birebirIdler = new Set(birebirKopya.map((b) => b.medyaId));

  // 2. Gorsel benzerlik — bellekte Hamming taramasi.
  const adaylar = await prisma.medya.findMany({
    where: {
      algiHash: { not: null },
      ...(haricIlanId ? { ilanId: { not: haricIlanId } } : {}),
    },
    select: {
      id: true,
      algiHash: true,
      eklendi: true,
      ilan: {
        select: {
          id: true,
          baslik: true,
          durumu: true,
          tasinmaz: { select: { mahalle: { select: { ilceAd: true, mahalleAd: true } } } },
        },
      },
    },
    take: TARAMA_SINIRI,
  });

  const gorselEslesme: EslesmeKaydi[] = [];
  for (const a of adaylar) {
    if (!a.algiHash || birebirIdler.has(a.id)) continue;
    const mesafe = hammingMesafesi(algiHash, a.algiHash);
    if (mesafe > SUPHE_ESIGI) continue;

    gorselEslesme.push({
      medyaId: a.id,
      ilanId: a.ilan.id,
      ilanBasligi: a.ilan.baslik,
      ilanDurumu: a.ilan.durumu,
      mahalle: `${a.ilan.tasinmaz.mahalle.ilceAd} / ${a.ilan.tasinmaz.mahalle.mahalleAd}`,
      eklendi: a.eklendi,
      mesafe,
      tur: benzerlik(algiHash, a.algiHash),
    });
  }

  gorselEslesme.sort((x, y) => x.mesafe - y.mesafe);

  return {
    birebirKopya,
    gorselEslesme: gorselEslesme.slice(0, 20),
    toplamEslesme: birebirKopya.length + gorselEslesme.length,
  };
}
