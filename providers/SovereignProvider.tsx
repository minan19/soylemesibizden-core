'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Listing {
  id: string;
  title: string;
  priceAmount: number;
  area: number;
  location: string | null;
  status: string;
  propertyType: string;
}

interface Asset {
  id: string;
  type: string;
  value: number;
  location: string | null;
}

interface SovereignContextType {
  listings: Listing[];
  assets: Asset[];
  isSyncing: boolean;
  refetch: () => void;
}

const SovereignContext = createContext<SovereignContextType>({
  listings: [],
  assets: [],
  isSyncing: true,
  refetch: () => {},
});

export const SovereignProvider = ({ children }: { children: React.ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  const fetchAll = async () => {
    setIsSyncing(true);
    try {
      const [listingsRes, assetsRes] = await Promise.allSettled([
        fetch('/api/listings').then((r) => r.json()),
        fetch('/api/assets').then((r) => r.json()),
      ]);

      if (listingsRes.status === 'fulfilled' && Array.isArray(listingsRes.value)) {
        setListings(listingsRes.value);
      }
      if (assetsRes.status === 'fulfilled' && Array.isArray(assetsRes.value)) {
        setAssets(assetsRes.value);
      }
    } catch (err) {
      console.error('[SovereignProvider] fetch error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <SovereignContext.Provider value={{ listings, assets, isSyncing, refetch: fetchAll }}>
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => useContext(SovereignContext);
