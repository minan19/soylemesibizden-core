"use client";
import React from 'react';
import { BarChart3, Globe, ShieldAlert, Award } from 'lucide-react';

export const ExecutiveBriefing = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '30px' }}>EXECUTIVE INTELLIGENCE BRIEF</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Globe size={20} color="var(--accent-emerald)" style={{ marginBottom: '15px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: '950' }}>Tier-1</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '900', marginTop: '5px' }}>GLOBAL KREDİBİLİTE</div>
          </div>
          <div style={{ flex: 1, padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <Award size={20} color="var(--accent-emerald)" style={{ marginBottom: '15px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: '950' }}>AAA+</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '900', marginTop: '5px' }}>GÜVEN ENDEKSİ</div>
          </div>
        </div>

        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', borderLeft: '5px solid var(--accent-emerald)' }}>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.7', color: 'var(--text-primary)', fontWeight: '600', fontStyle: 'italic', margin: 0 }}>
            "Mevcut analizler, Marmara ve Ege hattındaki hibrit listeleme stratejisinin, sermaye likiditesini 2026 Q3 döneminde %28 oranında artıracağını öngörmektedir."
          </p>
        </div>
      </div>
    </div>
  );
};
