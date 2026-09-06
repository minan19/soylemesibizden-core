'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const fmt = (n: number) => n.toLocaleString('tr-TR');
const KDV_RATE = 0.20;

const FAQ = [
  {
    q: 'Emlak komisyonunu kim öder?',
    a: 'Türk hukukunda hem alıcı hem satıcı ayrı ayrı komisyon öder. Yasal azami oran her biri için satış bedelinin %2\'sidir (KDV dahil değil). Toplamda %4 + KDV.',
  },
  {
    q: 'Komisyon pazarlık konusu mudur?',
    a: 'Evet. Yasal azami oran %2\'dir; emlakçı daha düşük oran teklif edebilir. Özellikle yüksek bedelli mülklerde %1 veya sabit ücret anlaşması yapılabilir.',
  },
  {
    q: 'Komisyon sözleşmesi olmadan ödeme zorunlu mu?',
    a: 'Hayır. Yazılı aracılık sözleşmesi (yetki belgesi) olmadan ödenmiş komisyon iade talep edilebilir. Emlakçının her halükarda yazılı sözleşme yapması zorunludur.',
  },
  {
    q: 'Kira komisyonu nasıl hesaplanır?',
    a: 'Kiralık mülklerde standart oran 1 aylık kira bedelidir (KDV hariç). Bazı piyasalarda ev sahibi, kiracı veya her ikisi de ödeyebilir.',
  },
  {
    q: 'Komisyon KDV\'ye tabi mi?',
    a: 'Evet. Emlak danışmanlık hizmetleri %20 KDV\'ye tabidir (2024 itibarıyla). Aldığınız fatura üzerinde KDV ayrıca gösterilmeli.',
  },
];

const TIPS = [
  'Birden fazla emlakçıyla görüşün; rekabetçi komisyon oranları teklif edebilirler.',
  'Yetki belgesi (aracılık sözleşmesi) imzalamadan önce oran, KDV dahil toplam tutar netleştirin.',
  'Yüksek bedelli mülklerde (%2 yerine) sabit ücret veya düşük yüzde ile anlaşmayı deneyin.',
  'Fatura talep edin; belgesiz komisyon ödemeyin.',
  'Sözleşmede komisyonun hangi hâllerde iade edileceği belirtilmeli.',
];

