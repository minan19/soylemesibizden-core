"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ShieldCheck, UserCheck, Cpu, ScanFace, Lock } from 'lucide-react';

export const BiometricID = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const startAuth = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsVerified(true);
    }, 2500);
  };

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Fingerprint size={18} /> BIOMETRIC SOVEREIGN ID
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Kimlik Doğrulama Mahzeni</h3>
        </div>
        <Lock size={22} color={isVerified ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
      </header>

      <div style={{ position: 'relative', height: '200px', backgroundColor: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {isScanning && (
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 100 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            style={{ position: 'absolute', width: '100%', height: '2px', backgroundColor: 'var(--accent-emerald)', boxShadow: '0 0 15px var(--accent-emerald)', zIndex: 10 }}
          />
        )}
        
        <motion.div animate={isScanning ? { scale: [1, 1.1, 1] } : {}}>
          {isVerified ? (
            <UserCheck size={64} color="var(--accent-emerald)" />
          ) : (
            <ScanFace size={64} color={isScanning ? 'var(--accent-emerald)' : 'var(--text-secondary)'} />
          )}
        </motion.div>
      </div>

      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>AUTH_METHOD</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '950' }}>BIOMETRIC_v3</div>
        </div>
        <div style={{ padding: '15px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: '950', color: 'var(--text-secondary)', marginBottom: '5px' }}>ENCRYPTION</div>
          <div style={{ fontSize: '0.8rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>AES-256</div>
        </div>
      </div>

      <button 
        onClick={startAuth}
        disabled={isScanning || isVerified}
        style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: isVerified ? 'var(--accent-emerald)' : 'var(--text-primary)', color: '#FFF', border: 'none', borderRadius: '12px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer', transition: '0.3s' }}
      >
        {isVerified ? 'KİMLİK DOĞRULANDI' : (isScanning ? 'TARANIYOR...' : 'DOĞRULAMAYI BAŞLAT')}
      </button>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Güvenlik Katsayısı: $$ P_{auth} = 1 - (FAR + FRR) \oplus \text{Secure}_{Enclave} $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
