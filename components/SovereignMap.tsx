"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation, Globe, Crosshair, Zap, ShieldCheck } from 'lucide-react';

export default function SovereignMap() {
  const assets = [
    { name: 'Çanakkale Stratejik Tarla', coord: { top: '35%', left: '32%' }, type: 'INVESTMENT' },
    { name: 'Muğla Garden House', coord: { top: '55%', left: '38%' }, type: 'LIFESTYLE' },
    { name: 'İstanbul Terra Hub', coord: { top: '28%', left: '42%' }, type: 'CORPORATE' }
  ];

  return (
    <div style={{ padding: '25px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Globe size={18} /> GEOSPATIAL COMMAND CENTER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Varlık Projeksiyonu</h3>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#FFF', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Crosshair size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ position: 'relative', height: '350px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden', cursor: 'crosshair' }}>
        {/* Apple-esque Minimalist Grid & World Pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(var(--border-color) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.4 }} />
        
        {/* Asset Markers */}
        {assets.map((asset, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.3 }}
            style={{ position: 'absolute', top: asset.coord.top, left: asset.coord.left, zIndex: 10 }}
          >
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', width: '40px', height: '40px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', top: '-15px' }}
              />
              <div style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', border: '2px solid #FFF', boxShadow: '0 0 10px var(--accent-emerald)', zIndex: 11 }} />
              
              <div style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: '950' }}>{asset.name}</div>
                <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', fontWeight: '700' }}>{asset.type}</div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Sync Status Overlay */}
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '1px' }}>REAL-TIME GEOSYNC ACTIVE</span>
        </div>
      </div>

      <div style={{ marginTop: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '15px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>KAPSAMA ALANI</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '950' }}>GLOBAL_ALPHA</div>
        </div>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '15px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>AKTİF NODLAR</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '950' }}>12 STRATEGIC</div>
        </div>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '15px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>VERİ HIZI</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>0.2ms</div>
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Coğrafi Matris: $$ P_{geo} = \\lim_{\\Delta x \\to 0} \\sum (V_{asset} \\cdot \\text{Coord}_{i}) \\oplus \\text{Sovereign}_{link} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
}
