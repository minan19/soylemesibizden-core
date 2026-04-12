"use client";
import React from 'react';
import { Globe, Database, Cpu, Zap } from 'lucide-react';

export const TrustSignals = () => {
  const stats = [
    { label: 'YÖNETİLEN VARLIK', val: '₺ 4.2B+', icon: Database },
    { label: 'AI DOĞRULUK', val: '99.4%', icon: Cpu },
    { label: 'GLOBAL KAPSAM', val: '14 Bölge', icon: Globe }
  ];

  return (
    <div style={{ padding: '100px 80px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <s.icon size={32} color="var(--accent-emerald)" style={{ marginBottom: '25px' }} />
            <div style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-2px', color: 'var(--text-primary)', marginBottom: '10px' }}>{s.val}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
