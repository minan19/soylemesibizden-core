"use client";
import React from 'react';

export const GlobalIndex = () => {
  const indices = [
    { label: 'SOVEREIGN-X', val: '2,842.12', change: '+1.24%' },
    { label: 'CARBON-TOKEN', val: '$42.10', change: '+0.85%' },
    { label: 'REAL-ESTATE-IQ', val: '94.8', change: '+0.12%' }
  ];

  return (
    <div style={{ width: '100%', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 80px', display: 'flex', gap: '40px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      {indices.map((idx, i) => (
        <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '0.65rem', fontWeight: '900' }}>
          <span style={{ color: 'var(--text-secondary)' }}>{idx.label}</span>
          <span style={{ color: 'var(--text-primary)' }}>{idx.val}</span>
          <span style={{ color: 'var(--accent-emerald)' }}>{idx.change}</span>
        </div>
      ))}
    </div>
  );
};
