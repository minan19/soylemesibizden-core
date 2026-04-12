"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { ApiGateway } from '../../components/ApiGateway';
import { Code, Book, Zap, ShieldCheck } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function DeveloperPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
              <Code size={24} /> DEVELOPER PORTAL
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Sovereign API</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>İstihbaratı sistemlerinize entegre edin. Kurumsal mühürle bağlanın.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.2fr', gap: '50px' }}>
            <ApiGateway />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '25px', color: 'var(--text-primary)' }}>DOKÜMANTASYON</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'Kimlik Doğrulama', icon: ShieldCheck },
                    { label: 'Webhooks', icon: Zap },
                    { label: 'SDK (Node.js/Python)', icon: Book }
                  ].map((doc, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>
                      <doc.icon size={18} color="var(--accent-emerald)" /> {doc.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
