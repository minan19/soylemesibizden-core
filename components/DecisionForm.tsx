'use client';

import { useState } from 'react';
import { Listing } from '@prisma/client';
import { Loader } from 'lucide-react';

interface Props {
  listings: Listing[];
  onSubmit: (data: any) => Promise<void>;
}

export default function DecisionForm({ listings, onSubmit }: Props) {
  const [selectedListing, setSelectedListing] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    age: 35,
    income: 50000,
    totalAssets: 500000,
    existingDebt: 0,
    riskTolerance: 'MEDIUM' as const,
    holdDuration: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedProp = listings.find(l => l.id === selectedListing);
      if (!selectedProp) {
        alert('Lütfen bir mülk seçin');
        return;
      }

      await onSubmit({
        userProfile: formData,
        propertyInput: {
          price: selectedProp.priceAmount,
          area: selectedProp.area,
          location: selectedProp.location || 'İstanbul',
          type: selectedProp.propertyType,
          estimatedRental: (selectedProp.priceAmount * 0.04) / 12,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Mülk Seçimi */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Mülk Seç</label>
        <select
          value={selectedListing}
          onChange={e => setSelectedListing(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 font-medium"
          required
        >
          <option value="">— Mülk Seçin —</option>
          {listings.map(listing => (
            <option key={listing.id} value={listing.id}>
              {listing.title} — {(listing.priceAmount / 1_000_000).toFixed(1)}M ₺
            </option>
          ))}
        </select>
      </div>

      {/* Profil Bilgileri */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-gray-900 mb-4">Profil Bilgileri</h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Yaş</label>
          <input
            type="number"
            value={formData.age}
            onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Aylık Gelir (₺)</label>
          <input
            type="number"
            value={formData.income}
            onChange={e => setFormData({ ...formData, income: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Toplam Varlık (₺)</label>
          <input
            type="number"
            value={formData.totalAssets}
            onChange={e => setFormData({ ...formData, totalAssets: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Var olan Borç (₺)</label>
          <input
            type="number"
            value={formData.existingDebt}
            onChange={e => setFormData({ ...formData, existingDebt: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Risk Toleransı</label>
          <select
            value={formData.riskTolerance}
            onChange={e => setFormData({ ...formData, riskTolerance: e.target.value as any })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="LOW">Düşük</option>
            <option value="MEDIUM">Orta</option>
            <option value="HIGH">Yüksek</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tutma Süresi (yıl)</label>
          <input
            type="number"
            min="1"
            max="50"
            value={formData.holdDuration}
            onChange={e => setFormData({ ...formData, holdDuration: parseInt(e.target.value) })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !selectedListing}
        className="w-full bg-[#0F172A] text-white py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1E293B] transition flex items-center justify-center gap-2"
      >
        {loading && <Loader size={18} className="animate-spin" />}
        {loading ? 'Analiz Ediliyor...' : 'Karar Analizi Yap'}
      </button>
    </form>
  );
}
