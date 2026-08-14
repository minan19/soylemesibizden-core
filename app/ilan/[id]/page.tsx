import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin, Hash, Building2, ImageOff } from 'lucide-react';
import { ilanGetir } from '@/lib/ilanSorgu';
import { KanitSeridi } from '@/components/kanit/KanitSeridi';
import { FiyatGecmisi } from '@/components/kanit/FiyatGecmisi';
import { GorselKoken } from '@/components/kanit/GorselKoken';
import { kurus, m2Fiyat, yayindaSure, goreliGun } from '@/lib/bicim';

export const dynamic = 'force-dynamic';

/**
 * /ilan/[id] · 14.08.2026 (TRT)
 *
 * Urunun tezi bu sayfada gorunur hale gelir: skor yok, kanit var.
 * Fiyat gecmisi, yetki kaydi, teyit tarihi ve tapu kimligi — hepsi
 * veritabanindaki olgular. Tahmin, "yatirim notu" veya guven yuzdesi
 * gosterilmez (ADR-001).
 */

function Satir({ etiket, deger }: { etiket: string; deger: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-sm text-metinIkincil">{etiket}</dt>
      <dd className="sayi text-sm font-semibold text-metin">{deger}</dd>
    </div>
  );
}

export default async function IlanDetayPage({
  params,
}: {
  params: { id: string };
}) {
  const ilan = await ilanGetir(params.id);
  if (!ilan || ilan.durumu !== 'YAYINDA') notFound();

  const t = ilan.tasinmaz;
  const kontrolEdilen = ilan.medyalar.filter((m) => m.algiHash).length;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/ilanlar"
        className="dokunulabilir mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-metinIkincil hover:text-metin"
      >
        <ArrowLeft size={16} aria-hidden /> İlanlar
      </Link>

      {/* Gorsel */}
      <div className="mb-5 aspect-[16/9] w-full overflow-hidden rounded-kart border border-cizgi bg-zemin">
        {ilan.medyalar[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ilan.medyalar[0].url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-metinSonuk">
            <ImageOff size={26} aria-hidden />
          </div>
        )}
      </div>

      {/* Fiyat + baslik */}
      <div className="mb-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="sayi text-2xl font-extrabold tracking-tight text-metin sm:text-3xl">
            {kurus(ilan.fiyatKurus)}
          </span>
          {ilan.turu === 'KIRALIK' && (
            <span className="text-base text-metinIkincil">/ ay</span>
          )}
          <span className="sayi text-sm text-metinIkincil">
            {m2Fiyat(ilan.fiyatKurus, t.brutM2)}
          </span>
        </div>

        <h1 className="mt-2 text-lg font-bold text-metin">{ilan.baslik}</h1>

        <p className="mt-1 flex items-center gap-1.5 text-sm text-metinIkincil">
          <MapPin size={14} aria-hidden />
          {t.mahalle.ilAd} / {t.mahalle.ilceAd} / {t.mahalle.mahalleAd}
        </p>
      </div>

      {/* Kanitlar */}
      <div className="kart mb-5 p-4">
        <h2 className="mb-3 text-sm font-bold text-metin">Doğrulama kanıtları</h2>
        <KanitSeridi
          yogun
          k={{
            yetkiTuru: ilan.yetki.turu,
            yetkiDurumu: ilan.yetki.durumu,
            yetkiKaynagi: ilan.yetki.kaynak,
            sonTeyitTs: ilan.sonTeyitTs,
            teyitSonTarih: ilan.teyitSonTarih,
            fiyatDegisimSayisi: Math.max(0, ilan.fiyatGecmisi.length - 1),
            gorselKontrolEdilen: kontrolEdilen,
            gorselToplam: ilan._count.medyalar,
          }}
        />
        <p className="mt-3 border-t border-cizgi pt-3 text-mikro text-metinSonuk">
          Bu alanda güven puanı gösterilmez. Yalnızca kayıtlı olgular
          listelenir; değerlendirmeyi siz yaparsınız.
        </p>
      </div>

      {/* Fiyat gecmisi */}
      <section className="kart mb-5 p-4">
        <h2 className="mb-3 text-sm font-bold text-metin">Fiyat geçmişi</h2>
        <FiyatGecmisi kayitlar={ilan.fiyatGecmisi} />
      </section>

      {/* Gorsellerin kokeni */}
      <div className="mb-5">
        <GorselKoken medyalar={ilan.medyalar} />
      </div>

      {/* Tapu kimligi */}
      <section className="kart mb-5 p-4">
        <h2 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-metin">
          <Hash size={14} aria-hidden /> Taşınmaz kimliği
        </h2>
        <p className="mb-2 text-mikro text-metinSonuk">
          Bir taşınmaz numarası = bir kart. Aynı taşınmaz için mükerrer ilan
          yapısal olarak üretilemez.
        </p>
        <dl className="divide-y divide-cizgi border-t border-cizgi">
          <Satir etiket="Taşınmaz no" deger={t.tasinmazNo} />
          <Satir etiket="Ada / Parsel" deger={`${t.ada ?? '—'} / ${t.parsel ?? '—'}`} />
          <Satir etiket="Tip" deger={t.tipi} />
          <Satir etiket="Brüt / Net m²" deger={`${t.brutM2 ?? '—'} / ${t.netM2 ?? '—'}`} />
        </dl>
      </section>

      {/* Ilan bilgileri */}
      <section className="kart mb-5 p-4">
        <h2 className="mb-1 text-sm font-bold text-metin">İlan bilgileri</h2>
        <dl className="divide-y divide-cizgi border-t border-cizgi">
          <Satir etiket="Oda sayısı" deger={ilan.odaSayisi ?? '—'} />
          <Satir etiket="Bina yaşı" deger={ilan.binaYasi ?? '—'} />
          <Satir etiket="Kat" deger={ilan.kat ?? '—'} />
          <Satir etiket="Eşyalı" deger={ilan.esyali ? 'Evet' : 'Hayır'} />
          <Satir etiket="Yayında" deger={yayindaSure(ilan.yayinTs)} />
          <Satir etiket="Son teyit" deger={goreliGun(ilan.sonTeyitTs)} />
        </dl>
      </section>

      {/* Ilan sahibi */}
      <section className="kart p-4">
        <h2 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-metin">
          <Building2 size={14} aria-hidden /> İlanı veren
        </h2>
        <dl className="divide-y divide-cizgi border-t border-cizgi">
          <Satir etiket="Rol" deger={ilan.sahibi.rol} />
          {ilan.ofis && (
            <>
              <Satir etiket="Ofis" deger={ilan.ofis.unvan} />
              <Satir
                etiket="Yetki belgesi"
                deger={
                  ilan.ofis.yetkiBelgeGecerli
                    ? ilan.ofis.yetkiBelgeNo
                    : 'geçerli değil'
                }
              />
            </>
          )}
          <Satir etiket="Açık şikâyet" deger={ilan._count.sikayetler} />
        </dl>
      </section>
    </main>
  );
}
