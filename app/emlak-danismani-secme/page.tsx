import { Metadata } from 'next';
import Link from 'next/link';
import { Users, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Emlak Danışmanı Nasıl Seçilir? 2024 | Komisyon, Sertifika, Sorular | Söylemesi Bizden',
  description:
    'Güvenilir emlak danışmanı seçme rehberi: sertifikasyon, komisyon oranları, sözleşme koşulları ve danışmana sorulacak sorular.',
};

const SECIM_KRITERLERI = [
  {
    kriter: 'SPK ve TSKB Lisansı',
    aciklama: 'Türkiye\'de gayrimenkul danışmanlığı için mesleki yeterlilik belgesi (Seviye 5) zorunludur. Danışmanın sahip olduğu lisansı belgesiyle doğrulayın.',
  },
  {
    kriter: 'Yerel Piyasa Deneyimi',
    aciklama: 'Hedeflediğiniz bölgede en az 2–3 yıl aktif satış geçmişi olan danışmanlar, anlık piyasa verilerine hakim olur.',
  },
  {
    kriter: 'Son 6 Aydaki Satış Sicili',
    aciklama: 'Kaç adet satış kapattı? Ortalama pazarda kalma süresi nedir? Bu veriler talep etme hakkınızdır.',
  },
  {
    kriter: 'Referans ve Değerlendirmeler',
    aciklama: 'Google ve emlak platformlarındaki yorumları inceleyin; gerekirse önceki müşterilerle doğrudan iletişim kurun.',
  },
  {
    kriter: 'Temsil Anlaşmazlığı',
    aciklama: 'Danışmanın hem alıcıyı hem satıcıyı temsil ettiği "çift temsilcilik" çıkar çatışması yaratır. Bunu baştan netleştirin.',
  },
  {
    kriter: 'İletişim ve Yanıt Süresi',
    aciklama: 'İlk temas sırasında yanıt hızını gözlemleyin. 24 saati aşan yanıt süreleri ilerleyen süreçte sorun işareti olabilir.',
  },
];

const KOMISYON_BILGISI = [
  { durum: 'Satıcı danışmanı', oran: '%2 + KDV', aciklama: 'Satış fiyatı üzerinden; sözleşmeyle değişebilir' },
  { durum: 'Alıcı danışmanı', oran: '%2 + KDV', aciklama: 'Alıcı ödüyor; bazı anlaşmalarda satıcı karşılar' },
  { durum: 'Kiralık işlem', oran: '1 aylık kira + KDV', aciklama: 'Piyasa standardı; müzakere edilebilir' },
  { durum: 'Kurumsal / Ofis kirası', oran: '%8–12 (yıllık)', aciklama: 'Yüksek tutarlı uzun vadeli kiralarda değişir' },
];

const SORULAR_DANISMANAT = [
  'Bu bölgede son 6 ayda kaç satış kapattınız?',
  'Komisyon oranı ve ödemesi sözleşmede nasıl düzenleniyor?',
  'Hem alıcı hem satıcıyı temsil ediyor musunuz (çift temsilcilik)?',
  'Mülk için fiyat belirleme yönteminiz nedir (emsal analizi)?',
  'Haberdar olmam gereken gizli ücret ya da masraf var mı?',
  'Süreç boyunca iletişim kanalı ve sıklığı nasıl olacak?',
  'Referans müşteri ismi verebilir misiniz?',
];

const SOZLESME_MADDELERI = [
  'Yetki süresi: kaç aya kadar geçerli olduğu belirtilmeli',
  'Komisyon tutarı veya oranı ve ödeme zamanı',
  'Özel yetki mi, çoklu yetki mi? (Tek acentelik en yüksek motivasyonu sağlar)',
  'Fesih koşulları: sözleşmeyi sonlandırmak için hangi bildirim süresi?',
  'Fotoğraf, ilan yayını ve pazarlama giderlerinin kimin üstlendiği',
  'Sözleşme bitmeden müşteri bulunursa komisyon durumu',
];

const KIRMIZI_BAYRAK = [
  'Belge göstermeksizin çok düşük veya %0 komisyon vaat eden danışman',
  'Emsal araştırması yapmaksızın fiyat belirleyen',
  'Mülkünüzü her teklif için ısrarla aşağı fiyatlamaya zorlayan',
  'İletişimi kopuk; randevulara geç gelen',
  'Sözleşmeyi okumadan imzalatmaya çalışan',
  'Referans vermekten kaçınan',
];

export default function EmlakDanismanitSecmePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Danışman Seçme Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Emlak Danışmanı Nasıl Seçilir? 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Sertifikasyon, komisyon şeffaflığı, sözleşme koşulları ve kırmızı bayraklar ile doğru danışmanı bulun.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6</p>
              <p className="text-xs text-gray-400">Seçim kriteri</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%2+KDV</p>
              <p className="text-xs text-gray-400">Standart komisyon</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">7 Soru</p>
              <p className="text-xs text-gray-400">Danışmana sorulacak</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Seçim Kriterleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Seçim Kriterleri</h2>
          <div className="space-y-3">
            {SECIM_KRITERLERI.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{k.kriter}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Komisyon */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Komisyon Oranları</h2>
          <div className="space-y-2">
            {KOMISYON_BILGISI.map((k, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{k.durum}</p>
                <p className="text-xs font-black text-[#00C49F]">{k.oran}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sorular */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Danışmana Sorulacak 7 Soru
          </h2>
          <div className="space-y-2">
            {SORULAR_DANISMANAT.map((s, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded-full bg-[#00C49F]/10 text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-xs text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yetki Sözleşmesinde Olması Gerekenler</h2>
          <div className="space-y-2">
            {SOZLESME_MADDELERI.map((s, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kırmızı Bayraklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kırmızı Bayraklar</h2>
          <div className="space-y-3">
            {KIRMIZI_BAYRAK.map((k, i) => (
              <div key={i} className="flex items-start gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4">
                <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                <p className="text-xs text-rose-700 leading-relaxed">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Yetki sözleşmesi imzalamadan önce tüm maddeleri dikkatlice okuyun. Özellikle fesih koşullarını ve komisyonun ne zaman ödeneceğini netleştirin. Danışmanın lisansını ilgili mesleki kuruluştan doğrulayabilirsiniz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/emlak-komisyonu', label: 'Emlak Komisyonu Hesaplayıcı' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/gayrimenkul-komisyoncusu', label: 'Gayrimenkul Komisyoncusu Rehberi' },
              { href: '/satilik-ev-hazirlik', label: 'Satılık Ev Hazırlık' },
              { href: '/fiyat-trendi', label: 'Piyasa Fiyat Trendi' },
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
