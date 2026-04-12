"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart, TrendingUp, Layers } from 'lucide-react';

export const PortfolioOptimizer = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Layers size={18} /> PORTFOLIO OPTIMIZER
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Sermaye Dağılım Matrisi</h3>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {[
          { label: 'Arazi / Tarla', val: '%55', color: 'var(--accent-emerald)' },
          { label: 'Ticari / Lojistik', val: '%30', color: 'var(--text-primary)' },
          { label: 'Likidite Rezervi', val: '%15', color: '#666' }
        ].map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.75rem', fontWeight: '900' }}>
              <span>{item.label}</span>
              <span>{item.val}</span>
            </div>
            <div style={{ height: '6px', backgroundColor: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: item.val }} style={{ height: '100%', backgroundColor: item.color }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Optimizasyon: $$ P_{opt} = \max \sum (Yield \cdot Weight) - Risk $$"}
        </p>
      </div>
    </div>
  );
};
