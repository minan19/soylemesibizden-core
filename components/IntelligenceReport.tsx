"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, TrendingUp, MapPin, Calendar, Download, X } from 'lucide-react';
import { calculateInvestmentScore, getYieldProjection } from '../lib/intelligence';

export const IntelligenceReport = ({ isOpen, onClose, asset }: any) => {
  if (!isOpen || !asset) return null;

  const score = calculateInvestmentScore(asset);
  const projection = getYieldProjection(Number(asset.price));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 10001, backgroundColor: '#FFF', padding: '80px', overflowY: 'auto' }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* HEADER: OTORİTE MÜHÜRÜ */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0A0A0A', paddingBottom: '40px', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: '#1ABC9C', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '15px' }}>
              <ShieldCheck size={20} /> SOVEREIGN INTELLIGENCE DOSSIER
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: '950', color: '#0A0A0A', letterSpacing: '-2px', lineHeight: '1' }}>{asset.title}</h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginTop: '15px', fontWeight: '500' }}><MapPin size={18} style={{ display: 'inline', marginRight: '5px' }} /> {asset.location}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: '40px' }}><X size={40} /></button>
            <div style={{ fontSize: '2.5rem', fontWeight: '950', color: '#0A0A0A' }}>{asset.price}</div>
          </div>
        </header>

        {/* ANALİZ MATRİSİ */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', marginBottom: '80px' }}>
          <div>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '3px', color: '#AAA', marginBottom: '30px' }}>YATIRIM ANALİZİ VE SKORLAMA</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '8px solid #1ABC9C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '950' }}>
                %{score}
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: '950', color: '#0A0A0A' }}>AAA+ Yatırım Sınıfı</div>
                <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '5px' }}>Bu varlık, bölgesel arz-talep dengesinde en yüksek güven dilimindedir.</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['Fiyat Rasyonalitesi', 'Likidite Hızı', 'Hukuki Tamlık'].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '900', marginBottom: '8px' }}>
                    <span>{item}</span>
                    <span style={{ color: '#1ABC9C' }}>%95+</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: '#EEE', borderRadius: '2px' }}>
                    <div style={{ width: '95%', height: '100%', backgroundColor: '#0A0A0A' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ backgroundColor: '#FAFAFA', padding: '40px', borderRadius: '8px', border: '1px solid #EEE' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', color: '#0A0A0A', marginBottom: '25px' }}>24 AY GELECEK PROJEKSİYONU</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {projection.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: '10px' }}>
                  <span style={{ fontWeight: '900', fontSize: '0.75rem', color: '#666' }}>{p.period}</span>
                  <span style={{ fontWeight: '950', fontSize: '0.85rem' }}>₺ {p.value.toLocaleString('tr-TR')}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#1ABC9C', color: '#FFF', textAlign: 'center', borderRadius: '4px', fontWeight: '950', fontSize: '0.7rem' }}>
              BEKLENEN TOPLAM ARTIŞ: %42
            </div>
          </div>
        </div>

        {/* AKSİYON PANELİ */}
        <footer style={{ display: 'flex', gap: '20px', borderTop: '1px solid #EEE', paddingTop: '40px' }}>
          <button style={{ flex: 1, backgroundColor: '#0A0A0A', color: '#FFF', padding: '25px', fontWeight: '950', letterSpacing: '2px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <Download size={20} color="#1ABC9C" /> RAPORU PDF OLARAK İNDİR
          </button>
          <button style={{ flex: 1, backgroundColor: '#FFF', color: '#0A0A0A', border: '2px solid #0A0A0A', padding: '25px', fontWeight: '950', letterSpacing: '2px', fontSize: '0.8rem', cursor: 'pointer' }}>
            DANIŞMAN İLE GÖRÜŞME AYARLA
          </button>
        </footer>
      </div>
    </motion.div>
  );
};
