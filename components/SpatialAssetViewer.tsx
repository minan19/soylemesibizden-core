"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, Maximize2, RotateCw, Sun, Mountain, ShieldCheck } from 'lucide-react';

export const SpatialAssetViewer = () => {
  const [activeLayer, setActiveLayer] = useState('TOPOGRAPHY');

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Box size={18} /> 3D SPATIAL ASSET VIEWER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Dijital İkiz Projeksiyonu</h3>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '10px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '12px' }}><RotateCw size={18} /></button>
          <button style={{ padding: '10px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '12px' }}><Maximize2 size={18} /></button>
        </div>
      </header>

      <div style={{ position: 'relative', height: '400px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
        {/* Spatial 3D Placeholder Grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.2, transform: 'rotateX(60deg) scale(2)', transformOrigin: 'center' }} />
        
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ width: '200px', height: '150px', backgroundColor: 'rgba(26,188,156,0.1)', border: '2px solid var(--accent-emerald)', borderRadius: '8px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(26,188,156,0.2)' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', letterSpacing: '2px' }}>CANAKKALE_ST_01</div>
            <div style={{ fontSize: '0.5rem', color: 'var(--text-secondary)' }}>MESH_RENDER_ACTIVE</div>
          </div>
        </motion.div>

        {/* UI Overlay on 3D Space */}
        <div style={{ position: 'absolute', left: '20px', top: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['TOPOGRAPHY', 'INFRASTRUCTURE', 'SOLAR_PATH'].map(layer => (
            <button 
              key={layer}
              onClick={() => setActiveLayer(layer)}
              style={{ padding: '8px 15px', backgroundColor: activeLayer === layer ? 'var(--accent-emerald)' : '#FFF', color: activeLayer === layer ? '#FFF' : 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '10px', fontSize: '0.55rem', fontWeight: '950', transition: '0.3s' }}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Mountain size={20} color="var(--accent-emerald)" />
          <div>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>EĞİM ANALİZİ</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>%4.2 STABLE</div>
          </div>
        </div>
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Sun size={20} color="var(--accent-emerald)" />
          <div>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>GÜNEŞ VERİMİ</div>
            <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>9.8 kWh/m2</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Uzamsal Render: $$ V_{3D} = \\int \\int_{\\mathcal{A}} (Height \\cdot Texture) \\, dA \\oplus \\text{Ray}_{trace} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
