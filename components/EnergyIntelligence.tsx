"use client";
import React from 'react';
import { Sun, Leaf, Battery, Zap, Globe } from 'lucide-react';

export const EnergyIntelligence = ({ asset }: any) => {
  const energyData = [
    { label: 'SOLAR POTANSİYEL', value: '42.5 MWh/Yıl', icon: Sun, color: '#F39C12' },
    { label: 'KARBON OFSET', value: '12.4 tCO2e', icon: Leaf, color: '#27AE60' },
    { label: 'ŞEBEKE BAĞIMSIZLIK', value: '%68', icon: Battery, color: '#2980B9' }
  ];

  return (
    <div style={{ marginTop: '60px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <Zap size={22} color="#1ABC9C" />
        <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '3px', color: '#0A0A0A' }}>ENERGY & CARBON CERTIFICATION</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {energyData.map((data, i) => (
          <div key={i} style={{ backgroundColor: '#FFF', border: '1px solid #F0F0F0', borderRadius: '12px', padding: '30px', textAlign: 'center' }}>
            <data.icon size={28} color={data.color} style={{ marginBottom: '15px' }} />
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '10px' }}>{data.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '950', color: '#0A0A0A' }}>{data.value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '25px', backgroundColor: '#F4FBF9', borderRadius: '8px', border: '1px solid #E8F6F3', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Globe size={24} color="#1ABC9C" />
        <p style={{ fontSize: '0.85rem', color: '#2D6A4F', fontWeight: '600', lineHeight: '1.5' }}>
          Bu varlık, Yeşil Enerji Protokolü kapsamında "Sınıf A" sertifikasına sahiptir. Mevcut güneş paneli kurulumu ile yıllık işletme maliyetlerinde %40 tasarruf öngörülmektedir.
        </p>
      </div>
    </div>
  );
};
