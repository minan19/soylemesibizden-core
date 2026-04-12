"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Lock, Zap, Eye, Globe, Radio } from 'lucide-react';

export const SovereignSecurityOps = () => {
  const threats = [
    { source: 'SİNYAL ANALİZİ', status: 'GÜVENLİ', level: '0.01%' },
    { source: 'ŞİFRELEME GÜCÜ', status: 'AES-512', level: 'ULTRA' },
    { source: 'ERİŞİM KONTROLÜ', status: 'MÜHÜRLÜ', level: '12 NODES' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <ShieldAlert size={18} /> SOVEREIGN SECURITY OPS
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Tehdit İstihbarat Izgarası</h3>
        </div>
        <Radio size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {threats.map((t, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Lock size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{t.source}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{t.status}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{t.level}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Zap size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Sistem anlık siber saldırı sönümleme (DDoS mitigation) modundadır.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Savunma Gücü: $$ S_{ops} = \\int_{t} (D_{threat} \\cdot \\alpha_{defense}) \\, dt $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
