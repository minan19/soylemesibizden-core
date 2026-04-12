"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const SovereignLens = ({ active, onChange }: { active: string, onChange: (v: string) => void }) => {
  const modes = [
    { id: 'ALL', label: 'TÜMÜ' },
    { id: 'SALE', label: 'SATILIK' },
    { id: 'RENT', label: 'KİRALIK' }
  ];

  return (
    <div style={{ display: 'inline-flex', backgroundColor: 'var(--bg-secondary)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onChange(mode.id)}
          style={{ 
            padding: '10px 24px', border: 'none', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '950', cursor: 'pointer', position: 'relative', backgroundColor: 'transparent',
            color: active === mode.id ? 'var(--bg-primary)' : 'var(--text-secondary)', transition: 'color 0.3s'
          }}
        >
          {active === mode.id && (
            <motion.div layoutId="lens-bg" style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--text-primary)', borderRadius: '10px', zIndex: -1 }} />
          )}
          {mode.label}
        </button>
      ))}
    </div>
  );
};
