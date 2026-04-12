"use client";
import React from 'react';

export const SovereignPerformanceChart = () => {
  const data = [30, 45, 35, 60, 85, 95, 100];
  
  return (
    <div style={{ width: '100%', height: '300px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '30px' }}>
      {data.map((val, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div 
            style={{ 
              width: '100%', 
              height: `${val}%`, 
              backgroundColor: i === data.length - 1 ? '#1ABC9C' : '#F5F5F5',
              borderRadius: '4px',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }} 
          />
          <span style={{ fontSize: '0.6rem', fontWeight: '900', color: '#AAA' }}>Q{i + 1}</span>
        </div>
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderBottom: '1px dashed #EEE' }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderBottom: '1px dashed #EEE' }} />
    </div>
  );
};
