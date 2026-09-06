import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kooperatif Konut Rehberi 2024 | Nasıl Üye Olunur, Avantajlar | Söylemesi Bizden',
  description:
    'Kooperatif konut nedir, nasıl üye olunur? Avantajlar, riskler, ödeme planı ve kooperatif ile müteahhit farkı hakkında kapsamlı rehber.',
};

const NASIL_CALISIR = [
  { adim: 'Kooperatif Kurulur veya Mevcut Birine Üye Olunur', aciklama: 'Birden fazla kişi bir araya gelerek konut yapı kooperatifi kurabilir ya da mevcut kooperatifte boş hisse bularak üye olabilirsiniz.' },
  { adim: 'Arsa Satın Alınır', aciklama: 'Üyelerin aidat veya öz kaynaklarıyla arsa satın alınır; bazı kooperatifler arsa sahibinin katılımıyla da kurulur.' },
  { adim: 'Proje Hazırlanır ve İnşaat İzni Alınır', aciklama: 'Mimar ve mühendis tutulur, belediyeden inşaat ruhsatı alınır. Teknik şartname ortaklar kurulunda onaylanır.' },
  { adim: 'İnşaat Başlar', aciklama: 'Üyelerden periyodik ödeme toplanır; müteahhit veya kooperatif kendi yönetiminde inşaat yürütür.' },
  { adim: 'İskan ve Tapu Tescili', aciklama: 'İnşaat bitince iskan alınır; her üyenin payına düşen bağımsız bölüm belirlenir ve tapu devri yapılır.' },
];

const AVANTAJLAR = [
  { avantaj: 'Maliyetin Altında Konut', aciklama: 'Müteahhit karı yoktur; genellikle piyasanın %20–30 altında maliyet oluşur.' },
  { avantaj: 'Kalite Kontrolü', aciklama: 'Üyeler bina özelliklerini ve malzeme seçimlerini doğrudan yönetir.' },
  { avantaj: 'Ödeme Esnekliği', aciklama: 'İnşaat sürecinde aşamalı ödeme imkânı tanınır; sıfır faiz ile taksit yapılabilir.' },
  { avantaj: 'Vergi Avantajları', aciklama: 'Kooperatifler kurumlar vergisinden muaf olabilir; bu maliyet düşüşüne yansır.' },
  { avantaj: 'Şeffaflık', aciklama: 'Muhasebe ve bütçe ortaklar kuruluna açık tutulur; hesap verilebilirlik yüksektir.' },
];

const RISKLER = [
  { risk: 'Yönetim Kalitesi', aciklama: 'Deneyimsiz yönetim kurulu proje gecikmesine veya bütçe aşımına neden olabilir.' },
  { risk: 'Arsa Bulma Zorluğu', aciklama: 'Büyük şehirlerde uygun fiyatlı ve imarlı arsa bulmak giderek zorlaşmaktadır.' },
  { risk: 'Finansman Riski', aciklama: 'Üyelerin ödeme geciktiği durumda inşaat yavaşlayabilir veya durabileceği gibi borcunu ödeyemeyene icra uygulanabilir.' },
  { risk: 'Tapu Gecikmeleri', aciklama: 'Ortaklar arasındaki anlaşmazlıklar veya teknik sorunlar tapu işlemlerini uzatabilir.' },
  { risk: 'Üye Çekilmesi', aciklama: 'Üye ayrılması projeyi sekteye uğratabilir; yerini dolduracak yeni üye bulmak zorlaşabilir.' },
];

const KOOPERATIF_VS_MUTTEAHHIT = [
  { kriter: 'Maliyet', kooperatif: 'Piyasanın %20–30 altında', mutteahhit: 'Piyasa fiyatı + müteahhit karı' },
  { kriter: 'Kalite Kontrolü', kooperatif: 'Üyeler doğrudan denetler', mutteahhit: 'Sözleşme ile sınırlı' },
  { kriter: 'Risk', kooperatif: 'Yönetim ve finansman riski', mutteahhit: 'İflas/teslim etmeme riski' },
  { kriter: 'Süre', kooperatif: 'Daha uzun (3–7 yıl)', mutteahhit: 'Genellikle 1–3 yıl' },
  { kriter: 'Esneklik', kooperatif: 'Yüksek (daire planı, malzeme)', mutteahhit: 'Düşük (standart proje)' },
];

export default function KooperatifKonutRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Kooperatif Konut
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kooperatif Konut Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kooperatif konut nedir, nasıl üye olunur? Müteahhitle farkı, avantajlar, riskler ve süreç.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%20–30</p>
              <p className="text-xs text-gray-400">Maliyet avantajı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Adım</p>
              <p className="text-xs text-gray-400">Konut süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Muaf</p>
              <p className="text-xs text-gray-400">Kurumlar vergisi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Nasıl Çalışır */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kooperatif Konut Nasıl Çalışır?</h2>
          <div className="space-y-3">
            {NASIL_CALISIR.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{a.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Avantajlar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Avantajlar
          </h2>
          <div className="space-y-2">
            {AVANTAJLAR.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{a.avantaj}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{r.risk}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Karşılaştırma */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Kooperatif vs Müteahhit Karşılaştırması</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kriter</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Kooperatif</th>
                <th className="text-center py-2 font-black text-gray-500">Müteahhit</th>
              </tr>
            </thead>
            <tbody>
              {KOOPERATIF_VS_MUTTEAHHIT.map((k, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-bold text-gray-700">{k.kriter}</td>
                  <td className="py-2 text-center text-[#00C49F] font-bold">{k.kooperatif}</td>
                  <td className="py-2 text-center text-gray-600">{k.mutteahhit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kooperatife üye olmadan önce kooperatif tüzüğünü, finansal tablolarını ve yönetim kurulu geçmişini araştırın. Bir muhasebeci veya avukattan görüş alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yeni-konut-projeleri', label: 'Yeni Konut Projeleri' },
              { href: '/ilk-ev-alma-rehberi', label: 'İlk Ev Alma Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/yatirim-butce-hesaplayici', label: 'Yatırım Bütçe Hesaplayıcı' },
              { href: '/konut-deger-tahmini', label: 'Konut Değer Tahmini' },
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyet Hesaplayıcı' },
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
