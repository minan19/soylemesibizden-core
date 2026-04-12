"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { SovereignAnalytics } from '../../components/SovereignAnalytics';
import { GlobalPulseMonitor } from '../../components/GlobalPulseMonitor';
import { CarbonIntelligence } from '../../components/CarbonIntelligence';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AnalyticsPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Intelligence Suite</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Tahminlemeli pazar zekası ve varlık simülasyonu.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <SovereignAnalytics />
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <GlobalPulseMonitor />
              <CarbonIntelligence />
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
