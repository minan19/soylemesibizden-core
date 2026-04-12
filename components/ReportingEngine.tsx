"use client";
import React, { useState } from 'react';
import { FileText, Download, ShieldCheck, Share2, Loader2 } from 'lucide-react';

export const ReportingEngine = ({ asset }: any) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Sovereign Intelligence Dossier Başarıyla Oluşturuldu. (PDF)");
    }, 2000);
  };

  return (
    <div style={{ marginTop: '30px', padding: '40px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '12px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FileText size={20} color="#1ABC9C" />
          <h4 style={{ fontSize: '0.75rem', fontWeight: '950', letterSpacing: '2px' }}>REPORTING ENGINE V4</h4>
        </div>
        <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA' }}>SECURE EXPORT</div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ padding: '20px', backgroundColor: '#F9F9F9', borderRadius: '8px', border: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '5px' }}>Dossier ID: $$SIV_{2026}-X41$$</div>
          <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: '600' }}>İçerik: ROI Projeksiyonları, Karbon Sertifikasyonu, Hukuki Temizlik Analizi.</div>
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={generateReport}
            disabled={isGenerating}
            style={{ 
              flex: 1, 
              backgroundColor: '#0A0A0A', 
              color: '#1ABC9C', 
              padding: '18px', 
              border: 'none', 
              borderRadius: '4px', 
              fontWeight: '950', 
              fontSize: '0.7rem', 
              letterSpacing: '2px', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            İSTİHBARAT DOSYASINI İNDİR
          </button>
          
          <button style={{ padding: '18px', border: '1px solid #EEE', background: 'none', borderRadius: '4px', cursor: 'pointer', color: '#AAA' }}>
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
        <ShieldCheck size={14} color="#1ABC9C" />
        <span style={{ fontSize: '0.6rem', fontWeight: '900', color: '#AAA', letterSpacing: '1px' }}>VERIFIED BY SOVEREIGN PROTOCOL</span>
      </div>
    </div>
  );
};
