'use client';

import { useState } from 'react';
import { MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  listingId: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function InquiryForm({ listingId }: Props) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: 'Bu ilan hakkında bilgi almak istiyorum.',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, listingId }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || 'Gönderim başarısız oldu.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#F0FDF8] flex items-center justify-center">
            <CheckCircle size={28} className="text-[#00C49F]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Mesajınız İletildi</h3>
            <p className="text-sm text-gray-500">Satıcı en kısa sürede sizinle iletişime geçecektir.</p>
          </div>
          <button
            onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: 'Bu ilan hakkında bilgi almak istiyorum.' }); }}
            className="text-sm font-semibold text-[#00C49F] hover:underline"
          >
            Yeni Mesaj Gönder
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C49F]/25 focus:border-[#00C49F] transition';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#00C49F]/10 flex items-center justify-center">
          <MessageSquare size={16} className="text-[#00C49F]" />
        </div>
        <h2 className="text-base font-bold text-gray-900">Satıcıyla İletişim</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
              Ad Soyad <span className="text-red-400 ml-0.5">*</span>
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={form.name}
              onChange={update('name')}
              placeholder="Adınız Soyadınız"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
              E-posta <span className="text-red-400 ml-0.5">*</span>
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="ornek@mail.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
            Telefon
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={update('phone')}
            placeholder="+90 5XX XXX XX XX"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-[11px] font-bold tracking-widest text-gray-400 uppercase block mb-1.5">
            Mesaj
          </label>
          <textarea
            rows={4}
            required
            minLength={5}
            value={form.message}
            onChange={update('message')}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && (
          <div className="flex items-center gap-2.5 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#00C49F] hover:bg-[#00a882] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Gönderiliyor...
            </span>
          ) : (
            <>
              <Send size={14} />
              Mesaj Gönder
            </>
          )}
        </button>
      </form>
    </div>
  );
}
