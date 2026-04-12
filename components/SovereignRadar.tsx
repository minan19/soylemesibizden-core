"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Crosshair, Zap, Activity } from 'lucide-react';

export const SovereignRadar = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Crosshair size={18} /> CYBER DEFENSE RADAR
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Siber Kalkan Analizi</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={18} color="var(--accent-emerald)" className="animate-pulse" />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>SCANNING...</span>
        </div>
      </header>

      <div style={{ position: 'relative', height: '350px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Radar Sweep Animation */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '200%', height: '200%', background: 'conic-gradient(from 0deg, rgba(26,188,156,0.15) 0deg, transparent 90deg)', transformOrigin: 'center' }}
        />
        
        {/* Radar Grids */}
        <div style={{ position: 'absolute', width: '300px', height: '300px', border: '1px solid rgba(26,188,156,0.2)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid rgba(26,188,156,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '100px', height: '100px', border: '1px solid rgba(26,188,156,0.05)', borderRadius: '50%' }} />

        {/* Threat Targets */}
        <div style={{ zIndex: 2, textAlign: 'center' }}>
          <ShieldAlert size={48} color="var(--accent-emerald)" />
          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginTop: '15px', letterSpacing: '2px' }}>NO THREATS DETECTED</div>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Kriptografik Bütünlük: $$ \Psi_{integrity} = \lim_{t \to \infty} \int P(safe) dt > 0.9999 $$ olarak mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
