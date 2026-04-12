"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Image as ImageIcon, CheckCircle2, Sliders, RefreshCw } from 'lucide-react';

export const AestheticsEngine = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const startEnhancement = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Sparkles size={18} /> SOVEREIGN AESTHETICS ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Görsel Kusursuzluk Tahkimi</h3>
        </div>
        <Sliders size={22} color="var(--text-secondary)" />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        <div style={{ height: '140px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <span style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', position: 'absolute', top: '15px', left: '15px' }}>RAW_DATA</span>
          <ImageIcon size={32} color="#DDD" />
        </div>
        <div style={{ height: '140px', backgroundColor: 'rgba(26,188,156,0.02)', borderRadius: '16px', border: '1px dashed var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <span style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)', position: 'absolute', top: '15px', left: '15px' }}>ENHANCED_OUTPUT</span>
          {isProcessing ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <RefreshCw size={32} color="var(--accent-emerald)" />
            </motion.div>
          ) : (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <CheckCircle2 size={32} color="var(--accent-emerald)" />
            </motion.div>
          )}
        </div>
      </div>

      <button 
        onClick={startEnhancement}
        disabled={isProcessing}
        style={{ width: '100%', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
      >
        {isProcessing ? 'İŞLENİYOR...' : 'ESTETİK MÜHÜRÜ UYGULA'}
      </button>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Estetik Skor: $$ A_{score} = \\int (Light + Texture + Composition) \\, dt $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
