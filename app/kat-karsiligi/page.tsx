import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kat Karşılığı İnşaat Sözleşmesi Rehberi | Arsa Sahibi Hakları | Söylemesi Bizden',
  description:
    'Kat karşılığı inşaat sözleşmesi nedir, nasıl yapılır? Arsa sahibi ve müteahhit hakları, pay oranları, riskler ve dikkat edilmesi gerekenler.',
};

const PAY_ORANI = [
  { tip: 'Merkezi Konum (Şehir İçi)', arsaSahibi: '%45–%55', mutehit: '%45–%55', not: 'Yüksek talep, arsa değeri daha belirleyici.' },
  { tip: 'Gelişen Bölge / Çevre İlçe', arsaSahibi: '%35–%45', mutehit: '%55–%65', not: 'Müteahhit riski yüksek, inşaat maliyeti baskın.' },
  { tip: 'Lüks / Yüksek Katlı Proje', arsaSahibi: '%40–%50', mutehit: '%50–%60', not: 'Satış hızı ve fiyat kilit değişken.' },
  { tip: 'Kentsel Dönüşüm Kapsamı', arsaSahibi: '%50–%60', mutehit: '%40–%50', not: 'Devlet teşvikleri müteahhit maliyetini düşürür.' },
];

const SOZLESME_MADDELERI = [
  { madde: 'Arsa Tanımı ve Tapu Bilgisi', detail: 'Ada, parsel, yüzölçümü, TKGM tapu kütük bilgileri eksiksiz yer almalı.' },
  { madde: 'İnşaat Projesi ve Ruhsat', detail: 'Onaylı mimari proje ve inşaat ruhsatı sözleşme eki olarak belirtilmeli.' },
  { madde: 'Pay Oranı ve Bağımsız Bölümler', detail: 'Hangi dairelerin arsa sahibine ait olduğu kat ve bölüm numarası ile netleştirilmeli.' },
  { madde: 'Teslim Süresi', detail: 'İnşaat başlangıcı ve teslim tarihi; gecikme tazminatı günlük/aylık olarak belirtilmeli.' },
  { madde: 'İnşaat Kalitesi ve Teknik Şartname', detail: 'Kullanılacak malzeme standartları (TS EN normları) yazılı ekle alınmalı.' },
  { madde: 'İskan ve Tapu Devri Taahhüdü', detail: 'Müteahhit, iskan alınmasını ve tapunun arsa sahibi adına tescilini garanti etmeli.' },
  { madde: 'Banka Teminat Mektubu', detail: 'İnşaat bedelinin %10–%20\'si oranında banka teminatı sözleşmeye bağlanmalı.' },
  { madde: 'Cayma ve Fesih Koşulları', detail: 'Her iki taraf için fesih şartları, tazminat miktarı ve arsa iade prosedürü tanımlanmalı.' },
];

const SUREC_ADIMLARI = [
  { adim: 'Arsa Değerleme', sure: 'Başlangıç', detail: 'SPK lisanslı eksper ile bağımsız değerleme; pazarlık tabanı oluşturur.' },
  { adim: 'Ön Protokol İmzası', sure: '1–2 hafta', detail: 'Pay oranı, proje özellikleri ve takvimi belirleyen bağlayıcı ön sözleşme.' },
  { adim: 'Hukuki İnceleme', sure: '1–2 hafta', detail: 'Gayrimenkul hukukçusu sözleşme maddelerini inceler ve düzeltmeler yapar.' },
  { adim: 'Noterde Tasdik', sure: '1 gün', detail: 'Kat karşılığı sözleşmesi noter onayı olmadan tapuya şerh edilemez.' },
  { adim: 'Tapu Şerhi', sure: '1–3 gün', detail: 'Müteahhidin hakkı tapu kütüğüne şerh edilir; arsa üçüncü kişiye satılamaz.' },
  { adim: 'İnşaat ve İskan', sure: '18–36 ay', detail: 'Ruhsatlı inşaat süreci; aşama teslim ve denetim hakları kullanılır.' },
  { adim: 'Tapu Devri', sure: 'Teslimde', detail: 'İskan onayı sonrası her bağımsız bölüm ilgili tarafın adına tescil edilir.' },
];

