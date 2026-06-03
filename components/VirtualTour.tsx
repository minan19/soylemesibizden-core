import React from 'react';
import { Globe } from 'lucide-react';

export const VirtualTour = ({ imageUrl }: { imageUrl: string }) => (
  <div style={{ width: '100%', height: '350px', marginTop: '30px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A', gap: '12px' }}>
    <Globe size={32} color="#00C49F" />
    <p style={{ color: '#94A3B8', fontSize: '0.7rem', fontWeight: '600', letterSpacing: '2px' }}>
      360° SANAL TUR
    </p>
    {imageUrl && (
      <img src={imageUrl} alt="Mülk görseli" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }} />
    )}
  </div>
);
