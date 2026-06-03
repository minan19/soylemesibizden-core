'use client';

import { useState } from 'react';
import { HandCoins, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import NegotiationAdvisor from '@/components/NegotiationAdvisor';

interface OfferFormProps {
  listingId: string;
  listingPrice: number;
  location?: string;
  propertyType?: string;
  daysOnMarket?: number;
  offerCount?: number;
}

export default function OfferForm({
  listingId,
  listingPrice,
  location = '',
  propertyType = 'RESIDENTIAL',
  daysOnMarket = 0,
  offerCount = 0,
}: OfferFormProps) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount.replace(/[.,]/g, ''));
    if (!num || num <= 0) {
      setStatus('error');
      setMessage('Geçerli bir teklif tutarı giriniz.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, amount: num }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? 'Teklif gönderilemedi.');
      } else {
        setStatus('success');
        setMessage('Teklifiniz başarıyla iletildi!');
        setAmount('');
      }
    } catch {
      setStatus('error');
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    }
  };

  const pct = amount
    ? (((parseFloat(amount.replace(/[.,]/g, '')) - listingPrice) / listingPrice) * 100).toFixed(1)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-[28px] p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-[#F0FDF8] flex items-center justify-center">
          <HandCoins size={20} className="text-[#00C49F]" />
        </div>
        <div>
          <h3 className="font-black text-[#0F172A] tracking-tight">Teklif Ver</h3>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
            Sovereign Offer Protocol
          </p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="flex flex-col items-center py-8 text-center gap-4">
          <CheckCircle size={48} className="text-[#00C49F]" />
          <p className="font-bold text-[#0F172A]">{message}</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-[11px] font-bold text-[#00C49F] underline"
          >
            Yeni teklif ver
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase block mb-2">
              Teklif Tutarı (₺)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setStatus('idle'); }}
              placeholder={`Örn: ${Math.floor(listingPrice * 0.95).toLocaleString('tr-TR')}`}
              className="w-full px-5 py-4 text-lg font-bold bg-[#F8FAFC] border border-gray-100 rounded-2xl outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
            />
            {pct !== null && !isNaN(Number(pct)) && (
              <p
                className={`text-[11px] font-bold mt-2 ${
                  Number(pct) < 0 ? 'text-[#00C49F]' : 'text-amber-500'
                }`}
              >
                İlan fiyatının{' '}
                {Number(pct) < 0
                  ? `%${Math.abs(Number(pct))} altında`
                  : `%${pct} üzerinde`}
              </p>
            )}
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-4 text-[11px] font-semibold text-gray-500">
            <div className="flex justify-between">
              <span>İlan Fiyatı</span>
              <span className="font-bold text-[#0F172A]">{formatCurrency(listingPrice)}</span>
            </div>
          </div>

          {/* AI Müzakere Asistanı */}
          <NegotiationAdvisor
            listingPrice={listingPrice}
            offerAmount={parseFloat(amount) || 0}
            location={location}
            propertyType={propertyType}
            daysOnMarket={daysOnMarket}
            offerCount={offerCount}
          />

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-[12px] font-semibold">
              <AlertCircle size={16} />
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !amount}
            className="w-full py-4 bg-[#0F172A] text-white text-[11px] font-black tracking-widest rounded-2xl hover:bg-[#1E293B] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" /> GÖNDERİLİYOR...
              </>
            ) : (
              'TEKLİFİ GÖNDER'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
