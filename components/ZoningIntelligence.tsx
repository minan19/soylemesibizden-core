"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Ruler, Map, Construction } from 'lucide-react';

export const ZoningIntelligence = () => {
  const zoningData = [
    { label: 'EMSAL (FAR)', val: '1.50', desc: 'Toplam İnşaat Alanı Katsayısı' },
    { label: 'HMAX (Yükseklik)', val: '12.50m', desc: 'Azami Yapı Yüksekliği' },
    { label: 'FONKSİYON', val: 'Konut + Ticari', desc: 'Karma Kullanım İzni' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Construction size={18} /> ZONING INTELLIGENCE AI
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px' }}>İmar Durum Analizi</h3>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {zoningData.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.label}</div>
            <div style={{ fontSize: '1.3rem', fontWeight: '950', color: 'var(--text-primary)' }}>{item.val}</div>
            <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', marginTop: '5px', fontWeight: '600' }}>{item.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Kentsel Formül: $$ S_{built} = Area_{plot} \times Emsal \times \eta_{utilization} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
