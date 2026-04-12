"use client";
import React from 'react';
import { Zap, TrendingUp, BarChart, RefreshCw } from 'lucide-react';

export const WealthAlchemist = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Zap size={18} /> WEALTH OPTIMIZER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>AI Simyacı</h3>
        </div>
      </header>

      <div style={{ padding: '30px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px' }}>ÖNERİLEN STRATEJİ</div>
        <div style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--text-primary)' }}>Maksimum Likidite</div>
      </div>

      <button style={{ width: '100%', padding: '20px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <RefreshCw size={18} /> PORTFÖYÜ OPTİMİZE ET
      </button>
    </div>
  );
};
