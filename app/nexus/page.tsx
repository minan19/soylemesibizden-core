"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import dynamic from 'next/dynamic';

// Temel Bileşenler
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { EcosystemNexus } from '../../components/EcosystemNexus';

// Destek Modülleri (Lazy Load)
const NeuralOptimizationV3 = dynamic(() => import('../../components/NeuralOptimizationV3').then(m => m.NeuralOptimizationV3), { ssr: false });
const GlobalSynergyV2 = dynamic(() => import('../../components/GlobalSynergyV2').then(m => m.GlobalSynergyV2), { ssr: false });

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function NexusPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <GlobalHeader />
        
        <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 3fr) 350px', gap: '40px', maxWidth: '1920px', margin: '0 auto', width: '100%' }}>
          
          <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <EcosystemNexus />
          </section>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
             <div style={{ padding: '30px', backgroundColor: '#FFF', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '15px' }}>AĞ MİMARİSİ</h4>
                <div style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--text-primary)' }}>DOMAIN SENKRONİZASYONU</div>
                <p style={{ fontSize: '0.7rem', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '10px' }}>
                  soylemesibizden.com<br/>
                  atlasio.com.tr<br/>
                  econiq_core
                </p>
             </div>
             
             <GlobalSynergyV2 />
             <NeuralOptimizationV3 />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
