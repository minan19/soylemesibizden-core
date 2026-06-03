'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const PLANS = ['BASIC', 'PRO', 'ENTERPRISE'] as const;
const PLAN_LABELS = { BASIC: 'Basic Partner', PRO: 'Pro Partner', ENTERPRISE: 'Enterprise' };

export default function FranchiseApplyForm() {
  const [form, setForm] = useState({
    companyName: '', slug: '', plan: 'PRO' as typeof PLANS[number],
    contactEmail: '', contactPhone: '', city: '', customDomain: '',
    primaryColor: '#00C49F', accentColor: '#0F172A',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/franchise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          customDomain: form.customDomain || undefined,
        }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Başvuru gönderilemedi.'); return; }
      setSuccess(true);
    } finally { setLoading(false); }
  };

  if (success) {
    return (
      <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm">
        <CheckCircle size={56} className="text-[#00C49F] mx-auto mb-6" />
        <h3 className="text-2xl font-black tracking-tighter text-[#0F172A] mb-3">Başvurunuz Alındı!</h3>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Ekibimiz 24 saat içinde <strong>{form.contactEmail}</strong> adresine dönecektir.
          Franchise paneliniz hazırlandığında bilgilendirileceksiniz.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[32px] border border-gray-100 p-10 shadow-sm">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 mb-6">
          <AlertTriangle size={15} className="text-red-400 shrink-0" />
          <p className="text-sm font-semibold text-red-500">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Plan */}
        <div className="col-span-2">
          <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-3">Plan Seçimi</label>
          <div className="grid grid-cols-3 gap-3">
            {PLANS.map((p) => (
              <button key={p} type="button" onClick={() => setForm((f) => ({ ...f, plan: p }))}
                className={`px-4 py-3 rounded-2xl text-[11px] font-black tracking-wide border transition-all ${
                  form.plan === p ? 'bg-[#0F172A] border-[#0F172A] text-white' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-300'
                }`}>
                {PLAN_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {[
          { key: 'companyName', label: 'Şirket Adı', placeholder: 'RE/MAX Anadolu', required: true },
          { key: 'slug', label: 'Platform Kodu (slug)', placeholder: 'remax-anadolu', required: true },
          { key: 'contactEmail', label: 'İletişim E-postası', placeholder: 'info@firmaniz.com', required: true, type: 'email' },
          { key: 'contactPhone', label: 'Telefon', placeholder: '+90 212 000 00 00', required: false },
          { key: 'city', label: 'Merkez Şehir', placeholder: 'İstanbul', required: true },
          { key: 'customDomain', label: 'Özel Alan Adı (opsiyonel)', placeholder: 'portal.firmaniz.com', required: false },
        ].map(({ key, label, placeholder, required, type }) => (
          <div key={key}>
            <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">{label}</label>
            <input
              type={type ?? 'text'} required={required}
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold text-[#0F172A] focus:outline-none focus:border-[#00C49F] transition-all"
            />
            {key === 'slug' && (
              <p className="text-[10px] text-gray-400 mt-1">
                Platform URL: {form.slug || 'kod'}.soylemesibizden.com
              </p>
            )}
          </div>
        ))}

        {/* Renk Seçimi */}
        <div>
          <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Ana Renk</label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.primaryColor}
              onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))}
              className="w-12 h-12 rounded-2xl border border-gray-100 cursor-pointer" />
            <input type="text" value={form.primaryColor}
              onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))}
              className="flex-1 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#00C49F] transition-all" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Aksent Renk</label>
          <div className="flex items-center gap-3">
            <input type="color" value={form.accentColor}
              onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))}
              className="w-12 h-12 rounded-2xl border border-gray-100 cursor-pointer" />
            <input type="text" value={form.accentColor}
              onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))}
              className="flex-1 bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#00C49F] transition-all" />
          </div>
        </div>

        {/* Preview */}
        <div className="col-span-2 rounded-2xl p-5 border border-gray-100 overflow-hidden">
          <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3">Önizleme</p>
          <div className="rounded-xl overflow-hidden border border-gray-100">
            <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: form.accentColor }}>
              <span className="text-[11px] font-black tracking-widest uppercase text-white">
                {form.companyName || 'ŞİRKET ADI'}
              </span>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: form.primaryColor }}>
                <span className="text-[10px] font-black text-white">AI</span>
              </div>
            </div>
            <div className="bg-[#F8FAFC] px-6 py-4">
              <div className="h-3 rounded-full mb-2 w-3/4" style={{ backgroundColor: form.primaryColor + '30' }} />
              <div className="h-2 rounded-full mb-1 w-1/2 bg-gray-200" />
              <div className="h-2 rounded-full w-2/3 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" disabled={loading}
        className="mt-8 w-full flex items-center justify-center gap-3 py-5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl transition-all disabled:opacity-50">
        {loading ? <><Loader2 size={16} className="animate-spin" /> Gönderiliyor...</> : 'Franchise Başvurusu Gönder'}
      </button>
    </form>
  );
}
