import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import DaskClient from './DaskClient';

export const metadata: Metadata = {
  title: 'DASK Prim Hesaplayıcı | Deprem Sigortası | Söylemesi Bizden',
  description:
    'DASK (Zorunlu Deprem Sigortası) prim hesaplama aracı. Bölge, alan ve yapı türüne göre tahmini yıllık prim öğrenin.',
};

const FACTS = [
  { q: 'DASK nedir?', a: 'Doğal Afet Sigortaları Kurumu tarafından yönetilen zorunlu deprem sigortasıdır. Konut tapusu olan her konut için yasal zorunluluktur.' },
  { q: 'DASK olmadan tapu devri olur mu?', a: 'Hayır. Tapu devri işlemi sırasında geçerli bir DASK poliçesi şart koşulur. Süresi dolmuş poliçe kabul edilmez.' },
  { q: 'DASK hangi hasarları karşılar?', a: 'Deprem ve depreme bağlı yangın, patlama, tsunami ile yer kayması sonucu oluşan bina hasarlarını karşılar. İçerideki eşyaları kapsamaz.' },
  { q: 'Prim her yıl değişir mi?', a: 'Evet. DASK teminat üst sınırı ve prim tarifeleri her yıl Ocak\'ta güncellenir. Poliçenizi yılda bir yenilemeniz gerekir.' },
  { q: 'İşyerleri DASK kapsamında mı?', a: 'Hayır, işyerleri zorunlu DASK kapsamı dışındadır. Ancak isteğe bağlı olarak bazı sigorta şirketleri işyeri deprem poliçesi sunar.' },
];

export default function DaskHesaplayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">DASK Prim Hesaplayıcı</h1>
              <p className="text-slate-400 text-sm mt-0.5">Zorunlu Deprem Sigortası · Gösterge Hesaplama</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Mülkünüzün bulunduğu deprem bölgesi, alan ve yapı türüne göre DASK prim tahmini öğrenin.
            Tapu devri için aktif DASK poliçesi zorunludur.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {['Tapu devri zorunlu', 'Yılda 1 yenileme', 'Konut kapsamlı', 'Resmi fiyat DASK.org.tr\'de'].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs bg-white/10 border border-white/10 text-white/80 px-3 py-1.5 rounded-full">
                <CheckCircle2 size={10} className="text-[#00C49F]" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Calculator */}
          <div className="lg:col-span-2 space-y-6">
            <DaskClient />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Why DASK matters */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-black text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle size={13} className="text-rose-500" /> Neden Önemli?
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Tapu devri için zorunludur',
                  '6+ yıldır konut için yasal şart',
                  'Deprem hasarını sigorta güvencesine alır',
                  'Devlet destekli; iflas riski yok',
                  'Poliçe 1 yıl geçerlidir',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                    <CheckCircle2 size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk zones map reference */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-black text-gray-900 mb-3">Bölge Referansı</h3>
              <div className="space-y-2">
                {[
                  { zone: '1. Derece', cities: 'İstanbul, İzmir, Erzincan, Kocaeli', color: 'bg-red-500' },
                  { zone: '2. Derece', cities: 'Ankara, Bursa, Balıkesir, Sakarya', color: 'bg-orange-400' },
                  { zone: '3. Derece', cities: 'Samsun, Trabzon, Konya', color: 'bg-amber-400' },
                  { zone: '4. Derece', cities: 'Gaziantep, Şanlıurfa, Diyarbakır', color: 'bg-yellow-400' },
                  { zone: '5. Derece', cities: 'Rize, Artvin, Kastamonu', color: 'bg-green-400' },
                ].map(r => (
                  <div key={r.zone} className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full ${r.color} shrink-0 mt-1.5`} />
                    <div>
                      <p className="text-[11px] font-bold text-gray-800">{r.zone}</p>
                      <p className="text-[10px] text-gray-400">{r.cities}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-start gap-1.5">
                <Info size={10} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-400">Resmi harita için AFAD sitesini inceleyin.</p>
              </div>
            </div>

            {/* Related links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="text-xs font-black text-gray-900 mb-3">İlgili Araçlar</h3>
              <div className="space-y-2">
                {[
                  { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesapla' },
                  { href: '/hesaplama', label: 'Konut Kredisi Hesapla' },
                  { href: '/gayrimenkul-sozlugu', label: 'DASK Nedir? (Sözlük)' },
                  { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
                ].map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between text-xs text-gray-600 hover:text-[#00C49F] py-1.5 border-b border-gray-50 last:border-0 group transition-colors"
                  >
                    {l.label}
                    <ArrowRight size={11} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 space-y-4">
          <h2 className="text-sm font-black text-gray-900">Sıkça Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FACTS.map(f => (
              <div key={f.q} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-black text-gray-900 mb-2">{f.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
