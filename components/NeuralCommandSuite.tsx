"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Mic, Activity, Zap, Terminal, ShieldCheck } from 'lucide-react';

export const NeuralCommandSuite = () => {
  const [isListening, setIsListening] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Terminal size={18} /> NEURAL COMMAND SUITE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Yönetici Sinir Merkezi</h3>
        </div>
        <div style={{ padding: '8px 15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)', boxShadow: '0 0 10px var(--accent-emerald)' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>SYNCED</span>
        </div>
      </header>

      {/* Voice Wave Visualization - Pure Light Style */}
      <div style={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '40px' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={isListening ? { height: [10, 60, 20, 80, 10] } : { height: 8 }}
            transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.05 }}
            style={{ width: '4px', backgroundColor: 'var(--accent-emerald)', borderRadius: '2px', opacity: isListening ? 1 : 0.2 }}
          />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginBottom: '30px' }}>
        <button 
          onClick={() => setIsListening(!isListening)}
          style={{ padding: '20px', backgroundColor: isListening ? 'var(--accent-emerald)' : 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '16px', fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', transition: '0.3s' }}
        >
          <Mic size={18} /> {isListening ? 'DİNLENİYOR...' : 'SİSTEME KOMUT VER'}
        </button>
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <Cpu size={18} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.7rem', fontWeight: '950' }}>LATENCY: 12ms</span>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, lineHeight: '1.6' }}>
          {"Yürütme Protokolü: $$ E_{neural} = \\sum (\\text{Audio}_{input} \\cdot \\sigma(\\text{Intent})) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
