/**
 * RANDEVU VE GÖSTERİM SONRASI DOĞRULAMA · 15.08.2026 (TRT)
 *
 * Yem ilan sorununun çözümü.
 *
 * Yem ilan şudur: ilanda piyasa altı fiyatlı güzel bir daire vardır,
 * arayınca "o satıldı ama size şunu göstereyim" denir. İlan aslında
 * hiç var olmamıştır; müşteri çekmek için konmuştur. Rakiplerde bunu
 * tespit edecek hiçbir mekanizma yok — çünkü tespit için gösterimin
 * gerçekleşip gerçekleşmediğini bilmek gerekir.
 *
 * Zincir şu:
 *   randevu talebi → onay → gösterim → ZİYARETÇİ DOĞRULAR
 *
 * Son adım kritik: gösterime giden kişi "ilandaki taşınmaz mı
 * gösterildi" sorusunu yanıtlar. Birden fazla ziyaretçi "hayır"
 * derse ilan teyide alınır ve ofisin gösterim doğrulama oranı düşer.
 *
 * Bu oran ofis profilinde AÇIK gösterilir — SLA gibi.
 *
 * Bu dosya saf mantık içerir; veritabanı ve HTTP bilmez.
 */

import { iyelik } from '@/lib/bicim';

export type RandevuDurumu =
  | 'TALEP'
  | 'ONAYLANDI'
  | 'GERCEKLESTI'
  | 'IPTAL'
  | 'GELMEDI';

export const RANDEVU_METIN: Record<RandevuDurumu, string> = {
  TALEP: 'Talep edildi',
  ONAYLANDI: 'Onaylandı',
  GERCEKLESTI: 'Gerçekleşti',
  IPTAL: 'İptal edildi',
  GELMEDI: 'Gelinmedi',
};

/**
 * İzinli durum geçişleri.
 *
 * GERCEKLESTI ve GELMEDI son durumlardır: bir gösterimin olduğu
 * veya olmadığı sonradan değiştirilemez. Aksi halde olumsuz geri
 * bildirim alan bir ofis, randevuyu "iptal"e çevirip kaydı
 * silebilirdi.
 */
const GECISLER: Record<RandevuDurumu, RandevuDurumu[]> = {
  TALEP: ['ONAYLANDI', 'IPTAL'],
  ONAYLANDI: ['GERCEKLESTI', 'GELMEDI', 'IPTAL'],
  GERCEKLESTI: [],
  IPTAL: [],
  GELMEDI: [],
};

export function gecisGecerliMi(
  mevcut: RandevuDurumu,
  yeni: RandevuDurumu
): boolean {
  return GECISLER[mevcut].includes(yeni);
}

/** Geri bildirim yalnızca gerçekleşmiş gösterim için verilebilir. */
export function geriBildirimVerilebilirMi(params: {
  durumu: RandevuDurumu;
  mevcutGeriBildirim: boolean | null;
}): { verilebilir: boolean; sebep?: string } {
  if (params.durumu !== 'GERCEKLESTI') {
    return {
      verilebilir: false,
      sebep:
        'Geri bildirim yalnızca gerçekleşmiş gösterimler için verilebilir.',
    };
  }
  if (params.mevcutGeriBildirim !== null) {
    return { verilebilir: false, sebep: 'Bu gösterim için zaten geri bildirim verdiniz.' };
  }
  return { verilebilir: true };
}

/**
 * Kaç olumsuz gösterim raporu ilanı teyide zorlar.
 *
 * Şikâyet eşiğiyle (2) aynı mantık ama BURADA DAHA GÜÇLÜ bir kanıt
 * var: bu kişiler gerçekten gitti. Yine de 1 değil 2 — tek kişinin
 * yanlış adrese gitmesi veya kötü niyeti ilanı düşürmesin.
 */
export const YEM_ILAN_ESIGI = 2;

export function yemIlanSayilirMi(olumsuzSayisi: number): boolean {
  return olumsuzSayisi >= YEM_ILAN_ESIGI;
}

export interface GosterimOzeti {
  toplamGosterim: number;
  geriBildirimli: number;
  gercekCikti: number;
  gercekCikmadi: number;
  /** Geri bildirim verilenler içinde "gerçek çıktı" oranı (0-1). */
  dogrulamaOrani: number | null;
  gelinmedi: number;
}

export function gosterimOzetle(
  kayitlar: { durumu: string; ilanGercekMi: boolean | null }[]
): GosterimOzeti {
  const gerceklesenler = kayitlar.filter((k) => k.durumu === 'GERCEKLESTI');
  const geriBildirimli = gerceklesenler.filter((k) => k.ilanGercekMi !== null);
  const gercekCikti = geriBildirimli.filter((k) => k.ilanGercekMi === true).length;
  const gercekCikmadi = geriBildirimli.length - gercekCikti;

  return {
    toplamGosterim: gerceklesenler.length,
    geriBildirimli: geriBildirimli.length,
    gercekCikti,
    gercekCikmadi,
    dogrulamaOrani:
      geriBildirimli.length > 0 ? gercekCikti / geriBildirimli.length : null,
    gelinmedi: kayitlar.filter((k) => k.durumu === 'GELMEDI').length,
  };
}

/** Ofis profilinde tek cümle. Puan değil, olgu. */
export function gosterimMetni(o: GosterimOzeti): string {
  if (o.toplamGosterim === 0) {
    return 'Bu ofis için henüz kayıtlı gösterim yok.';
  }
  if (o.geriBildirimli === 0) {
    return `${o.toplamGosterim} gösterim yapıldı; henüz geri bildirim verilmedi.`;
  }
  const yuzde = Math.round((o.dogrulamaOrani ?? 0) * 100);
  return (
    `${o.toplamGosterim} gösterimin ${iyelik(o.geriBildirimli)} için geri bildirim verildi. ` +
    `Ziyaretçilerin %${yuzde}'i ilandaki taşınmazın gösterildiğini bildirdi.`
  );
}
