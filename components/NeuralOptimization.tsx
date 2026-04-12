"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity, ShieldCheck, RefreshCw, BarChart } from 'lucide-react';

export const NeuralOptimization = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Cpu size={18} /> NEURAL OPTIMIZATION SHELL
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Algoritmik Performans Matrisi</h3>
        </div>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
          <RefreshCw size={22} color="var(--accent-emerald)" />
        </motion.div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {[
          { label: 'THROUGHPUT', val: '4.2 GB/s', color: 'var(--text-primary)' },
          { label: 'LATENCY', val: '0.8ms', color: 'var(--accent-emerald)' }
        ].map((stat, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>{stat.label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '950', color: stat.color }}>{stat.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '25px', backgroundColor: '#FFF', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>SELF-HEALING STATUS</span>
          <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>%100 ACTIVE</span>
        </div>
        <div style={{ display: 'flex', gap: '4px', height: '30px', alignItems: 'flex-end' }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, 25, 12, 20, 10] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.05 }}
              style={{ flex: 1, backgroundColor: 'var(--accent-emerald)', borderRadius: '1px', opacity: 0.4 }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Optimizasyon: $$ O_{sys} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta \\text{Throughput}}{\\Delta \\text{Latency}} \\oplus \\text{Neural}_{gain} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
