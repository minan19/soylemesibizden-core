"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Coins, TrendingUp, ShieldCheck, Globe, ArrowDownRight } from 'lucide-react';

export const CurrencyShield = () => {
  const conversions = [
    { label: 'USD EQUIVALENT', val: '$ 123.520', change: '+0.4%' },
    { label: 'GOLD OUNCE (XAU)', val: '54.2 Oz', change: '-0.2%' },
    { label: 'BITCOIN (SATS)', val: '1.84 BTC', change: '+2.1%' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Coins size={18} /> GLOBAL CURRENCY SHIELD
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Likidite Koruma Kalkanı</h3>
        </div>
        <Globe size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {conversions.map((conv, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{conv.label}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '950' }}>{conv.val}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '950', color: conv.change.startsWith('+') ? 'var(--accent-emerald)' : '#E74C3C' }}>{conv.change}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>REAL-TIME</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Sermaye, küresel enflasyon momentumuna karşı mühürlenmiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Zırh Formülü: $$ V_{shield} = \\frac{V_{try}}{K_{rate}} \\cdot \\Phi_{momentum} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
