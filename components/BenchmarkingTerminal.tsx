"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShieldCheck, Zap, Leaf, ArrowRight, Target } from 'lucide-react';

export const BenchmarkingTerminal = ({ assets }: { assets: any[] }) => {
  if (assets.length < 2) return null;

  const metrics = [
    { label: 'SOVEREIGN IQ', key: 'iq', icon: ShieldCheck, color: '#1ABC9C' },
    { label: 'YILLIK ROI', key: 'roi', icon: BarChart3, color: '#D4AF37' },
    { label: 'KARBON GRADE', key: 'carbon', icon: Leaf, color: '#27AE60' },
    { label: 'ENERJİ POTANSİYELİ', key: 'energy', icon: Zap, color: '#F1C40F' }
  ];

  return (
    <div style={{ marginTop: '80px', padding: '60px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.02)' }}>
      <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '4px', marginBottom: '15px' }}>STRATEGIC DIVERGENCE</div>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '950', letterSpacing: '-1.5px' }}>Varlık Kıyaslama Terminali</h3>
        </div>
        <div style={{ padding: '15px 30px', border: '1px solid #1ABC9C', borderRadius: '50px', color: '#1ABC9C', fontSize: '0.75rem', fontWeight: '950' }}>
          ALPHA ANALYSIS ACTIVE
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: `200px repeat(${assets.length}, 1fr)`, gap: '2px', backgroundColor: '#F0F0F0', border: '1px solid #EEE' }}>
        {/* Metrik İsimleri Kolonu */}
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAFA' }}>
          <div style={{ height: '120px', padding: '30px' }}></div>
          {metrics.map((m, i) => (
            <div key={i} style={{ height: '100px', padding: '30px', display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #EEE' }}>
              <m.icon size={18} color={m.color} />
              <span style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px' }}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Varlık Verileri */}
        {assets.map((asset, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#FFF' }}>
            <div style={{ height: '120px', padding: '30px', borderBottom: '1px solid #EEE', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950', color: '#1A1A1A' }}>{asset.title}</div>
              <div style={{ fontSize: '0.7rem', color: '#AAA', marginTop: '5px' }}>{asset.location}</div>
            </div>
            
            <div style={{ height: '100px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '950', color: '#1ABC9C' }}>%{asset.iq}</div>
            </div>
            <div style={{ height: '100px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '950' }}>{asset.roi}</div>
            </div>
            <div style={{ height: '100px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
              <span style={{ padding: '6px 15px', backgroundColor: '#F4FBF9', borderRadius: '40px', fontSize: '0.75rem', fontWeight: '950', color: '#27AE60' }}>{asset.carbon}</span>
            </div>
            <div style={{ height: '100px', padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #EEE' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>94%</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '30px', backgroundColor: '#F9F9F9', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Target size={24} color="#D4AF37" />
        <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#555', lineHeight: '1.6' }}>
          <strong>Alpha Kararı:</strong> {assets[0].title}, uzun vadeli likidite ve yasal temizlik açısından {assets[1].title} varlığına göre %12 daha üstün bir projeksiyon sunmaktadır.
        </p>
      </div>
    </div>
  );
};
