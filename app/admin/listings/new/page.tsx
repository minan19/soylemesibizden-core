'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const PROPERTY_TYPES = ['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL'];
const STATUS_OPTIONS = ['ACTIVE', 'PENDING', 'SOLD', 'RENTED'];

const PROPERTY_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut',
  COMMERCIAL: 'Ticari',
  LAND: 'Arazi',
  INDUSTRIAL: 'Endüstriyel',
};

interface FormState {
  title: string;
  description: string;
  propertyType: string;
  priceAmount: string;
  area: string;
  location: string;
  status: string;
}

export default function AdminNewListingPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    propertyType: 'RESIDENTIAL',
    priceAmount: '',
    area: '',
    location: '',
    status: 'ACTIVE',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          priceAmount: parseFloat(form.priceAmount),
          area: parseFloat(form.area),
        }),
      });
      const data = await res.json() as { error?: string; id?: string };
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'İlan oluşturulamadı.');
      } else {
        setStatus('success');
        setTimeout(() => router.push('/admin'), 1500);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft size={16} /> Admin Panel
          </Link>
          <span className="text-gray-200">·</span>
          <span className="text-[11px] font-bold text-[#0F172A]">Yeni İlan Oluştur</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
              <Plus size={20} className="text-[#00C49F]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#00C49F] tracking-widest uppercase">Admin Terminal</p>
              <h1 className="text-2xl font-black tracking-tighter">Yeni İlan Oluştur</h1>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div className="bg-white rounded-[40px] border border-gray-100 p-16 shadow-sm flex flex-col items-center text-center gap-6">
            <CheckCircle size={64} className="text-[#00C49F]" />
            <p className="text-xl font-black text-[#0F172A]">İlan başarıyla oluşturuldu!</p>
            <p className="text-sm text-gray-400">Admin panele yönlendiriliyorsunuz...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm space-y-8">
            {/* TITLE */}
            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                İlan Başlığı *
              </label>
              <input
                required
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Örn: Sovereign Tower Office"
                className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                Açıklama
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Varlık hakkında detaylı bilgi..."
                className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all resize-none"
              />
            </div>

            {/* PROPERTY TYPE + STATUS */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                  Varlık Tipi *
                </label>
                <select
                  required
                  value={form.propertyType}
                  onChange={(e) => update('propertyType', e.target.value)}
                  className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 transition-all appearance-none cursor-pointer"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{PROPERTY_LABELS[t] ?? t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                  Durum *
                </label>
                <select
                  required
                  value={form.status}
                  onChange={(e) => update('status', e.target.value)}
                  className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 transition-all appearance-none cursor-pointer"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* PRICE + AREA */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                  Fiyat (₺) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.priceAmount}
                  onChange={(e) => update('priceAmount', e.target.value)}
                  placeholder="Örn: 5000000"
                  className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                  Alan (m²) *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  value={form.area}
                  onChange={(e) => update('area', e.target.value)}
                  placeholder="Örn: 250"
                  className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">
                Konum
              </label>
              <input
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                placeholder="Örn: İstanbul, Beşiktaş"
                className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
              />
            </div>

            {/* ERROR */}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-50 rounded-2xl px-5 py-4">
                <AlertCircle size={18} />
                {errorMsg}
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-4 pt-4">
              <Link
                href="/admin"
                className="flex-1 py-4 border border-gray-200 text-[11px] font-black tracking-widest rounded-2xl text-center hover:bg-gray-50 transition-all"
              >
                İPTAL
              </Link>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 py-4 bg-[#00C49F] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#00A887] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> OLUŞTURULUYOR...
                  </>
                ) : (
                  'İLAN OLUŞTUR'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
