"use client";
import React from 'react';
import { Columns, CheckCircle2, XCircle, BarChart2 } from 'lucide-react';

export const AssetComparison = () => {
  const assets = [
    { name: 'Asset #E21 (Beylikdüzü)', iq: 98.2, citizenship: 'Uygun', roi: '%214' },
    { name: 'Asset #M44 (Muğla)', iq: 94.5, citizenship: 'Uygun', roi: '%156' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
          <Columns size={18} /> ASSET COMPARISON MATRIX
        </div>
      </header>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <th style={{ textAlign: 'left', padding: '15px 0', fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>PARAMETRE</th>
            {assets.map((a, i) => (
              <th key={i} style={{ textAlign: 'center', padding: '15px 0', fontSize: '0.75rem', fontWeight: '950' }}>{a.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Intelligence IQ', keys: ['98.2', '94.5'] },
            { label: 'Vatandaşlık', keys: ['EVET', 'EVET'] },
            { label: 'Öngörülen ROI', keys: ['%214', '%156'] }
          ].map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '20px 0', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{row.label}</td>
              {row.keys.map((val, idx) => (
                <td key={idx} style={{ textAlign: 'center', padding: '20px 0', fontSize: '0.9rem', fontWeight: '950', color: 'var(--text-primary)' }}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>
        DETAYLI KARŞILAŞTIRMALI PDF OLUŞTUR
      </button>
    </div>
  );
};
