"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Send, Cpu, Activity } from 'lucide-react';

export const SovereignConcierge = () => {
  const [query, setQuery] = useState('');
  
  const insights = [
    "Sovereign IQ: Çanakkale bölgesindeki imar hızı %14 arttı.",
    "Analiz: Asset #E21 için vatandaşlık onayı mühürlendi.",
    "Strateji: Portföy likiditesi için %12 kiralık dönüşümü öneriliyor."
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.1)', borderRadius: '12px' }}>
            <Cpu size={20} color="var(--accent-emerald)" />
          </div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>SOVEREIGN CONCIERGE</h4>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={14} color="var(--accent-emerald)" className="animate-pulse" />
          <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>NEURAL LINK ACTIVE</span>
        </div>
      </header>

      <div style={{ minHeight: '180px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', padding: '25px', marginBottom: '30px', border: '1px solid var(--border-color)' }}>
        <AnimatePresence>
          {insights.map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '15px', display: 'flex', gap: '12px' }}
            >
              <span style={{ color: 'var(--accent-emerald)', fontWeight: '950' }}>›</span> {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div style={{ position: 'relative' }}>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="İstihbarat komutu girin..."
          style={{ width: '100%', padding: '20px 60px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', outline: 'none', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }} 
        />
        <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
          <Terminal size={18} color="var(--text-secondary)" />
        </div>
        <button style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'var(--accent-emerald)', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer', color: '#FFF' }}>
          <Send size={18} />
        </button>
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: '500' }}>
        {"Zeka Katsayısı: $$IQ_{neural} = \\lim_{t \\to \\infty} \\frac{\\text{Insight}}{\\text{Data}} > 98.4$$ mühürlenmiştir."}
      </p>
    </div>
  );
};
