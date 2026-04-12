"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Wind, Sun, Hotel, TrendingUp, ShieldAlert } from 'lucide-react';

export const InstitutionalEngine = () => {
  const assets = [
    { type: 'ENERGY', title: 'Solar PV Plant - Muğla', capacity: '12.5 MW', roi: '%18.2', status: 'Active' },
    { type: 'HOSPITALITY', title: 'Signature Boutique Hotel', capacity: '42 Rooms', roi: '%14.5', status: 'Negotiation' },
    { type: 'CARBON', title: 'Reforestation Area - Çanakkale', capacity: '2.5K tCO2e', roi: '%11.0', status: 'Verified' }
  ];

  return (
    <div style={{ marginTop: '100px', padding: '80px', backgroundColor: '#FDFDFD', borderTop: '1px solid #EEE' }}>
      <header style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '4px', marginBottom: '15px' }}>INSTITUTIONAL GRADE</div>
        <h2 style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-2px' }}>Sovereign Energy & Assets</h2>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#EEE', border: '1px solid #EEE' }}>
        {assets.map((asset, i) => (
          <div key={i} style={{ backgroundColor: '#FFF', padding: '50px' }}>
            <div style={{ marginBottom: '30px' }}>
              {asset.type === 'ENERGY' && <Sun size={32} color="#F1C40F" />}
              {asset.type === 'HOSPITALITY' && <Hotel size={32} color="#1ABC9C" />}
              {asset.type === 'CARBON' && <Wind size={32} color="#3498DB" />}
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '950', marginBottom: '10px' }}>{asset.title}</h3>
            <div style={{ fontSize: '0.65rem', fontWeight: '900', color: '#AAA', letterSpacing: '2px', marginBottom: '30px' }}>{asset.type} // {asset.status}</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F9F9F9', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#AAA' }}>CAPACITY</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '950' }}>{asset.capacity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F9F9F9', paddingBottom: '10px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#AAA' }}>PROJECTED ROI</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '950', color: '#1ABC9C' }}>{asset.roi}</span>
              </div>
            </div>

            <button style={{ marginTop: '40px', width: '100%', padding: '15px', border: '1px solid #0A0A0A', background: 'none', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>
              DATA ROOM ERİŞİMİ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
