"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Landmark, TrendingUp, ShieldCheck, Globe, Zap, PieChart } from 'lucide-react';

export const SmartRegistryV3 = () => {
  const liquidityStats = [
    { label: 'FRACTIONAL SHARES', val: '1,000,000 UNIT', status: 'MINTED' },
    { label: 'MARKET LIQUIDITY', val: '$ 42.5M', status: 'HIGH' },
    { label: 'GLOBAL ACCESS', val: 'ACTIVE (TR, EN, AR)', status: 'SYNCED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Landmark size={18} /> SMART REGISTRY v3
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Likidite Katmanı</h3>
        </div>
        <div style={{ padding: '10px 20px', backgroundColor: '#FFF', borderRadius: '50px', border: '1px solid var(--border-color)', color: 'var(--accent-emerald)', fontSize: '0.65rem', fontWeight: '950' }}>
          LIQUIDITY_ACTIVE
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {liquidityStats.map((stat, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '10px' }}>
                <Layers size={16} color="var(--accent-emerald)" />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{stat.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{stat.val}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{stat.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <PieChart size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>ANLIK PAY DAĞILIMI: OPTİMİZE</span>
        </div>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Zap size={16} color="var(--accent-emerald)" />
        </motion.div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Likidite Formülü: $$ L_{fraction} = \\sum_{i=1}^{n} \\left( \\frac{V_{asset}}{S_{total}} \\right) \\times \\text{Demand}_{coeff} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
