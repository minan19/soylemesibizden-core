"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, ShieldCheck, Server } from 'lucide-react';

export const HealthMonitor = () => {
  const stats = [
    { label: 'SYSTEM UPTIME', val: '99.99%', icon: ShieldCheck, color: 'var(--accent-emerald)' },
    { label: 'API LATENCY', val: '14ms', icon: Zap, color: 'var(--accent-emerald)' },
    { label: 'AI ENGINE LOAD', val: '%12', icon: Cpu, color: 'var(--text-primary)' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Activity size={18} /> EXECUTIVE HEALTH MONITOR
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Sistem Sağlık Matrisi</h3>
        </div>
        <Server size={22} color="var(--text-secondary)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <stat.icon size={18} color={stat.color} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{stat.label}</span>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '950', color: stat.color }}>{stat.val}</span>
          </div>
        ))}
      </div>

      <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [15, 30, 10, 25, 15] }}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
            style={{ flex: 1, backgroundColor: 'var(--accent-emerald)', borderRadius: '2px', opacity: 0.3 }}
          />
        ))}
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Sağlık Formülü: $$ H_{sys} = \\frac{1}{n} \\sum (\\text{Uptime}_i - \\text{Latency}_i) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
