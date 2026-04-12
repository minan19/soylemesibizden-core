"use client";
import React from 'react';
import { BrainCircuit, TrendingUp, ArrowRight, Info } from 'lucide-react';

export const PredictiveEngine = () => {
  const forecastData = [
    { year: '2027', value: '₺ 102M', roi: '+%12' },
    { year: '2028', value: '₺ 118M', roi: '+%15' },
    { year: '2030', value: '₺ 154M', roi: '+%22' }
  ];

  return (
    <div style={{ marginTop: '40px', padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <BrainCircuit size={24} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1rem', fontWeight: '950' }}>AI Wealth Predictor</h3>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        {forecastData.map((d, i) => (
          <div key={i} style={{ flex: 1, padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{d.year}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '950' }}>{d.value}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          { "Analiz Modeli: V_future = V_current * (1 + r)^n formülasyonu üzerine, bölge imar endeksleri entegre edilmiştir." }
        </p>
      </div>
    </div>
  );
};
