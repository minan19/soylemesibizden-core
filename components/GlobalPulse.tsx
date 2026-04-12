"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Activity, TrendingUp, Zap } from 'lucide-react';

export const GlobalPulse = () => {
  const indices = [
    { label: 'GLOBAL LIQUIDITY INDEX', val: '412.5', change: '+1.2%', status: 'Bullish' },
    { label: 'REAL ESTATE SENTIMENT', val: '88.4', change: '-0.4%', status: 'Stable' },
    { label: 'CAPITAL FLOW (RE)', val: '₺ 2.4B', change: '+8.8%', status: 'High' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Globe size={18} /> GLOBAL LIQUIDITY PULSE
        </div>
        <Activity size={18} color="var(--accent-emerald)" className="animate-pulse" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {indices.map((idx, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{idx.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{idx.val}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: idx.change.startsWith('+') ? 'var(--accent-emerald)' : '#E74C3C' }}>{idx.change}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{idx.status.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Makro Analiz: $$ L_{pulse} = \int_{t-n}^{t} \frac{\Delta Capital}{\Delta Sentiment} dt $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
