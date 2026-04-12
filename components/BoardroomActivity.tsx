"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Gavel, FileCheck, Landmark } from 'lucide-react';

export const BoardroomActivity = () => {
  const proposals = [
    { id: 'P-84', title: 'Çanakkale Lojistik Hub Satın Alımı', status: 'Oylamada', votes: '74%', color: 'var(--accent-emerald)' },
    { id: 'P-82', title: 'Karbon Kredisi Portföy Re-Balansı', status: 'Mühürlendi', votes: '92%', color: 'var(--accent-gold)' },
    { id: 'P-79', title: 'E21 Varlığı Likidite Artırımı', status: 'Reddedildi', votes: '12%', color: '#E74C3C' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Landmark size={20} /> STRATEGIC GOVERNANCE
        </div>
        <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>VOTING VORTEX ACTIVE</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {proposals.map((p, i) => (
          <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ padding: '12px', backgroundColor: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px' }}>
                <Gavel size={20} color="var(--accent-gold)" />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>ID: {p.id}</div>
                <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text-primary)' }}>{p.title}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '950', color: p.color }}>{p.votes}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>{p.status.toUpperCase()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
