"use client";
import React, { useState, useEffect } from 'react';

export const SecureBoot = ({ onAuthenticated }: any) => {
  const [step, setStep] = useState(0);
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const protocols = [
    "INITIALIZING SECURE UPLINK...",
    "DECRYPTING ASSET DATABASE...",
    "ESTABLISHING SATELLITE HANDSHAKE...",
    "AUTHENTICATION REQUIRED"
  ];

  useEffect(() => {
    if (step < 3) {
      const timer = setTimeout(() => setStep(step + 1), 800);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAccess = () => {
    // Kurumsal şifre simülasyonu (istediğin şifreyi buraya koyabilirsin)
    if (password === "2026") {
      onAuthenticated();
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 1000);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#050505', zIndex: 99999, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#D4AF37', fontFamily: 'monospace' }}>
      <div style={{ width: '300px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '8px' }}>SÖYLEMESİ BİZDEN</span>
          <div style={{ height: '1px', background: 'rgba(214,175,55,0.2)', marginTop: '10px' }}></div>
        </div>

        {step < 3 ? (
          <div style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>
            {protocols.slice(0, step + 1).map((p, i) => (
              <div key={i} style={{ marginBottom: '10px', opacity: i === step ? 1 : 0.3 }}>
                {'>'} {p}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 1s' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '2px', color: isError ? '#e74c3c' : '#D4AF37' }}>
              {'>'} {isError ? "ACCESS DENIED" : "ENTER ACCESS KEY:"}
            </div>
            <input 
              type="password" 
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAccess()}
              style={{ background: 'none', border: '1px solid rgba(214,175,55,0.3)', padding: '15px', color: '#FFF', outline: 'none', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '5px' }}
            />
            <button onClick={handleAccess} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '15px', fontWeight: '900', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px' }}>
              INITIATE SESSION
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
};
