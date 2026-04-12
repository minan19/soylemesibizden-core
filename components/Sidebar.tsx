"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Globe, Lock, ShieldCheck, FileText, Zap } from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    { label: 'MASTER TERMINAL', icon: LayoutGrid, href: '/dashboard' },
    { label: 'MARKET RADAR', icon: Globe, href: '/radar' },
    { label: 'DARK POOL', icon: Lock, href: '/dark-pool' },
    { label: 'LEGAL VAULT', icon: ShieldCheck, href: '/legal-vault' },
    { label: 'API PORTAL', icon: Zap, href: '/developer' }
  ];

  return (
    <aside style={{ width: '320px', borderRight: '1px solid var(--border-color)', padding: '50px 30px', display: 'flex', flexDirection: 'column', gap: '60px', backgroundColor: 'var(--bg-secondary)', height: '100vh', position: 'sticky', top: 0 }}>
      <div style={{ fontSize: '1.1rem', fontWeight: '950', letterSpacing: '6px' }}>SÖYLEMESİ<span style={{ color: 'var(--accent-emerald)' }}>BİZDEN</span></div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {links.map((link, i) => (
          <Link key={i} href={link.href} style={{ textDecoration: 'none' }}>
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '15px', padding: '18px 25px', borderRadius: '12px',
              backgroundColor: pathname === link.href ? 'var(--bg-primary)' : 'transparent',
              color: pathname === link.href ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              cursor: 'pointer', fontSize: '0.8rem', fontWeight: '900', transition: 'all 0.2s',
              border: pathname === link.href ? '1px solid var(--border-color)' : '1px solid transparent'
            }}>
              <link.icon size={20} /> {link.label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
