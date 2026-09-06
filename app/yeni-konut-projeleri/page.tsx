import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yeni Konut Projeleri 2024-2025 | Sıfır Konut Rehberi | Söylemesi Bizden',
  description:
    'Yeni konut projeleri nasıl değerlendirilir? Ön ödemeli konut, proje aşamasında satın alma, teslim güvencesi ve yasal haklar rehberi.',
};

const PROJE_ASAMALARI = [
  { asama: 'Arazi Edinimleri / Ruhsat Öncesi', risk: 'Çok Yüksek', aciklama: 'Proje henüz ruhsat almamıştır; iptal veya değişiklik riski yüksektir. Bu aşamada satış yasal kısıtlara tabidir.' },
  { asama: 'Ön Proje (Ruhsat Alındı)', risk: 'Yüksek', aciklama: 'Ruhsat var ama inşaat başlamamış. Kısa vadeli kâr beklentisi en yüksek; gecikme riski de en yüksek aşama.' },
  { asama: 'İnşaat Devam Ediyor (%50)', risk: 'Orta', aciklama: 'Temel atılmış, yapı yükseliyor. Müteahhit durumu gözlemlenebilir; ödeme planı fiyat avantajı sunabilir.' },
  { asama: 'Kaba İnşaat Tamamlandı', risk: 'Düşük', aciklama: 'Yapısal riskler büyük ölçüde ortadan kalktı; ince işler devam ediyor. Fiyat avantajı azalmaya başlar.' },
  { asama: 'İskan Alındı / Teslime Hazır', risk: 'Çok Düşük', aciklama: 'Mülk hazır, tapu verilebilir. Piyasa fiyatına yakın veya üzerinde işlem görür.' },
];

const ONODEME_HAKLARI = [
  { hak: '24 Aylık Teslim Garantisi', aciklama: 'Tüketici Koruma Kanunu (6502) kapsamındaki ön ödemeli konut satışlarında müteahhit 24 ay içinde teslim etmek zorundadır.' },
  { hak: 'Noterde Sözleşme', aciklama: 'Ön ödemeli konut satış sözleşmesi noter huzurunda yapılmak zorundadır; bu zorunluluk alıcıyı korur.' },
  { hak: 'Teslim Edilmezse Faizli İade', aciklama: 'Müteahhit teslim etmezse ödenen bedel yasal faizi ile birlikte iade edilir; tazminat da talep edilebilir.' },
  { hak: 'Cayma Hakkı (14 Gün)', aciklama: 'İmza tarihinden itibaren 14 gün içinde herhangi bir gerekçe göstermeksizin sözleşmeden cayabilirsiniz.' },
  { hak: 'Banka Güvencesi', aciklama: 'Müteahhit, alınan bedellerin banka güvencesine alındığını belgeleyen belgeyi alıcıya sunmak zorundadır.' },
];

const MUTTEAHHIT_ARASTIRMA = [
  { kriter: 'Önceki Projeler', aciklama: 'Tamamlanmış projeleri ziyaret edin; teslim süresi, kalite ve sakin memnuniyetini değerlendirin.' },
  { kriter: 'Mali Durum', aciklama: 'Müteahhitin borç yapısını, kredi notunu ve bankacılık ilişkilerini araştırın; iflasa yakın firmalardan kaçının.' },
  { kriter: 'Ruhsat ve Yapı Denetim', aciklama: 'Projenin yapı denetim firması ve belediye izinlerinin gerçekten alınıp alınmadığını Yapı Denetim Sisteminden (YDS) kontrol edin.' },
  { kriter: 'Tapu Durumu', aciklama: 'Arsanın ipotekli veya haczedilmiş olmadığını tapu müdürlüğünden veya e-Devlet\'ten sorgulayın.' },
  { kriter: 'Kat İrtifakı', aciklama: 'Projenin kat irtifakı kurulmuş olması, dairenin bağımsız bölüm olarak tescilini kolaylaştırır.' },
];

const TESLIM_KONTROL = [
  'Proje vaatlerine (metrekare, cephe, daire planı) uygunluk',
  'Isı yalıtımı ve ses yalıtımı standartları',
  'Mekanik-elektrik (su/elektrik/gaz) bağlantıları',
  'Ortak alan teslimi (otopark, asansör, yeşil alan)',
  'İskan belgesi alınmış olması',
  'Tapu kat mülkiyetine dönüşümün tamamlanması',
];

export default function YeniKonutProjeleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Yeni Konut
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yeni Konut Projeleri Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Proje aşaması riskler, ön ödemeli konut hakları, müteahhit araştırması ve teslim kontrol listesi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">24 Ay</p>
              <p className="text-xs text-gray-400">Teslim garantisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">14 Gün</p>
              <p className="text-xs text-gray-400">Cayma hakkı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">5 Aşama</p>
              <p className="text-xs text-gray-400">İnşaat riski</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Proje Aşamaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Proje Aşaması ve Risk Seviyesi</h2>
          <div className="space-y-3">
            {PROJE_ASAMALARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{a.asama}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded shrink-0 ${a.risk === 'Çok Yüksek' ? 'bg-rose-100 text-rose-600' : a.risk === 'Yüksek' ? 'bg-orange-50 text-orange-500' : a.risk === 'Orta' ? 'bg-amber-50 text-amber-600' : a.risk === 'Düşük' ? 'bg-blue-50 text-blue-600' : 'bg-[#F0FDF8] text-[#00C49F]'}`}>
                    {a.risk} Risk
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ön Ödemeli Konut Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Ön Ödemeli Konut Hakları (6502 TKK)
          </h2>
          <div className="space-y-2">
            {ONODEME_HAKLARI.map((h, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{h.hak}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{h.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Müteahhit Araştırması */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Müteahhit Araştırma Kriterleri</h2>
          <div className="space-y-3">
            {MUTTEAHHIT_ARASTIRMA.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{m.kriter}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teslim Kontrol */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Teslim Kontrol Listesi</h2>
          <div className="space-y-2">
            {TESLIM_KONTROL.map((t, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0" />
                <p className="text-xs text-gray-700">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Proje aşamasında satın alma yüksek getiri potansiyeli taşısa da müteahhit riski yüksektir. Sözleşmeyi imzalamadan önce bir gayrimenkul avukatına incelettirin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ilk-ev-alma-rehberi', label: 'İlk Ev Alma Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/kooperatif-konut-rehberi', label: 'Kooperatif Konut Rehberi' },
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyet Hesaplayıcı' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
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
