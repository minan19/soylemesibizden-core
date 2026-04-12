"use client";
import React from 'react';

export const StructuredData = ({ asset }: any) => {
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
    />
  );
};
