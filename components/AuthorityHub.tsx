"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ShieldAlert, Key, Users, GlobeLock, Zap, ServerCrash } from 'lucide-react';

export const AuthorityHub = () => {
  const clearanceLevels = [
    { level: 'LEVEL_MASTER', role: 'SİSTEM KURUCU (MUSTAFA İNAN)', status: 'ACTIVE', users: 1 },
    { level: 'LEVEL_5', role: 'STRATEJİK YATIRIMCI / DARK POOL', status: 'STRICT', users: 14 },
    { level: 'LEVEL_3', role: 'ONAYLI ARACI KURUM', status: 'MONITORED', users: 42 }
  ];

  const nodeStatus = [
    { region: 'FRANKFURT_01', latency: '12ms', health: '99.9%' },
    { region: 'ISTANBUL_CORE', latency: '0.8ms', health: '100%' },
    { region: 'DUBAI_PROXY', latency: '45ms', health: '98.4%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Erişim Hiyerarşisi Paneli */}
      <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '3px', marginBottom: '25px' }}>
          <ShieldAlert size={18} /> ERİŞİM HİYERARŞİSİ VE YETKİLENDİRME
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {clearanceLevels.map((c, i) => (
            <div key={i} style={{ padding: '20px 25px', backgroundColor: 'var(--bg-primary)', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ padding: '10px', backgroundColor: i === 0 ? 'var(--text-primary)' : 'rgba(26,188,156,0.1)', borderRadius: '12px' }}>
                  <Users size={18} color={i === 0 ? '#FFF' : 'var(--accent-emerald)'} />
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '950', color: i === 0 ? 'var(--text-primary)' : 'inherit' }}>{c.level}</div>
                  <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{c.role}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{c.status}</div>
                <div style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-secondary)' }}>{c.users} NOD AKTİF</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Altyapı ve Güvenlik Çekirdeği */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* API & Şifreleme */}
        <div style={{ padding: '30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '3px', marginBottom: '20px' }}>
            <Key size={16} /> ŞİFRELEME ROTASYONU
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)' }}>MASTER KEY (RSA-4096)</span>
              <span style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>SENKRONİZE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)' }}>BİYOMETRİK VERİ (HASH)</span>
              <span style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>LOCKED</span>
            </div>
            <button style={{ marginTop: '10px', width: '100%', padding: '15px', backgroundColor: 'transparent', color: 'var(--text-primary)', borderRadius: '12px', border: '1px solid var(--text-primary)', fontWeight: '950', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Zap size={14} /> ANAHTARLARI YENİLE
            </button>
          </div>
        </div>

        {/* Global Node Status */}
        <div style={{ padding: '30px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: '1px solid var(--text-primary)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
           <motion.div animate={{ opacity: [0.05, 0.1, 0.05] }} transition={{ repeat: Infinity, duration: 3 }} style={{ position: 'absolute', top: '-10px', right: '-10px' }}>
             <GlobeLock size={120} color="#FFF" />
           </motion.div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFF', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '3px', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
            <ServerCrash size={16} /> KÜRESEL SİNİR AĞI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 10 }}>
            {nodeStatus.map((n, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', padding: '10px 15px', borderRadius: '10px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '1px' }}>{n.region}</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '600', opacity: 0.8 }}>{n.latency}</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{n.health}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Matematiksel Mühür */}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Otorite Fonksiyonu: $$ \\Gamma_{auth} = \\oint (\\text{Key}_{bio} \\otimes \\text{Clearance}_{level}) \\, d\\mathcal{N} \\equiv \\text{Master}_{control} $$ mühürlenmiştir."}
        </p>
      </div>

    </div>
  );
};
