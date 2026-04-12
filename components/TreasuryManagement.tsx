"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Coins, TrendingDown, ArrowUpRight, ShieldCheck, Activity } from 'lucide-react';

export const TreasuryManagement = () => {
  const treasuryNodes = [
    { label: 'OPERASYONEL SERMAYE', val: '₺ 85.4M', change: '+2.4%' },
    { label: 'STRATEJİK REZERV', val: '₺ 120.0M', change: 'STABLE' },
    { label: 'VERGİ KARŞILIKLARI', val: '₺ 12.8M', change: 'AUDITED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Landmark size={18} /> ELITE TREASURY MANAGEMENT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Hazine Yönetim Terminali</h3>
        </div>
        <div style={{ padding: '10px 20px', backgroundColor: '#FFF', borderRadius: '50px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.65rem', fontWeight: '950' }}>
          LIQUIDITY: OPTIMAL
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {treasuryNodes.map((node, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px' }}>
                <Coins size={18} color="var(--accent-emerald)" />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{node.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '950' }}>{node.val}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{node.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>HAZİNE ZIRHI: MÜHÜRLÜ</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Hazine Rasyosu: $$ T_{ratio} = \\frac{\\sum \\text{Liquidity}}{\\sum \\text{Liability}} \\oplus \\text{Risk}_{adj} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
