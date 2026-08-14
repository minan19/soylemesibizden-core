import { SearchX } from 'lucide-react';
import { ilanlariGetir } from '@/lib/ilanSorgu';
import { IlanKarti } from '@/components/ilan/IlanKarti';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'İlanlar — Söylemesi Bizden' };

/**
 * /ilanlar · 14.08.2026 (TRT)
 *
 * v2 ilan listesi. Yalnizca durumu YAYINDA olan ilanlar gosterilir —
 * taslak, moderasyondaki ve teyit suresi dolup pasiflesen ilanlar
 * listede yer almaz. Hayalet ilan sorununun cozumu, filtrede degil
 * ilan yasam dongusunde.
 */

export default async function IlanlarPage({
  searchParams,
}: {
  searchParams: { ilce?: string; tur?: string };
}) {
  const turu =
    searchParams.tur === 'kiralik'
      ? ('KIRALIK' as const)
      : searchParams.tur === 'satilik'
        ? ('SATILIK' as const)
        : undefined;

  const { ilanlar, toplam } = await ilanlariGetir({
    ilceAd: searchParams.ilce,
    turu,
    adet: 20,
  });

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-metin sm:text-2xl">
          İlanlar
        </h1>
        <p className="sayi mt-1 text-sm text-metinIkincil">
          {toplam} yayında ilan
          {searchParams.ilce ? ` · ${searchParams.ilce}` : ''}
        </p>
      </header>

      {ilanlar.length === 0 ? (
        <div className="kart flex flex-col items-center gap-3 p-8 text-center">
          <SearchX size={28} className="text-metinSonuk" aria-hidden />
          <p className="font-semibold text-metin">Yayında ilan yok.</p>
          <p className="max-w-sm text-sm text-metinIkincil">
            Bu platformda ilan yayınlanabilmesi için EİDS üzerinden yetki
            doğrulaması zorunludur. Doğrulanmamış hiçbir ilan listelenmez.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {ilanlar.map((i) => (
            <IlanKarti key={i.id} ilan={i} />
          ))}
        </div>
      )}
    </main>
  );
}
