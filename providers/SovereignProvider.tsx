"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SovereignAsset {
  id: string;
  title: string;
  location: string | null;
  salePrice: string;
  rentPrice: string | null;
  iqScore: number;
  type: string;
  clearance: string;
  status: string;
}

interface SovereignStats {
  totalListings: number;
  totalAssets: number;
  totalOffers: number;
  totalDeals: number;
}

interface SovereignContextType {
  assets: SovereignAsset[];
  stats: SovereignStats;
  isSyncing: boolean;
  refetch: () => void;
}

const SovereignContext = createContext<SovereignContextType>({
  assets: [],
  stats: { totalListings: 0, totalAssets: 0, totalOffers: 0, totalDeals: 0 },
  isSyncing: true,
  refetch: () => {},
});

export const SovereignProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, setAssets] = useState<SovereignAsset[]>([]);
  const [stats, setStats] = useState<SovereignStats>({ totalListings: 0, totalAssets: 0, totalOffers: 0, totalDeals: 0 });
  const [isSyncing, setIsSyncing] = useState(true);

  const fetchData = async () => {
    setIsSyncing(true);
    try {
      const [listingsRes, assetsRes, offersRes, dealsRes] = await Promise.all([
        fetch('/api/listings'),
        fetch('/api/assets'),
        fetch('/api/offers'),
        fetch('/api/deals'),
      ]);

      const [listings, assetsData, offers, deals] = await Promise.all([
        listingsRes.ok ? listingsRes.json() : [],
        assetsRes.ok ? assetsRes.json() : [],
        offersRes.ok ? offersRes.json() : [],
        dealsRes.ok ? dealsRes.json() : [],
      ]);

      const mappedAssets: SovereignAsset[] = listings.map((l: {
        id: string; title: string; location?: string;
        price: number; status: string;
      }) => ({
        id: l.id,
        title: l.title,
        location: l.location ?? null,
        salePrice: `₺ ${l.price.toLocaleString('tr-TR')}`,
        rentPrice: null,
        iqScore: Math.floor(85 + Math.random() * 15),
        type: 'LİSTİNG',
        clearance: 'LEVEL_1',
        status: l.status,
      }));

      setAssets(mappedAssets);
      setStats({
        totalListings: listings.length,
        totalAssets: assetsData.length,
        totalOffers: offers.length,
        totalDeals: deals.length,
      });
    } catch {
      setAssets([]);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <SovereignContext.Provider value={{ assets, stats, isSyncing, refetch: fetchData }}>
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => useContext(SovereignContext);
