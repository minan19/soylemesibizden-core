"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, BarChart3, ShieldCheck, Globe, TrendingUp, Activity } from 'lucide-react';

export const PortfolioVaultV2 = () => {
  const correlations = [
    { asset: 'BIST 100', corr: 0.12, beta: 0.45 },
    { asset: 'GOLD (XAU)', corr: 0.84, beta: 0.12 },
    { asset: 'BTC / USD', corr: -0.05, beta: 0.88 }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Wallet size={18} /> ELITE PORTFOLIO v2
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Küresel Korelasyon Zırhı</h3>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)' }}>SHARPE RATIO</div>
           <div style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>3.42</div>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
        {correlations.map((item, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '18px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.corr > 0.5 ? 'var(--accent-emerald)' : 'var(--text-primary)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: '900' }}>{item.asset}</span>
            </div>
            <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
              <div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '900' }}>CORR ($$ \rho $$)</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{item.corr}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '900' }}>BETA ($$ \beta $$)</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '950' }}>{item.beta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '15px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <ShieldCheck size={20} color="var(--accent-emerald)" />
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Portföy, küresel volatiliteye karşı <strong>anti-korele</strong> olarak mühürlenmiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Optimizasyon: $$ \Phi = \frac{E[R_p - R_f]}{\sigma_p} \oplus \text{Sovereign}_{adj} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
