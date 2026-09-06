import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Vergi Optimizasyonu Rehberi 2024 | Yasal İndirim Yolları | Söylemesi Bizden',
  description:
    'Gayrimenkul alım-satım ve kira gelirinde yasal vergi avantajları: değer artış kazancı muafiyeti, götürü gider, enflasyon indekslemesi ve TOKÎ istisnalar.',
};

const DEGER_ARTIS_KAZANCI = [
  {
    durum: '5 Yıl Muafiyeti',
    aciklama: '1 Ocak 2022\'den önce edinilen konutlar için 5 yıl sonra satılan mülklerden elde edilen değer artış kazancı vergi dışıdır.',
  },
  {
    durum: 'Enflasyon Düzeltmesi',
    aciklama: 'Alış maliyeti, elde tutma süresindeki ÜFE/TÜFE artışı oranında artırılabilir; bu, matrahı önemli ölçüde düşürür.',
  },
  {
    durum: '2024 İstisna Tutarı',
    aciklama: 'Yıllık 87.000 ₺\'ye kadar değer artış kazancı vergiden müstesnadır (her yıl güncellenir).',
  },
  {
    durum: 'Gider Mahsubu',
    aciklama: 'Alım masrafları (tapu harcı, emlakçı, noter), tadilat ve iyileştirme harcamaları matrahtan indirilebilir.',
  },
];

const KIRA_GELIRI_OPTIMIZASYON = [
  {
    yontem: 'Götürü Gider Yöntemi',
    aciklama: 'Net kira gelirinin %15\'i herhangi bir belge aranmaksızın gider olarak indirilebilir. Giderlerin düşük olduğu durumlarda avantajlı.',
  },
  {
    yontem: 'Gerçek Gider Yöntemi',
    aciklama: 'Aidat, sigorta, vergi, bakım-onarım, kredi faizi gibi gerçek giderler belgeli olarak matrahtan düşülür. Yüksek giderli mülklerde tercih edilmeli.',
  },
  {
    yontem: 'Konut Kira İstisnası',
    aciklama: '2024\'te 33.000 ₺\'ye kadar konut kira geliri beyan dışıdır. Eşler ayrı beyan verirse her biri bu istisnadan yararlanır.',
  },
  {
    yontem: 'Kredi Faizi İndirimi',
    aciklama: 'Kiralık mülk için kullanılan konut kredisi faizi, gerçek gider yönteminde gider olarak gösterilebilir.',
  },
];

const TAPU_HARCI_OPTIMIZASYON = [
  'Belediye rayiç değerinin altında satış bedeli beyanı vergi ziyaı cezasına yol açar — yasal değildir.',
  'İlk konut alımında tapu harcı %3\'e indirilebilir (normal %4); özellikle yüksek bedellerinde fark önemli.',
  'Eş veya çocuğa bağış yoluyla tapu devri farklı harç rejimine tabi olabilir — danışın.',
  'Bazı kentsel dönüşüm projelerinde harç muafiyeti veya indirimi uygulanabilmektedir.',
];

const SIRKETSELLESTIRME = [
  { avantaj: 'KDV indirim hakkı', aciklama: 'Ticari mülk edinimlerinde giriş KDV\'sini indirebilirsiniz' },
  { avantaj: 'Gider mahsubu', aciklama: 'Şirket adına kira giderleri vergi matrahından düşülür' },
  { avantaj: 'Kurumlar vergisi', aciklama: '2024\'te %25; bireysel gelir vergisi üst dilimi %40 — kıyaslayın' },
  { avantaj: 'Portföy GYO', aciklama: '5+ mülk için Gayrimenkul Yatırım Ortaklığı kurumu kurumlar vergisi istisnası sağlar' },
];

const DIKKAT_NOKTALAR = [
  'Vergi avantajlarından yararlanmak için beyanname zamanında verilmeli (Mart ayı son günü).',
  'Götürü ↔ gerçek gider yöntemi değişikliği bir sonraki yıldan itibaren uygulanır; yıl içinde değiştirilmez.',
  'İstisna tutarları her yıl güncellenir; bulunduğunuz yılın rakamlarını GİB sitesinden doğrulayın.',
  'Birden fazla kiralık mülkünüz varsa her biri için ayrı gelir takibi yapın.',
  'Yurt dışı kaynaklı kira geliri de beyan yükümlülüğü doğurabilir; çifte vergilendirme anlaşmalarını inceleyin.',
];

export default function GayrimenkulVergiOptimizasyonPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Vergi Optimizasyonu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Vergi Optimizasyonu Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yasal vergi avantajlarını öğrenin: değer artış kazancı muafiyeti, kira istisnaları, gider indirimleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">5 Yıl</p>
              <p className="text-xs text-gray-400">Değer artış muafiyeti</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">33K ₺</p>
              <p className="text-xs text-gray-400">Kira istisnası 2024</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%15</p>
              <p className="text-xs text-gray-400">Götürü gider</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Değer Artış Kazancı */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Değer Artış Kazancı Vergisi Optimizasyonu</h2>
          <div className="space-y-3">
            {DEGER_ARTIS_KAZANCI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{d.durum}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kira Geliri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kira Geliri Vergi Optimizasyonu</h2>
          <div className="space-y-4">
            {KIRA_GELIRI_OPTIMIZASYON.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{k.yontem}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tapu Harcı */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Tapu Harcı Optimizasyonu</h2>
          <div className="space-y-2">
            {TAPU_HARCI_OPTIMIZASYON.map((t, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Şirketleştirme */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Şirket veya GYO ile Yatırım Avantajları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIRKETSELLESTIRME.map((s, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-[#00C49F] mb-1">{s.avantaj}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dikkat Noktaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {DIKKAT_NOKTALAR.map((d, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır; vergi danışmanlığı yerine geçmez. Vergi oranları ve istisna tutarları her yıl değişebilir. Büyük tutarlı işlemler için bir mali müşavir veya vergi avukatına danışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi' },
              { href: '/stopaj-vergisi', label: 'Stopaj Vergisi Rehberi' },
              { href: '/net-kira-hesaplayici', label: 'Net Kira Geliri Hesaplayıcı' },
              { href: '/gayrimenkul-yatirim-fonu', label: 'Gayrimenkul Yatırım Fonu (GYO)' },
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
