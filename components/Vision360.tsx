"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Maximize, Play, Sparkles } from 'lucide-react';

export const Vision360 = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Sparkles size={20} color="var(--accent-emerald)" />
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>AI 360° CINEMATIC VISION</h4>
        </div>
      </header>

      <div style={{ width: '100%', height: '450px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Sinematik 360 Simülasyonu (Placeholder) */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80")', backgroundSize: '200% 100%', opacity: 0.6 }} 
        />
        
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(26,188,156,0.9)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 auto 20px', boxShadow: '0 0 30px var(--accent-emerald)' }}>
            <Play size={32} color="#FFF" />
          </div>
          <div style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '3px' }}>360° AI TURU BAŞLAT</div>
        </div>

        <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: '#FFF' }}><RotateCcw size={18} /></button>
          <button style={{ padding: '10px', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '8px', color: '#FFF' }}><Maximize size={18} /></button>
        </div>
      </div>

      <div style={{ marginTop: '25px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '500', textAlign: 'center' }}>
        { "Yapay Zeka, yüklediğiniz 2D proje dosyalarını ve resimleri kullanarak derinlik haritası (depth map) oluşturup 360° sanal gezintiyi mühürlemiştir." }
      </div>
    </div>
  );
};
