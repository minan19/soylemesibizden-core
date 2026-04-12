"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Lock, ShieldAlert } from 'lucide-react';

export const DarkPool = () => {
  const privateDeals = [
    { id: 'CONF-001', area: 'Çanakkale Boğaz Hattı', value: '₺ 285M', type: 'Stratejik Arazi', iqScore: 98 },
    { id: 'CONF-042', area: 'Muğla Kıyı Şeridi', value: '₺ 142M', type: 'Off-Market Portföy', iqScore: 94 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Ghost size={18} /> SOVEREIGN STEALTH POOL
          </div>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '950', marginTop: '10px', letterSpacing: '-1.5px' }}>Pazar Dışı İşlemler</h3>
        </div>
        <div style={{ padding: '12px', backgroundColor: 'var(--bg-primary)', borderRadius: '50%', border: '1px solid var(--border-color)' }}>
          <Lock size={22} color="var(--accent-emerald)" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {privateDeals.map((deal) => (
          <motion.div
            key={deal.id}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}
            style={{ padding: '30px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', backgroundColor: 'rgba(26,188,156,0.1)', padding: '4px 8px', borderRadius: '4px' }}>{deal.id}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>IQ: {deal.iqScore}</span>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{deal.area}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: '600' }}>{deal.type}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '-1px' }}>{deal.value}</div>
              <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px', marginTop: '5px' }}>GİZLİ TEKLİF AKTİF</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '25px', backgroundColor: 'rgba(26,188,156,0.03)', borderRadius: '20px', border: '1px dashed var(--accent-emerald)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
          <ShieldAlert size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
          <strong>Alpha Note:</strong> Bu havuzdaki varlıklar genel arama sonuçlarında mühürlenmiştir. Sadece Tier-1 yetkilendirmesi olan sermaye gruplarına açıktır.
        </p>
      </div>
    </div>
  );
};
