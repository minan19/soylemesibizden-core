import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import { filtreCoz, filtreUrl, aktifFiltreSayisi } from '@/lib/ilanFiltre';

export const dynamic = 'force-dynamic';

/** Bir kullanicinin tutabilecegi azami kayitli arama. */
const AZAMI_ARAMA = 20;

/**
 * /api/aramalar · 15.08.2026 (TRT)
 *
 * Kayitli arama + yeni ilan bildirimi.
 *
 * Stratejik onemi: arz yogunlugu dusukken kullaniciyi geri getiren
 * tek mekanizma budur. Kullanici bugun aradigini bulamasa da,
 * kriterine uyan ilan cikinca haber alir.
 *
 * Kriterler HAM URL PARAMETRESI olarak degil, DOGRULANMIS filtre
 * olarak saklanir (filtreCoz'den gecirilir). Boylece kaydedilmis
 * bir aramada gecersiz veya kotu niyetli deger tasinamaz.
 */

const govde = z.object({
  ad: z.string().trim().min(2, 'Arama adı en az 2 karakter olmalı.').max(80),
  /** /ilanlar sayfasindaki sorgu dizesi — "?ilce=Kadıköy&turu=SATILIK" */
  sorgu: z.string().max(500).default(''),
  bildirimAcik: z.boolean().default(true),
});

function sorguyuCoz(sorgu: string): Record<string, string> {
  const temiz = sorgu.startsWith('?') ? sorgu.slice(1) : sorgu;
  return Object.fromEntries(new URLSearchParams(temiz));
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
  if (!kullaniciId) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }

  const aramalar = await prisma.kayitliArama.findMany({
    where: { kullaniciId },
    orderBy: { eklendi: 'desc' },
  });

  return NextResponse.json(
    aramalar.map((a) => ({
      id: a.id,
      ad: a.ad,
      bildirimAcik: a.bildirimAcik,
      sonBildirimTs: a.sonBildirimTs,
      eklendi: a.eklendi,
      // Kriterleri tekrar URL'e cevirip veriyoruz ki arayuz
      // dogrudan /ilanlar<url> baglantisi kurabilsin.
      url: '/ilanlar' + filtreUrl(filtreCoz(a.kriterler as Record<string, string>)),
    }))
  );
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
    if (!kullaniciId) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const rl = await checkRateLimit(`arama:${kullaniciId}`, { limit: 20, window: '1 h' });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla istek.' }, { status: 429 });
    }

    const ayristirilan = govde.safeParse(await request.json());
    if (!ayristirilan.success) {
      return NextResponse.json(
        { error: ayristirilan.error.issues[0].message },
        { status: 400 }
      );
    }
    const { ad, sorgu, bildirimAcik } = ayristirilan.data;

    const sayi = await prisma.kayitliArama.count({ where: { kullaniciId } });
    if (sayi >= AZAMI_ARAMA) {
      return NextResponse.json(
        { error: `En fazla ${AZAMI_ARAMA} arama kaydedebilirsiniz.` },
        { status: 409 }
      );
    }

    // Ham sorgu degil, DOGRULANMIS filtre saklanir.
    const filtre = filtreCoz(sorguyuCoz(sorgu));
    if (aktifFiltreSayisi(filtre) === 0) {
      return NextResponse.json(
        {
          error: 'Kaydedilecek bir filtre yok.',
          detay: 'En az bir kriter seçin; boş arama kaydetmek anlam taşımaz.',
        },
        { status: 400 }
      );
    }

    // Sayfa numarasi ve siralama kaydedilmez — bunlar aramanin
    // kriteri degil, o anki gorunumun ayari.
    const kriterler = sorguyuCoz(filtreUrl({ ...filtre, sayfa: 1, siralama: 'yayin-yeni' }));

    const arama = await prisma.kayitliArama.create({
      data: {
        kullaniciId,
        ad,
        kriterler,
        bildirimAcik,
        // Ilk bildirim penceresi kayit anindan baslar; gecmis ilanlar
        // "yeni" diye bildirilmez.
        sonBildirimTs: new Date(),
      },
      select: { id: true, ad: true, bildirimAcik: true, kriterler: true },
    });

    return NextResponse.json(arama, { status: 201 });
  } catch (error) {
    console.error('[aramalar POST]', error);
    return NextResponse.json({ error: 'Arama kaydedilemedi.' }, { status: 500 });
  }
}
