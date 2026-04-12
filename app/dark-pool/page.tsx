"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';

// Temel Bileşenler
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { DarkPoolTerminal } from '../../components/DarkPoolTerminal';
import { NeuralOptimizationV3 } from '../../components/NeuralOptimizationV3';
import { LegalVaultV2 } from '../../components/LegalVaultV2';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function DarkPoolPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <GlobalHeader />
        
        <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 2.6fr) 350px', gap: '40px', maxWidth: '1920px', margin: '0 auto', width: '100%' }}>
          
          <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Karanlık Havuz Ana Terminali */}
            <DarkPoolTerminal />
          </section>
          
          {/* Karanlık Havuz Yan Paneli (Güvenlik ve Performans Modülleri) */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
             <div style={{ padding: '25px', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <h4 style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '15px' }}>ERİŞİM STATÜSÜ</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>ELITE CLEARED</div>
                <p style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-secondary)', marginTop: '10px' }}>Mustafa İnan yetkisi doğrulandı.</p>
             </div>
             
             {/* Güvenlik ve Hız algısını destekleyen mevcut modüller */}
             <LegalVaultV2 />
             <NeuralOptimizationV3 />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
