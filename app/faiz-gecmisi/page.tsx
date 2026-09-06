import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingUp, ArrowRight, Info, BarChart2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Faiz Geçmişi | TCMB Politika Faizi ve Konut Kredisi Trendi | Söylemesi Bizden',
  description:
    'TCMB politika faizinin 2018\'den günümüze tarihsel seyri, konut kredisi faiz oranları ve piyasa etkisi.',
};

const TCMB_TARIHSEL = [
  { donem: '2018 Q1', politikaFaiz: 8.0, konutKredi: 1.20, enflasyon: 12.1, not: 'Normalleşme dönemi' },
  { donem: '2018 Q3', politikaFaiz: 24.0, konutKredi: 2.10, enflasyon: 25.3, not: 'Kur krizi — acil artış' },
  { donem: '2019 Q3', politikaFaiz: 16.5, politikaFaiz2: null, konutKredi: 1.50, enflasyon: 15.0, not: 'İndirim döngüsü' },
  { donem: '2020 Q2', politikaFaiz: 8.25, konutKredi: 0.64, enflasyon: 11.4, not: 'Pandemi; tarihi düşük' },
  { donem: '2021 Q2', politikaFaiz: 19.0, konutKredi: 1.80, enflasyon: 17.5, not: 'Normalleşme girişimi' },
  { donem: '2021 Q4', politikaFaiz: 14.0, konutKredi: 1.50, enflasyon: 36.1, not: 'Yeni politika: faiz inişi' },
  { donem: '2022 Q2', politikaFaiz: 14.0, konutKredi: 2.80, enflasyon: 78.6, not: 'Enflasyon zirveye yakın' },
  { donem: '2023 Q2', politikaFaiz: 8.5, konutKredi: 1.68, enflasyon: 38.2, not: 'Seçim öncesi düşük faiz' },
  { donem: '2023 Q4', politikaFaiz: 40.0, konutKredi: 3.80, enflasyon: 65.0, not: 'Ortodoks para politikasına dönüş' },
  { donem: '2024 Q2', politikaFaiz: 50.0, konutKredi: 4.20, enflasyon: 75.4, not: 'Faiz zirve; enflasyonla mücadele' },
  { donem: '2024 Q4', politikaFaiz: 47.5, konutKredi: 3.90, enflasyon: 62.0, not: 'İlk indirim sinyalleri' },
  { donem: '2025 Q2', politikaFaiz: 42.5, konutKredi: 3.50, enflasyon: 40.0, not: 'Kademeli indirim döngüsü' },
];

const ONEMLI_DONEMLER = [
  {
    baslik: '2020 Pandemi Dönemi',
    faiz: '%8.25',
    konutKredi: '%0.64/ay',
    aciklama: 'Tarihin en düşük konut kredisi faiz oranı. Devlet destekli kampanyalar ile konut satışları rekor kırdı. 2020 yılında 1.5 milyon konut satıldı.',
    renk: 'text-[#00C49F]',
  },
  {
    baslik: '2021–2022 Unortodoks Politika',
    faiz: '%14',
    konutKredi: '%1.50–2.80/ay',
    aciklama: 'Yüksek enflasyona rağmen faiz indirildi. Kur şoku (1$ = 18₺) ve emlak piyasasında spekülatif fiyat artışları yaşandı. Yabancı alımları arttı.',
    renk: 'text-amber-600',
  },
  {
    baslik: '2023–2024 Normalleşme',
    faiz: '%8.5 → %50',
    konutKredi: '%1.68 → %4.20/ay',
    aciklama: 'Mayıs 2023 seçimlerinin ardından ortodoks para politikasına dönüş. Konut kredisi faizleri 2.5 kat arttı; ipotek satışları %70 düştü.',
    renk: 'text-rose-600',
  },
  {
    baslik: '2025 İndirim Döngüsü',
    faiz: '%42.5',
    konutKredi: '%3.50/ay',
    aciklama: 'Enflasyonun düşmesiyle birlikte TCMB kademeli faiz indirimlerine başladı. Konut piyasasında canlanma beklentisi oluştu.',
    renk: 'text-blue-600',
  },
];

