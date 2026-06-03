'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';

const SUBJECTS = [
  'Portföy Analizi',
  'Hukuki Danışmanlık',
  'Değerleme Talebi',
  'Yatırım Stratejisi',
  'Finansman & İpotek',
  'Diğer',
];

export default function ConciergeForm() {
  const router = useRouter();
  const [form, setForm] = useState({ subject: '', description: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setStatus('error'); setError(data.error ?? 'Hata oluştu.'); return; }
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm({ subject: '', description: '' });
        router.refresh();
      }, 2000);
    } catch {
      setStatus('error');
      setError('Bağlantı hatası.');
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
          <MessageSquare size={20} className="text-[#00C49F]" />
        </div>
        <div>
          <h3 className="font-black text-[#0F172A]">Talep Oluştur</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Concierge Protocol</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center py-10 text-center gap-4">
          <CheckCircle size={48} className="text-[#00C49F]" />
          <p className="font-black text-[#0F172A] text-lg">Talebiniz iletildi!</p>
          <p className="text-sm text-gray-400">24 saat içinde ekibimiz sizinle iletişime geçecek.</p>
        </div>
      ) : (
        <form onSubmit={handle} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
              Konu *
            </label>
            <select
              required
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="w-full px-4 py-3.5 text-sm font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 appearance-none transition-all"
            >
              <option value="">Konu seçin...</option>
              {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
              Açıklama *
            </label>
            <textarea
              required
              rows={5}
              minLength={10}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Talebinizi detaylıca açıklayın. Mülk bilgileri, bütçe, hedef gibi bilgiler hızlı yanıt almanızı sağlar."
              className="w-full px-4 py-3.5 text-sm font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all resize-none"
            />
            <p className="text-[10px] text-gray-300 mt-1.5">{form.description.length} / minimum 10 karakter</p>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-[12px] font-semibold bg-red-50 rounded-2xl px-4 py-3">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !form.subject || form.description.length < 10}
            className="w-full py-4 bg-[#0F172A] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <><Loader2 size={16} className="animate-spin" /> GÖNDERİLİYOR...</>
            ) : (
              <><Send size={14} /> TALEP GÖNDER</>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-300 font-semibold">
            ⚡ 24 saat içinde yanıt garantisi
          </p>
        </form>
      )}
    </div>
  );
}
