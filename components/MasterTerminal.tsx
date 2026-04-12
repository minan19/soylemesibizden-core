"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShieldCheck, Globe, Zap, Database, Activity, TrendingUp } from 'lucide-react';

export const MasterTerminal = () => {
  const stats = [
    { label: 'GLOBAL LIQUIDITY', value: '₺ 4.2B', trend: '+12%', icon: Globe },
    { label: 'AI PREDICTION ACCURACY', value: '99.4%', trend: 'Stable', icon: Zap },
    { label: 'DEFENSE STATUS', value: 'ACTIVE', trend: 'Secure', icon: ShieldCheck },
    { label: 'INTEL DATA POINTS', value: '1.2M+', trend: '+40k/day', icon: Database }
  ];

  return (
    <div style={{ padding: '50px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', marginBottom: '40px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: 'var(--accent-emerald)', borderRadius: '12px' }}>
            <LayoutDashboard size={30} color="#FFF" />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '4px' }}>COMMAND CENTER v1.0</div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', letterSpacing: '-1.5px', color: 'var(--text-primary)' }}>Sovereign Master Terminal</h2>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)' }}>
            <Activity size={20} className="animate-pulse" />
            <span style={{ fontSize: '0.9rem', fontWeight: '950' }}>REAL-TIME INTEL STREAMING</span>
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', marginTop: '5px' }}>LATENCY: 14ms • UPTIME: 99.9%</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ padding: '30px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <stat.icon size={20} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px' }}>{stat.label}</span>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: stat.trend.includes('+') ? 'var(--accent-emerald)' : 'var(--text-secondary)', marginTop: '10px' }}>
              {stat.trend}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
