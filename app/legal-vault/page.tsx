'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, FileText, Upload, Trash2, Eye, Loader2,
  Shield, AlertTriangle, File, Plus, X,
} from 'lucide-react';

const DOC_TYPES = [
  { value: 'TAPU',       label: 'Tapu Senedi',           color: '#00C49F' },
  { value: 'SOZLESME',   label: 'Sözleşme',              color: '#3B82F6' },
  { value: 'DEGERLEME',  label: 'Ekspertiz',             color: '#F59E0B' },
  { value: 'SIGORTA',    label: 'Sigorta',               color: '#8B5CF6' },
  { value: 'DIGER',      label: 'Diğer',                 color: '#94A3B8' },
] as const;

type DocType = typeof DOC_TYPES[number]['value'];

interface Document {
  id: string;
  name: string;
  type: DocType;
  url: string;
  size: number;
  notes: string | null;
  createdAt: string;
}

function formatBytes(b: number) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
  return (b / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function LegalVaultPage() {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: '', type: 'TAPU' as DocType, notes: '' });

  const fetchDocs = useCallback(async () => {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) setDocs(await res.json() as Document[]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void fetchDocs(); }, [fetchDocs]);

  const handleUpload = async (file: File) => {
    if (!form.name.trim()) { setError('Belge adı zorunludur.'); return; }
    setError(null);
    setUploading(true);
    try {
      const saveRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, type: form.type,
          url: `https://placeholder.blob/${encodeURIComponent(file.name)}`,
          size: file.size, mimeType: file.type,
          notes: form.notes || undefined,
        }),
      });
      if (!saveRes.ok) throw new Error('Kayıt hatası');
      setShowForm(false);
      setForm({ name: '', type: 'TAPU', notes: '' });
      void fetchDocs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hata');
    } finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu belgeyi silmek istiyor musunuz?')) return;
    await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const tc = (type: DocType) => DOC_TYPES.find((t) => t.value === type) ?? DOC_TYPES[4];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span></Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN LEGAL</p>
            <h1 className="text-4xl font-black tracking-tighter">Legal Vault</h1>
            <p className="text-gray-400 text-sm mt-2">Tapu, sözleşme ve değerleme belgelerinizi güvende saklayın.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#0F172A] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#1E293B] transition-all">
            <Plus size={15} /> Belge Ekle
          </button>
        </div>

        <div className="grid grid-cols-5 gap-3 mb-8">
          {DOC_TYPES.map((t) => {
            const count = docs.filter((d) => d.type === t.value).length;
            return (
              <div key={t.value} className="bg-white rounded-[20px] border border-gray-100 p-4 text-center shadow-sm">
                <p className="text-2xl font-black mb-1" style={{ color: t.color }}>{count}</p>
                <p className="text-[9px] font-bold text-gray-400 leading-tight">{t.label}</p>
              </div>
            );
          })}
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">Belge Ekle</h2>
                <button onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Belge Adı</label>
                  <input type="text" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="örn. Kadıköy Dairesi Tapusu"
                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Tür</label>
                  <div className="grid grid-cols-3 gap-2">
                    {DOC_TYPES.map((t) => (
                      <button key={t.value} type="button"
                        onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                        className={`px-3 py-2 rounded-xl text-[10px] font-black tracking-wide border transition-all ${form.type === t.value ? 'text-white border-transparent' : 'bg-gray-50 border-gray-100 text-gray-400'}`}
                        style={form.type === t.value ? { backgroundColor: t.color } : {}}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Not</label>
                  <textarea rows={2} value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    placeholder="Opsiyonel not..."
                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all resize-none" />
                </div>
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertTriangle size={13} className="text-red-400" />
                    <p className="text-[11px] font-semibold text-red-500">{error}</p>
                  </div>
                )}
                <div onClick={() => inputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 hover:border-[#00C49F]/50 rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all hover:bg-gray-50">
                  {uploading ? <Loader2 size={24} className="animate-spin text-[#00C49F]" /> : (
                    <>
                      <Upload size={24} className="text-gray-400" />
                      <p className="text-[12px] font-bold text-gray-500">PDF veya resim seç</p>
                    </>
                  )}
                  <input ref={inputRef} type="file" accept=".pdf,image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleUpload(f); }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {preview && (
          <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
            <div className="flex items-center justify-between px-8 py-4 bg-[#0F172A] text-white">
              <p className="font-bold">{preview.name}</p>
              <button onClick={() => setPreview(null)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><X size={16} /></button>
            </div>
            <iframe src={preview.url} className="flex-1 w-full bg-gray-900" title={preview.name} />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-[#00C49F]" /></div>
        ) : docs.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm">
            <Shield size={48} className="text-gray-200 mx-auto mb-6" />
            <p className="text-lg font-black text-gray-400">Henüz belge eklenmemiş</p>
            <p className="text-sm text-gray-300 mt-2 mb-6">Tapu, sözleşme ve değerleme belgelerinizi güvende saklayın.</p>
            <button onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-[#00C49F] text-white text-[11px] font-black rounded-full hover:bg-[#00A887] transition-all tracking-widest uppercase">
              İlk Belgeyi Ekle
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50">
              <h2 className="text-sm font-black tracking-tight">{docs.length} Belge</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {docs.map((doc) => {
                const t = tc(doc.type);
                return (
                  <div key={doc.id} className="flex items-center justify-between px-8 py-5 hover:bg-[#F8FAFC] transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: t.color + '15' }}>
                        <File size={18} style={{ color: t.color }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#0F172A]">{doc.name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: t.color }}>{t.label}</span>
                          <span className="text-[10px] text-gray-400">{formatBytes(doc.size)}</span>
                        </div>
                        {doc.notes && <p className="text-[11px] text-gray-400 mt-0.5">{doc.notes}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPreview(doc)} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] flex items-center justify-center transition-colors" title="Görüntüle">
                        <Eye size={14} className="text-gray-400" />
                      </button>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-colors" title="Aç">
                        <FileText size={14} className="text-gray-400" />
                      </a>
                      <button onClick={() => void handleDelete(doc.id)} className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 flex items-center justify-center transition-colors" title="Sil">
                        <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
