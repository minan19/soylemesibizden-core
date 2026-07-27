'use client';

import { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface OfferFormProps {
  listingId: string;
  listingPrice: number;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

export default function OfferForm({ listingId, listingPrice }: OfferFormProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState(listingPrice.toString());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const numericAmount = parseFloat(amount) || 0;
  const diff = numericAmount > 0 ? ((numericAmount - listingPrice) / listingPrice) * 100 : 0;
  const isBelow = diff < -0.5;
  const isAbove = diff > 0.5;

  if (!session) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Teklif Ver</h3>
        <p className="text-sm text-gray-500 text-center py-2">
          Teklif vermek için{' '}
          <a href="/login" className="text-[#00C49F] font-semibold hover:underline">
            giriş yapın
          </a>
        </p>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId, amount: parseFloat(amount) }),
      });

      if (res.status === 201) {
        setSuccess(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Teklif gönderilemedi. Lütfen tekrar deneyin.');
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4">Teklif Ver</h3>
      {success ? (
        <div className="p-3 bg-[#F0FDF8] text-[#00C49F] rounded-xl text-sm font-semibold text-center">
          ✓ Teklifiniz iletildi. Satıcı en kısa sürede dönecek.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                Teklifiniz (₺)
              </label>
              <span className="text-xs text-gray-400">
                İlan: {formatPrice(listingPrice)}
              </span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-semibold focus:outline-none focus:border-[#00C49F]"
              required
              min="1"
            />
          </div>

          {/* Price comparison feedback */}
          {numericAmount > 0 && Math.abs(diff) > 0.5 && (
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
              isAbove
                ? 'bg-blue-50 text-blue-700'
                : isBelow
                ? 'bg-amber-50 text-amber-700'
                : 'bg-gray-50 text-gray-600'
            }`}>
              {isAbove ? <TrendingUp size={13} /> : isBelow ? <TrendingDown size={13} /> : <Minus size={13} />}
              İlan fiyatının{' '}
              <strong>{Math.abs(diff).toFixed(1)}% {isAbove ? 'üzerinde' : 'altında'}</strong>
              {isBelow && Math.abs(diff) > 15 && (
                <span className="ml-1 opacity-80">(düşük teklif)</span>
              )}
            </div>
          )}

          {/* Quick price chips */}
          <div className="flex gap-2 flex-wrap">
            {[0.9, 0.95, 1.0, 1.05].map(factor => (
              <button
                key={factor}
                type="button"
                onClick={() => setAmount(Math.round(listingPrice * factor).toString())}
                className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                  Math.round(numericAmount) === Math.round(listingPrice * factor)
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#00C49F]/50'
                }`}
              >
                {factor === 1.0 ? 'Tam fiyat' : factor < 1 ? `-${Math.round((1 - factor) * 100)}%` : `+${Math.round((factor - 1) * 100)}%`}
              </button>
            ))}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? 'Gönderiliyor…' : 'Teklif Gönder'}
          </button>
        </form>
      )}
    </div>
  );
}
