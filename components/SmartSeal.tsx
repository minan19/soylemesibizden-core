"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Award } from 'lucide-react';

export const SmartSeal = ({ id }: { id: string }) => {
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ padding: '30px', border: '2px solid #1ABC9C', borderRadius: '50%', width: '150px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4FBF9', position: 'relative', margin: '20px auto' }}
    >
      <div style={{ position: 'absolute', top: -10, backgroundColor: '#FFF', padding: '0 10px', fontSize: '0.6rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px' }}>
        OFFICIAL SEAL
      </div>
      <ShieldCheck size={40} color="#1ABC9C" />
      <div style={{ fontSize: '0.5rem', fontWeight: '950', color: '#0A0A0A', marginTop: '10px', letterSpacing: '1px' }}>SOVEREIGN ID</div>
      <div style={{ fontSize: '0.55rem', fontWeight: '700', color: '#AAA', fontFamily: 'monospace' }}>#{id.slice(0,8).toUpperCase()}</div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', inset: -10, border: '1px dashed #1ABC9C', borderRadius: '50%', opacity: 0.3 }}
      />
    </motion.div>
  );
};
