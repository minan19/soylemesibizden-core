"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, Gavel, ShieldCheck, AlertCircle, FileSearch } from 'lucide-react';

export const LegalArchitect = () => {
  const legalStatus = [
    { label: 'İMAR DURUMU', status: 'KONUT+TİCARİ', risk: '0%', icon: FileSearch },
    { label: 'TAPU ŞERH/HACİZ', status: 'TEMİZ', risk: '0%', icon: ShieldCheck },
    { label: 'SİT ALANI ANALİZİ', status: 'YOK', risk: '0%', icon: Scale }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Gavel size={18} /> SOVEREIGN AI LEGAL ARCHITECT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Hukuki Mevzuat Matrisi</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <FileText size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {legalStatus.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <item.icon size={18} color="var(--accent-emerald)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{item.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--text-primary)' }}>{item.status}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>RİSK: {item.risk}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>MEVZUAT TARAMASI: %100 GÜNCEL</span>
        </div>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2 }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>AI_VERIFIED</div>
        </motion.div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Hukuki Temizlik: $$ L_{clean} = \\prod_{i=1}^{n} (Status_{i} \\cdot \\text{Verify}_{i}) \\oplus \\text{Gov}_{sync} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
