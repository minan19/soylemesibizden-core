"use client";
import React from 'react';

interface StructuredDataAsset {
  title?: string;
  description?: string;
  priceNum?: number;
  location?: string;
  id?: string;
}

function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const StructuredData = ({ asset }: { asset: StructuredDataAsset }) => {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": asset.title,
    "description": asset.description,
    "priceCurrency": "TRY",
    "price": asset.priceNum,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": asset.location,
      "addressCountry": "TR"
    },
    "identifier": asset.id
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(ldJson) }}
    />
  );
};
