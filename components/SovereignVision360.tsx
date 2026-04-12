"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Maximize2 } from 'lucide-react';

export const SovereignVision360 = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={20} color="var(--accent-emerald)" />
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>AI 360° CINEMATIC VISION</h4>
        </div>
      </header>

      <div style={{ width: '100%', height: '400px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80")', backgroundSize: '200% 100%', opacity: 0.6 }} 
        />
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 15px' }}>
            <Play size={24} color="#FFF" />
          </div>
          <div style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', color: '#FFF' }}>360° TURU BAŞLAT</div>
        </div>
      </div>
      
      <p style={{ marginTop: '20px', fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: 'center', fontWeight: '500' }}>
        {"AI Rendering: $$V_{360} = \text{Render}(Input_{data})$$ mühürlendi."}
      </p>
    </div>
  );
};
