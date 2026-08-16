/**
 * MESAJ GÜVENLİĞİ · 15.08.2026 (TRT)
 *
 * ── TASARIM KARARI: TELEFON NUMARASI ENGELLENMEZ ──────────────
 *
 * Türkiye'de emlak işi telefonla yürüyor. Numara paylaşımını
 * kapatmak, rakiplerde olmayan bir sürtünme yaratır ve kullanıcı
 * zaten WhatsApp'a geçer. Üstelik tespit bir silahlanma yarışıdır:
 * "beş yüz otuz iki", "532 at 0", boşluklu yazım, görsele gömme.
 * Kaybedeceğimiz bir yarış.
 *
 * Asıl mesele şu: ZARAR TELEFON PAYLAŞILDIĞINDA DEĞİL, PARA
 * HESABA GEÇTİĞİNDE OLUŞUYOR. Araştırmadaki mağduriyetlerin hepsi
 * IBAN'a kapora gönderildikten sonra ortaya çıkmış.
 *
 * Teknik gerekçe de aynı yönü gösteriyor: Türk IBAN'ı SABİT
 * FORMATLI (TR + 24 hane). Gizlenmesi zor, yanlış pozitifi
 * neredeyse sıfır. Telefon numarası ise kolayca gizlenir ve
 * masumca geçebilir.
 *
 * Yani: güvenilir biçimde tespit edebildiğimiz şey zaten önemli
 * olan şey. Tespit edemediğimiz şey ise zaten önemli değil.
 *
 * Mesaj ENGELLENMEZ. Uyarı gösterilir ve gösterildiği KAYDEDİLİR.
 * Şikâyet gelirse elimizde kayıt olur — rakiplerde bu kayıt yok.
 *
 * Bu dosya saf mantık içerir; veritabanı ve HTTP bilmez.
 */

export type OdemeIsareti =
  | 'IBAN'
  | 'KAPORA'
  | 'HAVALE_EFT'
  | 'HESAP_BILGISI'
  | 'ACELE_BASKISI';

/**
 * Türk IBAN'ı: TR + 2 kontrol hanesi + 22 hane = 26 karakter.
 * Aradaki boşluklar ve noktalar temizlenerek aranır.
 */
const IBAN_DESENI = /TR\d{24}/i;

/**
 * Desen notlari — ikisi de testlerle yakalandi:
 *
 * 1. \b SINIRI TURKCE HARFLERLE CALISMIYOR. JavaScript'te \w
 *    varsayilan olarak ASCII'dir; "ön ödeme" ifadesinde \b beklenen
 *    yerde eslesmiyordu. Bu yuzden kelime siniri kullanilmiyor,
 *    alt dize eslestirmesi yapiliyor.
 *
 * 2. TURKCE EKLI HALLER. "hesap numarasi" araniyordu ama kullanici
 *    "hesap numaranizi" yaziyor. Kok yakalanip ek serbest birakildi.
 *
 * Alt dize eslestirmenin bedeli nadir yanlis pozitiflerdir. Bedel
 * kabul edilebilir: yanlis pozitifin sonucu yalnizca bir uyari
 * gostermek. Yanlis negatifin sonucu ise dolandiricilik.
 */
const KALIPLAR: { isaret: OdemeIsareti; desen: RegExp }[] = [
  {
    isaret: 'KAPORA',
    desen: /(kapora|kaparo|kapara|depozito|ön ?ödeme|on ?odeme|pey ?akças)/i,
  },
  {
    isaret: 'HAVALE_EFT',
    // "yatir" tek basina KULLANILMIYOR: "yatirim firsati" emlak
    // dilinde masum ve cok yaygin. Baglam zorunlu tutuluyor.
    desen:
      /(havale|\beft\b|\bfast\b|para ?transfer|para ?g[öo]nder|para ?yat[ıi]r|hesab[ıia]n?a? ?yat[ıi]r)/i,
  },
  {
    isaret: 'HESAP_BILGISI',
    desen: /(hesap ?(no|numara)|banka ?hesab|iban)/i,
  },
  // Aciliyet baskisi tek basina sorun degildir ama odeme diliyle
  // birlikte gorulunce anlamlidir.
  {
    isaret: 'ACELE_BASKISI',
    desen: /(hemen|acele|bug[üu]n ?i[çc]inde|son ?[şs]ans|ka[çc][ıi]rma|birazdan ?gidiyor)/i,
  },
];

export interface MesajDenetimi {
  isaretler: OdemeIsareti[];
  /** Uyari gosterilmeli mi — aciliyet TEK BASINA yeterli degil. */
  uyariGoster: boolean;
  uyariMetni: string | null;
}

/** Bosluk, nokta ve tireleri temizleyerek IBAN aramasi yapar. */
function ibanVarMi(metin: string): boolean {
  const sikistirilmis = metin.replace(/[\s.\-–—]/g, '');
  return IBAN_DESENI.test(sikistirilmis);
}

export const UYARI_METNI =
  'Bu konuşmada ödeme konuşuluyor. 1 Ekim 2026\'dan itibaren taşınmaz ' +
  'satışlarında ödeme, tapu devri tamamlanana kadar güvenli hesapta ' +
  'tutuluyor. Tapu devrinden önce doğrudan bir hesaba para göndermeniz ' +
  'istendiyse, bunu bize bildirin.';

export function mesajDenetle(icerik: string): MesajDenetimi {
  const isaretler: OdemeIsareti[] = [];

  if (ibanVarMi(icerik)) isaretler.push('IBAN');
  for (const { isaret, desen } of KALIPLAR) {
    if (desen.test(icerik)) isaretler.push(isaret);
  }

  // Aciliyet baskisi TEK BASINA uyari uretmez: "hemen bakabilirim"
  // masum bir cumledir. Odeme diliyle birlikte anlamlidir.
  const odemeIsaretleri = isaretler.filter((i) => i !== 'ACELE_BASKISI');
  const uyariGoster = odemeIsaretleri.length > 0;

  return {
    isaretler,
    uyariGoster,
    uyariMetni: uyariGoster ? UYARI_METNI : null,
  };
}

/**
 * IBAN'i kayit icin maskeler.
 *
 * Ham IBAN'i loga veya denetim kaydina yazmak, kisisel finansal
 * veriyi gereksiz yere cogaltmak olur. Ilk 6 ve son 4 hane
 * saklanir — sikayet incelemesinde eslestirmeye yeter.
 */
export function ibanMaskele(metin: string): string {
  // Ayiriciyi metinden SILMEDEN, ayirici icerebilen IBAN'i yerinde
  // maskeler. Ilk yazimda once tum bosluklar siliniyordu; denetim
  // kaydi "KaporaicinTR3300..." gibi okunmaz hale geliyordu.
  // (Bu davranisi ilk test yanlislikla DOGRU diye kaydetmisti.)
  return metin.replace(/TR(?:[\s.\-–—]*\d){24}/gi, (eslesme) => {
    const haneler = eslesme.replace(/[^\dA-Za-z]/g, '');
    return `${haneler.slice(0, 6)}${'*'.repeat(16)}${haneler.slice(-4)}`;
  });
}
