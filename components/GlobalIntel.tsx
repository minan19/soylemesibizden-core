"use client";
import React from 'react';
import { Globe, ArrowUpRight, ShieldAlert, Zap, BookOpen } from 'lucide-react';

export const GlobalIntel = () => {
  const news = [
    { source: 'Reuters', title: 'AB Karbon Sınır Vergisi Düzenlemesi Onaylandı', impact: 'High', type: 'ENERGY' },
    { source: 'Resmi Gazete', title: 'Boğaz Hattı İmar Yönetmeliğinde Revizyon', impact: 'Critical', type: 'LEGAL' },
    { source: 'Bloomberg', title: 'Küresel Lüks Konut Endeksi Yıllık %8 Artışta', impact: 'Medium', type: 'MARKET' }
  ];

  return (
    <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Globe size={22} color="#1ABC9C" />
          <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '3px' }}>GLOBAL INTEL AGGREGATOR</h3>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
           <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1ABC9C', animation: 'pulse 2s infinite' }} />
           <span style={{ fontSize: '0.65rem', fontWeight: '900', color: '#AAA' }}>LIVE FEED</span>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {news.map((n, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: '#F9F9F9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid transparent', transition: 'all 0.3s' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#1ABC9C', backgroundColor: '#E8F6F3', padding: '6px 12px', borderRadius: '4px' }}>{n.type}</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0A0A0A' }}>{n.title}</div>
                <div style={{ fontSize: '0.7rem', color: '#AAA', fontWeight: '600', marginTop: '4px' }}>Kaynak: {n.source} • Etki: <span style={{ color: n.impact === 'Critical' ? '#E74C3C' : '#1ABC9C' }}>{n.impact}</span></div>
              </div>
            </div>
            <ArrowUpRight size={18} color="#CCC" style={{ cursor: 'pointer' }} />
          </div>
        ))}
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '15px', border: '1px solid #EEE', borderRadius: '8px', background: 'none', fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <BookOpen size={16} /> TÜM ANALİZLERİ GÖR
      </button>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
