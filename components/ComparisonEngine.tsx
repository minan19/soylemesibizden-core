"use client";
import React from 'react';

export const ComparisonEngine = ({ selectedItems, onRemove, onAnalyze, onClear }: any) => {
  if (!selectedItems || selectedItems.length === 0) return null;

  return (
    <div style={{ 
      position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
      width: '90%', maxWidth: '1100px', backgroundColor: '#0A0A0A', padding: '20px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      boxShadow: '0 30px 60px rgba(0,0,0,0.4)', zIndex: 500, border: '1px solid #D4AF37'
    }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {/* Sol Taraf: Bilgi ve Varlıklar */}
        <div style={{ borderRight: '1px solid rgba(214,175,55,0.3)', paddingRight: '30px' }}>
          <span style={{ display: 'block', fontSize: '0.5rem', color: '#D4AF37', letterSpacing: '3px', fontWeight: '900' }}>ASSET COMPARISON</span>
          <span style={{ fontSize: '0.8rem', color: '#FFF', opacity: 0.6 }}>{selectedItems.length} Varlık Seçildi</span>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          {selectedItems.map((item: any) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '8px 12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.65rem', color: '#FFF' }}>{item.title}</span>
              <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Taraf: Aksiyon ve Kapatma */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <button onClick={onClear} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '0.6rem', cursor: 'pointer', letterSpacing: '2px', opacity: 0.4, transition: 'opacity 0.3s' }}>
          [ KAPAT ]
        </button>
        <button onClick={onAnalyze} style={{ backgroundColor: '#D4AF37', color: '#0A0A0A', border: 'none', padding: '12px 30px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' }}>
          ANALİZİ BAŞLAT
        </button>
      </div>
    </div>
  );
};
