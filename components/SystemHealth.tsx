"use client";
import React from 'react';
import { Activity, ShieldAlert, Cpu, Globe } from 'lucide-react';

export const SystemHealth = () => {
  const metrics = [
    { label: 'CPU LOAD', val: '%12', icon: Cpu },
    { label: 'SİBER KALKAN', val: 'AKTİF', icon: ShieldAlert },
    { label: 'GLOBAL UPTIME', val: '%99.9', icon: Globe }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
        <Activity size={20} color="var(--accent-emerald)" className="animate-pulse" />
        <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>SYSTEM INTEGRITY</h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
              <m.icon size={16} /> {m.label}
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--text-primary)' }}>{m.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
