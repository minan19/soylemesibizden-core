"use client";
import React from 'react';
import { Terminal, Key, ShieldCheck, Activity, Code } from 'lucide-react';

export const SovereignAPI = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Terminal size={18} /> SOVEREIGN API GATEWAY
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Geliştirici Erişimi</h3>
        </div>
        <div style={{ padding: '6px 12px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950' }}>V1.0 PROXY</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px' }}>API KEY (PRODUCTION)</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <code style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '700' }}>sk_live_mustafa_******************</code>
            <Key size={16} color="var(--accent-emerald)" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>GET /v1/market/pulse</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '900', marginTop: '5px' }}>200 OK</div>
          </div>
          <div style={{ padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>GET /v1/asset/iq</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '900', marginTop: '5px' }}>200 OK</div>
          </div>
        </div>
      </div>

      <button style={{ width: '100%', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <Code size={18} /> DOKÜMANTASYONU GÖRÜNTÜLE
      </button>
    </div>
  );
};
