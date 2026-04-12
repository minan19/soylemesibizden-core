"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart4, RefreshCw } from 'lucide-react';

export const WealthSimulator = () => {
  const [risk, setRisk] = useState('MODERATE');

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <BarChart4 size={18} /> MONTE CARLO PROJECTION
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Servet Simülatörü</h3>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['CONSERVATIVE', 'MODERATE', 'AGGRESSIVE'].map((r) => (
            <button 
              key={r} 
              onClick={() => setRisk(r)}
              style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: risk === r ? 'var(--text-primary)' : 'transparent', color: risk === r ? 'var(--bg-primary)' : 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: '950', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div style={{ height: '300px', width: '100%', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-end', padding: '30px', gap: '20px', position: 'relative', overflow: 'hidden' }}>
        {[60, 85, 45, 95, 70, 100, 80].map((h, i) => (
          <motion.div 
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1, delay: i * 0.1 }}
            style={{ flex: 1, backgroundColor: i === 5 ? 'var(--accent-emerald)' : 'rgba(26,188,156,0.1)', borderRadius: '4px' }}
          />
        ))}
        <div style={{ position: 'absolute', top: '20px', left: '30px', fontSize: '0.6rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>
          {"$$ P(x) = \\frac{1}{\\sigma \\sqrt{2\\pi}} e^{-\\frac{1}{2}(\\frac{x-\\mu}{\\sigma})^2} $$"}
        </div>
      </div>

      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px' }}>PROJEKSİYON (10 YIL)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--text-primary)' }}>₺ 424.8M</div>
        </div>
        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px' }}>GÜVEN ARALIĞI</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>%95.2</div>
        </div>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <RefreshCw size={18} /> SENARYOYU YENİDEN HESAPLA
      </button>
    </div>
  );
};
