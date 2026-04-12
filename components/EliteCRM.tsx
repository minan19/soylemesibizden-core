"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, UserCheck, TrendingUp, Zap, Mail } from 'lucide-react';

export const EliteCRM = () => {
  const topLeads = [
    { name: 'A. Yılmaz', capital: '₺ 45M', score: 98, status: 'HIGH_INTENT' },
    { name: 'K. Demir', capital: '₺ 120M', score: 94, status: 'STRATEGIC' },
    { name: 'M. Chen', capital: '$ 5.2M', score: 89, status: 'QUALIFIED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Users size={18} /> ELITE LEAD INTELLIGENCE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Yatırımcı Radar & CRM</h3>
        </div>
        <Target size={22} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {topLeads.map((lead, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '950', fontSize: '0.8rem' }}>
                {lead.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{lead.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', fontWeight: '700', letterSpacing: '0.5px' }}>{lead.status}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{lead.capital}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--text-secondary)' }}>IQ SCORE: {lead.score}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={18} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.75rem', fontWeight: '900' }}>AI-DRIVEN PRIORITIZATION ACTIVE</span>
        </div>
        <Zap size={16} color="var(--accent-emerald)" />
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Lider Skoru: $$ L_{score} = \alpha \cdot \text{Capital} + \beta \cdot \text{Intent} + \gamma \cdot \text{Velocity} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
