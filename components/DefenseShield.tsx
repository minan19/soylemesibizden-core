"use client";
import React from 'react';
import { ShieldAlert, Lock, Eye, Activity } from 'lucide-react';

export const DefenseShield = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px' }}>
        <Activity size={20} color="var(--accent-emerald)" className="animate-pulse" />
      </div>
      <header style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <ShieldAlert size={18} /> CYBER DEFENSE ACTIVE
        </div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Sovereign Kalkanı</h3>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {[
          { label: 'E2E Şifreleme', status: 'MÜHÜRLÜ', val: 'RSA-4096' },
          { label: 'İstihbarat Sızıntısı', status: 'YOK', val: '0.00%' },
          { label: 'Erişim Yetkisi', status: 'SINIRLI', val: 'MUSTAFA INAN' }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{item.label}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{item.val}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
        Güvenlik Katsayısı: {"$$S_{def} = \\sum_{i=1}^{n} (k_i \\cdot \\omega_i) > 0.999$$"}
      </div>
    </div>
  );
};
