import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * Sovereign Score — Gayrimenkul Kredi Skoru
 * FICO benzeri sistem (0-1000)
 *
 * Faktörler:
 * - İşlem sayısı & tutarı (25%)
 * - Zamanında ödeme (35%)
 * - Portföy çeşitliliği (15%)
 * - Kimlik doğrulama (15%)
 * - NDA imzalama (10%)
 */

function calculateScore(record: {
  transactionCount: number;
  onTimePayments: number;
  defaultCount: number;
  portfolioValue: number;
  verifiedIdentity: boolean;
  ndaSigned: boolean;
}) {
  let score = 300; // Başlangıç

  // İşlem geçmişi (25%)
  const txFactor = Math.min(record.transactionCount / 50, 1) * 250;
  score += txFactor;

  // Zamanında ödeme (35%)
  const paymentRate = record.transactionCount > 0
    ? record.onTimePayments / record.transactionCount
    : 0;
  const defaultPenalty = record.defaultCount * 50;
  const paymentFactor = (paymentRate * 350) - defaultPenalty;
  score += Math.max(paymentFactor, 0);

  // Portföy (15%)
  const portfolioFactor = Math.min(record.portfolioValue / 5_000_000, 1) * 150;
  score += portfolioFactor;

  // Doğrulama (15%)
  if (record.verifiedIdentity) score += 150;

  // NDA (10%)
  if (record.ndaSigned) score += 100;

  return Math.min(Math.max(Math.round(score), 0), 1000);
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Oturum gereklidir.' }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id!;
    let record = await prisma.sovereignScoreRecord.findUnique({
      where: { userId },
    });

    if (!record) {
      record = await prisma.sovereignScoreRecord.create({
        data: { userId },
      });
    }

    const score = calculateScore(record);

    return NextResponse.json({
      score,
      record,
      tier: score >= 750 ? 'PLATINUM' : score >= 600 ? 'GOLD' : score >= 450 ? 'SILVER' : 'BRONZE',
    });
  } catch (error) {
    console.error('[Sovereign Score]', error);
    return NextResponse.json(
      { error: 'Skor hesaplanamadı.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string } | null)?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetki gereklidir.' }, { status: 403 });
    }

    const { userId, action, value } = await request.json() as {
      userId: string;
      action: 'addTransaction' | 'recordPayment' | 'recordDefault';
      value?: number;
    };

    let record = await prisma.sovereignScoreRecord.findUnique({
      where: { userId },
    });

    if (!record) {
      record = await prisma.sovereignScoreRecord.create({ data: { userId } });
    }

    if (action === 'addTransaction') {
      record = await prisma.sovereignScoreRecord.update({
        where: { userId },
        data: { transactionCount: { increment: 1 } },
      });
    } else if (action === 'recordPayment') {
      record = await prisma.sovereignScoreRecord.update({
        where: { userId },
        data: { onTimePayments: { increment: 1 } },
      });
    } else if (action === 'recordDefault') {
      record = await prisma.sovereignScoreRecord.update({
        where: { userId },
        data: { defaultCount: { increment: 1 } },
      });
    }

    const score = calculateScore(record);

    return NextResponse.json({ score, record });
  } catch (error) {
    console.error('[Sovereign Score POST]', error);
    return NextResponse.json(
      { error: 'Güncelleme başarısız.' },
      { status: 500 }
    );
  }
}
