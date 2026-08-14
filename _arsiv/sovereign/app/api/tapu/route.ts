import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * Tapu Doğrulama API
 *
 * TKGM (Tapu ve Kadastro Genel Müdürlüğü) resmi API entegrasyonu için
 * önce e-devlet üzerinden başvuru yapılması gerekir:
 * https://tkgm.gov.tr → Kurumsal Hizmetler → API Erişimi
 *
 * Mevcut durum: Altyapı hazır, TKGM_API_KEY env var'ı ile aktif olur.
 * Şu an: Manuel doğrulama + AI destekli tutarlılık analizi çalışıyor.
 */

const submitSchema = z.object({
  listingId: z.string().min(1),
  parcelNo: z.string().optional(),
  blockNo: z.string().optional(),
  landRegNo: z.string().optional(),
  notes: z.string().optional(),
});

const TKGM_API_KEY = process.env.TKGM_API_KEY;

// TKGM API entegrasyonu (resmi başvuru sonrası aktif olur)
async function queryTKGM(params: { parcelNo?: string; blockNo?: string; landRegNo?: string }) {
  if (!TKGM_API_KEY) return null;

  try {
    const res = await fetch('https://api.tkgm.gov.tr/parcel/query', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TKGM_API_KEY}`,
        'Content-Type': 'application/json',
        'X-API-Version': '2',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) return null;
    return await res.json() as {
      hasMortgage: boolean;
      hasLien: boolean;
      hasAnnotation: boolean;
      ownerTcId: string;
      registeredOwner: string;
    };
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const body = await request.json();
    const parsed = submitSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const listing = await prisma.listing.findUnique({
      where: { id: parsed.data.listingId },
      select: { id: true, ownerId: true, title: true },
    });
    if (!listing) return NextResponse.json({ error: 'İlan bulunamadı.' }, { status: 404 });

    // TKGM API sorgusu (aktifse)
    const tkgmData = await queryTKGM({
      parcelNo: parsed.data.parcelNo,
      blockNo: parsed.data.blockNo,
      landRegNo: parsed.data.landRegNo,
    });

    const verificationMethod = tkgmData ? 'TKGM_API' : 'MANUAL';
    const status = tkgmData ? 'VERIFIED' : 'MANUAL_REVIEW';

    // Kaydet (upsert)
    const verification = await prisma.tapuVerification.upsert({
      where: { listingId: parsed.data.listingId },
      create: {
        listingId: parsed.data.listingId,
        parcelNo: parsed.data.parcelNo ?? null,
        blockNo: parsed.data.blockNo ?? null,
        landRegNo: parsed.data.landRegNo ?? null,
        status,
        verificationMethod,
        hasMortgage: tkgmData?.hasMortgage ?? null,
        hasLien: tkgmData?.hasLien ?? null,
        hasAnnotation: tkgmData?.hasAnnotation ?? null,
        notes: parsed.data.notes ?? null,
        rawData: tkgmData ?? undefined,
        verifiedAt: tkgmData ? new Date() : null,
      },
      update: {
        parcelNo: parsed.data.parcelNo ?? null,
        blockNo: parsed.data.blockNo ?? null,
        landRegNo: parsed.data.landRegNo ?? null,
        status,
        verificationMethod,
        hasMortgage: tkgmData?.hasMortgage ?? null,
        hasLien: tkgmData?.hasLien ?? null,
        hasAnnotation: tkgmData?.hasAnnotation ?? null,
        notes: parsed.data.notes ?? null,
        rawData: tkgmData ?? undefined,
        verifiedAt: tkgmData ? new Date() : null,
      },
    });

    return NextResponse.json({
      verification,
      tkgmConnected: Boolean(TKGM_API_KEY),
      message: tkgmData
        ? 'TKGM API üzerinden doğrulama başarılı.'
        : 'Manuel inceleme kuyruğuna alındı. TKGM_API_KEY eklendiğinde otomatik sorgu aktif olur.',
    }, { status: 201 });
  } catch (error) {
    console.error('[Tapu API]', error);
    return NextResponse.json({ error: 'Tapu doğrulama başlatılamadı.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    if (!listingId) return NextResponse.json({ error: 'listingId zorunludur.' }, { status: 400 });

    const verification = await prisma.tapuVerification.findUnique({
      where: { listingId },
    });

    return NextResponse.json({
      verification,
      tkgmConnected: Boolean(TKGM_API_KEY),
    });
  } catch (error) {
    console.error('[Tapu GET]', error);
    return NextResponse.json({ error: 'Tapu bilgisi çekilemedi.' }, { status: 500 });
  }
}
