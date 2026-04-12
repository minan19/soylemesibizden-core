"use client";
import React from 'react';
import { ShieldCheck, Lock, Globe, Zap } from 'lucide-react';

export const ThreatLog = () => {
  const logs = [
    { origin: '192.168.x.x', type: 'SQL INJECTION', status: 'BLOCKED', time: '12s ago' },
    { origin: '45.12.x.x', type: 'BRUTE FORCE', status: 'MITIGATED', time: '4m ago' },
    { origin: 'UNKNOWN', type: 'ENCRYPTION SYNC', status: 'VERIFIED', time: '12m ago' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '25px', color: 'var(--text-secondary)' }}>LIVE DEFENSE LOGS</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {logs.map((log, i) => (
          <div key={i} style={{ padding: '15px 20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)', marginBottom: '4px' }}>{log.type}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>{log.origin}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-primary)' }}>{log.status}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{log.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
