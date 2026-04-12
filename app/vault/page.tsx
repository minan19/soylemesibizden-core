"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AssetGenealogy } from '../../components/AssetGenealogy';
import { DigitalDeedVault } from '../../components/DigitalDeedVault';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function VaultPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Asset Intelligence</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Varlığın menşeini izleyin, hukuki geleceğini mühürleyin.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr', gap: '50px' }}>
            <AssetGenealogy />
            <DigitalDeedVault />
          </div>
        </div>
      </main>
    </div>
  );
}
