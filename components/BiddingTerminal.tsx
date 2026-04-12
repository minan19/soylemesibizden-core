"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, Clock, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

export const BiddingTerminal = ({ asset }: any) => {
  const [timeLeft, setTimeLeft] = useState("04:22:15");
  const [bidValue, setBidValue] = useState("");

  return (
    <div style={{ marginTop: '60px', padding: '50px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.02)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ padding: '12px', backgroundColor: '#F4FBF9', borderRadius: '50%' }}>
            <Gavel size={24} color="#1ABC9C" />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '3px' }}>BLIND AUCTION ACTIVE</div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '950', letterSpacing: '-1px' }}>Kör Müzayede Odası</h3>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', color: '#E74C3C' }}>
            <Clock size={18} />
            <span style={{ fontSize: '1.5rem', fontWeight: '950', fontFamily: 'monospace' }}>{timeLeft}</span>
          </div>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '1px', marginTop: '5px' }}>KALAN SÜRE</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        <div style={{ padding: '30px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '10px' }}>BAŞLANGIÇ BEDELİ</div>
          <div style={{ fontSize: '2rem', fontWeight: '950' }}>₺ 72.000.000</div>
        </div>
        <div style={{ padding: '30px', backgroundColor: '#F9F9F9', borderRadius: '12px', border: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '10px' }}>AKTİF KATILIMCI</div>
          <div style={{ fontSize: '2rem', fontWeight: '950' }}>14 <span style={{ fontSize: '0.8rem', color: '#1ABC9C' }}>Verified</span></div>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '30px' }}>
        <input 
          type="number" 
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          placeholder="Gizli Teklifinizi Girin"
          style={{ width: '100%', padding: '30px', border: '2px solid #EEE', borderRadius: '8px', fontSize: '1.5rem', fontWeight: '950', outline: 'none', transition: 'border-color 0.3s' }}
        />
        <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '10px', color: '#AAA' }}>
          <ShieldCheck size={20} />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '1px' }}>ENCRYPTED</span>
        </div>
      </div>

      <button style={{ width: '100%', padding: '25px', backgroundColor: '#0A0A0A', color: '#1ABC9C', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.85rem', letterSpacing: '4px', cursor: 'pointer', transition: 'transform 0.2s' }}>
        TEKLİFİ MÜHÜRLE VE GÖNDER
      </button>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FDF7F2', borderRadius: '8px', border: '1px solid #FAD7BC', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <AlertCircle size={20} color="#E67E22" />
        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#D35400', margin: 0 }}>
          Dikkat: Kör müzayede kuralları gereği teklifiniz diğer katılımcılara gösterilmez. Sadece en yüksek ağırlıklı teklif "Sovereign" tarafından onaylanır.
        </p>
      </div>
    </div>
  );
};
