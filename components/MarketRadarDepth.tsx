"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity, ArrowUpRight, Zap } from 'lucide-react';

export const MarketRadarDepth = () => {
  const analytics = [
    { area: 'Çanakkale / Lapseki', growth: '+%214', liquidity: 'Extreme', volatility: 'Low' },
    { area: 'Muğla / Bodrum', growth: '+%156', liquidity: 'High', volatility: 'Medium' },
    { area: 'İstanbul / Beylikdüzü', growth: '+%88', liquidity: 'Ultra', volatility: 'Stable' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Activity size={18} /> MARKET RADAR DEPTH
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Piyasa Momentum Analizi</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>REAL-TIME DATA</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>● SYNCED</div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {analytics.map((item, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950', color: 'var(--text-primary)' }}>{item.area}</div>
                <div style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>LIKIDITE: {item.liquidity}</span>
                  <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>VOLATILITE: {item.volatility}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '-1px' }}>{item.growth}</div>
                <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>YILLIK ARTIŞ</div>
              </div>
            </div>
            {/* Visual Momentum Indicator */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: i * 0.2 }}
              style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', backgroundColor: 'var(--accent-emerald)', opacity: 0.3 }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0, lineHeight: '1.5' }}>
          {"Trend Analizi: $$ P_{trend} = \int_{t_0}^{t_1} \frac{\partial Value}{\partial t} dt + \alpha(Momentum) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
