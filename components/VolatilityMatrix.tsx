"use client";
import React from 'react';
import { Activity, TrendingDown, ArrowUpRight, Globe } from 'lucide-react';

export const VolatilityMatrix = () => {
  const indexes = [
    { label: 'SOVEREIGN REAL ESTATE INDEX', value: '884.2', change: '+1.2%', volt: 'Low' },
    { label: 'GLOBAL LIQUIDITY INDEX', value: '412.5', change: '-4.8%', volt: 'High' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px', color: 'var(--text-secondary)' }}>PIYASA VOLATILITE MATRİSİ</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {indexes.map((idx, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{idx.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{idx.value}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: idx.change.startsWith('+') ? 'var(--accent-emerald)' : '#E74C3C' }}>
                {idx.change}
              </div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{idx.volt} VOLATILITY</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
