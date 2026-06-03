'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Shield, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

interface Props { userId: string; }

const NDA_TEXT = `GİZLİLİK VE AÇIKLAMAMAMA ANLAŞMASI (NDA)

İşbu anlaşma, Söylemesi Bizden Sovereign Intelligence Platform ("Platform") ile Dark Pool ağına erişim talep eden kullanıcı ("Üye") arasında akdedilmiştir.

1. KAPSAM: Dark Pool ağındaki tüm ilan bilgileri, fiyatlar, satıcı kimlikleri ve proje detayları gizlidir.

2. YASAKLAR: Üye, eriştiği bilgileri üçüncü kişilerle paylaşamaz, yayımlayamaz, kopyalayamaz veya ticari amaçla kullanamaz.

3. SÜRE: Bu anlaşma imzalandığı tarihten itibaren süresiz geçerlidir.

4. YAPTIRIMLAR: Gizliliğin ihlali durumunda Platform, hukuki yollara başvurma hakkını saklı tutar.

5. KABUL: "Kabul Ediyorum" butonuna tıklayarak bu anlaşmanın tüm koşullarını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.`;

export default function DarkPoolNdaGate({ userId }: Props) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAccept = async () => {
    if (!checked) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/dark-pool/nda', { method: 'POST' });
      if (!res.ok) {
        const data = await res.json() as { error?: string };
        setError(data.error ?? 'Hata oluştu.');
        return;
      }
      router.refresh();
    } catch {
      setError('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-sans flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-[20px] bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-5">
            <Lock size={28} className="text-[#D4AF37]" />
          </div>
          <p className="text-[9px] font-black tracking-widest uppercase text-[#D4AF37] mb-2">GİZLİLİK ANLAŞMASI</p>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-3">Dark Pool Erişimi</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Off-market ilanları görüntüleyebilmek için gizlilik anlaşmasını kabul etmeniz gerekmektedir.
          </p>
        </div>

        {/* NDA Card */}
        <div className="bg-white/5 border border-white/10 rounded-[24px] overflow-hidden mb-6">
          {/* Info Badges */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
            {[
              { icon: Shield, text: 'Hukuki Bağlayıcı' },
              { icon: CheckCircle, text: 'Süresiz Geçerli' },
              { icon: Lock, text: 'Üçüncü Tarafla Paylaşılamaz' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon size={11} className="text-[#D4AF37]" />
                <span className="text-[9px] font-black tracking-widest uppercase text-slate-500">{text}</span>
              </div>
            ))}
          </div>

          {/* NDA Text */}
          <div className="px-6 py-5 h-56 overflow-y-auto">
            <pre className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-wrap font-sans">
              {NDA_TEXT}
            </pre>
          </div>
        </div>

        {/* Checkbox */}
        <label className="flex items-start gap-4 cursor-pointer mb-6 group">
          <div
            onClick={() => setChecked((v) => !v)}
            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checked ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-slate-600 group-hover:border-[#D4AF37]/50'
            }`}
          >
            {checked && <CheckCircle size={14} className="text-[#0F172A]" />}
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Yukarıdaki Gizlilik ve Açiklamama Anlaşması&apos;nı okudum, anladım ve{' '}
            <span className="text-[#D4AF37] font-bold">tüm koşulları kabul ediyorum.</span>
          </p>
        </label>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-4">
            <AlertTriangle size={14} className="text-red-400 shrink-0" />
            <p className="text-[12px] font-semibold text-red-400">{error}</p>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleAccept}
          disabled={!checked || loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-[#D4AF37] hover:bg-[#B8960C] text-[#0F172A] text-[11px] font-black tracking-widest uppercase rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> İşleniyor...</>
          ) : (
            <><Lock size={15} /> Dark Pool&apos;a Eriş</>
          )}
        </button>
      </div>
    </div>
  );
}
