'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Loader2, X, Users, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CreateProps { mode: 'trigger' }
interface JoinProps { mode: 'join'; opportunityId: string; minInvestment: number }
type Props = CreateProps | JoinProps;

const TYPES = [
  { value: 'RESIDENTIAL', label: 'Konut' },
  { value: 'COMMERCIAL', label: 'Ticari' },
  { value: 'LAND', label: 'Arsa' },
  { value: 'INDUSTRIAL', label: 'Endüstriyel' },
];

export default function InvestorNetworkClient(props: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Create form state
  const [form, setForm] = useState({
    title: '', description: '', propertyType: 'RESIDENTIAL',
    location: '', targetAmount: '', minInvestment: '', expectedReturn: '', durationMonths: '12',
  });

  // Join form state
  const [joinAmount, setJoinAmount] = useState('');

  const handleCreate = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/investor-network/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description,
          propertyType: form.propertyType, location: form.location,
          targetAmount: Number(form.targetAmount),
          minInvestment: Number(form.minInvestment),
          expectedReturn: Number(form.expectedReturn),
          durationMonths: Number(form.durationMonths),
        }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Hata'); return; }
      setSuccess(true);
      setTimeout(() => { setOpen(false); setSuccess(false); router.refresh(); }, 1500);
    } finally { setLoading(false); }
  };

  const handleJoin = async () => {
    if (props.mode !== 'join') return;
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/investor-network/opportunities/${props.opportunityId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(joinAmount) }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) { setError(data.error ?? 'Hata'); return; }
      setSuccess(true);
      setTimeout(() => { setOpen(false); setSuccess(false); router.refresh(); }, 1500);
    } finally { setLoading(false); }
  };

  if (props.mode === 'trigger') {
    return (
      <>
        <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#0F172A] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#1E293B] transition-all">
          <Plus size={15} /> Fırsat Oluştur
        </button>

        {open && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[32px] p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black">Yatırım Fırsatı Oluştur</h2>
                <button onClick={() => setOpen(false)}><X size={20} className="text-gray-400" /></button>
              </div>

              {success ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#F0FDF8] flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-[#00C49F]" />
                  </div>
                  <p className="font-black text-[#0F172A]">Fırsat Oluşturuldu!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <AlertTriangle size={13} className="text-red-400" />
                      <p className="text-[11px] font-semibold text-red-500">{error}</p>
                    </div>
                  )}
                  {[
                    { key: 'title', label: 'Başlık', placeholder: 'Beşiktaş Butik Otel Projesi' },
                    { key: 'location', label: 'Lokasyon', placeholder: 'İstanbul, Beşiktaş' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">{label}</label>
                      <input type="text" value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Açıklama</label>
                    <textarea rows={3} value={form.description}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Proje detayları, getiri mekanizması..."
                      className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all resize-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Mülk Tipi</label>
                    <div className="grid grid-cols-4 gap-2">
                      {TYPES.map((t) => (
                        <button key={t.value} type="button"
                          onClick={() => setForm((f) => ({ ...f, propertyType: t.value }))}
                          className={`px-2 py-2 rounded-xl text-[10px] font-black border transition-all ${form.propertyType === t.value ? 'bg-[#00C49F] border-[#00C49F] text-white' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'targetAmount', label: 'Hedef Tutar (₺)', placeholder: '5000000' },
                      { key: 'minInvestment', label: 'Minimum (₺)', placeholder: '500000' },
                      { key: 'expectedReturn', label: 'Getiri %/yıl', placeholder: '18' },
                      { key: 'durationMonths', label: 'Süre (ay)', placeholder: '24' },
                    ].map(({ key, label, placeholder }) => (
                      <div key={key}>
                        <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">{label}</label>
                        <input type="number" value={form[key as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all" />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => void handleCreate()} disabled={loading}
                    className="w-full py-4 bg-[#0F172A] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#1E293B] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <><Loader2 size={14} className="animate-spin" />Oluşturuluyor...</> : 'Fırsatı Yayınla'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  // Join mode
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="px-5 py-2.5 bg-[#00C49F] hover:bg-[#00A887] text-white text-[10px] font-black tracking-widest uppercase rounded-2xl transition-all">
        Katıl
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black">Fırsata Katıl</h2>
              <button onClick={() => setOpen(false)}><X size={20} className="text-gray-400" /></button>
            </div>

            {success ? (
              <div className="text-center py-6">
                <p className="font-black text-[#00C49F]">Katılım talebiniz alındı!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <AlertTriangle size={13} className="text-red-400" />
                    <p className="text-[11px] font-semibold text-red-500">{error}</p>
                  </div>
                )}
                <div>
                  <label className="text-[10px] font-black tracking-widest uppercase text-gray-400 block mb-2">Katılım Tutarı (₺)</label>
                  <p className="text-[11px] text-gray-400 mb-2">Minimum: {formatCurrency(props.minInvestment)}</p>
                  <input type="number" value={joinAmount}
                    onChange={(e) => setJoinAmount(e.target.value)}
                    placeholder={props.minInvestment.toString()}
                    className="w-full bg-[#F8FAFC] border border-gray-100 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#00C49F] transition-all" />
                </div>
                <button onClick={() => void handleJoin()} disabled={loading || !joinAmount}
                  className="w-full py-4 bg-[#00C49F] hover:bg-[#00A887] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? <><Loader2 size={14} className="animate-spin" />İşleniyor...</> : 'Katılımı Onayla'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
