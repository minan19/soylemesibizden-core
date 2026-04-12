"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';

export const AssetFlow = () => {
  const flows = [
    { origin: 'Avrupa Birliği', target: 'Çanakkale / Enerji', amount: '€ 140M', trend: '+12%' },
    { origin: 'Körfez Bölgesi', target: 'Muğla / Turizm', amount: '$ 280M', trend: '+18%' },
    { origin: 'Asya Pasifik', target: 'İstanbul / Tech', amount: '$ 410M', trend: '+24%' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Globe size={18} /> CAPITAL FLOW INTELLIGENCE
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Sermaye Akış Trafiği</h3>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {flows.map((flow, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ padding: '12px', backgroundColor: 'rgba(26,188,156,0.1)', borderRadius: '50%' }}>
                <TrendingUp size={20} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{flow.origin} → {flow.target}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--text-primary)' }}>{flow.amount}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.9rem' }}>
                {flow.trend} <ArrowUpRight size={16} />
              </div>
              <div style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-secondary)' }}>MOMENTUM</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.6', margin: 0 }}>
          {"Sermaye Hız Formülü: $$V_{flow} = \\frac{\\Delta Capital}{\\Delta Time} \\cdot \\alpha_{interest}$$ denklemi uyarınca, piyasa likiditesi anlık mühürlenmektedir."}
        </p>
      </div>
    </div>
  );
};
