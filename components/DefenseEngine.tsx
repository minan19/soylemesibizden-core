"use client";
import React from 'react';
import { ShieldCheck, Lock, Activity, Cpu, ShieldAlert } from 'lucide-react';

export const DefenseEngine = () => {
  return (
    <div style={{ marginTop: '40px', padding: '50px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ShieldCheck size={28} color="#1ABC9C" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: '950', letterSpacing: '-0.5px' }}>Sovereign Defense Engine</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '10px', height: '100%', backgroundColor: '#1ABC9C', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px' }}>SYSTEM SECURE</span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', marginBottom: '40px' }}>
        <div style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
          <Lock size={20} color="#AAA" style={{ marginBottom: '15px' }} />
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px' }}>ENCRYPTION STANDARD</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '950', marginTop: '5px' }}>$$AES-256$$</div>
        </div>
        <div style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
          <Cpu size={20} color="#AAA" style={{ marginBottom: '15px' }} />
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px' }}>AUTH PROTOCOL</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '950', marginTop: '5px' }}>$$RSA-4096$$</div>
        </div>
        <div style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
          <Activity size={20} color="#AAA" style={{ marginBottom: '15px' }} />
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px' }}>THREAT MITIGATION</div>
          <div style={{ fontSize: '1.2rem', fontWeight: '950', marginTop: '5px', color: '#1ABC9C' }}>ACTIVE</div>
        </div>
      </div>

      <div style={{ padding: '25px', backgroundColor: '#FDFDFD', border: '1px solid #F5F5F5', borderRadius: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <ShieldAlert size={16} color="#AAA" />
          <span style={{ fontSize: '0.7rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px' }}>DEFENSE LOGS</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6', fontWeight: '500', fontFamily: 'monospace' }}>
          [INFO] Sovereign ID Verification Cycle: Complete <br />
          [INFO] Database Sharding Integrity Check: 100% Valid <br />
          [WARN] Low-level probing detected from IP: 192.168.x.x - Mitigated.
        </p>
      </div>
    </div>
  );
};
