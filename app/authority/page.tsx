"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import dynamic from 'next/dynamic';

// Temel Bileşenler
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { AuthorityHub } from '../../components/AuthorityHub';

// Yan Sütun Güvenlik Modülleri
const LegalVaultV2 = dynamic(() => import('../../components/LegalVaultV2').then(m => m.LegalVaultV2), { ssr: false });
const GlobalSynergyV2 = dynamic(() => import('../../components/GlobalSynergyV2').then(m => m.GlobalSynergyV2), { ssr: false });
const SovereignVoice = dynamic(() => import('../../components/SovereignVoice').then(m => m.SovereignVoice), { ssr: false });

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AuthorityMatrixPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <GlobalHeader />
        
        <div style={{ padding: '40px', display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) 350px', gap: '40px', maxWidth: '1920px', margin: '0 auto', width: '100%' }}>
          
          <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <header style={{ marginBottom: '20px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: 'var(--text-primary)', color: '#FFF', borderRadius: '50px', fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '15px' }}>
                MASTER NODE IDENTIFIED
              </div>
              <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px' }}>Otorite Matrisi</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500', marginTop: '5px' }}>Tüm düğümler, şifreleme anahtarları ve erişim protokolleri tek merkezde.</p>
            </header>
            
            {/* Merkez Komuta Bileşeni */}
            <AuthorityHub />
          </section>

          {/* Otorite Destek Modülleri */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <SovereignVoice />
            <LegalVaultV2 />
            <GlobalSynergyV2 />
          </aside>
          
        </div>
      </main>
    </div>
  );
}
