"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe2, Award, Zap, ShieldCheck, Mail, Share2, Star } from 'lucide-react';

export const SovereignIdentity = () => {
  const brandMetrics = [
    { label: 'MARKA OTORİTESİ', val: 'ELITE_AA+', icon: Award },
    { label: 'KÜRESEL ERİŞİM', val: '142 NOD', icon: Globe2 },
    { label: 'GÜVEN ENDEKSİ', val: '%99.9', icon: Star }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Star size={18} /> SOVEREIGN IDENTITY HUB
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Marka Otoritesi</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Share2 size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {brandMetrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <m.icon size={16} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{m.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{m.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>BRAND_EQUITY_LOCKED</span>
        </div>
        <Zap size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"İtibar Formülü: $$ I_{brand} = \\sum_{i=1}^{n} (Authority_{i} \\times \\text{Global}_{reach}) \\oplus \\text{Trust}_{index} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
