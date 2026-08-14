'use client';

import { useState, useMemo, useEffect } from 'react';
import { Plus, Trash2, TrendingUp, Home, PieChart, Calculator } from 'lucide-react';

function fmt(n: number, dec = 0) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency', currency: 'TRY',
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  }).format(n);
}

interface Property {
  id: string;
  name: string;
  purchasePrice: number;
  currentValue: number;
  monthlyRent: number;
  purchaseYear: number;
  area: number;
  city: string;
  type: string;
}

const EMPTY: Omit<Property, 'id'> = {
  name: '', purchasePrice: 0, currentValue: 0, monthlyRent: 0,
  purchaseYear: new Date().getFullYear(), area: 0, city: '', type: 'Konut',
};

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function PortfoyClient() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem('portfoy_v1');
    if (stored) {
      try { setProperties(JSON.parse(stored)); } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('portfoy_v1', JSON.stringify(properties));
  }, [properties]);

  const summary = useMemo(() => {
    const totalPurchase = properties.reduce((s, p) => s + p.purchasePrice, 0);
    const totalCurrent = properties.reduce((s, p) => s + p.currentValue, 0);
    const totalMonthlyRent = properties.reduce((s, p) => s + p.monthlyRent, 0);
    const totalAnnualRent = totalMonthlyRent * 12;
    const totalGain = totalCurrent - totalPurchase;
    const gainPct = totalPurchase > 0 ? (totalGain / totalPurchase) * 100 : 0;
    const grossYield = totalCurrent > 0 ? (totalAnnualRent / totalCurrent) * 100 : 0;
    const totalArea = properties.reduce((s, p) => s + p.area, 0);
    const avgPricePerM2 = totalArea > 0 ? totalCurrent / totalArea : 0;

    // By city
    const byCityMap = new Map<string, { value: number; count: number }>();
    for (const p of properties) {
      const c = p.city || 'Diğer';
      const existing = byCityMap.get(c) ?? { value: 0, count: 0 };
      byCityMap.set(c, { value: existing.value + p.currentValue, count: existing.count + 1 });
    }
    const byCity = Array.from(byCityMap.entries())
      .map(([city, d]) => ({ city, value: d.value, count: d.count, pct: totalCurrent > 0 ? (d.value / totalCurrent) * 100 : 0 }))
      .sort((a, b) => b.value - a.value);

    return { totalPurchase, totalCurrent, totalMonthlyRent, totalAnnualRent, totalGain, gainPct, grossYield, totalArea, avgPricePerM2, byCity };
  }, [properties]);

  function save() {
    if (!form.name || !form.currentValue) return;
    if (editId) {
      setProperties(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p));
    } else {
      setProperties(prev => [...prev, { ...form, id: uid() }]);
    }
    setForm(EMPTY);
    setShowForm(false);
    setEditId(null);
  }

  function startEdit(p: Property) {
    setForm({ name: p.name, purchasePrice: p.purchasePrice, currentValue: p.currentValue, monthlyRent: p.monthlyRent, purchaseYear: p.purchaseYear, area: p.area, city: p.city, type: p.type });
    setEditId(p.id);
    setShowForm(true);
  }

  function remove(id: string) {
    setProperties(prev => prev.filter(p => p.id !== id));
  }

  const Field = ({ label, name, type = 'text', placeholder = '' }: { label: string; name: keyof typeof form; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={(form[name] as string | number) || ''}
        onChange={e => setForm(f => ({ ...f, [name]: type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary */}
      {properties.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Toplam Portföy Değeri', value: fmt(summary.totalCurrent), color: 'text-[#00C49F]' },
              { label: 'Toplam Kazanç', value: fmt(summary.totalGain), color: summary.totalGain >= 0 ? 'text-green-600' : 'text-red-500', sub: `${summary.gainPct > 0 ? '+' : ''}${summary.gainPct.toFixed(1)}%` },
              { label: 'Aylık Kira Geliri', value: fmt(summary.totalMonthlyRent), color: 'text-blue-600' },
              { label: 'Brüt Kira Getirisi', value: `%${summary.grossYield.toFixed(1)}`, color: 'text-amber-600' },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                {'sub' in m && m.sub && <p className="text-xs text-gray-400">{m.sub}</p>}
                <p className="text-xs text-gray-400 mt-1">{m.label}</p>
              </div>
            ))}
          </div>

          {/* City breakdown */}
          {summary.byCity.length > 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <PieChart size={13} /> Şehir Dağılımı
              </h3>
              <div className="space-y-2.5">
                {summary.byCity.map((c, i) => {
                  const colors = ['bg-[#00C49F]', 'bg-blue-400', 'bg-amber-400', 'bg-violet-400', 'bg-red-400'];
                  return (
                    <div key={c.city} className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${colors[i % colors.length]}`} />
                      <span className="text-xs font-semibold text-gray-700 w-24 shrink-0">{c.city}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${colors[i % colors.length]}`} style={{ width: `${c.pct}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-600 shrink-0">{c.pct.toFixed(0)}%</span>
                      <span className="text-xs text-gray-400 shrink-0">{fmt(c.value)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Property list */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">Mülklerim ({properties.length})</h3>
              <p className="text-xs text-gray-400">{summary.totalArea} m² toplam</p>
            </div>
            <div className="divide-y divide-gray-50">
              {properties.map(p => {
                const gain = p.currentValue - p.purchasePrice;
                const gainPct = p.purchasePrice > 0 ? (gain / p.purchasePrice) * 100 : 0;
                const yield_ = p.currentValue > 0 ? ((p.monthlyRent * 12) / p.currentValue) * 100 : 0;
                const years = new Date().getFullYear() - p.purchaseYear;
                return (
                  <div key={p.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-gray-900">{p.name}</p>
                          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{p.type}</span>
                          {p.city && <span className="text-[10px] text-gray-400">{p.city}</span>}
                        </div>
                        <div className="flex gap-4 mt-2 text-xs">
                          <span className="text-gray-500">Alış: <b className="text-gray-700">{fmt(p.purchasePrice)}</b></span>
                          <span className="text-gray-500">Güncel: <b className="text-[#00C49F]">{fmt(p.currentValue)}</b></span>
                          {p.monthlyRent > 0 && <span className="text-gray-500">Kira: <b className="text-blue-600">{fmt(p.monthlyRent)}/ay</b></span>}
                        </div>
                        <div className="flex gap-4 mt-1 text-xs">
                          <span className={gain >= 0 ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                            {gain >= 0 ? '+' : ''}{fmt(gain)} ({gainPct.toFixed(1)}%)
                          </span>
                          {yield_ > 0 && <span className="text-amber-600">Getiri: %{yield_.toFixed(1)}</span>}
                          {years > 0 && <span className="text-gray-400">{years} yıldır</span>}
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => startEdit(p)} className="p-2 text-gray-400 hover:text-[#00C49F] hover:bg-[#F0FDF8] rounded-lg transition-colors text-xs font-semibold">Düzenle</button>
                        <button onClick={() => remove(p.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Add property button */}
      {!showForm && (
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY); }}
          className="w-full py-3 border-2 border-dashed border-[#00C49F]/40 text-[#00C49F] text-sm font-bold rounded-2xl hover:bg-[#F0FDF8] hover:border-[#00C49F] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Mülk Ekle
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-[#00C49F]/30 p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">{editId ? 'Mülkü Düzenle' : 'Yeni Mülk Ekle'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Mülk Adı / Tanımı" name="name" placeholder="Örn: Kadıköy 3+1 Daire" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Mülk Türü</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors">
                {['Konut', 'İşyeri', 'Arsa', 'Arazi', 'Diğer'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <Field label="Şehir" name="city" placeholder="İstanbul" />
            <Field label="Alış Fiyatı (₺)" name="purchasePrice" type="number" placeholder="0" />
            <Field label="Güncel Değer (₺)" name="currentValue" type="number" placeholder="0" />
            <Field label="Aylık Kira (₺, yoksa 0)" name="monthlyRent" type="number" placeholder="0" />
            <Field label="Alış Yılı" name="purchaseYear" type="number" placeholder="2020" />
            <Field label="Alan (m²)" name="area" type="number" placeholder="0" />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-2.5 bg-[#00C49F] text-white text-sm font-bold rounded-xl hover:bg-[#00a882] transition-colors">
              {editId ? 'Güncelle' : 'Ekle'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY); }}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors">
              İptal
            </button>
          </div>
        </div>
      )}

      {properties.length === 0 && !showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Home size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Portföyünüz boş</p>
          <p className="text-gray-400 text-xs mt-1">Mülklerinizi ekleyerek toplam değer, getiri ve kazanç analizini görün.</p>
        </div>
      )}
    </div>
  );
}
