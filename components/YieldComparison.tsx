"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

export const YieldComparison = () => {
  const benchmarks = [
    { label: 'SÖYLEMESİ BİZDEN (ASSET IQ)', val: '%112', color: 'var(--accent-emerald)', highlight: true },
    { label: 'BIST 100 INDEX', val: '%64', color: '#666', highlight: false },
    { label: 'GOLD (XAU/TRY)', val: '%42', color: '#999', highlight: false }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Zap size={18} /> YIELD ALPHA MATRIX
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Karşılaştırmalı Getiri Analizi</h3>
        </div>
        <TrendingUp size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginBottom: '35px' }}>
        {benchmarks.map((item, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.7rem', fontWeight: '950' }}>
              <span style={{ color: item.highlight ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ color: item.color }}>{item.val}</span>
            </div>
            <div style={{ height: '8px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: item.val }} 
                transition={{ duration: 1.2, delay: i * 0.15 }}
                style={{ height: '100%', backgroundColor: item.color }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Varlık, pazar endeksine karşı <strong>+%48 Alfa</strong> üretmektedir.
        </p>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Alfa Formülü: $$ Y_{alpha} = Y_{asset} - Y_{benchmark} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
