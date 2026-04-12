"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, BarChart, ShieldCheck, FileText } from 'lucide-react';

export const ValuationMatrix = () => {
  const metrics = [
    { label: 'KONUMAL OTORİTE', score: 94 },
    { label: 'İMAR MOMENTUMU', score: 88 },
    { label: 'LİKİDİTE SKORU', score: 91 },
    { label: 'ESTETİK ENDEKSİ', score: 96 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Award size={18} /> SOVEREIGN APPRAISAL ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Dijital Değerleme Sertifikası</h3>
        </div>
        <div style={{ padding: '10px 18px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50px', border: '1px solid var(--border-color)', color: 'var(--accent-emerald)', fontSize: '0.65rem', fontWeight: '950' }}>
          VERIFIED BY AI
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        {metrics.map((m, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-secondary)' }}>
              <span>{m.label}</span>
              <span>{m.score}/100</span>
            </div>
            <div style={{ height: '4px', backgroundColor: 'var(--bg-primary)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${m.score}%` }} 
                transition={{ duration: 1, delay: i * 0.1 }}
                style={{ height: '100%', backgroundColor: 'var(--accent-emerald)' }} 
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '30px', backgroundColor: '#FFF', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '15px' }}>
          <ShieldCheck size={32} color="var(--accent-emerald)" />
        </div>
        <div>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>SERTİFİKA MÜHÜRÜ</div>
          <div style={{ fontSize: '1rem', fontWeight: '950', fontFamily: 'monospace' }}>ASSET_CERT_#2026_04_12</div>
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Değerleme Algoritması: $$ V_{cert} = \sum_{i=1}^{n} (Score_i \cdot W_i) \cdot \text{Market}_{adj} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
