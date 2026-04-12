"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Activity, ShieldCheck, Zap } from 'lucide-react';

export const SovereignAnalytics = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Activity size={18} /> PREDICTIVE ANALYTICS SUITE
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px' }}>Varlık IQ Matrisi</h3>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '25px', marginBottom: '40px' }}>
        {[
          { label: 'Pazar Rezonansı', val: '92/100', color: 'var(--accent-emerald)' },
          { label: 'Likidite Akışı', val: '74/100', color: 'var(--text-primary)' },
          { label: 'Risk Tahkimi', val: 'Low', color: 'var(--accent-emerald)' },
          { label: 'Momentum Skoru', val: '+14.2', color: 'var(--text-primary)' }
        ].map((item, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>{item.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '950', color: item.color }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '30px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
        <h4 style={{ fontSize: '0.8rem', fontWeight: '950', marginBottom: '20px' }}>Bölgesel Korelasyon Analizi</h4>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '15px', height: '150px' }}>
          {[60, 80, 45, 90, 70, 100].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1, delay: i * 0.1 }}
              style={{ flex: 1, backgroundColor: i === 5 ? 'var(--accent-emerald)' : 'var(--text-secondary)', borderRadius: '4px', opacity: 0.3 + (h / 100) }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Otorite Formülü: $$ IQ = \\frac{\\sum (L_{score} \\cdot W_L) + \\sum (Y_{proj} \\cdot W_Y)}{\\text{Risk}_{coeff}} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
