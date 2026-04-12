"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, ShieldAlert, TrendingUp, Info } from 'lucide-react';

export const IntelAlerts = () => {
  const alerts = [
    { id: 1, type: 'STRATEGIC', msg: 'Çanakkale Köprü Hattı: Yeni imar izni onaylandı.', impact: 9.4, color: '#1ABC9C' },
    { id: 2, type: 'LEGAL', msg: 'Varlık #E21: Hukuki temizlik süreci tamamlandı.', impact: 8.8, color: '#D4AF37' },
    { id: 3, type: 'MARKET', msg: 'Muğla Bölgesi: Likidite hacminde %12 artış.', impact: 7.2, color: '#1ABC9C' }
  ];

  return (
    <div style={{ padding: '30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bell size={20} color="var(--accent-emerald)" className="animate-bounce" />
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>LIVE INTEL FEED</h4>
        </div>
        <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>REAL-TIME ACTIVE</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '0.55rem', fontWeight: '950', color: alert.color, letterSpacing: '1px' }}>{alert.type}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>{alert.msg}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--text-primary)' }}>{alert.impact}</div>
                <div style={{ fontSize: '0.5rem', fontWeight: '950', color: 'var(--text-secondary)' }}>IMPACT</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
