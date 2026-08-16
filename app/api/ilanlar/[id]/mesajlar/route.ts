import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { checkRateLimit } from '@/lib/ratelimit';
import { mesajDenetle, ibanMaskele } from '@/lib/mesajGuvenlik';

export const dynamic = 'force-dynamic';

/**
 * /api/ilanlar/[id]/mesajlar · 15.08.2026 (TRT)
 *
 * Ilan uzerinden yazisma.
 *
 * MESAJ ENGELLENMEZ — telefon numarasi da dahil. Gerekce
 * lib/mesajGuvenlik.ts'te aciklandi: zarar numara paylasildiginda
 * degil, para hesaba gectiginde olusuyor.
 *
 * IBAN veya kapora dili gecerse uyari GOSTERILIR ve gosterildigi
 * KAYDEDILIR. Sikayet gelirse elimizde kayit olur.
 *
 * Yazisma yalnizca iki taraf arasindadir: ilani soran kullanici ve
 * ilan tarafi (sahibi veya ofis personeli). Ucuncu kisi goremez.
 */

const govde = z.object({
  icerik: z.string().trim().min(1, 'Mesaj boş olamaz.').max(4000),
  /**
   * Ilan tarafi kime yanit verdigini ACIKCA belirtir.
   *
   * Sema'da yazisma basligi (thread) yok; mesajlar yalnizca ilana
   * bagli. Bir ilana birden fazla kisi yazdiginda "son yazana yanit
   * ver" varsayimi YANLIS KISIYE mesaj gonderebilir — kisisel
   * yazismanin baskasina gitmesi kabul edilemez.
   *
   * Bu yuzden ilan tarafi icin alici zorunlu; belirtilmezse ve tek
   * bir soran varsa ona yanit verilir, birden fazlaysa hata doner.
   */
  aliciId: z.string().uuid().optional(),
});

