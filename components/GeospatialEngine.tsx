"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation, Compass, Layers } from 'lucide-react';

export const GeospatialEngine = () => {
  const regions = [
    { name: 'Çanakkale / Köprü Hattı', roi: '+%214', status: 'High Growth' },
    { name: 'Muğla / Turizm Aksı', roi: '+%142', status: 'Liquid' },
    { name: 'İstanbul / Lojistik', roi: '+%88', status: 'Stable' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <MapIcon size={18} /> GEOSPATIAL YIELD ENGINE
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Mekansal Analiz</h3>
        </div>
        <div style={{ padding: '10px 20px', backgroundColor: 'var(--bg-primary)', borderRadius: '50px', border: '1px solid var(--border-color)', display: 'flex', gap: '15px', alignItems: 'center' }}>
          <Layers size={14} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>DİNAMİK KATMANLAR</span>
        </div>
      </header>

      <div style={{ height: '400px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div style={{ zIndex: 2, display: 'flex', gap: '30px' }}>
          {regions.map((region, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              style={{ padding: '25px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', width: '200px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
            >
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', marginBottom: '10px' }}>{region.status.toUpperCase()}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '15px' }}>{region.name}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--text-primary)' }}>{region.roi}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>
            <Navigation size={14} /> 2D GÖRÜNÜM
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>
            <Compass size={14} /> 3D TOPOLOJİ
          </button>
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
          {"Matematiksel Projeksiyon: $$ \Delta ROI = \int_{t_0}^{t_1} L_{flow}(x,y) \cdot I(x,y) dt $$"}
        </div>
      </div>
    </div>
  );
};
