"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Star, Activity, ShieldCheck, Briefcase } from 'lucide-react';

export const EliteCRM_v2 = () => {
  const eliteConnections = [
    { name: 'STRATEJİK ARACI_A', role: 'ARSA/TARAZİ', score: 98, status: 'VERIFIED' },
    { name: 'HUKUK DANIŞMANI_B', role: 'MEVZUAT', score: 95, status: 'ELITE' },
    { name: 'KÜRESEL YATIRIMCI_C', role: 'LİKİDİTE', score: 92, status: 'ACTIVE' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Users size={18} /> ELITE CRM & LEDGER
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Ağ İstihbarat Merkezi</h3>
        </div>
        <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Star size={20} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {eliteConnections.map((conn, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                <UserCheck size={18} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '950' }}>{conn.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '800' }}>{conn.role}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>%{conn.score}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-primary)' }}>{conn.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>TRUST PROTOCOL: ENFORCED</span>
        </div>
        <Activity size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Ağ Değeri: $$ V_{net} = \\sum (Contact_{i} \\cdot \\text{Trust}_{i}) \\times \\log(Interaction) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
