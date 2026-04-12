"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, History, ShieldCheck, ArrowUpRight } from 'lucide-react';

export const AssetGenealogy = () => {
  const history = [
    { year: '2026', event: 'SOVEREIGN MÜHÜRÜ', status: 'Current', actor: 'Mustafa İnan' },
    { year: '2019', event: 'İMAR REVİZYONU', status: 'Past', actor: 'Kamu Otoritesi' },
    { year: '2012', event: 'STRATEJİK SATIN ALIM', status: 'Past', actor: 'Investment Group X' },
    { year: '1998', event: 'İLK TESCİL', status: 'Past', actor: 'Özel Mülkiyet' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <GitBranch size={18} /> ASSET GENEALOGY
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px' }}>Varlık Soyağacı</h3>
      </header>

      <div style={{ position: 'relative', paddingLeft: '30px' }}>
        <div style={{ position: 'absolute', left: '0', top: '10px', bottom: '10px', width: '2px', backgroundColor: 'var(--border-color)' }} />
        
        {history.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{ marginBottom: '35px', position: 'relative' }}
          >
            <div style={{ 
              position: 'absolute', left: '-36px', top: '5px', width: '12px', height: '12px', 
              borderRadius: '50%', backgroundColor: item.status === 'Current' ? 'var(--accent-emerald)' : 'var(--bg-primary)', 
              border: `2px solid ${item.status === 'Current' ? 'var(--accent-emerald)' : 'var(--border-color)'}` 
            }} />
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)', marginBottom: '5px' }}>{item.year}</div>
            <div style={{ fontSize: '1rem', fontWeight: '900', color: 'var(--text-primary)' }}>{item.event}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{item.actor}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', borderLeft: '4px solid var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          {"Değer Genetiği: $$V_{gen} = \\sum (Market_{yield} + Scarcity) \\cdot \\Delta t$$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
