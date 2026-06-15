"use client";
import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import { ShieldCheck, MapPin, Zap, ArrowRight, Download, Crosshair } from 'lucide-react';

// Temel Bileşenler
import { Sidebar } from '../../../components/Sidebar';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { SmartContractModal } from '../../../components/SmartContractModal'; // Modal eklendi

// Otorite Modülleri (Lazy Load)
const SpatialAssetViewer = dynamic(() => import('../../../components/SpatialAssetViewer').then(m => m.SpatialAssetViewer), { ssr: false });
const SovereignMap = dynamic(() => import('../../../components/SovereignMap').then(m => m.SovereignMap), { ssr: false });
const LegalArchitect = dynamic(() => import('../../../components/LegalArchitect').then(m => m.LegalArchitect), { ssr: false });

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AssetDetailMatrix() {
  const params = useParams();
  const assetId = params.id;
  
  // Modal State Yönetimi
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <GlobalHeader />
        
        <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) 400px', gap: '40px', maxWidth: '1920px', margin: '0 auto', width: '100%' }}>
          
          <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05, transform: 'scale(2)' }}>
                <Crosshair size={200} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '15px' }}>
                <MapPin size={18} /> ASSET_ID: {assetId} | ELITE LISTING
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', marginBottom: '10px' }}>Çanakkale Stratejik Tarla</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '600' }}>Ayvacık, Çanakkale — 14.500 m² Denize Sıfır Parsel</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
              <SpatialAssetViewer />
              <SovereignMap />
            </div>
          </section>
          
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ padding: '35px', backgroundColor: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--accent-emerald)', boxShadow: '0 20px 40px rgba(26,188,156,0.05)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '10px' }}>GÜNCEL DEĞERLEME</div>
              <div style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-2px', color: 'var(--text-primary)', marginBottom: '5px' }}>₺ 8.5M</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-emerald)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Zap size={14} /> %14.2 Yıllık ROI Projeksiyonu
              </div>

              {/* FEATURE-FLAGGED: Smart Contract button (out of scope) */}
              {process.env.NEXT_PUBLIC_FF_SMART_CONTRACT === 'true' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{ width: '100%', padding: '20px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '16px', border: 'none', fontWeight: '950', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', marginBottom: '15px' }}
                >
                  AKILLI KONTRAT İLE AL <ArrowRight size={18} />
                </button>
              )}
              
              <button style={{ width: '100%', padding: '15px', backgroundColor: 'transparent', color: 'var(--text-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                <Download size={16} /> YATIRIMCI DOSYASINI İNDİR (NDA)
              </button>
            </div>

            <LegalArchitect />

            <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <ShieldCheck size={24} color="var(--accent-emerald)" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>SOVEREIGN VERIFIED</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Bu mülk yapay zeka adli tıp taramasından %100 temiz geçmiştir.</div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FEATURE-FLAGGED: Smart Contract Modal (out of scope) */}
      {process.env.NEXT_PUBLIC_FF_SMART_CONTRACT === 'true' && (
        <SmartContractModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} assetId={assetId} />
      )}
    </div>
  );
}
