"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Play, Layout, Image as ImageIcon } from 'lucide-react';

export const PropertyVision = () => {
  const [view, setView] = useState('360'); // '360', 'FLOOR', 'INTERIOR'

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Sparkles size={20} color="var(--accent-emerald)" />
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>AI CINEMATIC VISION</h4>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['360° TUR', 'KAT PLANI', 'İÇ MEKAN'].map((v, i) => (
            <button key={i} onClick={() => setView(v === '360° TUR' ? '360' : v === 'KAT PLANI' ? 'FLOOR' : 'INTERIOR')}
              style={{ padding: '8px 15px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'transparent', fontSize: '0.65rem', fontWeight: '950', cursor: 'pointer' }}>
              {v}
            </button>
          ))}
        </div>
      </header>

      <div style={{ width: '100%', height: '500px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {view === '360' && (
          <motion.div animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80")', backgroundSize: '200% 100%', opacity: 0.6 }} 
          />
        )}
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 20px', boxShadow: '0 0 30px var(--accent-emerald)' }}>
            <Play size={32} color="#FFF" />
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '3px' }}>VİZYONU BAŞLAT</div>
        </div>
      </div>
    </div>
  );
};
