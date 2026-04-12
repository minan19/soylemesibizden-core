"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Tag, Key, Database, CheckCircle2 } from 'lucide-react';

export const UniversalEntry = () => {
  const [activeModes, setActiveModes] = useState<string[]>(['SALE']); // 'SALE', 'RENT'
  
  const toggleMode = (mode: string) => {
    setActiveModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', marginBottom: '40px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Database size={18} /> UNIVERSAL DATA PERSISTENCE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>Evrensel Varlık Girişi</h3>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
        {[
          { id: 'SALE', label: 'SATILIK İLAN KATMANI', icon: Tag, color: 'var(--accent-emerald)' },
          { id: 'RENT', label: 'KİRALIK İLAN KATMANI', icon: Key, color: 'var(--accent-gold)' }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => toggleMode(mode.id)}
            style={{ 
              flex: 1, padding: '25px', borderRadius: '16px', border: '1px solid var(--border-color)', 
              backgroundColor: activeModes.includes(mode.id) ? 'var(--text-primary)' : 'var(--bg-primary)',
              color: activeModes.includes(mode.id) ? 'var(--bg-primary)' : 'var(--text-primary)',
              cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '15px'
            }}
          >
            <mode.icon size={20} color={activeModes.includes(mode.id) ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
            <span style={{ fontSize: '0.7rem', fontWeight: '950' }}>{mode.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <AnimatePresence>
          {activeModes.includes('SALE') && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', marginBottom: '10px' }}>SATIŞ PARAMETRELERİ</div>
              <input placeholder="Satış Fiyatı (₺)" style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '700' }} />
            </motion.div>
          )}
          {activeModes.includes('RENT') && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-gold)', marginBottom: '10px' }}>KİRALAMA PARAMETRELERİ</div>
              <input placeholder="Aylık Kira (₺)" style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '700' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Senkronizasyon: $$V_{sync} = \\text{Core}(Specs) \\cup \\text{Listing}(Sale, Rent)$$ mühürlendi."}
        </p>
      </div>
    </div>
  );
};
