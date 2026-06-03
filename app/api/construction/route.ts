import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createSchema = z.object({
  name: z.string().min(3, 'Proje adı en az 3 karakter').max(200),
  developer: z.string().min(2, 'Geliştirici adı zorunludur').max(200),
  projectType: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'MIXED', 'INFRASTRUCTURE']),
  location: z.string().min(2),
  city: z.string().min(2),
  district: z.string().optional(),
  status: z.enum(['PLANNED', 'UNDER_CONSTRUCTION', 'COMPLETED']).default('PLANNED'),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  totalUnits: z.number().int().optional(),
  totalArea: z.number().optional(),
  investmentAmount: z.number().optional(),
  description: z.string().optional(),
  source: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const status = searchParams.get('status');
    const type = searchParams.get('type');

    const where: Record<string, unknown> = {};
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (status) where.status = status;
    if (type) where.projectType = type;

    const projects = await prisma.constructionProject.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('[Construction GET]', error);
    return NextResponse.json({ error: 'Projeler çekilemedi.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string } | null)?.role;
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Sadece admin proje ekleyebilir.' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const project = await prisma.constructionProject.create({
      data: {
        name: parsed.data.name,
        developer: parsed.data.developer,
        projectType: parsed.data.projectType,
        location: parsed.data.location,
        city: parsed.data.city,
        district: parsed.data.district ?? null,
        status: parsed.data.status,
        startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
        completionDate: parsed.data.completionDate ? new Date(parsed.data.completionDate) : null,
        totalUnits: parsed.data.totalUnits ?? null,
        totalArea: parsed.data.totalArea ?? null,
        investmentAmount: parsed.data.investmentAmount ?? null,
        description: parsed.data.description ?? null,
        source: parsed.data.source ?? null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('[Construction POST]', error);
    return NextResponse.json({ error: 'Proje eklenemedi.' }, { status: 500 });
  }
}
