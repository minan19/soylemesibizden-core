"use client";
import React from 'react';
import { Globe2, TrendingUp, Zap, ShieldCheck } from 'lucide-react';

export const InternationalRadar = () => {
  const globalShifts = [
    { region: 'DUBAI / MARINA', yield: '%8.4', status: 'OVERHEATED', color: '#E74C3C' },
    { region: 'ISTANBUL / BOSPHORUS', yield: '%14.2', status: 'UNDERNALYZED', color: '#1ABC9C' },
    { region: 'LONDON / MAYFAIR', yield: '%4.1', status: 'STABLE', color: '#3498DB' }
  ];

  return (
    <div style={{ marginTop: '40px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px' }}>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1ABC9C', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Globe2 size={20} /> INTERNATIONAL RESEARCH
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: '950', marginTop: '10px' }}>Küresel Fırsat Radarı</h3>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {globalShifts.map((g, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px', marginBottom: '8px' }}>{g.region}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '950', color: '#0A0A0A' }}>{g.yield} <span style={{ fontSize: '0.7rem', color: '#AAA' }}>ROI</span></div>
            <div style={{ marginTop: '15px', fontSize: '0.6rem', fontWeight: '950', color: g.color, letterSpacing: '1px' }}>STATUS: {g.status}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F4FBF9', borderLeft: '3px solid #1ABC9C' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2D6A4F' }}>
          <strong>Stratejik Not:</strong> Uluslararası sermaye akışı, Türkiye'deki tescilli varlıklara doğru %12'lik bir kayma göstermektedir. Bu, "SÖYLEMESİ BİZDEN" portföyü için yüksek likidite anlamına gelir.
        </p>
      </div>
    </div>
  );
};
