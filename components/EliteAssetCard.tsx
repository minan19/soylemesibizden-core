"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, MapPin } from 'lucide-react';

export const EliteAssetCard = ({ data, displayMode = 'ALL' }: any) => {
  const price = displayMode === 'RENT' ? data.rentPrice : data.salePrice;
  const tag = displayMode === 'RENT' ? 'KİRALIK' : 'SATILIK';

  return (
    <Link href={`/asset/${data.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ padding: '30px', backgroundColor: 'var(--bg-secondary)', borderRadius: '24px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: '0.3s', position: 'relative' }} 
           onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-emerald)'}
           onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ padding: '6px 12px', backgroundColor: 'var(--bg-primary)', borderRadius: '8px', fontSize: '0.6rem', fontWeight: '950', border: '1px solid var(--border-color)' }}>
            {tag}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: '950' }}>
            <Activity size={14} /> IQ: {data.iqScore}
          </div>
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--text-primary)', marginBottom: '10px' }}>{data.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '25px' }}>
          <MapPin size={14} /> {data.location}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--text-primary)' }}>{price}</div>
          <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
            <ArrowRight size={16} color="var(--accent-emerald)" />
          </div>
        </div>
      </div>
    </Link>
  );
};
