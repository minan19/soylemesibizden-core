"use client";
import React from 'react';
import { Terminal, Key, Cpu, Zap, Copy } from 'lucide-react';

export const ApiGateway = () => {
  const endpoints = [
    { method: 'GET', path: '/v1/intelligence/asset/{id}', status: 'Active' },
    { method: 'POST', path: '/v1/ledger/seal', status: 'Active' },
    { method: 'GET', path: '/v1/market/heatmap', status: 'Maintenance' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Cpu size={18} /> SOVEREIGN API GATEWAY
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Geliştirici Terminali</h3>
        </div>
      </header>

      <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '15px' }}>AKTİF API ANAHTARI (PRODUCTION)</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-secondary)', padding: '15px', borderRadius: '8px', border: '1px dashed var(--accent-emerald)' }}>
          <code style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>sk_sovereign_2026_••••••••••••••••</code>
          <Copy size={16} color="var(--accent-emerald)" style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {endpoints.map((ep, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', backgroundColor: 'rgba(26,188,156,0.1)', padding: '4px 8px', borderRadius: '4px' }}>{ep.method}</span>
              <code style={{ fontSize: '0.75rem', fontWeight: '700' }}>{ep.path}</code>
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: '950', color: ep.status === 'Active' ? 'var(--accent-emerald)' : 'var(--text-secondary)' }}>{ep.status.toUpperCase()}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Performans Metriği: $$T_{latency} < 12ms$$ ve $$Uptime > 99.99\%$$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
