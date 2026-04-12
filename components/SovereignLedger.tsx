"use client";
import React from 'react';
import { Database, Link as LinkIcon } from 'lucide-react';

export const SovereignLedger = () => {
  const blocks = [
    { hash: '0x8842...f1e2', action: 'HUKUKİ ONAY', time: '2 dk önce' },
    { hash: '0x3310...a9b4', action: 'IQ DEĞERLEME', time: '14 dk önce' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Database size={18} /> IMMUTABLE LEDGER
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {blocks.map((block, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <LinkIcon size={20} color="var(--text-secondary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{block.hash}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>{block.action}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Kriptografik Güvence: $$H(x) = SHA-256(Veri + Mühür)$$"}
        </p>
      </div>
    </div>
  );
};
