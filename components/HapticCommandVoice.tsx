"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Zap, Cpu, Volume2, ShieldCheck, Waves } from 'lucide-react';

export const HapticCommandVoice = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Volume2 size={18} /> HAPTIC COMMAND VOICE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Sinirsel Ses Arayüzü</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <ShieldCheck size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      {/* Neural Waveform Animation */}
      <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={isRecording ? { height: [15, 70, 20, 90, 15] } : { height: 10 }}
            transition={{ repeat: Infinity, duration: 1, delay: i * 0.07 }}
            style={{ width: '5px', backgroundColor: 'var(--accent-emerald)', borderRadius: '3px', opacity: isRecording ? 1 : 0.2 }}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <button 
          onClick={() => setIsRecording(!isRecording)}
          style={{ padding: '20px', backgroundColor: isRecording ? 'var(--accent-emerald)' : 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: '0.4s' }}
        >
          <Mic size={20} /> {isRecording ? 'SES ANALİZ EDİLİYOR' : 'KOMUT VER'}
        </button>
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <Zap size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.7rem', fontWeight: '950' }}>0% ERROR BRIDGE</span>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px dashed var(--border-color)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '800', margin: 0 }}>
          HAPTIC FEEDBACK: ACTIVE ON MACBOOK PRO & WATCH
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Ses İşleme: $$ H_{voice} = \\int \\Psi(t) \\cdot e^{-i \\omega t} \\, dt $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
