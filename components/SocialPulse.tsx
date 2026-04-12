"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, MessageSquare, Users, TrendingUp, Zap, Radio } from 'lucide-react';

export const SocialPulse = () => {
  const regions = [
    { name: 'ÇANAKKALE_AXIS', momentum: '+88%', sentiment: 'HYPER_GROWTH' },
    { name: 'MUGLA_COAST', momentum: '+64%', sentiment: 'STEADY_ELITE' },
    { name: 'BIST_REAL_ESTATE', momentum: '+12%', sentiment: 'ACCUMULATING' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Radio size={18} /> EXECUTIVE SENTIMENT & PULSE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Pazar Rezonans Motoru</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Activity size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {regions.map((r, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{r.name}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{r.momentum}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-primary)' }}>{r.sentiment}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '3px', marginBottom: '25px' }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, 35, 15, 40, 10] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.08 }}
            style={{ flex: 1, backgroundColor: 'var(--accent-emerald)', borderRadius: '1px', opacity: 0.3 }}
          />
        ))}
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Rezonans Analizi: $$ P_{pulse} = \\sum (Social_{trend} \\cdot \\text{Inst}_{interest}) \\oplus \\text{Neural}_{vibe} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
