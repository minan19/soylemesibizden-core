"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Save, MapPin, DollarSign, FileText, Box, ShieldCheck, Zap } from 'lucide-react';

export const ListingEntryForm = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Temel Bilgiler Katmanı */}
      <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '25px' }}>
          <FileText size={16} /> GENEL VARLIK MATRİSİ
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>İLAN BAŞLIĞI</label>
            <input type="text" placeholder="Örn: Çanakkale Stratejik Tarla" style={{ padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: '#FFF', fontWeight: '600' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)' }}>KONUM (İL/İLÇE)</label>
            <input type="text" placeholder="Örn: Muğla, Milas" style={{ padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: '#FFF', fontWeight: '600' }} />
          </div>
        </div>
      </div>

      {/* Finansal ve Hukuki Projeksiyon */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
        <div style={{ padding: '30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>
            <DollarSign size={16} /> FİNANSAL VERİ
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
             <input type="text" placeholder="Satış Fiyatı (₺)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontWeight: '700' }} />
             <input type="text" placeholder="Kira Getirisi (₺)" style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontWeight: '700' }} />
          </div>
        </div>

        <div style={{ padding: '30px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>
            <ShieldCheck size={16} /> HUKUKİ DURUM
          </div>
          <select style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontWeight: '700' }}>
            <option>İMARLI (KONUT)</option>
            <option>İMARLI (TİCARİ)</option>
            <option>TARLA STATÜSÜ</option>
          </select>
        </div>
      </div>

      {/* Kaydet ve Mühürle */}
      <button style={{ padding: '25px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '20px', border: 'none', fontWeight: '950', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', cursor: 'pointer', transition: '0.3s' }}>
        <Save size={24} /> VARLIĞI SİSTEME MÜHÜRLE
      </button>
    </div>
  );
};
