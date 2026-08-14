'use client';

import { useState } from 'react';
import { Flag, X, Loader2, CheckCircle } from 'lucide-react';

const REASONS = [
  { value: 'YANILTICI', label: 'Yanıltıcı veya yanlış bilgi' },
  { value: 'YANLIS_FIYAT', label: 'Yanlış fiyat' },
  { value: 'KOPYALA', label: 'Kopya / tekrar ilan' },
  { value: 'UYGUNSUZ', label: 'Uygunsuz içerik' },
  { value: 'DIGER', label: 'Diğer' },
];

interface Props {
  listingId: string;
}

export default function ReportListingButton({ listingId }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!reason) return;
    setLoading(true);
    try {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, reason, details }),
      });
      setDone(true);
      setTimeout(() => { setOpen(false); setDone(false); setReason(''); setDetails(''); }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
        title="Bu ilanı şikayet et"
      >
        <Flag size={12} /> Şikayet Et
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">İlanı Şikayet Et</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-700">
                <X size={16} />
              </button>
            </div>

            {done ? (
              <div className="py-6 text-center">
                <CheckCircle size={36} className="text-[#00C49F] mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-800">Şikayetiniz iletildi</p>
                <p className="text-xs text-gray-400 mt-1">Ekibimiz inceleyecektir.</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-600 block">Şikayet Nedeni *</label>
                  {REASONS.map(r => (
                    <label key={r.value} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-[#00C49F]/50 transition-colors">
                      <input
                        type="radio"
                        name="reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={() => setReason(r.value)}
                        className="accent-[#00C49F]"
                      />
                      <span className="text-sm text-gray-700">{r.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Ek Açıklama (İsteğe bağlı)</label>
                  <textarea
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder="Detayları buraya yazın…"
                    rows={3}
                    maxLength={500}
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl resize-none focus:outline-none focus:border-[#00C49F] transition-colors"
                  />
                </div>

                <button
                  onClick={submit}
                  disabled={!reason || loading}
                  className="w-full py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <Flag size={15} />}
                  Şikayeti Gönder
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
