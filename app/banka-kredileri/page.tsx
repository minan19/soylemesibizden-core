import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Building2, Calculator, TrendingUp, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Faiz Oranları | Banka Karşılaştırması | Söylemesi Bizden',
  description:
    'Türkiye\'nin önde gelen bankalarının 2024 konut kredisi faiz oranları. Aylık taksit hesaplama ve banka karşılaştırması.',
};

function monthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

// Indicative rates (not real-time — for illustration only)
const BANKS = [
  { name: 'Türkiye İş Bankası', short: 'İşbank', rate: 3.49, maxTenor: 120, minDown: 20, features: ['Hızlı onay', 'Dijital başvuru'], color: 'border-blue-200 bg-blue-50', badge: 'Popüler' },
  { name: 'Ziraat Bankası', short: 'Ziraat', rate: 3.39, maxTenor: 120, minDown: 20, features: ['Devlet güvenceli', 'En düşük oran'], color: 'border-green-200 bg-green-50', badge: 'En Düşük Oran' },
  { name: 'Halkbank', short: 'Halkbank', rate: 3.45, maxTenor: 120, minDown: 20, features: ['Esneklik', 'KOBİ desteği'], color: 'border-teal-200 bg-teal-50', badge: '' },
  { name: 'Garanti BBVA', short: 'Garanti', rate: 3.55, maxTenor: 120, minDown: 25, features: ['Dijital süreç', '7/24 destek'], color: 'border-orange-200 bg-orange-50', badge: '' },
  { name: 'Yapı Kredi', short: 'YapıKredi', rate: 3.59, maxTenor: 120, minDown: 25, features: ['Hızlı süreç', 'Esnek vade'], color: 'border-amber-200 bg-amber-50', badge: '' },
  { name: 'Akbank', short: 'Akbank', rate: 3.52, maxTenor: 120, minDown: 20, features: ['Dijital başvuru', 'Erken ödeme yok'], color: 'border-red-200 bg-red-50', badge: '' },
  { name: 'Vakıfbank', short: 'Vakıfbank', rate: 3.44, maxTenor: 120, minDown: 20, features: ['Devlet bankası', 'Düşük masraf'], color: 'border-purple-200 bg-purple-50', badge: '' },
  { name: 'QNB Finansbank', short: 'Finansbank', rate: 3.62, maxTenor: 120, minDown: 25, features: ['Yabancı ortak', 'Hızlı onay'], color: 'border-pink-200 bg-pink-50', badge: '' },
];

const EXAMPLE_PRICE = 3_000_000;
const EXAMPLE_DOWN = 0.20;
const EXAMPLE_PRINCIPAL = EXAMPLE_PRICE * (1 - EXAMPLE_DOWN);
const EXAMPLE_TENOR = 120;

