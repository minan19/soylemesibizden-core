"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ShieldAlert, CheckCircle, Search, Scale, FileCheck } from 'lucide-react';

export const LegalVault = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startLegalScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3000);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Scale size={18} /> SOVEREIGN LEGAL VAULT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Hukuki Belge İstihbaratı</h3>
        </div>
        <div style={{ padding: '8px 15px', backgroundColor: '#FFF', borderRadius: '50px', border: '1px solid var(--border-color)', fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>
          SECURE_DOC_V2
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {[
          { doc: 'Tapu Kaydı Arşivi', status: 'DOĞRULANDI', icon: CheckCircle },
          { doc: 'Belediye İmar Durumu', status: 'TARANIYOR', icon: Search },
          { doc: 'Hukuki Temiz Belgesi', status: 'BEKLEMEDE', icon: FileText }
        ].map((item, i) => (
          <div key={i} style={{ padding: '15px 20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <item.icon size={16} color={item.status === 'DOĞRULANDI' ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
              <span style={{ fontSize: '0.8rem', fontWeight: '900' }}>{item.doc}</span>
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: '950', color: item.status === 'DOĞRULANDI' ? 'var(--accent-emerald)' : '#999' }}>{item.status}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={startLegalScan}
        disabled={isScanning}
        style={{ width: '100%', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
      >
        <FileCheck size={18} /> {isScanning ? 'HUKUKİ TARAMA YAPILIYOR...' : 'BELGE ANALİZİNİ BAŞLAT'}
      </button>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Hukuki Risk: $$ R_{legal} = \\sum (Doc_{valid} \\cdot Weight) - \\text{Liability}_{coeff} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
