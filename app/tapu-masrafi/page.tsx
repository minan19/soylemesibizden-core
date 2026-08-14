import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Calculator, Home, TrendingUp } from 'lucide-react';
import TapuCalcClient from './TapuCalcClient';

export const metadata: Metadata = {
  title: 'Tapu Masrafı Hesaplayıcı | Gayrimenkul Alım Maliyeti | Söylemesi Bizden',
  description:
    'Türkiye\'de gayrimenkul alımında ödeyeceğiniz tüm masrafları hesaplayın: tapu harcı, döner sermaye, DASK, KDV, emlakçı komisyonu ve emlak vergisi.',
};

export default function TapuMasrafiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/hesaplama" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Hesaplama Araçları
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
              <FileText size={26} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Tapu Masrafı Hesaplayıcı</h1>
              <p className="text-gray-500 mt-1 text-sm max-w-xl">
                Gayrimenkul alımında ödeyeceğiniz tapu harcı, döner sermaye, DASK, KDV ve emlakçı komisyonunu
                tek ekranda hesaplayın. Toplam maliyetinizi önceden bilin.
              </p>
            </div>
          </div>
        </div>

        {/* Quick info pills */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Home, label: 'Tapu Harcı', value: '%4 (alıcı+satıcı)', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { icon: Calculator, label: 'Emlakçı Kom.', value: '%2+KDV', color: 'bg-violet-50 text-violet-700 border-violet-200' },
            { icon: TrendingUp, label: 'Emlak Vergisi', value: '%0.1–%0.2/yıl', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold ${item.color}`}>
              <item.icon size={12} />
              <span>{item.label}:</span>
              <span className="font-black">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Cost Reference Table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Masraf Referans Tablosu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Masraf Kalemi</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Oran / Tutar</th>
                  <th className="text-left py-2 pr-4 text-gray-400 font-semibold">Ödeyen</th>
                  <th className="text-left py-2 text-gray-400 font-semibold">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['Tapu Harcı', '%2 + %2 = %4', 'Alıcı + Satıcı', 'Beyan bedeli üzerinden. Alıcı genellikle %4 öder.'],
                  ['Döner Sermaye', '≈ ₺1.200 (sabit)', 'Alıcı', 'Tapu müdürlüğü hizmet bedeli (2024)'],
                  ['TKGM Kütük Harcı', '≈ ₺650 (sabit)', 'Alıcı', 'Tapu sicil müdürlüğü'],
                  ['DASK', 'Değişken (m²\'ye göre)', 'Alıcı', 'Zorunlu deprem sigortası. Tapudan önce şarttır.'],
                  ['KDV (ilk el)', '%1 / %8 / %20', 'Alıcı', 'Müteahhitten alımda, metrekajeye ve belediyeye göre'],
                  ['Emlakçı Komisyonu', '%2 + %20 KDV', 'Alıcı / Satıcı', 'Sözleşmeyle belirlenir; müzakere edilebilir'],
                  ['Emlak Vergisi', '%0.1 veya %0.2/yıl', 'Mülk sahibi', 'Büyükşehirlerde %0.2, diğerlerinde %0.1'],
                ].map(([kalem, oran, odeyen, aciklama]) => (
                  <tr key={kalem}>
                    <td className="py-2.5 pr-4 font-semibold text-gray-800">{kalem}</td>
                    <td className="py-2.5 pr-4 font-bold text-[#00C49F]">{oran}</td>
                    <td className="py-2.5 pr-4 text-gray-500">{odeyen}</td>
                    <td className="py-2.5 text-gray-400">{aciklama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Calculator */}
        <TapuCalcClient />

        {/* Related tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit ve toplam faiz' },
            { href: '/valuation', label: 'Değerleme Aracı', desc: 'Bölge fiyat analizi' },
            { href: '/rehber/ev-satin-alma', label: 'Satın Alma Rehberi', desc: 'Adım adım satın alma süreci' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all"
            >
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
