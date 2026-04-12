"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { GatewayAuth } from '../components/GatewayAuth';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function RootGateway() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Kurumsal Arka Plan Izgarası */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, var(--border-color) 0, var(--border-color) 1px, transparent 1px, transparent 40px)', opacity: 0.3, pointerEvents: 'none' }} />
      
      {/* Sol Üst Logo ve Ekosistem Belirteci */}
      <header style={{ position: 'absolute', top: '40px', left: '60px', zIndex: 10 }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '950', letterSpacing: '4px', color: 'var(--text-primary)' }}>
          SÖYLEMESİ<span style={{ color: 'var(--accent-emerald)' }}>BİZDEN</span>
        </h1>
        <div style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '2px', marginTop: '5px' }}>
          SOVEREIGN INTELLIGENCE NETWORK
        </div>
      </header>

      {/* Merkez Kimlik Doğrulama Alanı */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <GatewayAuth />
      </main>

      {/* Alt Bilgi ve Otorite Formülü */}
      <footer style={{ position: 'absolute', bottom: '40px', width: '100%', textAlign: 'center', zIndex: 10 }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Erişim Protokolü: $$ \\Omega_{auth} = \\lim_{t \\to 0} \\frac{\\text{BioHash} \\cdot \\text{Node}_{key}}{\\Delta t} \\equiv \\text{Access}_{granted} $$ şifrelenmiştir."}
        </p>
      </footer>
      
    </div>
  );
}
