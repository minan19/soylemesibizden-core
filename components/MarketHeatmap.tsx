"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Globe, Layers } from 'lucide-react';

export const MarketHeatmap = () => {
  const hotspots = [
    { region: 'Çanakkale / Lapseki', intensity: 92, trend: 'Extreme' },
    { region: 'Muğla / Bodrum Aksı', intensity: 78, trend: 'High' },
    { region: 'İstanbul / Batı Hattı', intensity: 65, trend: 'Stable' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Flame size={18} /> PREDICTIVE HEATMAP
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Pazar Isı Haritası</h3>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {hotspots.map((spot, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-primary)' }}>{spot.region}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)', marginTop: '5px' }}>{spot.trend.toUpperCase()} MOMENTUM</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '950' }}>{spot.intensity}%</div>
                <div style={{ fontSize: '0.55rem', fontWeight: '900', color: 'var(--text-secondary)' }}>YOĞUNLUK SKORU</div>
              </div>
            </div>
            {/* Heat Bar */}
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '15px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${spot.intensity}%` }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          { "Pazar Tahmini: $$ T_{market} = \\lim_{\\Delta t \\to 0} \\frac{\\partial Capital}{\\partial Region} $$ mühürlenmiştir." }
        </p>
      </div>
    </div>
  );
};
