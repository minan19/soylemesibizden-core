"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, ShieldCheck, Activity, CheckCircle2, FileText } from 'lucide-react';

export const SovereignExport = () => {
  const [status, setStatus] = useState<'IDLE' | 'GENERATING' | 'SEALED'>('IDLE');

  const startExport = () => {
    setStatus('GENERATING');
    setTimeout(() => setStatus('SEALED'), 3000);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px', position: 'relative' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <FileDown size={18} /> INTELLIGENCE EXPORT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Varlık Pasaportu Üretimi</h3>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '35px' }}>
        {[
          { label: 'Finansal Momentum Raporu', id: 'FIN' },
          { label: 'Kentsel DNA & İmar Analizi', id: 'ZON' },
          { label: 'Sovereign Güven Sertifikası', id: 'SEC' }
        ].map((item) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <CheckCircle2 size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.8rem', fontWeight: '750' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={startExport}
        disabled={status === 'GENERATING'}
        style={{ 
          width: '100%', padding: '20px', backgroundColor: status === 'SEALED' ? 'var(--accent-emerald)' : 'var(--text-primary)', 
          color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: '0.4s'
        }}
      >
        <AnimatePresence mode="wait">
          {status === 'IDLE' && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={20} /> RAPORU MÜHÜRLE VE İNDİR
            </motion.div>
          )}
          {status === 'GENERATING' && (
            <motion.div key="gen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Activity size={20} /></motion.div>
              ANALİZ EDİLİYOR...
            </motion.div>
          )}
          {status === 'SEALED' && (
            <motion.div key="sealed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} /> RAPOR MÜHÜRLENDİ (PDF)
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Güven Katsayısı: $$ V_{report} = \prod (Data_{verified} \cdot Trust_{seal}) $$"}
        </p>
      </div>
    </div>
  );
};
