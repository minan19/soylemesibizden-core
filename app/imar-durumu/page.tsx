import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'İmar Durumu Rehberi | İmar Planı, TAKS/KAKS, Ruhsat | Söylemesi Bizden',
  description:
    'İmar durumu nedir, nasıl sorgulanır? İmar planı türleri, TAKS/KAKS hesabı, inşaat ruhsatı süreci ve imarsız arazi riskleri.',
};

const IMAR_PLAN_TURLERI = [
  {
    tip: 'Çevre Düzeni Planı',
    olcek: '1/100.000 – 1/25.000',
    aciklama: 'Bölgesel arazi kullanım kararları. Doğal sit, orman, tarım arazisi sınırlarını belirler.',
    yetkili: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı',
  },
  {
    tip: 'Nazım İmar Planı',
    olcek: '1/5.000',
    aciklama: 'Kentsel kullanım kararları; konut, ticaret, sanayi, yeşil alan zonları.',
    yetkili: 'Büyükşehir Belediyesi veya İl Özel İdaresi',
  },
  {
    tip: 'Uygulama İmar Planı',
    olcek: '1/1.000',
    aciklama: 'Parsel bazında yapılaşma koşulları; TAKS, KAKS, yükseklik, çekme mesafesi.',
    yetkili: 'İlçe Belediyesi',
  },
  {
    tip: 'Parselasyon Planı',
    olcek: '1/500 – 1/200',
    aciklama: 'Arazi düzenlemesi (18. madde); yollar, parklar ve yapı parselleri kesinleşir.',
    yetkili: 'İlçe Belediyesi / Kadastro Müdürlüğü',
  },
];

const TAKS_KAKS = [
  { terim: 'TAKS', acikAdi: 'Taban Alanı Kat Sayısı', tanim: 'Yapının taban alanının parsel alanına oranı. Örn. 0.30 = parselin %30\'unu kaplayan taban.' },
  { terim: 'KAKS (E)', acikAdi: 'Kat Alanı Kat Sayısı / Emsal', tanim: 'Toplam inşaat alanının parsel alanına oranı. Örn. 1.50 = 500 m² parselde 750 m² inşaat.' },
  { terim: 'Yapı Yüksekliği', acikAdi: 'H (metre)', tanim: 'Binanın zeminden en yüksek noktalara kadar izin verilen yükseklik.' },
  { terim: 'Ön Bahçe', acikAdi: 'Çekme Mesafesi', tanim: 'Yapı cephesinin yol veya komşu sınırından en az uzaklaşması gereken mesafe.' },
  { terim: 'Kat Adedi', acikAdi: 'Maksimum Kat', tanim: 'İzin verilen maksimum kat sayısı; KAKS ve yükseklikle birlikte değerlendirilir.' },
];

const SORGULAMA_YOLLARI = [
  { yol: 'Belediye İmar Müdürlüğü', detay: 'Tapu bilgileriyle şahsen başvuru. İmar durumu belgesi 1–5 iş günü içinde düzenlenir.' },
  { yol: 'e-Belediye Portali', detay: 'Birçok büyükşehir parseli CBS üzerinden online sorgulatır. Ada/parsel numarası gereklidir.' },
  { yol: 'TAKBİS / TKGM', detay: 'Kadastro ve tapu sicil bilgilerine erişim. Şerhler ve kısıtlamalar görüntülenebilir.' },
  { yol: 'imar.gov.tr', detay: 'Bakanlığın imar planı portalı; bazı il ve ilçelerde güncel plan katmanları görüntülenebilir.' },
];

