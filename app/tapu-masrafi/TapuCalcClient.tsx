'use client';

import { useState, useMemo } from 'react';
import { Calculator, ChevronDown, ChevronUp, Info } from 'lucide-react';

function fmt(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);
}

function Row({ label, amount, sub, highlight }: { label: string; amount: number; sub?: string; highlight?: boolean }) {
  return (
    <div className={`flex items-start justify-between py-3 border-b border-gray-50 last:border-0 ${highlight ? 'bg-amber-50 -mx-5 px-5 rounded-xl' : ''}`}>
      <div>
        <p className={`text-sm font-semibold ${highlight ? 'text-amber-900' : 'text-gray-800'}`}>{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <p className={`text-sm font-bold shrink-0 ml-4 ${highlight ? 'text-amber-700' : 'text-gray-900'}`}>{fmt(amount)}</p>
    </div>
  );
}

export default function TapuCalcClient() {
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [locationType, setLocationType] = useState<'buyuksehir' | 'il' | 'ilce'>('buyuksehir');
  const [fromDeveloper, setFromDeveloper] = useState(false);
  const [agentBuyer, setAgentBuyer] = useState(true);
  const [agentSeller, setAgentSeller] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const priceNum = parseFloat(price.replace(/[.,]/g, '').replace(',', '.')) || 0;
  const areaNum = parseFloat(area) || 0;

  const calc = useMemo(() => {
    if (priceNum <= 0) return null;

    // Tapu harcı: toplam %4 (alıcı %2, satıcı %2 — pratikte alıcı %4 öder)
    const tapuHarciAlici = priceNum * 0.02;
    const tapuHarciSatici = priceNum * 0.02;

    // Döner sermaye harcı (2024 değerleri, sabit)
    const donerSermaye = 1200;

    // TKGM kütük harcı
    const tkgm = 650;

    // DASK (zorunlu deprem sigortası): m² * 5 TL (yaklaşık)
    const dask = areaNum > 0 ? Math.max(areaNum * 5, 500) : 800;

    // KDV (geliştiriciden alım)
    let kdv = 0;
    if (fromDeveloper) {
      if (areaNum > 0 && areaNum <= 150) {
        kdv = priceNum * 0.01; // %1
      } else if (areaNum <= 500) {
        kdv = priceNum * 0.08; // %8 (bazı durumlarda %20)
      } else {
        kdv = priceNum * 0.20; // %20 ticari
      }
    }

    // Emlakçı komisyonu
    const komBuyer = agentBuyer ? priceNum * 0.02 : 0; // %2 + KDV
    const komBuyerKdv = komBuyer * 0.20;
    const komSeller = agentSeller ? priceNum * 0.02 : 0;
    const komSellerKdv = komSeller * 0.20;

    // Noter (ipotek varsa)
    const noter = 5000;

    // Yıllık emlak vergisi (belediye türüne göre)
    const emlakVergiOrani = locationType === 'buyuksehir' ? 0.002 : locationType === 'il' ? 0.001 : 0.001;
    const emlakVergisi = priceNum * emlakVergiOrani;

    // Alıcı toplam
    const totalBuyer = tapuHarciAlici + donerSermaye + tkgm + dask + kdv + (agentBuyer ? komBuyer + komBuyerKdv : 0);
    const totalSeller = tapuHarciSatici + (agentSeller ? komSeller + komSellerKdv : 0);

    return {
      tapuHarciAlici,
      tapuHarciSatici,
      donerSermaye,
      tkgm,
      dask,
      kdv,
      komBuyer,
      komBuyerKdv,
      komSeller,
      komSellerKdv,
      noter,
      emlakVergisi,
      totalBuyer,
      totalSeller,
      totalAll: totalBuyer + totalSeller,
      buyerPct: priceNum > 0 ? (totalBuyer / priceNum) * 100 : 0,
    };
  }, [priceNum, areaNum, locationType, fromDeveloper, agentBuyer, agentSeller]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Calculator size={18} className="text-[#00C49F]" />
          <h2 className="text-sm font-bold text-gray-900">Mülk Bilgileri</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Satış Fiyatı (₺)</label>
            <input
              type="text"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="Örn: 3500000"
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Alan (m²)</label>
            <input
              type="number"
              value={area}
              onChange={e => setArea(e.target.value)}
              placeholder="Örn: 120"
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00C49F] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Belediye Türü</label>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'buyuksehir', label: 'Büyükşehir', sub: '(%0.2 emlak vergisi)' },
              { value: 'il', label: 'İl / İlçe', sub: '(%0.1 emlak vergisi)' },
              { value: 'ilce', label: 'Köy/Kasaba', sub: '(%0.1 emlak vergisi)' },
            ].map(o => (
              <button
                key={o.value}
                onClick={() => setLocationType(o.value as typeof locationType)}
                className={`flex-1 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  locationType === o.value
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#00C49F]/50'
                }`}
              >
                <p>{o.label}</p>
                <p className={`text-[10px] font-normal mt-0.5 ${locationType === o.value ? 'text-white/80' : 'text-gray-400'}`}>{o.sub}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className={`w-10 h-5 rounded-full relative transition-colors ${fromDeveloper ? 'bg-[#00C49F]' : 'bg-gray-200'}`}
              onClick={() => setFromDeveloper(!fromDeveloper)}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${fromDeveloper ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Müteahhitten / İlk El Satış</span>
            <span className="text-[10px] text-gray-400">(KDV hesapla)</span>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer" onClick={() => setAgentBuyer(!agentBuyer)}>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${agentBuyer ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${agentBuyer ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Alıcı emlakçı komisyonu (%2)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer" onClick={() => setAgentSeller(!agentSeller)}>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${agentSeller ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${agentSeller ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-xs font-semibold text-gray-700">Satıcı emlakçı komisyonu (%2)</span>
          </label>
        </div>

        {/* Quick price buttons */}
        <div>
          <p className="text-xs text-gray-400 mb-2">Hızlı seçim:</p>
          <div className="flex flex-wrap gap-2">
            {[1500000, 2500000, 3500000, 5000000, 8000000, 15000000].map(p => (
              <button
                key={p}
                onClick={() => setPrice(p.toString())}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  price === p.toString()
                    ? 'bg-[#00C49F] text-white border-[#00C49F]'
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#00C49F]/40'
                }`}
              >
                ₺{(p / 1_000_000).toFixed(1)}M
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {calc && priceNum > 0 ? (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Mülk Fiyatı</p>
              <p className="text-xl font-black text-gray-900 font-mono">{fmt(priceNum)}</p>
            </div>
            <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5">
              <p className="text-[10px] text-[#00C49F] uppercase font-bold tracking-widest mb-1">Alıcı Masrafları</p>
              <p className="text-xl font-black text-gray-900 font-mono">{fmt(calc.totalBuyer)}</p>
              <p className="text-[10px] text-gray-500 mt-1">Satış fiyatının %{calc.buyerPct.toFixed(1)}'i</p>
            </div>
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 col-span-2 sm:col-span-1">
              <p className="text-[10px] text-amber-700 uppercase font-bold tracking-widest mb-1">Toplam Maliyet</p>
              <p className="text-xl font-black text-amber-900 font-mono">{fmt(priceNum + calc.totalBuyer)}</p>
              <p className="text-[10px] text-amber-600 mt-1">Alım toplam yükü</p>
            </div>
          </div>

          {/* Buyer breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-900">Alıcı Masraf Detayı</h3>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-1 text-xs text-[#00C49F] font-semibold"
              >
                {showDetails ? <><ChevronUp size={14} /> Gizle</> : <><ChevronDown size={14} /> Detay</>}
              </button>
            </div>

            <Row label="Tapu Harcı (Alıcı %2)" amount={calc.tapuHarciAlici} sub="Beyan edilen satış bedeli üzerinden" />
            <Row label="Döner Sermaye Harcı" amount={calc.donerSermaye} sub="Tapu işlemi sabit ücreti (2024)" />
            <Row label="TKGM Kütük Harcı" amount={calc.tkgm} sub="Tapu sicil müdürlüğü" />
            <Row label="DASK (Deprem Sigortası)" amount={calc.dask} sub={areaNum > 0 ? `≈${areaNum} m² x 5 ₺` : 'Tahmini ortalama'} />
            {calc.kdv > 0 && (
              <Row label={`KDV ${areaNum <= 150 ? '%1' : areaNum <= 500 ? '%8' : '%20'}`} amount={calc.kdv} sub="Müteahhitten ilk el alım" />
            )}
            {agentBuyer && (
              <Row label="Emlakçı Komisyonu (%2)" amount={calc.komBuyer} sub={`+ %20 KDV = ${fmt(calc.komBuyerKdv)}`} />
            )}
            {agentBuyer && (
              <Row label="Komisyon KDV" amount={calc.komBuyerKdv} />
            )}
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
              <p className="text-sm font-black text-gray-900">TOPLAM Alıcı Masrafı</p>
              <p className="text-sm font-black text-[#00C49F]">{fmt(calc.totalBuyer)}</p>
            </div>

            {showDetails && (
              <div className="mt-4 pt-4 border-t border-dashed border-gray-200 space-y-0">
                <p className="text-xs font-bold text-gray-500 mb-3">Satıcı Masrafları</p>
                <Row label="Tapu Harcı (Satıcı %2)" amount={calc.tapuHarciSatici} sub="Beyan edilen satış bedeli üzerinden" />
                {agentSeller && <Row label="Emlakçı Komisyonu (%2)" amount={calc.komSeller} sub={`+ KDV = ${fmt(calc.komSellerKdv)}`} />}
                {agentSeller && <Row label="Komisyon KDV" amount={calc.komSellerKdv} />}
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                  <p className="text-sm font-black text-gray-900">TOPLAM Satıcı Masrafı</p>
                  <p className="text-sm font-black text-amber-600">{fmt(calc.totalSeller)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Annual property tax */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Info size={15} className="text-amber-500" />
              <h3 className="text-sm font-bold text-gray-900">Yıllık Emlak Vergisi</h3>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  {locationType === 'buyuksehir' ? 'Büyükşehir konut (%0.2)' : 'Konut (%0.1)'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Yıllık 2 taksit (Mayıs & Kasım)</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-gray-900">{fmt(calc.emlakVergisi)}<span className="text-xs font-normal text-gray-400">/yıl</span></p>
                <p className="text-xs text-gray-400">{fmt(calc.emlakVergisi / 12)}/ay</p>
              </div>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex gap-3">
              <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-amber-900">Önemli Notlar</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  • Tapu harcı beyan edilen değer üzerinden hesaplanır. Piyasa değerinin altında beyan hukuki risk taşır.
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  • Emlak vergisi rayiç bedel üzerinden hesaplanır; satış fiyatından farklı olabilir.
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  • DASK tüm konut alımlarında zorunludur. Poliçe üretilmeden tapu tescili yapılmaz.
                </p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  • Bu hesaplama yaklaşık değerlerdir. Güncel harç tarifeleri için Tapu ve Kadastro Genel Müdürlüğü&apos;nü ziyaret edin.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
          <Calculator size={40} className="text-gray-200 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Hesaplama için satış fiyatını girin</p>
        </div>
      )}
    </div>
  );
}
