'use client';

import { useState, FormEvent } from 'react';
import { useSession } from 'next-auth/react';

interface OfferFormProps {
  listingId: string;
  listingPrice: number;
}

export default function OfferForm({ listingId, listingPrice }: OfferFormProps) {
  const { data: session } = useSession();
  const [amount, setAmount] = useState(listingPrice.toString());
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      const userId = (session?.user as { id?: string })?.id;
      if (!userId) {
        setError('Oturum bilgisi alınamadı. Lütfen tekrar giriş yapın.');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId,
          userId,
          amount: parseFloat(amount),
        }),
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
          ✓ Teklifiniz iletildi
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Teklifiniz (₺)
            </label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full mt-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono font-semibold focus:outline-none focus:border-[#00C49F]"
              required
              min="1"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? 'Gönderiliyor...' : 'Teklif Gönder'}
          </button>
        </form>
      )}
    </div>
  );
}
