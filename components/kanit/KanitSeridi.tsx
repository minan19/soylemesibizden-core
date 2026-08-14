import {
  ShieldCheck, Users, Building2, Clock, AlertTriangle,
  TrendingDown, ImageIcon, Minus, FlaskConical,
} from 'lucide-react';
import { goreliGun, tazelik } from '@/lib/bicim';

/**
 * KANIT SERIDI · 14.08.2026 (TRT)
 *
 * ADR-001: sayisal guven skoru ("bu ilan %87 guvenilir") REDDEDILDI.
 * Olculemeyen bir nitelige iki haneli kesinlik atamak sahte guven uretir.
 *
 * Yerine GERCEK SINYALLER gosterilir. Her rozet, veritabaninda
 * karsiligi olan bir olguya dayanir — hicbiri hesaplanmis skor degil:
 *
 *   Malik dogrulandi     <- EidsYetki.turu + durumu
 *   12 gun once teyit    <- Ilan.sonTeyitTs
 *   Fiyat 3 kez degisti  <- FiyatGecmisi kayit sayisi
 *   Gorsel kontrolu      <- Medya.algiHash
 *
 * Kullanici kararini kendi verir.
 */

export type YetkiTuru = 'MALIK' | 'HISIM' | 'YETKILI_ISLETME';
export type YetkiDurumu = 'BEKLIYOR' | 'GECERLI' | 'SURESI_DOLDU' | 'IPTAL';
export type YetkiKaynagi = 'GERCEK' | 'MOCK';

export interface Kanitlar {
  yetkiTuru: YetkiTuru | null;
  yetkiDurumu: YetkiDurumu;
  /** MOCK ise arayuzde etiketlenmesi ZORUNLUDUR (CC kurali #5) */
  yetkiKaynagi: YetkiKaynagi;
  sonTeyitTs: Date | string | null;
  teyitSonTarih: Date | string | null;
  fiyatDegisimSayisi: number;
  gorselKontrolEdilen?: number;
  gorselToplam?: number;
}

const YETKI_METIN: Record<YetkiTuru, string> = {
  MALIK: 'Malik doğrulandı',
  HISIM: 'Hısım doğrulandı',
  YETKILI_ISLETME: 'Yetkili işletme',
};

const YETKI_IKON: Record<YetkiTuru, typeof ShieldCheck> = {
  MALIK: ShieldCheck,
  HISIM: Users,
  YETKILI_ISLETME: Building2,
};

const TONLAR = {
  olumlu: 'bg-marka-acik text-marka-koyu',
  uyari: 'bg-amber-50 text-uyari',
  risk: 'bg-red-50 text-risk',
  test: 'bg-violet-50 text-test',
  notr: 'bg-zemin text-metinIkincil',
} as const;

type Ton = keyof typeof TONLAR;

function Rozet({
  ikon: Ikon,
  children,
  ton = 'notr',
  baslik,
}: {
  ikon: typeof ShieldCheck;
  children: React.ReactNode;
  ton?: Ton;
  baslik?: string;
}) {
  return (
    <span className={`rozet ${TONLAR[ton]}`} title={baslik} role="listitem">
      <Ikon size={12} strokeWidth={2.5} aria-hidden />
      {children}
    </span>
  );
}

export function KanitSeridi({
  k,
  yogun = false,
}: {
  k: Kanitlar;
  /** Kartta kompakt, detay sayfasinda genis */
  yogun?: boolean;
}) {
  const taze = tazelik(k.teyitSonTarih);
  const YetkiIkon = k.yetkiTuru ? YETKI_IKON[k.yetkiTuru] : ShieldCheck;

  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      role="list"
      aria-label="İlan doğrulama kanıtları"
    >
      {/* 1. TEST VERISI — varsa her seyin onunde. CC kurali #5. */}
      {k.yetkiKaynagi === 'MOCK' && (
        <Rozet
          ikon={FlaskConical}
          ton="test"
          baslik="Bu kayit MockEids saglayicisindan uretilmistir. Gercek EIDS dogrulamasi yapilmamistir."
        >
          DOĞRULANMAMIŞ — TEST VERİSİ
        </Rozet>
      )}

      {/* 2. Yetki */}
      {k.yetkiDurumu === 'GECERLI' && k.yetkiTuru ? (
        <Rozet ikon={YetkiIkon} ton={k.yetkiKaynagi === 'MOCK' ? 'notr' : 'olumlu'}>
          {YETKI_METIN[k.yetkiTuru]}
        </Rozet>
      ) : k.yetkiDurumu === 'SURESI_DOLDU' || k.yetkiDurumu === 'IPTAL' ? (
        <Rozet ikon={AlertTriangle} ton="risk">
          Yetki geçerli değil
        </Rozet>
      ) : (
        <Rozet ikon={Clock} ton="uyari">
          Yetki bekliyor
        </Rozet>
      )}

      {/* 3. Canlilik teyidi — hayalet ilan sorununun gorunen yuzu */}
      {taze === 'gecti' ? (
        <Rozet ikon={AlertTriangle} ton="risk">
          Teyit süresi doldu
        </Rozet>
      ) : k.sonTeyitTs ? (
        <Rozet
          ikon={Clock}
          ton={taze === 'yaklasiyor' ? 'uyari' : 'notr'}
          baslik="Ilan sahibi ilanin hala gecerli oldugunu en son ne zaman teyit etti"
        >
          {goreliGun(k.sonTeyitTs)} teyit edildi
        </Rozet>
      ) : null}

      {/* 4. Fiyat gecmisi — rakiplerde olmayan sinyal */}
      {k.fiyatDegisimSayisi > 0 && (
        <Rozet
          ikon={k.fiyatDegisimSayisi > 2 ? TrendingDown : Minus}
          baslik="Fiyat gecmisi kalicidir ve herkese aciktir"
        >
          Fiyat {k.fiyatDegisimSayisi} kez değişti
        </Rozet>
      )}

      {/* 5. Gorsel butunlugu — yalnizca detay sayfasinda */}
      {yogun && k.gorselToplam !== undefined && k.gorselToplam > 0 && (
        <Rozet
          ikon={ImageIcon}
          ton={k.gorselKontrolEdilen === k.gorselToplam ? 'olumlu' : 'notr'}
          baslik="Ayni gorselin baska ilanlarda kullanilip kullanilmadigi kontrol edildi"
        >
          {k.gorselKontrolEdilen ?? 0}/{k.gorselToplam} görsel kontrol edildi
        </Rozet>
      )}
    </div>
  );
}
