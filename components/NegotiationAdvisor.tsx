'use client';

import { useState, useEffect, useCallback } from 'react';
import { Brain, Loader2, TrendingDown, TrendingUp, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Props {
  listingPrice: number;
  offerAmount: number;         // Kullanıcının girdiği teklif (anlık)
  location: string;
  propertyType: string;
  daysOnMarket: number;
  offerCount: number;
}

interface NegotiationAdvice {
  strength: 'STRONG' | 'FAIR' | 'WEAK';
  suggestedMin: number;
  suggestedMax: number;
  tactics: string[];
  warning: string | null;
  summary: string;
}

const STRENGTH_CONFIG = {
  STRONG: { label: 'Güçlü Teklif', color: '#00C49F', icon: TrendingUp, bg: '#F0FDF8' },
  FAIR:   { label: 'Makul Teklif', color: '#F59E0B', icon: Minus,      bg: '#FFFBEB' },
  WEAK:   { label: 'Zayıf Teklif', color: '#EF4444', icon: TrendingDown, bg: '#FEF2F2' },
} as const;

// Kural tabanlı müzakere analizi (Claude yokken çalışır)
function analyzeOffer(props: Props): NegotiationAdvice {
  const { listingPrice, offerAmount, daysOnMarket, offerCount } = props;
  const ratio = offerAmount / listingPrice;
  const pctBelow = (1 - ratio) * 100;

  // Teklif gücü
  const strength: NegotiationAdvice['strength'] =
    ratio >= 0.97 ? 'STRONG' :
    ratio >= 0.90 ? 'FAIR' : 'WEAK';

  // Önerilen aralık — piyasa dinamiklerine göre
  const baseDiscount = daysOnMarket > 90 ? 0.08 : daysOnMarket > 45 ? 0.05 : 0.03;
  const competitionAdj = offerCount > 2 ? 0.02 : offerCount > 0 ? 0 : -0.02;
  const optimalDiscount = baseDiscount - competitionAdj;

  const suggestedMin = Math.round(listingPrice * (1 - optimalDiscount - 0.03));
  const suggestedMax = Math.round(listingPrice * (1 - optimalDiscount + 0.01));

  // Taktikler
  const tactics: string[] = [];
  if (daysOnMarket > 90) tactics.push(`İlan ${daysOnMarket} gündür satışta — satıcı motivasyonu yüksek, baskı süresi avantajınızda.`);
  if (daysOnMarket < 14) tactics.push('İlan taze — agresif indirim beklemek zorlaşabilir, hızlı karar avantaj sağlar.');
  if (offerCount === 0) tactics.push('Rakip teklif yok — müzakere gücünüz maksimum, zamanı iyi kullanın.');
  if (offerCount > 2) tactics.push('Rekabetçi ilan — liste fiyatına yakın başlamak pozisyonunuzu güçlendirir.');
  if (pctBelow > 10) tactics.push('Düşük teklif satıcıyı müzakereden çıkarabilir. Kademeli yaklaşım önerilir.');
  if (ratio >= 0.95) tactics.push('İyi bir başlangıç noktası. Mobilya veya hızlı kapanış gibi koşul avantajları eklenebilir.');

  // Uyarı
  const warning =
    ratio < 0.85 ? 'Bu teklif piyasa değerinin %15+ altında — reddedilme riski yüksek.' :
    ratio > 1.00 ? 'Liste fiyatının üzerinde teklif veriyorsunuz. Önce değerleme yaptırmanızı öneririz.' :
    null;

  // Özet
  const summary =
    strength === 'STRONG' ? `${formatCurrency(offerAmount)} güçlü bir açılış. Satıcı müzakereye açık ise ${formatCurrency(suggestedMax)} civarında anlaşma sağlanabilir.` :
    strength === 'FAIR'   ? `Makul bir teklif. ${formatCurrency(suggestedMin)}–${formatCurrency(suggestedMax)} aralığında teklif verin.` :
    `Bu teklif kabul görmeyebilir. Önerilen aralık: ${formatCurrency(suggestedMin)}–${formatCurrency(suggestedMax)}.`;

  return { strength, suggestedMin, suggestedMax, tactics, warning, summary };
}

export default function NegotiationAdvisor({ listingPrice, offerAmount, location, propertyType, daysOnMarket, offerCount }: Props) {
  const [advice, setAdvice] = useState<NegotiationAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Teklif değiştiğinde debounce ile analiz et
  const analyze = useCallback(() => {
    if (!offerAmount || offerAmount <= 0) { setAdvice(null); return; }
    setLoading(true);
    // Simüle async (gelecekte Claude API çağrısı burada)
    const result = analyzeOffer({ listingPrice, offerAmount, location, propertyType, daysOnMarket, offerCount });
    setAdvice(result);
    setLoading(false);
  }, [listingPrice, offerAmount, location, propertyType, daysOnMarket, offerCount]);

  useEffect(() => {
    if (!offerAmount || offerAmount <= 0) { setAdvice(null); return; }
    const timer = setTimeout(analyze, 400); // 400ms debounce
    return () => clearTimeout(timer);
  }, [offerAmount, analyze]);

  if (!offerAmount || offerAmount <= 0) return null;

  if (loading) return (
    <div className="flex items-center gap-2 py-2 px-3 bg-[#F8FAFC] rounded-2xl">
      <Loader2 size={13} className="animate-spin text-[#00C49F]" />
      <span className="text-[11px] font-semibold text-gray-400">AI analiz ediyor...</span>
    </div>
  );

  if (!advice) return null;

  const cfg = STRENGTH_CONFIG[advice.strength];
  const Icon = cfg.icon;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: cfg.color + '30', backgroundColor: cfg.bg }}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.color + '20' }}>
            <Brain size={12} style={{ color: cfg.color }} />
          </div>
          <div className="flex items-center gap-1.5">
            <Icon size={12} style={{ color: cfg.color }} />
            <span className="text-[11px] font-black tracking-wider" style={{ color: cfg.color }}>
              {cfg.label}
            </span>
          </div>
        </div>
        {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: cfg.color + '20' }}>
          {/* Summary */}
          <p className="text-[11px] text-gray-600 leading-relaxed pt-3">{advice.summary}</p>

          {/* Suggested range */}
          <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3">
            <div className="text-center flex-1">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400">Önerilen Alt</p>
              <p className="text-sm font-black" style={{ color: cfg.color }}>
                {formatCurrency(advice.suggestedMin)}
              </p>
            </div>
            <div className="text-gray-300 font-bold">—</div>
            <div className="text-center flex-1">
              <p className="text-[9px] font-black tracking-widest uppercase text-gray-400">Önerilen Üst</p>
              <p className="text-sm font-black" style={{ color: cfg.color }}>
                {formatCurrency(advice.suggestedMax)}
              </p>
            </div>
          </div>

          {/* Tactics */}
          {advice.tactics.length > 0 && (
            <div className="space-y-1.5">
              {advice.tactics.map((t, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#00C49F] text-[10px] mt-0.5 shrink-0">▸</span>
                  <p className="text-[11px] text-gray-600">{t}</p>
                </div>
              ))}
            </div>
          )}

          {/* Warning */}
          {advice.warning && (
            <div className="bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              <p className="text-[11px] font-semibold text-red-500">⚠️ {advice.warning}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
