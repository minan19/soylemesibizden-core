import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, CheckCircle, AlertTriangle, ArrowRight, Building2, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Şehir Planlama ve İmar Mevzuatı Rehberi | Ruhsat, Nazım İmar | Söylemesi Bizden',
  description:
    'İmar planı türleri, yapı ruhsatı süreci, TAKS-KAKS parametreleri, yapı denetimi ve yapı kullanma izni rehberi.',
};

const PLAN_TURLERI = [
  { tur: 'Mekânsal Strateji Planı', olcek: '1/500.000 – 1/100.000', aciklama: 'Bölgesel gelişme politikalarını belirler; Çevre, Şehircilik ve İklim Değişikliği Bakanlığı hazırlar.' },
  { tur: 'Çevre Düzeni Planı', olcek: '1/25.000 – 1/100.000', aciklama: 'Arazi kullanım kararlarını (tarım, orman, konut, sanayi, turizm) belirler.' },
  { tur: 'Nazım İmar Planı', olcek: '1/5.000', aciklama: 'Genel arazi kullanımı, yoğunluk, ulaşım kararları; büyükşehirlerde büyükşehir belediyesi hazırlar.' },
  { tur: 'Uygulama İmar Planı', olcek: '1/1.000', aciklama: 'Yapılaşma koşullarını parsel bazında belirler; ilçe belediyeleri hazırlar. En sık başvurulan plan türüdür.' },
];

const TAKS_KAKS = [
  { parametre: 'TAKS (Taban Alanı Katsayısı)', aciklama: 'Yapının taban alanının parsel alanına oranı. TAKS: 0.40 = parselin %40\'ı taban.' },
  { parametre: 'KAKS / Emsal', aciklama: 'Toplam inşaat alanının parsel alanına oranı. Emsal: 2.00 = parselin 2 katı kadar inşaat.' },
  { parametre: 'Bina Yüksekliği', aciklama: 'Kat sayısı veya metre olarak belirlenir; nazım planda belirlenen yoğunluğa bağlı.' },
  { parametre: 'Çekme Mesafesi', aciklama: 'Yapının komşu parsellere ve yola olan minimum uzaklığı; gölge ve yangın erişimi için önemli.' },
  { parametre: 'Ön Bahçe Mesafesi', aciklama: 'Yapının yola en yakın noktası ile parsel ön sınırı arasındaki mesafe.' },
];

const RUHSAT_SURECI = [
  { adim: 'Zemin Etüdü', sure: '1–2 hafta', detay: 'Mühendis raporuyla zemin ve sismik özellikler belirlenir; projenin temel sistemi buraya göre tasarlanır.' },
  { adim: 'Mimari Proje Onayı', sure: '2–4 hafta', detay: 'Mimar tarafından hazırlanan proje, belediye teknik birimine sunulur; imar koşullarına uygunluk kontrolü.' },
  { adim: 'Yapı Denetim Firması Seçimi', sure: '1 hafta', detay: 'Lisanslı yapı denetim firması belirlenir; sözleşme yapılır ve sisteme girilir (4708 sayılı Kanun).' },
  { adim: 'Yapı Ruhsatı Alımı', sure: '1–3 ay', detay: 'Tüm belgelerle belediyeye başvuru; harç ödemesi sonrası ruhsat düzenlenir.' },
  { adim: 'İnşaat Aşaması Denetimleri', sure: 'İnşaat süresince', detay: 'Yapı denetim firması temel, kaba ve ince inşaat aşamalarını denetler; tutanaklar tutulur.' },
  { adim: 'Yapı Kullanma İzni (İskan)', sure: '1–3 ay', detay: 'İnşaat tamamlandığında belediye yerinde inceleme yapar; yangın ve elektrik uygunluk raporları gerekir.' },
];

