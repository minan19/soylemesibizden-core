'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Key, Plus, Trash2, Eye, EyeOff, Copy, Check,
  Zap, Building2, Crown, Loader2, AlertTriangle, Code,
} from 'lucide-react';

const PLANS = [
  { value: 'STARTER',    label: 'Starter',    limit: '1.000/gün',  color: '#3B82F6', icon: Zap },
  { value: 'GROWTH',     label: 'Growth',     limit: '10.000/gün', color: '#00C49F', icon: Building2 },
  { value: 'ENTERPRISE', label: 'Enterprise', limit: 'Sınırsız',   color: '#D4AF37', icon: Crown },
];

interface ApiKeyData {
  id: string;
  name: string;
  plan: string;
  callsToday: number;
  callsTotal: number;
  lastUsedAt: string | null;
  active: boolean;
  createdAt: string;
}

export default function ApiPortalPage() {
  const [keys, setKeys] = useState<ApiKeyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newKeyRaw, setNewKeyRaw] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', plan: 'STARTER' });
  const [error, setError] = useState<string | null>(null);

  const fetchKeys = useCallback(async () => {
    try {
      const res = await fetch('/api/keys');
      if (res.ok) setKeys(await res.json() as ApiKeyData[]);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { void fetchKeys(); }, [fetchKeys]);

  const createKey = async () => {
    if (!form.name.trim()) { setError('İsim zorunludur.'); return; }
    setError(null);
    setCreating(true);
    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { key?: string; error?: string };
      if (!res.ok) { setError(data.error ?? 'Hata'); return; }
      setNewKeyRaw(data.key ?? null);
      setShowForm(false);
      setForm({ name: '', plan: 'STARTER' });
      void fetchKeys();
    } finally { setCreating(false); }
  };

  const revokeKey = async (id: string) => {
    if (!confirm('Bu anahtarı devre dışı bırakmak istiyor musunuz?')) return;
    await fetch(`/api/keys/${id}`, { method: 'DELETE' });
    setKeys((prev) => prev.map((k) => k.id === id ? { ...k, active: false } : k));
  };

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span></Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN DATA API</p>
            <h1 className="text-4xl font-black tracking-tighter">API Portal</h1>
            <p className="text-gray-400 text-sm mt-2">B2B piyasa verisi entegrasyonu için API anahtarlarınızı yönetin.</p>
          </div>
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#0F172A] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#1E293B] transition-all">
            <Plus size={15} /> Yeni Anahtar
          </button>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {PLANS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.value} className="bg-white rounded-[24px] border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: p.color + '15' }}>
                    <Icon size={15} style={{ color: p.color }} />
                  </div>
                  <p className="text-sm font-black" style={{ color: p.color }}>{p.label}</p>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Günlük Limit</p>
                <p className="text-lg font-black text-[#0F172A]">{p.limit}</p>
              </div>
            );
          })}
        </div>

        {/* New Key Alert */}
        {newKeyRaw && (
          <div className="mb-6 bg-[#F0FDF8] border-2 border-[#00C49F] rounded-[24px] p-6">
            <div className="flex items-start gap-3 mb-3">
              <Check size={18} className="text-[#00C49F] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-black text-[#0F172A]">API Anahtarı Oluşturuldu!</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Bu anahtar bir daha gösterilmeyecek. Hemen kopyalayın.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white border border-[#00C49F]/20 rounded-2xl px-4 py-3">
              <code className="flex-1 text-sm font-mono text-[#0F172A] break-all">{newKeyRaw}</code>
              <button onClick={() => void copyKey(newKeyRaw)}
                className="shrink-0 w-8 h-8 rounded-xl bg-[#F0FDF8] hover:bg-[#00C49F] flex items-center justify-center transition-all group">
                {copied ? <Check size={14} className="text-[#00C49F] group-hover:text-white" /> : <Copy size={14} className="text-[#00C49F] group-hover:text-white" />}
              </button>
            </div>
            <button onClick={() => setNewKeyRaw(null)} className="mt-3 text-[10px] font-bold text-gray-400 hover:text-gray-600">Kapat</button>
          </div>
        )}

        {/* Create Form */}
        {showForm && (
          <div className="mb-6 bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-black mb-4">Yeni API Anahtarı</h3>
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                <AlertTriangle size={13} className="text-red-400" />
                <p className="text-[11px] font-semibold text-red-500">{error}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Ad</label>
                <input type="text" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="örn. Ziraat Bankası Entegrasyonu"
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all" />
              </div>
              <div>
                <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Plan</label>
                <select value={form.plan} onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value }))}
                  className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all">
                  {PLANS.map((p) => <option key={p.value} value={p.value}>{p.label} ({p.limit})</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => void createKey()} disabled={creating}
                className="px-5 py-2.5 bg-[#0F172A] text-white text-[11px] font-black tracking-widest uppercase rounded-xl hover:bg-[#1E293B] transition-all disabled:opacity-50 flex items-center gap-2">
                {creating ? <><Loader2 size={12} className="animate-spin" />Oluşturuluyor...</> : 'Oluştur'}
              </button>
              <button onClick={() => setShowForm(false)}
                className="px-5 py-2.5 border border-gray-200 text-[11px] font-bold text-gray-400 rounded-xl hover:bg-gray-50 transition-all">
                İptal
              </button>
            </div>
          </div>
        )}

        {/* Keys List */}
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 size={28} className="animate-spin text-[#00C49F]" /></div>
        ) : keys.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm">
            <Key size={48} className="text-gray-200 mx-auto mb-6" />
            <p className="text-lg font-black text-gray-400">Henüz API anahtarı yok</p>
            <p className="text-sm text-gray-300 mt-2">"Yeni Anahtar" ile oluşturun.</p>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-50">
              <h2 className="text-sm font-black tracking-tight">{keys.length} Anahtar</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {keys.map((k) => {
                const plan = PLANS.find((p) => p.value === k.plan) ?? PLANS[0];
                const Icon = plan.icon;
                return (
                  <div key={k.id} className={`flex items-center justify-between px-8 py-5 ${!k.active ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: plan.color + '15' }}>
                        <Icon size={18} style={{ color: plan.color }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-[#0F172A]">{k.name}</p>
                          {!k.active && <span className="text-[9px] font-black px-2 py-0.5 bg-gray-100 text-gray-400 rounded-full uppercase">Devre Dışı</span>}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: plan.color }}>{plan.label}</span>
                          <span className="text-[10px] text-gray-400">{k.callsToday.toLocaleString()} bugün / {k.callsTotal.toLocaleString()} toplam</span>
                          {k.lastUsedAt && <span className="text-[10px] text-gray-400">Son: {new Date(k.lastUsedAt).toLocaleDateString('tr-TR')}</span>}
                        </div>
                      </div>
                    </div>
                    {k.active && (
                      <button onClick={() => void revokeKey(k.id)}
                        className="w-8 h-8 rounded-xl bg-gray-50 hover:bg-red-50 flex items-center justify-center transition-colors">
                        <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Docs */}
        <div className="mt-8 bg-[#0F172A] rounded-[28px] p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Code size={18} className="text-[#00C49F]" />
            <h3 className="text-sm font-black">Hızlı Başlangıç</h3>
          </div>
          <pre className="text-[11px] text-slate-400 font-mono leading-relaxed overflow-x-auto">
{`# İstanbul piyasa verisi
curl -H "Authorization: Bearer svk_live_YOUR_KEY" \\
     https://your-domain.com/api/v1/market/istanbul

# Yanıt:
{
  "city": "istanbul",
  "avgPricePerM2": 85000,
  "medianPricePerM2": 78000,
  "totalListings": 142,
  "avgDaysOnMarket": 34,
  "investmentScore": 81,
  "generatedAt": "2026-06-03T..."
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
