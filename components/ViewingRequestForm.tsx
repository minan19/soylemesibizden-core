'use client';

import { useState, FormEvent } from 'react';
import { Calendar, Clock, CheckCircle, ChevronDown } from 'lucide-react';

interface Props {
  listingId: string;
  listingTitle: string;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00', '18:00',
];

export default function ViewingRequestForm({ listingId, listingTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

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
          message: `[GÖRÜNTÜLEME TALEBİ] Tarih: ${form.date} Saat: ${form.time} — "${listingTitle}" için görüntüleme randevusu talep ediyorum.`,
          listingId,
        }),
      });
      if (res.ok || res.status === 201) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Gönderim başarısız.');
      }
    } catch {
      setError('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-5 text-center shadow-sm">
        <div className="w-12 h-12 bg-[#F0FDF8] rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle size={22} className="text-[#00C49F]" />
        </div>
        <p className="font-bold text-gray-900 text-sm mb-1">Randevu Talebiniz Alındı!</p>
        <p className="text-xs text-gray-500">En kısa sürede dönüş yapılacak.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
            <Calendar size={16} className="text-amber-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Görüntüleme Randevusu</p>
            <p className="text-xs text-gray-400">Ziyaret planla</p>
          </div>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="px-5 pb-5 pt-0 space-y-3 border-t border-gray-50">
          <div className="grid grid-cols-2 gap-3 pt-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Ad Soyad *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                placeholder="Adınız"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#00C49F]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">Telefon</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+90 5xx"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#00C49F]"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1">E-posta *</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              placeholder="email@örnek.com"
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#00C49F]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1 flex items-center gap-1">
                <Calendar size={10} /> Tarih *
              </label>
              <input
                type="date"
                value={form.date}
                min={today}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                required
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#00C49F]"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide block mb-1 flex items-center gap-1">
                <Clock size={10} /> Saat *
              </label>
              <select
                value={form.time}
                onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                required
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-[#00C49F]"
              >
                <option value="">Seçin</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Calendar size={13} />
            {loading ? 'Gönderiliyor…' : 'Randevu Talep Et'}
          </button>
        </form>
      )}
    </div>
  );
}
