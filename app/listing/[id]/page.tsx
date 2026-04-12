"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { Sidebar } from '../../../components/Sidebar';
import { GlobalHeader } from '../../../components/GlobalHeader';
import { ValuationMatrix } from '../../../components/ValuationMatrix';
import { MapPin, ShieldCheck, PlayCircle, Globe, Layers, Share2 } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function ListingDetailPage() {
  return (
    <div className={montserrat.className} style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <GlobalHeader />
        <div style={{ padding: '60px 80px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>
          
          <section>
            <div style={{ width: '100%', height: '500px', backgroundColor: 'var(--bg-secondary)', borderRadius: '32px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <div style={{ textAlign: 'center' }}>
                <PlayCircle size={64} color="var(--accent-emerald)" style={{ cursor: 'pointer' }} />
                <p style={{ marginTop: '20px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '2px' }}>AI CINEMATIC VISION</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px' }}>Terra Beylikdüzü Hub</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                  <MapPin size={18} /> İstanbul, Beylikdüzü - Stratejik Lojistik Hattı
                </div>
              </div>
              <button style={{ padding: '15px 25px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer' }}>
                <Share2 size={18} /> PAYLAŞ
              </button>
            </div>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444', fontWeight: '500', marginBottom: '40px' }}>
              Bu varlık, küresel karbon sertifikasyonuna uyumlu mimarisi ve yüksek likidite skoru ile portföyünüzün "Core Asset" sınıfında mühürlenmiştir.
            </p>

            <ValuationMatrix />
          </section>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div style={{ padding: '40px', backgroundColor: 'var(--text-primary)', color: '#FFF', borderRadius: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '1px', opacity: 0.7 }}>SATIŞ BEDELİ</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '950' }}>₺ 4.2M</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '1px', opacity: 0.7 }}>ASSET IQ</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>98.4</p>
              </div>
            </div>

            <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '28px', border: '1px solid var(--border-color)' }}>
               <h4 style={{ fontSize: '0.7rem', fontWeight: '950', letterSpacing: '2px', color: 'var(--text-secondary)', marginBottom: '20px' }}>INVESTOR SUMMARY</h4>
               <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', lineHeight: '1.6' }}>
                 Bu varlık, 24 aylık projeksiyonda %18.4 net getiri potansiyeli ($$ROI$$) taşımaktadır. Mülkiyet sicili blockchain üzerinde mühürlenmiştir.
               </p>
            </div>
          </aside>
          
        </div>
      </main>
    </div>
  );
}
