"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ShieldCheck, BarChart3, Users, MessageSquare, FileText, ArrowUpRight, Zap } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AdminDashboard() {
  const activeDeals = [
    { id: 'DEAL-01', client: 'Mustafa İnan', asset: 'Waterfront Mansion', status: 'Negotiation', value: '₺ 85M' },
    { id: 'DEAL-02', client: 'Sovereign Fund', asset: 'Energy Land', status: 'NDA Pending', value: '₺ 120M' }
  ];

  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FFF' }}>
      {/* SIDEBAR */}
      <aside style={{ width: '280px', borderRight: '1px solid #EEE', padding: '50px 25px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ fontSize: '0.9rem', fontWeight: '950', letterSpacing: '5px' }}>AUTHORITY<span style={{ color: '#1ABC9C' }}>HUB</span></div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'DEAL ROOMS', icon: MessageSquare, active: true },
            { label: 'ASSET VERIFICATION', icon: ShieldCheck },
            { label: 'LEAD TERMINAL', icon: Users },
            { label: 'INTEL REPORTS', icon: FileText }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '4px', backgroundColor: item.active ? '#F9F9F9' : 'transparent', color: item.active ? '#1ABC9C' : '#666', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '900' }}>
              <item.icon size={18} /> {item.label}
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: '80px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: '950', letterSpacing: '-1.5px' }}>Command Center</h2>
            <p style={{ color: '#AAA', fontWeight: '600', fontSize: '0.8rem', marginTop: '5px' }}>ACTIVE OPERATIONS & INTELLIGENCE FLOW</p>
          </div>
          <div style={{ padding: '15px 30px', backgroundColor: '#F4FBF9', border: '1px solid #E8F6F3', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Zap size={18} color="#1ABC9C" />
            <span style={{ fontSize: '0.75rem', fontWeight: '950', color: '#1ABC9C' }}>SYSTEM IQ: 99.4</span>
          </div>
        </header>

        {/* METRICS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '60px' }}>
          {[
            { label: 'PIPELINE VALUE', value: '₺ 2.4B' },
            { label: 'ACTIVE NEGOTIATIONS', value: '18' },
            { label: 'PENDING VERIFICATIONS', value: '4' }
          ].map((m, i) => (
            <div key={i} style={{ padding: '40px', border: '1px solid #EEE', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '15px' }}>{m.label}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: '950' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* ACTIVE DEALS TABLE */}
        <section>
          <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>LIVE DEAL OPERATIONS</h3>
          <div style={{ border: '1px solid #EEE', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ backgroundColor: '#FAFAFA' }}>
                <tr>
                  {['DEAL ID', 'CLIENT', 'ASSET', 'STATUS', 'VALUE', ''].map(h => (
                    <th key={h} style={{ padding: '20px', fontSize: '0.6rem', fontWeight: '950', color: '#AAA' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeDeals.map((deal, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F5F5F5' }}>
                    <td style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '900' }}>{deal.id}</td>
                    <td style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '800' }}>{deal.client}</td>
                    <td style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '800' }}>{deal.asset}</td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ padding: '6px 12px', backgroundColor: '#F9F9F9', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '950', color: '#1ABC9C', border: '1px solid #E8F6F3' }}>{deal.status}</span>
                    </td>
                    <td style={{ padding: '20px', fontSize: '0.8rem', fontWeight: '950' }}>{deal.value}</td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ABC9C' }}><ArrowUpRight size={20} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
