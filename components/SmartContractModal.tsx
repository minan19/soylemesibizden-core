"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, FileSignature, CheckCircle2, ShieldCheck, X, Zap, Loader2 } from 'lucide-react';

export const SmartContractModal = ({ isOpen, onClose, assetId = 'DP-001' }: any) => {
  const [step, setStep] = useState(1);

  // Modal kapandığında state'i sıfırla
  useEffect(() => {
    if (!isOpen) setStep(1);
  }, [isOpen]);

  const handleSignature = () => {
    setStep(2); // İşleniyor durumuna geç
    setTimeout(() => {
      setStep(3); // Başarılı durumuna geç
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Arka Plan Buğusu (Blur) */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(248, 250, 252, 0.8)', backdropFilter: 'blur(10px)' }}
        />

        {/* Modal Kutusu */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{ width: '100%', maxWidth: '500px', backgroundColor: '#FFF', borderRadius: '32px', border: '1px solid var(--accent-emerald)', boxShadow: '0 40px 80px rgba(26,188,156,0.15)', position: 'relative', overflow: 'hidden', padding: '40px' }}
        >
          {/* Kapat Butonu */}
          <button onClick={onClose} style={{ position: 'absolute', top: '25px', right: '25px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <X size={24} />
          </button>

          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', marginBottom: '20px' }}>
                <FileSignature size={40} color="var(--accent-emerald)" />
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px' }}>Kontrat Onayı</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '30px' }}>
                <strong style={{ color: 'var(--text-primary)' }}>{assetId}</strong> referanslı mülkiyet devri için akıllı kontrat başlatılıyor.
              </p>

              <div style={{ width: '100%', padding: '20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '30px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>İŞLEM BEDELİ</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '950' }}>₺ 8.500.000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>AĞ ÜCRETİ</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '950' }}>₺ 0.00 (Sovereign Node)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>ŞİFRELEME</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '950', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ShieldCheck size={14} /> SHA-256 SECURED
                  </span>
                </div>
              </div>

              <button onClick={handleSignature} style={{ width: '100%', padding: '20px', backgroundColor: 'var(--text-primary)', color: '#FFF', borderRadius: '16px', border: 'none', fontWeight: '950', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: '0.3s' }}>
                <Fingerprint size={20} /> BİYOMETRİK MÜHÜR VUR
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 0' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} style={{ marginBottom: '20px' }}>
                <Loader2 size={48} color="var(--accent-emerald)" />
              </motion.div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px' }}>Mühürleniyor...</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Blokzincir ağına kaydediliyor. Lütfen bekleyin.</p>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px 0' }}>
              <div style={{ padding: '20px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', marginBottom: '20px', color: '#FFF' }}>
                <CheckCircle2 size={48} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--accent-emerald)' }}>İşlem Onaylandı</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', marginBottom: '30px' }}>
                Tapu devri ve akıllı kontrat mühürlendi. Varlık artık portföyünüzde.
              </p>
              <button onClick={onClose} style={{ width: '100%', padding: '15px', backgroundColor: 'transparent', color: 'var(--text-primary)', borderRadius: '16px', border: '2px solid var(--border-color)', fontWeight: '950', fontSize: '0.9rem', cursor: 'pointer' }}>
                PORTFÖYE DÖN
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
