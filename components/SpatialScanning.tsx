"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Maximize, Play, ShieldCheck, Cpu } from 'lucide-react';

export const SpatialScanning = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Box size={18} /> NEURAL SPATIAL SCANNING
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>3D Dijital İkiz Projeksiyonu</h3>
        </div>
        <Maximize size={22} color="var(--text-secondary)" />
      </header>

      <div style={{ position: 'relative', height: '240px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Spatial Grid Animation */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2 }} />
        
        {isActive ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ zIndex: 2, textAlign: 'center' }}
          >
            <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: [20, 40, 20] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                  style={{ width: '4px', backgroundColor: 'var(--accent-emerald)', borderRadius: '2px' }}
                />
              ))}
            </div>
            <p style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '2px' }}>MAPPING VOLUMETRIC DATA...</p>
          </motion.div>
        ) : (
          <button 
            onClick={() => setIsActive(true)}
            style={{ zIndex: 2, padding: '20px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
          >
            <Play size={24} color="var(--accent-emerald)" fill="var(--accent-emerald)" />
          </button>
        )}
      </div>

      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>VOXEL RESOLUTION</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>4K SPATIAL</div>
        </div>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>GEOMETRY SYNC</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>99.9%</div>
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Uzaysal Formül: $$ S_{twin} = \\int_{V} \\rho(\\mathbf{r}) \\, d^3\\mathbf{r} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
