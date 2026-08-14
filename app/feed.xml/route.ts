import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://soylemesibizden-core.vercel.app';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const listings = await prisma.listing.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      city: true,
      district: true,
      neighborhood: true,
      listingType: true,
      propertyType: true,
      rooms: true,
      area: true,
      photos: true,
      createdAt: true,
    },
  });

  const items = listings.map(l => {
    const locationParts = [l.neighborhood, l.district, l.city].filter(Boolean);
    const location = locationParts.join(', ');
    const priceStr = `₺${l.price.toLocaleString('tr-TR')}`;
    const specs = [
      l.listingType,
      l.propertyType,
      l.rooms != null ? `${l.rooms} oda` : null,
      l.area != null ? `${l.area} m²` : null,
    ].filter(Boolean).join(' · ');

    const description = [
      specs,
      location ? `Konum: ${location}` : null,
      `Fiyat: ${priceStr}`,
      l.description ? l.description.slice(0, 200) : null,
    ].filter(Boolean).join('\n');

    const imageTag = l.photos[0]
      ? `<enclosure url="${escapeXml(l.photos[0])}" type="image/jpeg" length="0" />`
      : '';

    return `
    <item>
      <title>${escapeXml(l.title)} — ${escapeXml(priceStr)}</title>
      <link>${BASE_URL}/listing/${l.id}</link>
      <guid isPermaLink="true">${BASE_URL}/listing/${l.id}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${l.createdAt.toUTCString()}</pubDate>
      ${location ? `<category>${escapeXml(location)}</category>` : ''}
      ${imageTag}
    </item>`;
  }).join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Söylemesi Bizden — Son İlanlar</title>
    <link>${BASE_URL}</link>
    <description>Türkiye'nin en güncel gayrimenkul ilanları. Satılık ve kiralık konut, ticari alan, arazi.</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/favicon.ico</url>
      <title>Söylemesi Bizden</title>
      <link>${BASE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
