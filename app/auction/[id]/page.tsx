"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ChevronLeft, Share2, Info } from 'lucide-react';
import Link from 'next/link';
import { BiddingTerminal } from '../../../components/BiddingTerminal';
import { GlobalIndex } from '../../../components/GlobalIndex';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function AuctionRoom({ params }: { params: { id: string } }) {
  return (
    <div className={montserrat.className} style={{ minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
      <GlobalIndex />
      <nav style={{ padding: '25px 80px', backgroundColor: '#FFF', borderBottom: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#0A0A0A', fontWeight: '950', fontSize: '0.7rem' }}>
          <ChevronLeft size={20} /> TERMİNALE DÖN
        </Link>
        <div style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '5px' }}>SÖYLEMESİ<span style={{ color: '#1ABC9C' }}>BİZDEN</span> // AUCTION</div>
        <Share2 size={20} color="#AAA" style={{ cursor: 'pointer' }} />
      </nav>

      <main style={{ maxWidth: '1400px', margin: '60px auto', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '100px' }}>
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#1ABC9C', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>
               LIVE AUCTION • #SV-{params.id.toUpperCase()}
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', lineHeight: '1.1', marginBottom: '30px' }}>Signature Legacy Waterfront</h1>
            
            <div style={{ width: '100%', height: '550px', backgroundColor: '#FFF', border: '1px solid #EEE', borderRadius: '16px', marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ color: '#EEE', fontSize: '1rem', fontWeight: '900' }}>[ SOVEREIGN ASSET VISUALIZER ]</div>
            </div>

            <div style={{ backgroundColor: '#FFF', padding: '50px', borderRadius: '12px', border: '1px solid #EEE' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '20px' }}>MÜZAYEDE ŞARTNAMESİ</h3>
              <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.8', fontWeight: '500' }}>
                Bu varlık, sadece "Sovereign ID" seviyesi 3 ve üzeri olan doğrulanmış yatırımcılara açıktır. Teklifler Blockchain tabanlı mühürlenir. Müzayede sonunda en yüksek ağırlıklı teklif sahibine 24 saatlik öncelikli satın alım hakkı mühürlü protokol ile tanınır.
              </p>
            </div>
          </section>

          <aside>
            <div style={{ position: 'sticky', top: '120px' }}>
              <BiddingTerminal />
              <div style={{ marginTop: '30px', padding: '35px', border: '1px solid #EEE', borderRadius: '12px', backgroundColor: '#FFF' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                   <Info size={18} color="#1ABC9C" />
                   <span style={{ fontSize: '0.7rem', fontWeight: '950', color: '#AAA', letterSpacing: '2px' }}>YARDIM & DESTEK</span>
                 </div>
                 <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#666', lineHeight: '1.6' }}>
                   Müzayede süreci, teklif ağırlıklandırma algoritması ve yasal prosedürler hakkında sorularınız için <strong style={{ color: '#0A0A0A' }}>Sovereign Concierge</strong> her an hazırdır.
                 </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
