"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, FileText, Send, CheckCircle2, Clock, ShieldCheck, Scale } from 'lucide-react';
import { SmartSeal } from './SmartSeal';
import { LegalExecution } from './LegalExecution';

export const DealRoom = ({ isOpen, onClose, asset }: any) => {
  const [offerSent, setOfferSent] = useState(false);
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      style={{ position: 'fixed', inset: 0, zIndex: 10005, backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(30px)', display: 'flex' }}
    >
      <div style={{ flex: 1, padding: '60px 80px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1ABC9C', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '15px' }}>
              <Lock size={18} /> TRANSACTION TERMINAL V1
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1.5px' }}>{asset.title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0A0A0A' }}><X size={40} /></button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '80px' }}>
          <section>
            <div style={{ backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', padding: '50px', boxShadow: '0 30px 60px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '40px' }}>RESMİ TEKLİF & MÜHÜR</h3>
              
              {!offerSent ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', fontWeight: '950', color: '#AAA' }}>₺</span>
                    <input 
                      type="text" 
                      placeholder="Teklif Tutarı"
                      style={{ width: '100%', padding: '25px 25px 25px 50px', border: '2px solid #F5F5F5', borderRadius: '8px', fontSize: '1.5rem', fontWeight: '950', outline: 'none' }}
                    />
                  </div>
                  <button 
                    onClick={() => setOfferSent(true)}
                    style={{ backgroundColor: '#0A0A0A', color: '#1ABC9C', padding: '25px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '3px', cursor: 'pointer', border: 'none', borderRadius: '8px' }}
                  >
                    TEKLİFİ SOVEREIGN İMZASIYLA MÜHÜRLE
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <SmartSeal id={asset.id} />
                  <div style={{ fontSize: '1.2rem', fontWeight: '950', marginTop: '20px', color: '#1ABC9C' }}>TEKLİF MÜHÜRLENDİ</div>
                  <p style={{ color: '#AAA', fontWeight: '600', marginTop: '10px' }}>Teklifiniz Blockchain tabanlı SÖYLEMESİ BİZDEN protokolü ile mühürlenerek mülk sahibine iletildi.</p>
                </div>
              )}
            </div>

            <LegalExecution />
          </section>

          <aside>
             <div style={{ border: '1px solid #EEE', padding: '40px', borderRadius: '12px', backgroundColor: '#FDFDFD' }}>
                <h3 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>İŞLEM GÜVENLİK NOTLARI</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  {[
                    { label: 'Blockchain Hashing', desc: 'Tüm teklifler değişmez bir hash ile mühürlenir.' },
                    { label: 'Legal Escrow', desc: 'Kapora ödemeleri Sovereign yediemin kontrolündedir.' },
                    { label: 'Verified Sellers', desc: 'Mülk sahipleri sivil ve hukuki denetimden geçmiştir.' }
                  ].map((note, i) => (
                    <div key={i} style={{ display: 'flex', gap: '15px' }}>
                      <ShieldCheck size={20} color="#1ABC9C" style={{ flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '950' }}>{note.label}</div>
                        <div style={{ fontSize: '0.7rem', color: '#AAA', fontWeight: '600', marginTop: '4px' }}>{note.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};
