'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { SIRALAMALAR, TIP_METIN, type Filtre } from '@/lib/ilanFiltre';

/**
 * Filtre paneli · 14.08.2026 (TRT)
 *
 * Durum URL'de tutulur, bilesende degil. Boylece arama sonucu
 * paylasilabilir olur, geri tusu calisir ve sunucuda render edilir.
 *
 * Mobilde panel varsayilan olarak KAPALI — telefonda ekranin
 * yarisini filtre kaplamamali. Aktif filtre sayisi rozette gorunur
 * ki kapaliyken de ne oldugu bilinsin.
 */

const TIPLER = Object.keys(TIP_METIN) as (keyof typeof TIP_METIN)[];

export function FiltrePaneli({
  filtre,
  ilceler,
  aktifSayi,
}: {
  filtre: Filtre;
  ilceler: { ilceAd: string; adet: number }[];
  aktifSayi: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [acik, setAcik] = useState(false);

  function guncelle(degisiklikler: Record<string, string | undefined>) {
    const p = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(degisiklikler)) {
      if (v === undefined || v === '') p.delete(k);
      else p.set(k, v);
    }
    p.delete('sayfa'); // filtre degisince ilk sayfaya don
    const s = p.toString();
    router.push(s ? `/ilanlar?${s}` : '/ilanlar');
  }

  const alan =
    'w-full rounded-rozet border border-cizgi bg-kart px-2.5 py-2 text-sm text-metin';
  const etiket = 'mb-1 block text-mikro font-semibold text-metinIkincil';

  const sekme =
    'dokunulabilir flex-1 rounded-rozet px-3 py-2 text-sm font-semibold transition-colors';

  return (
    <div className="mb-4">
      {/*
        SATILIK / KIRALIK ust seviye secimdir, filtre degil.
        Sebep veriden cikti: fiyata gore siralarken 24.883 TL aylik
        kira ile 8.076.900 TL satis fiyati ayni listede yan yana
        geliyordu — siralama anlamini kaybediyor.
      */}
      <div
        role="tablist"
        aria-label="İlan türü"
        className="mb-2 flex gap-1 rounded-kart border border-cizgi bg-kart p-1"
      >
        {([
          ['', 'Tümü'],
          ['SATILIK', 'Satılık'],
          ['KIRALIK', 'Kiralık'],
        ] as const).map(([deger, metin]) => {
          const secili = (filtre.turu ?? '') === deger;
          return (
            <button
              key={deger || 'tumu'}
              role="tab"
              aria-selected={secili}
              onClick={() => guncelle({ turu: deger || undefined })}
              className={`${sekme} ${
                secili
                  ? 'bg-marka text-white'
                  : 'text-metinIkincil hover:bg-zemin'
              }`}
            >
              {metin}
            </button>
          );
        })}
      </div>

      {/* Arama + siralama — her zaman gorunur */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            const v = new FormData(e.currentTarget).get('q');
            guncelle({ q: typeof v === 'string' ? v : undefined });
          }}
        >
          <Search
            size={15}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-metinSonuk"
            aria-hidden
          />
          <input
            name="q"
            defaultValue={filtre.q ?? ''}
            placeholder="Mahalle, ilçe veya taşınmaz no"
            aria-label="Arama"
            className={`${alan} pl-8`}
          />
        </form>

        <select
          value={filtre.siralama}
          onChange={(e) => guncelle({ sirala: e.target.value })}
          aria-label="Sıralama"
          className={`${alan} sm:w-56`}
        >
          {Object.entries(SIRALAMALAR).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setAcik((a) => !a)}
          aria-expanded={acik}
          className="dokunulabilir flex items-center justify-center gap-2 rounded-rozet border border-cizgi bg-kart px-3 py-2 text-sm font-semibold text-metin"
        >
          <SlidersHorizontal size={15} aria-hidden />
          Filtreler
          {aktifSayi > 0 && (
            <span className="sayi rounded-full bg-marka px-1.5 text-rozet font-bold text-white">
              {aktifSayi}
            </span>
          )}
        </button>
      </div>

      {/* Genisletilebilir filtreler */}
      {acik && (
        <div className="kart mt-2 grid grid-cols-2 gap-3 p-3 sm:grid-cols-4">
          <div>
            <label className={etiket} htmlFor="f-ilce">İlçe</label>
            <select
              id="f-ilce"
              value={filtre.ilce ?? ''}
              onChange={(e) => guncelle({ ilce: e.target.value })}
              className={alan}
            >
              <option value="">Tümü</option>
              {ilceler.map((i) => (
                <option key={i.ilceAd} value={i.ilceAd}>
                  {i.ilceAd} ({i.adet})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={etiket} htmlFor="f-tipi">Taşınmaz tipi</label>
            <select
              id="f-tipi"
              value={filtre.tipi ?? ''}
              onChange={(e) => guncelle({ tipi: e.target.value })}
              className={alan}
            >
              <option value="">Tümü</option>
              {TIPLER.map((t) => (
                <option key={t} value={t}>{TIP_METIN[t]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={etiket} htmlFor="f-oda">Oda sayısı</label>
            <input
              id="f-oda"
              defaultValue={filtre.odaSayisi ?? ''}
              placeholder="3+1"
              onBlur={(e) => guncelle({ oda: e.target.value })}
              className={alan}
            />
          </div>

          <div className="col-span-2">
            <span className={etiket}>Fiyat aralığı (TL)</span>
            <div className="flex items-center gap-2">
              <input
                inputMode="numeric"
                defaultValue={filtre.enAzLira ?? ''}
                placeholder="en az"
                aria-label="En az fiyat"
                onBlur={(e) => guncelle({ enaz: e.target.value.replace(/\D/g, '') })}
                className={`sayi ${alan}`}
              />
              <span className="text-metinSonuk">–</span>
              <input
                inputMode="numeric"
                defaultValue={filtre.enCokLira ?? ''}
                placeholder="en çok"
                aria-label="En çok fiyat"
                onBlur={(e) => guncelle({ encok: e.target.value.replace(/\D/g, '') })}
                className={`sayi ${alan}`}
              />
            </div>
          </div>

          <div className="col-span-2">
            <span className={etiket}>Brüt m²</span>
            <div className="flex items-center gap-2">
              <input
                inputMode="numeric"
                defaultValue={filtre.enAzM2 ?? ''}
                placeholder="en az"
                aria-label="En az m²"
                onBlur={(e) => guncelle({ m2az: e.target.value.replace(/\D/g, '') })}
                className={`sayi ${alan}`}
              />
              <span className="text-metinSonuk">–</span>
              <input
                inputMode="numeric"
                defaultValue={filtre.enCokM2 ?? ''}
                placeholder="en çok"
                aria-label="En çok m²"
                onBlur={(e) => guncelle({ m2cok: e.target.value.replace(/\D/g, '') })}
                className={`sayi ${alan}`}
              />
            </div>
          </div>

          {aktifSayi > 0 && (
            <button
              type="button"
              onClick={() => router.push('/ilanlar')}
              className="dokunulabilir col-span-2 flex items-center justify-center gap-1.5 rounded-rozet border border-cizgi px-3 py-2 text-sm font-semibold text-metinIkincil sm:col-span-4"
            >
              <X size={14} aria-hidden /> Filtreleri temizle
            </button>
          )}
        </div>
      )}
    </div>
  );
}
