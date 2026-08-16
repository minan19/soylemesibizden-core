import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import {
  AlertTriangle, Clock, CalendarClock, MessageSquare,
  Flag, Inbox, MapPin,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { panelIlanlari, panelRandevulari, panelOzetle } from '@/lib/panelSorgu';
import { TeyitDugmesi, RandevuIslemleri } from './PanelIslemler';
import { kurus, goreliGun, m2Fiyat } from '@/lib/bicim';
import { RANDEVU_METIN } from '@/lib/randevu';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Panel — Söylemesi Bizden' };

/**
 * /panel · 16.08.2026 (TRT)
 *
 * Ilan sahibinin ekrani.
 *
 * VARLIK SEBEBI: kurdugumuz otomatik pasiflestirme, teyit edecek bir
 * yuzey olmadan tek yonlu bir cezaya donusur. "Teyit etmedin, ilanin
 * dustu" demek ancak teyit edebilecegi bir yer varsa adildir.
 *
 * Bu yuzden ekran ACILIYETI ONE KOYAR: once ne yapilmasi gerektigi,
 * sonra geri kalani.
 */

const DURUM_ROZET: Record<string, { metin: string; sinif: string }> = {
  YAYINDA: { metin: 'Yayında', sinif: 'bg-marka-acik text-marka-koyu' },
  TEYIT_BEKLIYOR: { metin: 'Teyit bekliyor', sinif: 'bg-amber-50 text-uyari' },
  TASLAK: { metin: 'Taslak', sinif: 'bg-zemin text-metinIkincil' },
  MODERASYONDA: { metin: 'Moderasyonda', sinif: 'bg-zemin text-metinIkincil' },
  PASIF: { metin: 'Yayından kalktı', sinif: 'bg-red-50 text-risk' },
  YETKI_BEKLIYOR: { metin: 'Yetki bekliyor', sinif: 'bg-amber-50 text-uyari' },
  REDDEDILDI: { metin: 'Reddedildi', sinif: 'bg-red-50 text-risk' },
};

function OzetKutu({
  ikon: Ikon, sayi, etiket, acil,
}: {
  ikon: typeof Clock; sayi: number; etiket: string; acil?: boolean;
}) {
  if (sayi === 0) return null;
  return (
    <div
      className={`flex items-center gap-2 rounded-kart border p-3 ${
        acil ? 'border-amber-200 bg-amber-50' : 'border-cizgi bg-kart'
      }`}
    >
      <Ikon size={16} className={acil ? 'text-uyari' : 'text-metinIkincil'} aria-hidden />
      <div>
        <p className={`sayi text-lg font-extrabold ${acil ? 'text-uyari' : 'text-metin'}`}>
          {sayi}
        </p>
        <p className="text-mikro text-metinIkincil">{etiket}</p>
      </div>
    </div>
  );
}

export default async function PanelPage() {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;

  if (!kullaniciId) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
        <div className="kart p-5">
          <p className="font-semibold text-metin">Oturum gerekli</p>
          <Link
            href="/login"
            className="dokunulabilir mt-3 inline-flex rounded-rozet bg-marka px-4 py-2.5 text-sm font-bold text-white"
          >
            Giriş yap
          </Link>
        </div>
      </main>
    );
  }

  const [ilanlar, randevular] = await Promise.all([
    panelIlanlari(kullaniciId),
    panelRandevulari(kullaniciId),
  ]);
  const ozet = panelOzetle(ilanlar, randevular);

  // Aciliyet sirasi: teyit bekleyen -> yaklasan -> geri kalani
  const oncelik = (d: string, t: string) =>
    d === 'TEYIT_BEKLIYOR' ? 0 : t === 'yaklasiyor' ? 1 : d === 'PASIF' ? 3 : 2;
  const sirali = [...ilanlar].sort(
    (a, b) => oncelik(a.durumu, a.teyitDurum) - oncelik(b.durumu, b.teyitDurum)
  );

  const bekleyenRandevular = randevular.filter((r) => r.durumu === 'TALEP');
  const onayliRandevular = randevular.filter((r) => r.durumu === 'ONAYLANDI');

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-metin sm:text-2xl">
          Panel
        </h1>
        <p className="sayi mt-1 text-sm text-metinIkincil">
          {ilanlar.length} ilan
        </p>
      </header>

      {/* Yapilacaklar — yalnizca sifirdan buyuk olanlar gorunur */}
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <OzetKutu ikon={AlertTriangle} sayi={ozet.teyitBekleyen} etiket="teyit bekliyor" acil />
        <OzetKutu ikon={Clock} sayi={ozet.teyitYaklasan} etiket="teyit süresi yaklaşıyor" acil />
        <OzetKutu ikon={CalendarClock} sayi={ozet.bekleyenRandevu} etiket="randevu talebi" acil />
        <OzetKutu ikon={MessageSquare} sayi={ozet.okunmamisMesaj} etiket="okunmamış mesaj" />
        <OzetKutu ikon={Flag} sayi={ozet.acikSikayet} etiket="açık şikâyet" />
        <OzetKutu ikon={Inbox} sayi={ozet.otomatikDusen} etiket="otomatik düşen ilan" />
      </div>

      {/* Randevu talepleri */}
      {(bekleyenRandevular.length > 0 || onayliRandevular.length > 0) && (
        <section className="mb-6">
          <h2 className="mb-2 text-sm font-bold text-metin">Randevular</h2>
          <div className="space-y-2">
            {[...bekleyenRandevular, ...onayliRandevular].map((r) => (
              <div key={r.id} className="kart p-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={`/ilan/${r.ilanId}`}
                    className="text-sm font-semibold text-metin hover:underline"
                  >
                    {r.ilanBasligi}
                  </Link>
                  <span className="rozet bg-zemin text-metinIkincil">
                    {RANDEVU_METIN[r.durumu]}
                  </span>
                </div>
                <p className="sayi mt-1 text-mikro text-metinIkincil">
                  {r.talepEden} · {r.tarih.toLocaleString('tr-TR', {
                    dateStyle: 'medium', timeStyle: 'short',
                  })}
                </p>
                {r.notlar && (
                  <p className="mt-1 text-sm text-metinIkincil">{r.notlar}</p>
                )}
                <div className="mt-2">
                  <RandevuIslemleri randevuId={r.id} durumu={r.durumu} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ilanlar */}
      <section>
        <h2 className="mb-2 text-sm font-bold text-metin">İlanlarım</h2>

        {sirali.length === 0 ? (
          <div className="kart p-6 text-center">
            <p className="font-semibold text-metin">Henüz ilanınız yok.</p>
            <Link
              href="/ilan-ver"
              className="dokunulabilir mt-3 inline-flex rounded-rozet bg-marka px-4 py-2.5 text-sm font-bold text-white"
            >
              İlan ver
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {sirali.map((i) => {
              const rozet = DURUM_ROZET[i.durumu] ?? {
                metin: i.durumu, sinif: 'bg-zemin text-metinIkincil',
              };
              const acil =
                i.durumu === 'TEYIT_BEKLIYOR' || i.teyitDurum === 'yaklasiyor';

              return (
                <article
                  key={i.id}
                  className={`kart p-3 ${acil ? 'border-amber-200' : ''}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/ilan/${i.id}`}
                        className="text-sm font-semibold text-metin hover:underline"
                      >
                        {i.baslik}
                      </Link>
                      <p className="mt-0.5 flex items-center gap-1 text-mikro text-metinIkincil">
                        <MapPin size={11} aria-hidden /> {i.konum}
                      </p>
                    </div>
                    <span className={`rozet ${rozet.sinif}`}>{rozet.metin}</span>
                  </div>

                  <p className="sayi mt-1.5 flex flex-wrap items-baseline gap-x-3 text-sm">
                    <span className="font-bold text-metin">{kurus(i.fiyatKurus)}</span>
                    <span className="text-mikro text-metinIkincil">
                      {m2Fiyat(i.fiyatKurus, i.brutM2)}
                    </span>
                  </p>

                  {/* Teyit durumu — ekranin asil isi */}
                  <div className="mt-2 border-t border-cizgi pt-2">
                    {/*
                      otomatikPasifTs GECMISTE dolmus olabilir ve ilan
                      sonradan yayina donmus olabilir. Bu yuzden mesaj
                      yalnizca ilan SU AN pasifse gosterilir.
                      Aksi halde yayindaki bir ilana "dun yayindan
                      kalkti" denir — kullaniciyi bosuna telaslandirir.
                    */}
                    {i.durumu === 'PASIF' && i.otomatikPasifTs ? (
                      <p className="mb-2 text-mikro text-risk">
                        {goreliGun(i.otomatikPasifTs)} otomatik olarak yayından
                        kalktı. Yeniden yayınlamak için teyit edin.
                      </p>
                    ) : i.durumu === 'TEYIT_BEKLIYOR' ? (
                      <p className="mb-2 text-mikro font-semibold text-uyari">
                        Bu ilan hakkında bildirim geldi. Teyit edilmezse{' '}
                        {i.teyitSonTarih ? goreliGun(i.teyitSonTarih) : 'kısa sürede'}{' '}
                        yayından kalkacak.
                      </p>
                    ) : i.teyitDurum === 'yaklasiyor' ? (
                      <p className="mb-2 text-mikro font-semibold text-uyari">
                        Teyit süresi doluyor. Son teyit:{' '}
                        {goreliGun(i.sonTeyitTs)}.
                      </p>
                    ) : i.durumu === 'YAYINDA' ? (
                      <p className="mb-2 text-mikro text-metinSonuk">
                        Son teyit {goreliGun(i.sonTeyitTs)}.
                      </p>
                    ) : null}

                    {['YAYINDA', 'TEYIT_BEKLIYOR', 'PASIF'].includes(i.durumu) && (
                      <TeyitDugmesi
                        ilanId={i.id}
                        edilebilir={i.teyitEdilebilir}
                        engel={i.teyitEngeli}
                        vurgulu={acil}
                      />
                    )}
                  </div>

                  {(i.okunmamisMesaj > 0 || i.acikSikayet > 0 || i.bekleyenRandevu > 0) && (
                    <p className="mt-2 flex flex-wrap gap-2 text-mikro text-metinIkincil">
                      {i.okunmamisMesaj > 0 && (
                        <span className="rozet bg-zemin">
                          <MessageSquare size={11} aria-hidden />
                          {i.okunmamisMesaj} okunmamış
                        </span>
                      )}
                      {i.bekleyenRandevu > 0 && (
                        <span className="rozet bg-zemin">
                          <CalendarClock size={11} aria-hidden />
                          {i.bekleyenRandevu} randevu
                        </span>
                      )}
                      {i.acikSikayet > 0 && (
                        <span className="rozet bg-red-50 text-risk">
                          <Flag size={11} aria-hidden />
                          {i.acikSikayet} açık şikâyet
                        </span>
                      )}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
