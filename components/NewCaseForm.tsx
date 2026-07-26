'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { MessageSquare, Send } from 'lucide-react';

export default function NewCaseForm() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!session?.user) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;
    setLoading(true);
    setError('');
    const res = await fetch('/api/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, description, userId: (session.user as { id?: string }).id }),
    });
    setLoading(false);
    if (res.ok) {
      setSubject('');
      setDescription('');
      setOpen(false);
      router.refresh();
    } else {
      setError('Gönderim başarısız. Lütfen tekrar deneyin.');
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00C49F] text-white text-sm font-semibold rounded-xl hover:bg-[#00B090] transition-colors"
      >
        <MessageSquare size={14} /> Yeni Talep
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-[#00C49F]/20 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-900">Yeni Danışmanlık Talebi</h3>
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Konu</label>
        <input
          type="text"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Konu başlığı..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#00C49F] transition-colors"
          required
        />
      </div>
      <div>
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Açıklama</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Talebinizi detaylı açıklayın..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#00C49F] transition-colors resize-none"
          required
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00C49F] text-white text-sm font-semibold rounded-xl hover:bg-[#00B090] transition-colors disabled:opacity-50"
        >
          <Send size={13} /> {loading ? 'Gönderiliyor...' : 'Gönder'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="px-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
