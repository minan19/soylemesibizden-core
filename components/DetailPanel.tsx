"use client";
import React, { useState } from 'react';
import { jsPDF } from "jspdf";

export const DetailPanel = ({ isOpen, onClose, property, onAddToCompare }: any) => {
  const [show360, setShow360] = useState(false);
  if (!isOpen || !property.title) return null;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(10, 15, 20);
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(22);
    doc.text("SOYLEMESI BIZDEN", 20, 25);
    doc.save(`Analiz_${property.id}.pdf`);
  };

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '620px', height: '100%', backgroundColor: '#FFF', zIndex: 10000, padding: '40px', boxShadow: '-30px 0 80px rgba(0,0,0,0.2)', overflowY: 'auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px' }}>
        <button onClick={() => { setShow360(false); onClose(); }} style={{ background: 'none', border: '1px solid #000', padding: '10px 20px', cursor: 'pointer', fontWeight: '900', fontSize: '0.6rem' }}>[ KAPAT ]</button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => onAddToCompare(property)} style={{ background: 'none', border: '1px solid #D4AF37', color: '#D4AF37', padding: '10px 20px', fontWeight: '900', fontSize: '0.6rem' }}>+ KIYASLA</button>
          <button onClick={generatePDF} style={{ background: '#0A0A0A', color: '#D4AF37', border: 'none', padding: '10px 20px', fontWeight: '900', fontSize: '0.6rem' }}>RAPOR AL</button>
        </div>
      </header>

      <h2 style={{ fontSize: '3.5rem', fontFamily: 'serif', lineHeight: '1', marginBottom: '10px' }}>{property.title}</h2>
      <div style={{ fontSize: '0.7rem', color: '#D4AF37', fontWeight: '900', letterSpacing: '3px', marginBottom: '40px' }}>IQ SCORE: {property.iq} / 160</div>

      <div style={{ width: '100%', height: '320px', backgroundColor: '#050505', position: 'relative', marginBottom: '40px', border: '1px solid #EEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {!show360 ? (
          <div style={{ textAlign: 'center' }}>
            <div className="pulse-ring"></div>
            <button onClick={() => setShow360(true)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px 35px', fontWeight: '900', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px', zIndex: 5, position: 'relative' }}>360° SENSORY ANALİZİ BAŞLAT</button>
            <p style={{ color: 'rgba(214,175,55,0.4)', fontSize: '0.5rem', marginTop: '15px', fontWeight: '800' }}>[ PROJE VE RESİM TABANLI GES MODÜLÜ AKTİF ]</p>
          </div>
        ) : (
          <iframe src={`https://render-api.com/360-sim-placeholder?id=${property.id}`} style={{ width: '100%', height: '100%', border: 'none' }} />
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#F8F8F8', padding: '25px', borderLeft: '5px solid #D4AF37' }}>
          <span style={{ fontSize: '0.5rem', opacity: 0.5, fontWeight: '900' }}>VALUASYON</span>
          <div style={{ fontSize: '1.4rem', fontWeight: '700', marginTop: '10px' }}>{property.price}</div>
        </div>
        <div style={{ background: '#F8F8F8', padding: '25px', borderLeft: '5px solid #000' }}>
          <span style={{ fontSize: '0.5rem', opacity: 0.5, fontWeight: '900' }}>BÖLGE</span>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', marginTop: '10px' }}>{property.district.toUpperCase()}</div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #EEE', paddingTop: '30px' }}>
        <h4 style={{ fontSize: '0.65rem', fontWeight: '900', letterSpacing: '3px', color: '#AAA', marginBottom: '20px' }}>TEKNİK İSTİHBARAT</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <div><div style={{ fontSize: '0.5rem', opacity: 0.5 }}>EĞİM</div><div style={{ fontSize: '0.8rem', fontWeight: '700' }}>%12.4 (True-3D)</div></div>
          <div><div style={{ fontSize: '0.5rem', opacity: 0.5 }}>RAKIM</div><div style={{ fontSize: '0.8rem', fontWeight: '700' }}>145m</div></div>
          <div><div style={{ fontSize: '0.5rem', opacity: 0.5 }}>LOJİSTİK</div><div style={{ fontSize: '0.8rem', fontWeight: '700' }}>850m (Otoyol)</div></div>
          <div><div style={{ fontSize: '0.5rem', opacity: 0.5 }}>KITLIK</div><div style={{ fontSize: '0.8rem', fontWeight: '700' }}>%92 (Extremely Rare)</div></div>
        </div>
      </div>

      <style>{`
        .pulse-ring {
          position: absolute; width: 220px; height: 220px;
          border: 1px solid rgba(214,175,55,0.2); border-radius: 50%;
          animation: pulse 2.5s infinite;
        }
        @keyframes pulse { 0% { transform: scale(0.6); opacity: 0; } 50% { opacity: 0.5; } 100% { transform: scale(1.6); opacity: 0; } }
      `}</style>
    </div>
  );
};
