"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Zap, X, ChevronRight } from 'lucide-react';

export const ConciergeTerminal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 10005, backgroundColor: 'rgba(5,5,5,0.98)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}
    >
      <div style={{ maxWidth: '800px', width: '100%', backgroundColor: '#FFF', padding: '60px', borderRadius: '4px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', cursor: 'pointer', color: '#CCC' }}><X size={32} /></button>
        
        <header style={{ marginBottom: '50px' }}>
          <div style={{ color: '#1ABC9C', fontSize: '0.7rem', fontWeight: '950', letterSpacing: '4px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={18} /> SOVEREIGN CONCIERGE PROTOCOL
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '950', color: '#0A0A0A', letterSpacing: '-2px' }}>Varlık Talebinizi <span style={{ color: '#1ABC9C' }}>Mühürleyin.</span></h2>
          <p style={{ color: '#666', marginTop: '10px', fontWeight: '500' }}>Sistem, kriterlerinize en uygun "Signature" portföyleri ve uzman danışmanları 60 dakika içinde eşleştirecektir.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div>
            <label style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', display: 'block', marginBottom: '10px' }}>VARLIK SEGMENTİ</label>
            <select style={{ width: '100%', padding: '15px', border: '1px solid #EEE', fontWeight: '700', outline: 'none' }}>
              <option>Signature Residential</option>
              <option>Institutional Energy</option>
              <option>Private Hospitality</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', display: 'block', marginBottom: '10px' }}>YATIRIM HACMİ (ALT LİMİT)</label>
            <input type="text" placeholder="₺ 50.000.000+" style={{ width: '100%', padding: '15px', border: '1px solid #EEE', fontWeight: '700', outline: 'none' }} />
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', display: 'block', marginBottom: '10px' }}>STRATEJİK DETAYLAR</label>
          <textarea placeholder="Konum, mahremiyet düzeyi ve beklenen ROI beklentilerinizi belirtiniz..." style={{ width: '100%', height: '120px', padding: '20px', border: '1px solid #EEE', fontWeight: '500', outline: 'none', resize: 'none' }} />
        </div>

        <button style={{ width: '100%', backgroundColor: '#0A0A0A', color: '#1ABC9C', padding: '25px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          TALEBİ SOVEREIGN AĞINA GÖNDER <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};
