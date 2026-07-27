'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: `[${form.subject}] ${form.message}`,
          listingId: 'contact-page',
        }),
      });
      if (res.ok || res.status === 201) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Gönderim başarısız. Lütfen tekrar deneyin.');
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-10 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-[#F0FDF8] rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-[#00C49F]" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Mesajınız İletildi!</h2>
        <p className="text-sm text-gray-500 max-w-xs">
          En kısa sürede size dönüş yapacağız. Ortalama yanıt süresi 24 saattir.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <h2 className="text-base font-bold text-gray-900">Mesaj Gönder</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Ad Soyad *</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Adınız"
            required
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">E-posta *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="email@örnek.com"
            required
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+90 5xx xxx xx xx"
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Konu *</label>
          <select
            value={form.subject}
            onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
            required
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50"
          >
            <option value="">Konu seçin</option>
            <option value="Genel Bilgi">Genel Bilgi</option>
            <option value="İlan Desteği">İlan Desteği</option>
            <option value="Teknik Sorun">Teknik Sorun</option>
            <option value="Danışmanlık">Danışmanlık</option>
            <option value="Kurumsal">Kurumsal</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Mesajınız *</label>
        <textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Mesajınızı yazın…"
          rows={5}
          required
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] bg-gray-50 resize-none"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <Send size={14} /> {loading ? 'Gönderiliyor…' : 'Mesaj Gönder'}
      </button>
    </form>
  );
}
