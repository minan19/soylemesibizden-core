import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Landmark, Building2, Home, TrendingUp } from 'lucide-react';
import EmlakVergisiClient from './EmlakVergisiClient';

export const metadata: Metadata = {
  title: 'Emlak Vergisi Hesaplayıcı 2024 | Söylemesi Bizden',
  description:
    'Türkiye\'de konut, işyeri, arsa ve arazi emlak vergisini hesaplayın. Büyükşehir, il ve köy oranları, taksit tarihleri, ilk konut istisnası.',
};

export default function EmlakVergisiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/hesaplama" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Hesaplama Araçları
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
              <Landmark size={26} className="text-amber-500" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Emlak Vergisi Hesaplayıcı</h1>
              <p className="text-gray-500 mt-1 text-sm max-w-xl">
                2024 yılı Türkiye emlak vergisi oranlarıyla yıllık vergi, taksit tutarları ve ilk konut istisnasını
                hesaplayın.
              </p>
            </div>
          </div>
        </div>

        {/* Rate reference table */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">2024 Vergi Oranı Tablosu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 pr-6 text-gray-400 font-semibold">Mülk Türü</th>
                  <th className="text-right py-2 pr-6 text-gray-400 font-semibold">Büyükşehir</th>
                  <th className="text-right py-2 pr-6 text-gray-400 font-semibold">İl / İlçe</th>
                  <th className="text-right py-2 text-gray-400 font-semibold">Köy / Kasaba</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { type: 'Konut / Daire', icon: Home, bsk: '%0.2', il: '%0.1', koy: '%0.1' },
                  { type: 'İşyeri / Dükkan', icon: Building2, bsk: '%0.4', il: '%0.2', koy: '%0.2' },
                  { type: 'Arsa', icon: Landmark, bsk: '%0.6', il: '%0.3', koy: '%0.3' },
                  { type: 'Arazi / Tarla', icon: TrendingUp, bsk: '%0.2', il: '%0.1', koy: '%0.05' },
                ].map(r => (
                  <tr key={r.type}>
                    <td className="py-3 pr-6">
                      <div className="flex items-center gap-2">
                        <r.icon size={13} className="text-gray-400" />
                        <span className="font-semibold text-gray-800">{r.type}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-6 text-right font-bold text-amber-600">{r.bsk}</td>
                    <td className="py-3 pr-6 text-right font-semibold text-gray-700">{r.il}</td>
                    <td className="py-3 text-right font-semibold text-gray-500">{r.koy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-3">
            * İlk konut istisnası: Konutlarda rayiç bedelin 2.000.000 ₺&apos;ye kadar olan kısmı vergiden muaf tutulabilir
            (ilgili şartların yerine getirilmesi halinde).
          </p>
        </div>

        {/* Interactive calculator */}
        <EmlakVergisiClient />

        {/* Related tools */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesabı', desc: 'Alım masraflarını hesaplayın' },
            { href: '/hesaplama', label: 'Kredi Hesaplayıcı', desc: 'Aylık taksit ve faiz analizi' },
            { href: '/yatirim-analizi', label: 'Yatırım Analizi', desc: 'Net getiri ve ROI' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-amber-200 transition-all"
            >
              <p className="text-sm font-bold text-gray-800 group-hover:text-amber-700 transition-colors">{t.label}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
