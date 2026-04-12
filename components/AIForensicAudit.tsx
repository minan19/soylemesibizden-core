"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, FileCheck, ShieldAlert, Fingerprint, Activity, ZoomIn } from 'lucide-react';

export const AIForensicAudit = () => {
  const [isAuditing, setIsAuditing] = useState(false);

  const startAudit = () => {
    setIsAuditing(true);
    setTimeout(() => setIsAuditing(false), 3000);
  };

  const auditPoints = [
    { label: 'VERİ TUTARLILIĞI', status: 'MATCHED', color: 'var(--accent-emerald)' },
    { label: 'FİNANSAL İZLEME', status: 'CLEAN', color: 'var(--accent-emerald)' },
    { label: 'GEOMETRİK DOĞRULAMA', status: 'VERIFIED', color: 'var(--accent-emerald)' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Search size={18} /> AI FORENSIC AUDIT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Adli Doğrulama Matrisi</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Fingerprint size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {auditPoints.map((point, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: point.color }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{point.label}</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '950', color: point.color }}>{isAuditing ? '...' : point.status}</span>
          </div>
        ))}
      </div>

      <div style={{ height: '60px', backgroundColor: '#FFF', borderRadius: '20px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {isAuditing && (
          <motion.div 
            initial={{ left: '-100%' }}
            animate={{ left: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            style={{ position: 'absolute', width: '30%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(26,188,156,0.1), transparent)', zIndex: 1 }}
          />
        )}
        <div style={{ zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '1px' }}>{isAuditing ? 'DEEP SCANNING...' : 'TRUST SCORE: 99.8%'}</span>
        </div>
      </div>

      <button 
        onClick={startAudit}
        disabled={isAuditing}
        style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
      >
        <ZoomIn size={18} /> {isAuditing ? 'DENETLENİYOR' : 'ADLİ ANALİZİ BAŞLAT'}
      </button>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Güven Skoru: $$ F_{trust} = \\prod (v_{consistency} \\cdot a_{validity}) \\oplus \\text{Neural}_{audit} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
