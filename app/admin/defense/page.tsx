"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ChevronLeft, ShieldCheck, Zap, Terminal, Activity } from 'lucide-react';
import Link from 'next/link';
import { GlobalIndex } from '../../../components/GlobalIndex';
import { DefenseEngine } from '../../../components/DefenseEngine';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function DefenseTerminal() {
  return (
    <div className={montserrat.className} style={{ minHeight: '100vh', backgroundColor: '#FAFAFA', color: '#0A0A0A' }}>
      <GlobalIndex />
      <nav style={{ padding: '25px 80px', backgroundColor: '#FFF', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: '#0A0A0A', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: '950' }}>
          <ChevronLeft size={20} /> DASHBOARD
        </Link>
        <div style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '5px' }}>SÖYLEMESİ<span style={{ color: '#1ABC9C' }}>BİZDEN</span> // DEFENSE</div>
        <div style={{ width: '100px' }}></div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 40px' }}>
        <header style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1ABC9C', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>
             <ShieldCheck size={20} /> CYBER INTELLIGENCE UNIT
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-2px' }}>Defense Command</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', fontWeight: '500', marginTop: '15px' }}>Platform siber güvenliği ve veri bütünlüğü anlık olarak mühürlenmektedir.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '60px' }}>
          <section>
            <DefenseEngine />
            
            <div style={{ marginTop: '60px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px' }}>
               <h3 style={{ fontSize: '1rem', fontWeight: '950', letterSpacing: '1px', marginBottom: '30px' }}>TRAFFIC INTELLIGENCE</h3>
               <div style={{ height: '200px', width: '100%', backgroundColor: '#F9F9F9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={40} color="#1ABC9C" />
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#AAA', marginLeft: '20px' }}>REAL-TIME ANALYTICS STREAM</span>
               </div>
            </div>
          </section>

          <aside>
            <div style={{ padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', position: 'sticky', top: '120px' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>DEFENSE STATS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {[
                  { label: 'UPTIME', value: '99.99%', icon: Zap },
                  { label: 'THREATS MITIGATED', value: '1.422', icon: ShieldCheck },
                  { label: 'LAST SCAN', value: 'Saniyeler Önce', icon: Terminal }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <item.icon size={20} color="#1ABC9C" />
                    <div>
                      <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA' }}>{item.label}</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
