import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Building2, ShieldCheck, ShieldX, Clock, ArrowLeft } from 'lucide-react';
import prisma from '@/lib/prisma';
import { slaHesapla, slaMetni, SIKAYET_METIN, type SikayetTuru } from '@/lib/sikayet';
import { goreliGun } from '@/lib/bicim';

export const dynamic = 'force-dynamic';

/**
 * /ofis/[id] · 14.08.2026 (TRT)
 *
 * OFIS PROFILI — SLA ACIK.
 *
 * Bu sayfanin varlik sebebi tek bir sey: bir emlak ofisinin
 * sikayetleri kac saatte kapattigini HERKESE gostermek.
 *
 * Sahibinden'in son bir yildaki 4.753 sikayetinin ~%16'si cozulmus
 * gorunuyor. Bu rakam kimsenin sayfasinda yazmiyor. Yazsaydi
 * degisirdi — olculen sey duzelir.
 *
 * Burada ofise PUAN VERILMEZ. Sayilar oldugu gibi gosterilir;
 * yorumu okuyan yapar (ADR-001).
 */

function Kutu({
  baslik, deger, alt,
}: { baslik: string; deger: React.ReactNode; alt?: string }) {
  return (
    <div className="rounded-kart border border-cizgi bg-kart p-3">
      <p className="text-mikro font-semibold text-metinIkincil">{baslik}</p>
      <p className="sayi mt-0.5 text-xl font-extrabold text-metin">{deger}</p>
      {alt && <p className="mt-0.5 text-mikro text-metinSonuk">{alt}</p>}
    </div>
  );
}

export default async function OfisPage({ params }: { params: { id: string } }) {
  const ofis = await prisma.emlakOfisi.findUnique({
    where: { id: params.id },
    include: {
      _count: { select: { ilanlar: true, personel: true } },
    },
  });
  if (!ofis) notFound();

  // Ofise bagli ilanlarin sikayetleri
  const sikayetler = await prisma.sikayet.findMany({
    where: { ilan: { ofisId: ofis.id } },
    select: { turu: true, acilisTs: true, kapanisTs: true, sonuc: true },
    orderBy: { acilisTs: 'desc' },
    take: 200,
  });

  const sla = slaHesapla(sikayetler);

  const turDagilimi = sikayetler.reduce<Record<string, number>>((a, s) => {
    a[s.turu] = (a[s.turu] ?? 0) + 1;
    return a;
  }, {});

  const yayindaIlan = await prisma.ilan.count({
    where: { ofisId: ofis.id, durumu: 'YAYINDA' },
  });

  const belgeGecerli =
    ofis.yetkiBelgeGecerli && ofis.yetkiBelgeBitis > new Date();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        href="/ilanlar"
        className="dokunulabilir mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-metinIkincil hover:text-metin"
      >
        <ArrowLeft size={16} aria-hidden /> İlanlar
      </Link>

      <header className="mb-5">
        <h1 className="flex items-start gap-2 text-xl font-extrabold tracking-tight text-metin sm:text-2xl">
          <Building2 size={22} className="mt-0.5 shrink-0" aria-hidden />
          {ofis.unvan}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {belgeGecerli ? (
            <span className="rozet bg-marka-acik text-marka-koyu">
              <ShieldCheck size={12} aria-hidden />
              Yetki belgesi geçerli · {ofis.yetkiBelgeNo}
            </span>
          ) : (
            <span className="rozet bg-red-50 text-risk">
              <ShieldX size={12} aria-hidden />
              Yetki belgesi geçerli değil
            </span>
          )}
          <span className="rozet bg-zemin text-metinIkincil">
            MERSİS {ofis.mersisNo}
          </span>
        </div>
      </header>

      {/* SLA — sayfanin varlik sebebi */}
      <section className="mb-5">
        <h2 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-metin">
          <Clock size={14} aria-hidden /> Şikâyet çözüm performansı
        </h2>
        <p className="mb-3 text-sm text-metinIkincil">{slaMetni(sla)}</p>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Kutu baslik="Toplam şikâyet" deger={sla.toplam} />
          <Kutu baslik="Açık" deger={sla.acik} alt="henüz kapatılmadı" />
          <Kutu
            baslik="Ortanca süre"
            deger={sla.ortancaSaat !== null ? `${sla.ortancaSaat} sa` : '—'}
            alt="açılıştan kapanışa"
          />
          <Kutu
            baslik="48 saatte kapanan"
            deger={
              sla.kirkSekizSaatOrani !== null
                ? `%${Math.round(sla.kirkSekizSaatOrani * 100)}`
                : '—'
            }
          />
        </div>

        <p className="mt-2 text-mikro text-metinSonuk">
          Bu sayılar ofise verilmiş bir puan değildir. Kayıtlı şikâyetlerin
          açılış ve kapanış zamanlarından hesaplanır; yorumu siz yaparsınız.
        </p>
      </section>

      {/* Sikayet turleri */}
      {Object.keys(turDagilimi).length > 0 && (
        <section className="kart mb-5 p-4">
          <h2 className="mb-2 text-sm font-bold text-metin">
            Şikâyetlerin dağılımı
          </h2>
          <dl className="divide-y divide-cizgi border-t border-cizgi">
            {Object.entries(turDagilimi)
              .sort((a, b) => b[1] - a[1])
              .map(([tur, adet]) => (
                <div key={tur} className="flex justify-between gap-4 py-2">
                  <dt className="text-sm text-metinIkincil">
                    {SIKAYET_METIN[tur as SikayetTuru] ?? tur}
                  </dt>
                  <dd className="sayi text-sm font-semibold text-metin">{adet}</dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      {/* Ofis bilgileri */}
      <section className="kart p-4">
        <h2 className="mb-2 text-sm font-bold text-metin">Ofis bilgileri</h2>
        <dl className="divide-y divide-cizgi border-t border-cizgi">
          {[
            ['Yayındaki ilan', yayindaIlan],
            ['Toplam ilan kaydı', ofis._count.ilanlar],
            ['Kayıtlı personel', ofis._count.personel],
            ['Vergi no', ofis.vergiNo],
            ['İl trafik kodu', ofis.ilTrafikKodu],
            ['Belge bitiş', goreliGun(ofis.yetkiBelgeBitis)],
          ].map(([k, v]) => (
            <div key={String(k)} className="flex justify-between gap-4 py-2">
              <dt className="text-sm text-metinIkincil">{k}</dt>
              <dd className="sayi text-sm font-semibold text-metin">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
