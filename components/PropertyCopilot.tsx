'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { SovereignScore } from '@/lib/investmentScore';
import { GRADE_CONFIG, RECOMMENDATION_CONFIG } from '@/lib/investmentScore';
import { formatCurrency } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  listings?: ListingResult[];
  demo?: boolean;
}

interface ListingResult {
  id: string;
  title: string;
  location: string | null;
  priceAmount: number;
  area: number;
  propertyType: string;
  sovereignScore: SovereignScore;
}

const SUGGESTIONS = [
  '5 milyon bütçem var, kiraya vermek için ev arıyorum',
  'İstanbul Kadıköy\'de ticari mülk var mı?',
  'En yüksek Sovereign Score\'lu ilanları göster',
  'Ankara\'da 3M altı konut önerir misin?',
];

export default function PropertyCopilot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Merhaba! Ben Sovereign AI Danışmanınızım. Bütçenizi, tercihlerinizi ve yatırım hedefinizi söyleyin — size en uygun ilanları Sovereign Score ile birlikte sunayım.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/intelligence/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json() as {
        reply?: string;
        listings?: ListingResult[];
        error?: string;
        demo?: boolean;
      };

      if (!res.ok || data.error) {
        setMessages((prev) => [...prev, {
          role: 'assistant',
          content: data.error ?? 'Bir hata oluştu. Lütfen tekrar deneyin.',
        }]);
        return;
      }

      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: data.reply ?? '',
        listings: data.listings,
        demo: data.demo,
      }]);
    } catch {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Bağlantı hatası. Lütfen tekrar deneyin.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  // ── Floating Button (kapalı halde) ───────────────────────────────────────
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
        title="AI Emlak Danışmanı"
      >
        <Bot size={22} className="text-[#00C49F]" />
        <span className="absolute right-16 bg-[#0F172A] text-white text-[10px] font-black px-3 py-1.5 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
          AI Danışman
        </span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-24 right-6 z-40 bg-white rounded-[28px] shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 ${
        minimized ? 'w-72 h-14' : 'w-[420px] h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#0F172A] rounded-t-[28px] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#00C49F]/20 flex items-center justify-center">
            <Bot size={16} className="text-[#00C49F]" />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F]">
              SOVEREIGN AI
            </p>
            {!minimized && (
              <p className="text-[11px] font-semibold text-gray-400">Emlak Danışmanı</p>
            )}
          </div>
          {/* Canlı göstergesi */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] animate-pulse ml-1" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMinimized((v) => !v)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            {minimized ? <Maximize2 size={12} className="text-gray-300" /> : <Minimize2 size={12} className="text-gray-300" />}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/40 flex items-center justify-center transition-colors"
          >
            <X size={12} className="text-gray-300" />
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  {/* Bubble */}
                  <div
                    className={`px-4 py-3 rounded-2xl text-[12px] leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#0F172A] text-white rounded-br-sm'
                        : 'bg-[#F8FAFC] text-[#0F172A] border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                    {msg.demo && (
                      <span className="block mt-2 text-[10px] text-amber-500 font-bold">
                        ⚠️ Demo mod
                      </span>
                    )}
                  </div>

                  {/* Listing Cards */}
                  {msg.listings && msg.listings.length > 0 && (
                    <div className="space-y-2 w-full">
                      {msg.listings.map((l) => {
                        const gc = GRADE_CONFIG[l.sovereignScore.grade];
                        const rc = RECOMMENDATION_CONFIG[l.sovereignScore.recommendation];
                        return (
                          <Link
                            key={l.id}
                            href={`/listing/${l.id}`}
                            className="block bg-white border border-gray-100 rounded-2xl p-3 hover:border-[#00C49F]/30 hover:shadow-sm transition-all"
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p className="text-[11px] font-bold text-[#0F172A] leading-snug flex-1">
                                {l.title}
                              </p>
                              <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0"
                                style={{ backgroundColor: gc.bg, color: gc.color }}
                              >
                                {l.sovereignScore.grade}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[11px] font-black text-[#0F172A]">
                                  {formatCurrency(l.priceAmount)}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                  {l.location ?? '—'} · {l.area}m²
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-[9px] font-black" style={{ color: rc.color }}>
                                  {rc.icon} {rc.label}
                                </span>
                                <ChevronRight size={11} className="text-gray-300" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                  <Loader2 size={13} className="animate-spin text-[#00C49F]" />
                  <span className="text-[11px] text-gray-400 font-semibold">Analiz ediyor...</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Suggestions (sadece başlangıçta) */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => void sendMessage(s)}
                  className="text-[10px] font-semibold text-gray-500 bg-gray-50 hover:bg-[#F0FDF8] hover:text-[#00C49F] border border-gray-100 px-3 py-1.5 rounded-full transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bütçenizi ve tercihlerinizi yazın..."
              disabled={loading}
              className="flex-1 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-2.5 text-[12px] font-semibold text-[#0F172A] placeholder-gray-300 focus:outline-none focus:border-[#00C49F] transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-2xl bg-[#00C49F] hover:bg-[#00A887] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={15} className="text-white" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
