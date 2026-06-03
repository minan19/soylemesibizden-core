'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, X, CheckCircle, Handshake, Shield, Zap } from 'lucide-react';
import { useNotifications, type SovereignNotification } from '@/hooks/useNotifications';

const TYPE_CONFIG: Record<string, { icon: React.ElementType; color: string }> = {
  offer: { icon: Handshake, color: '#00C49F' },
  deal: { icon: Shield, color: '#3B82F6' },
  system: { icon: Zap, color: '#F59E0B' },
  default: { icon: CheckCircle, color: '#8B5CF6' },
};

function NotificationItem({ n, onRead }: { n: SovereignNotification; onRead: (id: string) => void }) {
  const cfg = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.default;
  const Icon = cfg.icon;
  const time = new Date(n.timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      onClick={() => onRead(n.id)}
      className={`flex items-start gap-3 p-4 rounded-2xl cursor-pointer transition-all ${n.read ? 'opacity-60' : 'bg-[#F8FAFC] hover:bg-[#F0FDF8]'}`}
    >
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${cfg.color}15` }}>
        <Icon size={15} style={{ color: cfg.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[12px] leading-snug ${n.read ? 'font-semibold text-gray-500' : 'font-bold text-[#0F172A]'}`}>
          {n.message}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">{time}</p>
      </div>
      {!n.read && <div className="w-2 h-2 rounded-full bg-[#00C49F] shrink-0 mt-1" />}
    </div>
  );
}

export default function NotificationBell() {
  const { notifications, unreadCount, connected, markAllRead, markRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca kapat
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => { setOpen((v) => !v); if (open) markAllRead(); }}
        className="relative p-2.5 bg-white border border-gray-100 rounded-full text-gray-400 hover:border-[#00C49F]/30 hover:text-[#00C49F] transition-all"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00C49F] text-white text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
        {/* Bağlantı göstergesi */}
        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white ${connected ? 'bg-[#00C49F]' : 'bg-gray-300'}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-14 w-80 bg-white rounded-[24px] border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-[#00C49F]" />
              <span className="text-[11px] font-black tracking-widest uppercase">Bildirimler</span>
              {unreadCount > 0 && (
                <span className="text-[9px] font-black px-2 py-0.5 bg-[#F0FDF8] text-[#00C49F] rounded-full">
                  {unreadCount} yeni
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-[10px] font-bold text-gray-400 hover:text-[#00C49F] transition-colors">
                  Hepsini oku
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-gray-300 hover:text-gray-600 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* NOTIFICATIONS */}
          <div className="max-h-80 overflow-y-auto p-3 space-y-1">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={32} className="text-gray-200 mx-auto mb-3" />
                <p className="text-[12px] text-gray-400 font-semibold">Henüz bildirim yok</p>
                <p className="text-[10px] text-gray-300 mt-1">
                  {connected ? 'Canlı bağlantı aktif' : 'Bağlanıyor...'}
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <NotificationItem key={n.id} n={n} onRead={markRead} />
              ))
            )}
          </div>

          {/* FOOTER */}
          <div className="px-5 py-3 border-t border-gray-50 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-400">
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[#00C49F]' : 'bg-gray-300'}`} />
              {connected ? 'Canlı bağlantı aktif' : 'Yeniden bağlanıyor...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
