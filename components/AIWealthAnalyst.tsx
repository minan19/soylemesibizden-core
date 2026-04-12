"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calculator, ShieldCheck, LineChart, PieChart, Coins } from 'lucide-react';

export const AIWealthAnalyst = () => {
  const projections = [
    { label: 'VERGİ OPTİMİZASYONU', val: '%22 TASARRUF', status: 'MAXIMIZED' },
    { label: 'ÖNGÖRÜLEN DEĞER ARTIŞI', val: '₺ 12.4M', status: 'BULLISH' },
    { label: 'SERVET HIZI (VELOCITY)', val: '1.4x / YR', status: 'HIGH' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <LineChart size={18} /> SOVEREIGN AI WEALTH ANALYST
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Öngörülü Sermaye Motoru</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Calculator size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {projections.map((p, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{p.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950', color: 'var(--text-primary)' }}>{p.val}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{p.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>VERGİSEL ZIRH AKTİF</span>
        </div>
        <Coins size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Servet Tahmini: $$ W_{predict} = \\sum_{i=1}^{n} (V_{asset} \\cdot e^{r \\cdot \\Delta t}) - \\tau_{opt} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
