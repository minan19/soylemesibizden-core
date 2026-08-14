import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: 'desc' },
    include: { owner: { select: { name: true, email: true } } },
  });

  const headers = [
    'ID', 'Başlık', 'Fiyat', 'Şehir', 'İlçe', 'Mahalle',
    'İlan Türü', 'Mülk Türü', 'Oda', 'Alan (m²)', 'Kat',
    'Durum', 'Onaylı', 'Görüntülenme',
    'Sahibi Adı', 'Sahibi Email',
    'Oluşturma Tarihi',
  ];

  const escape = (v: unknown) => {
    const s = v == null ? '' : String(v);
    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };

  const rows = listings.map(l => [
    l.id,
    l.title,
    l.price,
    l.city ?? '',
    l.district ?? '',
    l.neighborhood ?? '',
    l.listingType,
    l.propertyType,
    l.rooms ?? '',
    l.area ?? '',
    l.floor ?? '',
    l.status,
    l.isVerified ? 'Evet' : 'Hayır',
    l.views,
    l.owner.name ?? '',
    l.owner.email,
    new Date(l.createdAt).toLocaleDateString('tr-TR'),
  ].map(escape).join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  const bom = '﻿'; // UTF-8 BOM for Excel

  return new NextResponse(bom + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="ilanlar-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
