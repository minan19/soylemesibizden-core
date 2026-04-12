"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Lock, Globe, Fingerprint, Activity } from 'lucide-react';

export const SovereignRegistryV2 = () => {
  const transactions = [
    { type: 'GENESIS_TRANSFER', date: '2026.01.12', hash: '0x3A2...9F1', status: 'IMPENDING' },
    { type: 'SOVEREIGN_MINT', date: '2026.04.12', hash: '0x8B4...E22', status: 'SEALED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Fingerprint size={18} /> SOVEREIGN REGISTRY v2
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Kriptografik Mülkiyet Defteri</h3>
        </div>
        <Lock size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {transactions.map((tx, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px' }}>
                <Database size={16} color="var(--text-secondary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: '950' }}>{tx.type}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '700' }}>{tx.date} • {tx.hash}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.6rem', fontWeight: '950', color: tx.status === 'SEALED' ? 'var(--accent-emerald)' : 'var(--text-primary)' }}>{tx.status}</span>
              <ShieldCheck size={14} color={tx.status === 'SEALED' ? 'var(--accent-emerald)' : 'var(--border-color)'} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>BLOCKCHAIN SYNC: 12 NODES ACTIVE</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Mülkiyet Bütünlüğü: $$ H_{deed} = \\text{SHA-256}(\\text{Registry} \\oplus \\text{Asset}_{id}) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
