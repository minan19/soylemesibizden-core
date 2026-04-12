"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Ruler, Wind, Sun, DollarSign, Layers, Activity } from 'lucide-react';

export const SimulationEngine = () => {
  const [activeModel, setActiveModel] = useState('GARDEN_HOUSE');

  const simulationMetrics = [
    { label: 'YAPI MALİYETİ', val: '₺ 2.8M', icon: DollarSign },
    { label: 'GÜNEŞ VERİMİ', val: '%94', icon: Sun },
    { label: 'RÜZGAR YÜKÜ', val: 'LOW', icon: Wind }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Layers size={18} /> SOVEREIGN 3D SIMULATION ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Mimari Simülasyon Çekirdeği</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Home size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ position: 'relative', height: '300px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
        {/* Lazer Tarama Efekti */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ position: 'absolute', width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-emerald), transparent)', zIndex: 5, opacity: 0.6 }}
        />
        
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--accent-emerald)', border: '2px dashed var(--accent-emerald)', padding: '20px', borderRadius: '12px' }}
          >
            {activeModel} <br /> 3D_MODEL_RENDER
          </motion.div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '30px' }}>
        {simulationMetrics.map((m, i) => (
          <div key={i} style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <m.icon size={16} color="var(--accent-emerald)" style={{ margin: '0 auto 10px' }} />
            <div style={{ fontSize: '0.5rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{m.label}</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Ruler size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>HASSAS ÖLÇÜMLENDİRME: AKTİF</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Simülasyon Çıktısı: $$ S_{sim} = \\iint_{\\mathcal{A}} (Structure \\cdot Environment) \\, dA \\oplus \\text{Cost}_{opt} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
