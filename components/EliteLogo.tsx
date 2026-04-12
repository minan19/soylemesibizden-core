import React from 'react';
export const EliteLogo = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', cursor: 'pointer' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ width: '32px', height: '32px', backgroundColor: '#0A0A0A', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', flexShrink: 0 }}>
        <span style={{ color: '#D4AF37', fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', fontWeight: '700', marginTop: '-1px' }}>S</span>
      </div>
      <h1 style={{ fontSize: '2rem', fontFamily: '"Playfair Display", serif', fontWeight: '400', color: '#0A0A0A', margin: 0, letterSpacing: '-0.8px', display: 'flex', alignItems: 'baseline' }}>
        Söylemesi<span style={{ color: '#D4AF37', fontStyle: 'italic', marginLeft: '8px', fontSize: '1.9rem' }}>Bizden</span>
      </h1>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ height: '0.5px', width: '35px', backgroundColor: '#D4AF37', opacity: 0.5 }}></div>
      <p style={{ fontSize: '0.55rem', letterSpacing: '5px', opacity: 0.4, margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Strategic Asset Advisory</p>
    </div>
  </div>
);
