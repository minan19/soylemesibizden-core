import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp, Shield, AlertTriangle, CheckCircle, ArrowRight,
  BarChart2, Home, Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enflasyona Karşı Gayrimenkul | Korunma Rehberi | Söylemesi Bizden',
  description:
    'Türkiye\'de yüksek enflasyona karşı gayrimenkulün koruyuculuğu: tarihsel getiri, kira artışı, döviz bazlı değerleme ve diğer enflasyon koruma araçları ile karşılaştırma.',
};

const HISTORICAL = [
  { year: '2019', tüfe: 11.8, konut: 28.0, dolar: 5.3 },
  { year: '2020', tüfe: 14.6, konut: 30.4, dolar: 8.0 },
  { year: '2021', tüfe: 19.6, konut: 56.0, dolar: 13.0 },
  { year: '2022', tüfe: 64.3, konut: 186.0, dolar: 18.7 },
  { year: '2023', tüfe: 65.0, konut: 70.0, dolar: 29.5 },
  { year: '2024', tüfe: 43.0, konut: 38.0, dolar: 33.5 },
];

const maxKonut = Math.max(...HISTORICAL.map(h => h.konut));

const STRATEGIES = [
  {
    title: 'Kira Geliri Endeksleme',
    icon: TrendingUp,
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    border: 'border-[#00C49F]/20',
    desc: 'Kira artışları yasal olarak TÜFE\'ye bağlıdır ve %25 tavan uygulanır. Uzun vadede enflasyona paralel büyür.',
    pros: ['TÜFE bağlantılı düzenli gelir', 'Kira artış hakkı 12 ayda bir', '2-5 yıl sonra piyasa rayicine yükseltme hakkı'],
    cons: ['%25 tavan kısa vadede satın alma gücünü eritebilir', 'Kiracı uyuşmazlıkları'],
  },
  {
    title: 'Döviz Bazlı Değerleme',
    icon: BarChart2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Türkiye\'de konut fiyatları uzun vadede USD/EUR\'ya göre sabit veya artış eğilimindedir. Yabancı talep bu dengeyi güçlendirir.',
    pros: ['Döviz aşınmasına karşı doğal koruma', 'Yabancı talep fiyat tabanı sağlar', 'Sahil/premium bölgeler dolar bazlı fiyatlanır'],
    cons: ['Kısa vadede dolar bazında kayıp mümkün', 'Bölge ve segment bağımlı'],
  },
  {
    title: 'Değer Artışı (Sermaye Kazancı)',
    icon: Home,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Türkiye\'de konut fiyatları 2019–2022 döneminde birçok yatırım aracını geride bıraktı. Konum seçimi kritiktir.',
    pros: ['2022\'de %186 nominal artış', 'İstanbul\'da talep sürekli', 'Yeni projeler değer artışı primli başlar'],
    cons: ['5 yıl içinde satışta değer artış vergisi', 'Bölge riski ve likidite sorunu'],
  },
  {
    title: 'Kısa Dönem Kiralama',
    icon: Shield,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    desc: 'Turizm bölgelerinde Airbnb/Booking üzerinden döviz bazlı kira geliri mümkündür. Yasal düzenlemeler gelişmektedir.',
    pros: ['Döviz cinsinden kira geliri', 'Uzun vadeli kiracıdan 3-5x yüksek gelir', 'Sezonsal esneklik'],
    cons: ['Lisans ve belediye düzenlemeleri', 'Yönetim yükü yüksek', '2024\'te yeni kural ve izin zorunluluğu'],
  },
];

const COMPARISON = [
  { asset: 'Konut (TL nominal)', return5y: '+580%', inflation: '+290%', verdict: 'Enflasyonu geçti', color: 'text-[#00C49F]' },
  { asset: 'Dolar/TL', return5y: '+535%', inflation: '+290%', verdict: 'Enflasyonu geçti', color: 'text-[#00C49F]' },
  { asset: 'Altın (TL)', return5y: '+620%', inflation: '+290%', verdict: 'Enflasyonu geçti', color: 'text-[#00C49F]' },
  { asset: 'TL Mevduat (%25 yıllık)', return5y: '+200%', inflation: '+290%', verdict: 'Enflasyonun altında', color: 'text-rose-600' },
  { asset: 'BİST 100 Hisse', return5y: '+510%', inflation: '+290%', verdict: 'Enflasyonu geçti*', color: 'text-amber-600' },
];

const RISKS = [
  {
    icon: AlertTriangle,
    title: 'Likidite Riski',
    desc: 'Konut satışı aylar alabilir. Acil nakit ihtiyacında piyasa değerinin altında satmak zorunda kalınabilir.',
  },
  {
    icon: AlertTriangle,
    title: 'Konum Riski',
    desc: 'Yanlış bölgede alınan mülk; kentsel dönüşüm, ulaşım değişikliği veya arz fazlasıyla değer kaybedebilir.',
  },
  {
    icon: AlertTriangle,
    title: 'Faiz Riski',
    desc: 'Yüksek faiz ortamında kredi maliyeti getiriyi eritir. Nakit alım veya kısa vade tercih edin.',
  },
  {
    icon: AlertTriangle,
    title: 'Değerleme Riski',
    desc: 'Balon dönemlerinde alım yapmak; düzeltme sonrası uzun vadeli kayba yol açabilir.',
  },
];

