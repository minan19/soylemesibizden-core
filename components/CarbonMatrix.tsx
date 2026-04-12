"use client";
import React from 'react';
import { Leaf, Award } from 'lucide-react';

export const CarbonMatrix = () => {
  const metrics = [
    { label: 'KARBON SALINIMI', val: '2.4 tCO2e', status: 'LOW' },
    { label: 'ENERJİ VERİMLİLİĞİ', val: 'A++', status: 'OPTIMAL' },
    { label: 'OFSET POTANSİYELİ', val: '₺ 14.2M', status: 'HIGH' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Leaf size={18} /> CARBON INTELLIGENCE
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Ekolojik Varlık Zekası</h3>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px' }}>{m.label}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{m.val}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          { "Karbon Nötr Endeksi: C_ni = (E_saved / E_total) * alpha_carbon > 0.85 olarak mühürlenmiştir." }
        </p>
      </div>
    </div>
  );
};
