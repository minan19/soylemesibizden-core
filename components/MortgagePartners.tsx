'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Building2 } from 'lucide-react';

interface Bank {
  name: string;
  logo: string;
  rate: number; // annual interest rate %
  minDownPayment: number; // %
  maxTerm: number; // months
  note?: string;
}

const BANKS: Bank[] = [
  { name: 'Türkiye Cumhuriyet Merkez Bankası (TCMB)', logo: 'TC', rate: 42.5, minDownPayment: 20, maxTerm: 120, note: 'Politika faizi' },
  { name: 'Ziraat Bankası', logo: 'ZR', rate: 3.29, minDownPayment: 20, maxTerm: 120, note: 'Aylık %3.29' },
  { name: 'Halkbank', logo: 'HB', rate: 3.35, minDownPayment: 20, maxTerm: 120, note: 'Aylık %3.35' },
  { name: 'VakıfBank', logo: 'VK', rate: 3.38, minDownPayment: 25, maxTerm: 120, note: 'Aylık %3.38' },
  { name: 'Garanti BBVA', logo: 'GR', rate: 3.45, minDownPayment: 20, maxTerm: 120, note: 'Aylık %3.45' },
  { name: 'İş Bankası', logo: 'İŞ', rate: 3.49, minDownPayment: 20, maxTerm: 120 },
  { name: 'Yapı Kredi', logo: 'YK', rate: 3.55, minDownPayment: 20, maxTerm: 120 },
  { name: 'Akbank', logo: 'AK', rate: 3.58, minDownPayment: 25, maxTerm: 120 },
];

function monthlyPayment(principal: number, monthlyRate: number, months: number) {
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

interface Props {
  listingPrice?: number;
}

export default function MortgagePartners({ listingPrice }: Props) {
  const [open, setOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState(
    listingPrice ? Math.round(listingPrice * 0.8) : 2000000
  );
  const [termMonths, setTermMonths] = useState(120);

  const banks = BANKS.slice(1); // skip TCMB policy rate for mortgage comparison

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <Building2 size={16} className="text-blue-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-gray-900">Banka Mortgage Karşılaştırması</p>
            <p className="text-[11px] text-gray-400">Güncel faiz oranlarına göre taksit hesapla</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5">
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Kredi Tutarı (₺)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={e => setLoanAmount(Number(e.target.value))}
                min={50000}
                step={50000}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] w-40"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Vade (Ay)</label>
              <select
                value={termMonths}
                onChange={e => setTermMonths(Number(e.target.value))}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] w-28"
              >
                {[36, 60, 84, 120, 180, 240].map(m => (
                  <option key={m} value={m}>{m} ay ({m / 12} yıl)</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {banks.map(bank => {
              const mr = bank.rate / 100;
              const monthly = Math.round(monthlyPayment(loanAmount, mr, termMonths));
              const total = Math.round(monthly * termMonths);
              const interest = total - loanAmount;
              return (
                <div key={bank.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-gray-600">{bank.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{bank.name}</p>
                    <p className="text-[10px] text-gray-400">{bank.note ?? `Aylık %${bank.rate}`} · Min. %{bank.minDownPayment} peşinat</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-900">₺{monthly.toLocaleString('tr-TR')}<span className="text-[10px] text-gray-400 font-normal">/ay</span></p>
                    <p className="text-[10px] text-gray-400">Toplam: ₺{total.toLocaleString('tr-TR')}</p>
                    <p className="text-[10px] text-rose-500">Faiz: ₺{interest.toLocaleString('tr-TR')}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
            * Gösterilen faiz oranları tahminidir. Gerçek oranlar için ilgili bankayı ziyaret edin.
            Son güncelleme: Ağustos 2026. Politika faizi: %42.5 (TCMB).
          </p>
        </div>
      )}
    </div>
  );
}
