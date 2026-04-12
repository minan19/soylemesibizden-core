"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, Lock, Cpu, Globe, Key, Activity } from 'lucide-react';

export const SmartRegistryV4 = () => {
  const consensusData = [
    { node: 'GENEVA_NODE', status: 'SYNCHRONIZED', latency: '2ms' },
    { node: 'ISTANBUL_NODE', status: 'SYNCHRONIZED', latency: '1ms' },
    { node: 'SINGAPORE_NODE', status: 'SYNCHRONIZED', latency: '4ms' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Key size={18} /> SMART REGISTRY v4
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Egemen Konsensüs Motoru</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <ShieldCheck size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {consensusData.map((data, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe size={16} color="var(--text-secondary)" />
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)' }}>{data.node}</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{data.status}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)' }}>LATENCY: {data.latency}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>DEĞİŞTİRİLEMEZLİK KANITI: AKTİF</span>
        </div>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
          <Activity size={16} color="var(--accent-emerald)" />
        </motion.div>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"İnkar Edilemezlik: $$ I_{proof} = \\text{MerkleRoot}(\\text{Registry} + \\text{Timestamp}_{nano}) \\equiv \\text{Truth} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