const RUHSAT_SURECI = [
  { adim: 'Proje Hazırlığı', detay: 'Mimar + mühendis (statik, elektrik, mekanik). Projeler belediye şartlarına uygun.' },
  { adim: 'Belge Teslimi', detay: 'Tapu, imar durumu, zemin etüdü, mimarı proje takımı, müteahhit belgesi.' },
  { adim: 'Ruhsat Başvurusu', detay: 'İlçe belediyesine başvuru; 30 iş günü içinde sonuç.' },
  { adim: 'Yapı Denetim Firması', detay: 'Yapı denetim firması seçilir; inşaat boyunca denetim yapar.' },
  { adim: 'Temel Vizesi', detay: 'Temel atılmadan önce müteahhit ve yapı denetim firması vizeleri.' },
  { adim: 'İskan (Yapı Kullanma İzni)', detay: 'İnşaat tamamlandığında belediye vizesi; iskansız yapı satışta sorun yaratır.' },
];

const IMARSIZ_RISKLER = [
  { risk: 'İmarsız Arazi Alımı', sonuc: 'Yapı izni çıkmaz; yatırım değer kaybeder ve satışı güçleşir.' },
  { risk: 'Kaçak Yapı', sonuc: 'Yıkım kararı, para cezası, iskansız satış engeli.' },
  { risk: 'İmar Planı Değişikliği', sonuc: 'Planlama değişikliğiyle yapılaşma hakkı kısıtlanabilir veya artabilir.' },
  { risk: 'Sit Alanı Şerhi', sonuc: 'Kültür Varlıkları Kanunu kapsamında tamirat/yıkım kısıtlaması.' },
  { risk: 'Kamulaştırma Riski', sonuc: 'Yol, park, okul rezerv alanında kalan parselde inşaat yapılamaz; bedel tazminat.' },
];

export default function ImarDurumuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> İmar Durumu Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            İmar Durumu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İmar planı türleri, TAKS/KAKS hesabı, sorgulama yöntemleri, inşaat ruhsatı süreci ve imarsız arazi riskleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1/1K</p>
              <p className="text-xs text-gray-400">Uygulama imar ölçeği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">30 Gün</p>
              <p className="text-xs text-gray-400">Ruhsat yanıt süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TAKS</p>
              <p className="text-xs text-gray-400">Taban alanı katsayısı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Plan Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İmar Planı Türleri</h2>
          <div className="space-y-4">
            {IMAR_PLAN_TURLERI.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{p.tip}</p>
                  <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded-full">{p.olcek}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{p.aciklama}</p>
                <p className="text-[10px] text-gray-400"><span className="font-bold">Yetkili:</span> {p.yetkili}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TAKS/KAKS */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">TAKS, KAKS ve Yapılaşma Parametreleri</h2>
          <div className="space-y-3">
            {TAKS_KAKS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0 min-w-[48px] text-center">{t.terim}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{t.acikAdi}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.tanim}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sorgulama */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İmar Durumu Sorgulama Yöntemleri</h2>
          <div className="space-y-3">
            {SORGULAMA_YOLLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.yol}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ruhsat Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İnşaat Ruhsatı Süreci</h2>
          <div className="space-y-3">
            {RUHSAT_SURECI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" /> İmar Riskleri
          </h2>
          <div className="space-y-3">
            {IMARSIZ_RISKLER.map((r, i) => (
              <div key={i} className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{r.risk}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.sonuc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alıcı Kontrol */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Alım Öncesi İmar Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {[
              'İmar durumu belgesi (belediyeden resmi)',
              'TAKS ve KAKS değerleri hesaplanarak potansiyel inşaat alanı belirlenmeli',
              'Parsel kadastro değeri ile imar planı uyumu kontrol edilmeli',
              'Kamulaştırma ve yol genişletme planlarına bakılmalı',
              'Sit alanı, orman sınırı ve enerji koridoru şerhleri sorgulanmalı',
              'Mevcut yapı iskanlı mı? İskan olmadan banka kredisi zor',
              'İmar planı son değişiklik tarihi ve askı süresi kontrol edilmeli',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> İmar bilgisi sözlü beyana değil, belediyeden alınan yazılı imar durumu belgesine dayanmalıdır. Planlar değişebilir; satış öncesi güncel durumu mutlaka teyit edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/sehir-planlama', label: 'Şehir Planlama ve İmar' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
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
