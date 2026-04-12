"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Key, CheckCircle2, RefreshCw } from 'lucide-react';

export const SovereignListingEngine = () => {
  // Çoklu seçim desteği (Array state)
  const [activeModes, setActiveModes] = useState<string[]>(['SALE']);

  const toggleMode = (mode: string) => {
    setActiveModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const isDual = activeModes.includes('SALE') && activeModes.includes('RENT');

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', marginBottom: '40px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <RefreshCw size={18} /> LISTING STRATEGY ENGINE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Stratejik Listeleme Modu</h3>
        </div>
        {isDual && (
          <div style={{ padding: '6px 12px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950' }}>
            HİBRİT AKTİF
          </div>
        )}
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '35px' }}>
        <button
          onClick={() => toggleMode('SALE')}
          style={{ 
            flex: 1, padding: '25px', borderRadius: '16px', border: '1px solid var(--border-color)', 
            backgroundColor: activeModes.includes('SALE') ? 'var(--text-primary)' : 'var(--bg-primary)',
            color: activeModes.includes('SALE') ? 'var(--bg-primary)' : 'var(--text-primary)',
            cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '15px'
          }}
        >
          <Tag size={20} />
          <span style={{ fontSize: '0.75rem', fontWeight: '950' }}>SATILIK İLANI</span>
        </button>

        <button
          onClick={() => toggleMode('RENT')}
          style={{ 
            flex: 1, padding: '25px', borderRadius: '16px', border: '1px solid var(--border-color)', 
            backgroundColor: activeModes.includes('RENT') ? 'var(--text-primary)' : 'var(--bg-primary)',
            color: activeModes.includes('RENT') ? 'var(--bg-primary)' : 'var(--text-primary)',
            cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '15px'
          }}
        >
          <Key size={20} />
          <span style={{ fontSize: '0.75rem', fontWeight: '950' }}>KİRALIK İLANI</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <AnimatePresence>
          {activeModes.includes('SALE') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', display: 'block', marginBottom: '10px' }}>SATIŞ FİYATI</label>
              <input placeholder="₺ 4.250.000" style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '700' }} />
            </motion.div>
          )}
          {activeModes.includes('RENT') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <label style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', display: 'block', marginBottom: '10px' }}>AYLIK KİRA BEDELİ</label>
              <input placeholder="₺ 25.000" style={{ width: '100%', padding: '12px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontWeight: '700' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activeModes.length > 0 && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '800' }}>
            <CheckCircle2 size={16} /> MERKEZİ VERİ SENKRONİZE EDİLDİ
          </div>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
            {isDual ? "Bu varlık hem satış hem kiralama pazarında eşzamanlı olarak mühürlenmiştir." : "Seçili mod uyarınca varlık verileri optimize edilmiştir."}
          </p>
        </div>
      )}

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Hibrit Karar Matrisi: $$L_{strategy} = \\{Sale, Rent\\} \\in \\text{UniversalAsset}$$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
