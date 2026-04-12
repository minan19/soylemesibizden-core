"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Maximize, Shield, TrendingUp, Globe } from 'lucide-react';

export const PresentationMode = () => {
  const slides = [
    { label: 'GLOBAL ASSET VALUE', val: '₺ 4.2B', detail: 'Doğrulanmış Varlık Hacmi' },
    { label: 'INTELLIGENCE IQ', val: '98.4/100', detail: 'Yapay Zeka Doğruluk Skoru' },
    { label: 'BLOCKCHAIN PROVENANCE', val: 'SECURE', detail: 'Değiştirilemez Veri Mührü' }
  ];

  return (
    <div style={{ padding: '60px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', borderRadius: '32px', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Background Cinematic Gradients */}
      <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(26,188,156,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      
      <header style={{ position: 'absolute', top: '40px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Shield size={24} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '5px' }}>SOVEREIGN PRESENTATION</span>
        </div>
        <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'rgba(255,255,255,0.4)' }}>2026 FISCAL VISION</div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', zIndex: 1 }}>
        {slides.map((slide, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '3px', marginBottom: '20px' }}>{slide.label}</div>
            <div style={{ fontSize: '4.5rem', fontWeight: '950', letterSpacing: '-4px', lineHeight: '1', marginBottom: '15px' }}>{slide.val}</div>
            <div style={{ fontSize: '1rem', fontWeight: '500', color: 'rgba(255,255,255,0.5)' }}>{slide.detail}</div>
          </motion.div>
        ))}
      </div>

      <footer style={{ position: 'absolute', bottom: '40px', width: 'calc(100% - 120px)', display: 'flex', justifyContent: 'center' }}>
        <div style={{ padding: '20px 40px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', display: 'flex', gap: '30px', alignItems: 'center' }}>
           <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
             {"Vizyon Mührü: $$V_{pres} = \\sum (Trust + Tech) \\cdot Presentation$$"}
           </p>
           <button style={{ background: 'var(--accent-emerald)', border: 'none', padding: '10px 20px', borderRadius: '4px', color: '#FFF', fontWeight: '950', fontSize: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Play size={14} /> SUNUMU BAŞLAT
           </button>
        </div>
      </footer>
    </div>
  );
};
