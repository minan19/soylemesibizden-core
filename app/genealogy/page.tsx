"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AssetGenealogy } from '../../components/AssetGenealogy';
import { History, ShieldCheck } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function GenealogyPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
              <History size={24} /> PROVENANCE CHAIN
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Asset Genealogy</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Varlığın kökenini, mülkiyet tarihini ve değer genetiğini mühürlü izleyin.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '50px' }}>
            <AssetGenealogy />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '20px' }}>GÜVENLİK NOTU</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '900' }}>
                  <ShieldCheck size={20} /> VERİLER %100 DOĞRULANMIŞTIR
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
