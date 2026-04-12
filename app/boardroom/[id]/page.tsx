"use client";
import React from 'react';
import { Montserrat } from 'next/font/google';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { GlobalIndex } from '../../../components/GlobalIndex';
import { SovereignBoardroom } from '../../../components/SovereignBoardroom';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '900'] });

export default function ExecutionRoom({ params }: { params: { id: string } }) {
  const asset = { id: params.id, title: "Signature Legacy Waterfront" };

  return (
    <div className={montserrat.className} style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <GlobalIndex />
      <nav style={{ padding: '25px 80px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.7rem', fontWeight: '950' }}>
          <ChevronLeft size={20} /> TERMİNALE DÖN
        </Link>
        <div style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '5px' }}>SÖYLEMESİ<span style={{ color: 'var(--accent-emerald)' }}>BİZDEN</span> // BOARDROOM</div>
        <div style={{ width: '100px' }}></div>
      </nav>

      <main style={{ maxWidth: '1400px', margin: '60px auto', padding: '0 80px' }}>
        <SovereignBoardroom asset={asset} />
      </main>
    </div>
  );
}
