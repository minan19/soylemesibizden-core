import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://soylemesibizden-core.vercel.app';

  const listings = await prisma.listing.findMany({
    where: { status: 'ACTIVE' },
    select: { id: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
    take: 500,
  });

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/listings`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/market-radar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/valuation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/listings?listingType=SATILIK`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/listings?listingType=KİRALIK`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('İstanbul')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('Ankara')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('İzmir')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('Antalya')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const listingPages: MetadataRoute.Sitemap = listings.map(l => ({
    url: `${baseUrl}/listing/${l.id}`,
    lastModified: l.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...listingPages];
}
