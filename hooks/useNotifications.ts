'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface SovereignNotification {
  id: string;
  type: string;
  message: string;
  data?: unknown;
  timestamp: string;
  read: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<SovereignNotification[]>([]);
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const es = new EventSource('/api/notifications/stream');
    eventSourceRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (e: MessageEvent<string>) => {
      try {
        const parsed = JSON.parse(e.data) as Omit<SovereignNotification, 'id' | 'read'>;
        if (parsed.type === 'connected') return; // İlk bağlantı mesajı
        const notification: SovereignNotification = {
          ...parsed,
          id: crypto.randomUUID(),
          read: false,
        };
        setNotifications((prev) => [notification, ...prev].slice(0, 50));
      } catch {
        // parse hatası, skip
      }
    };

    es.onerror = () => {
      setConnected(false);
      es.close();
      // 5 saniye sonra yeniden bağlan
      setTimeout(() => {
        if (eventSourceRef.current === es) {
          const newEs = new EventSource('/api/notifications/stream');
          eventSourceRef.current = newEs;
        }
      }, 5000);
    };

    return () => {
      es.close();
      eventSourceRef.current = null;
    };
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, connected, markAllRead, markRead };
}
