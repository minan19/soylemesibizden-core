"use client";
import React from 'react';
import { Home, Map, BarChart3, User, Search } from 'lucide-react';
import Link from 'next/link';

export const MobileNav = () => {
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '80px', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderTop: '1px solid #EEE', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 10000, paddingBottom: '10px' }}>
      {[
        { icon: Home, label: 'Home', href: '/' },
        { icon: Search, label: 'Search', href: '#' },
        { icon: Map, label: 'Radar', href: '#' },
        { icon: BarChart3, label: 'Deals', href: '/dashboard' },
        { icon: User, label: 'ID', href: '#' }
      ].map((item, i) => (
        <Link key={i} href={item.href} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <item.icon size={22} color={i === 3 ? '#1ABC9C' : '#AAA'} />
          <span style={{ fontSize: '0.55rem', fontWeight: '950', color: i === 3 ? '#1ABC9C' : '#AAA', letterSpacing: '1px', textTransform: 'uppercase' }}>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
