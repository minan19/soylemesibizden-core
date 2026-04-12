"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../components/Sidebar';
import { GlobalHeader } from '../../components/GlobalHeader';
import { MarketRadarDepth } from '../../components/MarketRadarDepth';
import { GlobalPulseMonitor } from '../../components/GlobalPulseMonitor';
import { Activity, Zap, TrendingUp, Target } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function MarketRadarPage() {
  const regions = [
    { name: 'Çanakkale / Lapseki', status: 'HIZLI ARTIŞ', risk: 'Düşük', pulse: 92 },
    { name: 'Muğla / Milas', status: 'DOYGUNLUK', risk: 'Orta', pulse: 74 },
    { name: 'İstanbul / Beylikdüzü', status: 'LİKİDİTE YÜKSEK', risk: 'Düşük', pulse: 88 }
  ];

  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-3px' }}>Market Radar</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: '500' }}>Gerçek zamanlı piyasa resonansı ve duyarlılık matrisi.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px' }}>
            {/* Sol: Isı Haritası ve Analiz */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ padding: '50px', backgroundColor: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '30px' }}>
                  <Target size={20} /> PRECISION HEATMAP
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {regions.map((reg, i) => (
                    <div key={i} style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>{reg.name}</div>
                          <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--accent-emerald)', marginTop: '5px' }}>{reg.status}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>RISK SKORU</div>
                          <div style={{ fontSize: '1rem', fontWeight: '950' }}>{reg.risk}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <MarketRadarDepth />
            </section>

            {/* Sağ: Global Pulse & Sentiment */}
            <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <GlobalPulseMonitor />
              <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '28px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '25px' }}>SENTIMENT ANALYSIS</h4>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '900' }}>ALICI İŞTAHI</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--accent-emerald)' }}>%84</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '84%', height: '100%', backgroundColor: 'var(--accent-emerald)' }} />
                  </div>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                  {"Momentum Algoritması: $$ M_{radar} = \\frac{\\Delta P}{\\Delta t} \\cdot \\text{IQ}_{region} $$ mühürlenmiştir."}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