export default function EnflasyonKorumasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Enflasyon Koruması
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
            Gayrimenkul ile<br />Enflasyona Karşı Korunma
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye&apos;de yüksek enflasyon dönemlerinde konutun tarihsel getirisi, kira endeksleme
            avantajları ve diğer varlık sınıflarıyla karşılaştırmalı analiz.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%186</p>
              <p className="text-xs text-gray-400">2022 nominal konut artışı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%25</p>
              <p className="text-xs text-gray-400">Kira artış tavanı (TÜFE)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">5 yıl</p>
              <p className="text-xs text-gray-400">Değer artış vergisi muafiyeti</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Historical chart */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Konut Fiyatı vs TÜFE (2019–2024)</h2>
          <p className="text-sm text-gray-500 mb-5">Yıllık nominal artış oranı karşılaştırması</p>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="space-y-3">
              {HISTORICAL.map(h => (
                <div key={h.year}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-700 w-10">{h.year}</span>
                    <div className="flex-1 mx-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 bg-[#00C49F] rounded-full"
                          style={{ width: `${(h.konut / maxKonut * 80).toFixed(0)}%` }}
                        />
                        <span className="text-[10px] text-[#00C49F] font-bold whitespace-nowrap">Konut +{h.konut}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 bg-rose-400 rounded-full"
                          style={{ width: `${(h.tüfe / maxKonut * 80).toFixed(0)}%` }}
                        />
                        <span className="text-[10px] text-rose-500 font-bold whitespace-nowrap">TÜFE +{h.tüfe}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-4">
              * Kaynak: TÜİK TÜFE ve Endeksa/REIDIN konut fiyat endeksleri. Geçmiş performans gelecek getirileri garanti etmez.
            </p>
          </div>
        </section>

        {/* Strategies */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Enflasyon Koruma Stratejileri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STRATEGIES.map(s => (
              <div key={s.title} className={`bg-white rounded-2xl border ${s.border} p-5 shadow-sm`}>
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <h3 className="text-sm font-black text-gray-900 mb-2">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{s.desc}</p>
                <div className="space-y-1.5">
                  {s.pros.map(p => (
                    <div key={p} className="flex items-start gap-2">
                      <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-600">{p}</p>
                    </div>
                  ))}
                  {s.cons.map(c => (
                    <div key={c} className="flex items-start gap-2">
                      <AlertTriangle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-500">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Varlık Sınıfları Enflasyon Karşılaştırması</h2>
          <p className="text-sm text-gray-500 mb-5">2019–2024 tahmini 5 yıllık nominal getiri (TL bazlı)</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left p-3 font-bold text-gray-600">Varlık</th>
                  <th className="text-right p-3 font-bold text-gray-600">5Y Getiri</th>
                  <th className="text-right p-3 font-bold text-gray-600">Enflasyon</th>
                  <th className="text-right p-3 font-bold text-gray-600 pr-4">Sonuç</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((r, i) => (
                  <tr key={r.asset} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3 font-semibold text-gray-700">{r.asset}</td>
                    <td className={`p-3 text-right font-bold ${r.color}`}>{r.return5y}</td>
                    <td className="p-3 text-right text-gray-400">+290%</td>
                    <td className={`p-3 pr-4 text-right font-bold text-[10px] ${r.color}`}>{r.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-[10px] text-gray-400 p-3 border-t border-gray-100">
              * BİST getirisi yüksek oynaklık içerir. Gayrimenkul verileri Türkiye geneli ortalamadır; bölgesel sapmalar büyüktür.
            </p>
          </div>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Gayrimenkul Yatırımının Riskleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {RISKS.map(r => (
              <div key={r.title} className="bg-white rounded-xl border border-amber-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <r.icon size={15} className="text-amber-500" />
                  <h3 className="text-sm font-bold text-gray-900">{r.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key takeaway */}
        <section className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-6 text-white">
          <h3 className="text-lg font-black mb-3">Temel Çıkarım</h3>
          <p className="text-sm text-white/85 leading-relaxed mb-4">
            Türkiye&apos;de konut, 2019–2023 döneminde TL bazında enflasyonun üzerinde getiri sağladı.
            Ancak <strong>konum, zamanlama ve finansman maliyeti</strong> belirleyicidir.
            Nakit alım + doğru bölge seçimi + uzun vadeli tutma = en güçlü enflasyon koruması kombinasyonu.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/yatirim-analizi" className="px-5 py-2.5 bg-white text-[#00C49F] text-xs font-bold rounded-xl hover:bg-gray-50 transition-colors">
              Yatırım ROI Hesapla
            </Link>
            <Link href="/kira-getiri-hesaplayici" className="px-5 py-2.5 border border-white/30 text-white text-xs font-bold rounded-xl hover:bg-white/10 transition-colors">
              Kira Getiri Hesapla
            </Link>
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı (TÜFE)' },
              { href: '/portfoy', label: 'Portföy Takibi' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi' },
              { href: '/butce-planlayici', label: 'Bütçe Planlayıcı' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
