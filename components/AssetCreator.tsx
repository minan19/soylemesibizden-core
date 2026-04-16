"use client";
import React from 'react';
import { Plus, Database, ShieldCheck, Zap, Leaf } from 'lucide-react';

export const AssetCreator = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Database size={18} /> ASSET INJECTION ENGINE
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Yeni Varlık Mühürle</h3>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {[
          { label: 'VARLIK ADI', placeholder: 'Örn: Signature Estate', icon: Database },
          { label: 'KONUM (COĞRAFİ)', placeholder: 'Örn: Muğla / Bodrum', icon: Zap },
          { label: 'DEĞERLEME (₺)', placeholder: 'Örn: 125,000,000', icon: ShieldCheck },
          { label: 'KARBON SKORU', placeholder: 'Örn: A++', icon: Leaf }
        ].map((field, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{field.label}</label>
            <input 
              type="text" 
              placeholder={field.placeholder}
              style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', outline: 'none', fontWeight: '700', fontSize: '0.85rem' }} 
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Güvenlik Protokolü: Yeni varlık sisteme girildiğinde IQ Score otomatik olarak hesaplanacak ve Blockchain üzerine mühürlenecektir.
        </p>
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer' }}>
        VARLIĞI EKOSİSTEME ENJEKTE ET
      </button>
    </div>
  );
};
