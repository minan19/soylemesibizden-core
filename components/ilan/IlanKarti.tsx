import Link from 'next/link';
import { MapPin, ImageOff, CalendarClock } from 'lucide-react';
import { kurus, m2Fiyat, yayindaSure } from '@/lib/bicim';
import { KanitSeridi, type Kanitlar } from '@/components/kanit/KanitSeridi';

/**
 * ILAN KARTI · 14.08.2026 (TRT)  —  MOBIL ONCELIKLI
 *
 * Bilgi onceligi kuresel arastirmadan cikan derse gore secildi:
 * Turkiye'deki kartlarin cogu emlakci logosu ve fotograf sayisi
 * gosteriyor; kullanicinin karar vermek icin ihtiyac duydugu sey ise
 * fiyat, m2 basina fiyat, ilanin yasi ve dogrulama durumu.
 *
 * Bu kartta gosterilen HER SEY veritabanindan gelir. Hesaplanmis skor,
 * tahmini deger veya "yatirim notu" YOKTUR (ADR-001).
 *
 * Yerlesim:
 *   telefon -> gorsel ustte, icerik altta (dikey)
 *   sm ve + -> gorsel solda sabit genislik, icerik sagda (yatay)
 */

export interface IlanKartVerisi {
  id: string;
  baslik: string;
  ilceAd: string;
  mahalleAd: string;
  turu: 'SATILIK' | 'KIRALIK';
  fiyatKurus: bigint;
  brutM2: number | null;
  odaSayisi: string | null;
  yayinTs: Date | string | null;
  kapakGorselUrl: string | null;
  gorselSayisi: number;
  kanitlar: Kanitlar;
}

export function IlanKarti({ ilan }: { ilan: IlanKartVerisi }) {
  const kiralik = ilan.turu === 'KIRALIK';

  return (
    <article className="kart group overflow-hidden transition-shadow hover:shadow-kartHover">
      <Link
        href={`/ilan/${ilan.id}`}
        className="flex flex-col sm:flex-row"
        aria-label={`${ilan.baslik} — ${kurus(ilan.fiyatKurus)}`}
      >
        {/* ---- Gorsel ---- */}
        <div className="relative aspect-[16/10] w-full shrink-0 bg-zemin sm:aspect-auto sm:h-[168px] sm:w-[232px]">
          {ilan.kapakGorselUrl ? (
            // next/image yerine img: images.unoptimized zaten acik ve harici
            // blob URL'leri icin remotePatterns bakimi gerekmiyor.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ilan.kapakGorselUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-metinSonuk">
              <ImageOff size={22} aria-hidden />
              <span className="sr-only">Görsel yok</span>
            </div>
          )}

          {ilan.gorselSayisi > 1 && (
            <span className="absolute bottom-2 right-2 rounded-rozet bg-black/60 px-1.5 py-0.5 text-rozet font-semibold text-white">
              {ilan.gorselSayisi} fotoğraf
            </span>
          )}
        </div>

        {/* ---- Icerik ---- */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
          {/* Fiyat blogu — kartin en onemli bilgisi, en ustte */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {/* TAM FIYAT. Kisaltma ("12,7 Mn ₺") yapilmiyor:
                gayrimenkulde 50 bin TL fark karar degistirir ve
                yaklasiklik, "kanit gosteriyoruz" tezine aykiridir. */}
            <span className="sayi text-lg font-extrabold tracking-tight text-metin sm:text-xl">
              {kurus(ilan.fiyatKurus)}
            </span>
            {kiralik && (
              <span className="text-sm font-medium text-metinIkincil">/ ay</span>
            )}
            {ilan.brutM2 ? (
              <span className="sayi text-mikro text-metinIkincil">
                {m2Fiyat(ilan.fiyatKurus, ilan.brutM2)}
              </span>
            ) : null}
          </div>

          {/* Konum — v2'de dogrulanmis ada/parsel eslesmesinden gelir */}
          <p className="flex items-center gap-1 text-sm text-metinIkincil">
            <MapPin size={13} className="shrink-0" aria-hidden />
            <span className="truncate">
              {ilan.ilceAd} / {ilan.mahalleAd}
            </span>
          </p>

          {/* Nitelikler */}
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-mikro text-metinIkincil">
            {ilan.odaSayisi && <span className="sayi">{ilan.odaSayisi}</span>}
            {ilan.brutM2 ? <span className="sayi">{ilan.brutM2} m²</span> : null}
            <span className="flex items-center gap-1">
              <CalendarClock size={12} aria-hidden />
              <span className="sayi">{yayindaSure(ilan.yayinTs)}</span>
            </span>
          </p>

          {/* Kanit seridi — kartin ayirt edici parcasi */}
          <div className="mt-auto pt-1">
            <KanitSeridi k={ilan.kanitlar} />
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Yukleme iskeleti — layout shift olmasin diye kartla ayni olculerde. */
export function IlanKartiIskelet() {
  return (
    <div className="kart flex animate-pulse flex-col overflow-hidden sm:flex-row">
      <div className="aspect-[16/10] w-full bg-cizgi sm:aspect-auto sm:h-[168px] sm:w-[232px]" />
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <div className="h-6 w-32 rounded bg-cizgi" />
        <div className="h-4 w-40 rounded bg-cizgi" />
        <div className="h-3 w-24 rounded bg-cizgi" />
        <div className="mt-auto flex gap-1.5 pt-1">
          <div className="h-4 w-24 rounded bg-cizgi" />
          <div className="h-4 w-28 rounded bg-cizgi" />
        </div>
      </div>
    </div>
  );
}
