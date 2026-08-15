import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';

export const dynamic = 'force-dynamic';

/**
 * POST /api/ilanlar/[id]/randevu · 15.08.2026 (TRT)
 *
 * Gosterim randevusu talebi.
 *
 * Randevu kaydinin asil amaci takvim degil: gosterimin GERCEKTEN
 * olup olmadigini ve ilandaki tasinmazin mi gosterildigini
 * kayit altina almak. Yem ilan zincirinin ilk halkasi.
 */

const govde = z.object({
  // ISO 8601. Gecmis tarih kabul edilmez.
  tarih: z.string().datetime({ message: 'Geçerli bir tarih giriniz.' }),
  notlar: z.string().trim().max(1000).optional(),
});

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

    const rl = await checkRateLimit(`randevu:${kullaniciId}`, {
      limit: 10,
      window: '1 h',
    });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla randevu talebi.' }, { status: 429 });
    }

    const ayristirilan = govde.safeParse(await request.json());
    if (!ayristirilan.success) {
      return NextResponse.json(
        { error: ayristirilan.error.issues[0].message },
        { status: 400 }
      );
    }

    const tarih = new Date(ayristirilan.data.tarih);
    if (tarih.getTime() <= Date.now()) {
      return NextResponse.json(
        { error: 'Randevu tarihi gelecekte olmalıdır.' },
        { status: 400 }
      );
    }

    const ilan = await prisma.ilan.findUnique({
      where: { id: params.id },
      select: { id: true, durumu: true, sahibiId: true },
    });
    if (!ilan) {
      return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });
    }

    // Yayinda olmayan ilana randevu alinamaz. Pasiflesmis bir ilan
    // icin gosterim kaydi acmak, dusmus ilani canli gostermek olur.
    if (ilan.durumu !== 'YAYINDA') {
      return NextResponse.json(
        { error: 'Bu ilan yayında değil; randevu alınamaz.' },
        { status: 409 }
      );
    }

    if (ilan.sahibiId === kullaniciId) {
      return NextResponse.json(
        { error: 'Kendi ilanınıza randevu alamazsınız.' },
        { status: 409 }
      );
    }

    // Ayni kullanicinin bu ilan icin acik randevusu var mi
    const mevcut = await prisma.randevu.findFirst({
      where: {
        ilanId: ilan.id,
        talepEdenId: kullaniciId,
        durumu: { in: ['TALEP', 'ONAYLANDI'] },
      },
      select: { id: true, durumu: true, tarih: true },
    });
    if (mevcut) {
      return NextResponse.json(
        {
          error: 'Bu ilan için zaten açık bir randevunuz var.',
          mevcutRandevu: mevcut,
        },
        { status: 409 }
      );
    }

    const randevu = await prisma.randevu.create({
      data: {
        ilanId: ilan.id,
        talepEdenId: kullaniciId,
        tarih,
        notlar: ayristirilan.data.notlar,
        durumu: 'TALEP',
      },
      select: { id: true, durumu: true, tarih: true },
    });

    return NextResponse.json(randevu, { status: 201 });
  } catch (error) {
    console.error('[randevu POST]', error);
    return NextResponse.json({ error: 'Randevu oluşturulamadı.' }, { status: 500 });
  }
}
