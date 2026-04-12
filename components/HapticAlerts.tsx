"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Zap, Activity, ShieldCheck, Wifi } from 'lucide-react';

export const HapticAlerts = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  const alerts = [
    { type: 'MARKET', msg: 'Çanakkale Aksı Likidite Artışı', time: '2dk önce' },
    { type: 'SECURITY', msg: 'Registry Mühürü Doğrulandı', time: 'Anlık' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Bell size={18} /> HAPTIC RESONANCE ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Anlık Rezonans Akışı</h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
           <motion.div 
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} 
           />
           <Wifi size={18} color="var(--text-secondary)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {alerts.map((alert, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 10 }}
            style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}
          >
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: alert.type === 'MARKET' ? 'var(--accent-emerald)' : 'var(--text-primary)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '900' }}>{alert.msg}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '700', marginTop: '4px' }}>{alert.time}</div>
            </div>
            <Zap size={14} color="var(--border-color)" />
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '800', margin: 0 }}>
          HAPTIC FEEDBACK: ACTIVE ON APPLE ECOSYSTEM
        </p>
      </div>
    </div>
  );
};
