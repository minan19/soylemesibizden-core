"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSovereign } from '../../providers/SovereignProvider';
import { Activity } from 'lucide-react';

// Temel Bileşenler
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';

// Ana Sütun Modülleri
const SovereignLens = dynamic(() => import('../../components/SovereignLens').then(m => m.SovereignLens), { ssr: false });
const EliteAssetCard = dynamic(() => import('../../components/EliteAssetCard').then(m => m.EliteAssetCard), { ssr: false });
const SovereignMap = dynamic(() => import('../../components/SovereignMap').then(m => m.SovereignMap), { ssr: false });
const SpatialAssetViewer = dynamic(() => import('../../components/SpatialAssetViewer').then(m => m.SpatialAssetViewer), { ssr: false });
const SimulationEngine = dynamic(() => import('../../components/SimulationEngine').then(m => m.SimulationEngine), { ssr: false });

// Sağ Sütun Modülleri
const SovereignVoice = dynamic(() => import('../../components/SovereignVoice').then(m => m.SovereignVoice), { ssr: false });
const TreasuryV2 = dynamic(() => import('../../components/TreasuryV2').then(m => m.TreasuryV2), { ssr: false });
const LegalVaultV2 = dynamic(() => import('../../components/LegalVaultV2').then(m => m.LegalVaultV2), { ssr: false });
const GlobalSynergyV2 = dynamic(() => import('../../components/GlobalSynergyV2').then(m => m.GlobalSynergyV2), { ssr: false });
const NeuralOptimizationV3 = dynamic(() => import('../../components/NeuralOptimizationV3').then(m => m.NeuralOptimizationV3), { ssr: false });
const MediaNexus = dynamic(() => import('../../components/MediaNexus').then(m => m.MediaNexus), { ssr: false });
const EliteCRM_v2 = dynamic(() => import('../../components/EliteCRM_v2').then(m => m.EliteCRM_v2), { ssr: false });

export default function MasterDashboard() {
  const { assets, isSyncing } = useSovereign(); // EGEMEN VERİ ÇEKİRDEĞİNDEN VERİ ÇEKİLİYOR
  const [lens, setLens] = useState('ALL');
  
  // Sadece Level 1 (Halka Açık) ilanları filtrele, Karanlık Havuz (Level 5) hariç tut
  const publicAssets = assets.filter((a: any) => a.clearance === 'LEVEL_1');
  
  const processedList = publicAssets.filter((a: any) => 
    lens === 'ALL' || (lens === 'SALE' && a.salePrice) || (lens === 'RENT' && a.rentPrice)
  );

  return (
    <div className="sovereign-layout">
      <div className="sidebar-container"><Sidebar /></div>
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <GlobalHeader />
        
        <div className="sovereign-container">
          <section style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            <header>
              <h1 style={{ fontWeight: '950', letterSpacing: '-2px' }}>Master Hub</h1>
              <div style={{ marginTop: '20px' }}>
                <SovereignLens active={lens} onChange={setLens} />
              </div>
            </header>

            {/* SİNİRSEL SENKRONİZASYON (LOADING) */}
            {isSyncing ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', color: 'var(--accent-emerald)', fontWeight: '950' }}>
                <Activity size={24} className="animate-spin" /> VERİ TABANI SENKRONİZE EDİLİYOR...
              </div>
            ) : (
              <div className="sovereign-card-grid">
                {processedList.map((item: any) => <EliteAssetCard key={item.id} data={item} />)}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '50px', display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <SovereignMap />
              <SpatialAssetViewer />
              <SimulationEngine />
            </div>
          </section>
          
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <SovereignVoice />
            <TreasuryV2 />
            <LegalVaultV2 />
            <GlobalSynergyV2 />
            <NeuralOptimizationV3 />
            <MediaNexus />
            <EliteCRM_v2 />
          </aside>
        </div>
      </main>
    </div>
  );
}
