"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { EyeOff, Ghost, Lock } from 'lucide-react';

export const DarkPoolMatrix = () => {
  const privateDeals = [
    { id: 'CONF-001', area: 'Çanakkale Boğaz Hattı', value: '₺ 285M', type: 'Land / Strategic', score: 98 },
    { id: 'CONF-042', area: 'Muğla Kıyı Şeridi', value: '₺ 142M', type: 'Off-Market Estate', score: 94 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#0A0A0A', border: '1px solid #1A1A1A', borderRadius: '28px', color: '#FFF' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Ghost size={18} /> SOVEREIGN DARK POOL
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '950', marginTop: '10px', color: '#FFF' }}>Pazar Dışı İşlemler</h3>
        </div>
        <Lock size={24} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {privateDeals.map((deal, i) => (
          <motion.div key={i} style={{ padding: '25px', backgroundColor: '#111', borderRadius: '16px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', marginBottom: '5px' }}>{deal.id}</div>
              <div style={{ fontSize: '1rem', fontWeight: '900' }}>{deal.area} (IQ: {deal.score})</div>
              <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px' }}>{deal.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{deal.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '12px', border: '1px solid #222' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', margin: 0 }}>
          <strong>Alpha Note:</strong> Bu havuzdaki varlıklar genel arama sonuçlarında (SEO) mühürlenmiştir.
        </p>
      </div>
    </div>
  );
};
