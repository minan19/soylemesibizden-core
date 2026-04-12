"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Leaf, BarChart3, Scale, Search } from 'lucide-react';

export const IntelligenceMatrix = ({ iq }: { iq: number }) => {
  const metrics = [
    { label: 'LEGAL', icon: Scale, val: 98 },
    { label: 'CARBON', icon: Leaf, val: 92 },
    { label: 'ROI', icon: BarChart3, val: 88 },
    { label: 'LIQUIDITY', icon: Zap, val: 95 },
    { label: 'SECURITY', icon: Shield, val: 99 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '3px' }}>NEURAL ANALYSIS</div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--text-primary)' }}>Intelligence Matrix</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{iq}%</div>
          <div style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-secondary)' }}>SOVEREIGN IQ</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <m.icon size={20} color={i === 0 ? 'var(--accent-emerald)' : 'var(--text-secondary)'} style={{ marginBottom: '10px' }} />
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{m.label}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>{m.val}%</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${iq}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }}
        />
      </div>
    </div>
  );
};
