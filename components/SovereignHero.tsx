"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe } from 'lucide-react';

export const SovereignHero = () => {
  return (
    <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 20px', backgroundColor: 'var(--bg-primary)' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '50px', marginBottom: '30px' }}>
          <ShieldCheck size={16} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '3px', color: 'var(--text-secondary)' }}>INSTITUTIONAL GRADE INTELLIGENCE</span>
        </div>
        
        <h1 style={{ fontSize: '5rem', fontWeight: '950', letterSpacing: '-4px', lineHeight: '0.9', marginBottom: '30px', color: 'var(--text-primary)' }}>
          Sermayenin <span style={{ color: 'var(--accent-emerald)' }}>Egemen</span><br />İstihbarat Merkezi.
        </h1>
        
        <p style={{ maxWidth: '700px', margin: '0 auto 50px', fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.6' }}>
          Küresel varlık değerlemeleri, karbon zekası ve hukuki derin analiz. 
          SÖYLEMESİ BİZDEN, kararı sizin stratejiniz mühürler.
        </p>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '20px 40px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
              TERMİNALE GİRİŞ YAP <ArrowRight size={18} />
            </button>
          </Link>
          <button style={{ padding: '20px 40px', backgroundColor: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '2px', cursor: 'pointer' }}>
            KURUMSAL DOSYAYI İNCELE
          </button>
        </div>
      </motion.div>
    </section>
  );
};