const ETKILER = [
  { faizArtis: 'Faiz artar', konut: 'Satışlar düşer, fiyat artışı yavaşlar', kiracı: 'Kira talebi artar (ev sahibi olamaz)', yatirimci: 'Mevduat cazip olur; kira getirisi baskı altında' },
  { faizArtis: 'Faiz düşer', konut: 'Satışlar canlanır, fiyatlar hızlı yükselir', kiracı: 'Ev sahipliğine geçiş artar', yatirimci: 'Gayrimenkul cazip; erken alım fırsatı' },
];

const maxFaiz = Math.max(...TCMB_TARIHSEL.map(d => d.politikaFaiz));

export default function FaizGecmisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Faiz Geçmişi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            TCMB Faiz ve Konut Kredisi Trendi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            2018&apos;den günümüze TCMB politika faizi, konut kredisi oranları ve piyasaya etkileri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%0.64</p>
              <p className="text-xs text-gray-400">Tarihi düşük (2020)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%4.20</p>
              <p className="text-xs text-gray-400">Tarihi yüksek (2024)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%50</p>
              <p className="text-xs text-gray-400">TCMB tepe faizi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">

        {/* Tarihsel Grafik */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <BarChart2 size={14} className="text-[#00C49F]" /> TCMB Politika Faizi Trendi (2018–2025)
          </h2>
          <div className="space-y-1.5">
            {TCMB_TARIHSEL.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-16 shrink-0">{d.donem}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{
                      width: `${(d.politikaFaiz / maxFaiz) * 100}%`,
                      backgroundColor: d.politikaFaiz >= 40 ? '#EF4444' : d.politikaFaiz >= 20 ? '#F59E0B' : '#00C49F',
                    }}
                  >
                    <span className="text-[9px] text-white font-bold">%{d.politikaFaiz}</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 w-16 text-right shrink-0">%{d.konutKredi}/ay</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3 flex items-center gap-1">
            <Info size={10} /> Bar rengi: Yeşil = düşük, Sarı = orta, Kırmızı = yüksek faiz ortamı.
          </p>
        </section>

        {/* Tarihi Tablo */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dönemsel Veri Tablosu</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Dönem</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">TCMB %</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Konut Kredi %/ay</th>
                  <th className="text-right px-4 py-3 font-black text-gray-500">TÜFE</th>
                  <th className="text-left px-4 py-3 font-black text-gray-400">Not</th>
                </tr>
              </thead>
              <tbody>
                {TCMB_TARIHSEL.map((d, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{d.donem}</td>
                    <td className={`px-4 py-3 text-right font-bold ${d.politikaFaiz >= 40 ? 'text-rose-500' : d.politikaFaiz >= 20 ? 'text-amber-600' : 'text-[#00C49F]'}`}>%{d.politikaFaiz}</td>
                    <td className="px-4 py-3 text-right text-gray-700 font-bold">%{d.konutKredi}</td>
                    <td className="px-4 py-3 text-right text-gray-500">%{d.enflasyon}</td>
                    <td className="px-4 py-3 text-gray-400">{d.not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Önemli Dönemler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kritik Dönemler</h2>
          <div className="space-y-4">
            {ONEMLI_DONEMLER.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{o.baslik}</p>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] bg-gray-50 text-gray-600 font-bold px-2 py-0.5 rounded-full">TCMB: {o.faiz}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-50 ${o.renk}`}>{o.konutKredi}</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{o.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Etki Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Faiz Hareketlerinin Piyasaya Etkisi</h2>
          <div className="space-y-4">
            {ETKILER.map((e, i) => (
              <div key={i} className={`rounded-xl p-4 ${i === 0 ? 'bg-rose-50 border border-rose-100' : 'bg-[#F0FDF8] border border-[#00C49F]/20'}`}>
                <p className={`text-xs font-black mb-2 ${i === 0 ? 'text-rose-600' : 'text-[#00C49F]'}`}>{e.faizArtis}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Konut Piyasası</p>
                    <p className="text-[10px] text-gray-600">{e.konut}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Kiracı/Alıcı</p>
                    <p className="text-[10px] text-gray-600">{e.kiracı}</p>
                  </div>
                  <div className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-gray-400 font-bold mb-0.5">Yatırımcı</p>
                    <p className="text-[10px] text-gray-600">{e.yatirimci}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/faiz-takip', label: 'Güncel Faiz Takip' },
              { href: '/banka-kredileri', label: 'Banka Kredi Karşılaştır' },
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/konut-kredisi-rehberi', label: 'Konut Kredisi Rehberi' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı, Satın mı?' },
              { href: '/enflasyon-korumasi', label: 'Enflasyon Koruması' },
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
