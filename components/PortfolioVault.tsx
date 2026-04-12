"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, ShieldCheck, PieChart, ArrowUpRight, Crown } from 'lucide-react';

export const PortfolioVault = () => {
  return (
    <div style={{ padding: '50px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, padding: '40px', opacity: 0.03 }}>
        <Crown size={200} />
      </div>

      <header style={{ marginBottom: '45px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px' }}>
            <Wallet size={20} /> ELITE PORTFOLIO VAULT
          </div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '950', marginTop: '15px', letterSpacing: '-2px' }}>Varlık Mahzeni</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px' }}>TOTAL VALUATION</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--text-primary)' }}>₺ 428.5M</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '5px', color: 'var(--accent-emerald)', fontWeight: '900', fontSize: '0.9rem', marginTop: '5px' }}>
            <TrendingUp size={16} /> +12.4% <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>(YTD)</span>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {[
          { label: 'STRATEJİK ARAZİ', val: '₺ 285.0M', color: 'var(--accent-emerald)' },
          { label: 'KURUMSAL KONUT', val: '₺ 112.4M', color: 'var(--text-primary)' },
          { label: 'LİKİDİTE REZERVİ', val: '₺ 31.1M', color: '#888' }
        ].map((asset, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            style={{ padding: '30px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)' }}
          >
            <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '10px', letterSpacing: '1px' }}>{asset.label}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '950', color: asset.color }}>{asset.val}</div>
            <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--bg-secondary)', borderRadius: '2px', marginTop: '20px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: '70%' }} 
                style={{ height: '100%', backgroundColor: asset.color, opacity: 0.6 }} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '25px', backgroundColor: '#FFF', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ShieldCheck size={24} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.85rem', fontWeight: '900' }}>PORTFÖY GÜVENLİK SKORU: ALPHA-1</span>
        </div>
        <button style={{ padding: '12px 25px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '10px', fontWeight: '950', fontSize: '0.65rem', letterSpacing: '1px', cursor: 'pointer' }}>
          DETAYLI ANALİZ <ArrowUpRight size={14} style={{ display: 'inline', marginLeft: '8px' }} />
        </button>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Portföy Değeri: $$ V_{vault} = \\sum_{i=1}^{n} (Q_i \\times P_i) \\times \\text{Momentum}_{adj} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
