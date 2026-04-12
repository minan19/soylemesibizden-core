"use client";
import React from 'react';
import { Scale, FileText, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const LegalExecution = () => {
  const checkPoints = [
    { label: 'Mülkiyet Doğrulaması', status: 'COMPLETE', icon: CheckCircle2 },
    { label: 'İpotek / Şerh Taraması', status: 'CLEAN', icon: CheckCircle2 },
    { label: 'Enerji Kimlik Denetimi', status: 'VERIFIED', icon: ShieldCheck },
    { label: 'Belediye/İmar Arşivi', status: 'IN_REVIEW', icon: FileText }
  ];

  return (
    <div style={{ marginTop: '40px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '35px' }}>
        <Scale size={24} color="#1ABC9C" />
        <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '3px' }}>LEGAL EXECUTION PROTOCOL</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {checkPoints.map((cp, i) => (
          <div key={i} style={{ padding: '20px', border: '1px solid #F5F5F5', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <cp.icon size={18} color={cp.status === 'COMPLETE' || cp.status === 'CLEAN' ? '#1ABC9C' : '#D4AF37'} />
              <span style={{ fontSize: '0.75rem', fontWeight: '800' }}>{cp.label}</span>
            </div>
            <span style={{ fontSize: '0.6rem', fontWeight: '950', color: cp.status === 'COMPLETE' ? '#1ABC9C' : '#AAA', letterSpacing: '1px' }}>{cp.status}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '4px', borderLeft: '3px solid #1ABC9C' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', lineHeight: '1.6' }}>
          <strong>Protokol Notu:</strong> Varlık üzerinde yapılan son taramada, tapu kaydı ile yerinde yapılan inceleme %100 uyumludur. Herhangi bir devir engeli tespit edilmemiştir.
        </p>
      </div>
    </div>
  );
};
