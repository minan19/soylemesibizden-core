"use client";
import React, { useState } from 'react';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { useSovereignLang } from '../context/LanguageContext';
import { Bell, ShieldCheck } from 'lucide-react';

export const GlobalHeader = () => {
  const { t } = useSovereignLang();
  
  return (
    <div style={{ width: '100%', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '15px 80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000 }}>
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '950', letterSpacing: '4px' }}>SÖYLEMESİ<span style={{ color: 'var(--accent-emerald)' }}>BİZDEN</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
          <ShieldCheck size={14} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '1px' }}>SECURE SESSION</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <div style={{ position: 'relative', cursor: 'pointer', color: 'var(--text-primary)' }}>
          <Bell size={20} />
          <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '10px', height: '10px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', border: '2px solid var(--bg-secondary)' }} />
        </div>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </div>
  );
};
