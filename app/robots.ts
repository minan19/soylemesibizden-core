import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/profile/', '/dashboard/'],
      },
    ],
    sitemap: 'https://soylemesibizden-core.vercel.app/sitemap.xml',
  };
}
