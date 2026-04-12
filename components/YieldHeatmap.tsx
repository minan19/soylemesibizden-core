"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, TrendingUp } from 'lucide-react';

export const YieldHeatmap = () => {
  // Pazar verilerini mühürleyelim
  const metrics = [
    { area: 'Lapseki Koridoru', vol: 'Yüksek', intensity: 0.92, roi: '+%214' },
    { area: 'Bodrum Sahil Hattı', vol: 'Orta', intensity: 0.78, roi: '+%156' },
    { area: 'Beylikdüzü Aksı', vol: 'Stabil', intensity: 0.65, roi: '+%88' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Flame size={18} /> YIELD HEATMAP RADAR
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Getiri Yoğunluğu Analizi</h3>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {metrics.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{item.area}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-secondary)', marginTop: '5px' }}>VOLATİLİTE: {item.vol}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{item.roi}</div>
                <div style={{ fontSize: '0.55rem', fontWeight: '900', color: 'var(--text-secondary)' }}>ÖNGÖRÜLEN GETİRİ</div>
              </div>
            </div>
            {/* Heat Bar */}
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '15px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${item.intensity * 100}%` }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, lineHeight: '1.6' }}>
          {"Getiri Yoğunluğu ($$D_y$$) algoritması, bölgedeki varlıkların ortalama ROI projeksiyonunu hesaplar."}
        </p>
      </div>
    </div>
  );
};
