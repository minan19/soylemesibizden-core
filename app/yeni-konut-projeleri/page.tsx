import { Metadata } from 'next';
import Link from 'next/link';
import { Building, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yeni Konut Projeleri Rehberi 2024 | Proje Seçimi, Riskler, Sözleşme | Söylemesi Bizden',
  description:
    'Yeni konut projesi nasıl seçilir? Müteahhit güvenilirliği, teslim garantisi, ön satış riskleri ve sözleşme maddeleri rehberi.',
};

const PROJE_TIPLERI = [
  {
    tip: 'Konut Projesi (Toplu Konut)',
    aciklama: 'Çok sayıda bağımsız birimin tek proje kapsamında inşa edildiği yapılar. Ortak alanlar (havuz, spor alanı, güvenlik) paylaşılır.',
    avantaj: 'Sosyal donatı, güvenlik, peyzaj; çoğunlukla toplu satış avantajıyla daha rekabetçi fiyat.',
    dezavantaj: 'Aidat yüksek olabilir; komşu bağımlılığı; proje teslim gecikmesi riski.',
  },
  {
    tip: 'Rezidans / Karma Kullanım',
    aciklama: 'Alt katlarda ticaret/ofis, üst katlarda konut. Şehir merkezine yakın, yoğun hizmet sunumu.',
    avantaj: 'Merkezi konum, yüksek kira getirisi potansiyeli, prestij.',
    dezavantaj: 'Aidat çok yüksek; gürültü/trafik; yatırım amaçlı alımlar fiyatı şişirebilir.',
  },
  {
    tip: 'Villa / Müstakil Proje',
    aciklama: 'Ayrı parseller üzerinde bahçeli konutlar. Genellikle şehir çeperlerinde veya tatil bölgelerinde.',
    avantaj: 'Mahremiyet, bahçe, özelleştirme imkânı.',
    dezavantaj: 'Ulaşım ve altyapı bağımlılığı; bakım tamamiyle sahibine ait.',
  },
  {
    tip: 'Kat Karşılığı / Dönüşüm',
    aciklama: 'Müteahhidin arsa sahibine daire vererek inşa ettiği yapılar. Kent dönüşümü kapsamındaki projeler.',
    avantaj: 'Mevcut konumda yeni bina; proje dönemi anlaşmazlıkları daha az.',
    dezavantaj: 'Arsa sahibi müteahhit ilişkisi sorun yaratabilir; sosyal donatı sınırlı.',
  },
];

const MUTEAHHIT_KRITERLER = [
  { kriter: 'Geçmiş projeleri inceleyin', detay: 'Teslim ettiği projelerin kullanıcı yorumlarını araştırın; sosyal medya ve forum gruplarını takip edin.' },
  { kriter: 'Ticaret Sicili kaydı', detay: 'Şirketin ticaret sicilinde aktif olduğunu, sermayesinin yeterli olduğunu e-Devlet veya Ticaret Bakanlığı\'ndan doğrulayın.' },
  { kriter: 'Yapı ruhsatı ve izin durumu', detay: 'Proje için yapı ruhsatı alınmış mı? Belediyeden veya e-İmar üzerinden kontrol edin.' },
  { kriter: 'Banka kredisi kanalı', detay: 'Anlaşmalı banka varsa banka da projeyi denetlemiş demektir; bu güvence sağlar.' },
  { kriter: 'Teslim garantisi belgesi', detay: 'Bazı projeler tamamlama sigortası (tapu kredisi) sunar; bu belgeyi isteyin.' },
];

const SOZLESME_MADDELERI = [
  'Teslim tarihi (kesin tarih, cezai şart miktarıyla birlikte)',
  'Sözleşme konusu bağımsız bölümün tapu vaadi (noter onaylı olması tercih edilir)',
  'Ödeme planı ve cayma koşulları (geç teslimde alıcı fesih hakkı)',
  'Teknik şartname: kullanılacak malzeme markaları ve kalite standartları',
  'Ortak alan taahhütleri: havuz, otopark, peyzaj ve teslimat tarihleri',
  'Kaba inşaat ve ince işçilik ayrımı: teslim durumu (boyalı mı, mutfak dolabı dahil mi?)',
  'Isınma sistemi, asansör markası, pencere özellikleri açıkça belirtilmeli',
  'Gecikme tazminatı: günlük veya aylık oran olarak ifade edilmeli',
];

const RISKLER = [
  { risk: 'Teslim gecikmesi', azaltma: 'Sözleşmeye günlük cezai şart ekleyin; geç teslimde fesih hakkı tanıtın' },
  { risk: 'Teknik şartnameye uyumsuzluk', azaltma: 'Malzeme listesini noter tasdikli ekte şartname olarak imzalayın' },
  { risk: 'Müteahhit iflası', azantma: 'Tamamlama sigortası veya banka teminat mektubu isteyin' },
  { risk: 'Yapı ruhsatı iptal', azaltma: 'Ruhsatı belediyeden teyit edin; imar değişikliği riskini araştırın' },
  { risk: 'Ekspertiz değeri düşük çıkması', azaltma: 'Kredi onayı için önceden bir ekspertiz yaptırın' },
];

const VERGI_AVANTAJLARI = [
  'İlk kez ev alan ve 150 m² altı konut için KDV oranı %10 (2024)',
  'Konut kredisinde ödenen faizler belirli koşullarda vergi indirimine konu olabilir',
  'Yeni konut satın alındıktan 5 yıl sonra satışta değer artış kazancı vergisi muafiyet imkânı',
  'TOKİ projeleri: devlet destekli düşük faizli kredi seçeneği mevcut',
];

export default function YeniKonutProjeleriPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Yeni Konut Projeleri
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yeni Konut Projeleri Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Proje tiplerini anlayın, müteahhit güvenilirliğini değerlendirin, sözleşmeyi doğru imzalayın.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Tip</p>
              <p className="text-xs text-gray-400">Proje türü</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%10</p>
              <p className="text-xs text-gray-400">KDV (150 m² altı)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Cezai Şart</p>
              <p className="text-xs text-gray-400">Gecikme güvencesi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Proje Tipleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Proje Türleri</h2>
          <div className="space-y-4">
            {PROJE_TIPLERI.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{p.tip}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{p.aciklama}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF8] rounded-xl p-2">
                    <p className="text-[10px] font-black text-[#00C49F] mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{p.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-xl p-2">
                    <p className="text-[10px] font-black text-rose-600 mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] text-gray-700 leading-relaxed">{p.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Müteahhit */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Müteahhit Değerlendirme Kriterleri</h2>
          <div className="space-y-3">
            {MUTEAHHIT_KRITERLER.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.kriter}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Sözleşmede Olması Gerekenler
          </h2>
          <div className="space-y-2">
            {SOZLESME_MADDELERI.map((s, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Önlemler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex gap-3">
                <div>
                  <p className="text-xs font-black text-rose-600 mb-1">{r.risk}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r.azaltma ?? (r as Record<string, string>).azantma}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi Avantajları */}
        <section className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-6">
          <h2 className="text-sm font-black text-gray-900 mb-4">Vergi Avantajları</h2>
          <div className="space-y-2">
            {VERGI_AVANTAJLARI.map((v, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Ön satış aşamasındaki projelerde teslim öncesi tüm ödeme yapılmamasını öneririz. Mümkünse ödemeleri inşaat aşamalarına bağlayın; aksi halde müteahhit iflasında hukuki süreç uzun ve meşakkatli olabilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yeni-projeler', label: 'Yeni Projeler' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvurusu' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
