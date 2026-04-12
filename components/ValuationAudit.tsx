"use client";
import React from 'react';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

export const ValuationAudit = ({ asset }: any) => {
  const auditData = [
    { label: 'ALGORİTMİK DEĞER', value: '₺ 82.4M', diff: '+%3.1', trend: 'Stabil' },
    { label: 'BÖLGE ORTALAMASI', value: '₺ 78.0M', diff: '-%8.2', trend: 'Yükseliş' },
    { label: 'EMSAL ANALİZİ', value: '₺ 84.1M', diff: '+%1.1', trend: 'Yatay' }
  ];

  return (
    <div style={{ marginTop: '60px', backgroundColor: '#FDFDFD', border: '1px solid #EEE', borderRadius: '12px', padding: '40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
        <BarChart3 size={22} color="#1ABC9C" />
        <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '3px', color: '#0A0A0A' }}>VALUATION AUDIT LOG</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#EEE' }}>
        {auditData.map((item, i) => (
          <div key={i} style={{ backgroundColor: '#FFF', padding: '30px' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '15px' }}>{item.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '950', color: '#0A0A0A', marginBottom: '10px' }}>{item.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: item.diff.startsWith('+') ? '#E74C3C' : '#1ABC9C' }}>{item.diff}</span>
              <span style={{ fontSize: '0.65rem', fontWeight: '700', color: '#BBB' }}>{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', borderLeft: '3px solid #1ABC9C', backgroundColor: '#F8FBFB' }}>
        <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', fontWeight: '500' }}>
          <strong style={{ color: '#0A0A0A' }}>Sovereign Kararı:</strong> Bu varlık, bölgedeki arz kıtlığı ve tescilli statüsü nedeniyle 24 aylık periyotta %18.2 değer artış potansiyeli taşımaktadır.
        </p>
      </div>
    </div>
  );
};
