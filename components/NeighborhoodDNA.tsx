"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map, ShieldCheck, TrendingUp, Landmark, Coffee } from 'lucide-react';

export const NeighborhoodDNA = () => {
  const metrics = [
    { label: 'ELITE PROXIMITY', val: '9.4/10', icon: Landmark },
    { label: 'SECURITY INDEX', val: '98%', icon: ShieldCheck },
    { label: 'APPRECIATION VELOCITY', val: '+12.4%', icon: TrendingUp }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Map size={18} /> NEIGHBORHOOD DNA
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Konumsal Gen Haritası</h3>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <m.icon size={20} color="var(--accent-emerald)" style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{m.label}</div>
            <div style={{ fontSize: '1rem', fontWeight: '950' }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '800', marginBottom: '10px' }}>SOCIAL SENTIMENT</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Lüks Restoranlar', 'Yat Limanı', 'Golf Sahası'].map((tag, i) => (
            <span key={i} style={{ padding: '4px 12px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '50px', fontSize: '0.6rem', fontWeight: '900' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
