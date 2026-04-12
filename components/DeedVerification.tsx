"use client";
import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const DeedVerification = () => {
  const status = [
    { label: 'Mülkiyet Şerhi', status: 'TEMİZ', icon: CheckCircle2, color: 'var(--accent-emerald)' },
    { label: 'Haciz / İpotek', status: 'YOK', icon: CheckCircle2, color: 'var(--accent-emerald)' },
    { label: 'Sit Alanı Durumu', status: 'YOK', icon: CheckCircle2, color: 'var(--accent-emerald)' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '28px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <ShieldCheck size={18} /> DEED VERIFICATION SUITE
        </div>
        <div style={{ padding: '6px 12px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950' }}>VERIFIED</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {status.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{item.label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: item.color }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '950' }}>{item.status}</span>
              <item.icon size={16} />
            </div>
          </div>
        ))}
      </div>

      <button style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>
        RESMİ TAPU ANALİZ RAPORUNU İNDİR (PDF)
      </button>
    </div>
  );
};