export default function EmlakKomisyonuClient() {
  const [salePrice, setSalePrice] = useState(3000000);
  const [sellerRate, setSellerRate] = useState(2.0);
  const [buyerRate, setBuyerRate] = useState(2.0);
  const [includeKdv, setIncludeKdv] = useState(true);
  const [isRental, setIsRental] = useState(false);
  const [monthlyRent, setMonthlyRent] = useState(15000);

  const result = useMemo(() => {
    if (isRental) {
      const base = monthlyRent;
      const kdv = base * KDV_RATE;
      return {
        sellerCommission: base,
        buyerCommission: base,
        totalCommission: base * 2,
        sellerWithKdv: base + kdv,
        buyerWithKdv: base + kdv,
        totalWithKdv: (base + kdv) * 2,
        kdvAmount: kdv * 2,
      };
    }

    const sellerBase = salePrice * sellerRate / 100;
    const buyerBase = salePrice * buyerRate / 100;
    const sellerKdv = sellerBase * KDV_RATE;
    const buyerKdv = buyerBase * KDV_RATE;

    return {
      sellerCommission: sellerBase,
      buyerCommission: buyerBase,
      totalCommission: sellerBase + buyerBase,
      sellerWithKdv: sellerBase + sellerKdv,
      buyerWithKdv: buyerBase + buyerKdv,
      totalWithKdv: sellerBase + sellerKdv + buyerBase + buyerKdv,
      kdvAmount: sellerKdv + buyerKdv,
    };
  }, [salePrice, sellerRate, buyerRate, isRental, monthlyRent]);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Calculator size={13} /> Komisyon Hesaplayıcı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Emlak Komisyonu Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Satış veya kiralama işleminde satıcı ve alıcının ayrı ayrı ödeyeceği komisyon tutarı,
            KDV dahil gerçek maliyet ve toplam işlem maliyeti.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Input */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
              <h2 className="text-sm font-black text-gray-900">Hesaplama Türü</h2>

              {/* Type toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsRental(false)}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${!isRental ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Satış
                </button>
                <button
                  onClick={() => setIsRental(true)}
                  className={`py-2 rounded-xl text-xs font-black transition-all ${isRental ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  Kiralama
                </button>
              </div>

              {!isRental ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Satış Fiyatı
                      <span className="ml-2 font-normal text-gray-400">₺{fmt(salePrice)}</span>
                    </label>
                    <input type="range" min={200000} max={20000000} step={100000}
                      value={salePrice} onChange={e => setSalePrice(Number(e.target.value))}
                      className="w-full accent-[#00C49F]" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Satıcı Komisyon Oranı
                      <span className="ml-2 font-normal text-gray-400">%{sellerRate.toFixed(1)}</span>
                    </label>
                    <input type="range" min={0} max={3} step={0.25}
                      value={sellerRate} onChange={e => setSellerRate(Number(e.target.value))}
                      className="w-full accent-[#00C49F]" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%0</span><span>%2 yasal azami</span><span>%3</span></div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Alıcı Komisyon Oranı
                      <span className="ml-2 font-normal text-gray-400">%{buyerRate.toFixed(1)}</span>
                    </label>
                    <input type="range" min={0} max={3} step={0.25}
                      value={buyerRate} onChange={e => setBuyerRate(Number(e.target.value))}
                      className="w-full accent-[#00C49F]" />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>%0</span><span>%2 yasal azami</span><span>%3</span></div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Aylık Kira Bedeli
                    <span className="ml-2 font-normal text-gray-400">₺{fmt(monthlyRent)}</span>
                  </label>
                  <input type="range" min={3000} max={100000} step={1000}
                    value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))}
                    className="w-full accent-[#00C49F]" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIncludeKdv(v => !v)}
                  className={`w-10 h-6 rounded-full transition-all ${includeKdv ? 'bg-[#00C49F]' : 'bg-gray-200'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white mx-1 transition-all ${includeKdv ? 'translate-x-4' : 'translate-x-0'}`} />
                </button>
                <span className="text-xs text-gray-700">KDV (%20) dahil göster</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">

            {/* Main result */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
              <p className="text-xs text-gray-400 mb-1">Toplam Komisyon ({includeKdv ? 'KDV Dahil' : 'KDV Hariç'})</p>
              <p className="text-4xl font-black text-[#00C49F] mb-1">
                ₺{fmt(Math.round(includeKdv ? result.totalWithKdv : result.totalCommission))}
              </p>
              <p className="text-xs text-gray-400">Satıcı + Alıcı toplam</p>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Satıcı Komisyonu</p>
                <p className="text-xl font-black text-gray-900">
                  ₺{fmt(Math.round(includeKdv ? result.sellerWithKdv : result.sellerCommission))}
                </p>
                {!isRental && <p className="text-[10px] text-gray-400 mt-0.5">%{sellerRate.toFixed(1)}{includeKdv ? ' + KDV' : ''}</p>}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-[10px] text-gray-400 mb-1">Alıcı/Kiracı Komisyonu</p>
                <p className="text-xl font-black text-gray-900">
                  ₺{fmt(Math.round(includeKdv ? result.buyerWithKdv : result.buyerCommission))}
                </p>
                {!isRental && <p className="text-[10px] text-gray-400 mt-0.5">%{buyerRate.toFixed(1)}{includeKdv ? ' + KDV' : ''}</p>}
              </div>
            </div>

            {/* Full cost summary */}
            {!isRental && (
              <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <h3 className="text-xs font-black text-gray-900 mb-3">Alıcı Toplam Maliyet Özeti</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Satış bedeli', value: fmt(salePrice) },
                    { label: `Komisyon (%${buyerRate.toFixed(1)} KDV dahil)`, value: fmt(Math.round(result.buyerWithKdv)) },
                    { label: 'Tapu harcı (%2)', value: fmt(Math.round(salePrice * 0.02)) },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between">
                      <span className="text-xs text-gray-500">{r.label}</span>
                      <span className="text-xs font-bold text-gray-700">₺{r.value}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-100 pt-2 flex justify-between">
                    <span className="text-xs font-bold text-gray-900">Tahmini Toplam</span>
                    <span className="text-sm font-black text-[#00C49F]">
                      ₺{fmt(Math.round(salePrice + result.buyerWithKdv + salePrice * 0.02))}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Warning for above legal limit */}
            {!isRental && (sellerRate > 2 || buyerRate > 2) && (
              <div className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4">
                <AlertTriangle size={14} className="text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700">
                  Seçilen oran yasal azami (%2) üzerindedir. Türkiye&apos;de emlakçı komisyonu
                  satış bedelinin %2&apos;sini (her taraf için) geçemez.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4">Komisyon İpuçları</h2>
            <div className="space-y-2">
              {TIPS.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <CheckCircle size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-gray-900 mb-4">Sık Sorulan Sorular</h2>
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start gap-2 mb-2">
                    <Info size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                    <h3 className="text-xs font-black text-gray-900">{f.q}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-5">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/tapu-masrafi" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex items-center gap-4">
                <Calculator size={20} className="text-[#00C49F] shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">Tapu Masrafı Hesapla</p>
                  <p className="text-xs text-gray-400">Komisyon + tapu + DASK toplam</p>
                </div>
                <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
              </Link>
              <Link href="/rehber/satici-rehberi" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex items-center gap-4">
                <Calculator size={20} className="text-white shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Satıcı Rehberi</p>
                  <p className="text-xs text-white/70">Fiyatlama ve pazarlık</p>
                </div>
                <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors shrink-0" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
