import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Endeksi ve TÜFE Artış Oranları 2024 | Kira Artış Sınırı | Söylemesi Bizden',
  description:
    'Yıllık kira artış sınırları, TÜFE ve ÜFE oranları, %25 tavan uygulaması, yasal artış hesaplama yöntemi.',
};

const TUFE_YILLIK = [
  { ay: 'Oca 2024', tufe: 64.86, ufe: 48.71 },
  { ay: 'Şub 2024', tufe: 67.07, ufe: 49.15 },
  { ay: 'Mar 2024', tufe: 68.50, ufe: 51.24 },
  { ay: 'Nis 2024', tufe: 69.80, ufe: 53.87 },
  { ay: 'May 2024', tufe: 75.45, ufe: 57.68 },
  { ay: 'Haz 2024', tufe: 71.60, ufe: 52.90 },
  { ay: 'Tem 2024', tufe: 61.78, ufe: 43.35 },
  { ay: 'Ağu 2024', tufe: 51.97, ufe: 35.17 },
  { ay: 'Eyl 2024', tufe: 49.38, ufe: 33.09 },
  { ay: 'Eki 2024', tufe: 48.58, ufe: 31.65 },
  { ay: 'Kas 2024', tufe: 47.09, ufe: 29.38 },
  { ay: 'Ara 2024', tufe: 44.38, ufe: 26.70 },
];

const TARIHSEL = [
  { yil: '2019', tufe: 8.55, tavan: null },
  { yil: '2020', tufe: 14.60, tavan: null },
  { yil: '2021', tufe: 19.60, tavan: null },
  { yil: '2022', tufe: 72.31, tavan: 25 },
  { yil: '2023', tufe: 64.77, tavan: 25 },
  { yil: '2024', tufe: 44.38, tavan: 25 },
];

const HESAPLAMA_ORNEKLERI = [
  {
    durum: 'Yenileme Dönemi: Temmuz 2024',
    tufe12: 61.78,
    tavan: 25,
    mevcutKira: 15000,
    artis: 15000 * 0.25,
    yeniKira: 15000 * 1.25,
    aciklama: '%25 tavan hâlâ uygulanıyor; TÜFE %61.78 olmasına rağmen.',
  },
  {
    durum: 'Yenileme Dönemi: Aralık 2024',
    tufe12: 44.38,
    tavan: 25,
    mevcutKira: 20000,
    artis: 20000 * 0.25,
    yeniKira: 20000 * 1.25,
    aciklama: '%25 tavan devam ediyor; TÜFE %44.38.',
  },
];

const YASAL_CERCEVE = [
  { madde: 'TBK md. 344', aciklama: 'Konut kiralarında yıllık artış, bir önceki yılın TÜFE oranını geçemez.' },
  { madde: '%25 Geçici Tavan (7409 sayılı Kanun)', aciklama: 'Konut kiracılarını korumak için 2022–2024 döneminde uygulandı; her yıl uzatma kararıyla devam etti.' },
  { madde: 'İşyeri Kiraları', aciklama: 'Konut tavanı kapsamı dışında; TÜFE veya tarafların anlaşmasıyla serbestçe belirlenir.' },
  { madde: '5 Yıl Sonrası Hakkaniyete Uygun Artış', aciklama: 'Uzun süreli kiralarda mahkeme, piyasa rayicine göre artışa hükmedebilir (TBK md. 344/3).' },
];

const KIRACININ_HAKLARI = [
  'Ev sahibi yasal sınırı aşan artış talep edemez; imzalanan sözleşme hükmü geçersizdir.',
  'Fazla tahsil edilen kira bedellerini 5 yıllık zamanaşımı içinde geri talep edebilirsiniz.',
  'Artışı noter ihtarnamesiyle ispat yükümlülüğü ev sahibindedir.',
  'TBK md. 344/2: Sözleşmede TÜFE\'yi aşan artış öngörülmüşse o hüküm geçersiz sayılır.',
];

const fmt = (n: number) => n.toLocaleString('tr-TR', { maximumFractionDigits: 0 });

const maxTufe = Math.max(...TUFE_YILLIK.map(d => d.tufe));

export default function KiraEndeksiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kira Endeksi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Endeksi ve Artış Sınırları
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            2024 TÜFE aylık seyrinden yıllık artış hesaplamasına, %25 geçici tavanın hukuki dayanağından
            kiracı haklarına kadar kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%25</p>
              <p className="text-xs text-gray-400">2024 kira artış tavanı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-rose-400">%44.38</p>
              <p className="text-xs text-gray-400">Ara 2024 yıllık TÜFE</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">TBK 344</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* TÜFE 2024 Bar Grafik */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">2024 Aylık TÜFE (Yıllık, %)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="space-y-2">
              {TUFE_YILLIK.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500 w-16 shrink-0">{d.ay}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-rose-400 flex items-center justify-end pr-2"
                      style={{ width: `${(d.tufe / maxTufe) * 100}%` }}
                    >
                      <span className="text-[9px] text-white font-bold">%{d.tufe.toFixed(1)}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 w-12 text-right">ÜFE %{d.ufe.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-3">Kaynak: TÜİK — Tüketici Fiyat Endeksi yıllık değişim.</p>
          </div>
        </section>

        {/* Tarihsel Tablo */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tarihsel TÜFE ve Kira Tavan Özeti</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Yıl</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Yıl Sonu TÜFE</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Kira Artış Tavanı</th>
                </tr>
              </thead>
              <tbody>
                {TARIHSEL.map((r, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{r.yil}</td>
                    <td className="px-4 py-3 text-right text-gray-600">%{r.tufe.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      {r.tavan ? (
                        <span className="text-amber-600 font-bold">%{r.tavan} (Tavan)</span>
                      ) : (
                        <span className="text-gray-500">TÜFE = Tavan</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hesaplama Örnekleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Artış Hesaplama Örnekleri</h2>
          <div className="space-y-4">
            {HESAPLAMA_ORNEKLERI.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{o.durum}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div>
                    <p className="text-[10px] text-gray-400">Mevcut Kira</p>
                    <p className="text-sm font-black text-gray-900">₺{fmt(o.mevcutKira)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Yasal Artış</p>
                    <p className="text-sm font-black text-amber-600">₺{fmt(o.artis)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Yeni Kira</p>
                    <p className="text-sm font-black text-[#00C49F]">₺{fmt(o.yeniKira)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Uygulanan Tavan</p>
                    <p className="text-sm font-black text-gray-900">%25</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-2">
                  <Info size={11} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-blue-700">{o.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yasal Çerçeve */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Çerçeve</h2>
          <div className="space-y-3">
            {YASAL_CERCEVE.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-bold shrink-0">{m.madde}</span>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kiracı Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kiracının Yasal Hakları
          </h2>
          <ul className="space-y-2.5">
            {KIRACININ_HAKLARI.map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600 leading-relaxed">{h}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Dikkat:</span> %25 geçici tavan her yıl kanunla uzatılmaktadır. 2025 yılı için yeni düzenlemeleri GİB ve Resmi Gazete üzerinden takip edin. İşyeri kiralarına tavan uygulanmaz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/stopaj-vergisi', label: 'Kira Stopaj Vergisi' },
              { href: '/kira-haritasi', label: 'Türkiye Kira Haritası' },
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
