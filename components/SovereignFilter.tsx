"use client";
import React, { useState } from 'react';
import { Search, SlidersHorizontal, Globe, Zap, ShieldCheck, ChevronDown } from 'lucide-react';

export const SovereignFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { label: 'Bölge', options: ['Çanakkale', 'Muğla', 'İstanbul', 'Global'] },
    { label: 'Varlık Tipi', options: ['Endüstriyel', 'Arazi', 'Konut', 'Karbon Kredisi'] },
    { label: 'IQ Skoru', options: ['95+ (Elite)', '85+ (Premium)', '75+ (Standard)'] },
    { label: 'Vatandaşlık', options: ['Uygun', 'Uygun Değil'] }
  ];

  return (
    <div style={{ marginBottom: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '25px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {/* Hızlı Arama */}
        <div style={{ flex: 1, position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Varlık, bölge veya ID ara..." 
            style={{ width: '100%', padding: '15px 50px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', outline: 'none', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}
          />
          <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Gelişmiş Filtre Butonu */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px 25px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '1px', cursor: 'pointer' }}
        >
          <SlidersHorizontal size={18} /> DETAYLI FİLTRELEME
        </button>
      </div>

      {/* Genişletilmiş Filtre Paneli */}
      {isOpen && (
        <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
          {filters.map((f, i) => (
            <div key={i}>
              <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '12px' }}>{f.label.toUpperCase()}</div>
              <div style={{ position: 'relative' }}>
                <select style={{ width: '100%', padding: '12px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', appearance: 'none', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>
                  {f.options.map((opt, idx) => <option key={idx}>{opt}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>
          ))}
          
          <div style={{ gridColumn: 'span 4', marginTop: '10px', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
             <button style={{ padding: '12px 25px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '950', cursor: 'pointer' }}>TEMİZLE</button>
             <button style={{ padding: '12px 25px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '950', cursor: 'pointer' }}>SONUÇLARI GÖSTER</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          { "Süzme Algoritması: $$F_{query} = \int_{min}^{max} (IQ \cdot ROI) \cdot \delta(region) dt$$ mühürlenmiştir." }
        </p>
      </div>
    </div>
  );
};
