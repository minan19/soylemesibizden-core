"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useDecision } from '../context/DecisionContext';
import { ShieldCheck, TrendingUp, BarChart3, X } from 'lucide-react';

export const DecisionDesk = ({ isOpen, onClose }: any) => {
  const { selectedAssets, toggleAsset } = useDecision();
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, zXndex: 9999, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(25px)', padding: '60px' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', borderBottom: '1px solid #EEE', paddingBottom: '30px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '950', color: '#0A0A0A', letterSpacing: '4px' }}>DECISION DESK</h2>
            <p style={{ color: '#1ABC9C', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', marginTop: '10px' }}>STRATEJİK VARLIK KIYASLAMA TERMİNALİ</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#0A0A0A', cursor: 'pointer' }}><X size={40} /></button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: `250px repeat(${selectedAssets.length}, 1fr)`, gap: '1px', backgroundColor: '#EEE', border: '1px solid #EEE' }}>
          <div style={{ backgroundColor: '#FFF', padding: '30px', color: '#AAA', fontSize: '0.65rem', fontWeight: '950', display: 'flex', flexDirection: 'column', gap: '50px' }}>
              <div style={{ height: '120px' }}>VARLIK KİMLİĞİ</div>
              <div>GÜVEN SKORU</div>
              <div>YATIRIM ANALİZİ</div>
              <div>BÖLGESEL TREND</div>
          </div>

          {selectedAssets.map((asset: any) => (
            <div key={asset.id} style={{ backgroundColor: '#FFF', padding: '30px', position: 'relative' }}>
               <button onClick={() => toggleAsset(asset)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#EEE', cursor: 'pointer' }}><X size={16} /></button>
               <div style={{ height: '120px' }}>
                  <div style={{ color: '#1ABC9C', fontSize: '0.6rem', fontWeight: '900', marginBottom: '10px' }}>{asset.location}</div>
                  <div style={{ color: '#0A0A0A', fontSize: '1.2rem', fontWeight: '950', marginBottom: '10px' }}>{asset.title}</div>
                  <div style={{ color: '#0A0A0A', fontSize: '1.4rem', fontWeight: '950' }}>{asset.price}</div>
               </div>
               <div style={{ marginTop: '50px', fontSize: '2rem', fontWeight: '950', color: '#D4AF37' }}>%{asset.iq}</div>
               <div style={{ marginTop: '50px', color: '#0A0A0A', fontWeight: '900', fontSize: '0.8rem' }}>AAA+ CLASS</div>
               <div style={{ marginTop: '55px', color: '#1ABC9C', fontWeight: '900' }}>+%14.2</div>
               <button style={{ marginTop: '60px', width: '100%', background: '#0A0A0A', color: '#1ABC9C', border: 'none', padding: '15px', fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer' }}>TEKLİF ODASINI AÇ</button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
