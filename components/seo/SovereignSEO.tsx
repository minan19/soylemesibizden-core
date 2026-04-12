"use client";
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
}

export const SovereignSEO = ({ title, description, image, type = 'website' }: SEOProps) => {
  const siteName = "SÖYLEMESİ BİZDEN";
  const fullTitle = `${title} | ${siteName} Sovereign Intelligence`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || '/og-default.jpg'} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || '/og-default.jpg'} />

      {/* Canonical Link */}
      <link rel="canonical" href="https://soylemesibizden.com" />
    </Head>
  );
};
