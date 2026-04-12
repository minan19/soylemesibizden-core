"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, AlertCircle, ShieldCheck, Activity } from 'lucide-react';

export const PredictiveArbitrage = () => {
  const opportunities = [
    { target: 'ÇANAKKALE_PLOT_A2', potential: '+42%', risk: 'LOW', confidence: 98 },
    { target: 'MUGLA_VILLA_X', potential: '+28%', risk: 'MED', confidence: 84 },
    { target: 'IST_OFFICE_Z', potential: '+15%', risk: 'LOW', confidence: 92 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Target size={18} /> SOVEREIGN PREDICTIVE ARBITRAGE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Fırsat Bağlantı Merkezi</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Zap size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {opportunities.map((op, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '950' }}>{op.target}</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '800' }}>POTANSİYEL: {op.potential}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>CONFIDENCE: %{op.confidence}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: op.risk === 'LOW' ? 'var(--accent-emerald)' : '#F39C12' }}>RISK: {op.risk}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>OPTIMAL ENTRY ALGO: ACTIVE</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Arbitraj Formülü: $$ \\Omega_{optimal} = \\int \\frac{\\partial P}{\\partial t} \\, dt - \\sigma_{market} \\oplus \\text{Nexus}_{gain} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
