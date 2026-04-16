"use client";
import React from 'react';
import { Play, Maximize2 } from 'lucide-react';

interface VirtualTourProps {
  imageUrl?: string;
}

export const VirtualTour = ({ imageUrl }: VirtualTourProps) => (
  <div style={{ width: '100%', height: '350px', marginTop: '30px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)', backgroundColor: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', position: 'relative' }}>
    {imageUrl ? (
      <img src={imageUrl} alt="Virtual Tour" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      <>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(26,188,156,0.2)', border: '1px solid rgba(26,188,156,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Play size={28} color="#1ABC9C" />
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '3px', color: '#FFF', marginBottom: '8px' }}>360° SANAL TUR</div>
          <div style={{ fontSize: '0.6rem', color: '#888', fontWeight: '600' }}>Hazırlanıyor...</div>
        </div>
        <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
          <Maximize2 size={16} color="#888" />
        </div>
      </>
    )}
  </div>
);