const RISKLER = [
  { risk: 'Müteahhit İflası', onlem: 'Banka teminat mektubu ve ipotek şerhini başlangıçta alın.' },
  { risk: 'Teslim Gecikmesi', onlem: 'Sözleşmeye aylık %0.1–%0.3 gecikme tazminatı ekleyin.' },
  { risk: 'Düşük Malzeme Kalitesi', onlem: 'Teknik şartnameyi bağımsız mühendisle denetletin.' },
  { risk: 'Ruhsatsız / Kaçak İnşaat', onlem: 'İnşaat ruhsatını kendiniz belediyeden teyit edin.' },
  { risk: 'Pay Anlaşmazlığı', onlem: 'Bağımsız bölümleri kat irtifakıyla sözleşmeden önce belirleyin.' },
  { risk: 'İskan Alınamaması', onlem: 'Sözleşmeye "iskan alınmazsa arsa bedeli nakden ödenecek" maddesi ekleyin.' },
];

const VERGILER = [
  { islem: 'Arsa Devri (Müteahhide)', vergi: 'Tapu harcı: %2 (arsa değeri üzerinden)' },
  { islem: 'Daire Teslimi (Arsa Sahibine)', vergi: 'KDV: %4 (150 m² altı konut) veya %20 (diğer)' },
  { islem: 'Müteahhit Satışları', vergi: 'Kurumlar vergisi veya gelir vergisi + KDV' },
  { islem: 'Arsa Sahibi Satışı (5 yıl içinde)', vergi: 'Değer artış kazancı vergisi (artan tarifeli, %15–%40)' },
];

export default function KatKarsiligiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> İnşaat Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kat Karşılığı İnşaat Sözleşmesi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Arsa sahibi olarak müteahhide arsanızı verip karşılığında daire almanın hukuki çerçevesi,
            pay oranları, sözleşme maddeleri ve riskler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%40–55</p>
              <p className="text-xs text-gray-400">Arsa sahibi pay aralığı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">8</p>
              <p className="text-xs text-gray-400">Zorunlu sözleşme maddesi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Noter</p>
              <p className="text-xs text-gray-400">Tasdik zorunlu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Pay Oranları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Konuma Göre Tipik Pay Oranları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Konum Tipi</th>
                    <th className="text-left px-4 py-3 font-black text-[#00C49F]">Arsa Sahibi</th>
                    <th className="text-left px-4 py-3 font-black text-blue-600">Müteahhit</th>
                    <th className="text-left px-4 py-3 font-black text-gray-500">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {PAY_ORANI.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.tip}</td>
                      <td className="px-4 py-3 font-bold text-[#00C49F]">{r.arsaSahibi}</td>
                      <td className="px-4 py-3 text-blue-600">{r.mutehit}</td>
                      <td className="px-4 py-3 text-gray-500 leading-relaxed">{r.not}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Zorunlu Sözleşme Maddeleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşmede Bulunması Zorunlu Maddeler</h2>
          <div className="space-y-3">
            {SOZLESME_MADDELERI.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{m.madde}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Süreç Adımları</h2>
          <div className="space-y-3">
            {SUREC_ADIMLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <FileText size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s.sure}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Önlemler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-rose-700">{r.risk}</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r.onlem}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Vergi Yükümlülükleri</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">İşlem</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Vergi / Yükümlülük</th>
                </tr>
              </thead>
              <tbody>
                {VERGILER.map((v, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{v.islem}</td>
                    <td className="px-4 py-3 text-gray-600">{v.vergi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kat karşılığı sözleşmesi noter huzurunda imzalanmalı ve tapu müdürlüğünde şerh ettirilmelidir. Şerh yapılmayan sözleşmeler üçüncü kişilere karşı geçersiz sayılır. Mutlaka gayrimenkul hukuku uzmanından destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyeti Hesaplayıcı' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu ve Alım Masrafları' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
