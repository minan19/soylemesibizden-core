"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, AlertTriangle, ShieldCheck, Zap, Activity, BarChart3 } from 'lucide-react';

export const GlobalIntelligence = () => {
  const marketSignals = [
    { region: 'EU_MARKET', sentiment: 'BULLISH', risk: 'LOW' },
    { region: 'MENA_AXIS', sentiment: 'NEUTRAL', risk: 'MEDIUM' },
    { region: 'ASIA_PACIFIC', sentiment: 'GROWTH', risk: 'LOW' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <BarChart3 size={18} /> GLOBAL INTELLIGENCE TERMINAL
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Makro Izgara</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Globe size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {marketSignals.map((signal, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: signal.sentiment === 'BULLISH' ? 'var(--accent-emerald)' : 'var(--text-primary)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{signal.region}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--text-primary)' }}>{signal.sentiment}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: signal.risk === 'LOW' ? 'var(--accent-emerald)' : '#F39C12' }}>RISK: {signal.risk}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>MAKRO SİNYAL DOĞRULAMA: AKTİF</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Makro Analiz: $$ I_{global} = \\oint (Signal_{data} \\times Context_{weight}) \\, dt \\oplus \\text{Alpha}_{gen} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
