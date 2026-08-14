import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import { teyitEdilebilirMi, yeniTeyitSonTarihi } from '@/lib/teyit';

export const dynamic = 'force-dynamic';

/**
 * POST /api/ilanlar/[id]/teyit · 14.08.2026 (TRT)
 *
 * Ilan sahibi "bu ilan hala gecerli" beyanini yeniler.
 *
 * Teyit, yetkiyi CANLANDIRMAZ. Yetkisi bitmis bir ilan teyit
 * edilerek yayinda tutulamaz; yeni teyit tarihi yetki bitisini
 * gecemez. Aksi halde EIDS kapisinin etrafindan dolasilirdi.
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

    const rl = await checkRateLimit(`teyit:${kullaniciId}`, {
      limit: 30,
      window: '10 m',
    });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla istek.' }, { status: 429 });
    }

    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        durumu: true,
        sahibiId: true,
        ofisId: true,
        yetki: { select: { durumu: true, bitis: true } },
      },
    });

    if (!ilan) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    // Sahiplik: ilan sahibi veya ilana bagli ofisin personeli
    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId },
      select: { ofisId: true, rol: true },
    });

    const yetkili =
      ilan.sahibiId === kullaniciId ||
      (ilan.ofisId !== null && ilan.ofisId === kullanici?.ofisId) ||
      kullanici?.rol === 'ADMIN';

    if (!yetkili) {
      return NextResponse.json(
        { error: 'Bu ilanı teyit etme yetkiniz yok.' },
        { status: 403 }
      );
    }

    const kontrol = teyitEdilebilirMi({
      ilanDurumu: ilan.durumu,
      yetkiDurumu: ilan.yetki.durumu,
      yetkiBitis: ilan.yetki.bitis,
    });

    if (!kontrol.edilebilir) {
      return NextResponse.json({ error: kontrol.sebep }, { status: 409 });
    }

    const simdi = new Date();
    const yeniSonTarih = yeniTeyitSonTarihi(ilan.yetki.bitis, simdi);

    const guncel = await prisma.ilan.update({
      where: { id: ilan.id },
      data: {
        sonTeyitTs: simdi,
        teyitSonTarih: yeniSonTarih,
        durumu: 'YAYINDA',
        otomatikPasifTs: null,
      },
      select: { id: true, sonTeyitTs: true, teyitSonTarih: true, durumu: true },
    });

    return NextResponse.json(guncel);
  } catch (error) {
    console.error('[teyit]', error);
    return NextResponse.json({ error: 'Teyit işlenemedi.' }, { status: 500 });
  }
}
