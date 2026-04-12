"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages, ShieldCheck, Zap, ArrowRightLeft } from 'lucide-react';

export const GlobalBridge = () => {
  const languages = [
    { code: 'TR', name: 'TURKISH', status: 'NATIVE', accuracy: '100%' },
    { code: 'EN', name: 'ENGLISH', status: 'ELITE', accuracy: '100%' },
    { code: 'AR', name: 'ARABIC', status: 'CORPORATE', accuracy: '100%' },
    { code: 'RU', name: 'RUSSIAN', status: 'STRATEGIC', accuracy: '100%' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Languages size={18} /> SOVEREIGN GLOBAL BRIDGE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Zeka Izgarası</h3>
        </div>
        <Globe size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
        {languages.map((lang, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '950' }}>{lang.code}</span>
              <ShieldCheck size={14} color="var(--accent-emerald)" />
            </div>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{lang.status}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>ACCURACY: {lang.accuracy}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <ArrowRightLeft size={20} color="var(--text-secondary)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Bağlamsal zeka, terminoloji hatalarını %0 limitinde mühürlemiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Dil Algoritması: $$ L_{bridge} = \\lim_{\\epsilon \\to 0} (\\text{Context}_{err}) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
