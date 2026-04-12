"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Scan, Target, ShieldCheck, Cpu, Box, RefreshCw } from 'lucide-react';

export const AIVisionAnalyst = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 3500);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Cpu size={18} /> SOVEREIGN VISION ANALYST
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Görsel Zeka Analizi</h3>
        </div>
        <Target size={24} color={isScanning ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
      </header>

      <div style={{ position: 'relative', height: '200px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isScanning && (
          <motion.div 
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ position: 'absolute', left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent-emerald)', boxShadow: '0 0 15px var(--accent-emerald)', zIndex: 10 }}
          />
        )}
        
        <div style={{ textAlign: 'center', opacity: 0.4 }}>
          {isScanning ? (
             <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
               <RefreshCw size={48} color="var(--accent-emerald)" />
             </motion.div>
          ) : (
            <Box size={48} color="var(--text-secondary)" />
          )}
          <p style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '1px', marginTop: '15px' }}>{isScanning ? 'PIXEL SCANNING...' : 'ASSET_PREVIEW.RAW'}</p>
        </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {[
          { label: 'Mimari Bütünlük', val: isScanning ? '...' : '94/100' },
          { label: 'Yatırımcı Cazibesi', val: isScanning ? '...' : 'Tier-1' }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '850' }}>
            <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            <span style={{ color: 'var(--accent-emerald)' }}>{item.val}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={startScan}
        disabled={isScanning}
        style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
      >
        <Scan size={18} /> {isScanning ? 'ANALİZ EDİLİYOR' : 'SİNİRSEL TARAMAYI BAŞLAT'}
      </button>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Görü Formülü: $$ V_{vision} = \\oint (\\text{Pixel}_{data} \\cdot \\text{Context}_{weight}) \\, dA $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