const KAÇAK_YAPI = [
  { sorun: 'İskan Alınamaması', sonuc: 'Satış güçleşir; DASK ve konut sigortası kapsamı kısıtlanır.' },
  { sorun: 'Deprem Riski', sonuc: 'Kaçak yapılar mühendislik hesabı yapılmadan inşa edilir; yapısal güvenlik riski yüksek.' },
  { sorun: 'Yıkım Kararı', sonuc: 'Belediye veya mahkeme kararıyla yıkım uygulanabilir; tazminat hakkı sınırlı.' },
  { sorun: 'Tapu Devrinde Şerh', sonuc: 'Kaçak ek veya kat bilgisi tapuya şerh düşer; alıcılar sınırlı ilgi gösterir.' },
];

const IMAR_DEGISIKLIK = [
  { yol: 'Plan Tadilat Başvurusu', kimler: 'Maliki veya vekilden belediyeye başvuru', sure: '6–18 ay', not: 'Belediye meclis kararı gerektirir; teknik değerlendirme ve itiraz süreci var.' },
  { yol: 'İmar Barışı', kimler: 'Belirli tarihe kadar kaçak yapılar', sure: 'Dönemsel', not: 'Hükümet dönemsel imar affı uygulaması çıkardığında 3.000 TL başvuru bedeli ile yapı kayıt belgesi.' },
  { yol: 'Kentsel Dönüşüm', kimler: 'Riskli yapı tespiti', sure: '2–5 yıl', not: 'Riskli alan kararıyla imar artışı sağlanabilir; yeni koşullar belediye ve bakanlık koordinasyonuyla belirlenir.' },
];

export default function SehirPlanlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Planlama Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Şehir Planlama ve İmar Mevzuatı
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İmar planı türleri, TAKS-KAKS parametreleri, yapı ruhsatı alma süreci
            ve kaçak yapı riskleri rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1/1.000</p>
              <p className="text-xs text-gray-400">Uygulama imar planı ölçeği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">4</p>
              <p className="text-xs text-gray-400">Plan türü hiyerarşisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6 Adım</p>
              <p className="text-xs text-gray-400">Ruhsat alma süreci</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Plan Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İmar Planı Türleri ve Hiyerarşisi</h2>
          <div className="space-y-3">
            {PLAN_TURLERI.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{p.olcek}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{p.tur}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{p.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TAKS / KAKS */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İmar Parametreleri: TAKS, KAKS, Emsal</h2>
          <div className="space-y-3">
            {TAKS_KAKS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Building2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{t.parametre}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ruhsat Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yapı Ruhsatı Alma Süreci</h2>
          <div className="space-y-3">
            {RUHSAT_SURECI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s.sure}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kaçak Yapı Riskleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kaçak ve İskansız Yapı Riskleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {KAÇAK_YAPI.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-2">
                  <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-rose-700">{r.sorun}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.sonuc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İmar Değişikliği Yolları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İmar Durumu Değiştirme Yolları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Yol</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Kimler</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Süre</th>
                    <th className="text-left px-4 py-3 font-black text-gray-500">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {IMAR_DEGISIKLIK.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.yol}</td>
                      <td className="px-4 py-3 text-gray-600">{r.kimler}</td>
                      <td className="px-4 py-3 text-gray-600">{r.sure}</td>
                      <td className="px-4 py-3 text-gray-500 leading-relaxed">{r.not}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Mülk Alımında İmar Kontrol Listesi
          </h2>
          <ul className="space-y-2.5">
            {[
              'Belediyeden güncel imar durumu belgesi (takyidat belgesi) isteyin.',
              'Uygulama imar planında yapılaşma koşullarını (TAKS/KAKS/yükseklik) inceleyin.',
              'Tapu kaydında kaçak ek bilgisi olup olmadığını kontrol edin.',
              'İskan belgesini satın almadan önce teyit edin.',
              'Plan değişikliği yapılmış bölgelerde kesinleşme tarihini sorun.',
              'Bölgede nazım imar planı revizyonu gündemde mi, belediyeden araştırın.',
            ].map((m, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600 leading-relaxed">{m}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Hatırlatma:</span> İmar bilgileri belediyeden alınmış güncel belgelerle doğrulanmalıdır. Gayrimenkul alımında satıcının beyanına güvenmek yeterli değildir; resmi belgeler zorunludur.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Sözleşmesi' },
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
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
