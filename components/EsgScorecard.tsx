"use client";
import React from 'react';
import { Award, CheckCircle2, Globe, Scale } from 'lucide-react';

export const EsgScorecard = () => {
  const scores = [
    { label: 'ENVIRONMENTAL', score: 'AAA', icon: Globe },
    { label: 'SOCIAL', score: 'A++', icon: Award },
    { label: 'GOVERNANCE', score: 'AAA', icon: Scale }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px', color: 'var(--text-secondary)' }}>ESG COMPLIANCE SCORECARD</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {scores.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <s.icon size={18} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{s.score}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
          <CheckCircle2 size={14} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px' }}>KÜRESEL STANDARTLARLA UYUMLUDUR</span>
        </div>
      </div>
    </div>
  );
};
