"use client";
import React from 'react';
import { Lock, Settings, UserCheck, Bell } from 'lucide-react';

export const PrivacyController = () => {
  const settings = [
    { label: 'Anonim İşlem Modu', status: true },
    { label: 'Blockchain Tapu Senkronizasyonu', status: true },
    { label: 'Yapay Zeka İzleme İzni', status: false }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px', color: 'var(--text-secondary)' }}>GİZLİLİK VE YÖNETİM</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {settings.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>{s.label}</span>
            <div style={{ width: '40px', height: '20px', backgroundColor: s.status ? 'var(--accent-emerald)' : 'var(--border-color)', borderRadius: '20px', position: 'relative', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', right: s.status ? '2px' : '22px', top: '2px', width: '16px', height: '16px', backgroundColor: '#FFF', borderRadius: '50%', transition: 'all 0.3s' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
