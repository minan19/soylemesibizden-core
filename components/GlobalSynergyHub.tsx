"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Network, ShieldCheck, Zap, Globe, Activity } from 'lucide-react';

export const GlobalSynergyHub = () => {
  const nodes = [
    { label: 'INSTITUTIONAL NODES', val: '42 ACTIVE', efficiency: '98%' },
    { label: 'GOV_REGISTRY SYNC', val: 'ESTABLISHED', efficiency: '100%' },
    { label: 'DATA REZONANCE', val: '1.2 PB/s', efficiency: '94%' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Share2 size={18} /> GLOBAL SYNERGY HUB
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Ağ Etkisi İstihbaratı</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Network size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{node.label}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{node.val}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>EFFICIENCY: {node.efficiency}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>KÜRESEL SİNERJİ AKTİF</span>
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Activity size={16} color="var(--accent-emerald)" />
        </motion.div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Sinerji Katsayısı: $$ S_{grid} = \\sum (Node_{i} \\cdot Connectivity_{i}) \\times \\log(N_{users}) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
