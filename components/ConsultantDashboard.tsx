"use client";
import React from 'react';
import { BarChart3, Users, FileText, MessageSquare, ShieldCheck } from 'lucide-react';

export const ConsultantDashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#F9F9F9' }}>
      {/* SIDEBAR: OTORİTE KONTROL */}
      <aside style={{ width: '280px', backgroundColor: '#0A0A0A', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ color: '#FFF', fontSize: '1rem', fontWeight: '950', letterSpacing: '4px', textAlign: 'center' }}>
          AUTHORITY<span style={{ color: '#1ABC9C' }}>PANEL</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { label: 'ACTIVE DEALS', icon: BarChart3, count: 4 },
            { label: 'CONCIERGE LEADS', icon: Users, count: 12 },
            { label: 'REPORT REQUESTS', icon: FileText, count: 8 },
            { label: 'DEAL ROOMS', icon: MessageSquare, count: 3 }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', borderRadius: '4px', cursor: 'pointer', backgroundColor: i === 0 ? '#111' : 'transparent', color: i === 0 ? '#1ABC9C' : '#666' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <item.icon size={18} />
                 <span style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '1px' }}>{item.label}</span>
               </div>
               <span style={{ fontSize: '0.65rem', fontWeight: '950' }}>{item.count}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* MAIN: İŞLEM MERKEZİ */}
      <main style={{ flex: 1, padding: '60px', overflowY: 'auto' }}>
        <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '950', letterSpacing: '-1px' }}>Danışman İstihbarat Paneli</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#FFF', padding: '12px 25px', borderRadius: '50px', border: '1px solid #EEE' }}>
            <ShieldCheck size={20} color="#1ABC9C" />
            <span style={{ fontWeight: '900', fontSize: '0.75rem' }}>DANIŞMAN IQ: 99.2</span>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* AKTİF TALEPLER LİSTESİ */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #EEE', padding: '30px' }}>
            <h3 style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', color: '#AAA', marginBottom: '25px' }}>SON GELEN TALEPLER (CONCIERGE)</h3>
            {/* Dinamik liste buraya gelecek */}
          </div>

          {/* HIZLI ANALİZ ARAÇLARI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ backgroundColor: '#0A0A0A', color: '#FFF', padding: '30px', borderRadius: '8px' }}>
               <h4 style={{ fontSize: '0.65rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px', marginBottom: '15px' }}>QUICK REPORT GEN</h4>
               <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '20px' }}>Seçili portföyler için anlık Signature Report üretin.</p>
               <button style={{ width: '100%', padding: '15px', background: '#1ABC9C', color: '#000', border: 'none', fontWeight: '950', cursor: 'pointer' }}>RAPOR OLUŞTUR</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
