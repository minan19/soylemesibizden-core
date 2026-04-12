"use client";
import React, { useState } from 'react';
import { Montserrat } from 'next/font/google';
import { Search, SlidersHorizontal, ArrowUpRight, ShieldCheck, Leaf, BarChart3, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { GlobalIndex } from '../../components/GlobalIndex';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function SearchTerminal() {
  const [filterOpen, setFilterOpen] = useState(false);

  const results = [
    { id: 'e1', title: 'Signature Waterfront Mansion', loc: 'Sarıyer', price: '₺ 85M', iq: 98.4, carbon: 'A++', roi: '%14.2', match: 98 },
    { id: 'e2', title: 'Modern Loft Experience', loc: 'Moda', price: '₺ 14.5M', iq: 95.0, carbon: 'A+', roi: '%11.8', match: 92 },
    { id: 'e3', title: 'Energy Hub Industrial', loc: 'Çanakkale', price: '₺ 110M', iq: 94.2, carbon: 'A+++', roi: '%18.5', match: 89 },
    { id: 'e4', title: 'Eco-Estate Portfolio', loc: 'Urla', price: '₺ 38M', iq: 96.1, carbon: 'A++', roi: '%13.4', match: 95 }
  ];

  return (
    <div className={montserrat.className} style={{ minHeight: '100vh', backgroundColor: '#FFF', color: '#0A0A0A' }}>
      <GlobalIndex />
      
      <nav style={{ padding: '25px 80px', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', sticky: 'top', backgroundColor: '#FFF', zIndex: 100 }}>
        <div style={{ fontSize: '1rem', fontWeight: '950', letterSpacing: '5px' }}>SÖYLEMESİ<span style={{ color: '#1ABC9C' }}>BİZDEN</span></div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
            <input type="text" placeholder="Global Intel Search..." style={{ padding: '12px 20px 12px 45px', borderRadius: '50px', border: '1px solid #EEE', width: '400px', fontSize: '0.8rem', fontWeight: '600', outline: 'none', backgroundColor: '#F9F9F9' }} />
          </div>
          <button onClick={() => setFilterOpen(!filterOpen)} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: '1px solid #EEE', padding: '12px 20px', borderRadius: '50px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '950' }}>
            <SlidersHorizontal size={16} /> FİLTRELER
          </button>
        </div>
      </nav>

      <main style={{ padding: '40px 80px', display: 'flex', gap: '40px' }}>
        <section style={{ flex: 1 }}>
          <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: '950', color: '#1ABC9C', letterSpacing: '2px', marginBottom: '10px' }}>INTEL TERMINAL</div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '950' }}>Arama Sonuçları <span style={{ color: '#AAA', fontSize: '1rem', fontWeight: '600' }}>(142 Varlık Bulundu)</span></h2>
            </div>
          </header>

          <div style={{ border: '1px solid #EEE', borderRadius: '12px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#F9F9F9', borderBottom: '1px solid #EEE' }}>
                <tr>
                  {['VARLIK / LOKASYON', 'GÜVEN SKORU', 'KARBON', 'ROI', 'FİYAT', 'MATCH', ''].map(h => (
                    <th key={h} style={{ padding: '20px', fontSize: '0.6rem', fontWeight: '950', color: '#AAA', textAlign: 'left', letterSpacing: '1px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F5F5F5', transition: 'background 0.2s' }}>
                    <td style={{ padding: '25px 20px' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>{r.title}</div>
                      <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#AAA', marginTop: '4px' }}>{r.loc}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <div style={{ fontSize: '1rem', fontWeight: '950', color: '#1ABC9C' }}>%{r.iq}</div>
                    </td>
                    <td style={{ padding: '20px' }}>
                      <span style={{ padding: '4px 10px', backgroundColor: '#F4FBF9', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '950', color: '#27AE60' }}>{r.carbon}</span>
                    </td>
                    <td style={{ padding: '20px', fontSize: '0.85rem', fontWeight: '900' }}>{r.roi}</td>
                    <td style={{ padding: '20px', fontSize: '0.9rem', fontWeight: '950' }}>{r.price}</td>
                    <td style={{ padding: '20px' }}>
                       <div style={{ width: '100px', height: '6px', backgroundColor: '#EEE', borderRadius: '3px' }}>
                          <div style={{ width: `${r.match}%`, height: '100%', backgroundColor: '#D4AF37', borderRadius: '3px' }} />
                       </div>
                    </td>
                    <td style={{ padding: '20px', textAlign: 'right' }}>
                      <Link href={`/listing/${r.id}`} style={{ color: '#1ABC9C' }}><ArrowUpRight size={20} /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {filterOpen && (
          <aside style={{ width: '300px', backgroundColor: '#FDFDFD', border: '1px solid #EEE', borderRadius: '12px', padding: '30px', height: 'fit-content', position: 'sticky', top: '120px' }}>
            <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '30px' }}>DETAYLI ANALİZ</h3>
            {['Varlık Tipi', 'Yatırım Vadesi', 'Risk Grubu', 'Karbon Sertifikası'].map((f, i) => (
              <div key={i} style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #F5F5F5' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: '950', marginBottom: '15px', color: '#666' }}>{f.toUpperCase()}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '700' }}>
                  <span>Tümü</span>
                  <ChevronRight size={14} color="#CCC" />
                </div>
              </div>
            ))}
            <button style={{ width: '100%', padding: '15px', backgroundColor: '#0A0A0A', color: '#FFF', border: 'none', borderRadius: '4px', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px', cursor: 'pointer' }}>SONUÇLARI GÜNCELLE</button>
          </aside>
        )}
      </main>
    </div>
  );
}
