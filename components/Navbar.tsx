'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown, Shield, Bell, Plus, Search } from 'lucide-react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user = session?.user as
    | { name?: string | null; email?: string | null; role?: string; avatar?: string | null }
    | undefined;

  const isAdmin = user?.role === 'ADMIN';
  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() ?? user?.email?.charAt(0)?.toUpperCase() ?? '?';
  const avatarUrl = user?.avatar ?? null;
  const [notifCount, setNotifCount] = useState(0);

  const fetchNotifCount = useCallback(async () => {
    if (!session) return;
    try {
      const res = await fetch('/api/notifications/count');
      if (res.ok) {
        const data = await res.json();
        setNotifCount(data.count ?? 0);
      }
    } catch {}
  }, [session]);

  useEffect(() => {
    fetchNotifCount();
  }, [fetchNotifCount]);

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
    { href: '/harita', label: 'Harita', authRequired: false },
    { href: '/search', label: 'Arama', authRequired: false },
    { href: '/valuation', label: 'Değerleme', authRequired: false },
    { href: '/my-listings', label: 'İlanlarım', authRequired: true },
    { href: '/dashboard', label: 'Dashboard', authRequired: true },
  ];

  const mobileLinks = [
    { href: '/listings', label: 'İlanlar', authRequired: false },
    { href: '/harita', label: 'İlan Haritası', authRequired: false },
    { href: '/search', label: 'Gelişmiş Arama', authRequired: false },
    { href: '/valuation', label: 'Değerleme Aracı', authRequired: false },
    { href: '/hesaplama', label: 'Hesaplama Araçları', authRequired: false },
    { href: '/market-radar', label: 'Piyasa Radarı', authRequired: false },
    { href: '/istatistikler', label: 'İstatistikler', authRequired: false },
    { href: '/piyasa', label: 'Piyasa Verileri', authRequired: false },
    { href: '/rehber', label: 'Konut Rehberi', authRequired: false },
    { href: '/favorites', label: 'Favoriler', authRequired: true },
    { href: '/my-listings', label: 'İlanlarım', authRequired: true },
    { href: '/offers', label: 'Teklifler', authRequired: true },
    { href: '/saved-searches', label: 'Kayıtlı Aramalar', authRequired: true },
    { href: '/tracked-prices', label: 'Fiyat Takibim', authRequired: true },
    { href: '/dashboard', label: 'Dashboard', authRequired: true },
    { href: '/notifications', label: 'Bildirimler', authRequired: true },
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
          {/* Ctrl+K search hint */}
          <button
            onClick={() => {
              const evt = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true });
              window.dispatchEvent(evt);
            }}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-400 hover:border-[#00C49F]/50 hover:text-[#00C49F] transition-colors"
          >
            <Search size={12} /> Ara
            <kbd className="bg-white border border-gray-200 rounded px-1 font-mono text-[10px]">⌘K</kbd>
          </button>
          {status === 'loading' ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2">
                {/* Notifications bell */}
                <Link
                  href="/notifications"
                  className="relative hidden sm:flex w-8 h-8 items-center justify-center rounded-xl text-gray-400 hover:text-[#00C49F] hover:bg-[#F0FDF8] transition-colors"
                  aria-label="Bildirimler"
                >
                  <Bell size={17} />
                  {notifCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {notifCount > 9 ? '9+' : notifCount}
                    </span>
                  )}
                </Link>

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

                {/* İlan Ver button */}
                <Link
                  href={isAdmin ? '/admin/create-listing' : '/create-listing'}
                  className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00C49F] hover:bg-[#00b08e] text-white text-xs font-bold transition-colors"
                >
                  <Plus size={12} />
                  İlan Ver
                </Link>

                {/* Avatar button */}
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 focus:outline-none group"
                  aria-label="Kullanıcı menüsü"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#F0FDF8] text-[#00C49F] flex items-center justify-center text-sm font-bold border border-[#00C49F]/20 group-hover:border-[#00C49F]/50 transition-colors">
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={avatarUrl} alt={user?.name ?? 'Avatar'} className="w-full h-full object-cover" />
                    ) : (
                      avatarLetter
                    )}
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
                  <Link
                    href="/my-listings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    İlanlarım
                  </Link>
                  <Link
                    href="/saved-searches"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Kayıtlı Aramalar
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Bell size={14} className="text-gray-400" />
                    Bildirimler
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
          {mobileLinks.map((link) => {
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
          {session && (
            <Link
              href={isAdmin ? '/admin/create-listing' : '/create-listing'}
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-xl bg-[#00C49F] text-white text-sm font-semibold hover:bg-[#00B08E] transition-colors"
            >
              <Plus size={14} /> İlan Ver
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
