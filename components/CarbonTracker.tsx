"use client";
import React from 'react';
import { Leaf, Globe, Activity } from 'lucide-react';

export const CarbonTracker = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#F4FBF9', border: '1px solid #E8F6F3', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#1ABC9C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Leaf size={28} color="#FFF" />
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px' }}>GLOBAL CARBON OFFSET</div>
          <div style={{ fontSize: '2rem', fontWeight: '950', color: '#0A0A0A' }}>142,840 <span style={{ fontSize: '0.8rem', color: '#AAA' }}>tCO2e</span></div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', color: '#1ABC9C' }}>
          <Activity size={16} />
          <span style={{ fontSize: '0.8rem', fontWeight: '900' }}>SÖYLEMESİ BİZDEN INTELLIGENCE</span>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#AAA', fontWeight: '700', marginTop: '5px' }}>VERIFIED BY SOVEREIGN PROTOCOL</div>
      </div>
    </div>
  );
};
