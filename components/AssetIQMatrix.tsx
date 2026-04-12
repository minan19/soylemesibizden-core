"use client";
import React from 'react';
import { TrendingUp, MapPin, ShieldCheck, Zap } from 'lucide-react';

export const AssetIQMatrix = () => {
  const metrics = [
    { label: 'Konum Skoru (E-5 / AVM)', val: '98/100', icon: MapPin },
    { label: 'Vatandaşlık Uyumu', val: '%100', icon: ShieldCheck },
    { label: 'Yatırım Getirisi (ROI)', val: '+%12.4', icon: TrendingUp }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '30px' }}>GAYRİMENKUL DEĞER MATRİSİ</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <m.icon size={20} color="var(--accent-emerald)" style={{ marginBottom: '10px' }} />
            <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{m.val}</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', marginTop: '5px' }}>{m.label}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px', backgroundColor: 'var(--text-primary)', borderRadius: '12px', color: 'var(--bg-primary)' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--accent-emerald)', marginBottom: '10px' }}>AI EXECUTIVE SUMMARY</div>
        <p style={{ fontSize: '0.8rem', lineHeight: '1.6', margin: 0 }}>
          { "Beylikdüzü aksındaki bu varlık, ulaşım hızı ve ticari likiditesi nedeniyle Tier-1 yatırım sınıfında mühürlenmiştir." }
        </p>
      </div>
    </div>
  );
};
