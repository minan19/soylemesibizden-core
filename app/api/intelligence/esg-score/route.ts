import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const updateSchema = z.object({
  listingId: z.string(),
  energyClass: z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']).optional(),
  heatingType: z.enum(['DOGALGAZ', 'ELEKTRIK', 'JEOTERMAL', 'GUNES']).optional(),
  renewableEnergy: z.boolean().optional(),
  greenCertified: z.boolean().optional(),
  insulationScore: z.number().int().min(0).max(100).optional(),
});

// Enerji sınıfından CO2 tahmin (m²/yıl)
const ENERGY_CLASS_CO2: Record<string, number> = {
  A: 80,   // Çok iyi
  B: 120,
  C: 170,
  D: 230,
  E: 320,
  F: 480,
  G: 650,  // Çok kötü
};

const HEATING_MULT: Record<string, number> = {
  DOGALGAZ: 1.0,
  ELEKTRIK: 0.8,
  JEOTERMAL: 0.3,
  GUNES: 0.2,
};

function calculateEsgScore(data: {
  energyClass?: string;
  heatingType?: string;
  renewableEnergy?: boolean;
  greenCertified?: boolean;
  insulationScore?: number | null;
}): number {
  let score = 40;

  // Enerji sınıfı (40 puan)
  if (data.energyClass) {
    const classScore = (7 - Object.keys(ENERGY_CLASS_CO2).indexOf(data.energyClass)) * 6;
    score += classScore;
  }

  // Isıtma türü (20 puan)
  if (data.heatingType) {
    const heatScore = HEATING_MULT[data.heatingType] * 20;
    score += heatScore;
  }

  // Yenilenebilir enerji (20 puan)
  if (data.renewableEnergy) score += 20;

  // Sertifikasyon (15 puan)
  if (data.greenCertified) score += 15;

  // İzolasyon (5 puan)
  if (data.insulationScore !== null && data.insulationScore !== undefined) {
    score += (data.insulationScore / 100) * 5;
  }

  return Math.min(Math.round(score), 100);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');
    if (!listingId) {
      return NextResponse.json({ error: 'listingId zorunludur.' }, { status: 400 });
    }

    const esg = await prisma.esgScore.findUnique({
      where: { listingId },
    });

    if (!esg) {
      return NextResponse.json({
        esg: {
          energyClass: 'E',
          esgTotal: 50,
          carbonFootprint: 320,
        },
      });
    }

    return NextResponse.json({ esg });
  } catch (error) {
    console.error('[ESG GET]', error);
    return NextResponse.json({ error: 'ESG bilgisi çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const esgTotal = calculateEsgScore({
      energyClass: parsed.data.energyClass,
      heatingType: parsed.data.heatingType,
      renewableEnergy: parsed.data.renewableEnergy,
      greenCertified: parsed.data.greenCertified,
      insulationScore: parsed.data.insulationScore,
    });

    const carbonFootprint = parsed.data.energyClass
      ? (ENERGY_CLASS_CO2[parsed.data.energyClass] || 320) *
        (parsed.data.heatingType ? HEATING_MULT[parsed.data.heatingType] : 1)
      : undefined;

    const esg = await prisma.esgScore.upsert({
      where: { listingId: parsed.data.listingId },
      create: {
        listingId: parsed.data.listingId,
        energyClass: parsed.data.energyClass ?? 'E',
        heatingType: parsed.data.heatingType ?? null,
        renewableEnergy: parsed.data.renewableEnergy ?? false,
        greenCertified: parsed.data.greenCertified ?? false,
        insulationScore: parsed.data.insulationScore ?? null,
        carbonFootprint: carbonFootprint ?? null,
        esgTotal,
      },
      update: {
        energyClass: parsed.data.energyClass ?? undefined,
        heatingType: parsed.data.heatingType ?? undefined,
        renewableEnergy: parsed.data.renewableEnergy ?? undefined,
        greenCertified: parsed.data.greenCertified ?? undefined,
        insulationScore: parsed.data.insulationScore ?? undefined,
        carbonFootprint: carbonFootprint ?? undefined,
        esgTotal,
      },
    });

    return NextResponse.json({ esg, score: esgTotal }, { status: 201 });
  } catch (error) {
    console.error('[ESG POST]', error);
    return NextResponse.json({ error: 'ESG güncellenemedi.' }, { status: 500 });
  }
}
