"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, ShieldCheck } from 'lucide-react';

export const EcoIntelligence = () => {
  const metrics = [
    { label: 'ENERGY EFFICIENCY', val: 'A++', score: 96 },
    { label: 'CARBON OFFSET', val: '2.4t/Year', score: 84 },
    { label: 'WATER RECYCLING', val: '%92', score: 92 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Leaf size={18} /> SOVEREIGN ECO-INTELLIGENCE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Karbon & Enerji Matrisi</h3>
        </div>
        <Zap size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{m.label}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{m.val}</span>
            </div>
            <div style={{ height: '4px', backgroundColor: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${m.score}%` }} 
                transition={{ duration: 1.2, delay: i * 0.1 }}
                style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          ECONIQ standartlarına göre mülk "Ultra-Green" olarak mühürlenmiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Eko-Skor: $$ E_{eco} = \\sum (G_{efficiency} \\cdot C_{offset}) \\cdot \\text{IQ}_{green} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
