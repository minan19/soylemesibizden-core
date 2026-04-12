"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Lock, Link as LinkIcon, Activity } from 'lucide-react';

export const SovereignRegistry = () => {
  const ledgerEntries = [
    { label: 'BLOCKCHAIN HASH', val: '0x71C...450', status: 'VERIFIED' },
    { label: 'TAPU SİCİLİ', val: 'KAT MÜLKİYETİ', status: 'ACTIVE' },
    { label: 'DOĞRULAMA NODLARI', val: '12 ACTIVE NODES', status: 'SYNCED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Database size={18} /> SOVEREIGN REGISTRY LEDGER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Kriptografik Mülkiyet Sicili</h3>
        </div>
        <Lock size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {ledgerEntries.map((entry, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{entry.label}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace' }}>{entry.val}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{entry.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Mülkiyet verileri SHA-256 algoritması ile mühürlenmiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Güvenlik: $$ H_{deed} = \\text{SHA-256}(\\text{Asset}_{id} + \\text{Owner}_{pub}) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
