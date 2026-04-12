"use client";
import React from 'react';

export const AnalysisMatrix = ({ isOpen, onClose, items }: any) => {
  if (!isOpen || !items || items.length === 0) return null;

  const winner = items.reduce((prev: any, current: any) => {
    const prevIq = parseFloat(prev?.iq || 0);
    const currIq = parseFloat(current?.iq || 0);
    return prevIq > currIq ? prev : current;
  }, items[0]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#FDFDFD', zIndex: 2000, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '60px 5vw', flex: 1 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '30px' }}>
          <div>
            <span style={{ fontSize: '0.6rem', color: '#D4AF37', letterSpacing: '4px', fontWeight: '800' }}>STRATEGIC INTELLIGENCE REPORT</span>
            <h2 style={{ fontSize: '2.8rem', fontFamily: '"Playfair Display", serif', marginTop: '10px', lineHeight: '1' }}>Yatırım <span style={{ fontStyle: 'italic' }}>Analizi</span></h2>
          </div>
          <button onClick={onClose} style={{ background: '#0A0A0A', color: '#FFF', border: 'none', padding: '12px 30px', cursor: 'pointer', fontSize: '0.65rem', letterSpacing: '2px', fontWeight: '700' }}>[ KAPAT ]</button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: '40px', marginBottom: '60px' }}>
          {items.map((item: any) => (
            <div key={item.id} style={{ backgroundColor: item?.id === winner?.id ? 'rgba(214,175,55,0.03)' : 'transparent', padding: '30px', border: item?.id === winner?.id ? '1px solid rgba(214,175,55,0.2)' : '1px solid transparent', transition: 'all 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <span style={{ color: '#D4AF37', fontSize: '0.8rem', fontWeight: '900' }}>00{item.id}</span>
                {item?.id === winner?.id && <span style={{ fontSize: '0.55rem', color: '#0A0A0A', backgroundColor: '#D4AF37', padding: '3px 10px', fontWeight: '900', letterSpacing: '1px' }}>ÖNERİLEN</span>}
              </div>
              <h3 style={{ fontSize: '1.6rem', fontFamily: '"Playfair Display", serif', marginBottom: '30px', minHeight: '3.6rem' }}>{item.title}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ borderBottom: '1px solid #EEE', paddingBottom: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.55rem', opacity: 0.4, letterSpacing: '1px', marginBottom: '5px' }}>ASSET IQ SCORE</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '600', color: '#D4AF37' }}>{item.iq}</span>
                </div>
                <div style={{ borderBottom: '1px solid #EEE', paddingBottom: '12px' }}>
                  <span style={{ display: 'block', fontSize: '0.55rem', opacity: 0.4, letterSpacing: '1px', marginBottom: '5px' }}>MARKET TREND</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{item.trend}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0A0A0A', color: '#FFF', padding: '50px 60px', borderRadius: '2px', display: 'flex', gap: '60px', alignItems: 'center' }}>
          <div style={{ flex: 2 }}>
            <span style={{ color: '#D4AF37', fontSize: '0.6rem', letterSpacing: '4px', fontWeight: '800' }}>EXECUTIVE RECOMMENDATION</span>
            <h4 style={{ fontSize: '1.9rem', fontFamily: '"Playfair Display", serif', margin: '20px 0', lineHeight: '1.4' }}>
              Terminal, stratejik değerleme sonucunda <span style={{ color: '#D4AF37' }}>{winner?.title}</span> için "Al" pozisyonunu teyit eder.
            </h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: '1.6', fontWeight: '300' }}>
              Bu mülk, IQ skoru ({winner?.iq}) ve likidite projeksiyonu baz alındığında sermaye verimliliği en yüksek varlıktır. <strong>Söylemesi bizden</strong>; bu yatırım optimize edilmiş bir güvenli limandır.
            </p>
          </div>
          <div style={{ flex: 1, textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '40px' }}>
             <button style={{ backgroundColor: '#D4AF37', color: '#0A0A0A', border: 'none', padding: '18px 30px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', cursor: 'pointer', width: '100%' }}>
               REPORT DOWNLOAD (PDF)
             </button>
          </div>
        </div>
      </div>
      <div style={{ width: '100%', height: '5px', backgroundColor: '#D4AF37' }}></div>
    </div>
  );
};
