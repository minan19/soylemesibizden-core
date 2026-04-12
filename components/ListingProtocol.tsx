"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Tag, Key, Copy, CheckCircle2 } from 'lucide-react';

export const ListingProtocol = () => {
  const [listingType, setListingType] = useState('SALE'); // 'SALE', 'RENT', 'DUAL'
  const [isSynced, setIsSynced] = useState(false);

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', marginBottom: '40px' }}>
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <RefreshCw size={18} /> ASSET SYNCHRONIZATION
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px', color: 'var(--text-primary)' }}>İlan Modu Yönetimi</h3>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        {[
          { id: 'SALE', label: 'SADECE SATILIK', icon: Tag },
          { id: 'RENT', label: 'SADECE KİRALIK', icon: Key },
          { id: 'DUAL', label: 'ÇİFT MOD (SATILIK + KİRALIK)', icon: Copy }
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => setListingType(mode.id)}
            style={{ 
              flex: 1, padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)', 
              backgroundColor: listingType === mode.id ? 'var(--text-primary)' : 'var(--bg-primary)',
              color: listingType === mode.id ? 'var(--bg-primary)' : 'var(--text-primary)',
              cursor: 'pointer', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'
            }}
          >
            <mode.icon size={20} />
            <span style={{ fontSize: '0.65rem', fontWeight: '950' }}>{mode.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {listingType === 'DUAL' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px dashed var(--accent-emerald)', textAlign: 'center' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: '800' }}>
              <CheckCircle2 size={16} /> TÜM ÖZELLİKLER OTOMATİK SENKRONİZE EDİLDİ
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
              Varlık özellikleri tek bir çekirdekten çekilecek, her iki ilan türü için de geçerli olacaktır.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
          {"Senkronizasyon Katsayısı: $$U_{sync} = \\sum (Specs) \\times \\delta(ListingType)$$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
