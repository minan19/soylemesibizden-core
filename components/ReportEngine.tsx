"use client";
import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, Share2, Loader2, Award } from 'lucide-react';

export const ReportEngine = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div style={{ padding: '50px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', position: 'relative' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(26,188,156,0.1)', borderRadius: '12px' }}>
            <Award size={24} color="var(--accent-emerald)" />
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)', letterSpacing: '4px' }}>EXECUTIVE DOSSIER</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>İstihbarat Raporu</h3>
          </div>
        </div>
        <span style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px' }}>SECURE EXPORT V4.1</span>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
        <div style={{ padding: '25px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>Dossier ID: $$SIV_{2026}-X41$$</div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '500', lineHeight: '1.6', margin: 0 }}>
            İçerik: ROI Projeksiyonları, Karbon Sertifikasyonu ve Hukuki Temizlik Analizi Blockchain tabanlı mühürlenmeye hazırdır.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button 
          onClick={() => { setIsGenerating(true); setTimeout(() => setIsGenerating(false), 2000); }}
          style={{ flex: 3, padding: '20px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
        >
          {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          İSTİHBARAT DOSYASINI MÜHÜRLE
        </button>
        <button style={{ flex: 1, padding: '20px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Share2 size={18} />
        </button>
      </div>

      <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
        <ShieldCheck size={14} color="var(--accent-emerald)" />
        <span style={{ fontSize: '0.6rem', fontWeight: '900', color: 'var(--text-secondary)', letterSpacing: '1px' }}>VERIFIED BY SOVEREIGN PROTOCOL</span>
      </div>
    </div>
  );
};
