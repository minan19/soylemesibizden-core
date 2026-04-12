"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Key, EyeOff, Lock } from 'lucide-react';

export const SecuritySuite = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Fingerprint size={18} /> SOVEREIGN IDENTITY SUITE
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Kimlik Zırhı</h3>
        </div>
        <div style={{ padding: '8px 16px', backgroundColor: 'rgba(26,188,156,0.1)', borderRadius: '4px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.65rem' }}>
          TIER-0: SOVEREIGN
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Key size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>ÖZEL ANAHTAR (PRIVATE KEY)</span>
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
            {"0xMustafaInan_2026_••••_••••_8842"}
          </div>
        </div>
        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <EyeOff size={16} color="var(--accent-emerald)" />
            <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>GÖRÜNMEZLİK DURUMU</span>
          </div>
          <div style={{ fontSize: '1rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>AKTİF (DARK POOL)</div>
        </div>
      </div>

      <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Kriptografik Protokol: $$ E_{cipher} = (M^e) \\pmod{n} $$ denklemi uyarınca her işlem mühürlenir."}
        </p>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <ShieldCheck size={18} /> GÜVENLİK PARAMETRELERİNİ GÜNCELLE
      </button>
    </div>
  );
};
