"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { ShieldCheck, Lock } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function LegalVaultPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Legal Vault</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Hukuki mühür ve döküman otoritesi.</p>
          </header>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {['Mülkiyet Kaydı', 'İmar İzni', 'Analitik Rapor'].map((t, i) => (
              <div key={i} style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
                <ShieldCheck size={32} color="var(--accent-emerald)" style={{ marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950' }}>{t}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px' }}>Doğrulandı ve mühürlendi.</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
