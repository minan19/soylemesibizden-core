"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, TrendingUp, ShieldCheck, Activity, Globe, ArrowUpRight, DollarSign } from 'lucide-react';

export const TreasuryV2 = () => {
  const liquidityNodes = [
    { label: 'TOPLAM LİKİDİTE', val: '₺ 242.8M', status: 'STABLE', change: '+1.2%' },
    { label: 'YATIRIM KAPASİTESİ', val: '₺ 110.5M', status: 'READY', change: 'MAX' },
    { label: 'VERGİSEL REZERV', val: '₺ 28.4M', status: 'AUDITED', change: '0.00ms' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Landmark size={18} /> ELITE TREASURY v2
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Likidite Komutası</h3>
        </div>
        <div style={{ padding: '10px 20px', backgroundColor: '#FFF', borderRadius: '50px', border: '1px solid var(--border-color)', color: 'var(--accent-emerald)', fontSize: '0.65rem', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={14} /> SYSTEM_SOLVENCY: 100%
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {liquidityNodes.map((node, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'rgba(26,188,156,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DollarSign size={20} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '950' }}>{node.val}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '800' }}>{node.label}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '950' }}>
                {node.change} <ArrowUpRight size={14} />
              </div>
              <div style={{ fontSize: '0.55rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{node.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>MULTICURRENCY REZONANCE: ACTIVE</span>
        </div>
        <ShieldCheck size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Hazine Otoritesi: $$ L_{dyn} = \\sum_{i=1}^{n} (Cash_{i} \\cdot \\text{Yield}_{i}) \\oplus \\text{Treasury}_{cap} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
