import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import {
  gecisGecerliMi,
  geriBildirimVerilebilirMi,
  yemIlanSayilirMi,
  type RandevuDurumu,
} from '@/lib/randevu';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/randevular/[id] · 15.08.2026 (TRT)
 *
 * Iki farkli is yapar, ikisinin de yetkilisi FARKLI:
 *
 *   durum degisikligi  -> ilan sahibi / ofis (onayla, gerceklesti, gelmedi)
 *   geri bildirim      -> YALNIZCA gosterime giden ziyaretci
 *
 * Bu ayrim kasitli. Gosterimin gerceklestigini ilan sahibi isaretler
 * (o biliyor), ilandaki tasinmazin gosterilip gosterilmedigini ise
 * ziyaretci soyler (o gordu). Ikisini ayni kisiye birakmak, yem ilan
 * tespitini anlamsiz kilardi.
 *
 * GERCEKLESTI ve GELMEDI son durumlardir. Olumsuz geri bildirim alan
 * bir ofis randevuyu "iptal"e cevirip kaydi silemesin.
 */

const govde = z
  .object({
    durumu: z.enum(['ONAYLANDI', 'GERCEKLESTI', 'IPTAL', 'GELMEDI']).optional(),
    ilanGercekMi: z.boolean().optional(),
    notlar: z.string().trim().max(1000).optional(),
  })
  .refine((g) => g.durumu !== undefined || g.ilanGercekMi !== undefined, {
    message: 'Değiştirilecek bir alan belirtin.',
  });

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
    if (!kullaniciId) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const rl = await checkRateLimit(`randevu-guncelle:${kullaniciId}`, {
      limit: 40,
      window: '1 h',
    });
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
    const g = ayristirilan.data;

    const randevu = await prisma.randevu.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        durumu: true,
        talepEdenId: true,
        ilanGercekMi: true,
        ilan: {
          select: { id: true, durumu: true, sahibiId: true, ofisId: true },
        },
      },
    });
    if (!randevu) {
      return NextResponse.json({ error: 'Randevu bulunamadı.' }, { status: 404 });
    }

    const kullanici = await prisma.kullanici.findUnique({
      where: { id: kullaniciId },
      select: { ofisId: true, rol: true },
    });

    const ilanTarafi =
      randevu.ilan.sahibiId === kullaniciId ||
      (randevu.ilan.ofisId !== null && randevu.ilan.ofisId === kullanici?.ofisId) ||
      kullanici?.rol === 'ADMIN';
    const ziyaretci = randevu.talepEdenId === kullaniciId;

    if (!ilanTarafi && !ziyaretci) {
      return NextResponse.json({ error: 'Bu randevuya erişiminiz yok.' }, { status: 403 });
    }

    // ── 1. Durum degisikligi ─────────────────────────────────────
    let yeniDurum: RandevuDurumu | undefined;
    if (g.durumu) {
      // Ziyaretci yalnizca IPTAL edebilir; gosterimin gerceklestigini
      // beyan etmek ilan tarafinin isi.
      if (!ilanTarafi && g.durumu !== 'IPTAL') {
        return NextResponse.json(
          { error: 'Bu durum değişikliğini yalnızca ilan sahibi yapabilir.' },
          { status: 403 }
        );
      }
      if (!gecisGecerliMi(randevu.durumu as RandevuDurumu, g.durumu)) {
        return NextResponse.json(
          {
            error: `"${randevu.durumu}" durumundan "${g.durumu}" durumuna geçilemez.`,
            detay:
              randevu.durumu === 'GERCEKLESTI' || randevu.durumu === 'GELMEDI'
                ? 'Gerçekleşmiş veya gelinmemiş bir gösterim kaydı sonradan değiştirilemez.'
                : undefined,
          },
          { status: 409 }
        );
      }
      yeniDurum = g.durumu;
    }

    // ── 2. Geri bildirim ─────────────────────────────────────────
    let yemIlanBildirildi = false;
    if (g.ilanGercekMi !== undefined) {
      if (!ziyaretci) {
        return NextResponse.json(
          {
            error: 'Geri bildirimi yalnızca gösterime giden kişi verebilir.',
            detay:
              'Gösterimin gerçekleştiğini ilan sahibi işaretler; ilandaki taşınmazın gösterilip gösterilmediğini ziyaretçi bildirir.',
          },
          { status: 403 }
        );
      }
      const kontrol = geriBildirimVerilebilirMi({
        durumu: (yeniDurum ?? randevu.durumu) as RandevuDurumu,
        mevcutGeriBildirim: randevu.ilanGercekMi,
      });
      if (!kontrol.verilebilir) {
        return NextResponse.json({ error: kontrol.sebep }, { status: 409 });
      }
    }

    const guncel = await prisma.randevu.update({
      where: { id: randevu.id },
      data: {
        ...(yeniDurum ? { durumu: yeniDurum } : {}),
        ...(g.ilanGercekMi !== undefined ? { ilanGercekMi: g.ilanGercekMi } : {}),
        ...(g.notlar !== undefined ? { notlar: g.notlar } : {}),
      },
      select: { id: true, durumu: true, ilanGercekMi: true, tarih: true },
    });

    // ── 3. Yem ilan esigi ────────────────────────────────────────
    // Gosterime GERCEKTEN gitmis birden fazla kisi "ilandaki tasinmaz
    // gosterilmedi" derse ilan teyide alinir. Sikayetten daha guclu
    // bir kanit: bu kisiler oradaydi.
    if (g.ilanGercekMi === false) {
      const olumsuzlar = await prisma.randevu.findMany({
        where: {
          ilanId: randevu.ilan.id,
          durumu: 'GERCEKLESTI',
          ilanGercekMi: false,
        },
        select: { talepEdenId: true },
        distinct: ['talepEdenId'],
      });

      if (
        yemIlanSayilirMi(olumsuzlar.length) &&
        randevu.ilan.durumu === 'YAYINDA'
      ) {
        await prisma.ilan.update({
          where: { id: randevu.ilan.id },
          data: {
            durumu: 'TEYIT_BEKLIYOR',
            teyitSonTarih: new Date(Date.now() + 3 * 86_400_000),
          },
        });
        yemIlanBildirildi = true;
      }
    }

    return NextResponse.json({
      ...guncel,
      yemIlanBildirildi,
      bilgi: yemIlanBildirildi
        ? 'Bu ilan için birden fazla ziyaretçi, ilandaki taşınmazın gösterilmediğini bildirdi. İlan sahibinden teyit istendi.'
        : undefined,
    });
  } catch (error) {
    console.error('[randevu PATCH]', error);
    return NextResponse.json({ error: 'Randevu güncellenemedi.' }, { status: 500 });
  }
}
