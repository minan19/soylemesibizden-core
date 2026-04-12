"use client";
import React, { createContext, useContext, useState } from 'react';

const DecisionContext = createContext<any>(null);

export const DecisionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedAssets, setSelectedAssets] = useState<any[]>([]);

  const toggleAsset = (asset: any) => {
    setSelectedAssets((prev) => 
      prev.find(a => a.id === asset.id) 
        ? prev.filter(a => a.id !== asset.id) 
        : [...prev, asset]
    );
  };

  return (
    <DecisionContext.Provider value={{ selectedAssets, toggleAsset }}>
      {children}
    </DecisionContext.Provider>
  );
};

export const useDecision = () => useContext(DecisionContext);
