"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, EyeOff, ShieldAlert, Activity, Database, Key } from 'lucide-react';

const EncryptedText = ({ text }: { text: string }) => {
  const [display, setDisplay] = useState(text.replace(/[a-zA-Z0-9]/g, '█'));
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplay(text);
    }, 1500); // 1.5 saniye sonra şifre çözülür
    return () => clearTimeout(timeout);
  }, [text]);

  return <span>{display}</span>;
};

export const DarkPoolTerminal = () => {
  const hiddenAssets = [
    { id: 'DP-001', region: 'ÇANAKKALE / AYVACIK', type: 'STRATEJİK ARAZİ', volume: '₺ 45.000.000', clearance: 'LEVEL_5' },
    { id: 'DP-002', region: 'MUĞLA / GÖCEK', type: 'GİZLİ MARİNA PROJESİ', volume: '₺ 120.000.000', clearance: 'LEVEL_5' },
    { id: 'DP-003', region: 'İSTANBUL / LEVENT', type: 'KAPALI FON BLOĞU', volume: '₺ 850.000.000', clearance: 'LEVEL_MASTER' }
  ];

  return (
    <div style={{ padding: '50px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Güvenlik Izgarası Arka Planı */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(45deg, var(--border-color) 0, var(--border-color) 1px, transparent 1px, transparent 10px)', opacity: 0.1 }} />

      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '4px' }}>
            <EyeOff size={20} /> SOVEREIGN DARK POOL
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '950', marginTop: '10px', letterSpacing: '-1.5px' }}>Piyasa Dışı Likidite</h2>
          <p style={{ color: 'var(--text-secondary)', fontWeight: '600', marginTop: '5px' }}>Sadece yetkilendirilmiş kurumsal nodlar için kapalı devre mülkiyet tahtası.</p>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#FFF', borderRadius: '50%', border: '2px dashed var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
            <Lock size={32} color="var(--accent-emerald)" />
          </motion.div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 10 }}>
        {hiddenAssets.map((asset, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.4 }}
            style={{ padding: '25px 30px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr', alignItems: 'center', gap: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ padding: '10px', backgroundColor: 'rgba(26,188,156,0.1)', borderRadius: '12px' }}>
                <Key size={18} color="var(--accent-emerald)" />
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>ASSET_ID</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{asset.id}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>COORDINATE / TYPE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '950' }}><EncryptedText text={asset.region} /></div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-emerald)' }}><EncryptedText text={asset.type} /></div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>GİZLİ HACİM</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '950' }}><EncryptedText text={asset.volume} /></div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ padding: '8px 15px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>
                <ShieldAlert size={14} /> {asset.clearance}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#FFF', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Activity size={24} color="var(--accent-emerald)" />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>ZERO-KNOWLEDGE PROTOCOL: ACTIVE</div>
            <div style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Tüm işlemler blokzincir altyapısında şifrelenmiştir.</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '5px' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }} style={{ width: '8px', height: '24px', backgroundColor: 'var(--accent-emerald)', borderRadius: '4px' }} />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Karanlık Havuz: $$ \\Lambda_{dark} = \\sum_{i=1}^{n} (Asset_{hidden} \\cdot Liquidity) \\oplus \\text{Zero}_{knowledge} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
