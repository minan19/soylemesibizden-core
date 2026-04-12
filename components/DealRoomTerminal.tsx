"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, X, ChevronRight, ShieldCheck } from 'lucide-react';

export const DealRoomTerminal = ({ isOpen, onClose, asset }: any) => {
  if (!isOpen || !asset) return null;

  return (
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '500px', backgroundColor: '#FFF', borderLeft: '1px solid #EEE', zIndex: 10000, padding: '50px', boxShadow: '-30px 0 70px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}
    >
      <header style={{ borderBottom: '1px solid #F5F5F5', paddingBottom: '30px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock size={18} color="#1ABC9C" />
            <span style={{ color: '#1ABC9C', fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px' }}>GÜVENLİ İŞLEM ODASI</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC' }}><X size={32} /></button>
        </div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '20px' }}>{asset.title}</h2>
      </header>

      <div style={{ flex: 1 }}>
        <div style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '8px', marginBottom: '20px' }}>
          <div style={{ fontSize: '0.6rem', color: '#AAA', fontWeight: '900', marginBottom: '10px' }}>GÜNCEL TEKLİF</div>
          <div style={{ fontSize: '2rem', fontWeight: '950' }}>{asset.price}</div>
        </div>
      </div>

      <button style={{ width: '100%', backgroundColor: '#1ABC9C', color: '#FFF', padding: '22px', border: 'none', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer' }}>
        TEKLİFİ ONAYLA VEYA GÜNCELLE
      </button>
    </motion.div>
  );
};
