"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Droplets, ShieldCheck, Zap, ThermometerSun } from 'lucide-react';

export const StrategicLand = () => {
  const landMetrics = [
    { label: 'TOPRAK VERİMLİLİĞİ', val: '9.2/10', color: 'var(--accent-emerald)' },
    { label: 'SİSMİK GÜVENLİK', val: 'Sınıf-A', color: 'var(--accent-emerald)' },
    { label: 'İMAR MOMENTUMU', val: '%18/Yıl', color: 'var(--text-primary)' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Mountain size={18} /> STRATEGIC LAND INTELLIGENCE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Arazi DNA & Yatırım Tahkimi</h3>
        </div>
        <Zap size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {landMetrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '1px' }}>{m.label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '950', color: m.color }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '25px', backgroundColor: '#FFF', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Droplets size={16} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>HİDROLOJİK ANALİZ: SU KAYNAKLARI MEVCUT</span>
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }} />
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Arazi Değeri: $$ L_{strat} = \oint (Soil \cdot Water) + \text{Zoning}_{index} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
