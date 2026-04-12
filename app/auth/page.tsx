"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ShieldCheck, Lock, Fingerprint } from 'lucide-react';
import Link from 'next/link';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AuthPage() {
  return (
    <div className={montserrat.className} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9F9F9' }}>
      <div style={{ width: '450px', padding: '60px', backgroundColor: '#FFF', borderRadius: '32px', border: '1px solid #EEE', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <ShieldCheck size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 20px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '950', letterSpacing: '-1.5px' }}>Secure Session</h2>
          <p style={{ fontSize: '0.8rem', color: '#666', fontWeight: '600', marginTop: '10px' }}>SOVEREIGN INTELLIGENCE GATEWAY</p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.65rem', fontWeight: '950', color: '#999', letterSpacing: '1px' }}>ID_CREDENTIAL</label>
            <input type="text" placeholder="username" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #EEE', backgroundColor: '#F9F9F9', fontWeight: '600' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.65rem', fontWeight: '950', color: '#999', letterSpacing: '1px' }}>SECURITY_KEY</label>
            <input type="password" placeholder="••••••••" style={{ padding: '18px', borderRadius: '12px', border: '1px solid #EEE', backgroundColor: '#F9F9F9', fontWeight: '600' }} />
          </div>
          
          <Link href="/dashboard" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#000', color: '#FFF', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <Fingerprint size={20} /> SESSION BAŞLAT
          </Link>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', color: '#BBB', fontWeight: '600' }}>
            {"Protokol: $$ V_{gate} = \\text{Hash}(ID + Key) \\equiv \\text{Authorized} $$"}
          </p>
        </div>
      </div>
    </div>
  );
}
