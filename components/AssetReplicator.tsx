"use client";
import React from 'react';
import { CopyPlus, ArrowRightLeft, Zap } from 'lucide-react';

export const AssetReplicator = () => {
  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '25px' }}>VARLIK REPLİKASYONU</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button style={{ width: '100%', padding: '18px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <CopyPlus size={20} color="var(--accent-emerald)" /> BU VERİYİ KİRALIK OLARAK MÜHÜRLE
        </button>
        
        <button style={{ width: '100%', padding: '18px', backgroundColor: 'var(--accent-emerald)', border: 'none', borderRadius: '12px', color: '#FFF', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ArrowRightLeft size={20} /> MODLARI ÇAPRAZ SENKRONİZE ET
        </button>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.65rem', fontWeight: '800' }}>
        <Zap size={14} color="var(--accent-emerald)" /> VERİ TABANI YÜKÜ: %0 (MÜKERRER KAYIT YOK)
      </div>
    </div>
  );
};
