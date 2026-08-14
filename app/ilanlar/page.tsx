import Link from 'next/link';
import { SearchX, ChevronLeft, ChevronRight } from 'lucide-react';
import { ilanAra, ilceleriGetir } from '@/lib/ilanSorgu';
import { filtreCoz, filtreUrl, aktifFiltreSayisi } from '@/lib/ilanFiltre';
import { IlanKarti } from '@/components/ilan/IlanKarti';
import { FiltrePaneli } from '@/components/ilan/FiltrePaneli';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'İlanlar — Söylemesi Bizden' };

/**
 * /ilanlar · 14.08.2026 (TRT)
 *
 * Yalnizca durumu YAYINDA olan ilanlar. Taslak, moderasyondaki ve
 * teyit suresi dolup pasiflesen ilanlar aramada gorunmez — hayalet
 * ilan cozumu filtrede degil, ilan yasam dongusunde.
 */

export default async function IlanlarPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filtre = filtreCoz(searchParams);
  const [sonuc, ilceler] = await Promise.all([ilanAra(filtre), ilceleriGetir()]);
  const aktif = aktifFiltreSayisi(filtre);

  const sayfaUrl = (n: number) => `/ilanlar${filtreUrl({ ...filtre, sayfa: n })}`;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-4">
        <h1 className="text-xl font-extrabold tracking-tight text-metin sm:text-2xl">
          İlanlar
        </h1>
        <p className="sayi mt-1 text-sm text-metinIkincil">
          {sonuc.toplam} yayında ilan
          {aktif > 0 && ` · ${aktif} filtre etkin`}
        </p>
      </header>

      <FiltrePaneli filtre={filtre} ilceler={ilceler} aktifSayi={aktif} />

      {sonuc.ilanlar.length === 0 ? (
        <div className="kart flex flex-col items-center gap-3 p-8 text-center">
          <SearchX size={28} className="text-metinSonuk" aria-hidden />
          <p className="font-semibold text-metin">
            {aktif > 0 ? 'Bu filtrelerle ilan bulunamadı.' : 'Yayında ilan yok.'}
          </p>
          <p className="max-w-sm text-sm text-metinIkincil">
            {aktif > 0
              ? 'Filtreleri gevşetmeyi deneyin.'
              : 'Bu platformda ilan yayınlanabilmesi için EİDS üzerinden yetki doğrulaması zorunludur. Doğrulanmamış hiçbir ilan listelenmez.'}
          </p>
          {aktif > 0 && (
            <Link
              href="/ilanlar"
              className="dokunulabilir inline-flex items-center rounded-rozet border border-cizgi px-3 py-2 text-sm font-semibold text-metin"
            >
              Filtreleri temizle
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {sonuc.ilanlar.map((i) => (
              <IlanKarti key={i.id} ilan={i} />
            ))}
          </div>

          {sonuc.sayfaAdedi > 1 && (
            <nav
              className="mt-5 flex items-center justify-between gap-3"
              aria-label="Sayfalama"
            >
              {sonuc.sayfa > 1 ? (
                <Link
                  href={sayfaUrl(sonuc.sayfa - 1)}
                  className="dokunulabilir flex items-center gap-1 rounded-rozet border border-cizgi bg-kart px-3 py-2 text-sm font-semibold text-metin"
                >
                  <ChevronLeft size={15} aria-hidden /> Önceki
                </Link>
              ) : (
                <span />
              )}

              <span className="sayi text-mikro text-metinIkincil">
                Sayfa {sonuc.sayfa} / {sonuc.sayfaAdedi}
              </span>

              {sonuc.sayfa < sonuc.sayfaAdedi ? (
                <Link
                  href={sayfaUrl(sonuc.sayfa + 1)}
                  className="dokunulabilir flex items-center gap-1 rounded-rozet border border-cizgi bg-kart px-3 py-2 text-sm font-semibold text-metin"
                >
                  Sonraki <ChevronRight size={15} aria-hidden />
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
