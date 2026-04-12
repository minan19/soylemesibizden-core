"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fingerprint, ScanFace, ShieldCheck, Lock, ChevronRight, Loader2 } from 'lucide-react';

export const GatewayAuth = () => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<'IDLE' | 'SCANNING' | 'GRANTED'>('IDLE');

  const handleAuth = () => {
    setAuthStatus('SCANNING');
    
    // Biyometrik Tarama Simülasyonu
    setTimeout(() => {
      setAuthStatus('GRANTED');
      
      // Onaydan sonra Master Dashboard'a geçiş
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }, 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
      
      <AnimatePresence mode="wait">
        {authStatus === 'IDLE' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '25px', backgroundColor: 'var(--bg-secondary)', borderRadius: '50%', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
              <Lock size={48} color="var(--text-primary)" />
            </div>
            
            <h1 style={{ fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1.5px', marginBottom: '10px' }}>SOVEREIGN.</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '40px', letterSpacing: '1px' }}>
              KURUMSAL EKOSİSTEME GİRİŞ YAPIN
            </p>

            <button 
              onClick={handleAuth}
              style={{ width: '100%', padding: '20px', backgroundColor: 'var(--text-primary)', color: '#FFF', borderRadius: '20px', border: 'none', fontWeight: '950', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', cursor: 'pointer', transition: '0.3s' }}
            >
              <ScanFace size={24} /> BİYOMETRİK KİMLİK DOĞRULAMA
            </button>
          </motion.div>
        )}

        {authStatus === 'SCANNING' && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '30px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '50%', border: '2px dashed var(--accent-emerald)', marginBottom: '30px' }}
            >
              <Fingerprint size={48} color="var(--accent-emerald)" />
            </motion.div>
            
            <h2 style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--accent-emerald)' }}>Tanımlanıyor...</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '2px' }}>
              SİNİRSEL AĞ BAĞLANTISI KURULUYOR
            </p>
          </motion.div>
        )}

        {authStatus === 'GRANTED' && (
          <motion.div 
            key="granted"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '30px', backgroundColor: 'var(--accent-emerald)', borderRadius: '50%', marginBottom: '30px', color: '#FFF', boxShadow: '0 20px 40px rgba(26,188,156,0.3)' }}
            >
              <ShieldCheck size={48} />
            </motion.div>
            
            <h2 style={{ fontSize: '2rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--text-primary)' }}>Erişim Onaylandı.</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Hoş Geldiniz, Master Node.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};
