'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react';

const ASSET_TYPES = ['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL'];
const TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut', COMMERCIAL: 'Ticari', LAND: 'Arazi', INDUSTRIAL: 'Endüstriyel',
};

export default function AssetCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState({ type: 'RESIDENTIAL', value: '', location: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, value: parseFloat(form.value) }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setStatus('error'); setError(data.error ?? 'Hata'); return; }
      setStatus('success');
      setTimeout(() => { setStatus('idle'); setForm({ type: 'RESIDENTIAL', value: '', location: '' }); router.refresh(); }, 1500);
    } catch {
      setStatus('error');
      setError('Bağlantı hatası.');
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
          <Database size={20} className="text-[#00C49F]" />
        </div>
        <div>
          <h3 className="font-black text-[#0F172A]">Varlık Ekle</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Asset Registry</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center py-8 text-center gap-3">
          <CheckCircle size={40} className="text-[#00C49F]" />
          <p className="font-bold text-[#0F172A]">Varlık kaydedildi!</p>
        </div>
      ) : (
        <form onSubmit={handle} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Varlık Tipi</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              className="w-full px-4 py-3.5 text-sm font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 appearance-none transition-all">
              {ASSET_TYPES.map((t) => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Değer (₺)</label>
            <input required type="number" min="1" step="0.01" value={form.value}
              onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
              placeholder="Örn: 2500000"
              className="w-full px-4 py-3.5 text-sm font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
          </div>
          <div>
            <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Konum</label>
            <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              placeholder="Örn: İstanbul, Kadıköy"
              className="w-full px-4 py-3.5 text-sm font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
          </div>
          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-[12px] font-semibold bg-red-50 rounded-2xl px-4 py-3">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <button type="submit" disabled={status === 'loading' || !form.value}
            className="w-full py-4 bg-[#00C49F] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#00A887] disabled:opacity-50 transition-all flex items-center justify-center gap-2">
            {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> KAYDEDİLİYOR...</> : <><Plus size={16} /> VARLIK EKLE</>}
          </button>
        </form>
      )}
    </div>
  );
}
