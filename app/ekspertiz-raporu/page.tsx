import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Clock, ShieldCheck, Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ekspertiz Raporu Rehberi | SPK Lisanslı Değerleme | Söylemesi Bizden',
  description:
    'Gayrimenkul ekspertiz (değerleme) raporu nasıl alınır? SPK lisanslı ekspertiz şirketleri, rapor içeriği, maliyet ve süreç.',
};

const REPORT_TYPES = [
  {
    title: 'Konut Ekspertizi',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    border: 'border-[#00C49F]/20',
    uses: ['Banka konut kredisi başvurusu', 'Alım-satım fiyat doğrulaması', 'Sigorta bedeli tespiti'],
    duration: '2-5 iş günü',
    cost: '₺1.500 – ₺3.500',
  },
  {
    title: 'Ticari Gayrimenkul Ekspertizi',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    uses: ['Ofis, dükkan, depo değerlemesi', 'Yatırım analizi', 'Kira bedelinin tespiti'],
    duration: '3-7 iş günü',
    cost: '₺3.000 – ₺8.000',
  },
  {
    title: 'Arsa Ekspertizi',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    uses: ['İmar değişikliği sonrası yeniden değerleme', 'Kamulaştırma itirazı', 'Ortaklığın giderilmesi davası'],
    duration: '5-10 iş günü',
    cost: '₺2.500 – ₺6.000',
  },
  {
    title: 'Proje (Yapım Aşaması) Ekspertizi',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    uses: ['Ön satışlı proje finansmanı', 'Müteahhit-banka süreç takibi', 'Tamamlama güvencesi'],
    duration: '7-15 iş günü',
    cost: '₺5.000 – ₺15.000+',
  },
];

const REPORT_CONTENTS = [
  'Taşınmaz kimlik bilgileri (ada, parsel, pafta)',
  'Mülkiyet ve tapu durumu, ipotek/şerh analizi',
  'Imar durumu (TAKS, KAKS, yapı nizamı)',
  'Konum analizi (ulaşım, çevre, sosyal donatı)',
  'Fiziksel inceleme (kat, yaş, durum, özellikler)',
  'Emsal karşılaştırma (son 6 ay gerçekleşen satışlar)',
  'Değerleme yaklaşımı (karşılaştırma, gelir, maliyet)',
  'Sonuç değer + %90 güven aralığı',
  'Ekspertiz şirket damgası ve SPK lisanslı uzman imzası',
];

const PROCESS_STEPS = [
  { step: '1', title: 'SPK Lisanslı Şirket Seç', desc: 'SPK e-lisans sorgu ekranından tescilli ekspertiz şirketini doğrulayın.', duration: '1 saat' },
  { step: '2', title: 'Belgeleri Hazırla', desc: 'Tapu fotokopisi, DASK, kimlik belgesi, varsa kat planı.', duration: '1 gün' },
  { step: '3', title: 'Yerinde İnceleme', desc: 'Lisanslı ekspert fiziksel inceleme yapar, fotoğraf ve ölçüm alır.', duration: '1-2 saat' },
  { step: '4', title: 'Analiz ve Raporlama', desc: 'Emsal araştırması, değerleme hesabı ve resmî rapor hazırlanır.', duration: '2-7 iş günü' },
  { step: '5', title: 'Raporu Al ve Değerlendir', desc: 'Dijital + imzalı fiziksel kopya teslim edilir. Bankaya iletilirse inceleme süresi eklenir.', duration: '1 gün' },
];

const WARNINGS = [
  'Banka kredisi için istenen rapor, genellikle bankanın anlaşmalı ekspertiz şirketleri aracılığıyla hazırlanır; başka bir firmadan alınan rapor kabul edilmeyebilir.',
  'Rapor tarihi 3-6 ay geçerliliğini korur; piyasa dalgalanmasında yenilenmesi istenebilir.',
  'Değerleme sonucu alım fiyatının altına düşebilir; bu durumda banka açığı finanse etmez.',
  'SPK tescilsiz "koltuk altı rapor" yasal geçerliliği olmayan ve banka tarafından reddedilen belgedir.',
];

const TIPS = [
  'Bankaya başvurmadan önce kendi isteğinizle bağımsız bir ekspertiz yaptırarak gerçekçi fiyat tespiti yapabilirsiniz.',
  'Kamulaştırma davalarında özel ekspertiz raporu, mahkeme bilirkişisine önemli emsal sunar.',
  'Değer itirazı için birden fazla ekspertiz raporu almanız gerekebilir; mahkeme en az iki raporu karşılaştırır.',
  'Rapor içindeki emsal satışları inceleyerek bölge piyasası hakkında fikir edinin.',
];

export default function EkspertizRaporuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Değerleme Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ekspertiz Raporu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            SPK lisanslı gayrimenkul değerleme raporu nasıl alınır, ne içerir, maliyeti ne kadar?
            Konut, ticari gayrimenkul ve arsa ekspertizi için adım adım rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">SPK</p>
              <p className="text-xs text-gray-400">Zorunlu lisans</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">2-5</p>
              <p className="text-xs text-gray-400">İş günü (konut)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3-6 ay</p>
              <p className="text-xs text-gray-400">Rapor geçerlilik</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Rapor Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Ekspertiz Raporu Türleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REPORT_TYPES.map(r => (
              <div key={r.title} className={`bg-white rounded-2xl border ${r.border} p-5 shadow-sm`}>
                <h3 className={`text-sm font-black mb-3 ${r.color}`}>{r.title}</h3>
                <ul className="space-y-1.5 mb-4">
                  {r.uses.map((u, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle size={11} className={`${r.color} shrink-0 mt-0.5`} />
                      <p className="text-xs text-gray-600">{u}</p>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">Süre</p>
                    <p className="text-xs font-bold text-gray-800 flex items-center gap-1"><Clock size={10} />{r.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 mb-0.5">Maliyet</p>
                    <p className={`text-xs font-bold ${r.color}`}>{r.cost}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Rapor İçeriği */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ekspertiz Raporu Ne İçerir?</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REPORT_CONTENTS.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Ekspertiz Süreci</h2>
          <div className="space-y-3">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white flex items-center justify-center text-xs font-black shrink-0">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-sm font-black text-gray-900">{s.title}</h3>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 whitespace-nowrap">
                      <Clock size={10} /> {s.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warnings */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {WARNINGS.map((w, i) => (
              <div key={i} className="flex items-start gap-3 bg-white border border-amber-100 rounded-xl p-4 shadow-sm">
                <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{w}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#00C49F]" /> Pratik İpuçları
          </h2>
          <ul className="space-y-3">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* SPK sorgu note */}
        <section className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <Search size={14} className="text-blue-500 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-black">SPK Lisans Doğrulama:</span> Değerleme şirketini seçmeden önce Sermaye Piyasası Kurulu&apos;nun e-lisans sorgu sayfasından (spk.gov.tr) tescil numarasını kontrol edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/satilik-ev-degeri', label: 'Ev Değeri Hesapla' },
              { href: '/valuation', label: 'Değerleme Aracı' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/yatirim-analizi', label: 'Yatırım ROI Analizi' },
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