export default function BankaKredileriPage() {
  const sortedBanks = [...BANKS].sort((a, b) => a.rate - b.rate);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/hesaplama" className="text-blue-300 text-xs hover:text-white transition-colors flex items-center gap-1">
              <ArrowLeft size={12} /> Hesaplama Araçları
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Konut Kredisi Faiz Oranları</h1>
              <p className="text-blue-200 text-sm mt-0.5">Banka karşılaştırması · Gösterge oranlar · 2024</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin önde gelen bankalarının konut kredisi faiz oranlarını karşılaştırın.
            Aylık taksit ve toplam ödeme farkını hesaplayın.
          </p>
          <div className="flex items-center gap-2 mt-4 bg-amber-500/20 border border-amber-400/30 rounded-xl px-4 py-2 w-fit">
            <Info size={13} className="text-amber-400 shrink-0" />
            <p className="text-amber-200 text-xs">
              Oranlar gösterge niteliğindedir. Güncel resmi oranlar için bankaları arayın.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Example calculation: ₺3M, 20% down, 10 years */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calculator size={15} className="text-[#00C49F]" /> Örnek Hesaplama
          </h2>
          <p className="text-xs text-gray-400 mb-5">
            Koşul: {fmt(EXAMPLE_PRICE)} mülk, %20 peşinat ({fmt(EXAMPLE_PRICE * EXAMPLE_DOWN)}), {EXAMPLE_TENOR} ay vade
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Banka</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Aylık Faiz</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Aylık Taksit</th>
                  <th className="text-right py-2 pr-4 text-gray-400 font-semibold">Toplam Ödeme</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Toplam Faiz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {sortedBanks.map((bank, idx) => {
                  const monthly = monthlyPayment(EXAMPLE_PRINCIPAL, bank.rate, EXAMPLE_TENOR);
                  const total = monthly * EXAMPLE_TENOR;
                  const totalInterest = total - EXAMPLE_PRINCIPAL;
                  const isLowest = idx === 0;
                  return (
                    <tr key={bank.name} className={`hover:bg-gray-50 transition-colors ${isLowest ? 'bg-green-50/50' : ''}`}>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">{bank.short}</span>
                          {bank.badge && (
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">{bank.badge}</span>
                          )}
                          {isLowest && !bank.badge && (
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                              <CheckCircle2 size={8} /> En Düşük
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-right font-bold text-gray-900">%{bank.rate}</td>
                      <td className="py-3 pr-4 text-right font-black text-[#00C49F]">{fmt(monthly)}</td>
                      <td className="py-3 pr-4 text-right font-semibold text-gray-700">{fmt(total)}</td>
                      <td className="py-3 text-right font-semibold text-red-500">{fmt(totalInterest)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">
            * Peşinat: {fmt(EXAMPLE_PRICE * EXAMPLE_DOWN)} · Ana para: {fmt(EXAMPLE_PRINCIPAL)} · Vade: {EXAMPLE_TENOR} ay
          </p>
        </div>

        {/* Bank cards */}
        <div>
          <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Building2 size={15} className="text-blue-500" /> Banka Detayları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedBanks.map(bank => {
              const monthly = monthlyPayment(EXAMPLE_PRINCIPAL, bank.rate, EXAMPLE_TENOR);
              return (
                <div key={bank.name} className={`relative rounded-2xl border p-5 ${bank.color}`}>
                  {bank.badge && (
                    <span className="absolute -top-2 left-4 text-[9px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">{bank.badge}</span>
                  )}
                  <p className="text-sm font-black text-gray-800 mb-3">{bank.name}</p>
                  <div className="space-y-1.5 text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Aylık faiz</span>
                      <span className="font-black text-2xl leading-none text-gray-900">%{bank.rate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ör. taksit</span>
                      <span className="font-bold text-[#00C49F]">{fmt(monthly)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Maks. vade</span>
                      <span className="font-semibold">{bank.maxTenor} ay</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Min. peşinat</span>
                      <span className="font-semibold">%{bank.minDown}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {bank.features.map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <CheckCircle2 size={10} className="text-green-500 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rate comparison chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-5 flex items-center gap-2">
            <TrendingUp size={15} className="text-amber-500" /> Oran Karşılaştırması
          </h2>
          <div className="space-y-3">
            {sortedBanks.map((bank, i) => {
              const minRate = sortedBanks[0].rate;
              const maxRate = sortedBanks[sortedBanks.length - 1].rate;
              const barW = 60 + ((bank.rate - minRate) / Math.max(maxRate - minRate, 0.01)) * 40;
              return (
                <div key={bank.name} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-gray-700 w-24 shrink-0">{bank.short}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${i === 0 ? 'bg-green-500' : 'bg-blue-400'}`}
                      style={{ width: `${barW}%` }}
                    />
                  </div>
                  <span className="text-xs font-black text-gray-800 w-10 text-right shrink-0">%{bank.rate}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-blue-900 mb-3">Konut Kredisi Alırken Dikkat Edin</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-800">
            {[
              'Faiz oranının yanı sıra dosya masrafı ve sigorta maliyetlerini de karşılaştırın.',
              'Değişken faizli kredilerde gelecekteki artış riskini göz önünde bulundurun.',
              'BDDK kurallarına göre mülk değerinin en fazla %80\'i kredilendirilir.',
              'Hayat ve konut sigortası zorunlu olabilir; bu maliyetleri hesaba katın.',
              'Erken ödeme cezası olup olmadığını sözleşmede kontrol edin.',
              'Toplam taksit tutarı aylık gelirinizin %40\'ını geçmemelidir.',
            ].map(tip => (
              <div key={tip} className="flex gap-2">
                <CheckCircle2 size={12} className="text-blue-500 shrink-0 mt-0.5" />
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit hesapla' },
            { href: '/tapu-masrafi', label: 'Tapu Masrafları', desc: 'Tüm alım maliyetleri' },
            { href: '/satilik', label: 'Satılık İlanlar', desc: 'Uygun mülkleri keşfet' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-blue-200 transition-all flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-blue-700 transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
