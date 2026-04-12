"use client";
import React from 'react';
import { Star, FileText, Zap, Shield } from 'lucide-react';

export const ValueMatrix = () => {
  const features = [
    { label: 'İmar Momentum', val: '+42%', desc: 'Bölgesel imar hızı' },
    { label: 'Enerji Altyapısı', val: 'A++', desc: 'Modernizasyon skoru' },
    { label: 'Hukuki Temizlik', val: 'Full', desc: 'Sıfır şerh riski' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '30px' }}>VALUE-ADDING MATRIX</h4>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        {features.map((f, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{f.val}</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '900', marginTop: '5px' }}>{f.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '30px', backgroundColor: 'var(--text-primary)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px' }}><FileText size={80} color="rgba(255,255,255,0.05)" /></div>
        <div style={{ color: 'var(--accent-emerald)', fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '10px' }}>AI EXECUTIVE REPORT</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: '1.6', margin: 0 }}>
          { "Analiz: Varlık #E21, bölgedeki ulaşım akslarına olan yakınlığı ve karbon nötrleme potansiyeli nedeniyle 2027 projeksiyonunda ortalamanın %24 üzerinde getiri vaat etmektedir." }
        </p>
      </div>
    </div>
  );
};
