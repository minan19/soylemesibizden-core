'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Building2, Heart, User } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Ana Sayfa' },
  { href: '/search', icon: Search, label: 'Ara' },
  { href: '/listings', icon: Building2, label: 'İlanlar' },
  { href: '/favorites', icon: Heart, label: 'Favoriler' },
  { href: '/profile', icon: User, label: 'Profil' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 h-16">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-colors ${
                active ? 'text-[#00C49F]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon
                size={20}
                className={active ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}
                fill={active && (href === '/favorites' || href === '/') ? 'currentColor' : 'none'}
              />
              {label}
            </Link>
          );
        })}
      </div>
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  );
}
