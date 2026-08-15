/**
 * ZEMİN VE DEPREM TEHLİKESİ · 15.08.2026 (TRT)
 *
 * Bu katman, lib/eids ile AYNI DİSİPLİNE tabidir:
 * gerçek sağlayıcı yoksa UYDURMA DEĞER ÜRETİLMEZ.
 *
 * ── NEDEN HENÜZ BAĞLI DEĞİL ───────────────────────────────────
 *
 * AFAD Türkiye Deprem Tehlike Haritası (tdth.afad.gov.tr) sorgu için
 * e-Devlet girişi istiyor. Programatik erişim için kurumsal başvuru
 * gerekiyor; kullanıcının e-Devlet kimliğiyle giriş yapmak ne teknik
 * olarak doğru ne etik olarak kabul edilebilir.
 *
 * Bu yüzden PGA/SS/S1 değerleri şu an ÇEKİLEMİYOR.
 *
 * ── NEDEN YİNE DE BU DOSYA VAR ────────────────────────────────
 *
 * Zillow, Eylül 2024'te First Street verisiyle beş kategoride iklim
 * riski yayınladı ve Aralık 2025'te model doğruluğu itirazlarıyla
 * geri çekmek zorunda kaldı. Ders açık: risk sayısı üretmek, o sayı
 * ölçülmemişse, üründen daha büyük bir sorumluluk doğurur.
 *
 * Biz kendi risk skorumuzu ÜRETMEYECEĞİZ. AFAD'ın yayımladığı
 * değerleri, kaynağını göstererek gömeceğiz. Erişim alındığında
 * değişen tek şey bu klasördeki sağlayıcı dosyası olacak; arayüz
 * sözleşmesi ve çağrı yolu bugünden hazır.
 *
 * Şu anki davranış: null döner. Arayüz "bu bilgi henüz bağlanmadı"
 * der — boş bir kutu göstermez, tahmin de etmez.
 */

export interface ZeminSonucu {
  /** Kaynak kurum — ekranda gösterilmesi ZORUNLU. */
  kaynak: 'AFAD';
  /** Verinin yayım/güncelleme tarihi. */
  veriTarihi: string;
  /** 475 yıl tekrarlanma periyodu için en büyük yer ivmesi (g). */
  pga475: number;
  /** Kısa periyot spektral ivme katsayısı. */
  ss: number | null;
  /** 1 saniye periyot spektral ivme katsayısı. */
  s1: number | null;
  /** Yerel zemin sınıfı (ZA–ZF), biliniyorsa. */
  zeminSinifi: string | null;
}

export interface ZeminSaglayici {
  readonly kaynak: 'AFAD';
  /** Koordinattan tehlike parametrelerini döndürür. */
  sorgula(params: { enlem: number; boylam: number }): Promise<ZeminSonucu | null>;
}

const GEREKLI_ENV = ['AFAD_TDTH_BASE_URL', 'AFAD_TDTH_TOKEN'] as const;

export function zeminYapilandirildiMi(): boolean {
  return GEREKLI_ENV.every((k) => Boolean(process.env[k]));
}

/**
 * Sağlayıcıyı döndürür.
 *
 * Yapılandırılmamışsa null döner — MOCK YOKTUR.
 * lib/eids'te geliştirme için mock var çünkü ilan akışı onsuz
 * yazılamıyordu. Burada mock'un hiçbir faydası yok: uydurma bir
 * PGA değeri, gerçeğinden daha zararlıdır.
 */
export function getZemin(): ZeminSaglayici | null {
  if (!zeminYapilandirildiMi()) return null;

  throw new Error(
    '[zemin] AFAD saglayicisi henuz uygulanmadi. ' +
      'Kurumsal erisim alindiktan sonra lib/zemin/afad.ts yazilacak. ' +
      'Eksik olan erisim, kod degil.'
  );
}

/** Arayüzün gösterebileceği durum. */
export type ZeminDurumu =
  | { durum: 'baglanmadi'; aciklama: string }
  | { durum: 'koordinat_yok'; aciklama: string }
  | { durum: 'veri'; sonuc: ZeminSonucu };

export async function zeminDurumu(params: {
  enlem: number | null;
  boylam: number | null;
}): Promise<ZeminDurumu> {
  const saglayici = getZemin();

  if (!saglayici) {
    return {
      durum: 'baglanmadi',
      aciklama:
        'Zemin ve deprem tehlikesi bilgisi henüz bağlanmadı. ' +
        'AFAD Türkiye Deprem Tehlike Haritası verisine kurumsal erişim ' +
        'alındığında bu alanda kaynağıyla birlikte gösterilecek. ' +
        'Tahmini bir risk puanı üretmiyoruz.',
    };
  }

  if (params.enlem === null || params.boylam === null) {
    return {
      durum: 'koordinat_yok',
      aciklama: 'Bu taşınmaz için koordinat kaydı yok.',
    };
  }

  const sonuc = await saglayici.sorgula({
    enlem: params.enlem,
    boylam: params.boylam,
  });

  return sonuc
    ? { durum: 'veri', sonuc }
    : { durum: 'koordinat_yok', aciklama: 'Bu koordinat için veri bulunamadı.' };
}
