"use client";
import React, { useState } from 'react';
import { RefreshCw, Tag, Key } from 'lucide-react';

export const DualListing = () => {
  const [mode, setMode] = useState('SALE');

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)' }}>LİSTELEME STRATEJİSİ</div>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button onClick={() => setMode('SALE')} style={{ padding: '5px 12px', backgroundColor: mode === 'SALE' ? 'var(--text-primary)' : 'transparent', color: mode === 'SALE' ? '#FFF' : 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950' }}>SATILIK</button>
          <button onClick={() => setMode('RENT')} style={{ padding: '5px 12px', backgroundColor: mode === 'RENT' ? 'var(--text-primary)' : 'transparent', color: mode === 'RENT' ? '#FFF' : 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950' }}>KİRALIK</button>
        </div>
      </header>
      
      <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)', textAlign: 'center' }}>
        <RefreshCw size={20} color="var(--accent-emerald)" style={{ marginBottom: '15px' }} />
        <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>Veriler {mode === 'SALE' ? 'Kiralık' : 'Satılık'} İle Senkronize Edildi</div>
      </div>
    </div>
  );
};
