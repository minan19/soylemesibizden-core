"use client";
import React from 'react';
import { Target, TrendingUp, ShieldCheck, Wallet } from 'lucide-react';

export const InvestmentProfiler = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Target size={20} /> INVESTOR DNA ANALYSIS
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px' }}>Yatırımcı Profilleme</h3>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>STRATEJİK ODAK</label>
          <select style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '800', outline: 'none' }}>
            <option>Maksimum ROI (Yüksek Risk)</option>
            <option>Sürdürülebilir Karbon Ofseti</option>
            <option>Uzun Vadeli Varlık Koruma</option>
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>SERMAYE ÖLÇEĞİ</label>
          <select style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '800', outline: 'none' }}>
            <option>₺ 10M - 50M</option>
            <option>₺ 50M - 250M</option>
            <option>₺ 250M+</option>
          </select>
        </div>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer' }}>
        PROFİLİ MÜHÜRLE VE ANALİZE BAŞLA
      </button>
    </div>
  );
};
