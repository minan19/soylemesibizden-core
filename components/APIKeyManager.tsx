"use client";
import React, { useState } from 'react';
import { Key, Copy, RefreshCcw, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export const APIKeyManager = () => {
  const [showKey, setShowKey] = useState(false);
  const apiKey = "sk_sovereign_2026_x8842_9912_alpha";

  return (
    <div style={{ marginTop: '40px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Key size={22} color="#1ABC9C" />
          <h3 style={{ fontSize: '1rem', fontWeight: '950', letterSpacing: '2px' }}>API ACCESS TERMINAL</h3>
        </div>
        <span style={{ fontSize: '0.6rem', fontWeight: '950', color: '#1ABC9C', backgroundColor: '#F4FBF9', padding: '6px 12px', borderRadius: '4px' }}>PRODUCTION ACTIVE</span>
      </header>

      <div style={{ padding: '25px', backgroundColor: '#F9F9F9', border: '1px solid #F0F0F0', borderRadius: '8px', position: 'relative' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', marginBottom: '10px', letterSpacing: '1px' }}>SECRET SOVEREIGN KEY</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <code style={{ fontSize: '1rem', fontWeight: '700', color: '#0A0A0A', fontFamily: 'monospace' }}>
            {showKey ? apiKey : '••••••••••••••••••••••••••••••••'}
          </code>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setShowKey(!showKey)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#AAA' }}>
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1ABC9C' }}>
              <Copy size={18} />
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#FDFDFD', borderRadius: '8px', borderLeft: '3px solid #1ABC9C' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', lineHeight: '1.6', margin: 0 }}>
          <strong>Güvenlik Protokolü:</strong> Bu anahtar, $$RSA-4096$$ şifreleme ile korunmaktadır. API üzerinden yapılan her sorgu, "SÖYLEMESİ BİZDEN" sivil ve teknik denetim protokolüne tabidir.
        </p>
      </div>
    </div>
  );
};
