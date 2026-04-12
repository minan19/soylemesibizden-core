"use client";
import React from 'react';
import { MessageSquare, ShieldCheck, Send, Lock } from 'lucide-react';

export const SovereignMessaging = () => {
  const messages = [
    { from: 'SID-8842', text: 'Industrial Energy Hub için son teklif revize edildi mi?', time: '14:02' },
    { from: 'SYSTEM', text: 'E2E Şifreleme Aktif. RSA-4096 Mühürlendi.', time: '14:01', system: true }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', height: '500px', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <MessageSquare size={20} color="var(--accent-emerald)" />
          <h4 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px' }}>INTEL EXCHANGE</h4>
        </div>
        <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>$$E2E_{SECURE}$$</div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '10px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.system ? 'center' : 'flex-start', maxWidth: '80%' }}>
            <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>{m.from} • {m.time}</div>
            <div style={{ padding: '15px', backgroundColor: m.system ? 'rgba(26,188,156,0.1)' : 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: '600' }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', position: 'relative' }}>
        <input 
          placeholder="İstihbarat Paylaş..."
          style={{ width: '100%', padding: '20px', paddingRight: '60px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', outline: 'none', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }} 
        />
        <button style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-emerald)' }}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
