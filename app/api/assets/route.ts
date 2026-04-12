import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

export async function GET() {
  try {
    const assets = await prisma.asset.findMany({
      orderBy: { trustScore: 'desc' }
    });
    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json({ error: "API_ERROR" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newAsset = await prisma.asset.create({
      data: {
        title: body.title,
        price: Number(body.price),
        location: body.location,
        coordinates: body.coordinates,
        trustScore: Number(body.trustScore),
        investmentIq: body.investmentIq,
        type: body.type || 'RESIDENTIAL',
        status: body.status || 'OPEN',
        dnaTags: body.dnaTags || []
      }
    });
    return NextResponse.json(newAsset);
  } catch (error) {
    return NextResponse.json({ error: "CREATE_ERROR" }, { status: 500 });
  }
}
