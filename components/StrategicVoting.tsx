"use client";
import React from 'react';
import { ShieldCheck, ChevronRight, Fingerprint } from 'lucide-react';

export const StrategicVoting = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-primary)' }}>MÜHÜRLÜ OY KULLANIMI</h4>
      </header>
      
      <div style={{ marginBottom: '30px', padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
        <p style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          "Muğla Turizm Fonu'nun %15 oranında kripto-varlıklara yönlendirilmesini onaylıyor musunuz?"
        </p>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button style={{ flex: 1, padding: '18px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>EVET</button>
        <button style={{ flex: 1, padding: '18px', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>HAYIR</button>
      </div>

      <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
        <Fingerprint size={16} color="var(--accent-emerald)" />
        <span style={{ fontSize: '0.6rem', fontWeight: '900', letterSpacing: '1px' }}>BİYOMETRİK MÜHÜR AKTİF</span>
      </div>

      <div style={{ marginTop: '25px', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '8px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Karar Vorteksi: $$G_{vortex} = \\frac{\\sum w_i \\cdot v_i}{\\Delta t} > \\phi$$ denklemiyle mühürlenir."}
        </p>
      </div>
    </div>
  );
};
