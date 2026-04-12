"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Radio, Zap, ShieldCheck, Activity, Volume2 } from 'lucide-react';

export const SovereignVoice = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Radio size={18} /> SPATIAL VOICE COMMAND
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Sinirsel Komuta Merkezi</h3>
        </div>
        <div style={{ padding: '12px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Mic size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '30px' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [10, 40, 15, 50, 10] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
            style={{ width: '3px', backgroundColor: 'var(--accent-emerald)', borderRadius: '2px', opacity: 0.6 }}
          />
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', marginBottom: '25px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-secondary)' }}>SESLİ ANALİZ DURUMU</span>
          <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>IDENTIFIED: MUSTAFA_INAN</span>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>HAPTIC FEEDBACK: READY</span>
        </div>
        <Zap size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Komuta Akışı: $$ \\Omega_{voice} = \\int_{f_{min}}^{f_{max}} (Signal \\cdot \\text{Auth}) \\, df \\oplus \\text{Command}_{exec} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
