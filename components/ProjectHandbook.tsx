"use client";
import React from 'react';

export const ProjectHandbook = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: '0', backgroundColor: '#FFF', zIndex: 100000, padding: '100px 60px', overflowY: 'auto' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: 'serif' }}>
        <header style={{ borderBottom: '2px solid #D4AF37', paddingBottom: '30px', marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '4rem', margin: '0', color: '#0A0A0A' }}>SÖYLEMESİ BİZDEN</h1>
            <p style={{ fontSize: '0.9rem', letterSpacing: '6px', color: '#D4AF37', margin: '10px 0 0 0' }}>SOVEREIGN ASSET DOKTRİNİ V1.0</p>
          </div>
          <button onClick={onClose} style={{ background: '#0A0A0A', color: '#D4AF37', border: 'none', padding: '15px 30px', cursor: 'pointer', fontWeight: '900', letterSpacing: '2px' }}>[ TERMİNALE DÖN ]</button>
        </header>
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#0A0A0A' }}>01. STRATEJİK VİZYON</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '2', color: '#333' }}>
            Bu platform, gayrimenkulü durağan bir meta olmaktan çıkarıp, veri odaklı bir istihbarat objesine dönüştürür. 
          </p>
        </section>
        <section style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#0A0A0A' }}>02. TOPOGRAFİK ANALİZ (TRUE 3D)</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '2', color: '#333' }}>
            MapLibre GL motoruyla entegre çalışan sistem, arazinin gerçek eğimini (True 3D Mesh) işleyerek yatırımcıya fiziksel arazi hakimiyeti sağlar.
          </p>
        </section>
        <footer style={{ marginTop: '100px', borderTop: '1px solid #EEE', paddingTop: '30px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.7rem', color: '#AAA', letterSpacing: '3px' }}>SÖYLEMESİ BİZDEN © 2026 | MUSTAFA İNAN</span>
        </footer>
      </div>
    </div>
  );
};
