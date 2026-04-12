"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertCircle, Zap, ShieldCheck } from 'lucide-react';

export const LiquidityStressTest = () => {
  const scenarios = [
    { name: 'Normal Market', status: 'Stable', capacity: '100%', color: 'var(--accent-emerald)' },
    { name: 'High Inflation', status: 'Strained', capacity: '64%', color: 'var(--accent-gold)' },
    { name: 'Global Liquidity Crisis', status: 'Critical', capacity: '22%', color: '#E74C3C' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Droplets size={18} /> LIQUIDITY STRESS TEST
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Likidite Direnci</h3>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {scenarios.map((s, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>{s.name}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: '950', color: s.color }}>{s.status.toUpperCase()}</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '3px', position: 'relative' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: s.capacity }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                style={{ position: 'absolute', height: '100%', backgroundColor: s.color, borderRadius: '3px' }}
              />
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.65rem', fontWeight: '900', color: 'var(--text-secondary)' }}>
              RESERVE CAPACITY: {s.capacity}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6', margin: 0 }}>
          {"Matematiksel Model: $$ L_{resilience} = \frac{\Phi \cdot C_{cash}}{V_{asset} \cdot \sigma_{market}} $$ formülü ile stres testi mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
