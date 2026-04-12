"use client";
import React from 'react';
import { BarChart2, ShieldAlert, Target, Zap } from 'lucide-react';

export const SensitivityMatrix = () => {
  const factors = [
    { label: 'Faiz Hassasiyeti', impact: '-4.2%', risk: 'Medium' },
    { label: 'Enflasyon Koruması', impact: '+12.8%', risk: 'Low' },
    { label: 'Döviz Korelasyonu', impact: '+8.4%', risk: 'High' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Target size={18} /> ASSET SENSITIVITY MATRIX
        </div>
        <h4 style={{ fontSize: '1.2rem', fontWeight: '950', marginTop: '10px' }}>Piyasa Rezonansı</h4>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {factors.map((f, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>{f.label}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: '950', color: f.impact.startsWith('+') ? 'var(--accent-emerald)' : '#E74C3C' }}>{f.impact}</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
              <div style={{ width: '70%', height: '100%', backgroundColor: 'var(--accent-emerald)', opacity: 0.3 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
        <ShieldAlert size={14} color="var(--accent-emerald)" />
        <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px' }}>HEDGE STRATEJİSİ ÖNERİLİYOR</span>
      </div>
    </div>
  );
};
