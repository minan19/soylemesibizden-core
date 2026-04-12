"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Platformun Ana Veri Seti (Veritabanı Simülasyonu)
const CORE_DATABASE = [
  { id: 'ASSET-01', title: 'Terra Beylikdüzü Hub', location: 'İstanbul, Beylikdüzü', salePrice: '₺ 4.200.000', rentPrice: '₺ 25.000', iqScore: 98.4, type: 'TİCARİ', clearance: 'LEVEL_1' },
  { id: 'ASSET-02', title: 'Muğla Green Field', location: 'Muğla, Milas', salePrice: '₺ 12.800.000', rentPrice: null, iqScore: 94.2, type: 'ARAZİ', clearance: 'LEVEL_1' },
  { id: 'ASSET-03', title: 'Çanakkale Stratejik Tarla', location: 'Çanakkale, Ayvacık', salePrice: '₺ 8.500.000', rentPrice: null, iqScore: 92.1, type: 'ARAZİ', clearance: 'LEVEL_1' },
  { id: 'DP-001', title: 'Gizli Marina Projesi', location: 'Muğla, Göcek', salePrice: '₺ 120.000.000', rentPrice: null, iqScore: 99.9, type: 'LİMAN', clearance: 'LEVEL_5' }
];

const SovereignContext = createContext<any>(null);

export const SovereignProvider = ({ children }: { children: React.ReactNode }) => {
  const [assets, setAssets] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  // Veri Çekme (Fetch) Simülasyonu - Neural Sync
  useEffect(() => {
    const syncData = async () => {
      setIsSyncing(true);
      // Ağ Gecikmesi Simülasyonu (600ms)
      await new Promise(resolve => setTimeout(resolve, 600));
      setAssets(CORE_DATABASE);
      setIsSyncing(false);
    };
    syncData();
  }, []);

  return (
    <SovereignContext.Provider value={{ assets, isSyncing }}>
      {children}
    </SovereignContext.Provider>
  );
};

export const useSovereign = () => useContext(SovereignContext);
