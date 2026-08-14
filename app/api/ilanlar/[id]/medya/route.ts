import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import { algiHashHesapla, icerikHashHesapla } from '@/lib/algiHash';
import { gorselDenetle } from '@/lib/gorselDenetim';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const IZINLI_TIPLER = ['image/jpeg', 'image/png', 'image/webp'];
const AZAMI_BAYT = 10 * 1024 * 1024;
const AZAMI_GORSEL = 20;

/**
 * POST /api/ilanlar/[id]/medya · 14.08.2026 (TRT)
 *
 * Gorsel ekler ve GORSEL BUTUNLUGU denetimi yapar.
 *
 * Parmak izleri SUNUCUDA hesaplanir. Istemcinin gonderdigi hash'e
 * guvenmek, ozelligi tamamen anlamsiz kilardi: kopya fotograf
 * yukleyen kisi sahte hash gonderirdi.
 *
 * Bulgu ENGELLEMEZ, ISARETLER. Ayni fotografin iki ilanda gorunmesi
 * her zaman dolandiricilik degildir; yanlis pozitifle masum bir
 * kullaniciyi damgalamak, cozmeye calistigimiz sorunu uretmek olur.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
    if (!kullaniciId) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const rl = await checkRateLimit(`medya:${kullaniciId}`, { limit: 40, window: '10 m' });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla yükleme.' }, { status: 429 });
    }

    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        sahibiId: true,
        ofisId: true,
        _count: { select: { medyalar: true } },
      },
    });
    if (!ilan) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId },
      select: { ofisId: true, rol: true },
    });
    const yetkili =
      ilan.sahibiId === kullaniciId ||
      (ilan.ofisId !== null && ilan.ofisId === kullanici?.ofisId) ||
      kullanici?.rol === 'ADMIN';
    if (!yetkili) {
      return NextResponse.json({ error: 'Bu ilana görsel ekleyemezsiniz.' }, { status: 403 });
    }

    if (ilan._count.medyalar >= AZAMI_GORSEL) {
      return NextResponse.json(
        { error: `Bir ilana en fazla ${AZAMI_GORSEL} görsel eklenebilir.` },
        { status: 409 }
      );
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!IZINLI_TIPLER.includes(contentType)) {
      return NextResponse.json(
        { error: 'Sadece JPEG, PNG veya WebP yüklenebilir.' },
        { status: 400 }
      );
    }

    const govde = Buffer.from(await request.arrayBuffer());
    if (govde.length === 0) {
      return NextResponse.json({ error: 'Boş dosya.' }, { status: 400 });
    }
    if (govde.length > AZAMI_BAYT) {
      return NextResponse.json({ error: 'Dosya 10MB\'ı geçemez.' }, { status: 400 });
    }

    // ── PARMAK IZLERI (sunucuda) ─────────────────────────────────
    let icerikHash: string;
    let algiHash: string;
    try {
      icerikHash = icerikHashHesapla(govde);
      algiHash = await algiHashHesapla(govde);
    } catch {
      // Cozulemeyen dosya gorsel degildir. content-type yalan olabilir.
      return NextResponse.json(
        { error: 'Dosya geçerli bir görsel değil.' },
        { status: 400 }
      );
    }

    // ── BUTUNLUK DENETIMI ────────────────────────────────────────
    const denetim = await gorselDenetle({
      algiHash,
      icerikHash,
      haricIlanId: ilan.id,
    });

    // ── DEPOLAMA ─────────────────────────────────────────────────
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      // Depolama yoksa KAYIT OLUSTURULMAZ. Var olmayan bir URL'yi
      // veritabanina yazmak, temizledigimiz placeholder.blob
      // hatasinin aynisi olurdu.
      return NextResponse.json(
        {
          error: 'Görsel depolama yapılandırılmamış.',
          detay: 'BLOB_READ_WRITE_TOKEN tanımlı değil.',
          // Denetim yine de doner — hash hesaplandi, bilgi degerli.
          denetim,
        },
        { status: 503 }
      );
    }

    const uzanti = contentType.split('/')[1].replace('jpeg', 'jpg');
    const yol = `ilan/${ilan.id}/${Date.now()}-${algiHash}.${uzanti}`;

    const blob = await fetch(`https://blob.vercel-storage.com/${yol}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': contentType,
        'x-api-version': '7',
        'x-add-random-suffix': '1',
      },
      body: govde,
    });

    if (!blob.ok) {
      console.error('[medya] blob hatasi', await blob.text());
      return NextResponse.json({ error: 'Görsel yüklenemedi.' }, { status: 502 });
    }

    const { url } = (await blob.json()) as { url: string };

    const medya = await prisma.medya.create({
      data: {
        ilanId: ilan.id,
        url,
        sira: ilan._count.medyalar,
        icerikHash,
        algiHash,
      },
      select: { id: true, url: true, sira: true },
    });

    return NextResponse.json({ ...medya, denetim }, { status: 201 });
  } catch (error) {
    console.error('[medya POST]', error);
    return NextResponse.json({ error: 'Görsel eklenemedi.' }, { status: 500 });
  }
}
