"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { SovereignAPI } from '../../components/SovereignAPI';
import { Code, Terminal, Key, ShieldCheck } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function ApiPortalPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>API Portal</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Sovereign Intelligence Engine veri entegrasyon hattı.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px' }}>
            <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <SovereignAPI />
              <div style={{ padding: '50px', backgroundColor: '#000', color: '#FFF', borderRadius: '32px', border: '1px solid #222', fontFamily: 'monospace' }}>
                <div style={{ color: '#666', marginBottom: '20px' }}>// Fetch Market Pulse Data</div>
                <div style={{ color: 'var(--accent-emerald)' }}>curl -X GET "https://api.soylemesibizden.com/v1/radar/pulse" \</div>
                <div style={{ marginLeft: '20px' }}>-H "Authorization: Bearer SK_MUSTAFA_PRO_2026"</div>
                <div style={{ marginTop: '30px', color: '#666' }}>// Response (200 OK)</div>
                <div style={{ color: '#FFF', fontSize: '0.8rem' }}>{"{ \"status\": \"success\", \"data\": { \"momentum\": 0.92, \"risk\": \"low\" } }"}</div>
              </div>
            </section>

            <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '28px', border: '1px solid var(--border-color)' }}>
                <ShieldCheck size={32} color="var(--accent-emerald)" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950' }}>Güvenlik Mührü</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Tüm API anahtarları RSA-4096 standardıyla mühürlenmiştir.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
