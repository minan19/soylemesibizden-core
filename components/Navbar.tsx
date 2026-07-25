'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, Shield } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user as
    | { name?: string | null; email?: string | null; role?: string }
    | undefined;

  const isAdmin = user?.role === 'ADMIN';
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() ?? user?.email?.charAt(0)?.toUpperCase() ?? '?';

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { href: '/listings', label: 'İlanlar', authRequired: false },
    { href: '/search', label: 'Arama', authRequired: false },
    { href: '/favorites', label: 'Favoriler', authRequired: true },
    { href: '/dashboard', label: 'Dashboard', authRequired: true },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Sol: Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <div className="flex items-center gap-1">
            <span className="font-black tracking-tighter text-gray-900 text-base sm:text-lg uppercase">
              SÖYLEMESİBİZDEN
            </span>
            <span className="text-[#00C49F] font-black text-lg leading-none">•</span>
          </div>
          <span className="text-xs text-gray-400 font-medium tracking-wide -mt-0.5">
            Gayrimenkul
          </span>
        </Link>

        {/* Orta: Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.authRequired && !session) return null;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Sağ: Auth */}
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                {/* Admin badge */}
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors"
                  >
                    <Shield size={10} />
                    ADMİN
                  </Link>
                )}

                {/* Avatar button */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 focus:outline-none group"
                  aria-label="Kullanıcı menüsü"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F0FDF8] text-[#00C49F] flex items-center justify-center text-sm font-bold border border-[#00C49F]/20 group-hover:border-[#00C49F]/50 transition-colors">
                    {avatarLetter}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[160px] bg-white shadow-lg rounded-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs font-semibold text-gray-900 truncate max-w-[140px]">
                      {user?.name ?? user?.email ?? 'Kullanıcı'}
                    </p>
                    {user?.email && user?.name && (
                      <p className="text-xs text-gray-400 truncate max-w-[140px]">{user.email}</p>
                    )}
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors"
                    >
                      <Shield size={14} />
                      Admin Paneli
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Profilim
                  </Link>
                  <Link
                    href="/favorites"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Favorilerim
                  </Link>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors mt-1 border-t border-gray-50"
                  >
                    Çıkış Yap
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-[#00C49F] text-white text-sm font-semibold hover:bg-[#00B08E] transition-colors"
            >
              Giriş Yap
            </Link>
          )}

          {/* Mobil hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            if (link.authRequired && !session) return null;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-gray-600 hover:text-gray-900 py-2.5 border-b border-gray-50 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 py-2.5 border-b border-gray-50 transition-colors"
            >
              <Shield size={14} />
              Admin Paneli
            </Link>
          )}
          {!session && (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-2 w-full text-center px-4 py-2.5 rounded-xl bg-[#00C49F] text-white text-sm font-semibold hover:bg-[#00B08E] transition-colors"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
