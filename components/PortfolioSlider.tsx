"use client";
import React from 'react';

export const PortfolioSlider = ({ properties, onAddToCompare, onViewDetails }: any) => {
  if (properties.length === 0) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center', opacity: 0.3 }}>
        <span style={{ fontSize: '0.7rem', letterSpacing: '4px', fontWeight: '800' }}>NO STRATEGIC ASSETS FOUND</span>
        <p style={{ fontFamily: '"Playfair Display", serif', marginTop: '10px', fontSize: '1.2rem' }}>Terminal veritabanında bu kritere uygun varlık bulunamadı.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px 80px', width: '100%' }}>
      {properties.map((p: any) => (
        <div 
          key={p.id} 
          onClick={() => onAddToCompare(p)} 
          style={{ cursor: 'pointer', borderLeft: '1px solid rgba(214, 175, 55, 0.2)', paddingLeft: '35px', transition: 'all 0.4s ease', position: 'relative' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ color: '#D4AF37', fontSize: '0.65rem', fontWeight: '900' }}>00{p.id}</span>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#27ae60', fontSize: '0.5rem', fontWeight: '700' }}>{p.trend} VOL.</span>
              <span style={{ opacity: 0.3, color: '#0A0A0A', fontSize: '0.5rem', fontWeight: '700' }}>IQ {p.iq}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onViewDetails(p); }} 
                style={{ background: '#0A0A0A', color: '#D4AF37', border: '1px solid rgba(214,175,55,0.3)', padding: '6px 12px', fontSize: '0.45rem', fontWeight: '800', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.3s' }}
              >
                [ 360° VIEW ]
              </button>
            </div>
          </div>
          <h3 style={{ fontSize: '2.4rem', margin: '0 0 15px 0', fontFamily: '"Playfair Display", serif', fontWeight: '400', lineHeight: '1.1' }}>{p.title}</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: '300', opacity: 0.5 }}>{p.price}</p>
        </div>
      ))}
    </div>
  );
};
