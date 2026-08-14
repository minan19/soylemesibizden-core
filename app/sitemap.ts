import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://soylemesibizden-core.vercel.app';

  const [listings, districts] = await Promise.all([
    prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
      take: 500,
    }),
    prisma.listing.findMany({
      where: { status: 'ACTIVE', city: { not: null }, district: { not: null } },
      select: { city: true, district: true },
      distinct: ['city', 'district'],
      take: 200,
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/listings`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/market-radar`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/istatistikler`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/valuation`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/listings?listingType=SATILIK`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/listings?listingType=KİRALIK`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('İstanbul')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('Ankara')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('İzmir')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/listings?city=${encodeURIComponent('Antalya')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/sehir`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('İstanbul')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('Ankara')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('İzmir')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('Antalya')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('Bursa')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/sehir/${encodeURIComponent('Bodrum')}`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.75 },
    { url: `${baseUrl}/harita`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/agents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/hesaplama`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${baseUrl}/sss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/concierge`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/piyasa`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/yeni-projeler`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/kiralik`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/satilik`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/rehber`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.65 },
    { url: `${baseUrl}/rehber/ev-satin-alma`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/rehber/kiralama-rehberi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/rehber/yatirim-rehberi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/luks`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/tapu-masrafi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/fiyat-trendi`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/mahalle-analizi`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/yatirim-analizi`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/emlak-vergisi`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/portfoy`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.65 },
    { url: `${baseUrl}/kira-artis-hesaplama`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/banka-kredileri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
  ];

  const listingPages: MetadataRoute.Sitemap = listings.map(l => ({
    url: `${baseUrl}/listing/${l.id}`,
    lastModified: l.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const districtPages: MetadataRoute.Sitemap = districts
    .filter(d => d.city && d.district)
    .map(d => ({
      url: `${baseUrl}/ilce/${encodeURIComponent(d.city!)}/${encodeURIComponent(d.district!)}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.75,
    }));

  return [...staticPages, ...listingPages, ...districtPages];
}
