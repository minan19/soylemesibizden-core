"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { CarbonMatrix } from '../../components/CarbonMatrix';
import { EsgScorecard } from '../../components/EsgScorecard';
import { Leaf } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function CarbonPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
              <Leaf size={24} /> ENVIRONMENTAL INTELLIGENCE
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Carbon Vault</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Varlıklarınızın çevresel etkisini ve karbon değerini kurumsal bir dille mühürleyin.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '50px' }}>
            <CarbonMatrix />
            <EsgScorecard />
          </div>
        </div>
      </main>
    </div>
  );
}
