"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ShieldCheck, Zap, Leaf, BarChart3, Save } from 'lucide-react';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function CreateAsset() {
  return (
    <div className={montserrat.className} style={{ minHeight: '100vh', backgroundColor: '#FFF', padding: '80px' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '3px', marginBottom: '15px' }}>ADMIN TERMINAL</div>
          <h1 style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-2px' }}>Varlık İstihbaratı Oluştur</h1>
        </div>
        <button style={{ backgroundColor: '#0A0A0A', color: '#1ABC9C', padding: '20px 40px', border: 'none', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '4px' }}>
          <Save size={18} /> DOSYAYI MÜHÜRLE
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* TEMEL BİLGİLER */}
          <div style={{ padding: '40px', border: '1px solid #EEE', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>TEMEL VERİLER</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Varlık Başlığı (Örn: Signature Mansion)" style={{ padding: '15px', border: '1px solid #EEE', borderRadius: '4px', outline: 'none', fontWeight: '700' }} />
              <input type="text" placeholder="Lokasyon (SARIYER / YENİKÖY)" style={{ padding: '15px', border: '1px solid #EEE', borderRadius: '4px', outline: 'none', fontWeight: '700' }} />
              <textarea placeholder="Stratejik Açıklama..." style={{ padding: '15px', border: '1px solid #EEE', borderRadius: '4px', outline: 'none', fontWeight: '600', height: '150px' }} />
            </div>
          </div>

          {/* INTEL METRICS */}
          <div style={{ padding: '40px', border: '1px solid #EEE', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>İSTİHBARAT METRİKLERİ</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #F5F5F5', borderRadius: '4px' }}>
                <Zap size={20} color="#1ABC9C" />
                <input type="number" placeholder="Sovereign IQ (%)" style={{ border: 'none', outline: 'none', fontWeight: '900', width: '100%' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #F5F5F5', borderRadius: '4px' }}>
                <BarChart3 size={20} color="#1ABC9C" />
                <input type="text" placeholder="ROI Projeksiyonu (% / Yıl)" style={{ border: 'none', outline: 'none', fontWeight: '900', width: '100%' }} />
              </div>
            </div>
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div style={{ padding: '40px', backgroundColor: '#F4FBF9', border: '1px solid #E8F6F3', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <Leaf size={20} color="#1ABC9C" />
              <h3 style={{ fontSize: '0.75rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px' }}>KARBON & ENERJİ</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <select style={{ padding: '12px', border: '1px solid #EEE', borderRadius: '4px', backgroundColor: '#FFF', fontWeight: '900' }}>
                <option>Karbon Sınıfı Seçin</option>
                <option>A++ (Optimized)</option>
                <option>A (Verified)</option>
              </select>
              <input type="number" placeholder="Ofset Kapasitesi (tCO2e)" style={{ padding: '12px', border: '1px solid #EEE', borderRadius: '4px', fontWeight: '800' }} />
            </div>
          </div>

          <div style={{ padding: '40px', border: '1px solid #EEE', borderRadius: '12px', textAlign: 'center' }}>
            <ShieldCheck size={40} color="#CCC" style={{ marginBottom: '20px' }} />
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px', marginBottom: '15px' }}>VERIFICATION STATUS</div>
            <div style={{ fontWeight: '900', color: '#0A0A0A' }}>NOT YET SEALED</div>
          </div>
        </aside>
      </main>
    </div>
  );
}