/** Kullanicinin bu ilandaki karsi tarafini bulur. */
async function taraflar(ilanId: string, kullaniciId: string) {
  const ilan = await prisma.ilan.findUnique({
    where: { id: ilanId },
    select: { id: true, durumu: true, sahibiId: true, ofisId: true },
  });
  if (!ilan) return null;

  const kullanici = await prisma.kullanici.findUnique({
    where: { id: kullaniciId },
    select: { ofisId: true, rol: true },
  });

  const ilanTarafi =
    ilan.sahibiId === kullaniciId ||
    (ilan.ofisId !== null && ilan.ofisId === kullanici?.ofisId);

  return { ilan, ilanTarafi };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const kullaniciId = (session?.user as { id?: string } | undefined)?.id;
  if (!kullaniciId) {
    return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
  }

  const t = await taraflar(params.id, kullaniciId);
  if (!t) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

  // Yalnizca kullanicinin taraf oldugu mesajlar. Ilan tarafi kendi
  // ilanindaki tum yazismalari gorur; soran yalnizca kendi yazismasini.
  const mesajlar = await prisma.mesaj.findMany({
    where: {
      ilanId: params.id,
      ...(t.ilanTarafi
        ? {}
        : { OR: [{ gonderenId: kullaniciId }, { aliciId: kullaniciId }] }),
    },
    orderBy: { eklendi: 'asc' },
    select: {
      id: true, icerik: true, eklendi: true, okundu: true,
      gonderenId: true, aliciId: true,
      odemeUyarisiGosterildi: true,
      tespitEdilenIsaretler: true,
      gonderen: { select: { adSoyad: true } },
    },
    take: 500,
  });

  // Okundu isaretle — yalnizca kullaniciya GELEN mesajlar.
  await prisma.mesaj.updateMany({
    where: { ilanId: params.id, aliciId: kullaniciId, okundu: false },
    data: { okundu: true },
  });

  return NextResponse.json(mesajlar);
}

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

    const rl = await checkRateLimit(`mesaj:${kullaniciId}`, { limit: 60, window: '1 h' });
    if (!rl.success) {
      return NextResponse.json({ error: 'Çok fazla mesaj.' }, { status: 429 });
    }

    const ayristirilan = govde.safeParse(await request.json());
    if (!ayristirilan.success) {
      return NextResponse.json(
        { error: ayristirilan.error.issues[0].message },
        { status: 400 }
      );
    }
    const { icerik } = ayristirilan.data;

    const t = await taraflar(params.id, kullaniciId);
    if (!t) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    // Yayinda olmayan ilan uzerinden yeni yazisma baslatilamaz.
    // Mevcut yazisma okunmaya devam eder (GET kisitlanmaz) —
    // kullanici gecmisini kaybetmemeli.
    if (t.ilan.durumu !== 'YAYINDA' && !t.ilanTarafi) {
      return NextResponse.json(
        { error: 'Bu ilan yayında değil; yeni mesaj gönderilemez.' },
        { status: 409 }
      );
    }

    let aliciId: string;

    if (t.ilanTarafi) {
      // Bu ilana yazmis SORAN taraflar — ilan sahibi haric.
      const yazanlar = await prisma.mesaj.findMany({
        where: { ilanId: params.id, gonderenId: { not: t.ilan.sahibiId } },
        select: { gonderenId: true },
        distinct: ['gonderenId'],
      });
      const soranlar = yazanlar
        .map((y) => y.gonderenId)
        .filter((g) => g !== kullaniciId);

      if (soranlar.length === 0) {
        return NextResponse.json(
          { error: 'Yanıtlanacak bir yazışma yok.' },
          { status: 409 }
        );
      }

      if (ayristirilan.data.aliciId) {
        if (!soranlar.includes(ayristirilan.data.aliciId)) {
          return NextResponse.json(
            { error: 'Bu kişiyle bu ilan üzerinden bir yazışmanız yok.' },
            { status: 403 }
          );
        }
        aliciId = ayristirilan.data.aliciId;
      } else if (soranlar.length === 1) {
        aliciId = soranlar[0];
      } else {
        // Yanlis kisiye mesaj gondermektense hata donmek dogrudur.
        return NextResponse.json(
          {
            error: 'Bu ilan için birden fazla yazışma var; alıcıyı belirtin.',
            soranlar,
          },
          { status: 409 }
        );
      }
    } else {
      if (t.ilan.sahibiId === kullaniciId) {
        return NextResponse.json(
          { error: 'Kendinize mesaj gönderemezsiniz.' },
          { status: 409 }
        );
      }
      aliciId = t.ilan.sahibiId;
    }

    // ── ÖDEME DENETİMİ ───────────────────────────────────────────
    const denetim = mesajDenetle(icerik);

    const mesaj = await prisma.mesaj.create({
      data: {
        ilanId: params.id,
        gonderenId: kullaniciId,
        aliciId,
        // Icerik DUZ METIN saklanir — kullanici kendi yazismasini
        // oldugu gibi gorebilmeli.
        icerik,
        odemeUyarisiGosterildi: denetim.uyariGoster,
        tespitEdilenIsaretler: denetim.isaretler,
        // Denetim kaydinda IBAN MASKELENIR: kisisel finansal veri
        // gereksiz cogaltilmaz, eslestirmeye uc haneler yeter.
        denetimOzeti: denetim.uyariGoster ? ibanMaskele(icerik).slice(0, 500) : null,
      },
      select: { id: true, eklendi: true },
    });

    return NextResponse.json(
      {
        ...mesaj,
        uyari: denetim.uyariMetni,
        isaretler: denetim.isaretler,
        // Uyari cikan yazismada sikayet yolu dogrudan gosterilir.
        bildirimTuru: denetim.uyariGoster ? 'TAPU_ONCESI_ODEME_TALEBI' : undefined,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[mesajlar POST]', error);
    return NextResponse.json({ error: 'Mesaj gönderilemedi.' }, { status: 500 });
  }
}
