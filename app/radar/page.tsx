"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalIndex } from '../../components/GlobalIndex';
import { YieldHeatmap } from '../../components/YieldHeatmap';
import { ChevronLeft, Filter, Globe } from 'lucide-react';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function RadarPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalIndex />
        <div style={{ padding: '60px 80px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
                <Globe size={20} /> GLOBAL YIELD RADAR
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2.5px' }}>Market Heatmap</h1>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
               <button style={{ padding: '15px 30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '950', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Filter size={18} /> FİLTRELE
               </button>
            </div>
          </header>

          <YieldHeatmap />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              { label: 'ÇANAKKALE', status: 'BULLISH', yield: '%18.2' },
              { label: 'MUĞLA', status: 'STABLE', yield: '%12.5' },
              { label: 'İSTANBUL', status: 'WATCHING', yield: '%9.8' }
            ].map((m, i) => (
              <div key={i} style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '15px' }}>{m.label}</div>
                <div style={{ fontSize: '2rem', fontWeight: '950' }}>{m.yield}</div>
                <div style={{ marginTop: '15px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '950' }}>STATUS: {m.status}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
