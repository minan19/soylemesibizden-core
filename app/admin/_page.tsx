"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AssetCreator } from '../../components/AssetCreator';
import { SystemHealth } from '../../components/SystemHealth';
import { Terminal } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AdminPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
              <Terminal size={24} /> COMMAND CENTER
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Sovereign Control</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Ekosistemi yönetin, varlıkları mühürleyin ve siber sağlığı izleyin.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
            <AssetCreator />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <SystemHealth />
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '10px' }}>SİSTEM VERSİYONU</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>v2.8.4-ALPHA</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
