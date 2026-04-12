"use client";
import React from 'react';

export const SearchTerminal = ({ searchQuery, setSearchQuery }: any) => (
  <div style={{ width: '100%', marginBottom: '80px', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '30px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1 }}>
      <span style={{ fontSize: '0.55rem', letterSpacing: '2px', opacity: 0.4, fontWeight: '700' }}>PRECISION SEARCH</span>
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Bölge, Varlık Tipi (örn: Yalı, Penthouse) giriniz..." 
        style={{ background: 'none', border: 'none', fontSize: '1.1rem', fontFamily: '"Playfair Display", serif', outline: 'none', width: '100%', color: '#0A0A0A' }} 
      />
    </div>
    <div style={{ height: '40px', width: '1px', backgroundColor: '#EEE' }}></div>
    <div style={{ display: 'flex', gap: '30px' }}>
      {['REGION', 'BUDGET', 'ASSET IQ'].map(filter => (
        <div key={filter} style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}>
          <span style={{ display: 'block', fontSize: '0.5rem', opacity: 0.3, letterSpacing: '2px', fontWeight: '700' }}>{filter}</span>
          <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#0A0A0A' }}>ALL</span>
        </div>
      ))}
    </div>
  </div>
);
