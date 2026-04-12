"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Watch, Share2, Zap, ShieldCheck, RefreshCw } from 'lucide-react';

export const MobileBridge = () => {
  const syncNodes = [
    { device: 'iPhone 15 Pro', status: 'ENCRYPTED', latency: '2ms' },
    { device: 'Apple Watch Ultra', status: 'HAPTIC_READY', latency: '4ms' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Smartphone size={18} /> SOVEREIGN MOBILE BRIDGE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Mobil Komuta Senkronu</h3>
        </div>
        <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 5, ease: "linear" }}>
          <RefreshCw size={22} color="var(--accent-emerald)" />
        </motion.div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {syncNodes.map((node, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {node.device.includes('Watch') ? <Watch size={20} color="var(--text-secondary)" /> : <Smartphone size={20} color="var(--text-secondary)" />}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>{node.device}</div>
                <div style={{ fontSize: '0.55rem', color: 'var(--accent-emerald)', fontWeight: '900' }}>{node.status}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>
              LATENCY: {node.latency}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>PUSH INTELLIGENCE: ACTIVE</span>
        </div>
        <ShieldCheck size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Mobil Köprü: $$ B_{mobile} = \\sum (Data_{desktop} \\cdot \\text{Haptic}_{feedback}) \\oplus \\text{Sync}_{key} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
