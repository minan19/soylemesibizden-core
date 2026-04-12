"use client";
import React, { useState } from 'react';
import MapEngine from './MapEngine';
import { X, ShieldCheck, BarChart3 } from 'lucide-react';

export const RadarMap = ({ isOpen, onClose, properties }: any) => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#FFF', display: 'flex' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <MapEngine properties={properties} onViewDetails={setSelectedProperty} />
      </div>

      {selectedProperty && (
        <div style={{ width: '450px', background: '#FFF', borderLeft: '1px solid #EEE', zIndex: 10001, display: 'flex', flexDirection: 'column', boxShadow: '-20px 0 60px rgba(0,0,0,0.05)' }}>
          <header style={{ padding: '30px', borderBottom: '1px solid #F5F5F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1ABC9C' }}></div>
              <h2 style={{ fontSize: '0.7rem', fontWeight: '950', color: '#0A0A0A', letterSpacing: '3px' }}>ASSET INTELLIGENCE</h2>
            </div>
            <button onClick={() => setSelectedProperty(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC' }}><X size={24} /></button>
          </header>

          <div style={{ padding: '40px', flex: 1, overflowY: 'auto' }}>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '0.6rem', color: '#1ABC9C', fontWeight: '950', letterSpacing: '2px' }}>{selectedProperty.location}</span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: '950', color: '#0A0A0A', margin: '10px 0' }}>{selectedProperty.title}</h1>
              <div style={{ fontSize: '2.2rem', fontWeight: '950' }}>{selectedProperty.price}</div>
            </div>

            <div style={{ padding: '25px', backgroundColor: '#F8FBFB', border: '1px solid #E6F4F1', borderRadius: '8px', marginBottom: '40px' }}>
               <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#117864', marginBottom: '10px' }}>AI GÜVEN SKORU</div>
               <div style={{ fontSize: '2.5rem', fontWeight: '950', color: '#1ABC9C' }}>%{selectedProperty.iq || '98'}</div>
            </div>

            <button style={{ width: '100%', backgroundColor: '#0A0A0A', color: '#1ABC9C', padding: '20px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', border: 'none' }}>
              DETAYLI ANALİZİ AÇ
            </button>
          </div>
        </div>
      )}

      <button onClick={onClose} style={{ position: 'absolute', top: '30px', right: selectedProperty ? '480px' : '30px', background: '#FFF', color: '#0A0A0A', border: '2px solid #0A0A0A', padding: '12px 30px', fontSize: '0.7rem', fontWeight: '950', cursor: 'pointer', borderRadius: '4px' }}>KAPAT</button>
    </div>
  );
};
