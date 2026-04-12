"use client";
import React from 'react';
import { Search, Filter, ArrowUpRight, Zap } from 'lucide-react';
import Link from 'next/link';

export const DiscoverySuite = ({ matches }: { matches: any[] }) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px' }}>Sovereign Discovery Suite</h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ padding: '12px 20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Search size={16} color="var(--text-secondary)" />
            <input placeholder="Varlık Ara..." style={{ background: 'none', border: 'none', outline: 'none', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-primary)' }} />
          </div>
          <button style={{ padding: '12px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50%', color: 'var(--text-primary)' }}>
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
        {matches.map((asset) => (
          <div key={asset.id} style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '200px', backgroundColor: '#EEE' }}></div>
            <div style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '2px' }}>MATCH: %{asset.matchRate}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)' }}>IQ: {asset.iq}</span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '950', marginBottom: '10px' }}>{asset.title}</h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '25px' }}>{asset.location}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '950', color: 'var(--text-primary)' }}>{asset.price}</div>
                <Link href={`/listing/${asset.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem' }}>
                    İSTİHBARATI GÖR <ArrowUpRight size={16} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
