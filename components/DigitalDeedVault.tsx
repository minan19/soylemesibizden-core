"use client";
import React from 'react';
import { FileText, Lock, Download, ExternalLink, ShieldAlert } from 'lucide-react';

export const DigitalDeedVault = () => {
  const documents = [
    { title: 'Güncel Tapu Kaydı', type: 'PDF', size: '2.4 MB', status: 'VERIFIED' },
    { title: 'İmar Durum Belgesi', type: 'PDF', size: '4.1 MB', status: 'VERIFIED' },
    { title: 'Hukuki Temizlik Raporu', type: 'PDF', size: '1.8 MB', status: 'SECURED' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Lock size={18} /> DIGITAL DEED VAULT
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Hukuki Kasa</h3>
        </div>
        <ShieldAlert size={24} color="var(--accent-emerald)" />
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {documents.map((doc, i) => (
          <div key={i} style={{ padding: '20px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <FileText size={20} color="var(--text-secondary)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '900' }}>{doc.title}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{doc.type} • {doc.size}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}><Download size={16} /></button>
              <button style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--accent-emerald)', border: 'none', color: '#FFF', cursor: 'pointer' }}><ExternalLink size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '1px' }}>
          TÜM BELGELER BLOCKCHAIN MÜHRÜ İLE KORUNMAKTADIR
        </div>
      </div>
    </div>
  );
};
