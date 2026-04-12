"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Wind, Sun, ShieldCheck, Gauge } from 'lucide-react';

export const CarbonIntelligence = () => {
  const esgMetrics = [
    { label: 'KARBON OFSET POTANSİYELİ', val: '8.4 Ton/Yıl', intensity: 0.85 },
    { label: 'ENERJİ VERİMLİLİK SKORU', val: 'A++', intensity: 0.95 },
    { label: 'YEŞİL ALAN İNDEKSİ', val: '%42', intensity: 0.70 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Leaf size={18} /> CARBON INTELLIGENCE ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Ekolojik Sermaye Analizi</h3>
        </div>
        <Gauge size={24} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
        {esgMetrics.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{item.label}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{item.val}</span>
            </div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.intensity * 100}%` }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, lineHeight: '1.5' }}>
          {"Çevresel Değer İndeksi: $$ EVI = \\sum (C_{offset} \\cdot \\beta) + \\Delta Energy_{eff} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
