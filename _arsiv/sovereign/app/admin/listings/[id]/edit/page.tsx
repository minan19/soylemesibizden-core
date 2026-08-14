'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, Save, Trash2 } from 'lucide-react';

const PROPERTY_TYPES = ['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL'];
const STATUS_OPTIONS = ['ACTIVE', 'PENDING', 'SOLD', 'RENTED'];
const PROPERTY_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut', COMMERCIAL: 'Ticari', LAND: 'Arazi', INDUSTRIAL: 'Endüstriyel',
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

export default function AdminEditListingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState<FormState>({
    title: '', description: '', propertyType: 'RESIDENTIAL',
    priceAmount: '', area: '', location: '', status: 'ACTIVE',
  });
  const [loadStatus, setLoadStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'loading'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetch(`/api/listings/${id}`)
      .then((r) => r.json())
      .then((data: { title?: string; description?: string; propertyType?: string; priceAmount?: number; area?: number; location?: string; status?: string; error?: string }) => {
        if (data.error) { setLoadStatus('error'); return; }
        setForm({
          title: data.title ?? '',
          description: data.description ?? '',
          propertyType: data.propertyType ?? 'RESIDENTIAL',
          priceAmount: String(data.priceAmount ?? ''),
          area: String(data.area ?? ''),
          location: data.location ?? '',
          status: data.status ?? 'ACTIVE',
        });
        setLoadStatus('loaded');
      })
      .catch(() => setLoadStatus('error'));
  }, [id]);

  const update = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          priceAmount: parseFloat(form.priceAmount),
          area: parseFloat(form.area),
        }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setSaveStatus('error'); setErrorMsg(data.error ?? 'Güncellenemedi.'); }
      else { setSaveStatus('success'); setTimeout(() => router.push('/admin'), 1200); }
    } catch {
      setSaveStatus('error');
      setErrorMsg('Bağlantı hatası.');
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    setDeleteStatus('loading');
    try {
      await fetch(`/api/listings/${id}`, { method: 'DELETE' });
      router.push('/admin');
    } catch {
      setDeleteStatus('idle');
    }
  };

  if (loadStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[#00C49F]" />
      </div>
    );
  }

  if (loadStatus === 'error') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-4">
        <AlertCircle size={48} className="text-red-400" />
        <p className="font-bold text-gray-500">İlan bulunamadı.</p>
        <Link href="/admin" className="text-[#00C49F] font-bold hover:underline">Admin Panele Dön</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Admin Panel
          </Link>
          <span className="text-gray-200">·</span>
          <span className="text-[11px] font-bold text-[#0F172A] truncate max-w-xs">{form.title || 'İlan Düzenle'}</span>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleteStatus === 'loading'}
          className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-black rounded-full transition-all ${
            confirmDelete
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'border border-red-200 text-red-400 hover:bg-red-50'
          }`}
        >
          {deleteStatus === 'loading' ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
          {confirmDelete ? 'EMİN MİSİNİZ? TEKRAR TIKLAYIN' : 'İLANI SİL'}
        </button>
      </nav>

      <div className="max-w-3xl mx-auto px-8 py-12">
        {saveStatus === 'success' ? (
          <div className="bg-white rounded-[40px] border border-gray-100 p-16 shadow-sm flex flex-col items-center text-center gap-6">
            <CheckCircle size={64} className="text-[#00C49F]" />
            <p className="text-xl font-black text-[#0F172A]">İlan başarıyla güncellendi!</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <Save size={20} className="text-[#00C49F]" />
              <h1 className="text-2xl font-black tracking-tighter">İlan Düzenle</h1>
            </div>

            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">İlan Başlığı *</label>
              <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
            </div>

            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Açıklama</label>
              <textarea rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Varlık Tipi *</label>
                <select required value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 transition-all appearance-none">
                  {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{PROPERTY_LABELS[t] ?? t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Durum *</label>
                <select required value={form.status} onChange={(e) => update('status', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 transition-all appearance-none">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Fiyat (₺) *</label>
                <input required type="number" min="1" step="0.01" value={form.priceAmount} onChange={(e) => update('priceAmount', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Alan (m²) *</label>
                <input required type="number" min="1" step="0.01" value={form.area} onChange={(e) => update('area', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black tracking-widest text-gray-400 uppercase mb-2">Konum</label>
              <input value={form.location} onChange={(e) => update('location', e.target.value)} className="w-full px-5 py-4 text-base font-semibold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all" />
            </div>

            {saveStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm font-semibold bg-red-50 rounded-2xl px-5 py-4">
                <AlertCircle size={18} /> {errorMsg}
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Link href="/admin" className="flex-1 py-4 border border-gray-200 text-[11px] font-black tracking-widest rounded-2xl text-center hover:bg-gray-50 transition-all">İPTAL</Link>
              <button type="submit" disabled={saveStatus === 'loading'} className="flex-1 py-4 bg-[#00C49F] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#00A887] disabled:opacity-50 transition-all flex items-center justify-center gap-3">
                {saveStatus === 'loading' ? <><Loader2 size={16} className="animate-spin" /> KAYDEDİLİYOR...</> : <><Save size={16} /> KAYDET</>}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
